# Spline Spark Agent 0.6

Spark Agent goals are to:
1) capture lineages of executed Spark jobs
2) convert them to Spline lineage format
3) send them to Spline Geatway (using Producer API)

To do this the agent needs to have a listener registered in Spark and also to know the connection to the gateway.

## Spark / Scala version compatibility matrix

|            | Scala 2.11                   | Scala 2.12 |
|------------|:----------------------------:|:----------:|
|**Spark 2.2** | (no SQL; no codeless init) | &mdash;    |
|**Spark 2.3** | (no Delta support)         | &mdash;    |
|**Spark 2.4** | Yes                        | Yes        |
|**Spark 3.0** | &mdash;                    | Yes        |


## Artifacts
- `agent-core_{{SPARK_VERSION}}` is a classic maven library that you can use with any compatible Spark version. This is required if you want to have acces to agent classes or use **programatic initialization**. 
- `spark-{{SCALA_VERSION}}-spline-agent-bundle_{{SPARK_VERSION}}` is a fat jar containing all dependencies inside omitting the ones already provided by Spark. You can use the bundle in Spark via `--packages` flag. If you also activate the agent via **codeless initialization** your own code doesn't have to have any dependency on the agent it will be used directly by Spark.

## Initialization
Initialization is a process of creating agents objects and registering a listener in Spark that will call the agent after each job execution.
### Programatic Initialization

Initialization done in code via calling `enableLineageTracking()` function.
```Scala
// given a Spark session ...
val sparkSession: SparkSession = ???

// ... enable data lineage tracking with Spline
import za.co.absa.spline.harvester.SparkLineageInitializer._
sparkSession.enableLineageTracking()

// ... then run some Dataset computations as usual.
// The lineage will be captured and sent to the configured Spline Producer endpoint.
```

### Codeless Initialization
Initialization using Spark's `spark.sql.queryExecutionListeners` config parameter. This will work with both `spark-submit` and `pyspark`.

```bash
pyspark \
  --packages za.co.absa.spline.agent.spark:spark-2.4-spline-agent-bundle_2.12:0.6.0 \
  --conf "spark.sql.queryExecutionListeners=za.co.absa.spline.harvester.listener.SplineQueryExecutionListener" \
  --conf "spline.lineageDispatcher.http.producer.url=http://localhost:9090/producer"
```

## Configuration
The agent looks for configuration properties in the following sources:
- Hadoop configuration (core-site.xml)
- Spark configuration
- JVM system properties
- `spline.properties` file on classpath

The file `spline.default.properties` (in the agent source code) contains default values for properties as well as some additional documentation.
It's good idea to look in the file to see what properties are available.

### Properties

`spline.mode`
- `DISABLED` Lineage tracking is completely disabled and Spline is unhooked from Spark.
- `REQUIRED` If Spline fails to initialize itself (e.g. wrong configuration, no db connection etc) the Spark application aborts with an error. (**Note**: that only concerns Spline initialization routine. If the error happens during lineage capturing, or in the Spline dispatcher, then the target Spark job will have already been finished by that time, and the resulted data will have been persisted, regardless of the `spline.mode` settings. The Spline agent doesn't do any automated rollbacks).
- `BEST_EFFORT` (default) Spline will try to initialize itself, but if fails it switches to DISABLED mode allowing the Spark application to proceed normally without Lineage tracking.

`spline.lineageDispatcher` 
- Name of lineage dispatcher in use. More info in **Lineage Dispatchers** chapter.

`spline.IWDStrategy.default.onMissingMetrics` - behaviour when info whether the data was actually written is missing
- `CAPTURE_LINEAGE`
- `IGNORE_LINEAGE` (default)

`spline.postprocessingFilter.classNames`
 - Optional comma separated list of user lineage filters. More info in **Post Processing Lineage Filters** chapter.

## Lineage Dispatchers
The `LineageDispatcher` trait is responsible for sending out the captured lineage information. By default, the `HttpLineageDispatcher` is used, that sends the lineage data to the Spline REST endpoint (see Spline Producer API).

Available dispacthers:
- `HttpLineageDispatcher` - sends the lineage via http 
- `KafkaLineageDispatcher` - sends the lineage via kafka
- `ConsoleLineageDispatcher` - write the lineage to console
- `LoggingLineageDispatcher` - logs the lineahge using logger
- `CompositeLineageDispatcher` - allows combining multiple dispatchers

Each dispatcher can have different configuration parameters. To make the configs clearly separated each dispacther has it's own namespace in which all it's parameters are defined. I will explain it on an kafka examples.

Defining dispacther
```
spline.lineageDispatcher=kafka
```
Once you defined the dispatcher all other parameters will have a namespace `spline.lineageDispatcher.{{dipatcher-name}}.` as a prefix. In this case it is `spline.lineageDispatcher.kafka.`. 

To find out which parameters you can use look into `spline.default.properties`. For kafka I would have to define at least these two properties:
```
spline.lineageDispatcher.kafka.topic=foo
spline.lineageDispatcher.kafka.producer.bootstrap.servers=localhost:9092
```

### Creating your own dispatcher
There is also possibility to create your own dispatcher. It must implement `LineageDispatcher` trait and have a constructor with a single parameter of type `org.apache.commons.configuration.Configuration`. To use it you must define name and class and also all other parameters you need. For example:
```
spline.lineageDispatcher=my-dispatcher
spline.lineageDispatcher.my-dispatcher.className=org.example.spline.MyDispatcherImpl
spline.lineageDispatcher.my-dispatcher.prop1=value1
spline.lineageDispatcher.my-dispatcher.prop2=value2
```

## Post Processing Lineage Filters
Filters can be used to enrich the lineage with your own custom data or to remove unwanted data like passwords. All filters are aplied after the Spark plan is converted to Spline DTOs, but before the dispatcher is called.

The procedure how filters are registered and configured is similar to the `LineageDispatcher` registration and configuration procedure.
A custom filter class must implement `za.co.absa.spline.harvester.postprocessing.PostProcessingFilter` trait and declare a constructor with a single parameter of type `org.apache.commons.configuration.Configuration`.
Then register and configure it like this: 
```properties
spline.postProcessingFilter.className=my-filter
spline.postProcessingFilter.my-filter.className=my.awesome.CustomFilter
spline.postProcessingFilter.my-filter.prop1=value1
spline.postProcessingFilter.my-filter.prop2=value2
```

Use pre-registered `CompositePostProcessingFilter` to chain up multiple filters:
```properties
spline.postProcessingFilter=composite
spline.postProcessingFilter.composite.filters=myFilter1,myFilter2
```

(see `spline.default.properties` for details and examples)
## Supported Spark commands
The latest agent supports the following 
data formats and providers out of the box:
- Avro
- Cassandra
- COBOL
- Delta
- ElasticSearch
- Excel
- HDFS
- Hive
- JDBC
- Kafka
- MongoDB
- XML

Although Spark being an extensible piece of software can support much more,
it doesn't provide any universal API that Spline can utilize to capture
reads and write from/to everything that Spark supports.
Support for most of different data sources and formats has to be added to Spline one by one.
Fortunately starting with Spline 0.5.4 the auto discoverable [Plugin API](#plugins) 
has been introduced to make this process easier.

Below is the break down of the read/write command list that we have come through.  
Some commands are implemented, others have yet to be implemented, 
and finally there are such that bear no lineage information and hence are ignored.

All commands inherit from `org.apache.spark.sql.catalyst.plans.logical.Command`.

You can see how to produce unimplemented commands in `za.co.absa.spline.harvester.SparkUnimplementedCommandsSpec`.
### Implemented

- `CreateDataSourceTableAsSelectCommand`  (org.apache.spark.sql.execution.command)
- `CreateHiveTableAsSelectCommand`  (org.apache.spark.sql.hive.execution)
- `CreateTableCommand`  (org.apache.spark.sql.execution.command)
- `DropTableCommand`  (org.apache.spark.sql.execution.command)
- `InsertIntoDataSourceDirCommand`  (org.apache.spark.sql.execution.command)
- `InsertIntoHadoopFsRelationCommand`  (org.apache.spark.sql.execution.datasources)
- `InsertIntoHiveDirCommand`  (org.apache.spark.sql.hive.execution)
- `InsertIntoHiveTable`  (org.apache.spark.sql.hive.execution)
- `SaveIntoDataSourceCommand`  (org.apache.spark.sql.execution.datasources)

### To be implemented

- `AlterTableAddColumnsCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableChangeColumnCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableRenameCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableSetLocationCommand`  (org.apache.spark.sql.execution.command)
- `CreateDataSourceTableCommand`  (org.apache.spark.sql.execution.command)
- `CreateDatabaseCommand`  (org.apache.spark.sql.execution.command)
- `CreateTableLikeCommand`  (org.apache.spark.sql.execution.command)
- `DropDatabaseCommand`  (org.apache.spark.sql.execution.command)
- `LoadDataCommand`  (org.apache.spark.sql.execution.command)
- `TruncateTableCommand`  (org.apache.spark.sql.execution.command)

When one of these commands occurs spline will let you know. 
- When it's running in `REQUIRED` mode it will throw an `UnsupportedSparkCommandException`.
- When it's running in `BEST_EFFORT` mode it will just log a warning.
 
### Ignored (not relevant for lineage)

- `AddFileCommand`  (org.apache.spark.sql.execution.command)
- `AddJarCommand`  (org.apache.spark.sql.execution.command)
- `AlterDatabasePropertiesCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableAddPartitionCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableDropPartitionCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableRecoverPartitionsCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableRenamePartitionCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableSerDePropertiesCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableSetPropertiesCommand`  (org.apache.spark.sql.execution.command)
- `AlterTableUnsetPropertiesCommand`  (org.apache.spark.sql.execution.command)
- `AlterViewAsCommand`  (org.apache.spark.sql.execution.command)
- `AnalyzeColumnCommand`  (org.apache.spark.sql.execution.command)
- `AnalyzePartitionCommand`  (org.apache.spark.sql.execution.command)
- `AnalyzeTableCommand`  (org.apache.spark.sql.execution.command)
- `CacheTableCommand`  (org.apache.spark.sql.execution.command)
- `ClearCacheCommand`  (org.apache.spark.sql.execution.command)
- `CreateFunctionCommand`  (org.apache.spark.sql.execution.command)
- `CreateTempViewUsing`  (org.apache.spark.sql.execution.datasources)
- `CreateViewCommand`  (org.apache.spark.sql.execution.command)
- `DescribeColumnCommand`  (org.apache.spark.sql.execution.command)
- `DescribeDatabaseCommand`  (org.apache.spark.sql.execution.command)
- `DescribeFunctionCommand`  (org.apache.spark.sql.execution.command)
- `DescribeTableCommand`  (org.apache.spark.sql.execution.command)
- `DropFunctionCommand`  (org.apache.spark.sql.execution.command)
- `ExplainCommand`  (org.apache.spark.sql.execution.command)
- `InsertIntoDataSourceCommand`  (org.apache.spark.sql.execution.datasources) *
- `ListFilesCommand`  (org.apache.spark.sql.execution.command)
- `ListJarsCommand`  (org.apache.spark.sql.execution.command)
- `RefreshResource`  (org.apache.spark.sql.execution.datasources)
- `RefreshTable`  (org.apache.spark.sql.execution.datasources)
- `ResetCommand$` (org.apache.spark.sql.execution.command)
- `SetCommand`  (org.apache.spark.sql.execution.command)
- `SetDatabaseCommand`  (org.apache.spark.sql.execution.command)
- `ShowColumnsCommand`  (org.apache.spark.sql.execution.command)
- `ShowCreateTableCommand`  (org.apache.spark.sql.execution.command)
- `ShowDatabasesCommand`  (org.apache.spark.sql.execution.command)
- `ShowFunctionsCommand`  (org.apache.spark.sql.execution.command)
- `ShowPartitionsCommand`  (org.apache.spark.sql.execution.command)
- `ShowTablePropertiesCommand`  (org.apache.spark.sql.execution.command)
- `ShowTablesCommand`  (org.apache.spark.sql.execution.command)
- `StreamingExplainCommand`  (org.apache.spark.sql.execution.command)
- `UncacheTableCommand`  (org.apache.spark.sql.execution.command)


\*) `SaveIntoDataSourceCommand` is produced at the same time, and it's already implemented.

