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

echo "${READS}" | egrep "(\d+)-(\d+)@(\d+)"
rc=$?
if [[ "${rc}" == 0 ]]
then
   VARIABLE="reads"
   FROM=`echo $READS | cut -d "-" -f1`
   BY=`echo $READS | cut -d "@" -f2`
fi


echo "${OPERATIONS}" | egrep "(\d+)-(\d+)@(\d+)"
rc=$?
if [[ "${rc}" == 0 ]]
then
  VARIABLE="operations"
  FROM=`echo $OPERATIONS | cut -d "-" -f1`
  BY=`echo $OPERATIONS | cut -d "@" -f2`
fi

echo "${ATTRIBUTES}" | egrep "(\d+)-(\d+)@(\d+)"
rc=$?
if [[ "${rc}" == 0 ]]
then
  VARIABLE="attributes"
  FROM=`echo $ATTRIBUTES | cut -d "-" -f1`
  BY=`echo $ATTRIBUTES | cut -d "@" -f2`
fi

i=$FROM

FILENAME="./${GRAPH_TYPE}-lineage-${READS}reads-${OPERATIONS}ops-${ATTRIBUTES}attr.json.txt"
echo $FILENAME
echo
echo "${VARIABLE}, total_time, http_code, size_upload"

while read line; do
  sleep 1
  if [[ ${line:0:1} = '{' ]]
  then
    echo $line > /opt/current_plan.txt
    curl -s -w "${i}, %{time_total}s, %{http_code}, %{size_upload}\n" -o /dev/null -H "Content-Type: application/vnd.absa.spline.producer.v1.1+json" -X POST --data @"/opt/current_plan.txt" ${SPLINE_URL}/producer/execution-plans
    i=$((i+BY))
  else
    echo $line > /opt/current_event.txt
    curl -s -o /dev/null -H "Content-Type: application/vnd.absa.spline.producer.v1.1+json" -X POST --data @"/opt/current_event.txt" ${SPLINE_URL}/producer/execution-events
  fi
done < $FILENAME
