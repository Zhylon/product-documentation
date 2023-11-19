# Robots.txt

Sitealarm scannt Webseiten auf defekte Links und gemischte Inhalte (mixed-content), um dir Bescheid zu geben.
Du kannst steuern, welche Seiten wir durchsuchen sollen, indem du uns zu deiner `robots.txt` Datei hinzufügst.


## Standard robots.txt

Die meisten Webseiten haben eine robots.txt-Datei, die Suchmaschinen und andere Bots darüber informiert, welche Seiten sie durchsuchen dürfen.
Eine typische robots.txt Datei sieht so aus:

```
User-agent: *
Disallow:
```

Das sagt im Grunde jedem Crawler, der sich an die robots.txt-Spezifikation hält, dass er jede Seite crawlen kann.

Um die Crawler einzuschränken, kannst du die `Disallow`-Anweisung verwenden, um bestimmte Seiten auszuschließen.

```
User-agent: Sitealarm
Disallow: /admin/
Disallow: /tmp/
Disallow: /private/
```

In diesem Beispiel wird Sitealarm daran gehindert, die Seiten `/admin/`, `/tmp/` und `/private/` zu crawlen.
