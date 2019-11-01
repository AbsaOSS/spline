**Spline** (from **Sp**ark **line**age) project helps people get insight into data processing performed by **Apache Spark &trade;**

---

[![TeamCity build (develop)](https://teamcity.jetbrains.com/app/rest/builds/aggregated/strob:%28locator:%28buildType:%28id:OpenSourceProjects_AbsaOSSSpline_AutomaticBuilds%29,branch:develop%29%29/statusIcon.svg)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=OpenSourceProjects_AbsaOSSSpline_AutomaticBuilds&branch=develop&tab=buildTypeStatusDiv)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5469c979319541bca9a6752059bb4ec4)](https://app.codacy.com/app/ABSA_OSS/spline?utm_source=github.com&utm_medium=referral&utm_content=AbsaOSS/spline&utm_campaign=Badge_Grade_Dashboard)
[![Maven Central](https://maven-badges.herokuapp.com/maven-central/za.co.absa.spline/spline-core/badge.svg)](https://maven-badges.herokuapp.com/maven-central/za.co.absa.spline/spline-core)

The project consists of three main parts:
- Spark Agent that sits on drivers, capturing the data lineage from Spark jobs being executed by analyzing the execution plans
- Rest Gateway, that receive the lineage data from agent and stores it in the database
- Web UI application that visualizes the stored data lineages

There are several other tools. Check the examples to get a better idea how to use Spline.

Other docs/readme files can be found at:
- [ClientUI](client-ui/README.md)
- [Examples](examples/README.md)
- [Spark Agent](spark/agent/README.md)
- [Spline Paper](https://github.com/AbsaOSS/spline/releases/download/release%2F0.2.7/Spline_paper_IEEE_2018.pdf)

Spline currently supports Spark 2.2+, but in older versions (especially 2.2) lineage information provided by spark is limited.

## Motivation

Spline aims to fill a big gap within the Apache Hadoop ecosystem. Spark jobs shouldn’t be treated only as magic black boxes; people should be able to understand what happens with their data. Our main focus is to solve the following particular problems:

- Regulatory requirement for SA banks (BCBS 239)

    By 2020, all South African banks will have to be able to prove how numbers are calculated in their reports to the regulatory authority.

- Documentation of business logic

    Business analysts should get a chance to verify whether Spark jobs were written according to the rules they provided. Moreover, it would be beneficial for them to have up-to-date documentation where they can refresh their knowledge of a project.

- Identification of performance bottlenecks

    Our focus is not only business-oriented; we also see Spline as a development tool that should be able to help developers with the performance optimization of their Spark jobs.


---

    Copyright 2017 ABSA Group Limited
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
