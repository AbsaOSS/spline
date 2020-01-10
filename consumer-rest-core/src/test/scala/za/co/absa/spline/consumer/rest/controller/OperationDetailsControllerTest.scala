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
package za.co.absa.spline.consumer.rest.controller

import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito._
import org.scalatest.funsuite.AsyncFunSuite
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.OperationRepository
import za.co.absa.spline.persistence.{model => persistence}

import scala.concurrent.{ExecutionContext, Future}

class OperationDetailsControllerTest extends AsyncFunSuite with MockitoSugar with Matchers {

    private val operation: Operation = new Operation(
      _id = "2141834d-abd6-4be4-80b9-01661b842ab9",
      _type = "Transformation",
      name = "Project",
      properties = null
    )
    val dataTypes = Array[persistence.DataType](
      persistence.SimpleDataType("602147fa-7148-46a7-9978-ba9f63f6b616", true, "string"),
      persistence.SimpleDataType("89348e28-5621-4ce1-b705-c1301b4d35a7", true, "decimal(28,8)"),
      persistence.SimpleDataType("951f2d88-f8b4-4bc8-b5bf-524811c9197a", true, "date"),
      persistence.SimpleDataType("3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6", true, "long"),
      persistence.StructDataType(
        "21d3b2cc-1528-4f23-b4c2-c0aab1dbb743",
        false,
        Array(
          persistence.Attribute("transId", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("txnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("ccy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("repCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("exchangeRate", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("createDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
          persistence.Attribute("effDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
          persistence.Attribute("code", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("type", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("vatRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("correctionInd", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("issuingBank", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("advisingBank", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("txnDirection", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("dateIssued", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("expDate", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("expDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
          persistence.Attribute("limitTxnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("limitCcy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("limitRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("limitUtilisedTxnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("limitUtilisedCcy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("limitUtilisedRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("intRateProductCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("intRateProductCodeDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("debitInterestRateTypeCodeDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("creditInterestRateTypeCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("creditInterestRateTypeCodeDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("txnDescription", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("beneficiaryName", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("tenorDays", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
          persistence.Attribute("tenor", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("escapeClauseIndicator", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("escapeClausePeriod", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
          persistence.Attribute("dealConfirmed", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("txnBusinessUnitCode", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
          persistence.Attribute("capitalBalanceGlAccountCode", "602147fa-7148-46a7-9978-ba9f63f6b616")
        )
      ),
      persistence.StructDataType(
        "9b5fd897-7dbf-4a00-8ed1-da269995e599",
        false,
        Array(
          persistence.Attribute("typeDescription", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("tradedPrice", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("siteCode", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
          persistence.Attribute("siteCodeDescription", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("capitalBalanceGlAccountCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("glAccountDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("chargeType", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("chargeId", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
          persistence.Attribute("chargeStatus", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("chargeStatusDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("originalCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("cashflowTxnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("cashflowCcy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("cashflowRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("cashflowRecoverableTxnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("cashflowRecoverableRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7")
        )
      ),
      persistence.ArrayDataType("a5db84f2-4562-478d-9f45-2619c9d939a9", false, "9b5fd897-7dbf-4a00-8ed1-da269995e599"),
      persistence.SimpleDataType("2b737c59-6443-4a2a-80c3-a99709b306a6", true, "Integer"),
      persistence.ArrayDataType("eefa2d78-af41-41eb-ac5c-518e234cfd4c", true, "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.StructDataType(
        "d64a20af-86fe-413e-baca-83b4e677e2c2",
        true,
        Array(
          persistence.Attribute("mappingTableColumn", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("mappedDatasetColumn", "602147fa-7148-46a7-9978-ba9f63f6b616")
        )
      ),
      persistence.ArrayDataType("7c115a74-9fbd-49cd-b215-ad8f43ded504", true, "d64a20af-86fe-413e-baca-83b4e677e2c2"),
      persistence.StructDataType(
        "95318394-ec7b-40db-ae53-6442437e36de",
        false,
        Array(
          persistence.Attribute("errType", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("errCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("errMsg", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("errCol", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("rawValues", "eefa2d78-af41-41eb-ac5c-518e234cfd4c"),
          persistence.Attribute("mappings", "7c115a74-9fbd-49cd-b215-ad8f43ded504")
        )
      ),
      persistence.ArrayDataType("5789a077-9bd1-400d-87d6-cdfde9a78500", true, "95318394-ec7b-40db-ae53-6442437e36de"),
      persistence.StructDataType(
        "f3e7f30c-0bc8-499e-bf04-8b3d1932bf16",
        false,
        Array(
          persistence.Attribute("transId", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("txnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("ccy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("repCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("exchangeRate", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
          persistence.Attribute("createDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
          persistence.Attribute("effDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
          persistence.Attribute("code", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("type", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("txnDirection", "602147fa-7148-46a7-9978-ba9f63f6b616")
        )
      ),
      persistence.StructDataType(
        "7c9fc3e9-30e1-4a51-918f-fdaeac32744f",
        true,
        Array(
          persistence.Attribute("errType", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("errCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("errMsg", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("errCol", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("rawValues", "eefa2d78-af41-41eb-ac5c-518e234cfd4c"),
          persistence.Attribute("mappings", "7c115a74-9fbd-49cd-b215-ad8f43ded504")
        )
      ),
      persistence.ArrayDataType("d41bc4c9-8f61-49ee-9b28-5fe7afb92076", true, "7c9fc3e9-30e1-4a51-918f-fdaeac32744f"),
      persistence.ArrayDataType("a5b9cdcb-ce52-4143-b393-5bcc8fc0fd4c", false, "a5b9cdcb-ce52-4143-b393-5bcc8fc0fd4"),
      persistence.ArrayDataType("926e42fc-e3ef-4520-854b-af64c089eb00", false, "d41bc4c9-8f61-49ee-9b28-5fe7afb92076"),
      persistence.SimpleDataType("c633cbc0-688c-4cf8-b044-5261082b7f50", true, "decimal(38,18)"),
      persistence.StructDataType(
        "d971a591-f4f8-4589-9629-48360d2fe4e0",
        false,
        Array(
          persistence.Attribute("transId", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("txnCcyAmt", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
          persistence.Attribute("ccy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("repCcyAmt", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
          persistence.Attribute("exchangeRate", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
          persistence.Attribute("createDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
          persistence.Attribute("effDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
          persistence.Attribute("code", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("type", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("txnDirection", "602147fa-7148-46a7-9978-ba9f63f6b616")
        )
      ),
      persistence.SimpleDataType("5d6d8b67-95cc-464c-9f7c-952b20201245", true, "double"),
      persistence.StructDataType(
        "92242e53-eaea-4c5b-bc90-5e174ab3e898",
        true,
        Array(
          persistence.Attribute("ABSATraded", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("CurrencyCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("CurrencyName", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("MajorIndicator", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("PermissibleDailyVolatility", "5d6d8b67-95cc-464c-9f7c-952b20201245")
        )
      ),
      persistence.StructDataType(
        "021fda3e-0cb2-4121-8d80-f3eb3889653a",
        true,
        Array(
          persistence.Attribute("Description", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("SourceSystem", "602147fa-7148-46a7-9978-ba9f63f6b616")
        )
      ),
      persistence.SimpleDataType("67545ab9-6fb0-4fde-b066-0675a8f7d8c5", true, "timestamp"),
      persistence.StructDataType(
        "08495ce9-6914-4df1-84b9-ace18cfabefa",
        true,
        Array(
          persistence.Attribute("ProductMainType", "602147fa-7148-46a7-9978-ba9f63f6b616")
        )
      ),
      persistence.StructDataType(
        "0908faab-4623-4f23-8892-67a614b20d89",
        true,
        Array(
          persistence.Attribute("ProductSubType", "602147fa-7148-46a7-9978-ba9f63f6b616")
        )
      ),
      persistence.StructDataType(
        "f24be64d-6add-40b6-9308-45de36a8a518",
        true,
        Array(
          persistence.Attribute("ProductMainType", "08495ce9-6914-4df1-84b9-ace18cfabefa"),
          persistence.Attribute("ProductSubType", "0908faab-4623-4f23-8892-67a614b20d89")
        )
      ),
      persistence.StructDataType(
        "fb3e57b1-2226-4dd1-a935-53f70d4a2823",
        true,
        Array(
          persistence.Attribute("EnterpriseProduct", "602147fa-7148-46a7-9978-ba9f63f6b616")
        )
      ),
      persistence.StructDataType(
        "16525025-79e4-4060-8a3b-a22053815264",
        true,
        Array(
          persistence.Attribute("Key", "602147fa-7148-46a7-9978-ba9f63f6b616"),
          persistence.Attribute("SDS", "eefa2d78-af41-41eb-ac5c-518e234cfd4c"),
          persistence.Attribute("CIF", "eefa2d78-af41-41eb-ac5c-518e234cfd4c")
        )
      ),
      persistence.SimpleDataType("3d8b737e-7b6f-416e-b6bd-3423959121ef", false, "string"),
      persistence.SimpleDataType("df6acd4f-e9cd-4485-9727-6a9453373918", true, "null"),
      persistence.SimpleDataType("7785aba3-0a6f-44ae-b8e6-fbf02a2ff6c", false, "boolean"),
      persistence.SimpleDataType("839c9607-0b9f-4efe-8066-c18ca97cd3dc", false, "integer"),
      persistence.SimpleDataType("0096c862-e16e-4215-96b8-c58a7c1680eb", false, "date"),
      persistence.ArrayDataType("c18b0377-f1b5-49e1-a368-58643e35439e", false, "a5b9cdcb-ce52-4143-b393-5bcc8fc0fd4c"),
      persistence.SimpleDataType("7db88d2e-9903-4961-a739-de914eb3f952", true, "decimal(8,8)"),
      persistence.SimpleDataType("e7e4fecf-8f5e-4f57-8859-5354fa2f30ea", false, "decimal(8,8)"),
      persistence.SimpleDataType("d3d7add3-cd2d-41a6-9b0b-20d6b14ccccc", true, "boolean"),
      persistence.ArrayDataType("c18d7e59-616d-493d-b099-6f1d09f2758b", false, "a5b9cdcb-ce52-4143-b393-5bcc8fc0fd4c"),
      persistence.SimpleDataType("6d057a8e-d330-4b99-a366-19bf501cc1c5", false, "long")

    )
    private val inputSchemas = Array[persistence.Attribute](
      persistence.Attribute("REPORTDATE", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
      persistence.Attribute("ACCOUNT", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("CYSPRT", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
      persistence.Attribute("LMVD_YMD", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
      persistence.Attribute("ConformedCurrencyCCY", "92242e53-eaea-4c5b-bc90-5e174ab3e898"),
      persistence.Attribute("ConformedSourceSystem", "021fda3e-0cb2-4121-8d80-f3eb3889653a"),
      persistence.Attribute("errCol", "d41bc4c9-8f61-49ee-9b28-5fe7afb92076"),
      persistence.Attribute("enceladus_info_date", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
      persistence.Attribute("enceladus_info_version", "2b737c59-6443-4a2a-80c3-a99709b306a6"),
      persistence.Attribute("ACCOUNT", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("DLDSTN", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("DRORCR", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("PNAR", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("PSTA_DEC", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
      persistence.Attribute("PSTA_ZAR", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
      persistence.Attribute("PSTD_YMD", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
      persistence.Attribute("TRANSID", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("errCol-402b6083-3e6b-48c5-8b47-732419d527ee", "d41bc4c9-8f61-49ee-9b28-5fe7afb92076"),
      persistence.Attribute("enceladus_info_date", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
      persistence.Attribute("enceladus_info_version", "2b737c59-6443-4a2a-80c3-a99709b306a6")
    )
    private val outputSchema = Array[persistence.Attribute](
      persistence.Attribute("ACCOUNT", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("enceladus_info_date", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
      persistence.Attribute("enceladus_info_version", "2b737c59-6443-4a2a-80c3-a99709b306a6"),
      persistence.Attribute("REPORTDATE", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
      persistence.Attribute("CYSPRT", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
      persistence.Attribute("LMVD_YMD", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
      persistence.Attribute("ConformedCurrencyCCY", "92242e53-eaea-4c5b-bc90-5e174ab3e898"),
      persistence.Attribute("ConformedSourceSystem", "021fda3e-0cb2-4121-8d80-f3eb3889653a"),
      persistence.Attribute("errCol", "d41bc4c9-8f61-49ee-9b28-5fe7afb92076"),
      persistence.Attribute("DLDSTN", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("DRORCR", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("PNAR", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("PSTA_DEC", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
      persistence.Attribute("PSTA_ZAR", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
      persistence.Attribute("PSTD_YMD", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
      persistence.Attribute("TRANSID", "602147fa-7148-46a7-9978-ba9f63f6b616"),
      persistence.Attribute("errCol-402b6083-3e6b-48c5-8b47-732419d527ee", "d41bc4c9-8f61-49ee-9b28-5fe7afb92076")
    )
    val schemas = Array(inputSchemas, outputSchema)

    val operationDetails = OperationDetails(
      operation,
      dataTypes,
      schemas,
      Array(new Integer(0)),
      1
    )

    test("testOperation") {
      implicit val executionContext = ExecutionContext.Implicits.global
      val operationRepoMock = mock[OperationRepository]
      val operationDetailsController = new OperationDetailsController(operationRepoMock)

      when(operationRepoMock.findById(any())(any())).thenReturn(Future.successful(operationDetails))

      val res = operationDetailsController.operation("2141834d-abd6-4be4-80b9-01661b842ab9")

      for (operationDetails <- res) yield {
        operationDetails.dataTypes.length should be(12)
        val dataTypeIds = operationDetails.dataTypes.map(dt => dt.id)
        dataTypeIds should contain("021fda3e-0cb2-4121-8d80-f3eb3889653a")
        dataTypeIds should contain("7c9fc3e9-30e1-4a51-918f-fdaeac32744f")
        dataTypeIds should contain("d64a20af-86fe-413e-baca-83b4e677e2c2")
        dataTypeIds should contain("5d6d8b67-95cc-464c-9f7c-952b20201245")
        dataTypeIds should contain("92242e53-eaea-4c5b-bc90-5e174ab3e898")
        dataTypeIds should contain("2b737c59-6443-4a2a-80c3-a99709b306a6")
        dataTypeIds should contain("7c115a74-9fbd-49cd-b215-ad8f43ded504")
        dataTypeIds should contain("602147fa-7148-46a7-9978-ba9f63f6b616")
        dataTypeIds should contain("d41bc4c9-8f61-49ee-9b28-5fe7afb92076")
        dataTypeIds should contain("eefa2d78-af41-41eb-ac5c-518e234cfd4c")
        dataTypeIds should contain("c633cbc0-688c-4cf8-b044-5261082b7f50")
      }
    }

}