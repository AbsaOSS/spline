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

package za.co.absa.spline.persistence.mongo

import com.mongodb.casbah.query.Imports.DBObject
import com.mongodb.casbah.query.dsl.{QueryExpressionObject, QueryOperator, ValueTestFluidQueryOperators}

import scala.language.implicitConversions

object MongoImplicits {

  implicit def mongoNestedDBObjectQueryStatementsExtended(nested: DBObject with QueryExpressionObject)
  : ValueTestFluidQueryOperators with MongoOpsMissingFromCasbahQueryDSL =
    new {
      val field = nested.field
    } with ValueTestFluidQueryOperators with MongoOpsMissingFromCasbahQueryDSL {
      dbObj = Some(nested.get(nested.field).asInstanceOf[DBObject])
    }


  trait MongoOpsMissingFromCasbahQueryDSL
    extends OptionsOp

  trait OptionsOp extends QueryOperator {
    private val oper = "$options"

    def $options(arg: String): DBObject with QueryExpressionObject = queryOp(oper, arg)
  }

}
