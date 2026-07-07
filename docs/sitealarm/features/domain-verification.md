# Domain-Verifizierung

## Was bestätigt die Verifizierung?

Die Domain-Verifizierung bestätigt, dass du Besitzer bzw. Besitzerin einer Domain bist. Dazu hinterlegst du
einen TXT-Record in deinen DNS-Einstellungen:

```
zhylon-verification=<dein-token>
```

Der Token ist pro Domain individuell und in der Übersicht unter **Domain-Verifizierung** kopierbar. Die
Prüfung läuft automatisch alle paar Stunden, oder manuell per "Erneut prüfen".

Wichtig: Verifizierung bestätigt ausschließlich die Owner-Zugehörigkeit. Sie hebt keine Crawling-Regeln der
Zieldomain auf (siehe [robots.txt](#robots-txt-gilt-immer) unten) und ist keine generelle Voraussetzung für
alle Checks.

## Welche Checks brauchen eine Verifizierung?

| Check                                     | Verifizierung nötig? | Grund                                                                          |
|-------------------------------------------|----------------------|--------------------------------------------------------------------------------|
| [Verfügbarkeit (Uptime)](monitoring.html) | Nein                 | Einzelner, öffentlich einsehbarer Request ohne nennenswerte Serverlast         |
| [SSL-Zertifikat](certificates.html)       | Nein                 | Einzelner, öffentlich einsehbarer Request                                      |
| [Anwendungsgesundheit](app-health.html)   | Nein                 | Authentifizierung erfolgt über ein eigenes Secret, nicht über Domain-Ownership |
| [Defekte Links](broken-links.html)        | Ja                   | Deep-Crawl über mehrere Seiten der Domain                                      |
| [Gemischte Inhalte](mixed-content.html)   | Ja                   | Deep-Crawl über mehrere Seiten der Domain                                      |
| Sitemap-Check                             | Ja                   | Deep-Crawl über mehrere Seiten der Domain                                      |

Uptime und SSL-Zertifikat laufen daher sofort nach dem Anlegen eines Monitors, unabhängig vom
Verifizierungsstatus der Domain.

Defekte Links, Gemischte Inhalte und der Sitemap-Check befinden sich aktuell noch im Aufbau ("Coming soon")
und laufen noch nicht automatisch. Sobald diese Checks live gehen, greift die Verifizierungspflicht
automatisch — bereits verifizierte Domains benötigen dann keine weitere Aktion.

## robots.txt gilt immer

Für alle Deep-Crawl-Checks respektiert Sitealarm die robots.txt der Zieldomain strikt, unabhängig vom
Verifizierungsstatus. Verifizierung bestätigt nur die Owner-Zugehörigkeit, sie hebt keine Crawl-Regeln des
Zielservers auf.

- Sitealarm crawlt mit einem eigenen, klar erkennbaren User-Agent.
- Ein vorgegebener `Crawl-delay` wird eingehalten.
- robots.txt wird für 24 Stunden gecacht.
- Ist robots.txt nicht erreichbar, gehen wir konservativ vor: Wir nehmen einen Delay zwischen Requests an,
  statt uneingeschränkt zu crawlen.
- Ein `Disallow: /` (komplettes Crawl-Verbot) wird nicht umgangen — auch nicht bei verifizierter Domain.

Ist ein Deep-Crawl-Check durch robots.txt blockiert, zeigen wir das im Monitor als eigenen Hinweis an. Das
unterscheidet sich bewusst von "Domain nicht verifiziert": Ersteres ist eine externe Einschränkung durch den
Zielserver, die wir nicht umgehen; Letzteres kannst du selbst durch das Hinzufügen des DNS TXT-Records lösen.
