---
layout: default
title: "Spline: Data Lineage For Spark Structured Streaming"
date: 2018-10-04
author: "Vaclav Kosar, Marek Novotny @ ABSA"
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/953PcioD6tk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
[Slides](https://www.slideshare.net/VaclavKosar/spline-data-lineage-for-spark-structure-streaming)

Data lineage tracking is one of the significant problems that companies in highly regulated industries face. These companies are forced to have a good understanding of how data flows through their systems to comply with strict regulatory frameworks. Many of these organizations also utilize big and fast data technologies such as Hadoop, Apache Spark and Kafka. Spark has become one of the most popular engines for big data computing. In recent releases, Spark also provides the Structured Streaming component, which allows for real-time analysis and processing of streamed data from many sources. Spline is a data lineage tracking and visualization tool for Apache Spark. Spline captures and stores lineage information from internal Spark execution plans in a lightweight, unobtrusive and easy to use manner.

Additionally, Spline offers a modern user interface that allows non-technical users to understand the logic of Apache Spark applications. In this presentation we cover the support of Spline for Structured Streaming and we demonstrate how data lineage can be captured for streaming applications.

Presented at Spark + AI Summit London 2018