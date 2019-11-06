package za.co.absa.spline.harvester.converter

import org.apache.hadoop.conf.Configuration
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.SparkPlan
import za.co.absa.spline.common.transformations.AbstractConverter
import za.co.absa.spline.harvester.qualifier.PathQualifier


case class LineageExtractionContext(
                                 logicalPlan: LogicalPlan,
                                 executedPlanOpt: Option[SparkPlan],
                                 session: SparkSession,
                                 pathQualifier: PathQualifier,
                                 hadoopConfiguration: Configuration
                               )

abstract class AbstractAttributeLineageExtractor extends AbstractConverter {
  override type From = LineageExtractionContext
  override type To = Option[Any]
}

class DisabledAttributeLineageExtractor extends AbstractAttributeLineageExtractor {
  def convert(arg: LineageExtractionContext): Option[Any] = None
}
