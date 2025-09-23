/*
 * Tests for RESTClientApacheHttpImpl
 *
 * Testing library and framework: ScalaTest (AnyFlatSpec with Matchers, ScalaFutures)
 * - These tests rely on the JDK's com.sun.net.httpserver.HttpServer for a lightweight mock HTTP server.
 * - No new test dependencies are introduced.
 */

package za.co.absa.spline.common.rest

import org.apache.http.auth.{Credentials, UsernamePasswordCredentials}
import org.apache.http.entity.ContentType
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.BeforeAndAfterAll
import org.scalatest.BeforeAndAfterEach

import java.net.{InetSocketAddress, URI}
import java.nio.charset.{Charset, StandardCharsets}
import java.util.concurrent.{Executors, TimeUnit}
import com.sun.net.httpserver.{HttpExchange, HttpHandler, HttpServer}
import javax.net.ssl.SSLContext

import scala.collection.mutable
import scala.concurrent.{ExecutionContext, Future}
import scala.io.Source
import scala.util.Try

class RESTClientApacheHttpImplSpec
  extends AnyFlatSpec
    with Matchers
    with ScalaFutures
    with BeforeAndAfterAll
    with BeforeAndAfterEach {

  private val serverThreadPool = Executors.newCachedThreadPool()
  private var server: HttpServer = _
  private var baseUri: URI = _
  private val receivedRequests = mutable.ListBuffer.empty[(String, Map[String, Seq[String]], Array[Byte])]

  implicit private val ec: ExecutionContext = ExecutionContext.global

  // Utilities
  private def bodyBytes(ex: HttpExchange): Array[Byte] = {
    val in = ex.getRequestBody
    try in.readAllBytes()
    finally Try(in.close())
  }

  private def send(ex: HttpExchange, status: Int, body: Array[Byte] = Array.emptyByteArray, headers: Map[String, String] = Map.empty): Unit = {
    headers.foreach { case (k, v) => ex.getResponseHeaders.add(k, v) }
    ex.sendResponseHeaders(status, body.length.toLong)
    val os = ex.getResponseBody
    try os.write(body)
    finally Try(os.close())
  }

  private def addHandler(path: String)(f: HttpExchange => Unit): Unit = {
    server.createContext(path, new HttpHandler { override def handle(exchange: HttpExchange): Unit = f(exchange) })
  }

  private def clearHandlers(): Unit = {
    // com.sun.net.httpserver has no direct "removeContext" for all;
    // recreate the server for a clean slate across tests if needed.
  }

  override protected def beforeAll(): Unit = {
    server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0)
    server.setExecutor(serverThreadPool)
    server.start()
    baseUri = new URI(s"http://127.0.0.1:${server.getAddress.getPort}")
  }

  override protected def afterAll(): Unit = {
    if (server \!= null) {
      server.stop(0)
    }
    serverThreadPool.shutdown()
    serverThreadPool.awaitTermination(5, TimeUnit.SECONDS)
  }

  override protected def beforeEach(): Unit = {
    receivedRequests.clear()
  }

  private def newClient(creds: Option[Credentials] = None, ssl: Option[SSLContext] = None): RESTClientApacheHttpImpl = {
    new RESTClientApacheHttpImpl(baseUri, creds, ssl)
  }

  behavior of "RESTClientApacheHttpImpl"

  it should "perform GET and return response body for 2xx" in {
    val path = "/ok"
    addHandler(path) { ex =>
      receivedRequests += ((ex.getRequestMethod, ex.getRequestHeaders.asInstanceOf[java.util.Map[String, java.util.List[String]]]
        .asInstanceOf[java.util.Map[String, java.util.List[String]]]
        .entrySet().toArray.map(_.asInstanceOf[java.util.Map.Entry[String, java.util.List[String]]])
        .map(e => e.getKey -> e.getValue.toArray(new Array[String](0)).toIndexedSeq).toMap, bodyBytes(ex)))
      send(ex, 200, "hello".getBytes(StandardCharsets.UTF_8))
    }

    val cli = newClient()
    val fut = cli.get("ok")
    whenReady(fut) { body =>
      body shouldBe "hello"
    }
  }

  it should "return null body for GET with 204 No Content" in {
    val path = "/no-content"
    addHandler(path) { ex =>
      send(ex, 204, Array.emptyByteArray)
    }

    val cli = newClient()
    val fut = cli.get("no-content")
    whenReady(fut) { body =>
      body shouldBe null
    }
  }

  it should "throw HttpStatusException for non-2xx responses with message including status and body" in {
    val path = "/error"
    addHandler(path) { ex =>
      send(ex, 418, "nope".getBytes(StandardCharsets.UTF_8))
    }

    val cli = newClient()
    val fut = cli.get("error")
    val ex = the[HttpStatusException] thrownBy scala.concurrent.Await.result(fut, scala.concurrent.duration.Duration(5, "seconds"))
    ex.statusCode shouldBe 418
    ex.getMessage should include ("418")
    ex.getMessage should include ("nope")
    ex.requestUri.toString should include ("/error")
  }

  it should "send DELETE and succeed on 2xx" in {
    val path = "/del"
    addHandler(path) { ex =>
      ex.getRequestMethod shouldBe "DELETE"
      send(ex, 204)
    }

    val cli = newClient()
    val fut = cli.delete("del")
    whenReady(fut) { _ =>
      succeed
    }
  }

  it should "POST string with default text/plain; charset=UTF-8 and body content" in {
    val path = "/post-string"
    val received = new java.util.concurrent.ArrayBlockingQueue[(String, String, Array[Byte])](1)

    addHandler(path) { ex =>
      val ct = Option(ex.getRequestHeaders.getFirst("Content-Type")).getOrElse("")
      val body = bodyBytes(ex)
      received.put((ex.getRequestMethod, ct, body))
      send(ex, 200)
    }

    val cli = newClient()
    val payload = "Привет, мир\!" // Non-ASCII to verify UTF-8 handling
    val fut = cli.post("post-string", payload)
    whenReady(fut) { _ =>
      val (method, contentType, body) = received.poll(2, TimeUnit.SECONDS)
      method shouldBe "POST"
      contentType.toLowerCase should include ("text/plain")
      contentType.toLowerCase should include ("charset=utf-8")
      new String(body, StandardCharsets.UTF_8) shouldBe payload
    }
  }

  it should "POST string with explicit ContentType" in {
    val path = "/post-string-ct"
    val received = new java.util.concurrent.ArrayBlockingQueue[(String, String, Array[Byte])](1)

    addHandler(path) { ex =>
      val ct = Option(ex.getRequestHeaders.getFirst("Content-Type")).getOrElse("")
      val body = bodyBytes(ex)
      received.put((ex.getRequestMethod, ct, body))
      send(ex, 200)
    }

    val cli = newClient()
    val json = """{"a":1}"""
    val fut = cli.post("post-string-ct", json, ContentType.APPLICATION_JSON)
    whenReady(fut) { _ =>
      val (method, contentType, body) = received.poll(2, TimeUnit.SECONDS)
      method shouldBe "POST"
      contentType.toLowerCase should include ("application/json")
      new String(body, StandardCharsets.UTF_8) shouldBe json
    }
  }

  it should "POST bytes with default and explicit ContentType" in {
    val path1 = "/post-bytes-default"
    val received1 = new java.util.concurrent.ArrayBlockingQueue[(String, String, Array[Byte])](1)
    addHandler(path1) { ex =>
      val ct = Option(ex.getRequestHeaders.getFirst("Content-Type")).getOrElse("")
      val body = bodyBytes(ex)
      received1.put((ex.getRequestMethod, ct, body))
      send(ex, 200)
    }

    val path2 = "/post-bytes-ct"
    val received2 = new java.util.concurrent.ArrayBlockingQueue[(String, String, Array[Byte])](1)
    addHandler(path2) { ex =>
      val ct = Option(ex.getRequestHeaders.getFirst("Content-Type")).getOrElse("")
      val body = bodyBytes(ex)
      received2.put((ex.getRequestMethod, ct, body))
      send(ex, 200)
    }

    val cli = newClient()
    val bytes = "BINARY".getBytes(StandardCharsets.ISO_8859_1)

    // default ByteArrayEntity has no content type unless specified explicitly
    whenReady(cli.post("post-bytes-default", bytes)) { _ =>
      val (method, contentType, body) = received1.poll(2, TimeUnit.SECONDS)
      method shouldBe "POST"
      contentType shouldBe "" // no content-type header present
      body shouldBe bytes
    }

    whenReady(cli.post("post-bytes-ct", bytes, ContentType.DEFAULT_BINARY)) { _ =>
      val (method, contentType, body) = received2.poll(2, TimeUnit.SECONDS)
      method shouldBe "POST"
      contentType.toLowerCase should include ("application/octet-stream")
      body shouldBe bytes
    }
  }

  it should "include Basic Authorization header when credentials are provided" in {
    val path = "/auth"
    val receivedAuth = new java.util.concurrent.ArrayBlockingQueue[String](1)

    addHandler(path) { ex =>
      receivedAuth.put(Option(ex.getRequestHeaders.getFirst("Authorization")).getOrElse(""))
      send(ex, 200, "ok".getBytes(StandardCharsets.UTF_8))
    }

    val creds = new UsernamePasswordCredentials("user", "pass")
    val cli = newClient(Some(creds))
    val fut = cli.get("auth")
    whenReady(fut) { body =>
      body shouldBe "ok"
      val auth = receivedAuth.poll(2, TimeUnit.SECONDS)
      auth.toLowerCase should startWith ("basic ")
      // Do not hardcode Base64; just assert header exists and is basic.
    }
  }

  it should "respect response character set taken from Content-Encoding header as implemented" in {
    // Note: The implementation reads e.getContentEncoding (HTTP Content-Encoding) for charset,
    // which is conventionally for compression, not character set. We test behavior as-is.
    val path = "/encoding"
    addHandler(path) { ex =>
      val txt = "こんにちは" // Japanese
      val bytes = txt.getBytes(Charset.forName("UTF-16"))
      // Set Content-Encoding to a charset name to match implementation
      send(ex, 200, bytes, headers = Map("Content-Encoding" -> "UTF-16"))
    }

    val cli = newClient()
    val fut = cli.get("encoding")
    whenReady(fut) { body =>
      body shouldBe "こんにちは"
    }
  }
}