# Monitoring

## Verschiedene Verfügbarkeitsprüfung

Um die Verfügbarkeit zu überprüfen, führen wir eine unkomplizierte `GET`-Anfrage an die von dir angegebene Website durch.
Eine erfolgreiche Überprüfung erfolgt, wenn die Antwort eine `2xx`-HTTP-Antwort ist. Im Einstellungsbildschirm der Site
stehen verschiedene Optionen zur Verfügung, um diese Überprüfung nach deinen Bedürfnissen anzupassen:

- **Suche nach Zeichenfolge**: Wenn du eine Zeichenfolge angibst, wird die Antwort auf diese Zeichenfolge überprüft.
  Wenn die Zeichenfolge nicht gefunden wird, wird die Überprüfung als fehlgeschlagen markiert.
- **Fehlende Zeichenfolge**: Wenn du eine Zeichenfolge angibst, wird die Antwort auf diese Zeichenfolge überprüft.
  Wenn die Zeichenfolge gefunden wird, wird die Überprüfung als fehlgeschlagen markiert.
- **Antwort Header**: Wenn du einen Header angibst, wird die Antwort auf diesen Header überprüft.
  Wenn der Header nicht gefunden wird, wird die Überprüfung als fehlgeschlagen markiert.
- **HTTP Verb**: Du kannst das HTTP Verb auswählen, das für die Überprüfung verwendet werden soll.
  Standardmäßig wird ein `GET`-Verb verwendet. Du kannst aber auch `POST`, `PUT` oder `PATCH` auswählen.
- **Payload**: Wenn du ein HTTP Verb ausgewählt hast, das einen Payload erfordert, kannst du hier den Payload angeben.
- **Anfrage-Header**: Du kannst hier zusätzliche Header angeben, die an die Anfrage angehängt werden sollen.


## Überprüfungsfrequenz

Uptime-Überprüfungen erfolgen **jede Minute** von unserem Hauptstandort aus. Dieser Standort trifft immer die
endgültige Entscheidung, ob eine Benachrichtigung ausgelöst wird.

Zusätzlich kannst du pro Monitor beliebig viele weitere, unabhängige Standorte zur Bestätigung aktivieren
(siehe [Unsere Standorte](#unsere-standorte)). Diese Standorte lösen selbst **niemals** einen Alarm aus —
sie bestätigen lediglich, was der Hauptstandort bereits vermutet:

1. Der Hauptstandort erkennt ein Problem und merkt sich den Zeitpunkt.
2. Erst nachdem eine konfigurierbare Wartezeit abgelaufen ist, wird überhaupt eine Benachrichtigung erwogen.
3. Sind für den Monitor keine zusätzlichen Standorte aktiviert, wird sofort benachrichtigt.
4. Sind Standorte aktiviert, aber seit einiger Zeit nicht mehr erreichbar (kein Heartbeat), gelten sie als
   nicht vertrauenswürdig — es wird ebenfalls sofort benachrichtigt.
5. Meldet mindestens ein aktiver, erreichbarer Standort im selben Zeitraum ebenfalls "nicht erreichbar",
   gilt das Problem als bestätigt und du wirst benachrichtigt.
6. Meldet kein aktiver Standort ein Problem, wird (noch) keine Benachrichtigung ausgelöst.

Die Wartezeit vor einer Benachrichtigung kannst du unter 'Monitors > Einstellungen > Verfügbarkeit >
Benachrichtigungseinstellungen' anpassen, falls dir die Standardeinstellung zu schnell oder zu langsam ist.

Sobald die Website an allen zuständigen Standorten wieder erreichbar ist, wirst du auch darüber benachrichtigt.


## Was ist Nichtverfügbarkeit?

Wir klassifizieren Nichtverfügbarkeit auf zwei Arten:

- Wenn wir irgendetwas außer einem `HTTP/2xx`-Antwortcode auf der Überprüfungsseite erhalten, betrachten wir die Seite als nicht erreichbar. 
Beachte, dass wir `HTTP/301`- und `HTTP/302`-Weiterleitungen verfolgen. Das endgültige Ergebnis der Weiterleitung sollte ein `HTTP/2xx` sein.
- Wenn wir eine `HTTP/2xx`-Antwort erhalten, aber den optionalen Überprüfungstext, der auf der Seite "Einstellungen" der Website angegeben ist, nicht finden, betrachten wir die Seite als nicht erreichbar.
- Wenn die Website länger als **5 Sekunden** zum Laden benötigt, betrachten wir sie als nicht erreichbar.

Eines dieser Ereignisse markiert die Seite als nicht verfügbar.

Beispielsweise wird auch eine `HTTP/204 No Content`-Antwort als "online" betrachtet.


## Unsere Standorte

Unser Hauptstandort befindet sich in Frankfurt, Deutschland — von dort aus wird jeder Monitor überwacht.

Zusätzlich betreiben wir weitere, unabhängige Standorte, die du je Monitor einzeln unter
'Monitors > Einstellungen > Verfügbarkeit > Standorte' zur Bestätigung hinzuschalten kannst. Ist für einen
Monitor kein zusätzlicher Standort aktiviert, wird er ausschließlich vom Hauptstandort geprüft.

Welche Standorte aktuell verfügbar sind, siehst du direkt in den Monitor-Einstellungen — die Liste wächst
laufend, da wir und die Community neue Standorte registrieren können.


### Standorte hinzufügen
Wenn du uns einen weiteren Standort vorschlagen möchtest, oder selbst einen Standort bereitstellen möchtest, kannst du uns gerne kontaktieren.
Lies hierzu bitte die Informationen unter [Standorte für Sitealarm bereitstellen](/api/self-hosted-location) durch.
