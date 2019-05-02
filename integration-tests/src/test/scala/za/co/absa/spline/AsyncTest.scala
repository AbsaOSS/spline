package za.co.absa.spline


import org.scalatest.mockito.MockitoSugar
import org.scalatest.{AsyncFlatSpec, FlatSpec, Matchers}
import za.co.absa.spline.fixture.{AsyncSparkFixture, AsyncSplineFixture2, SparkFixture, SplineFixture2}

class AsyncTest extends AsyncFlatSpec
  with Matchers with MockitoSugar
  with AsyncSparkFixture
  with AsyncSplineFixture2 {

  it should "serialize small lineage" in
    withNewSparkSession(spark =>
      withSpline(spark, capturedLineage => {

        3 shouldBe 3
      }))
}

trait TT


class AsyncTest extends FlatSpec
  with Matchers with MockitoSugar
  with SparkFixture
  with SplineFixture2 {


  it should "serialize small lineage" in
    withNewSparkSession(spark =>
      withSpline(spark, capturedLineage =>
        3 shouldBe 3
      )
    )

  }
