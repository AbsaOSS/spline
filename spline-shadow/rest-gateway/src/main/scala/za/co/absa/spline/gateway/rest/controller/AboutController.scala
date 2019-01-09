package za.co.absa.spline.gateway.rest.controller

import org.springframework.web.bind.annotation.{GetMapping, RequestMapping, RestController}
import za.co.absa.spline.common.ARM.managed

import scala.io.Source.fromInputStream

@RestController
@RequestMapping(Array("/about"))
class AboutController {

  @GetMapping(path = Array("/build"), produces = Array("text/x-java-properties"))
  def buildInfo: String = {
    val lines = for {
      stream <- managed(this.getClass getResourceAsStream "/build.properties")
      line <- fromInputStream(stream).getLines if line.nonEmpty && !line.startsWith("#")
    } yield line
    lines.mkString("\n")
  }
}
