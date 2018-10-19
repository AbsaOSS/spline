/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.web

import java.util.Arrays.asList
import java.{util => ju}

import org.apache.commons.configuration.{CompositeConfiguration, EnvironmentConfiguration, SystemConfiguration}
import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.web.method.support.HandlerMethodReturnValueHandler
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import za.co.absa.spline.persistence.api.DataLineageReader
import za.co.absa.spline.persistence.mongo.dao.{LineageDAOv3, LineageDAOv4, MultiVersionLineageDAO}
import za.co.absa.spline.persistence.mongo.{MongoConnectionImpl, MongoDataLineageReader}
import za.co.absa.spline.web.handler.{ScalaFutureMethodReturnValueHandler, UnitMethodReturnValueHandler}
import za.co.absa.spline.web.rest.service.LineageService

import scala.concurrent.duration._

@Configuration
class LineageWebAppConfig extends WebMvcConfigurer with ExecutionContextImplicit {

  import za.co.absa.spline.common.ConfigurationImplicits._

  private val confProps = new CompositeConfiguration(asList(
    new SystemConfiguration,
    new EnvironmentConfiguration
  ))

  override def addReturnValueHandlers(returnValueHandlers: ju.List[HandlerMethodReturnValueHandler]): Unit = {
    returnValueHandlers.add(new UnitMethodReturnValueHandler)
    returnValueHandlers.add(new ScalaFutureMethodReturnValueHandler(
      minEstimatedTimeout = confProps.getLong("spline.adaptive_timeout.min", 3.seconds.toMillis),
      durationToleranceFactor = confProps.getDouble("spline.adaptive_timeout.duration_factor", 1.5)
    ))
  }

  @Bean def lineageReader: DataLineageReader = {
    val mongoConnection = new MongoConnectionImpl(
      dbUrl = confProps getRequiredString "spline.mongodb.url",
      dbName = confProps getRequiredString "spline.mongodb.name")
    val dao = new MultiVersionLineageDAO(
      new LineageDAOv3(mongoConnection),
      new LineageDAOv4(mongoConnection))
    new MongoDataLineageReader(dao)
  }

  @Bean def lineageService(reader: DataLineageReader): LineageService =
    new LineageService(reader)
}
