---
layout: default
title: "Atlas Support Is Back!"
date: 2019-01-24
author: "Vaclav Kosar @ Absa"
---
<img src="{{ site.url }}{{ site.baseurl }}/assets/spline-atlas-ingested-lineage.png" alt="" />

Apache Atlas is meta data management platform for big data, which is often also used for data lineage. Spline support of Atlas was temporarily removed due to large refactoring on version 0.3. But now Atlas support is back thanks to [Marek Novotny](https://github.com/mn-mikke) released in 0.3.6. Supported Atlas version now is 1.0.


### Spline Atlas Integration vs Hortonworks Spark Atlas Connector

Those who need to use Atlas only and are not worried about loosing Spline's UI closely tailored for data lineage and improved lineage linking (Spline links exact file versions that were used) may consider using also Hortonworks Spark Atlas connector.

In short differences between these tools are:
- Spline captures attribute level transformation information within the jobs while Hortonworks provides only basic job information
- Spline doesn't support ML and Hive data lineages


### How To Try Out Spline Atlas Integration

1. Download Hortonworks Data Platform 3.0.1 Virtualbox Image.
2. Install VirtualBox.
3. Import image into virtualbox with default settings.
4. Change password via via browser ssh simulator on http://localhost:4200/ from ```hadoop``` to e.g. ```splineisgr8t```. Alternatively you can access ```sandbox-hdp``` via ```ssh root@localhost -p 2201```.
5. Run ```ambari-admin-password-reset```. After password change Ambari will start. Close the ssh channel.
6. Go to  http://localhost:8080 and make sure HBase, Atlas, Infra Solr, Kafka, HDFS, YARN have maintanence mode disabled and are started
7. Change password in Atlas' advanced configs tab and restart it and verify that you can access it on http://localhost:21000
8. SSH into ```sandbox-host``` with ```ssh root@localhost -p 2122``` using password ```hadoop```
9. Proxy additional port 6667 akin to other records: ```vi /sandbox/proxy/conf.stream.d/tcp-hdp.conf``` 
10. Deploy proxy config ```/sandbox/proxy/proxy-deploy.sh``` and exit ssh channel.
11. Secure copy spline meta model json file from Spline source: ```scp -P 2201 spline/persistence/atlas/src/main/atlas/spline-meta-model.json root@localhost:/usr/hdp/current/atlas-server/models/```
12. Go to Ambari and restart Atlas
13. Make sure that you can set ```Search By Type``` to ```spark_job```
14. Configure your ```/etc/hosts``` file:
    ```
    127.0.0.1	localhost sandbox-hdp.hortonworks.com sandbox-hdp
    ```
15. In Spline source code configure Sample jobs properties file: ```sample/src/main/resources/spline.properties```:
    ```
    spline.persistence.factory=za.co.absa.spline.persistence.atlas.AtlasPersistenceFactory
    atlas.kafka.bootstrap.servers=localhost:6667
    atlas.kafka.hook.group.id=atlas
    atlas.kafka.zookeeper.connect=localhost:2181
    ```
16. Run a sample job e.g. ```/sample/src/main/scala/za/co/absa/spline/sample/batch/SampleJob1.scala```
17. Search Atlas setting ```Search By Type``` to ```spark_job``` and you should be able to find your lineage
