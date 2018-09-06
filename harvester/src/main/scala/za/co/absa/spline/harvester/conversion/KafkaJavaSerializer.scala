package za.co.absa.spline.harvester.conversion

import java.io.{ByteArrayOutputStream, ObjectOutputStream}
import java.util

import org.apache.kafka.common.serialization.Serializer
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.common.WithResources._

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
class KafkaJavaSerializer[TObject] extends Serializer[TObject] {

  override def serialize(arg0: String, obj: TObject): Array[Byte] =
    withResources(new ByteArrayOutputStream())(writeObject)(obj).toByteArray

  private def writeObject(baos: ByteArrayOutputStream)(obj: TObject) = {
    withResources(new ObjectOutputStream(baos))(_.writeObject(obj))
    baos
  }

  override def close(): Unit = {}

  override def configure(configs: util.Map[String, _], isKey: Boolean): Unit = {}
}
