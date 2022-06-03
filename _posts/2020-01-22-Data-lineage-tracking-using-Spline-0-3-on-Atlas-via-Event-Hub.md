---
layout: default
title: "Data lineage tracking using Spline 0.3 on Atlas via Event Hub"
date: 2020-01-22
author: "Reenu Saluja @ Microsoft"
---
<img src="https://miro.medium.com/max/1137/1*GIT5Q9CFEN6lLmfB_kAu9Q.png" alt="" />

Data lineage tracking is one of the critical requirements for organizations that are in highly regulated industries face. As a regulatory requirement these organizations need to have a lineage detail of how data flows through their systems. To process data, organization need fast and big data technologies. Spark is one of the popular tools. It is a unified analytics engine for big data processing, with built-in modules for streaming, SQL, machine learning and graph. While there are several products that cater to building various aspects of governance, Apache Atlas is a scalable and extensible set of core foundational governance services — enabling enterprises to effectively and efficiently meet their compliance requirements within Hadoop and allows integration with the whole enterprise data ecosystem. A connector is required to track Spark SQL/DataFrame transformations and push metadata changes to Apache Atlas. Spark Atlas Connector provides basic job information. If we need to capture attribute level transformation information within the jobs, then Spline is the another option. Spline is a data lineage tracking and visualization tool for Apache Spark. Spline captures and stores lineage information from internal Spark execution plans in a lightweight, unobtrusive and easy to use manner.

[Full article](https://medium.com/@reenugrewal/data-lineage-tracking-using-spline-on-atlas-via-event-hub-6816be0fd5c7)
