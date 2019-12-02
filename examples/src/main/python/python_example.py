#
# Copyright 2017 ABSA Group Limited
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#


"""
This is simplest example of how to track a lineage with Spline.

1. Make sure the Spline Producer instance is running. (See README.md)

2. Go to examples directory:
  cd examples

3. Build Spline Examples:
  mvn package

4. Execute `pyspark` with a Spline spark-agent-bundle corresponding to the Spark version in use:
  pyspark \
    --jars target/spline-examples-0.4.0.jar \
    --packages za.co.absa.spline:spark-agent-bundle-2.4:0.4.0 \
    --conf spline.producer.url=http://localhost:8888/producer

5. Execute the rest of this file inside PySpark.
"""

# Enable Spline tracking:
sc._jvm.za.co.absa.spline.core\
    .SparkLineageInitializer.enableLineageTracking(spark._jsparkSession)

# Execute a job:
spark.read\
    .option("header", "true")\
    .option("inferschema", "true")\
    .csv("data/input/batch/wikidata.csv")\
    .write\
    .mode('overwrite')\
    .csv("data/output/batch/python-sample.csv")

# Review lineage on the Spline UI.
