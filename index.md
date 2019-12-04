---
layout: default
title: v 0.4.0
---

**Data Lineage Tracking And Visualization Solution**

[![TeamCity build (develop)](https://teamcity.jetbrains.com/app/rest/builds/aggregated/strob:%28locator:%28buildType:%28id:OpenSourceProjects_AbsaOSSSpline_AutomaticBuildsWithTests_Spark24%29,branch:develop%29%29/statusIcon.svg)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=OpenSourceProjects_AbsaOSSSpline_AutomaticBuildsWithTests_Spark24&branch=develop&tab=buildTypeStatusDiv)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5469c979319541bca9a6752059bb4ec4)](https://app.codacy.com/app/ABSA_OSS/spline?utm_source=github.com&utm_medium=referral&utm_content=AbsaOSS/spline&utm_campaign=Badge_Grade_Dashboard)	[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5469c979319541bca9a6752059bb4ec4)](https://app.codacy.com/app/ABSA_OSS/spline?utm_source=github.com&utm_medium=referral&utm_content=AbsaOSS/spline&utm_campaign=Badge_Grade_Dashboard)
[![Maven Central](https://maven-badges.herokuapp.com/maven-central/za.co.absa.spline/spline-core/badge.svg)](https://maven-badges.herokuapp.com/maven-central/za.co.absa.spline/spline-core)	[![Maven Central](https://maven-badges.herokuapp.com/maven-central/za.co.absa.spline/parent/badge.svg)](https://search.maven.org/search?q=g:za.co.absa.spline)


The project consists of three main parts:

- Spark Agent that sits on drivers, capturing the data lineage from Spark jobs being executed by analyzing the execution plans

-   Rest Gateway, that receive the lineage data from agent and stores it in the database

-   Web UI application that visualizes the stored data lineages

![Spline diagram](https://user-images.githubusercontent.com/5530211/70050339-fd93f580-15ce-11ea-88b2-4d79ee30d494.png)


There are several other tools. Check the examples to get a better idea how to use Spline.

Other docs/readme files can be found at:
-   [ClientUI](client-ui/README.md)

-   [Examples](examples/README.md)

-   [Spark Agent](spark/agent/README.md)

-   [Spline Paper](https://github.com/AbsaOSS/spline/releases/download/release%2F0.2.7/Spline_paper_IEEE_2018.pdf)

Spline is aimed to be used with Spark 2.3+ but also provides limited support for Spark 2.2.

## Motivation

Spline aims to fill a big gap within the Apache Hadoop ecosystem. Spark jobs shouldn’t be treated only as magic black boxes; people should be able to understand what happens with their data. Our main focus is to solve the following particular problems:

-   Regulatory requirement for SA banks (BCBS 239)

    By 2020, all South African banks will have to be able to prove how numbers are calculated in their reports to the regulatory authority.

-   Documentation of business logic

    Business analysts should get a chance to verify whether Spark jobs were written according to the rules they provided. Moreover, it would be beneficial for them to have up-to-date documentation where they can refresh their knowledge of a project.

-   Identification of performance bottlenecks

    Our focus is not only business-oriented; we also see Spline as a development tool that should be able to help developers with the performance optimization of their Spark jobs.

---

## Get Spline
To get started, you need to get a minimal set of Spline's moving parts - 
a server, an admin tool and a client Web UI to see the captured lineage.

There are two ways how to do it:

#### Download prebuild Spline artifacts from the Maven repo
-   [```za.co.absa.spline:admin:0.4.0```](https://repo1.maven.org/maven2/za/co/absa/spline/admin/0.4.0/)

-   [```za.co.absa.spline:rest-gateway:0.4.0```](https://repo1.maven.org/maven2/za/co/absa/spline/rest-gateway/0.4.0/) 

-   [```za.co.absa.spline:client-web:0.4.0```](https://repo1.maven.org/maven2/za/co/absa/spline/client-web/0.4.0/) (optional)

(REST Server and Web Client modules are also available as [Docker containers](https://hub.docker.com/u/absaoss))

-or-

#### Build Spline from the source code
1.  Make sure you have JDK 8, Maven and NodeJS installed.

2.  Get and unzip the Spline source code:
    ```shell script
    wget https://github.com/AbsaOSS/spline/archive/release/0.4.0.zip
    unzip 0.4.0.zip
    ```

3.  Change the directory:
    ```shell script
    cd spline-release-0.4.0
    ```

4.  Run the Maven build:
    ```shell script
    mvn install -DskipTests
    ```

## Install ArangoDB
Spline server requires ArangoDB to run.
Please install _ArangoDB 3.5+_ according to the instructions [here](https://www.arangodb.com/docs/stable/getting-started-installation.html)

If you prefer a Docker image there is a [Docker repo](https://hub.docker.com/_/arangodb/) as well.
```shell script
docker pull arangodb:3.5.1
```

## Create Spline Database
```shell script
java -jar admin/target/admin-0.4.0.jar db-init arangodb://localhost/spline
```

## Start Spline Server
Spline server can be started using 2 diffrent ways:

-   Docker: 

```shell script
docker container run \
      -e spline.database.connectionUrl=arangodb://172.17.0.1/spline \
      -p 8080:8080 \
      absaoss/spline-rest-server
```

-   Java compatible Web-Container (e.g. Tomcat):

You can find a WAR-file in the Maven repo here:
[```za.co.absa.spline:rest-gateway:0.4.0```](https://repo1.maven.org/maven2/za/co/absa/spline/rest-gateway/0.4.0/)

Add the argument for the arango connection string `-Dspline.database.connectionUrl=arangodb://localhost/spline`

The server exposes the following REST API:
-   Producer API (`/producer/*`) 
-   Consumer API (`/consumer/*`)

... and other useful URLs:
-   Running server version information: [/about/version](http://localhost:8080/about/version)
-   Producer API Swagger documentation: [/docs/producer.html](http://localhost:8080/docs/producer.html) 
-   Consumer API Swagger documentation: [/docs/consumer.html](http://localhost:8080/docs/consumer.html) 

## Start Spline UI

Spline web client can be started using 3 diffrent ways:

-   Docker: 

```shell script
docker container run \
      -e spline.consumer.url=http://172.17.0.1:8080/consumer \
      -p 9090:8080 \
      absaoss/spline-web-client
```

-   Java compatible Web-Container (e.g. Tomcat):

You can find the WAR-file of the Web Client in the repo here:
[```za.co.absa.spline:client-web:0.4.0```](https://repo1.maven.org/maven2/za/co/absa/spline/client-web/0.4.0/)

Add the argument for the consumer url `-Dspline.consumer.url=http://localhost:8080/consumer`

-   Node JS application (For development purposes): 

Download [```node.js```](https://nodejs.org/en/) then install [```@angular/cli```](https://www.npmjs.com/package/@angular/cli) to run `ng serve` or `ng-build` command.

To specify the consumer url please edit the [config.json](https://github.com/AbsaOSS/spline/blob/develop/client-ui/src/assets/config.json) file

You can find the documentation of this module in [ClientUI](client-ui/README.md).

### Check the result in the browser
<http://localhost:9090>

## Use spline in your application
Add a dependency on Spark Agent.
```xml
<dependency>
    <groupId>za.co.absa.spline</groupId>
    <artifactId>spark-agent</artifactId>
    <version>0.4.0</version>
</dependency>
```
In your spark job you have to enable spline.
```scala
// given a Spark session ...
val sparkSession: SparkSession = ???

// ... enable data lineage tracking with Spline
import za.co.absa.spline.harvester.SparkLineageInitializer._
sparkSession.enableLineageTracking()

// ... then run some Dataset computations as usual.
// Data lineage of the job will be captured and stored in the
// configured database for further visualization by Spline Web UI
```
### Properties

You also need to set some configuration properties. Spline combine these properties from several sources:
1.  Hadoop config (`core-site.xml`)

2.  JVM system properties

3.  `spline.properties` file in the classpath

#### `spline.mode`
-   *`DISABLED`* Lineage tracking is completely disabled and Spline is unhooked from Spark.

-   *`REQUIRED`* If Spline fails to initialize itself (e.g. wrong configuration, no db connection etc) the Spark application aborts with an error.

-   *`BEST_EFFORT`* (default) Spline will try to initialize itself, but if fails it switches to DISABLED mode allowing the Spark application to proceed normally without Lineage tracking.

#### `spline.producer.url`
-   url of spline producer (part of rest gateway responsible for storing lineages in database)

Example:
```properties
spline.mode=REQUIRED
spline.producer.url=http://localhost:8080/producer
```

---

    Copyright 2019 ABSA Group Limited
    
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
