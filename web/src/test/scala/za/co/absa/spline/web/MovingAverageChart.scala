/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.web

import de.sciss.chart.XYChart
import de.sciss.chart.module.ChartFactories
import org.jfree.chart.axis.NumberAxis
import org.jfree.chart.renderer.xy.{SamplingXYLineRenderer, XYDotRenderer}
import za.co.absa.spline.common.future.MovingAverageCalculator

object MovingAverageChart extends App with ChartFactories {

  val measurer = new MovingAverageCalculator(10000, 0.05)

  val SCALE = 10000

  val data =
    for (i <- Range(1, 10000, 10))
      yield {
        val phase = i * 10 * math.Pi / SCALE
        val base = i + (1 + math.sin(phase)) * SCALE / 5
        val deviationFactor = 1 + 0.5 * (math.random - 0.5)
        val a = (base * deviationFactor).toLong
        val b = measurer.currentAverage
        measurer.addMeasurement(a)
        (i, a.toInt, b.toInt)
      }

  val data1 = data.map { case (i, a, _) => (i, a) }
  val data2 = data.map { case (i, _, b) => (i, b) }
  val data3 = data2.map { case (i, x) => (i, (x * 2.0).toInt) }

  val plot = new XYPlot(
    ToXYDataset[Seq[(Int, Int)]].convert(data1),
    new NumberAxis(),
    new NumberAxis(),
    new XYDotRenderer {
      setDotHeight(2)
      setDotWidth(2)
    }) {

    setDataset(1, ToXYDataset[Seq[(Int, Int)]].convert(data2))
    setRenderer(1, new SamplingXYLineRenderer)

    setDataset(2, ToXYDataset[Seq[(Int, Int)]].convert(data3))
    setRenderer(2, new SamplingXYLineRenderer)
  }

  implicit val theme: ChartTheme = ChartTheme.Default
  XYChart(plot, title = "", legend = true).show()
}
