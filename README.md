[![Maven Central](https://maven-badges.herokuapp.com/maven-central/za.co.absa.spline/parent-pom/badge.svg)](https://search.maven.org/search?q=g:za.co.absa.spline)
[![TeamCity build (develop)](https://teamcity.jetbrains.com/app/rest/builds/aggregated/strob:%28locator:%28buildType:%28id:OpenSourceProjects_AbsaOSSSpline_AutomaticBuildsWithTests_Spark24%29,branch:develop%29%29/statusIcon.svg)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=OpenSourceProjects_AbsaOSSSpline_AutomaticBuildsWithTests_Spark24&branch=develop&tab=buildTypeStatusDiv)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9b7ba650a3874c2888dba2d25fa73d88)](https://app.codacy.com/gh/AbsaOSS/spline?utm_source=github.com&utm_medium=referral&utm_content=AbsaOSS/spline&utm_campaign=Badge_Grade_Settings)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=AbsaOSS_spline&metric=alert_status)](https://sonarcloud.io/dashboard?id=AbsaOSS_spline)
[![SonarCloud Maintainability](https://sonarcloud.io/api/project_badges/measure?project=AbsaOSS_spline&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=AbsaOSS_spline)
[![SonarCloud Reliability](https://sonarcloud.io/api/project_badges/measure?project=AbsaOSS_spline&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=AbsaOSS_spline)
[![SonarCloud Security](https://sonarcloud.io/api/project_badges/measure?project=AbsaOSS_spline&metric=security_rating)](https://sonarcloud.io/dashboard?id=AbsaOSS_spline)
[![Docker Pulls](https://badgen.net/docker/pulls/absaoss/spline-rest-server?icon=docker&label=pulls)](https://hub.docker.com/r/absaoss/spline-rest-server/)

Spline — an open-source data lineage tracking solution for data processing frameworks like Apache Spark and others
---

[![Watch the video](https://user-images.githubusercontent.com/795479/193536311-d6ce6ed8-36ca-43fa-addb-4f9dcf59e974.png)](https://youtu.be/Bz_Ml6pNH2E)

### Documentation

See [Spline GitHub Pages](https://absaoss.github.io/spline/)

### Getting started

See [Getting Started](https://github.com/AbsaOSS/spline-getting-started)

Fake change

### Build project

```shell
mvn install
```

### Build Docker containers

See [Building Docker](https://github.com/AbsaOSS/spline-getting-started/blob/main/building-docker.md)

### Building from source code

1. Install Java 11 and Maven 3.6 or above
2. Run Maven build

```shell
# this will produce standard Java artifacts (JAR and WAR files)
mvn install

# or, if you also want Docker images use this command
mvn install -Ddocker -Ddockerfile.repositoryUrl=my
```

### Running Spline server

https://absaoss.github.io/spline/#step-by-step

### Versioning strategy

##### Application version

Spline server follows _Semantic Versioning_[^1] principles. The _Public API_ in terms of _Semantic Versioning_ is defined as a combination of API of
all Spline modules, including Producer API (REST and Kafka), Consumer REST API, as well as a set of all command-line interfaces (e.g. Admin CLI).
Any incompatible change introduced in any of those APIs or CLIs will be accompanied by incrementing the _major version_ component.

##### Database schema version

The database schema version number does **not** follow the _Semantic Versioning_ principles, it does not directly correlate with the application
version and can only be compared to itself. The only relation between the database schema version number and the application version is that the
former indicates in which application version the given database schema was introduced.

[^1]: Semantic Versioning - https://semver.org/

### How to measure code coverage
```shell
./mvn verify -Dcode-coverage
```
If module contains measurable data the code coverage report will be generated on path:
```
{local-path}\spline\{module}\target\site\jacoco
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
