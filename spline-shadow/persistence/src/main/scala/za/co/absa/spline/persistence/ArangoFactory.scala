package za.co.absa.spline.persistence

import java.net.URI

import com.arangodb.{ArangoDB, ArangoDatabase, Protocol}

object ArangoFactory {

  def create(uri: URI): ArangoDatabase = {
    val dbName = uri.getPath.replaceFirst("/", "")
    val protocol: Protocol = Option(uri.getScheme)
      .map(parseProtocol)
      .getOrElse(Protocol.HTTP_VPACK)
    val credentials: (String, String) = Option(uri.getUserInfo)
      .map(_.split(':'))
      .map(s => (s(0), s(1)))
      .getOrElse(("root", "root"))
    new ArangoDB.Builder()
      .user(credentials._1)
      .password(credentials._2)
      .host(uri.getHost, uri.getPort)
      .useProtocol(protocol)
      .user(credentials._1)
      .build()
      .db(dbName)
  }

  def parseProtocol(scheme: String): Protocol = {
    scheme match {
      case "https" | "http" => Protocol.HTTP_VPACK
      case "http-json" => Protocol.HTTP_JSON
      case "vst" => Protocol.VST
      case _ => Protocol.HTTP_VPACK
    }
  }

}
