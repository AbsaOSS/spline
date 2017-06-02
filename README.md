**Spline** (from **Sp**ark **line**age) project helps people get insight into data processing performed by [Apache Spark](http://spark.apache.org/).

The project consists of two parts:
- A core library that sits on drivers, capturing data lineages from the jobs being executed by analyzing Spark execution plans
- and a Web UI application that visualizes the stored data lineages.

***

# Summary

### in your Spark job:
```scala
// given a Spark session ...
val sparkSession: SparkSession = ???

// ... enable data lineage tracking with Spline
import za.co.absa.spline.core.SparkLineageInitializer._
sparkSession.enableLineageTracking()

// ... then run some Dataset computations as usual.
// Data lineage of the job will be captured and stored in the
// configured Mongo database for further visualization by Spline Web UI
```

### a sample lineage visualization
<a href="imgs/screenshot.png"><img src="imgs/screenshot.png" width="660"></a>


# Motivation
Spline should fill a big gap within [Apache Hadoop](http://hadoop.apache.org/) ecosystem.
Spark jobs should't be treated only as magic black boxes and people should have a chance to understant what happens with their data.
Our main focus is to solve the following particular problems:

* **Regulatory requirement for SA banks (BCBS 239)**

    By 2020, all South African banks will have to be able to prove how numbers are calculated in their reports to regulatory authority.

* **Documentation of business logic**

    Business analysts should get a chance to verify whether Spark jobs were written according to the rules they provided.
    Moreover, it would be beneficial for them to have an up-to-date documentation where they could refresh their knowledge about a project.

* **Identification of performance bottlenecks**

    Our focus is not only business-oriented.
    We see Spline also as a development tool that should be able to help developers with performance optimization of their Spark jobs.

# Getting started

### Dependencies

##### Runtime

* [Scala](https://www.scala-lang.org/) 2.11
* [Spark](http://spark.apache.org/) 2.2.0 (snapshot version is available in the ASF maven [repo](https://repository.apache.org/content/groups/snapshots/))
* [MongoDB](https://www.mongodb.com/) 3.2

##### Build time
* [Node.js](https://nodejs.org/) 6.9
* [Maven](https://maven.apache.org) 3.0

### Building
```
mvn install -DskipTests
```

### Installation

##### In your Spark job:

1. Include Spline core jar into your Spark job classpath (it's enough to have it in a driver only, executors don't need it)

1. Configure database connection properties (see [Configuration](#configuration) section)

1. Enable data lineage tracking on a Spark session before calling any action method:
    ```scala
    import za.co.absa.spline.core.SparkLineageInitializer._
    sparkSession.enableLineageTracking()
    ```

##### Web UI application:

1. Setup the database connection properties (either via system environment variables or JVM system properties) in the following format:
    ```properties
    spline.mongodb.url=mongodb://11.22.33.44
    spline.mongodb.name=my_lineage_database_name
    ```

2. Deploy Spline WAR file to your Java web container (tested on Tomcat 7, but other containers should also work)

# <a name="configuration"></a> Configuration
When enabling data lineage tracking for a Spark session in your Spark job a ```SparkConfigurer``` instance can be passed
as a argument to the ```enableLineageTracking()``` method.

The method signature is the following:
```scala
def enableLineageTracking(configurer: SplineConfigurer = new DefaultSplineConfigurer(defaultSplineConfiguration)): SparkSession
```

```DefaultSplineConfigurer``` looks up the configuration parameters in the given ```Configuration``` object.

```defaultSplineConfiguration``` object combines several configuration sources (ordered by priority):
1. Hadoop config (```core-site.xml```)
1. JVM system properties
1. ```spline.properties``` file in the classpath

### Configuration properties

| Property | Description | Example
| --- | --- | --- |
| `spline.mongodb.url` | Mongo connection URL | mongodb://1.2.3.4
| `spline.mongodb.name` | Mongo database name | my_job_lineage_data


# Examples
[Sample](sample/) folder contains some sample Spline enabled Spark jobs.
The jobs can be executed locally via ```SamplesRunner``` unit test class.

### Running sample job

First, configure Mongo database connection where Spline will store captured lineage data.
See [Configuration](#configuration) section for details.

Then run the following commands:

```
cd sample
mvn test -Psamples -Dspline.mongodb.url={MONGO CONNECTION URL} -Dspline.mongodb.name={MONGO DATABASE NAME}
```

It will execute [SamplesRunner](sample/src/test/scala/za/co/absa/spline/sample/SamplesRunner.scala) test that will run two sample jobs:
[SampleJob1](sample/src/main/scala/za/co/absa/spline/sample/SampleJob1.scala) and
[SampleJob2](sample/src/main/scala/za/co/absa/spline/sample/SampleJob2.scala)

Sample jobs read data from the [/sample/data/input/](sample/data/input/) folder
and write the result into [/sample/data/results/](sample/data/results/)

When the lineage data is captured and stored into the database, it can be visualized and explored via Spline UI Web application.

##### Sample job 1

```scala
val sparkBuilder = SparkSession.builder().appName("Sample Job 2")
val spark = sparkBuilder.getOrCreate()

// Enable data lineage tracking with Spline
import za.co.absa.spline.core.SparkLineageInitializer._
spark.enableLineageTracking()

// A business logic of a Spark job ...
import spark.implicits._

val sourceDS = spark.read
  .option("header", "true")
  .option("inferSchema", "true")
  .csv("data/input/wikidata.csv")
  .as("source")
  .filter($"total_response_size" > 1000)
  .filter($"count_views" > 10)

val domainMappingDS = spark.read
  .option("header", "true")
  .option("inferSchema", "true")
  .csv("data/input/domain.csv")
  .as("mapping")

val joinedDS = sourceDS
  .join(domainMappingDS, $"domain_code" === $"d_code", "left_outer")
  .select($"page_title".as("page"), $"d_name".as("domain"), $"count_views")

joinedDS.write.mode(SaveMode.Overwrite).parquet("data/results/job1_results")
```

# Contribution

**TODO**

# License

    Copyright 2017 Barclays Africa Group Limited

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
