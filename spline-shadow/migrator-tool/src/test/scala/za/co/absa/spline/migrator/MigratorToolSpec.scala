package za.co.absa.spline.migrator

import org.scalatest.{FunSpec, Ignore}

import scala.concurrent.Await
import scala.concurrent.duration.Duration

@Ignore
class MigratorToolSpec extends FunSpec {

  describe("migration tool test") {
    it("migrate from mongo to arango") {
      Await.result(MigratorTool.migrate(new MigratorConfig("mongodb://localhost:27017/migration-test", batchSize = 10, batchesMax = 1)), Duration.Inf)
    }
  }

}
