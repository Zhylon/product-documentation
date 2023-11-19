# App-Health

Mit Sitealarm kannst du verschiedene Aspekte deiner Anwendung und deines Servers überwachen.
Dadurch kannst du Benachrichtigungen erhalten, wenn z.B. folgende Punkte zutreffen:
- der Festplattenspeicherplatz wird knapp
- die Datenbank ist nicht erreichbar
- Redis ist nicht erreichbar
- E-Mails können nicht gesendet werden
- ein Neustart der Anwendung ist erforderlich
- ...

Du kannst jeden beliebigen Aktionspunkt deiner Anwendung überwachen.



## Los geht's
### Antworte mit Ergebnissen deiner Health-Checks

Sitealarm führt keinen Code innerhalb deiner Anwendung oder deines Servers aus.
Stattdessen solltest du die Überprüfungen selbst durchführen.
Sitealarm sendet einen HTTP-Request an deine Anwendung an einen bestimmten Endpunkt.
Deine Anwendung sollte mit JSON antworten, das das Ergebnis der Health-Checks enthält.

Der Request, den Sitealarm an deine Anwendung sendet, enthält einen geheimen Wert im `health-check-secret` Header.
Um sicherzustellen, dass eine Anfrage tatsächlich von Sitealarm stammt, solltest du überprüfen, ob der geheime Wert korrekt ist.

Der Endpunkt, an den die Anfrage gesendet wird, sowie der Secret-Token im Header können in den Einstellungen für die Überprüfung der Health-Checks festgelegt werden.


### Integration in deine Anwendung

So kannst du deine Anwendung konfigurieren, dass sie mit den erwarteten Ergebnissen der Gesundheitsüberprüfung antwortet:
- Laravel
- jede PHP-Anwendung
- alle anderen Programmiersprachen


### Anzeigen der Ergebnisse der Health-Checks in Sitealarm

Sitealarm überprüft den Endpunkt für die Ergebnisse der Health-Checks deiner App alle paar Minuten.
Du kannst die Ergebnisse auf dem Bildschirm für die Überprüfung der Health-Checks einsehen.

Du kannst auf eine der Überprüfungen klicken, um den Verlauf für dieses Checks einzusehen.

Wir speichern den Verlauf nur für ein paar Tage.
Wenn du den Verlauf länger aufbewahren möchtest, solltest du in Betracht ziehen, unsere API zu nutzen, um die Ergebnisse abzurufen und sie in deinem eigenen Speicher aufzunehmen.


### Benachrichtigung über Probleme erhalten

Immer wenn ein Problem bei den Health-Checks erkannt wird (oder behoben wurde), kann Sitealarm dich benachrichtigen.
Dazu musst du die Benachrichtigungen für Health-Checks auf der Einstellungsseite aktivieren.

Für jede fehlgeschlagene Überprüfung senden wir dir eine Benachrichtigung.
Um dich nicht mit Benachrichtigungen zu überfluten, senden wir pro fehlgeschlagenem Health-Check pro Stunde nur eine Benachrichtigung.
Wir senden dir auch eine Benachrichtigung, wenn ein Problem behoben wurde.


### Hinzufügen und Entfernen von Health-Checks

Jeder einzelne Health-Check, das dein Server zurücksendet, wird zu Sitealarm hinzugefügt.
Um einen bestimmten Check aus Sitealarm zu entfernen, lasse deinen Server einfach das Ergebnis nicht mehr an uns senden, und wir werden diese Überprüfung auch aus unserem System entfernen.


## Laravel
...


## PHP Anwendungen
...


## Alle anderen Sprachen

Sitealarm kann die Gesundheit jeder Anwendung überwachen, unabhängig von dem verwendeten Framework oder der verwendeten Programmiersprache.

Wir werden keine Health-Checks von unserer Seite aus durchführen.
Deine Anwendung oder Infrastruktur sollte die gewünschten Überprüfungen durchführen.
Die Ergebnisse der Überprüfungen sollten an einem HTTP-Endpunkt verfügbar gemacht werden.

Alle paar Minuten besucht Sitealarm diesen Endpunkt, um die Health-Checks abzurufen.
Die Endpunkt-URL kann in den Einstellungen für die Health-Checks konfiguriert werden.


Die Anfrage, die Sitealarm an deine App sendet, enthält einen geheimen Wert im Header `health-check-secret`.
Um sicherzustellen, dass eine Anfrage tatsächlich von Sitealarm stammt, solltest du überprüfen, ob der geheime Wert korrekt ist.

