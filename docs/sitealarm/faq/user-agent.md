# User-Agent Policy

Sitealarm verwendet bei allen HTTP-Requests einen **eindeutigen, produktbezogenen User-Agent**. Dieser User-Agent dient der Transparenz, besseren Nachvollziehbarkeit in Server-Logs und der sicheren Abgrenzung gegenüber generischen oder automatisierten Clients.


## Warum wir einen eigenen User-Agent verwenden

Ein klar definierter User-Agent hat mehrere Vorteile:

* **Transparenz für Betreiber**: Wer Requests in seinen Logs sieht, kann sofort erkennen, dass die Anfrage von Sitealarm stammt.
* **Supportfähigkeit**: Bei Rückfragen oder Auffälligkeiten kann Sitealarm anhand des User-Agents schneller helfen.
* **Security & Abuse Handling**: Viele Systeme filtern oder klassifizieren Traffic anhand des User-Agents. Ein eigener User-Agent reduziert Missverständnisse und „False Positives“.
* **Betriebsqualität**: Generische Framework-User-Agents (z. B. `python-httpx`, `GuzzleHttp`) sagen nichts über den Ursprung aus. Ein klarer User-Agent zeigt Verantwortlichkeit.


## Aktueller User-Agent

Sitealarm nutzt derzeit folgenden User-Agent:

```
Mozilla/5.0 (compatible; Sitealarm-UptimeMonitor/3.1; +https://sitealarm.de/docs)
```


### Bedeutung der Bestandteile

* `Mozilla/5.0 (compatible; … )`
  Historisch etablierte, weit verbreitete Konvention zur Kennzeichnung nicht-interaktiver Clients. Das bedeutet **nicht**, dass ein Browser verwendet wird.

* `Sitealarm-UptimeMonitor/3.1`
  Produktname (Sitealarm) + Modul/Funktion (UptimeMonitor) + Version.

* `+https://sitealarm.de/docs`
  Referenz auf diese Dokumentation. Dort werden die Funktionsweise und mögliche Sonderfälle erklärt.


## Übergangsphase bei Änderungen (Rollouts)

Bei Änderungen am User-Agent (z. B. Umbenennung, Versionierung) kann es in einer Übergangsphase vorkommen,
dass **mehrere User-Agent-Varianten parallel** auftreten.<br>
Hintergrund: Rollouts erfolgen **nicht zeitgleich** auf allen Systemen.

In dieser Phase sind beide Varianten gültig und funktionsfähig. Sobald der Rollout abgeschlossen ist, wird nur noch die aktuelle Variante verwendet.


## Welche Requests Sitealarm typischerweise sendet

Sitealarm führt je nach Feature unterschiedliche HTTP-Checks aus. Typische Beispiele:

* **Uptime Monitoring**: Abruf von Startseite oder Health-Endpoint
* **HTTP Status Checks**: Prüfung auf 200/3xx/4xx/5xx
* **TLS/SSL Checks** (falls aktiv): Verbindung zum Zielhost zur Zertifikatsprüfung

**Wichtig:** Sitealarm versucht nicht, sich als Browser zu tarnen. Der User-Agent ist bewusst als Sitealarm erkennbar.


## Empfehlungen für Betreiber


### 1) Sitealarm in Firewalls / WAFs behandeln

Wenn ihr Sitealarm erlauben möchtet, empfiehlt sich die **Freigabe anhand des User-Agents** (oder alternativ über IP-/Allowlisting, falls ihr feste IPs nutzt).

Beispiel (Pseudo-Regel):

* Allow: User-Agent enthält `Sitealarm-UptimeMonitor`

**Hinweis:** User-Agent ist keine kryptographische Identität. Er ist ein Transparenz- und Governance-Signal. Bei High-Security-Setups empfehlen wir zusätzlich:

* API-Key/Token
* IP-Allowlisting (falls verfügbar)
* Mutual TLS (falls angeboten)
* eigene Auth-Mechanismen auf Health-Endpoints


### 2) Rate-Limits

Sitealarm sendet Requests in definierten Intervallen. Wenn Rate-Limits aktiv sind, stellt sicher, dass Monitoring-Requests nicht unerwartet blockiert werden (z. B. `429 Too Many Requests`). Falls Rate-Limits erforderlich sind, empfiehlt sich ein separates Limit für Monitoring/Health-Endpunkte.


### 3) Logging

Wir empfehlen, Sitealarm-Traffic im Logging zu kennzeichnen, z. B. durch Filter nach User-Agent. Das erleichtert spätere Analysen („war das ein echter Nutzer oder Monitoring?“).


## Troubleshooting

### „Wir sehen Requests von Sitealarm, ist das ein Bot/Angriff?“

Wenn der User-Agent `Sitealarm` enthält und auf diese Dokumentation verweist, handelt es sich in der Regel um **Monitoring-Traffic** (z. B. Uptime-Checks). Bitte prüft:

* URL/Endpoint, der gecheckt wird
* Häufigkeit/Intervall
* HTTP-Statuscodes

Wenn ihr unsicher seid, kontaktiert uns über die Supportwege, die auf `sitealarm.de` angegeben sind.

### „Warum sehen wir mehrere User-Agents?“

Das ist typischerweise ein Rollout-Effekt. In Übergangsphasen können ältere und neue Varianten parallel auftreten.

### „Kann ich Sitealarm blocken?“

Ja. Wenn ihr kein externes Monitoring wünscht, könnt ihr Requests anhand des User-Agents blocken. Bitte beachtet: Dann funktionieren Monitoring/Alerts erwartungsgemäß nicht mehr.

### „Wir nutzen einen WAF, der Monitoring blockt“

Wenn euer WAF ungewöhnliche Requests blockt, prüft:

* ob euer WAF `HEAD` oder `GET` restriktiv behandelt
* ob Bot-Regeln “unknown UA” blocken
* ob Rate-Limits greifen

Empfehlung:

* Ausnahme/Allowlist für `Sitealarm-UptimeMonitor`
* ggf. Monitoring-Endpunkt separieren (`/health`, `/status`)

---


## Alternative User-Agents

Je nach eingesetztem Produkt oder Modul kann Sitealarm unterschiedliche User-Agents verwenden.
Alle Varianten sind eindeutig als Sitealarm erkennbar und verweisen auf die Dokumentation.


### Übersicht

| Produkt / Modul       | Beispiel User-Agent                                                                   |
|-----------------------|---------------------------------------------------------------------------------------|
| **Allgemein**         | `Mozilla/5.0 (compatible; Sitealarm-UptimeMonitor/3.1; +https://sitealarm.de/docs)`   |
| **Uptime Check**      | `Mozilla/5.0 (compatible; Sitealarm/3.1; +https://sitealarm.de/docs; uptime-monitor)` |
| **Mixed Content**     | `Mozilla/5.0 (compatible; Sitealarm/3.1; +https://sitealarm.de/docs; mixed-content)`  |
| **Broken links**      | `Mozilla/5.0 (compatible; Sitealarm/3.1; +https://sitealarm.de/docs; broken-links)`   |
| **SSL-Zertifikat**    | `Mozilla/5.0 (compatible; Sitealarm/3.1; +https://sitealarm.de/docs; ssl-check)`      |
| **Zukünftige Module** | `Mozilla/5.0 (compatible; Sitealarm/<Version>; +https://sitealarm.de/docs) <module>`  |

---


### Freigabe / Whitelisting

Je nach Sicherheitsanforderung gibt es zwei empfohlene Vorgehensweisen:


#### Option 1: Alle Sitealarm-Module erlauben (empfohlen)

Erlaubt alle aktuellen und zukünftigen Sitealarm-Checks automatisch.

* **Kriterium:** User-Agent enthält `Sitealarm`
* Vorteil: keine Anpassungen bei neuen Modulen notwendig

#### Option 2: Nur einzelne Module erlauben

Erlaubt gezielt bestimmte Funktionen (z. B. nur Uptime Monitoring).

* **Kriterium:** exakter oder teilweiser Match auf das jeweilige Modul
  z. B. `Sitealarm-UptimeMonitor`
* Vorteil: maximale Kontrolle
* Nachteil: Anpassung nötig, wenn neue Module genutzt werden

---


### Hinweise

* Alle Sitealarm-User-Agents sind **produktbezogen**, **versioniert** und **nicht generisch**.
* Sitealarm verwendet **keine Framework-User-Agents** (z. B. `curl`, `python-httpx`, `GuzzleHttp`).
* Änderungen oder neue Module werden dokumentiert.

---


## Änderungen an dieser Policy

Diese User-Agent Policy kann sich weiterentwickeln. Änderungen werden dokumentiert und (bei relevanten Umstellungen) vorab angekündigt.
