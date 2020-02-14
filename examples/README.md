## Run Spline examples 

1. Make sure the Spline Producer instance is running ([see instructions](https://absaoss.github.io/spline/0.4.html#start-spline-server))

2. Download the Spline source code from GitHub and switch to the `examples` directory     
    ```shell script
    git clone git@github.com:AbsaOSS/spline.git
    cd spline-spark-agent
    git checkout release/0.4.2
    cd examples
    ```

#### Python (PySpark)

1. Execute `pyspark` with a _Spline Spark Agent Bundle_ corresponding to the _Spark_ and _Scala_ versions in use:
   ```shell script
   pyspark \
     --jars PATH_TO_THE_SPLINE_SPARK_AGENT_BUNDLE_JAR_FILE \
     --conf spark.sql.queryExecutionListeners=za.co.absa.spline.harvester.listener.SplineQueryExecutionListener \
     --conf spark.spline.producer.url=http://localhost:8080/producer
   ```
   In this example we used a so called _codeless_ initialization method, 
   e.i. the one that requires no changes in your Spark application code.
    
   Alternatively you can enable Spline manually by calling the `SparkLineageInitializer.enableLineageTracking()` method.
   See [python_example.py](src/main/python/python_example.py)
   
2. Execute your PySpark code as normal.

#### Spark Shell

Same as `pyspark` example above, but use `spark-shell` command instead.

#### Scala / Java

To run all available examples:
```shell script
mvn test -P examples
```

To run a selected example job (e.g. `Example1Job`):
```shell script
mvn test -P examples -D exampleClass=za.co.absa.spline.example.batch.Example1Job
``` 

To change the Spline Producer URL (default is http://localhost:8080/producer):
```shell script
mvn test -P examples -D spline.producer.url=http://localhost:8888/producer
```

#### Examples source code
  - [Scala](src/main/scala/za/co/absa/spline/example/)
  - [Java](src/main/java/za/co/absa/spline/example/)
  - [Python](src/main/python/)

---

    Copyright 2019 ABSA Group Limited
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
