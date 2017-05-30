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

package za.co.absa.spline.common

import org.apache.commons.configuration.Configuration
import org.apache.commons.lang.StringUtils.isNotBlank

/**
  * The object contains extension methods for the [[org.apache.commons.configuration.Configuration Configuration]] interface.
  */
object ConfigurationImplicits {

  /**
    * The class wraps the [[org.apache.commons.configuration.Configuration Configuration]] interface in order to provide extension methods.
    *
    * @param conf A configuration instance
    * @tparam T A specific type implementing the [[org.apache.commons.configuration.Configuration Configuration]] interface
    */
  implicit class ConfigurationRequiredWrapper[T <: Configuration](conf: T) {

    /**
      * Gets a value of string configuration property and checks whether property exists.
      *
      * @return A value of string configuration property if exists, otherwise throws an exception.
      */
    def getRequiredString: (String) => String = getRequired(conf.getString, isNotBlank)

    /**
      * Gets a value of boolean configuration property and checks whether property exists.
      *
      * @return A value of boolean configuration property if exists, otherwise throws an exception.
      */
    def getRequiredBoolean: (String) => Boolean = getRequired(conf.getBoolean(_, null), null.!=) //NOSONAR

    /**
      * Gets a value of big decimal configuration property and checks whether property exists.
      *
      * @return A value of big decimal configuration property if exists, otherwise throws an exception.
      */
    def getRequiredBigDecimal: (String) => BigDecimal = getRequired(conf.getBigDecimal, null.!=) //NOSONAR

    /**
      * Gets a value of byte configuration property and checks whether property exists.
      *
      * @return A value of byte configuration property if exists, otherwise throws an exception.
      */
    def getRequiredByte: (String) => Byte = getRequired(conf.getByte(_, null), null.!=) //NOSONAR

    /**
      * Gets a value of short configuration property and checks whether property exists.
      *
      * @return A value of short configuration property if exists, otherwise throws an exception.
      */
    def getRequiredShort: (String) => Short = getRequired(conf.getShort(_, null), null.!=) //NOSONAR

    /**
      * Gets a value of int configuration property and checks whether property exists.
      *
      * @return A value of int configuration property if exists, otherwise throws an exception.
      */
    def getRequiredInt: (String) => Int = getRequired(conf.getInteger(_, null), null.!=) //NOSONAR

    /**
      * Gets a value of long configuration property and checks whether property exists.
      *
      * @return A value of long configuration property if exists, otherwise throws an exception.
      */
    def getRequiredLong: (String) => Long = getRequired(conf.getLong(_, null), null.!=) //NOSONAR

    /**
      * Gets a value of float configuration property and checks whether property exists.
      *
      * @return A value of float configuration property if exists, otherwise throws an exception.
      */
    def getRequiredFloat: (String) => Float = getRequired(conf.getFloat(_, null), null.!=) //NOSONAR

    /**
      * Gets a value of double configuration property and checks whether property exists.
      *
      * @return A value of double configuration property if exists, otherwise throws an exception.
      */
    def getRequiredDouble: (String) => Double = getRequired(conf.getDouble(_, null), null.!=) //NOSONAR

    private def getRequired[V](get: String => V, check: V => Boolean)(key: String): V = {
      val v = get(key)
      require(check(v), s"Missing configuration property $key")
      v
    }
  }

}
