#!/bin/bash
: '
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
'

cd /opt
echo "Running data generator"
java -jar /opt/test-data-generator.jar -g ${GRAPH_TYPE} -r ${READS} -o ${OPERATIONS} -a ${ATTRIBUTES}

echo "Sending lineages from:"

READS_NR=`echo $READS| tr '/' '|'`
OP_NR=`echo $OPERATIONS | tr '/' '|'`
ATTR_NR=`echo $ATTRIBUTES | tr '/' '|'`

FILENAME="./${GRAPH_TYPE}-lineage-${READS_NR}reads-${OP_NR}ops-${ATTR_NR}attr.json.txt"
echo $FILENAME

while read line; do
  sleep 5
  if [[ ${line:0:1} = '{' ]]
  then
    echo "Sending plan"
    echo $line > /opt/current_plan.txt
    curl -w "@curl-format.txt" -o /dev/null -H "Content-Type: application/vnd.absa.spline.producer.v1.1+json" -X POST --data @"/opt/current_plan.txt" ${SPLINE_URL}/producer/execution-plans
  else
    echo "Sending event"
    echo $line > /opt/current_event.txt
    curl -w "@curl-format.txt" -o /dev/null -H "Content-Type: application/vnd.absa.spline.producer.v1.1+json" -X POST --data @"/opt/current_event.txt" ${SPLINE_URL}/producer/execution-events
  fi
done < $FILENAME
