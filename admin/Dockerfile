#
# Copyright 2019 ABSA Group Limited
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
# Run image using:
# $> docker run --rm -it \
# -e ARANGODB_URL=arangodb://User:Password@ArangoURL:8529/YOUR-Spline-DB-Name \
# absaoss/spline-admin:latest

ARG DOCKER_BASE_ARTIFACT=adoptopenjdk/openjdk11
ARG DOCKER_BASE_TAG=jdk-11.0.10_9-alpine-slim

FROM $DOCKER_BASE_ARTIFACT:$DOCKER_BASE_TAG

ARG VERSION

LABEL \
    vendor="ABSA" \
    copyright="2021 ABSA Group Limited" \
    license="Apache License, version 2.0" \
    name="Spline Admin Tool"

COPY target/admin-$VERSION.jar ./admin.jar

ENTRYPOINT ["java", "-jar", "admin.jar" ]
CMD ["--help"]