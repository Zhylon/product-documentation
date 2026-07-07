# Heartbeats

Mit Heartbeats überwachst du Prozesse, die *von sich aus* aktiv werden sollen – z.B.
Cronjobs, Backup-Skripte, Queue-Worker oder geplante Batch-Jobs. Statt dass Sitealarm deine
Anwendung abruft (wie bei [App-Health](app-health.html) oder der [Verfügbarkeitsüberwachung](monitoring.html)), meldet
sich dein Skript bei jedem erfolgreichen Lauf selbst bei Sitealarm zurück ("Dead-Man's-Switch"-Prinzip).

Meldet sich dein Skript nicht innerhalb des erwarteten Zeitraums, geht Sitealarm davon aus,
dass der Job nicht (mehr) läuft, und benachrichtigt dich.

Heartbeats stehen auf **jedem Plan** zur Verfügung (auch Free) und teilen sich mit deinen
Monitoren ein gemeinsames Kontingent (siehe [Limits](#limits)).


## Los geht's

Wenn du einen Heartbeat anlegst, erhältst du eine eindeutige Ping-URL. Diese rufst
du am Ende (oder am Anfang) deines Skripts auf – z.B. per `curl` am Ende eines Cronjobs.

```
0 * * * * dein-backup-skript.sh && curl -fsS --retry 3 -o /dev/null "https://ping.sitealarm.app/{token}"
```

Solange dieser Aufruf regelmäßig innerhalb des konfigurierten Intervalls eingeht,
bleibt der Heartbeat auf "Aktiv". Bleibt er aus, wechselt der Status nach spätestens
Intervall + Toleranz auf "Ausgefallen" und du wirst benachrichtigt.


### Zwei Ping-URLs

Jeder Heartbeat hat zwei gleichwertige URLs, die du verwenden kannst:

- **Kurze URL** (empfohlen): `https://ping.sitealarm.app/{token}` – kompakt, ideal für Cronjob-Einzeiler.
- **Standard-API-URL**: `https://sitealarm.app/api/v2/heartbeat/{token}` – falls du lieber mit dem klassischen API-Endpunkt arbeitest oder eine ausdrückliche Fehlermeldung senden willst (siehe unten).

Beide Varianten sind per `GET` oder `POST` erreichbar – es macht keinen Unterschied,
welche HTTP-Methode du nutzt.

**Wichtig:** Über die kurze URL kannst du nur einen *erfolgreichen* Lauf melden
willst du explizit einen Fehler melden (z.B. wenn dein Skript selbst erkennt,
dass etwas schiefgelaufen ist), nutze die Standard-API-URL mit dem
`/failed`-Suffix (siehe nächster Abschnitt).


### Erfolg oder Fehler melden

Über die Standard-API-URL stehen dir zwei Endpunkte zur Verfügung:

| Endpunkt                                    | Bedeutung                         |
|---------------------------------------------|-----------------------------------|
| `GET/POST /api/v2/heartbeat/{token}`        | Lauf war erfolgreich.             |
| `GET/POST /api/v2/heartbeat/{token}/failed` | Lauf ist explizit fehlgeschlagen. |

Optional kannst du eine kurze Nachricht mitschicken, die z.B. in der
Benachrichtigungs-Mail und im Verlauf angezeigt wird:

```bash
curl "https://sitealarm.app/api/v2/heartbeat/{token}?message=Backup+erfolgreich,+120MB"
```

oder bei einem Fehler:

```bash
curl "https://sitealarm.app/api/v2/heartbeat/{token}/failed?message=Backup+fehlgeschlagen:+Speicherplatz+voll"
```

Beide Endpunkte antworten immer mit einem leeren `200 OK` – unabhängig davon,
ob der Token gültig ist oder ein interner Fehler auftrat. So kannst du
den Ping-Aufruf in deinem Skript ohne komplizierte Fehlerbehandlung anhängen,
ohne dass ein Sitealarm-Problem deinen eigentlichen Job beeinflusst.


## Intervall und Toleranz

Beim Anlegen eines Heartbeats legst du zwei Werte fest:

- **Intervall (`period`)** – wie oft dein Skript sich normalerweise melden sollte.
- **Toleranz (`grace`)** – zusätzlicher Puffer, bevor ein ausbleibender Ping als Ausfall gewertet wird.

Ein Heartbeat gilt als überfällig, sobald seit dem letzten erfolgreichen Ping
mehr als **Intervall + Toleranz** vergangen ist:

```
Fällig ab = letzter Ping + Intervall + Toleranz
```

In der Oberfläche stehen dir für beide Werte gängige Zeitfenster zur Auswahl
(1/5/10/30 Minuten, 1 Stunde, für das Intervall zusätzlich 1 Tag).
Über die API sind beliebige Werte in Sekunden möglich (jeweils mindestens 60 Sekunden).
Ohne Angabe werden beim Anlegen Intervall und Toleranz auf jeweils 1 Stunde (3600 Sekunden) gesetzt.

Ein neu angelegter Heartbeat, der noch nie einen Ping erhalten hat,
wird **nicht** automatisch als ausgefallen markiert – er bleibt so lange auf
"Wartet auf Ping" (pending), bis der erste Ping eingeht.


## Verpasste Pings erkennen

Sitealarm prüft **einmal pro Minute**, ob ein Heartbeat überfällig ist.
Ist ein Skript also z.B. genau zur fälligen Zeit dran, kann es bis zu einer
weiteren Minute dauern, bis Sitealarm den Ausfall tatsächlich bemerkt und eine
Benachrichtigung verschickt.

Meldet sich dein Skript stattdessen aktiv über den `/failed`-Endpunkt, wird der
Status sofort (ohne auf die minütliche Prüfung zu warten) auf "Ausgefallen" gesetzt.

Bleibt ein Heartbeat über mehrere Prüfungen hinweg am Stück ausgefallen, wird
aktuell **nur bei der ersten erkannten Unterbrechung** eine Benachrichtigung
verschickt – nicht bei jedem weiteren Prüflauf, solange der Ausfall andauert.
Erst ein erneuter erfolgreicher Ping (Recovery) löst wieder eine Benachrichtigung aus.


## Benachrichtigungen

Bei jedem Wechsel des Status (aktiv → ausgefallen oder ausgefallen → aktiv)
sendet Sitealarm dir eine E-Mail-Benachrichtigung. Reine, wiederholte Pings mit
unverändertem Status lösen keine erneute Benachrichtigung aus.

Um dich nicht mit E-Mails zu überfluten, gilt zusätzlich ein festes Mindestintervall
von **2 Minuten** zwischen zwei Benachrichtigungs-Mails pro Heartbeat.

Aktuell werden Heartbeat-Benachrichtigungen **ausschließlich per E-Mail** verschickt.
Andere Kanäle (Microsoft Teams, Slack, Discord, Webhook), die für Monitore und App-Health
verfügbar sind, werden für Heartbeats derzeit noch nicht unterstützt.

Du kannst Heartbeat-Benachrichtigungen in den E-Mail-Benachrichtigungseinstellungen
deines Kontos deaktivieren.


## Pausieren

Für Heartbeats existiert im Datenmodell bereits die Möglichkeit, die Überwachung
für Wartungsfenster zu pausieren – ein pausierter Heartbeat wird von der Ausfallprüfung
übersprungen. Diese Funktion ist derzeit aber noch nicht über die Oberfläche oder
die API steuerbar; es gibt noch keine Möglichkeit, einen Heartbeat selbst zu
pausieren oder wieder zu aktivieren.


## Verlauf

Zu jedem Heartbeat werden die letzten **25 Ereignisse** (Statuswechsel bzw. Pings)
gespeichert und in der Detailansicht angezeigt – inklusive Status, Nachricht,
Zeitpunkt und Anzahl fehlgeschlagener Versuche. Ältere Einträge werden täglich
automatisch entfernt. Anders als bei App-Health gibt es hier keine zeitbasierte,
planabhängige Aufbewahrungsfrist, sondern einen festen Umfang von 25 Einträgen
pro Heartbeat – unabhängig vom Plan.


## Verwalten über die API

Heartbeats lassen sich vollständig über die API verwalten:

| Methode  | Endpunkt                  | Beschreibung                                  |
|----------|---------------------------|-----------------------------------------------|
| `GET`    | `/api/v2/heartbeats`      | Liste aller eigenen Heartbeats                |
| `POST`   | `/api/v2/heartbeats`      | Neuen Heartbeat anlegen                       |
| `GET`    | `/api/v2/heartbeats/{id}` | Details inkl. Verlauf                         |
| `PATCH`  | `/api/v2/heartbeats/{id}` | Name, Intervall, Toleranz, Aktivierung ändern |
| `DELETE` | `/api/v2/heartbeats/{id}` | Heartbeat löschen (inkl. Verlauf)             |

Beim Anlegen kannst du `name`, `period` (Sekunden, min. 60) und `grace`
(Sekunden, min. 60) angeben. Fehlen sie, verwendet Sitealarm die genannten Standardwerte.


## Limits

Heartbeats sind auf jedem Plan (auch Free) grundsätzlich verfügbar. Sie teilen sich jedoch mit
deinen Monitoren ein gemeinsames Kontingent: Jeder Heartbeat zählt genauso wie ein
Monitor gegen das Limit deines Plans. Hast du z.B. auf dem Free-Plan ein Limit von 5,
kannst du entweder 5 Monitore, 3 Monitore und 2 Heartbeats, oder eine beliebige andere
Kombination anlegen – niemals aber mehr als insgesamt 5 Einträge gleichzeitig.
