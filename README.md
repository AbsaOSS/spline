**Spline** (from **Sp**ark **line**age) project helps people get insight into data processing performed by **Apache Spark &trade;**

[![Maven Central](https://maven-badges.herokuapp.com/maven-central/za.co.absa.spline/parent/badge.svg)](https://search.maven.org/search?q=g:za.co.absa.spline)
[![TeamCity build (develop)](https://teamcity.jetbrains.com/app/rest/builds/aggregated/strob:%28locator:%28buildType:%28id:OpenSourceProjects_AbsaOSSSpline_AutomaticBuildsWithTests_Spark24%29,branch:develop%29%29/statusIcon.svg)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=OpenSourceProjects_AbsaOSSSpline_AutomaticBuildsWithTests_Spark24&branch=develop&tab=buildTypeStatusDiv)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5469c979319541bca9a6752059bb4ec4)](https://app.codacy.com/app/ABSA_OSS/spline?utm_source=github.com&utm_medium=referral&utm_content=AbsaOSS/spline&utm_campaign=Badge_Grade_Dashboard)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=AbsaOSS_spline&metric=alert_status)](https://sonarcloud.io/dashboard?id=AbsaOSS_spline)
[![SonarCloud Maintainability](https://sonarcloud.io/api/project_badges/measure?project=AbsaOSS_spline&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=AbsaOSS_spline)
[![SonarCloud Reliability](https://sonarcloud.io/api/project_badges/measure?project=AbsaOSS_spline&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=AbsaOSS_spline)
[![SonarCloud Security](https://sonarcloud.io/api/project_badges/measure?project=AbsaOSS_spline&metric=security_rating)](https://sonarcloud.io/dashboard?id=AbsaOSS_spline)

The project consists of three main parts:
- Spark Agent that sits on drivers, capturing the data lineage from Spark jobs being executed by analyzing the execution plans

-   Rest Gateway, that receive the lineage data from agent and stores it in the database

-   Web UI application that visualizes the stored data lineages

![Spline diagram](https://user-images.githubusercontent.com/5530211/70050339-fd93f580-15ce-11ea-88b2-4d79ee30d494.png)

Spline is aimed to be used with Spark 2.3+ but also provides limited support for Spark 2.2.

For documentation and examples please visit [Spline GitHub Pages](https://absaoss.github.io/spline/).

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
