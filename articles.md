---
layout: default
title: Articles
---

<div id="subscribe">
   <a href="{{ site.url }}{{ site.baseurl }}/feed.xml">Subscribe via RSS</a>
</div>

<div class="posts">
  {% for post in site.posts %}
    <hr>
    <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}"><h3>{{ post.date | date_to_string }} - {{ post.title }}</h3></a>
    {{ post.content }}
    Author: {{ post.author }}
  {% endfor %}
</div>
