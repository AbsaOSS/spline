package za.co.absa.spline.persistence

import java.lang.Iterable

import scala.collection.JavaConverters._
import za.co.absa.spline.model.{DataLineage, MetaDataset}
import za.co.absa.spline.{model => splinemodel}
import za.co.absa.spline.model.arango._
import io.circe.ObjectEncoder
import io.circe.generic.semiauto.deriveEncoder
import org.apache.commons.lang.builder.ToStringBuilder.reflectionToString
// import com.outr.arango.managed._ needed for decoder creation
import com.outr.arango.managed._

case class DataLineageTransactionParams(
  operation: Iterable[String],
  follows: Iterable[String],
  dataSource: Iterable[String],
  writesTo: Iterable[String],
  readsFrom: Iterable[String],
  app: Iterable[String],
  implements: Iterable[String],
  execution: Iterable[String],
  executes: Iterable[String],
  progress: Iterable[String],
  progressOf: Iterable[String]) {

    def fields: Array[String] = getClass
      .getDeclaredFields
      .map(_.getName)
      .filter(_ != "$outer")

    def saveCollectionsJs: String = fields
      .map(field => s"""
          |  console.log('start $field');
          |  params.$field.forEach(o => {
          |    const doc = JSON.parse(o);
          |    db.$field.save(doc);
          |  });
          |  console.info('end $field');
        """.stripMargin)
      .mkString("\n")
}

object DataLineageTransactionParams {

  def create(dataLineage: DataLineage, uriToNewKey: Map[String, String], uriToKey: Map[String, String]) = DataLineageTransactionParams(
      createEncodedOperations(dataLineage).asJava,
      createFollows(dataLineage).asJava,
      createDataSources(uriToNewKey).asJava,
      createWritesTos(dataLineage, uriToKey).asJava,
      createReadsFrom(dataLineage, uriToKey).asJava,
      createApp(dataLineage).asJava,
      createImplements(dataLineage).asJava,
      createExecution(dataLineage).asJava,
      createExecutes(dataLineage).asJava,
      createProgressForBatchJob(dataLineage).asJava,
      createProgressOf(dataLineage).asJava
    )

  private def createExecutes(dataLineage: DataLineage) =
    Seq(Executes("execution/" + dataLineage.id.toString, "app/" + dataLineage.id.toString, Some(dataLineage.id.toString)))
      .map(deriveEncoder[Executes].apply)
      .map(_.noSpaces)


  private def createImplements(dataLineage: DataLineage) =
    Seq(Implements("app/" + dataLineage.id.toString, "operation/" + dataLineage.rootOperation.mainProps.id.toString, Some(dataLineage.id.toString)))
      .map(deriveEncoder[Implements].apply)
      .map(_.noSpaces)


  private def createProgressOf(dataLineage: DataLineage) =
    Seq(deriveEncoder[ProgressOf]
      .apply(ProgressOf("progress/" + dataLineage.id.toString, "execution/" + dataLineage.id.toString, Some(dataLineage.id.toString)))
      .noSpaces)

  /**  progress for batch jobs need to be generated during migration for consistency with stream jobs **/
  private def createProgressForBatchJob(dataLineage: DataLineage) = {
    val batchWrites = dataLineage.operations
      .find(_.isInstanceOf[splinemodel.op.BatchWrite])
      .getOrElse(throw new IllegalArgumentException("All pumped lineages are expected to be batch."))
      .asInstanceOf[splinemodel.op.BatchWrite]
    val readCount = batchWrites.readMetrics.values.sum
    val encoder = deriveEncoder[Progress]
    val progress = Progress(dataLineage.timestamp, readCount, Some(dataLineage.id.toString))
    Seq(encoder(progress).noSpaces)
  }

  private def createApp(dataLineage: DataLineage) = {
    val dataTypes = dataLineage.dataTypes
      .map(d => DataType(d.id.toString, d.getClass.getSimpleName, d.nullable, d.childDataTypeIds.map(_.toString)))
    val encoder = deriveEncoder[App]
    val app = App(dataLineage.appId, dataLineage.appName, dataTypes, Some(dataLineage.id.toString))
    Seq(encoder(app).noSpaces)
  }

  private def createExecution(dataLineage: DataLineage) = {
    val encoder = deriveEncoder[Execution]
    val execution = Execution(dataLineage.appId, dataLineage.sparkVer, dataLineage.timestamp, Some(dataLineage.id.toString))
    Seq(encoder(execution).noSpaces)
  }

  private def createReadsFrom(dataLineage: DataLineage, dsUriToKey: Map[String, String]) =
    dataLineage.operations
      .filter(_.isInstanceOf[splinemodel.op.Read])
      .map(_.asInstanceOf[splinemodel.op.Read])
      .flatMap(op => op.sources.map(s => {
        val opId = op.mainProps.id.toString
        val dsId = dsUriToKey(s.path)
        ReadsFrom("operation/" + opId, "dataSource/" + dsId, Some(opId + "--" + dsId))
      }))
      .distinct
      .map(deriveEncoder[ReadsFrom].apply)
      .map(_.noSpaces)


  private def createWritesTos(dataLineage: DataLineage, dsUriToKey: Map[String, String]) = {
    dataLineage.operations
      .iterator.toIterable
      .filter(_.isInstanceOf[splinemodel.op.Write]).map(_.asInstanceOf[splinemodel.op.Write])
      .map(o => WritesTo("operation/" + o.mainProps.id.toString, "dataSource/" + dsUriToKey(o.path), Some(o.mainProps.id.toString)))
      .map(deriveEncoder[WritesTo].apply)
      .map(_.noSpaces)
  }

  private def createDataSources(dsUriToNewKey: Map[String, String]) = {
    dsUriToNewKey
      .map(o => DataSource(o._1, Some(o._2)))
      .map(deriveEncoder[DataSource].apply)
      .map(_.noSpaces)
  }


  private def createOperations(dataLineage: DataLineage) = {
    dataLineage.operations.iterator.toIterable.map(op => {
      val outputSchema = findOutputSchema(dataLineage, op)
      val _key = Some(op.mainProps.id.toString)
      val expression = reflectionToString(op)
      val name = op.mainProps.name
      op match {
        case r: splinemodel.op.Read => Read(name, expression, r.sourceType, outputSchema, _key) // USE
        case w: splinemodel.op.Write => Write(name, expression, w.destinationType, outputSchema, _key)
        case _ => Transformation(name, expression, outputSchema, _key)
      }
    })
  }

  private def createEncodedOperations(dataLineage: DataLineage) = {
    val encoderWrite: ObjectEncoder[Write] = deriveEncoder[Write]
    val encoderRead: ObjectEncoder[Read] = deriveEncoder[Read]
    val encoderTransformation: ObjectEncoder[Transformation] = deriveEncoder[Transformation]
    createOperations(dataLineage)
      .map {
        case read: Read => encoderRead(read)
        case transformation: Transformation => encoderTransformation(transformation)
        case write: Write => encoderWrite(write)
      }
      .map(_.noSpaces)
  }

  private def createFollows(dataLineage: DataLineage) = {
    // Operation inputs and outputs ids may be shared across already linked lineages. To avoid saving linked lineages or
    // duplicate indexes we need to not use these.
    val outputToOperationId = dataLineage
      .operations
      .map(o => (o.mainProps.output, o.mainProps.id))
      .toMap
    dataLineage.operations.iterator.toIterable
      .flatMap(op =>
        op.mainProps.inputs
          .flatMap(outputToOperationId.get)
          .map(opId => Follows(
            "operation/" + op.mainProps.id.toString,
            "operation/" + opId.toString,
            Some(op.mainProps.id.toString + '-' + opId.toString)))
      )
      .map(deriveEncoder[Follows].apply)
      .map(_.noSpaces)
  }

  private def findOutputSchema(dataLineage: DataLineage, operation: splinemodel.op.Operation): Schema = {
    val metaDataset: MetaDataset = dataLineage.datasets.find((dts: MetaDataset) => dts.id == operation.mainProps.output)
      .getOrElse(throw new IllegalArgumentException(
        s"Operation output id ${operation.mainProps.output} not found in datasets of dataLineage ${dataLineage.id}"))
    val attributes = metaDataset.schema.attrs.map(attrId => {
      val attribute = dataLineage.attributes.find(_.id == attrId)
        .getOrElse(throw new IllegalArgumentException(
          s"MetaDataset ${metaDataset.id} contains Attribute $attrId " +
            s"that is not available in Datalineage#attributes of ${dataLineage.id}."))
      Attribute(attribute.name, attribute.dataTypeId.toString)
    })
    Schema(attributes)
  }

}

