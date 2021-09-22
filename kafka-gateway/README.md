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
In accordance with Kafka best practices this consumer is idempotent. 
In practice, it means that one message can be consumed multiple times without risk of duplication. 
Spline will recognize that the message was already consumed, and it will simply ignore it.

### Scalability
By default, Spline Consumer uses a single Kafka Consumer. When a need to scale arises you can run additional Spline Consumer instances.

Another option is to run multiple Kafka Consumers inside one Spline application instance, if for some reason you want to scale vertically.
You can do this by setting `spline.kafka.consumerConcurrency` to number higher than one.

### Reliability
To achieve maximum reliability _Dead Letter Queue_ should be enabled. That makes Spline to commit the message offset
only when the message data is either successfully stored to the database, or is sent to the _Dead Letter Queue_.

Without having _Dead Letter Queue_ enabled Spline commits the offset anyway (to avoid repeatedly failing messages clogging processing), and the errors are just logged.

There is a retry mechanism that will try to consume the message multiple times before it's considered failed.
For certain exceptions retry is not attempted. For example, messages that fail on JSON parsing won't be retried.

### Dead Letter Queue
Disabled by default. Set `spline.kafka.deadLetterQueueEnabled` to 'true' to enable. 
The topic name is auto generated using the following format: `<originalTopic>.DLT`. Make sure that automatic topic creation is enabled, or create the topic manually.
By default, the consumer's bootstrap server is used, but it's possible to configure the producer using 
standard Kafka producer config keys prefixed by `spline.kafka.producer`. For example:

```properties
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
To avoid rebalance, the `maxInterval` time must not exceed the `max.poll.interval.ms` consumer property.

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
