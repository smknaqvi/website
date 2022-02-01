# My Personal Website
This is my personal website for showcasing my experience and projects. It is also a project that I update every now and then to mess around with new tools.

## Tech Stack
For this iteration of my personal website I wanted to create a webpage that uses server side rendering. With the website being entirely logic-less I decided to use a simple templating language called Handlebars for organizing my website layout. I implemented a basic Express server for rendering and serving the content. 

I also wanted to be able to update my personal website without making code changes so I decided to use a headless CMS to store my content and some of my assets. I used an Apollo GraphQL Client to query my content and use it to render html with Handlebars. I also enabled caching, a webhook to invalidate the cache on content updates, and rate limiting in order to reduce and prevent unnecessary network usage.

I deployed this website on my own VPS in a docker container behind a Nginx reverse proxy.