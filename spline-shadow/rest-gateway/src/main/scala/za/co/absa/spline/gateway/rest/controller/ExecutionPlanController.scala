package za.co.absa.spline.gateway.rest.controller

import java.util.{Date, UUID}

import io.swagger.annotations.ApiOperation
import org.springframework.web.bind.annotation._
import za.co.absa.spline.gateway.rest.model.ExecutedLogicalPlan.LogicalPlan
import za.co.absa.spline.gateway.rest.model.{AppInfo, ExecutedLogicalPlan, ExecutionInfo}

@RestController
@RequestMapping(Array("/execution"))
class ExecutionPlanController {

  @GetMapping(Array("/{execId}/lineage"))
  @ApiOperation("Returns a logical plan (aka partial lineage) of a given execution")
  def lineage(@PathVariable("execId") execId: ExecutionInfo.Id): ExecutedLogicalPlan =
    ExecutedLogicalPlan(
      app = AppInfo("my app", props = Map("sparkVer" -> "1.2.3")),
      execution = ExecutionInfo(UUID.randomUUID(), None, Some(new Date()), None),
      dag = LogicalPlan(Nil, Nil))
}
