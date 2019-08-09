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

Go to examples directory:
  cd examples

Make sure "spline.properties" file is properly configured for e.g. Mongo:
  vi src/main/resources/spline.properties

Build project Example with Shade profile to create Fat-JAR containing all needed dependencies:
  mvn package -P spark-2.3,shade

Execute pyspark with Fat-JAR on class path:
  pyspark --jars 'target/spline-examples-0.4.0-SNAPSHOT.jar'

Execute rest of this file inside PySpark.
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

# Review lineage on the UI or inside MongoDB.
