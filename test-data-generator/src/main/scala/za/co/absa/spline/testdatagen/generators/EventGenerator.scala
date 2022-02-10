package za.co.absa.spline.testdatagen.generators

import za.co.absa.spline.producer.model.v1_2.{ExecutionEvent, ExecutionPlan}

object EventGenerator {

  def generate(executionPlan: ExecutionPlan): ExecutionEvent = {
    ExecutionEvent(
      planId = executionPlan.id,
      timestamp = System.currentTimeMillis(),
      durationNs = None,
      error = None,
      extra = Map.empty
    )
  }
}
