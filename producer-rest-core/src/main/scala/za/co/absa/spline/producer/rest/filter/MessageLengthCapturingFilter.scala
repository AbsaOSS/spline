/*
 * Copyright 2020 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package za.co.absa.spline.producer.rest.filter

import za.co.absa.spline.producer.rest.filter.MessageLengthCapturingFilter.{LengthCountingInputStreamWrapper, getCounters}

import java.io.InputStream
import javax.servlet._
import javax.servlet.http.HttpServletRequest
import scala.collection.mutable

class MessageLengthCapturingFilter extends Filter {
  override def doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain): Unit = {
    val newRequest = request match {
      case r: HttpServletRequest =>
        val inputStreamWrapper = new LengthCountingInputStreamWrapper(r.getInputStream)
        getCounters(r) += inputStreamWrapper.lengthCounter
        new HttpRequestWrapper(r, inputStreamWrapper)
      case _ => request
    }
    chain.doFilter(newRequest, response)
  }

  override def init(config: FilterConfig): Unit = {
    // nothing to do here
  }

  override def destroy(): Unit = {
    // nothing to do here
  }
}

object MessageLengthCapturingFilter {
  private val CountersRequestAttributeKey: String = s"${classOf[MessageLengthCapturingFilter].getName}.counters"

  def getCounters(r: ServletRequest): mutable.Buffer[ReadOnlyCounter] = {
    val countersAttrOrNull = r.getAttribute(CountersRequestAttributeKey).asInstanceOf[mutable.Buffer[ReadOnlyCounter]]
    val counters = Option(countersAttrOrNull).getOrElse(mutable.Buffer.empty[ReadOnlyCounter])
    if (counters.isEmpty) r.setAttribute(CountersRequestAttributeKey, counters)
    counters
  }

  trait ReadOnlyCounter {
    def count: Int
  }

  class LengthCountingInputStreamWrapper(r: InputStream) extends InputStream {
    private var _bytesReadCount: Int = 0

    val lengthCounter: ReadOnlyCounter = new ReadOnlyCounter {
      override def count: Int = _bytesReadCount
    }

    override def read(): Int = {
      _bytesReadCount += 1
      r.read()
    }
  }
}
