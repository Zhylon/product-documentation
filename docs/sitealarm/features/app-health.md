# App-Health

Mit Sitealarm kannst du verschiedene Aspekte deiner Anwendung und deines Servers überwachen.
Dadurch kannst du Benachrichtigungen erhalten, wenn z.B. folgende Punkte zutreffen:
- der Festplattenspeicherplatz wird knapp
- die Datenbank ist nicht erreichbar
- Redis ist nicht erreichbar
- E-Mails können nicht gesendet werden
- ein Neustart der Anwendung ist erforderlich
- ...

Du kannst jeden beliebigen Aktionspunkt deiner Anwendung überwachen – wie viele einzelne Checks du innerhalb eines Health-Checks anlegen kannst, hängt von deinem Plan ab (siehe [Grenzen und Limits](#grenzen-und-limits)).

App-Health ist ein Pro-Feature und muss auf einem bestehenden Monitor aktiviert werden. Auf dem Free-Plan steht die Funktion nicht zur Verfügung.


## Los geht's
### Zwei Übertragungsarten: Abruf (Poll) oder Push

Es gibt zwei Wege, wie die Ergebnisse deiner Health-Checks zu Sitealarm gelangen:

1. **Abruf-Modus (Poll, Standard)** – Sitealarm ruft alle 15 Minuten einen Endpunkt deiner Anwendung per HTTP-Request ab. Deine Anwendung antwortet mit JSON, das das Ergebnis der Health-Checks enthält.
2. **Push-Modus (Team-Plan)** – Statt dass Sitealarm deine Anwendung abruft, sendet deine Anwendung (z.B. über einen Cronjob) das Ergebnis aktiv an einen Push-Endpunkt von Sitealarm. Das ist z.B. hilfreich, wenn dein Server von außen nicht erreichbar ist oder du Health-Checks direkt aus einem Deployment- oder Scheduler-Skript heraus melden willst.

In beiden Fällen ist das JSON-Format identisch – nur die Übertragungsrichtung unterscheidet sich. Der Modus wird pro Health-Check auf der Einstellungsseite festgelegt.

### Antworte mit Ergebnissen deiner Health-Checks (Poll-Modus)

Sitealarm führt keinen Code innerhalb deiner Anwendung oder deines Servers aus.
Stattdessen solltest du die Überprüfungen selbst durchführen.
Sitealarm sendet einen HTTP-Request an deine Anwendung an einen bestimmten Endpunkt.
Deine Anwendung sollte mit JSON antworten, das das Ergebnis der Health-Checks enthält.

Der Request, den Sitealarm an deine Anwendung sendet, enthält einen geheimen Wert im `health-check-secret` Header.
Um sicherzustellen, dass eine Anfrage tatsächlich von Sitealarm stammt, solltest du überprüfen, ob der geheime Wert korrekt ist.

Der Endpunkt, an den die Anfrage gesendet wird, sowie der Secret-Token im Header können in den Einstellungen für die Überprüfung der Health-Checks festgelegt werden.

**Hinweis zum Caching:** Sitealarm cached die Antwort deines Endpunkts für 30 Minuten. Führst du den Abruf zwischenzeitlich manuell erneut aus, kann es daher sein, dass du innerhalb dieses Zeitfensters keine frischen Daten von deinem Endpunkt bekommst, sondern die zwischengespeicherte Antwort ausgeliefert wird.

### Ergebnisse an Sitealarm pushen (Push-Modus)

Im Push-Modus sendest du das Ergebnis deiner Health-Checks selbst per `POST`-Request an Sitealarm, statt dass wir deine Anwendung abrufen:

```
POST /api/v2/health-check/{token}/push
```

Der `{token}` ist der Secret-Token aus den Einstellungen deines Health-Checks. Der Request-Body hat das gleiche JSON-Format wie im Poll-Modus (siehe unten), inklusive `finishedAt` und `checkResults`.

Ein paar Besonderheiten des Push-Modus:
- Push ist ein **Team-Plan-Feature**. Ist dein Plan nicht (mehr) berechtigt, antwortet der Endpunkt mit `403` und der Health-Check wird automatisch deaktiviert.
- Der Endpunkt ist auf **30 Requests pro Minute pro Token** begrenzt (Rate-Limiting).
- Ist der eingehende `finishedAt`-Wert kleiner oder gleich dem zuletzt gespeicherten Wert, wird die Anfrage als Duplikat erkannt, mit `{"status": "duplicate", "processed": false}` beantwortet und nicht weiterverarbeitet. So verhinderst du versehentliche Doppel-Benachrichtigungen, wenn dein Skript mehrfach mit dem gleichen Ergebnis aufgerufen wird.
- Eine erfolgreiche, neue Verarbeitung wird mit `{"status": "ok", "processed": true}` bestätigt.

Beispiel mit `curl`:

```bash
curl -X POST "https://sitealarm.app/api/v2/health-check/DEIN_TOKEN/push" \
    -H "Content-Type: application/json" \
    -d '{
        "finishedAt": '"$(date +%s)"',
        "checkResults": [
            {
                "name": "database",
                "label": "Datenbank",
                "status": "ok",
                "notificationMessage": "",
                "shortSummary": "Erreichbar",
                "meta": []
            }
        ]
    }'
```

### Integration in deine Anwendung

So kannst du deine Anwendung konfigurieren, dass sie mit den erwarteten Ergebnissen der Gesundheitsüberprüfung antwortet:
- Laravel
- jede PHP-Anwendung
- alle anderen Programmiersprachen


### Aufbau eines Check-Ergebnisses

Jeder Eintrag in `checkResults` beschreibt einen einzelnen Aktionspunkt und hat folgende Felder:

| Feld                  | Pflicht | Beschreibung                                                                                                                                                              |
|-----------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`                | ja      | Eindeutiger, stabiler Bezeichner des Checks (z.B. `database`). Anhand von `name` erkennt Sitealarm, ob es sich um einen bereits bekannten oder einen neuen Check handelt. |
| `status`              | ja      | Einer von `ok`, `warning`, `crashed`, `skipped`, `failed` (siehe unten).                                                                                                  |
| `label`               | nein    | Anzeigename des Checks in der Oberfläche.                                                                                                                                 |
| `notificationMessage` | nein    | Text, der in Benachrichtigungen bei Problemen angezeigt wird.                                                                                                             |
| `shortSummary`        | nein    | Kurze Zusammenfassung, die in der Übersicht angezeigt wird.                                                                                                               |
| `meta`                | nein    | Beliebige zusätzliche Key-Value-Daten, die im Verlauf des Checks gespeichert und angezeigt werden (z.B. Messwerte).                                                       |

#### Mögliche `status`-Werte

- **`ok`** – Der Check war erfolgreich. Gilt als gesund, löst keine Fehlerbenachrichtigung aus.
- **`warning`** – Der Check läuft, ist aber beeinträchtigt (degraded). Wird in der Oberfläche separat von harten Fehlern dargestellt, löst aber ebenfalls Benachrichtigungen aus (mit eigenem Throttling).
- **`crashed`** – Der Check ist hart fehlgeschlagen (z.B. durch eine Exception). Wird wie `failed` behandelt.
- **`failed`** – Der Check hat ein negatives Ergebnis geliefert. Löst eine Fehlerbenachrichtigung aus.
- **`skipped`** – Der Check wurde bewusst übersprungen (z.B. weil er in diesem Lauf nicht relevant war). Gilt nicht als Fehler und löst keine Benachrichtigung aus.

Sendest du einen anderen, nicht unterstützten Wert, wird der Check intern als `unknown` geführt und wie ein Fehler behandelt.


### Anzeigen der Ergebnisse der Health-Checks in Sitealarm

Auf der Übersichtsseite siehst du alle Monitore mit aktivierten Health-Checks. Du kannst dort nach Status filtern: `ok`, `error`, `stale` (veraltet), `pending` (noch kein Ergebnis erhalten), `disabled`, `no_endpoint` (kein Endpunkt hinterlegt) und `unconfigured`.

Du kannst auf eine der Überprüfungen klicken, um den Verlauf für diesen Check einzusehen. Dort werden Status, Nachricht und `meta`-Daten zu jedem historischen Zeitpunkt angezeigt.

Standardmäßig speichern wir die Ergebnisse 7 Tage lang in voller Auflösung (ein Eintrag pro Abruf).
Danach werden ältere Einträge auf einen Eintrag pro Stunde verdichtet, bis sie insgesamt 30 Tage alt sind – danach werden sie gelöscht.
Diese beiden Zeiträume können technisch je nach Plan variieren, aktuell gelten sie aber für alle Pläne gleichermaßen (Free, Pro, Team).
Wenn du den Verlauf länger aufbewahren möchtest, solltest du in Betracht ziehen, unsere API zu nutzen, um die Ergebnisse abzurufen und sie in deinem eigenen Speicher aufzunehmen.

### `finishedAt` und veraltete Ergebnisse

Im **Poll-Modus** prüft Sitealarm den Zeitstempel `finishedAt` aus der Antwort deines Endpunkts.
Ist dieser Wert mehr als 60 Minuten älter als der aktuelle Zeitpunkt, gehen wir davon aus, dass dein Health-Check-Scheduler nicht mehr läuft und lediglich alte, zwischengespeicherte Ergebnisse ausgeliefert werden.
In diesem Fall markieren wir die Überprüfung als "veraltet" (`stale`) und benachrichtigen dich – unabhängig davon, was in `checkResults` steht.
Achte deshalb darauf, dass `finishedAt` bei jedem Abruf neu berechnet wird und nicht aus einem alten Cache stammt.

Im **Push-Modus** wird stattdessen der Zeitpunkt des letzten erfolgreich verarbeiteten Pushes verwendet (nicht der `finishedAt`-Wert aus dem Payload): Ist seit dem letzten eingegangenen Push mehr als 60 Minuten vergangen, wird der Check ebenfalls als "veraltet" markiert. Ist noch nie ein Push eingegangen, wird nicht vorschnell "veraltet" gemeldet – erst nach dem ersten erfolgreichen Push greift die Überwachung.

Die 60-Minuten-Schwelle ist aktuell fest hinterlegt und nicht pro Monitor konfigurierbar.


### Benachrichtigung über Probleme erhalten

Immer wenn ein Problem bei den Health-Checks erkannt wird (oder behoben wurde), kann Sitealarm dich benachrichtigen.
Dazu musst du die Benachrichtigungen für Health-Checks auf der Einstellungsseite aktivieren.

Für jede fehlgeschlagene oder beeinträchtigte Überprüfung (`failed`, `crashed`, `warning`) senden wir dir eine Benachrichtigung.
Um dich nicht mit Benachrichtigungen zu überfluten, senden wir pro fehlgeschlagenem Health-Check standardmäßig nur eine Benachrichtigung alle 3 Stunden (180 Minuten).
Dieses Intervall kannst du pro Health-Check in den Einstellungen anpassen (minimal 15 Minuten).
Wir senden dir auch eine Benachrichtigung, wenn ein Problem behoben wurde.

Zusätzlich verschicken wir einmal täglich um 07:30 Uhr eine Zusammenfassung mit dem aktuellen Status aller konfigurierten Checks – unabhängig vom oben genannten Benachrichtigungsintervall.

Einzelne Checks lassen sich außerdem in der Oberfläche "stummschalten" (Snooze). Ein stummgeschalteter Check wird weiterhin überwacht und im Verlauf protokolliert, löst aber keine Benachrichtigungen aus, bis du ihn wieder aktivierst (Unsnooze).

**Unterstützte Benachrichtigungskanäle für App-Health:** E-Mail, Microsoft Teams und Slack. Andere für Monitore verfügbare Kanäle (z.B. Webhook, Discord, Pushover) werden für App-Health-Benachrichtigungen aktuell nicht unterstützt, auch wenn sie in deinem Plan grundsätzlich freigeschaltet sind.


### Hinzufügen und Entfernen von Health-Checks

Jeder einzelne Health-Check, das dein Server zurücksendet, wird zu Sitealarm hinzugefügt.
Um einen bestimmten Check aus Sitealarm zu entfernen, lasse deinen Server einfach das Ergebnis nicht mehr an uns senden, und wir werden diese Überprüfung auch aus unserem System entfernen.


## Laravel

Registriere eine Route, die die Ergebnisse deiner Health-Checks als JSON zurückgibt, und schütze sie mit dem `health-check-secret` Header.

```php
// routes/web.php
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    if (request()->header('health-check-secret') !== config('services.sitealarm.health_check_secret')) {
        abort(403);
    }

    $databaseOk = true;
    try {
        DB::connection()->getPdo();
    } catch (\Exception $e) {
        $databaseOk = false;
    }

    $diskUsedPercentage = round((1 - disk_free_space('/') / disk_total_space('/')) * 100);

    return response()->json([
        'finishedAt'   => now()->timestamp,
        'checkResults' => [
            [
                'name'                => 'database',
                'label'               => 'Datenbank',
                'status'              => $databaseOk ? 'ok' : 'failed',
                'notificationMessage' => $databaseOk ? '' : 'Datenbank nicht erreichbar',
                'shortSummary'        => $databaseOk ? 'Erreichbar' : 'Fehler',
                'meta'                => [],
            ],
            [
                'name'                => 'disk-space',
                'label'               => 'Festplattenspeicher',
                'status'              => $diskUsedPercentage > 90 ? 'failed' : 'ok',
                'notificationMessage' => $diskUsedPercentage > 90 ? "Festplatte ist zu {$diskUsedPercentage}% voll" : '',
                'shortSummary'        => "{$diskUsedPercentage}%",
                'meta'                => ['disk_space_used_percentage' => $diskUsedPercentage],
            ],
        ],
    ]);
});
```

Speichere den Secret-Token aus den Health-Check-Einstellungen z.B. als `SITEALARM_HEALTH_CHECK_SECRET` in deiner `.env` und binde ihn über `config/services.php` ein:

```php
// config/services.php
'sitealarm' => [
    'health_check_secret' => env('SITEALARM_HEALTH_CHECK_SECRET'),
],
```

Möchtest du mehrere, feiner unterteilte Checks (z.B. Redis, Warteschlange, Speicherplatz) verwalten, lohnt sich ein Blick in das Paket [`spatie/laravel-health`](https://github.com/spatie/laravel-health) – es liefert bereits fertige Checks und einen konfigurierbaren Endpunkt im gleichen JSON-Format.

**Wichtig:** `finishedAt` muss bei jedem Abruf frisch berechnet werden (z.B. `now()->timestamp`). Lieferst du einen zwischengespeicherten, alten Wert zurück, markiert Sitealarm den Check als "veraltet" (siehe oben).

Möchtest du stattdessen den Push-Modus nutzen, kannst du den gleichen JSON-Payload per Cronjob (z.B. mit `Http::post(...)` oder einem Scheduled Command) an `POST /api/v2/health-check/{token}/push` senden, statt eine Route für den Abruf bereitzustellen.


## PHP Anwendungen

Auch ohne Framework kannst du das erwartete JSON-Format direkt ausgeben:

```php
<?php

header('Content-Type: application/json');

$expectedSecret = getenv('SITEALARM_HEALTH_CHECK_SECRET');
if (($_SERVER['HTTP_HEALTH_CHECK_SECRET'] ?? null) !== $expectedSecret) {
    http_response_code(403);
    exit;
}

$databaseStatus = 'failed';
try {
    new PDO('mysql:host=localhost;dbname=app', 'user', 'password');
    $databaseStatus = 'ok';
} catch (PDOException $e) {
    $databaseStatus = 'failed';
}

$diskUsedPercentage = round((1 - disk_free_space('/') / disk_total_space('/')) * 100);

echo json_encode([
    'finishedAt'   => time(),
    'checkResults' => [
        [
            'name'                => 'database',
            'label'               => 'Datenbank',
            'status'              => $databaseStatus,
            'notificationMessage' => 'ok' === $databaseStatus ? '' : 'Datenbank nicht erreichbar',
            'shortSummary'        => 'ok' === $databaseStatus ? 'Erreichbar' : 'Fehler',
            'meta'                => [],
        ],
        [
            'name'                => 'disk-space',
            'label'               => 'Festplattenspeicher',
            'status'              => $diskUsedPercentage > 90 ? 'failed' : 'ok',
            'notificationMessage' => $diskUsedPercentage > 90 ? "Festplatte ist zu {$diskUsedPercentage}% voll" : '',
            'shortSummary'        => "{$diskUsedPercentage}%",
            'meta'                => ['disk_space_used_percentage' => $diskUsedPercentage],
        ],
    ],
]);
```

Wie im Laravel-Beispiel gilt: `finishedAt` muss bei jedem Aufruf neu berechnet werden (`time()`), nicht aus einem Cache stammen.


## Alle anderen Sprachen

Sitealarm kann die Gesundheit jeder Anwendung überwachen, unabhängig von dem verwendeten Framework oder der verwendeten Programmiersprache.

Wir werden keine Health-Checks von unserer Seite aus durchführen.
Deine Anwendung oder Infrastruktur sollte die gewünschten Überprüfungen durchführen.
Die Ergebnisse der Überprüfungen sollten an einem HTTP-Endpunkt verfügbar gemacht werden (Poll-Modus) oder aktiv an Sitealarm gesendet werden (Push-Modus, siehe oben).

Alle paar Minuten besucht Sitealarm diesen Endpunkt, um die Health-Checks abzurufen.
Die Endpunkt-URL kann in den Einstellungen für die Health-Checks konfiguriert werden.


Die Anfrage, die Sitealarm an deine App sendet, enthält einen geheimen Wert im Header `health-check-secret`.
Um sicherzustellen, dass eine Anfrage tatsächlich von Sitealarm stammt, solltest du überprüfen, ob der geheime Wert korrekt ist.


## Grenzen und Limits

- **Anzahl Checks:** Pro Health-Check (also pro Monitor) werden aktuell maximal **5 unterschiedliche Checks** (unterschieden nach `name`) unterstützt. Sendest du weitere, neue Check-Namen, werden diese verworfen, bis ein bestehender Check entfernt wird.
- **`meta`-Felder:** Pro Check werden maximal **5 Key-Value-Paare** aus `meta` gespeichert. Überzählige Einträge werden stillschweigend abgeschnitten.
- **Push-Rate-Limit:** Der Push-Endpunkt akzeptiert maximal **30 Requests pro Minute** pro Token.

Diese Limits sind technisch planabhängig konfigurierbar, aktuell gelten aber für alle Pläne (Free, Pro, Team) dieselben Werte.
