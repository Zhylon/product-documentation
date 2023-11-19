# Standorte für Sitealarm bereitstellen

Wir suchen ständig nach neuen Standorten, um unsere Überwachung zu verbessern.
Wenn du einen Standort vorschlagen möchtest, kannst du uns gerne kontaktieren.

Um selbst einen Standort bereitzustellen, lies dir bitte die folgenden Informationen durch.
Wenn du alle Informationen gelesen hast und immer noch Fragen hast, kannst du uns gerne kontaktieren.
Treffen alle folgenden Punkte auf dich zu, dann kannst du dich als Standortbetreiber registrieren.


## Was ist ein Standort?

Ein Standort ist ein Server, der von Sitealarm verwendet wird, um deine Website zu überwachen.
Wir überwachen deine Website von mehreren Standorten aus. Der primäre Standort ist **Frankfurt, Deutschland**.

Diese können von uns bereitgestellt werden oder du kannst deinen eigenen Standort bereitstellen.
Es sind keine besonderen Voraussetzungen erforderlich, um einen Standort zu betreiben.
Du benötigst lediglich einen Server mit einer öffentlichen IP-Adresse (IPv4 und/oder IPv6).


### Prüfungsverfahren

Im Anschluss musst du einen Endpunkt bereitstellen, an den wir eine `POST`-Anfrage senden können.
Der Endpunkt sollte eine `HTTP/200`-Antwort zurückgeben, wenn alles in Ordnung ist.

Außerdem solltest du einen geheimen Wert im `health-check-secret` Header überprüfen.
Diesen musst du validieren, um sicherzustellen, dass die Anfrage tatsächlich von Sitealarm stammt.
Der Wert wird auch verwendet, um den Payload zu verschlüsseln, der an deine Anwendung gesendet wird.

Der Payload ist ein JSON-Objekt, das die Website enthält, die überprüft werden soll.
Hier ist ein Beispiel:

```json
{
  "h:Zx4N6LjrYar5RA9mDP": {
    "url": "https://site-example.com",
    "type": "HEAD"
  },
  "h:YKMn8Q1WRdqm6GBVlv": {
    "url": "https://other-example.com",
    "type": "GET",
    "keyword": "find me"
  },
  "h:ow396J7bvjbjGa2yA8": {
    "url": "https://something-example.com",
    "type": "POST",
    "headers": {
      "Content-Type": "application/json",
      "X-My-Header": "foo"
    },
    "payload": {
      "foo": "bar"
    }
  }
}
```

Die Antwort sollte ein JSON-Objekt sein, das die Ergebnisse der Health-Checks enthält.

```json
{
  "h:Zx4N6LjrYar5RA9mDP": {
    "status": "ok",
    "response_time": 0.123
  },
  "h:YKMn8Q1WRdqm6GBVlv": {
    "status": "ok",
    "response_time": 0.456
  },
  "h:ow396J7bvjbjGa2yA8": {
    "status": "failed",
    "type": "http_error"
  }
}
```

## Implementierung via PHP

Wir haben ein PHP-Paket erstellt, das du verwenden kannst, um einen Standort zu implementieren.
Du kannst es mit Composer installieren:

```bash
composer require zhylon/health-check-server
```

Weitere Informationen findest du in der [Dokumentation des Paktes](https://github.com/Zhylon/health-check-server).