/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.persistence.api.composition

import org.apache.commons.configuration.Configuration
import za.co.absa.spline.persistence.api.{DataLineageWriter, PersistenceWriterFactory}

object ParallelCompositeWriterFactory{
  val factoriesKey = "spline.persistence.composition.factories"
}

/**
  * The class represents a parallel composition of various persistence writers.
  * @param configuration A source of settings
  */
class ParallelCompositeWriterFactory(configuration: Configuration) extends PersistenceWriterFactory(configuration)
{
  import ParallelCompositeWriterFactory._
  import za.co.absa.spline.common.ConfigurationImplicits._

  private val factories = configuration
                            .getRequiredStringArray(factoriesKey)
                            .map(i => Class.forName(i.trim)
                              .getConstructor(classOf[Configuration])
                              .newInstance(configuration)
                              .asInstanceOf[PersistenceWriterFactory]
                            )
  /**
    * The method creates a parallel composite writer to various persistence layers for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A parallel composite writer to various persistence layers for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  override def createDataLineageWriter(): DataLineageWriter = new ParallelCompositeDataLineageWriter(factories.map(_.createDataLineageWriter()).toSet)

}
