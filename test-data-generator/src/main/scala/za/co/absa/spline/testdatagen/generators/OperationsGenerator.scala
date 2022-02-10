package za.co.absa.spline.testdatagen.generators

import java.util.UUID

import za.co.absa.spline.producer.model.v1_2.{DataOperation, Operations, ReadOperation, WriteOperation}
import za.co.absa.spline.testdatagen.generators.AttributesGenerator.generateSchema

import scala.annotation.tailrec

object OperationsGenerator {

  def generateOperations(dataOpCount: Long, readOpCount: Int = 1): Operations = {
    val reads = (1 to readOpCount).map(generateReads)

    val dataOperations = reads.map(readOp => generateDataOperations(dataOpCount, Seq.empty, Seq(readOp.id)))

    val flatDataOps = dataOperations.flatten
    Operations(
      write = generateWrite(flatDataOps.last.id),
      reads = reads,
      other = flatDataOps
    )
  }

  private def generateReads(schemaSize: Int): ReadOperation = {
    val id = UUID.randomUUID().toString
    ReadOperation(
      inputSources = Seq(s"file://splinegen/read_$id.csv"),
      id = id,
      name = Some(s"generated read $id"),
      output = Some(generateSchema(schemaSize).map(_.id)),
      params = Map.empty,
      extra = Map.empty
    )
  }

  @tailrec
  private def generateDataOperations(opCount: Long, allOps: Seq[DataOperation], childIds: Seq[String]): Seq[DataOperation] =
    if (opCount == 0) {
      allOps
    } else {
      val op = generateDataOperation(childIds)
      generateDataOperations(opCount - 1, allOps :+ op, Seq(op.id))
    }

  private def generateDataOperation(childIds: Seq[String]): DataOperation = {
    val id = UUID.randomUUID().toString
    DataOperation(
      id = id,
      name = Some(s"generated data operation $id"),
      childIds = childIds,
      output = Some(generateSchema(1).map(_.id)),
      params = Map.empty,
      extra = Map.empty
    )
  }

  private def generateWrite(childId: String): WriteOperation = {
    WriteOperation(
      outputSource = "file://splinegen/write.csv",
      append = false,
      id = UUID.randomUUID().toString,
      name = Some("generatedWrite"),
      childIds = Seq(childId),
      params = Map.empty,
      extra = Map.empty
    )
  }

}
