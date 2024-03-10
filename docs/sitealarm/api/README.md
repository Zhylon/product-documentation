# Sitealarm API

Durch die **Sitealarm API** kannst du sämtliche Ressourcen unserer Anwendung über eine 
benutzerfreundliche und strukturierte Programmierschnittstelle (API) ansprechen.

Alles, was du in deinem Dashboard siehst, lässt sich über die API steuern.
Als zusätzlichen Vorteil werden alle Änderungen, die du über die API vornimmst,
in Echtzeit in deinem Dashboard sichtbar.


## Los geht's

Lass uns dir helfen, den Einstieg zu erleichtern.

- Erfahre mehr über unsere API-Authentifizierung und generiere deinen ersten API-Schlüssel.
- Hol dir mit der API eine Liste aller deiner Monitore und ihrer Checks.

Optional bieten wir ein PHP SDK-Paket an, um dir den Einstieg zu erleichtern.


### API-Endpunkt

Alle Sitealarm API-Endpunkte befinden sich unter `https://sitealarm.de/api/v1`.
Ab diesem Punkt folgt eine logische Struktur, die dem **REST-Standard** entspricht.

Hier ist eine kurze Zusammenfassung der API-Methoden:

- `GET`: Alle GET-Anfragen dienen ausschließlich dem Datenabruf (z. B. Monitor-Einträge, Kontoinformationen) und ändern niemals Daten.
- `POST`: Eine POST-Methode fügt neue Monitore oder Checks zu Sitealarm hinzu.
- `DELETE`: Mit der DELETE-Methode kannst du bestimmte Monitore oder Checks aus deinem Konto entfernen.
- `PUT`: Diese Methode wird verwendet, um Informationen auf bestehenden Monitore, Checks oder in deinem Konto zu aktualisieren.

Generell können `GET`-Anfragen beliebig oft ausgeführt werden, während alle anderen Methoden tatsächlich Daten in deinem Konto verändern und Änderungen wirksam machen.


### Response Data/Format

Alle Antworten werden im JSON-Format zurückgegeben.

```json
{
    "data": {
        "id": 1,
        "name": "My Website",
        "url": "https://example.com",
        "uptime": 99.99,
        "status": "up",
        "created_at": "2020-01-01T00:00:00.000000Z",
        "updated_at": "2020-01-01T00:00:00.000000Z"
    }
}
```

Jeder Endpunkt gibt die Daten in einem bestimmten Format zurück.
Mehr dazu findest du in der Dokumentation zu den einzelnen Endpunkten.


### Erstellen eines API-Schlüssels

Um die API zu verwenden, benötigst du einen API-Schlüssel.
Du kannst einen API-Schlüssel erstellen, indem du auf deinem Dashboard auf `Einstellungen > API` klickst.

Du kannst deinem API-Schlüssel einen Namen geben, um ihn später leichter zu identifizieren.
Außerdem hast du die Möglichkeit, verschiedene Berechtigungen für deinen API-Schlüssel zu vergeben.

Aktuell gibt es folgende Berechtigungen:
- `read`: Diese Berechtigung ermöglicht es dir, alle Daten abzurufen, aber keine Daten zu ändern.
- `create`: Diese Berechtigung ermöglicht es dir, neue Daten zu erstellen.
- `update`: Diese Berechtigung ermöglicht es dir, alle Daten abzurufen und zu ändern.
- `delete`: Diese Berechtigung ermöglicht es dir, alle Daten abzurufen und zu löschen.


### API-Authentifizierung

Die Sitealarm API verwendet **API-Schlüssel** zur Authentifizierung.
Dieser Schlüssel muss in jedem API-Aufruf als `Authorization`-Header übergeben werden.

```bash
$ SITEALARM_TOKEN="your API token"
$ curl https://sitealarm.de/api/v1/monitors \
    -H "Authorization: Bearer $SITEALARM_TOKEN" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json'
```


## Monitore

### Alle Monitore abrufen

#### Request

- HTTP Method: `GET`
- Content Type: `application/json`
- URL: `/monitors`

### Einen bestimmten Monitor abrufen

#### Request

- HTTP Method: `GET`
- Content Type: `application/json`
- URL: `/monitors/{id}`

### Einen neuen Monitor erstellen

#### Request

- HTTP Method: `POST`
- Content Type: `application/json`
- URL: `/monitors`

#### Parameters

| Property    | Type   | Required | Description                |
|-------------|--------|----------|----------------------------|
| ``url``     | String | true     | The URL of the monitor.    |
| ``team_id`` | String | true     | The ID of the team.        |
| ``checks``  | Array  | false    | The checks of the monitor. |

Mögliche Checks sind:
- `uptime`: Überprüft die Verfügbarkeit der Website.
- `certificate_health`: Überprüft die Gültigkeit des SSL-Zertifikats.
- `mixed_content`: Überprüft, ob die Website gemischte Inhalte enthält.
- `broken_links`: Überprüft, ob die Website kaputte Links enthält.


Hier ist ein Beispiel-Payload:

```json
{
    "url": "https://example.com",
    "team_id": "h:YKMn8Q1WRdqm6GBVlv",
    "checks": [
        "uptime",
        "certificate_health",
        "mixed_content",
        "broken_links"
    ]
}
```
