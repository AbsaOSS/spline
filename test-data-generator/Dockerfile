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


FROM fabric8/java-alpine-openjdk11-jre

LABEL \
    vendor="ABSA" \
    copyright="2019 ABSA Group Limited" \
    license="Apache License, version 2.0" \
    name="Spline Performance Testing"

ARG JAR_FILE

ENV SPLINE_URL=http://localhost:8080
ENV GRAPH_TYPE=triangle
ENV READS=3
ENV OPERATIONS=30-100@10
ENV ATTRIBUTES=3

RUN rm -rf /usr/local/tomcat/webapps/* && apk --no-cache add curl
ADD ./target/${JAR_FILE} /opt/test-data-generator.jar
ADD send-plans-and-events-docker.sh /opt/send-plans-and-events-docker.sh

ENTRYPOINT ["sh", "/opt/send-plans-and-events-docker.sh"]
CMD ["--help"]
