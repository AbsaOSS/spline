package za.co.absa.spline.migrator

case class MigratorConfig
(
  mongoConnectionUrl: String = "",
  arangoConnectionUrl: String = "",
  batchSize: Int = 100,
  batchesMax: Int = -1
)

object MigratorConfig {
  val empty = MigratorConfig()
}
