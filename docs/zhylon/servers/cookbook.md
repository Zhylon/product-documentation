# Cookbook

Häufige Aufgaben und Lösungen zur Verwaltung deines Zhylon-Servers.


## Neustart von PHP FPM

Bei der Konfiguration deines Servers konfiguriert Zhylon FPM so, dass es ohne das "sudo"-Passwort deines Servers neu gestartet werden kann.
Dazu gibst du den folgenden Befehl ein.
Natürlich solltest du die PHP-Version an die installierte Version auf deinem System anpassen:

```bash
( flock -w 10 9 || exit 1
    echo 'Restarting FPM...'; sudo -S service $ZHYLON_PHP_FPM reload ) 9>/tmp/fpmlock
```


## Zurücksetzen des sudo-Passworts des **`zhylon`**-Benutzers

Zhylon speichert das sudo-Passwort deines Servers für den Benutzer **`zhylon`** nicht und kann es daher nicht für dich zurücksetzen.
Um das sudo-Passwort des **`zhylon`**-Benutzers zurückzusetzen, musst du deinen Serveranbieter kontaktieren und SSH-Zugriff auf deinen
Server als **`root`**-Benutzer wiederherstellen.

Sobald du mit deinem Server als **`root`**-Benutzer verbunden bist, solltest du den Befehl **`passwd zhylon`** ausführen,
um das sudo-Passwort des **`zhylon`**-Benutzers neu festzulegen.


### DigitalOcean

Wenn deine Server von DigitalOcean verwaltet werden, helfen dir die folgenden Schritte, das Sudo-Passwort des Benutzers **`zhylon`**
über das DigitalOcean-Dashboard zurückzusetzen.

1. Zunächst klickst du im DigitalOcean-Dashboard auf den Servernamen. Gehe dann zum Tab „Zugriff“ und klicke auf „Root-Passwort zurücksetzen“.
In der Regel wird dieser Vorgang den Server neu starten und das neue Sudo-Passwort des **`root`**-Benutzers an die mit deinem DigitalOcean-Konto
verknüpfte E-Mail-Adresse gesendet.

2. Als Nächstes klickst du im Tab „Zugriff“ auf „Droplet-Konsole starten“, um Zugriff auf das Serverterminal als **`root`**-Benutzer zu erhalten.
Während dieses Schrittes wirst du aufgefordert, das Sudo-Passwort des **`root`**-Benutzers neu festzulegen.

3. Schließlich führst du den Befehl **`passwd zhylon`** im Terminal als **`root`**-Benutzer aus, um das Sudo-Passwort des Benutzers **`zhylon`** neu festzulegen.


### Weitere Anbieter

Weitere Anbieter haben möglicherweise unterschiedliche Schritte, um das Sudo-Passwort des **`zhylon`**-Benutzers zurückzusetzen.
Bitte kontaktiere deinen Serveranbieter, um weitere Informationen zu erhalten.
Wir versuchen, diese Dokumentation zu aktualisieren, um weitere Anbieter hinzuzufügen.


## Composer Upgrade

Die neueste Version von Composer wird von Zhylon installiert, wenn ein neuer Server bereitgestellt wird.
Wenn dein Server jedoch älter wird, möchtest du möglicherweise die installierte Version von Composer aktualisieren.
Du kannst dies mit folgendem Befehl tun:

```bash
composer self-update --2
```

Dieser Befehl weist Composer an, sich selbst zu aktualisieren und speziell Version 2 auszuwählen.
Falls deine Anwendung nicht mit Composer 2 kompatibel ist, kannst du jederzeit auf Composer 1 zurücksetzen:

```bash
composer self-update --1
```

::: tip Hinweis
Server werden mit einem geplanten Job provisioniert, der Composer aktualisiert.
Du solltest den bestehenden Job nach dem Upgrade von Composer löschen und neu erstellen, indem du zum Tab „Geplante Aufgaben“ des Servers gehst.
:::


## Nginx Upgrade

Die neueste Version von Nginx wird von Zhylon installiert, wenn ein neuer Server bereitgestellt wird.
Wenn dein Server jedoch älter wird, möchtest du möglicherweise die installierte Version von Nginx aktualisieren.
Du kannst dies mit den folgenden Befehlen tun:

```bash
sudo apt-get install -y --only-upgrade nginx
sudo nginx -v
sudo service nginx restart
```

::: warning Achtung
Du solltest die Nginx-Version auf deinem Server auf eigenes Risiko aktualisieren.
Das Upgrade der auf deinem Server installierten Nginx-Version kann zu Ausfallzeiten oder Konflikten mit anderer installierter Software führen.
:::


## Node.js Upgrade

Die neueste LTS-Version von Node.js wird von Zhylon installiert, wenn ein neuer Server bereitgestellt wird.
Wenn dein Server jedoch älter wird, möchtest du möglicherweise die Version von Node.js aktualisieren:

```bash
sudo apt-get update --allow-releaseinfo-change && sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=22
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update --allow-releaseinfo-change && sudo apt-get install nodejs -y
```

**[Node.js Versions-Informationen](https://nodejs.org/en/about/previous-releases/)**



## npm Upgrade

Die neueste Version von npm wird von Zhylon installiert, wenn neue Server bereitgestellt werden.
Du kannst jedoch die installierte Version von npm mit den folgenden Befehlen aktualisieren:

```bash
sudo npm install npm@latest -g
```

## Meilisearch Upgrade

Wenn du die neuesten Meilisearch-Binärdateien auf deinem Server installieren möchtest, folge bitte dem
**[offiziellen Upgrade-Leitfaden von Meilisearch](https://www.meilisearch.com/docs/learn/update_and_migration/updating)**.

Auf den meisten Zhylon-Servern ist die Meilisearch-Binärdatei unter **`/usr/local/bin/meilisearch`**
installiert und die Datenbank wird unter **`/var/lib/meilisearch`** gespeichert.


## DigitalOcean Droplet-Limit überschritten

Dieser Fehler wird von **[DigitalOcean](https://digitalocean.com/)** zurückgegeben, wenn du das Limit erreicht hast, wie viele Droplets du erstellen kannst.
Du kannst DigitalOcean bitten, dein Droplet-Limit zu erhöhen, indem du ihren Support kontaktierst.
Sobald sie dein Limit erhöht haben, kannst du in Zhylon Server erstellen.


<!--
## AWS-Server verschwinden

Um sicherzustellen, dass Zhylon korrekt mit AWS funktioniert, überprüfe bitte **[diese Anforderungen](/servers/providers#amazon-aws-api-access)**.
-->


## Server Getrennt

Es gibt mehrere Gründe, warum dein Server den Status „getrennt“ haben könnte.
Wir empfehlen dir, die folgenden häufigen Lösungen zu überprüfen, bevor du den Support kontaktierst:

- Überprüfe, ob der Server über das Dashboard deines Serveranbieters eingeschaltet ist.
Wenn der Server ausgeschaltet ist, starte ihn über das **Dashboard deines Anbieters** neu.

- Verifiziere, dass die öffentliche IP-Adresse des Servers bei Zhylon bekannt ist (die öffentliche IP-Adresse kann sich nach einem Neustart des VPS ändern).

- Überprüfe, ob der von Zhylon generierte öffentliche Schlüssel für den Server in den Dateien **`/root/.ssh/authorized_keys`** und **`/home/zhylon/.ssh/authorized_keys`** enthalten ist.
Dieser Schlüssel ist im „Einstellungen“-Tab deines Server-Management-Panels von Zhylon verfügbar.

- Wenn dein Server hinter einer Firewall steht, stelle sicher, dass du **[Zhylons IP-Adressen](/general/#zhylon-ip-adressen)** den Zugriff auf den Server erlaubt hast.

- Wenn du Port 22 aus den Firewall-Regeln des Servers entfernt hast, musst du deinen Serveranbieter kontaktieren und ihn bitten, die Regel wiederherzustellen.
Das Entfernen dieser Regel verhindert, dass Zhylon über SSH auf deinen Server zugreifen kann.

- Entferne private Schlüssel oder andere Zeilen, die keinen gültigen öffentlichen Schlüssel enthalten, aus den Dateien
**`/root/.ssh/authorized_keys`** und **`/home/zhylon/.ssh/authorized_keys`**.


Wenn du weiterhin Probleme mit der Konnektivität hast, solltest du auch überprüfen, ob die Berechtigungen und der
Besitz der folgenden Verzeichnisse und Dateien korrekt sind:

```bash
# Fixes the "root" user (run as root)

chown root:root /root
chown -R root:root /root/.ssh
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys

# Fixes the "zhylon" user

chown zhylon:zhylon /home/zhylon
chown -R zhylon:zhylon /home/zhylon/.ssh
chmod 700 /home/zhylon/.ssh
chmod 600 /home/zhylon/.ssh/authorized_keys
```

Wenn Zhylon nach all diesen Lösungen immer noch keine Verbindung zu deinem Server herstellen kann, du jedoch weiterhin per SSH auf den Server zugreifen kannst,
führe bitte den folgenden Befehl als **`root`**-Benutzer aus und teile die Ausgabe mit dem Support von Zhylon:

```bash
grep 'sshd' /var/log/auth.log | tail -n 10
```

::: warning Achtung
Wenn Zhylon keine Verbindung zu deinem Server herstellen kann, wirst du ihn bis zur Wiederherstellung der Konnektivität nicht über das Zhylon-Dashboard verwalten können.
:::


## „Too Many Open Files“-Fehler

Wenn du eine Fehlermeldung erhältst, dass auf deinem Server „zu viele Dateien geöffnet“ sind, musst du wahrscheinlich die maximale Anzahl von Dateideskriptoren erhöhen,
die dein Betriebssystem gleichzeitig zulässt. Dies kann besonders wichtig sein, wenn dein Server eine sehr hohe Anzahl eingehender Webanfragen verarbeiten muss.

Stelle zunächst sicher, dass die maximale Anzahl „offener Dateien“ korrekt konfiguriert ist, basierend auf der Größe deines Servers.
Üblicherweise sollte die maximale Anzahl der vom Betriebssystem zulässigen offenen Dateien etwa 100 Dateien pro 1 MB RAM betragen.
Wenn dein Server beispielsweise 4 GB Arbeitsspeicher hat, kann die maximale Anzahl der offenen Dateien sicher auf **`409600`** gesetzt werden.

Du kannst ermitteln, wie viele Dateien dein Betriebssystem derzeit gleichzeitig öffnen kann, indem du den Befehl **`sysctl fs.file-max`** ausführst.
Du kannst die vorhandene Einstellung ändern, indem du folgende Zeile in der Datei **`/etc/sysctl.conf`** hinzufügst oder modifizierst:

```bash
fs.file-max = LIMIT_HERE 
```


Während die obigen Anweisungen die maximale Anzahl von „offenen Dateien“ systemweit festlegen, musst du diese Limits auch für jeden Serverbenutzer festlegen,
indem du die Datei **`/etc/security/limits.conf`** bearbeitest und die folgenden Zeilen hinzufügst:

```bash
root soft nofile LIMIT_HERE
root hard nofile LIMIT_HERE
zhylon soft nofile LIMIT_HERE
zhylon hard nofile LIMIT_HERE
```


Natürlich müssen auch alle zusätzlichen Benutzer, die durch die Verwendung von „Site-Isolation“ auf deinem Server erstellt wurden, 
in die Datei **`/etc/security/limits.conf`** hinzugefügt werden:

```bash
isolated-user soft nofile LIMIT_HERE
isolated-user hard nofile LIMIT_HERE
```


Zusätzlich, falls der Fehler „zu viele offene Dateien“ durch einen Nginx-Prozess ausgelöst wurde (was sehr häufig bei Load Balancern im großen Maßstab vorkommt),
musst du auch den Nginx-Benutzer in die Datei **`/etc/security/limits.conf`** hinzufügen:

```bash
nginx soft nofile LIMIT_HERE
nginx hard nofile LIMIT_HERE
```


Und füge die folgende Direktive in die Datei **`/etc/nginx/nginx.conf`** deines Servers hinzu:


```nginx
worker_rlimit_nofile LIMIT_HERE;
```


Du solltest den Nginx-Dienst neu starten, sobald diese Direktive zu deiner Nginx-Konfigurationsdatei hinzugefügt wurde:

```bash
service nginx restart
```
