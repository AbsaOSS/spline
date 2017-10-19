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

import org.apache.spark.sql
import za.co.absa.spline.model.Attribute

import scala.collection.mutable.{Map, ListBuffer}

/**
  * The class is responsible for creation of [[za.co.absa.spline.model.Attribute attributes]] and assigning them unique identifiers.
  */
class AttributeFactory extends DataTypeMapper{
  private val mapById : Map[UUID, Attribute] = Map()
  private val mapBySparkId : Map[Long, Attribute] = Map()
  private val allAttributes : ListBuffer[Attribute] = ListBuffer[Attribute]()

  /**
    * The method fills up the internal collection with initial sequence of attributes.
    * @param sparkIds A sequence of unique identifiers provided by Spark
    * @param attributes A sequence of attributes
    */
  def initialize(sparkIds: Seq[Long], attributes: Seq[Attribute]) : Unit =
    mapById.synchronized {
      mapById.clear()
      mapBySparkId.clear()
      sparkIds.zip(attributes).foreach {
        case (k, a) => {
          mapBySparkId.put(k, a)
          mapById.put(a.id, a)
          allAttributes ++= attributes
        }
      }
    }

  /**
    * The method creates an attribute if does not exist. Returns identifier to the attribute matching the input criteria.
    * @param sparkAttributeId An unique identifier of the attribute assigned by Spark
    * @param name A name of the attribute
    * @param sparkDataType A Spark dataType related to the attribute
    * @param nullable A flag expressing whether the attribute is nullable or not
    * @return An unique identifier of the created attribute
    */
  def getOrCreate(sparkAttributeId : Long, name : String, sparkDataType: sql.types.DataType, nullable: Boolean) : UUID =
    mapById.synchronized(
      mapBySparkId.get(sparkAttributeId) match {
        case Some(x) => x.id
        case None => {
          val a = Attribute(randomUUID, name, fromSparkDataType(sparkDataType, nullable))
          mapBySparkId.put(sparkAttributeId, a)
          mapById.put(a.id, a)
          allAttributes += a
          a.id
        }
      }
    )

  /**
    * The method returns an attribute for a specific identifier if has already been created by the factory. Otherwise, returns None.
    * @param id An identifier of the attribute
    * @return An option
    */
  def getById(id : UUID) : Option[Attribute] = mapById.synchronized(mapById.get(id))

  /**
    * The method returns all attributes created by the factory.
    * @return A sequence of attributes
    */
  def getAll(): Seq[Attribute] = mapById.synchronized(allAttributes.toList)

}
