# Robots.txt

Sitealarm scans websites for broken links and mixed content to keep you informed.
You can control which pages we crawl by adding us to your `robots.txt` file.


## Standard robots.txt

Most websites have a robots.txt file that tells search engines and other bots which pages they are allowed to crawl.
A typical robots.txt file looks like this:

```
User-agent: *
Disallow:
```

This basically tells every crawler that follows the robots.txt specification that it may crawl every page.

To restrict crawlers, you can use the `Disallow` directive to exclude specific pages.

```
User-agent: Sitealarm
Disallow: /admin/
Disallow: /tmp/
Disallow: /private/
```

In this example, Sitealarm is prevented from crawling the pages `/admin/`, `/tmp/`, and `/private/`.
