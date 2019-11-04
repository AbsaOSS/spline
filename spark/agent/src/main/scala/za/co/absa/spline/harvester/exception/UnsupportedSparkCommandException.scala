package za.co.absa.spline.harvester.exception

import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan

class UnsupportedSparkCommandException(command: LogicalPlan) extends
  HarvesterException(s"Spark command was intercepted, but is not yet implemented! Command:'${command.getClass}'")
