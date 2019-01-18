package za.co.absa.spline.common.config

import org.scalatest.{FlatSpec, Matchers}

class ConfTypedSpec extends FlatSpec with Matchers {

  it should "support simple property" in new ConfTyped {
    Prop("x") shouldEqual "x"
  }

  it should "support hierarchical properties" in new ConfTyped {

    object Foo extends Conf("foo") {

      object Bar extends Conf("bar") {
        val innerProp = Prop("inner")
      }

    }

    Foo.Bar.toString shouldEqual "foo.bar"
    Foo.Bar.innerProp shouldEqual "foo.bar.inner"
  }

  it should "support custom root prefix" in new ConfTyped {

    override val rootPrefix: String = "my"

    object Foo extends Conf("foo") {

      object Bar extends Conf("bar") {
        val x: String = Prop("x")
      }

    }

    Foo.Bar.x shouldEqual "my.foo.bar.x"
    Prop("y") shouldEqual "my.y"
  }

  it should "support partially flattened definitions" in new ConfTyped {

    object FooBar extends Conf("foo.bar") {
      val x: String = Prop("x")
    }

    FooBar.x shouldEqual "foo.bar.x"
  }
}
