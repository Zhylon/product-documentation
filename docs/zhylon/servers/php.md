# PHP

Erfahre, wie du PHP-Versionen auf deinem **Zhylon**-Server verwalten kannst.


## Überblick

**Zhylon** erleichtert die Installation und Konfiguration mehrerer PHP-Versionen auf deinem Server.
Jede installierte PHP-Version läuft in einem eigenen FPM-Prozess.
Darüber hinaus kannst du die PHP-Version, die von bestimmten Websites verwendet wird, jederzeit aktualisieren.

::: warning Achtung
Wenn du dich entscheidest, PHP-Versionen manuell auf deinem Server zu installieren, wird **Zhylon** über diese PHP-Installationen nicht informiert.
**Zhylon** kennt nur die PHP-Installationen, die über das **Zhylon**-Dashboard verwaltet werden.
:::


## Mehrere PHP-Versionen

Bei der Bereitstellung eines Servers musst du entscheiden, welche PHP-Version du standardmäßig installieren möchtest.
Die php-Binärdatei auf deinem Server wird auf die zum Zeitpunkt der Erstellung ausgewählte Version zeigen.

Sobald der Server erstellt wurde, ermöglicht es **Zhylon**, zusätzliche Versionen neben der Standardversion einfach zu installieren.
In der folgenden Dokumentation werden wir besprechen, wie du diese zusätzlichen PHP-Versionen verwalten kannst.



### Installation

Du kannst zusätzliche PHP-Versionen über den PHP-Tab im Verwaltungs-Dashboard eines Servers installieren. Sobald eine zusätzliche PHP-Version installiert ist,
kannst du sie bei der Erstellung einer Website oder beim Wechseln der PHP-Version einer bestehenden Website auswählen.

Wenn du eine neue PHP-Version auf deinem Server installierst, wird **Zhylon** den PHP-FPM-Prozess für diese Version erstellen und konfigurieren.
Das bedeutet, dass dein Server mehrere PHP-Versionen gleichzeitig ausführen kann.


### Deinstallation zusätzlicher PHP-Versionen

Du kannst eine PHP-Version deinstallieren, solange:

- Weitere Versionen installiert sind.
- Die Version, die du deinstallieren möchtest, nicht die Standardversion des Servers für neue Websites ist.
- Die Version, die du deinstallieren möchtest, nicht die Standardversion für die Kommandozeile (CLI) des Servers ist.
- Die Version, die du deinstallieren möchtest, nicht von einer Website verwendet wird.


### CLI

Nachdem eine zusätzliche PHP-Version installiert wurde, kannst du sie über die Kommandozeile (CLI) mit **`phpx.x`** ansprechen, wobei du **`x.x`** durch die Versionsnummer ersetzt (z. B. **`php8.1`**).
Das **`php`**-Binary verweist immer auf die aktive CLI-Version (wenn sie von der Standardversion abweicht).


### Standard-PHP-Installation

Die „Standard“-PHP-Version ist die PHP-Version, die standardmäßig verwendet wird, wenn du eine neue Website auf dem Server erstellst.

Beim Auswählen einer neuen PHP-Version als „Standard“-Version des Servers werden die PHP-Versionen der bestehenden Websites **nicht aktualisiert**.


### Aktualisierung von PHP zwischen Patch-Versionen

Du kannst deine PHP-Installationen jederzeit zwischen den Patch-Versionen von PHP mit der Schaltfläche **„Patch-Version“** aktualisieren.
In der Regel sollten diese Updates keine größeren Änderungen an deinem Server verursachen, obwohl einige Sekunden Ausfallzeit möglich sind.


### PHP-Betas / Release Candidates

PHP „Beta“- und „Release Candidate“-Versionen sind oft Wochen vor ihrer endgültigen Veröffentlichung auf Zhylon verfügbar.
Dadurch kannst du kommende Hauptversionen von PHP auf Websites testen, die sich nicht in der Produktion befinden.
Allerdings können einige Funktionen von Zhylon, PHP-Funktionen und PHP-Erweiterungen während dieses Zeitraums möglicherweise nicht wie erwartet funktionieren.
Darüber hinaus musst du, sobald die PHP-Version stabil ist, **die Version vollständig deinstallieren und erneut installieren**.


## Allgemeine PHP-Konfigurationseinstellungen

::: warning Achtung
Änderungen an den folgenden Einstellungen wirken sich auf alle auf dem Server installierten PHP-Versionen aus.
:::


### Maximale Dateigröße für Uploads

Du kannst die maximale Dateigröße für Uploads über den **PHP**-Tab im Serververwaltungs-Dashboard konfigurieren.
Dieser Wert sollte in Megabyte angegeben werden. Zum Vergleich: `1024 MB` entsprechen `1 GB`.


### Maximale Ausführungszeit

Du kannst die maximale Ausführungszeit über den **PHP**-Tab im Serververwaltungs-Dashboard konfigurieren.
Dieser Wert sollte in Sekunden angegeben werden.


### OPcache

Die Optimierung des PHP OPcache für die Produktion konfiguriert OPcache so, dass dein kompiliertes PHP-Code im Speicher gespeichert wird, um die Leistung erheblich zu verbessern.
Wenn du dich entscheidest, OPcache für die Produktion zu optimieren, solltest du sicherstellen,
dass dein Deployment-Skript den [PHP-FPM-Dienst](./cookbook#restarting-php-fpm) am Ende jedes Deployments neu lädt.


## Berechtigungen für Teams

Mitglieder deines Teams benötigen die Berechtigung `server:manage-php`, um PHP-Installationen und -Konfigurationen verwalten zu können.
Diese Berechtigung ist auch erforderlich, um Integrationen mit Blackfire.io und Papertrail zu verwalten.
