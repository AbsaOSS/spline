package za.co.absa.spline.coresparkadapterapi

trait AdapterFactory[T] {

  lazy val instance: T = {
    val className = getClass.getCanonicalName.replaceAll("\\$$", "Impl")
    Class.forName(className).newInstance().asInstanceOf[T]
  }

}
