# Spline Server 0.6

## Artifacts
- `rest-gateway-0.6.0.war` The heart of spline. It recives the lineage data from agents via **producer API** and store it in the ArangoDB. It also provides **consumer API** for reading and querying the lineages by UI or another applications.
- `kafka-gateway-0.6.0.war` Alternative to producer API using kafka instead of http. This is supposed to run toggether with the gateway when kafka based comunication is desired.
- `admin-0.6.0.jar` Helper tool for creating database objects.

All artifacts are available in maven central repository and also like a self contained docker containers in docker hub.

## Minimal requirements
- Java 8
- Java EE 7 web container (e.g. Servlet 3.1+, JPA 2.1+) (For example: Tomcat 8)
- ArangoDB 3.7.3

## How to run Spline Gateway (using docker)
### 1) prepare database

First we will download ArangoDB in docker and run it:
```shell
docker run -p 8529:8529 -e ARANGO_NO_AUTH=1 arangodb/arangodb:3.7.10
```
Once your database is running you should be able to see ArangoDB web interface at http://localhost:8529.

Then we have to initialize Spline database. Create collections, indices, views etc.
```shell
docker run absaoss/spline-admin:0.6.0 ??? 
// TODO
```
Now you should be able to see Spline documents like `affects` or `attribute` in web interface at http://localhost:8529/_db/spline/

### 2) Start Spline Server
```shell
docker container run \
  -e spline.database.connectionUrl=arangodb://host.docker.internal/spline \
  -p 8080:8080 \
  absaoss/spline-rest-server:0.6.0
```
**Note for Linux**: If `host.docker.internal` does not resolve replace it with `172.17.0.1` (see [Docker for-linux bug report](https://github.com/docker/for-linux/issues/264))

### 2) Check Spline Server status

Open the server root URL in you browser:
http://localhost:8080/

You should see a dashboard with the updating server status information, server version, exposed API and some other useful info. 

The server exposes the following REST API:
  - Producer API (`/producer/*`) 
  - Consumer API (`/consumer/*`)

... and other useful URLs:
  - Running server version information: [/about/version](http://localhost:8080/about/version)
  - Producer API Swagger documentation: [/docs/producer.html](http://localhost:8080/docs/producer.html) 
  - Consumer API Swagger documentation: [/docs/consumer.html](http://localhost:8080/docs/consumer.html) 

## Configuration
Spline is looking for configuration properties in those sources:
- JVM system properties
- `spline.properties` file on classpath

### Persistance Properties
`spline.database.connectionUrl`
- Url of Arango database.

`spline.database.logFullQueryOnError` (default false)
- Will log the full arango query when se t to true.

### Consumer Properties
`spline.adaptive_timeout.min` (default 3s)
- TODO

`spline.adaptive_timeout.duration_factor` (default 1.5)
- TODO

### Kafka Gateway Properties
`spline.kafka.topic`
- Topic from which the gateway will consume messages.

`spline.kafka.consumer`
- prefix for standard kafka consumer properties. Kafka gateway uses standard Kafka consumer inside, so any of it's [confiuration properties](https://kafka.apache.org/documentation/#consumerconfigs) can be used after this prefix. For example `spline.kafka.consumer.bootstrap.servers` or `spline.kafka.consumer.group.id`.


