# Migration von anderen Anbietern

Wenn du bereits einen anderen Anbieter für das Monitoring deiner Webseiten verwendest, kannst du deine Webseiten einfach zu Sitealarm migrieren.
Dies geht am besten durch die Verwendung der Sitealarm API.

Auf dieser Seite bieten wir dir einige Beispiele, wie du deine Webseiten von anderen Anbietern zu Sitealarm migrieren kannst.

## UptimeRobot

Um von UptimeRobot zu Sitealarm zu migrieren, benötigst du für jede deiner Webseiten einen API-Schlüssel.
Wenn du Sitealarm als Team verwendest und nicht der Administrator bist, musst du zusätzlich die ID deines Teams kennen.

Lade dazu einfach folgende Datei herunter:

Im Anschluss kannst du die Datei mit folgendem Befehl ausführen:

```bash
bash migrate-from-uptimerobot.sh
```

Die History deiner Webseiten wird nicht migriert.

Standardmäßig werden folgende Checks aktiviert:
- Monitoring
- Zertifikatsüberprüfung

Bitte beachte, dass die Überprüfung der Zertifikate nur für Webseiten aktiviert wird, die mit `https://` beginnen.
Bei Webseiten, die mit `http://` beginnen, wird die Überprüfung der Zertifikate nicht aktiviert.

Außerdem werden Websites die bereits in Sitealarm vorhanden sind, nicht migriert.



https://pulsetic.com/pricing/

https://sandstorm.de/de/blog/post/migrating-from-uptimerobot-to-uptimekuma.html
https://ohdear.app/news-and-updates/scheduled-task-monitoring-now-available-to-all-our-users
uptime robot 15$/M
Cronitor 49$/M
Statuspage 29$/M
Dead Link Checker 9$/M

