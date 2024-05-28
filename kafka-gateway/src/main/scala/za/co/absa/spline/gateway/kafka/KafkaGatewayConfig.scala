/*
 * Copyright 2021 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package za.co.absa.spline.gateway.kafka

import com.fasterxml.jackson.databind.{ObjectMapper, PropertyNamingStrategies}
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import com.twitter.finatra.jackson.FinatraInternalModules
import org.apache.commons.configuration.ConfigurationConverter
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.clients.producer.ProducerConfig
import org.apache.kafka.common.serialization.{ByteArrayDeserializer, ByteArraySerializer, StringDeserializer, StringSerializer}
import org.springframework.context.annotation.{Bean, ComponentScan, Configuration}
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer
import org.springframework.core.env.{MutablePropertySources, PropertiesPropertySource}
import org.springframework.kafka.annotation.EnableKafka
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core._
import org.springframework.kafka.listener.ContainerProperties.AckMode
import org.springframework.kafka.listener.{DeadLetterPublishingRecoverer, SeekToCurrentErrorHandler}
import org.springframework.kafka.support.JacksonUtils
import org.springframework.kafka.support.converter.Jackson2JavaTypeMapper.TypePrecedence
import org.springframework.kafka.support.converter.{ByteArrayJsonMessageConverter, ConversionException, DefaultJackson2JavaTypeMapper, RecordMessageConverter}
import org.springframework.util.backoff.{BackOff, ExponentialBackOff}
import za.co.absa.commons.config.ConfTyped
import za.co.absa.commons.config.ConfigurationImplicits.{ConfigurationOptionalWrapper, ConfigurationRequiredWrapper}
import za.co.absa.spline.common.config.DefaultConfigurationStack
import za.co.absa.spline.producer.service.InconsistentEntityException

import java.util.concurrent.TimeUnit
import scala.jdk.CollectionConverters._
import scala.concurrent.duration.{Duration, DurationInt}

@EnableKafka
@Configuration
@ComponentScan(basePackageClasses = Array(classOf[listener._package]))
class KafkaGatewayConfig {

  @Bean
  def kafkaListenerContainerFactory: ConcurrentKafkaListenerContainerFactory[_, _] =
    new ConcurrentKafkaListenerContainerFactory[String, AnyRef] {
      setConcurrency(KafkaGatewayConfig.Kafka.ConsumerConcurrency)
      setConsumerFactory(consumerFactory)
      setMessageConverter(messageConverter)
      getContainerProperties.setAckMode(AckMode.RECORD)
      setErrorHandler(errorHandler)
    }

  private def consumerFactory: ConsumerFactory[String, AnyRef] = {
    new DefaultKafkaConsumerFactory(consumerConfigsMerged.asJava)
  }

  private val consumerConfigsMerged: Map[String, AnyRef] = {
    KafkaGatewayConfig.Kafka.OtherConsumerConfig ++ Map[String, AnyRef](
      ConsumerConfig.GROUP_ID_CONFIG -> KafkaGatewayConfig.Kafka.Consumer.GroupId,
      ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG -> KafkaGatewayConfig.Kafka.Consumer.BootstrapServers,
      ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG -> classOf[StringDeserializer].getName,
      ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG -> classOf[ByteArrayDeserializer].getName,
    )
  }

  private def messageConverter: RecordMessageConverter = {
    val typeMapper = new DefaultJackson2JavaTypeMapper {
      setTypePrecedence(TypePrecedence.TYPE_ID)
      setIdClassMapping(typeMappings.asJava)
    }

    new ByteArrayJsonMessageConverter(objectMapper) {
      setTypeMapper(typeMapper)
    }
  }

  private val typeMappings: Map[String, Class[_]] = Map(
    "ExecutionPlan" -> classOf[za.co.absa.spline.producer.model.v1_1.ExecutionPlan],
    "ExecutionEvent" -> classOf[za.co.absa.spline.producer.model.v1_1.ExecutionEvent],

    "ExecutionPlan_1.1" -> classOf[za.co.absa.spline.producer.model.v1_1.ExecutionPlan],
    "ExecutionEvent_1.1" -> classOf[za.co.absa.spline.producer.model.v1_1.ExecutionEvent],

    "ExecutionPlan_1.2" -> classOf[za.co.absa.spline.producer.model.v1_2.ExecutionPlan],
    "ExecutionEvent_1.2" -> classOf[za.co.absa.spline.producer.model.v1_2.ExecutionEvent],
  )

  private val objectMapper: ObjectMapper =
    JacksonUtils.enhancedObjectMapper()
      .registerModule(DefaultScalaModule)
      .setPropertyNamingStrategy(PropertyNamingStrategies.LOWER_CAMEL_CASE)
      .registerModule(FinatraInternalModules.caseClassModule)

  private val errorHandler = {
    val handler =
      if (KafkaGatewayConfig.Kafka.DeadLetterQueueEnabled)
        new SeekToCurrentErrorHandler(new DeadLetterPublishingRecoverer(deadLetterTemplate), backOff)
      else
        new SeekToCurrentErrorHandler(backOff)

    handler.addNotRetryableException(classOf[ConversionException])
    handler.addNotRetryableException(classOf[InconsistentEntityException])
    handler
  }

  private def deadLetterTemplate: KafkaTemplate[_, _] =
    new KafkaTemplate[String, AnyRef](producerFactory)

  private def producerFactory: ProducerFactory[String, AnyRef] = {
    new DefaultKafkaProducerFactory(producerConfigsMerged.asJava)
  }

  private def producerConfigsMerged: Map[String, AnyRef] = {
    Map(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG -> KafkaGatewayConfig.Kafka.Consumer.BootstrapServers) ++
    KafkaGatewayConfig.Kafka.OtherProducerConfig ++
    Map[String, AnyRef](
      ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG -> classOf[StringSerializer].getName,
      ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG -> classOf[ByteArraySerializer].getName,
    )
  }

  private def backOff: BackOff = new ExponentialBackOff {
    private val backOffConfig = KafkaGatewayConfig.Kafka.BackOff
    setMultiplier(backOffConfig.Multiplier)
    setInitialInterval(backOffConfig.InitialInterval)
    setMaxInterval(backOffConfig.MaxInterval)
    setMaxElapsedTime(backOffConfig.MaxElapsedTime)
  }

  @Bean
  def propertySourcesPlaceholderConfigurer: PropertySourcesPlaceholderConfigurer = {
    val properties = ConfigurationConverter.getProperties(KafkaGatewayConfig)

    val sources = new MutablePropertySources()
    sources.addLast(new PropertiesPropertySource("spline-property-source", properties))

    val configurer = new PropertySourcesPlaceholderConfigurer()
    configurer.setPropertySources(sources)
    configurer
  }
}

object KafkaGatewayConfig extends DefaultConfigurationStack with ConfTyped {

  override val rootPrefix: String = "spline"
  private val conf = this

  object Kafka extends Conf("kafka") {

    val Topic: String = conf.getRequiredString(Prop("topic"))

    val ConsumerConcurrency: Int = conf.getInt(Prop("consumerConcurrency"), 1)

    object Consumer extends Conf("consumer") {
      val GroupId: String = conf.getRequiredString(Prop(ConsumerConfig.GROUP_ID_CONFIG))
      val BootstrapServers: String = conf.getRequiredString(Prop(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG))
    }

    val OtherConsumerConfig: Map[String, AnyRef] = ConfigurationConverter
      .getMap(subset(Prop("consumer")))
      .asScala.toMap
      .asInstanceOf[Map[String, AnyRef]]

    val PlanTimeout: Duration = conf
      .getOptionalLong(Prop("insertPlanTimeout"))
      .map(Duration(_, TimeUnit.MILLISECONDS))
      .getOrElse(1.minute)

    val EventTimeout: Duration = conf
      .getOptionalLong(Prop("insertEventTimeout"))
      .map(Duration(_, TimeUnit.MILLISECONDS))
      .getOrElse(10.seconds)

    object BackOff extends Conf("backOff") {
      val Multiplier: Double = conf.getDouble(Prop("multiplier"), 4)
      val InitialInterval: Long = conf.getLong(Prop("initialInterval"), 2.seconds.toMillis)
      val MaxInterval: Long = conf.getLong(Prop("maxInterval"), 32.seconds.toMillis)
      val MaxElapsedTime: Long = conf.getLong(Prop("maxElapsedTime"), 90.seconds.toMillis)
    }

    val DeadLetterQueueEnabled: Boolean = conf.getBoolean(Prop("deadLetterQueueEnabled"), false)

    val OtherProducerConfig: Map[String, AnyRef] = ConfigurationConverter
      .getMap(subset(Prop("producer")))
      .asScala.toMap
      .asInstanceOf[Map[String, AnyRef]]
  }
}
