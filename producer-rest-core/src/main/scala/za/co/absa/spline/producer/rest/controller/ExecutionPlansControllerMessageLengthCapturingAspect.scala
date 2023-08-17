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

package za.co.absa.spline.producer.rest.controller

import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.{Around, Aspect, Pointcut}
import org.slf4s.Logging
import org.springframework.stereotype.Component
import org.springframework.web.context.request.{RequestContextHolder, ServletRequestAttributes}
import za.co.absa.spline.producer.model.{ExecutionPlan, v1_1}
import za.co.absa.spline.producer.rest.filter.MessageLengthCapturingFilter
import za.co.absa.spline.producer.rest.filter.MessageLengthCapturingFilter.ReadOnlyCounter

@Aspect
@Component
class ExecutionPlansControllerMessageLengthCapturingAspect extends Logging {

  @Pointcut("execution(public * za.co.absa.spline.producer.rest.controller.*Controller.*(..))")
  def publicControllerMethods(): Unit = {}

  @Pointcut("execution(* *(.., za.co.absa.spline.producer.model.ExecutionPlan, ..))")
  def acceptingExecutionPlanV1(): Unit = {}

  @Pointcut("execution(* *(.., za.co.absa.spline.producer.model.v1_1.ExecutionPlan, ..))")
  def acceptingExecutionPlan(): Unit = {}

  @Around("publicControllerMethods() && (acceptingExecutionPlan() || acceptingExecutionPlanV1())")
  def aroundAdvice(jp: ProceedingJoinPoint): AnyRef = {
    val origArgs = jp.getArgs
    val fixedArgs = origArgs.map {
      case ep: ExecutionPlan =>
        ep.copy(extraInfo = withMessageLengthInfo(ep.extraInfo))
      case ep: v1_1.ExecutionPlan =>
        ep.copy(extraInfo = withMessageLengthInfo(ep.extraInfo))
      case x => x
    }
    jp.proceed(fixedArgs)
  }

  private def withMessageLengthInfo(m: Map[String, Any]): Map[String, Any] = {
    val req = RequestContextHolder.getRequestAttributes.asInstanceOf[ServletRequestAttributes].getRequest
    val counters = MessageLengthCapturingFilter.getCounters(req).toArray
    m + ("__spline_msg_size" -> counters.map(_.count))
  }
}


