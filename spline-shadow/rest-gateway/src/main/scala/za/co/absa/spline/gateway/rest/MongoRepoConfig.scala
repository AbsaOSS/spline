/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.gateway.rest

import java.util.Arrays.asList

import org.apache.commons.configuration._
import org.springframework.context.annotation.{Bean, Configuration}
import za.co.absa.spline.common.config.ConfTyped
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter, ProgressEventWriter}
import za.co.absa.spline.persistence.mongo.MongoPersistenceFactory

@Configuration
class MongoRepoConfig {

  val mongoFactory = new MongoPersistenceFactory(MongoRepoConfig)

  @Bean
  def writer: DataLineageWriter = mongoFactory.createDataLineageWriter

  @Bean
  def reader: DataLineageReader = mongoFactory.createDataLineageReader.get

  @Bean
  def progressWriter: ProgressEventWriter = mongoFactory.createProgressEventWriter

}

object MongoRepoConfig
  extends CompositeConfiguration(asList(
    new JNDIConfiguration("java:comp/env"),
    new SystemConfiguration,
    new EnvironmentConfiguration))
    with MongoRepoConfigLike

trait MongoRepoConfigLike extends ConfTyped {

  this: AbstractConfiguration =>

  setThrowExceptionOnMissing(true)

  override val rootPrefix: String = "spline"

  object Database extends Conf("mongodb") {

    val url: String = getString(Prop("url"))
  }

}