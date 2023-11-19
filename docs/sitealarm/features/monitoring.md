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

Uptime-Überprüfungen erfolgen **jede Minute** vom primären Standort aus.

Sobald der primäre Standort ein Problem erkennt, wird der sekundäre Standort zur Bestätigung verwendet.

Wenn du dies auf einer Zeitleiste darstellen würdest, sähe es so aus:

| Zeit  | Status  | Standort                                     |
|-------|---------|----------------------------------------------|
| 09:20 | OK      | Primär                                       |
| 09:21 | OK      | Primär                                       |
| 09:22 | PROBLEM | Primär                                       |
| 09:22 | PROBLEM | Sekundär                                     |
| 09:23 | PROBLEM | Primär                                       |
| 09:23 | PROBLEM | Sekundär                                     |
| 09:23 |         | **Benachrichtigung ausgelöst: Website DOWN** |
| 09:24 | PROBLEM | Primär                                       |
| 09:24 | PROBLEM | Sekundär                                     |
| 09:25 | OK      | Primär                                       |
| 09:25 |         | **Benachrichtigung ausgelöst: Website UP**   |
| 09:26 | OK      | Primär                                       |
| 09:27 | OK      | Primär                                       |

Das erste Problem wird um *09:22 Uhr* erkannt, und der zweite Standort wird sofort verwendet, um das Problem zu bestätigen.

Wenn beide Standorte bestätigen, dass die Website **2 Minuten hintereinander** nicht erreichbar ist, wirst du über dieses Ereignis benachrichtigt.
Falls dies zu schnell ist, kannst du die Anzahl der Minuten für Nichtverfügbarkeit vor einer Benachrichtigung in den 'Monitors > Einstellungen > Verfügbarkeit > Benachrichtigungseinstellungen' erhöhen.

Die Überprüfung um *09:25 Uhr* hat bestätigt, dass die Website wieder online ist. Du wirst darüber ebenfalls benachrichtigt.


## Was ist Nichtverfügbarkeit?

Wir klassifizieren Nichtverfügbarkeit auf zwei Arten:

- Wenn wir irgendetwas außer einem `HTTP/2xx`-Antwortcode auf der Überprüfungsseite erhalten, betrachten wir die Seite als nicht erreichbar. 
Beachte, dass wir `HTTP/301`- und `HTTP/302`-Weiterleitungen verfolgen. Das endgültige Ergebnis der Weiterleitung sollte ein `HTTP/2xx` sein.
- Wenn wir eine `HTTP/2xx`-Antwort erhalten, aber den optionalen Überprüfungstext, der auf der Seite "Einstellungen" der Website angegeben ist, nicht finden, betrachten wir die Seite als nicht erreichbar.
- Wenn die Website länger als **5 Sekunden** zum Laden benötigt, betrachten wir sie als nicht erreichbar.

Eines dieser Ereignisse markiert die Seite als nicht verfügbar.

Beispielsweise wird auch eine `HTTP/204 No Content`-Antwort als "online" betrachtet.


## Unsere Standorte

Wir überwachen deine Website von mehreren Standorten aus. Der primäre Standort ist Frankfurt, Deutschland.

Europa:
- Frankfurt, Deutschland (primär)
- Jena, Deutschland


### Standorte hinzufügen
Wenn du uns einen weiteren Standort vorschlagen möchtest, oder selbst einen Standort bereitstellen möchtest, kannst du uns gerne kontaktieren.
Lies hierzu bitte die Informationen unter [Standorte für Sitealarm bereitstellen](/api/self-hosted-location) durch.
