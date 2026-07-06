# Standorte für Sitealarm bereitstellen

Wir suchen ständig nach neuen Standorten, um unsere Überwachung zu verbessern.
Wenn du einen Standort vorschlagen möchtest, kannst du uns gerne kontaktieren.

Um selbst einen Standort bereitzustellen, lies dir bitte die folgenden Informationen durch.
Wenn du alle Informationen gelesen hast und immer noch Fragen hast, kannst du uns gerne kontaktieren.


## Was ist ein Standort?

Ein Standort (Node) ist ein Server, der von Sitealarm verwendet wird, um deine Website zusätzlich zu
unserem Hauptstandort (Frankfurt, Deutschland) zu überwachen. Ein Standort trifft **nie selbst** die
Entscheidung, eine Benachrichtigung auszulösen — er meldet lediglich seine Prüfergebnisse an den
Hauptserver zurück, der allein über Alarme entscheidet.

Du benötigst lediglich einen Server mit einer öffentlichen IP-Adresse (IPv4 und/oder IPv6) und ausgehendem
HTTPS-Zugriff auf unseren Hauptserver. Ein eingehender Endpunkt ist **nicht** erforderlich — der Standort
holt sich seine Aufgaben aktiv beim Hauptserver ab (Pull statt Push).


## Registrierung

Ein neuer Standort wird von uns per Artisan-Command registriert:

```bash
php artisan probe:register-location "London" lon
```

Das Kommando gibt dir Namen, Slug und ein einmalig generiertes Bearer-Token aus, das du sicher (wie ein
Passwort) auf dem neuen Node hinterlegen musst.


## Kommunikationsablauf

Der Node authentifiziert sich bei jedem Aufruf über den `Authorization: Bearer <token>`-Header und
kommuniziert ausschließlich über folgende drei Endpunkte:

```
GET  /api/probe/monitors    Ruft die für diesen Standort freigeschalteten Monitore ab
POST /api/probe/heartbeat   Signalisiert dem Hauptserver, dass der Node aktiv ist
POST /api/probe/results     Meldet Prüfergebnisse an den Hauptserver
```

Alle Aufrufe sind zusätzlich rate-limitiert.

### `GET /api/probe/monitors`

Liefert alle Monitore, die für genau diesen Standort aktiviert wurden (Opt-in pro Monitor).

```json
{
  "monitors": [
    {
      "id": 42,
      "url": "https://example.com",
      "type": "http",
      "interval_seconds": 60,
      "timeout_seconds": 10
    }
  ]
}
```

### `POST /api/probe/heartbeat`

Kein Body erforderlich — allein der gültige Token reicht, um `last_seen` auf dem Hauptserver zu aktualisieren.

```json
{ "status": "ok", "server_time": "2026-07-06T10:00:00Z" }
```

### `POST /api/probe/results`

```json
{
  "results": [
    {
      "monitor_id": 42,
      "status": "down",
      "response_time": null,
      "http_code": null,
      "error": "Connection refused",
      "checked_at": "2026-07-06T10:00:00Z"
    }
  ]
}
```

Antwort:

```json
{ "accepted": 1 }
```

Ergebnisse für Monitore, die für diesen Standort nicht freigeschaltet sind, werden ignoriert.


## Referenzimplementierung

Unsere eigene Node-Software ist eine schlanke Laravel-Konsolenanwendung, die die drei Aufgaben in
regelmäßigen Abständen ausführt:

- `probe:run` — holt Monitore, führt die Checks aus und sendet die Ergebnisse (jede Minute)
- `probe:heartbeat` — sendet den Keep-Alive (alle 5 Minuten)

Ein eigenes Redis/Horizon-Setup ist auf dem Node nicht notwendig.
