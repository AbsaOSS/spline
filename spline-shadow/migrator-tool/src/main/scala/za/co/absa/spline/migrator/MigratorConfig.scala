package za.co.absa.spline.migrator

case class MigratorConfig
(
  mongoConnectionUrl: String = "",
  arangoConnectionUrl: String = "",
  batchSize: Int = 100
)

object MigratorConfig {
  val empty = MigratorConfig()
}
