import org.apache.spark.sql.catalyst.InternalRow
import org.apache.spark.sql.catalyst.expressions.codegen.{CodegenContext, ExprCode}
import org.apache.spark.sql.catalyst.expressions.{CaseWhen, Expression, Literal}
import org.apache.spark.sql.types.{DataType, IntegerType}

object Omg

case class Foo
(
  aExpr: Expression,
  child: Expression,
  dataType: DataType = IntegerType,
  x: Int = 424242,
  y: String,
  o1: Option[Any] = Some("this is a default O1 value"),
  o2: Option[Any],
  b: Boolean,
  i: Integer, obj: Any,
  seq: Any,
  any1: Any,
  any2: Any
) extends Expression {
  val zzz = x + y

  def this(i: Int) = this(null, null, null, i, null, null, null, false, null, null, null, null, null)

  override def nullable = ???

  override def eval(input: InternalRow) = ???

  override protected def doGenCode(ctx: CodegenContext, ev: ExprCode) = ???

  override def children = Seq(child)
}

case object Foo {
  def apply(s: String): Foo = Foo(
    aExpr = CaseWhen(Seq(Literal(42) -> Literal("Moo")), Literal("Meh")),
    child = Literal("!!! --- THIS SHOULDN'T BE RENDERED --- !!!"),
    x = 424242,
    y = s,
    //    o1 = Some(777),
    //    o1 = Some(Some(None)),
    o2 = Some(Map(1 -> 10, 777 -> Nil, 2 -> 20)),
    b = true,
    i = new Integer(7),
    obj = Omg,
    seq = Set(1, Some(20), None, 3),
    any1 = {},
    any2 = 42)
}

introspect(Foo("baz")).mkString("\n", "\n", "")

introspect(new Foo(-1)).mkString("\n", "\n", "")
