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

FILENAME=$1
SPLINE_URL=$2

while read line; do
  sleep 5
  if [[ ${line:0:1} = '{' ]]
  then
    echo "Sending plan"
    curl -w "@curl-format.txt" -o /dev/null -H "Content-Type: application/vnd.absa.spline.producer.v1.1+json" -X POST --data "${line}" ${SPLINE_URL}/producer/execution-plans
  else
    echo "Sending event"
    curl -w "@curl-format.txt" -o /dev/null -H "Content-Type: application/vnd.absa.spline.producer.v1.1+json" -X POST --data "${line}" ${SPLINE_URL}/producer/execution-events
  fi
done < $FILENAME
