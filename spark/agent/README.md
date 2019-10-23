# Spark Agent / Harvester

This module is responsible for listening to spark command events and converting them to spline lineage.

## Spark commands
Some events provided by Spark are not yet implemented. Some of them will be implemented in future 
and some of them bear no lineage information and should be ignored.

All commands inherits from ```org.apache.spark.sql.catalyst.plans.logical.Command```.

You can see how to produce unimplemented commands in ```za.co.absa.spline.harvester.SparkUnimplementedCommandsSpec```.
### Implemented
```
CreateDataSourceTableAsSelectCommand (org.apache.spark.sql.execution.command)
CreateHiveTableAsSelectCommand (org.apache.spark.sql.hive.execution)
CreateTableCommand (org.apache.spark.sql.execution.command)
DropTableCommand (org.apache.spark.sql.execution.command)
InsertIntoDataSourceDirCommand (org.apache.spark.sql.execution.command)
InsertIntoHadoopFsRelationCommand (org.apache.spark.sql.execution.datasources)
InsertIntoHiveDirCommand (org.apache.spark.sql.hive.execution)
InsertIntoHiveTable (org.apache.spark.sql.hive.execution)
SaveIntoDataSourceCommand (org.apache.spark.sql.execution.datasources)
```
### To be implemented
```
AlterTableAddColumnsCommand (org.apache.spark.sql.execution.command)
AlterTableChangeColumnCommand (org.apache.spark.sql.execution.command)
AlterTableRenameCommand (org.apache.spark.sql.execution.command)
AlterTableSetLocationCommand (org.apache.spark.sql.execution.command)
CreateDataSourceTableCommand (org.apache.spark.sql.execution.command)
CreateDatabaseCommand (org.apache.spark.sql.execution.command)
CreateTableLikeCommand (org.apache.spark.sql.execution.command)
DropDatabaseCommand (org.apache.spark.sql.execution.command)
LoadDataCommand (org.apache.spark.sql.execution.command)
TruncateTableCommand (org.apache.spark.sql.execution.command)
```
### Ignored
```
AddFileCommand (org.apache.spark.sql.execution.command)
AddJarCommand (org.apache.spark.sql.execution.command)
AlterDatabasePropertiesCommand (org.apache.spark.sql.execution.command)
AlterTableAddPartitionCommand (org.apache.spark.sql.execution.command)
AlterTableDropPartitionCommand (org.apache.spark.sql.execution.command)
AlterTableRecoverPartitionsCommand (org.apache.spark.sql.execution.command)
AlterTableRenamePartitionCommand (org.apache.spark.sql.execution.command)
AlterTableSerDePropertiesCommand (org.apache.spark.sql.execution.command)
AlterTableSetPropertiesCommand (org.apache.spark.sql.execution.command)
AlterTableUnsetPropertiesCommand (org.apache.spark.sql.execution.command)
AlterViewAsCommand (org.apache.spark.sql.execution.command)
AnalyzeColumnCommand (org.apache.spark.sql.execution.command)
AnalyzePartitionCommand (org.apache.spark.sql.execution.command)
AnalyzeTableCommand (org.apache.spark.sql.execution.command)
CacheTableCommand (org.apache.spark.sql.execution.command)
ClearCacheCommand (org.apache.spark.sql.execution.command)
CreateFunctionCommand (org.apache.spark.sql.execution.command)
CreateTempViewUsing (org.apache.spark.sql.execution.datasources)
CreateViewCommand (org.apache.spark.sql.execution.command)
DescribeColumnCommand (org.apache.spark.sql.execution.command)
DescribeDatabaseCommand (org.apache.spark.sql.execution.command)
DescribeFunctionCommand (org.apache.spark.sql.execution.command)
DescribeTableCommand (org.apache.spark.sql.execution.command)
DropFunctionCommand (org.apache.spark.sql.execution.command)
ExplainCommand (org.apache.spark.sql.execution.command)
InsertIntoDataSourceCommand (org.apache.spark.sql.execution.datasources) *
ListFilesCommand (org.apache.spark.sql.execution.command)
ListJarsCommand (org.apache.spark.sql.execution.command)
RefreshResource (org.apache.spark.sql.execution.datasources)
RefreshTable (org.apache.spark.sql.execution.datasources)
ResetCommand$ (org.apache.spark.sql.execution.command)
SetCommand (org.apache.spark.sql.execution.command)
SetDatabaseCommand (org.apache.spark.sql.execution.command)
ShowColumnsCommand (org.apache.spark.sql.execution.command)
ShowCreateTableCommand (org.apache.spark.sql.execution.command)
ShowDatabasesCommand (org.apache.spark.sql.execution.command)
ShowFunctionsCommand (org.apache.spark.sql.execution.command)
ShowPartitionsCommand (org.apache.spark.sql.execution.command)
ShowTablePropertiesCommand (org.apache.spark.sql.execution.command)
ShowTablesCommand (org.apache.spark.sql.execution.command)
StreamingExplainCommand (org.apache.spark.sql.execution.command)
UncacheTableCommand (org.apache.spark.sql.execution.command)


* SaveIntoDataSourceCommand is produced at the same time and it's already implemented.
```

---

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
