package za.co.absa.spline.migrator

object Stats {
  def empty = SimpleStats(0, 0)

  def emptyTree = TreeStats(0, 0, empty)
}

trait Stats {
  type T <: Stats
  val success: Int
  val failures: Int

  def processed: Int = success + failures

  def inc(successInc: Int, failureInc: Int): T

  def incSuccess: T = inc(1, 0)

  def incFailure: T = inc(0, 1)
}

case class SimpleStats private(success: Int, failures: Int) extends Stats {
  override type T = SimpleStats

  override def inc(successInc: Int, failureInc: Int) =
    SimpleStats(success + successInc, failures + failureInc)
}

case class TreeStats private(success: Int, failures: Int, parentStats: Stats) extends Stats {
  override type T = TreeStats

  override def inc(successInc: Int, failureInc: Int) =
    TreeStats(success + successInc, failures + failureInc, parentStats.inc(successInc, failureInc))
}