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

package za.co.absa.spline.core

import java.util.UUID
import java.util.UUID.randomUUID

import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import za.co.absa.spline.model.{MetaDataset, Schema}

import scala.collection.mutable.{ListBuffer, Map}

/**
  * The class is responsible for creation of [[za.co.absa.spline.model.MetaDataset meta data sets]] and assigning them unique identifiers.
  * @param attributeFactory An attribute factory
  */
class MetaDatasetFactory(val attributeFactory: AttributeFactory) {
  private val datasets : Map[UUID,MetaDataset] = Map()
  private val allDatasets : ListBuffer[MetaDataset] = ListBuffer[MetaDataset]()

  /**
    * The method crates a meta data set for a specific Spark operation and returns its identifier.
    * @param operation A Spark operation
    * @return An identifier of created meta data set
    */
  def create(operation: LogicalPlan) : UUID = datasets.synchronized{
    val attributeIds = operation.output.map(i => attributeFactory.getOrCreate(i.exprId.id, i.name, i.dataType, i.nullable))
    val metaDataset = MetaDataset(randomUUID, Schema(attributeIds))
    datasets.put(metaDataset.id, metaDataset)
    allDatasets += metaDataset
    metaDataset.id
  }

  /**
  * The method returns a meta data set for a specific identifier if has already been created by the factory. Otherwise, returns None.
  * @param id An identifier of the meta data set
  * @return An option
  */
  def getById(id: UUID) : Option[MetaDataset] = datasets.synchronized(datasets.get(id))

  /**
    * The method returns all meta data sets created by the factory.
    * @return A sequence of meta data sets
    */
  def getAll() : Seq[MetaDataset] = datasets.synchronized(allDatasets)
}
