---
layout: default
title: "Spark job lineage in Azure Databricks with Spline and Azure Cosmos DB API for MongoDB"
date: 2019-03-25
author: "Arvind Shyamsundar @ Microsoft"
---
<img src="https://deepdotdatadotblog.files.wordpress.com/2019/03/image_thumb-3.png" alt="" />

iTracking lineage of data as it is manipulated within Apache Spark is a common ask from customers. As of date, there are two options, the first of which is the Hortonworks Spark Atlas Connector, which persists lineage information to Apache Atlas. However, some customers who use Azure Databricks do not necessarily need or use the “full” functionality of Atlas, and instead want a more purpose-built solution. This is where the second option, Spline, comes in. Spline can persist lineage information to Apache Atlas or to a MongoDB database. Now, given that Azure Cosmos DB exposes a MongoDB API, it presents an attractive PaaS option to serve as the persistence layer for Spline.

[Full article](https://deep.data.blog/2019/03/25/spark-job-lineage-in-azure-databricks-with-spline-and-azure-cosmos-db-api-for-mongodb/)

