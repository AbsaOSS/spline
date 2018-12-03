---
layout: default
title: Blog
---

[Subscribe via RSS]({{ site.url }}{{ site.baseurl }}/feed.xml)

<div class="posts">
  {% for post in site.posts %}
    <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}"><h3>{{ post.date | date_to_string }} - {{ post.title }}</h3></a>
    {{ post.content }}
    Author: {{ post.author }}
    <hr>
  {% endfor %}
</div>
