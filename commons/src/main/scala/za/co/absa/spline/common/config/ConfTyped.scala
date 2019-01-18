package za.co.absa.spline.common.config

import scala.language.implicitConversions

trait ConfTyped {
  protected val rootPrefix: String = null

  private def rootPrefixOpt: Option[Conf] = Option(rootPrefix).map(new Conf(_)(None))

  protected class Conf(name: String)(implicit prefixOpt: Option[Conf] = rootPrefixOpt) {

    protected implicit def asOption: Option[Conf] = Some(this)

    override def toString: String = prefixOpt.toSeq :+ name mkString "."
  }

  protected object Prop {
    def apply(name: String)(implicit prefix: Option[Conf] = rootPrefixOpt): String = new Conf(name)(prefix).toString
  }

}