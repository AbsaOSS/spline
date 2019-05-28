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

import java.util.UUID

import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{AsyncFunSuite, Matchers}
import za.co.absa.spline.consumer.service.model.{AttributeRef, Operation, OperationDetails}
import za.co.absa.spline.consumer.service.repo.OperationRepository
import za.co.absa.spline.persistence.model._

import scala.concurrent.{ExecutionContext, Future}

class OperationDetailsControllerTest extends AsyncFunSuite with MockitoSugar with Matchers {


  private val operation: Operation = new Operation(
    _id = UUID.fromString("2141834d-abd6-4be4-80b9-01661b842ab9"),
    _type = "Transformation",
    name = "Project",
    readsFrom = null,
    writesTo = null
  )
  val dataTypes = Array[DataType](
    SimpleDataType("602147fa-7148-46a7-9978-ba9f63f6b616", true, "string"),
    SimpleDataType("89348e28-5621-4ce1-b705-c1301b4d35a7", true, "decimal(28,8)"),
    SimpleDataType("951f2d88-f8b4-4bc8-b5bf-524811c9197a", true, "date"),
    SimpleDataType("3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6", true, "long"),
    StructDataType(
      "21d3b2cc-1528-4f23-b4c2-c0aab1dbb743",
      false,
      Array(
        StructDataTypeField("transId", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("txnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("ccy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("repCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("exchangeRate", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("createDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
        StructDataTypeField("effDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
        StructDataTypeField("code", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("type", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("vatRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("correctionInd", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("issuingBank", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("advisingBank", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("txnDirection", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("dateIssued", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("expDate", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("expDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
        StructDataTypeField("limitTxnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("limitCcy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("limitRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("limitUtilisedTxnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("limitUtilisedCcy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("limitUtilisedRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("intRateProductCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("intRateProductCodeDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("debitInterestRateTypeCodeDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("creditInterestRateTypeCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("creditInterestRateTypeCodeDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("txnDescription", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("beneficiaryName", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("tenorDays", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
        StructDataTypeField("tenor", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("escapeClauseIndicator", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("escapeClausePeriod", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
        StructDataTypeField("dealConfirmed", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("txnBusinessUnitCode", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
        StructDataTypeField("capitalBalanceGlAccountCode", "602147fa-7148-46a7-9978-ba9f63f6b616")
      )
    ),
    StructDataType(
      "9b5fd897-7dbf-4a00-8ed1-da269995e599",
      false,
      Array(
        StructDataTypeField("typeDescription", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("tradedPrice", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("siteCode", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
        StructDataTypeField("siteCodeDescription", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("capitalBalanceGlAccountCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("glAccountDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("chargeType", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("chargeId", "3f6ce2cf-8afa-4a8f-a844-0d0dccbc7ce6"),
        StructDataTypeField("chargeStatus", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("chargeStatusDesc", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("originalCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("cashflowTxnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("cashflowCcy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("cashflowRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("cashflowRecoverableTxnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("cashflowRecoverableRepCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7")
      )
    ),
    ArrayDataType("a5db84f2-4562-478d-9f45-2619c9d939a9", false, "9b5fd897-7dbf-4a00-8ed1-da269995e599"),
    SimpleDataType("2b737c59-6443-4a2a-80c3-a99709b306a6", true, "Integer"),
    ArrayDataType("eefa2d78-af41-41eb-ac5c-518e234cfd4c", true, "602147fa-7148-46a7-9978-ba9f63f6b616"),
    StructDataType(
      "d64a20af-86fe-413e-baca-83b4e677e2c2",
      true,
      Array(
        StructDataTypeField("mappingTableColumn", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("mappedDatasetColumn", "602147fa-7148-46a7-9978-ba9f63f6b616")
      )
    ),
    ArrayDataType("7c115a74-9fbd-49cd-b215-ad8f43ded504", true, "d64a20af-86fe-413e-baca-83b4e677e2c2"),
    StructDataType(
      "95318394-ec7b-40db-ae53-6442437e36de",
      false,
      Array(
        StructDataTypeField("errType", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("errCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("errMsg", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("errCol", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("rawValues", "eefa2d78-af41-41eb-ac5c-518e234cfd4c"),
        StructDataTypeField("mappings", "7c115a74-9fbd-49cd-b215-ad8f43ded504")
      )
    ),
    ArrayDataType("5789a077-9bd1-400d-87d6-cdfde9a78500", true, "95318394-ec7b-40db-ae53-6442437e36de"),
    StructDataType(
      "f3e7f30c-0bc8-499e-bf04-8b3d1932bf16",
      false,
      Array(
        StructDataTypeField("transId", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("txnCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("ccy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("repCcyAmt", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("exchangeRate", "89348e28-5621-4ce1-b705-c1301b4d35a7"),
        StructDataTypeField("createDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
        StructDataTypeField("effDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
        StructDataTypeField("code", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("type", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("txnDirection", "602147fa-7148-46a7-9978-ba9f63f6b616")
      )
    ),
    StructDataType(
      "7c9fc3e9-30e1-4a51-918f-fdaeac32744f",
      true,
      Array(
        StructDataTypeField("errType", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("errCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("errMsg", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("errCol", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("rawValues", "eefa2d78-af41-41eb-ac5c-518e234cfd4c"),
        StructDataTypeField("mappings", "7c115a74-9fbd-49cd-b215-ad8f43ded504")
      )
    ),
    ArrayDataType("d41bc4c9-8f61-49ee-9b28-5fe7afb92076", true, "7c9fc3e9-30e1-4a51-918f-fdaeac32744f"),
    ArrayDataType("a5b9cdcb-ce52-4143-b393-5bcc8fc0fd4c", false, "a5b9cdcb-ce52-4143-b393-5bcc8fc0fd4"),
    ArrayDataType("926e42fc-e3ef-4520-854b-af64c089eb00", false, "d41bc4c9-8f61-49ee-9b28-5fe7afb92076"),
    SimpleDataType("c633cbc0-688c-4cf8-b044-5261082b7f50", true, "decimal(38,18)"),
    StructDataType(
      "d971a591-f4f8-4589-9629-48360d2fe4e0",
      false,
      Array(
        StructDataTypeField("transId", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("txnCcyAmt", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
        StructDataTypeField("ccy", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("repCcyAmt", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
        StructDataTypeField("exchangeRate", "c633cbc0-688c-4cf8-b044-5261082b7f50"),
        StructDataTypeField("createDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
        StructDataTypeField("effDate", "951f2d88-f8b4-4bc8-b5bf-524811c9197a"),
        StructDataTypeField("code", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("type", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("txnDirection", "602147fa-7148-46a7-9978-ba9f63f6b616")
      )
    ),
    SimpleDataType("5d6d8b67-95cc-464c-9f7c-952b20201245", true, "double"),
    StructDataType(
      "92242e53-eaea-4c5b-bc90-5e174ab3e898",
      true,
      Array(
        StructDataTypeField("ABSATraded", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("CurrencyCode", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("CurrencyName", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("MajorIndicator", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("PermissibleDailyVolatility", "5d6d8b67-95cc-464c-9f7c-952b20201245")
      )
    ),
    StructDataType(
      "021fda3e-0cb2-4121-8d80-f3eb3889653a",
      true,
      Array(
        StructDataTypeField("Description", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("SourceSystem", "602147fa-7148-46a7-9978-ba9f63f6b616")
      )
    ),
    SimpleDataType("67545ab9-6fb0-4fde-b066-0675a8f7d8c5", true, "timestamp"),
    StructDataType(
      "08495ce9-6914-4df1-84b9-ace18cfabefa",
      true,
      Array(
        StructDataTypeField("ProductMainType", "602147fa-7148-46a7-9978-ba9f63f6b616")
      )
    ),
    StructDataType(
      "0908faab-4623-4f23-8892-67a614b20d89",
      true,
      Array(
        StructDataTypeField("ProductSubType", "602147fa-7148-46a7-9978-ba9f63f6b616")
      )
    ),
    StructDataType(
      "f24be64d-6add-40b6-9308-45de36a8a518",
      true,
      Array(
        StructDataTypeField("ProductMainType", "08495ce9-6914-4df1-84b9-ace18cfabefa"),
        StructDataTypeField("ProductSubType", "0908faab-4623-4f23-8892-67a614b20d89")
      )
    ),
    StructDataType(
      "fb3e57b1-2226-4dd1-a935-53f70d4a2823",
      true,
      Array(
        StructDataTypeField("EnterpriseProduct", "602147fa-7148-46a7-9978-ba9f63f6b616")
      )
    ),
    StructDataType(
      "16525025-79e4-4060-8a3b-a22053815264",
      true,
      Array(
        StructDataTypeField("Key", "602147fa-7148-46a7-9978-ba9f63f6b616"),
        StructDataTypeField("SDS", "eefa2d78-af41-41eb-ac5c-518e234cfd4c"),
        StructDataTypeField("CIF", "eefa2d78-af41-41eb-ac5c-518e234cfd4c")
      )
    ),
    SimpleDataType("3d8b737e-7b6f-416e-b6bd-3423959121ef", false, "string"),
    SimpleDataType("df6acd4f-e9cd-4485-9727-6a9453373918", true, "null"),
    SimpleDataType("7785aba3-0a6f-44ae-b8e6-fbf02a2ff6c", false, "boolean"),
    SimpleDataType("839c9607-0b9f-4efe-8066-c18ca97cd3dc", false, "integer"),
    SimpleDataType("0096c862-e16e-4215-96b8-c58a7c1680eb", false, "date"),
    ArrayDataType("c18b0377-f1b5-49e1-a368-58643e35439e", false, "a5b9cdcb-ce52-4143-b393-5bcc8fc0fd4c"),
    SimpleDataType("7db88d2e-9903-4961-a739-de914eb3f952", true, "decimal(8,8)"),
    SimpleDataType("e7e4fecf-8f5e-4f57-8859-5354fa2f30ea", false, "decimal(8,8)"),
    SimpleDataType("d3d7add3-cd2d-41a6-9b0b-20d6b14ccccc", true, "boolean"),
    ArrayDataType("c18d7e59-616d-493d-b099-6f1d09f2758b", false, "a5b9cdcb-ce52-4143-b393-5bcc8fc0fd4c"),
    SimpleDataType("6d057a8e-d330-4b99-a366-19bf501cc1c5", false, "long")

  )
  private val inputSchemas = Array[AttributeRef](
    AttributeRef("REPORTDATE", UUID.fromString("951f2d88-f8b4-4bc8-b5bf-524811c9197a")),
    AttributeRef("ACCOUNT", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("CYSPRT", UUID.fromString("c633cbc0-688c-4cf8-b044-5261082b7f50")),
    AttributeRef("LMVD_YMD", UUID.fromString("951f2d88-f8b4-4bc8-b5bf-524811c9197a")),
    AttributeRef("ConformedCurrencyCCY", UUID.fromString("92242e53-eaea-4c5b-bc90-5e174ab3e898")),
    AttributeRef("ConformedSourceSystem", UUID.fromString("021fda3e-0cb2-4121-8d80-f3eb3889653a")),
    AttributeRef("errCol", UUID.fromString("d41bc4c9-8f61-49ee-9b28-5fe7afb92076")),
    AttributeRef("enceladus_info_date", UUID.fromString("951f2d88-f8b4-4bc8-b5bf-524811c9197a")),
    AttributeRef("enceladus_info_version", UUID.fromString("2b737c59-6443-4a2a-80c3-a99709b306a6")),
    AttributeRef("ACCOUNT", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("DLDSTN", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("DRORCR", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("PNAR", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("PSTA_DEC", UUID.fromString("c633cbc0-688c-4cf8-b044-5261082b7f50")),
    AttributeRef("PSTA_ZAR", UUID.fromString("c633cbc0-688c-4cf8-b044-5261082b7f50")),
    AttributeRef("PSTD_YMD", UUID.fromString("951f2d88-f8b4-4bc8-b5bf-524811c9197a")),
    AttributeRef("TRANSID", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("errCol-402b6083-3e6b-48c5-8b47-732419d527ee", UUID.fromString("d41bc4c9-8f61-49ee-9b28-5fe7afb92076")),
    AttributeRef("enceladus_info_date", UUID.fromString("951f2d88-f8b4-4bc8-b5bf-524811c9197a")),
    AttributeRef("enceladus_info_version", UUID.fromString("2b737c59-6443-4a2a-80c3-a99709b306a6"))
  )
  private val outputSchema = Array[AttributeRef](
    AttributeRef("ACCOUNT", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("enceladus_info_date", UUID.fromString("951f2d88-f8b4-4bc8-b5bf-524811c9197a")),
    AttributeRef("enceladus_info_version", UUID.fromString("2b737c59-6443-4a2a-80c3-a99709b306a6")),
    AttributeRef("REPORTDATE", UUID.fromString("951f2d88-f8b4-4bc8-b5bf-524811c9197a")),
    AttributeRef("CYSPRT", UUID.fromString("c633cbc0-688c-4cf8-b044-5261082b7f50")),
    AttributeRef("LMVD_YMD", UUID.fromString("951f2d88-f8b4-4bc8-b5bf-524811c9197a")),
    AttributeRef("ConformedCurrencyCCY", UUID.fromString("92242e53-eaea-4c5b-bc90-5e174ab3e898")),
    AttributeRef("ConformedSourceSystem", UUID.fromString("021fda3e-0cb2-4121-8d80-f3eb3889653a")),
    AttributeRef("errCol", UUID.fromString("d41bc4c9-8f61-49ee-9b28-5fe7afb92076")),
    AttributeRef("DLDSTN", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("DRORCR", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("PNAR", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("PSTA_DEC", UUID.fromString("c633cbc0-688c-4cf8-b044-5261082b7f50")),
    AttributeRef("PSTA_ZAR", UUID.fromString("c633cbc0-688c-4cf8-b044-5261082b7f50")),
    AttributeRef("PSTD_YMD", UUID.fromString("951f2d88-f8b4-4bc8-b5bf-524811c9197a")),
    AttributeRef("TRANSID", UUID.fromString("602147fa-7148-46a7-9978-ba9f63f6b616")),
    AttributeRef("errCol-402b6083-3e6b-48c5-8b47-732419d527ee", UUID.fromString("d41bc4c9-8f61-49ee-9b28-5fe7afb92076"))
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

    val res = operationDetailsController.operation(UUID.fromString("2141834d-abd6-4be4-80b9-01661b842ab9"))

    for (operationDetails <- res) yield {
      operationDetails.dataTypes.length should be(12)
      val dataTypeIds = operationDetails.dataTypes.map(dt => dt._key)
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
