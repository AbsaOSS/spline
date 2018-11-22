---
layout: default
title: Blog
---

<div class="posts">
  {% for post in site.posts %}
    <a href="{{ post.url }}" title="{{ post.title }}"><h3>{{ post.date | date_to_string }} - {{ post.title }}</h3></a>
    {{ post.content }}
  {% endfor %}
</div>
