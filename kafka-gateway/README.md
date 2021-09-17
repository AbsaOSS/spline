# Kafka consumer server for Spline producer API
Consumes execution plans and events via kafka and stores them to arangoDB

---
### Configuration
All mandatory configs that needs to be provided are in the next example.
In addition to this the Kafka consumer can be [configured the standard way](https://kafka.apache.org/documentation/#consumerconfigs). 
Everything that start with prefix `spline.kafka.consumer.` will be sent to consumer as a config (with the prefix removed)


spline's `DefaultConfigurationStack` is used so there are many ways how to provide the config.

example properties provided via VM options
```bash
-Dspline.database.connectionUrl=arangodb://localhost/spline
-Dspline.kafka.consumer.bootstrap.servers=localhost:9092
-Dspline.kafka.consumer.group.id=spline-group
-Dspline.kafka.topic=spline-topic
```

### Idempotency
In accord with Kafka best practices this consumer is indepmotent. 
In practice, it means that one message can be consumed multiple times without risk of duplication. 
Spline will recognize that the message was already consumed, and it will simply ignore it.

### Scalability
By default, Spline Consumer is using one Kafka Consumer. When need to scale arise you can run additional Spline Consumer instances.
Same rules as for any other Kafka consumers apply.

There is also option to run multiple Kafka Consumers inside one application instance. If for some reason you want to scale vertically.
You can do this by setting `spline.kafka.consumerConcurrency` to number higher than one.

### Reliability
To achieve maximum reliability Dead Letter Queue should be enabled, then spline will only commit the message offset 
once the message data were stored in the database, or the message was sent to the Dead Letter Queue.

Without Dead Letter Queue active the messages that fail will be simply logged and the offset will be committed 
to not halt the consumption.

There is a retry mechanism that will try to consume the message multiple times before it's considered failed.
For certain exceptions retry is not attempted. For example, we don't except json parsing to succeed on additional retry.

### Dead Letter Queue
Disable by default. Set `spline.kafka.deadLetterQueueEnabled` to true to enable. 
The topic used will have the following name: `<originalTopic>.DLT`. Make sure that automatic topic creation is enabled or create the topic manually.
By default, the consumer's bootstrap server is used, but it's possible to configure the producer using 
standard kafka producer config keys prefixed by `spline.kafka.producer`. For example:

```bash
spline.kafka.producer.bootstrap.servers=localhost:9092
```

### Retry
Retry will work out of the box, however it is possible to configure the backoff using following properties (in ms):
```
spline.kafka.backOff.multiplier
spline.kafka.backOff.initialInterval
spline.kafka.backOff.maxInterval
spline.kafka.backOff.maxElapsedTime
```
The `maxInterval` time must not exceed the `max.poll.interval.ms` consumer property, to avoid a rebalance.

---
For general Spline documentation and examples please visit:
- [Spline GitHub Pages](https://absaoss.github.io/spline/)
- [Getting Started](https://github.com/AbsaOSS/spline-getting-started)

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
