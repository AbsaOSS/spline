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

package za.co.absa.spline.gateway.rest.filter

import javax.servlet._
import javax.servlet.http.HttpServletRequest

/**
 * Filter for decompressing gziped Http requests
 *
 */
class GzipFilter extends Filter {

  override def doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain): Unit = {

    val newRequest = request match {
      case r: HttpServletRequest if isCompressed(r) => new GZIPRequestWrapper(r)
      case _ => request
    }

    chain.doFilter(newRequest, response)
  }

  private def isCompressed(request: HttpServletRequest): Boolean = {
    val contentEncoding = request.getHeader("Content-Encoding")

    contentEncoding != null && contentEncoding.toLowerCase.contains("gzip")
  }

  override def init(config: FilterConfig): Unit = {
    // nothing to do here
  }

  override def destroy(): Unit = {
    // nothing to do here
  }
}