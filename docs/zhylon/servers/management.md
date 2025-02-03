# Management

Lerne, wie du deine Server in Zhylon verwalten kannst.

## Server-Einstellungen

Im **Einstellungen**-Tab des Server-Dashboards kannst du wichtige Details deines Servers anpassen, darunter:
- Name
- SSH-Verbindungsdetails
- Zeitzone
- Tags

### IP-Adressen

Falls sich die IP-Adresse deines Servers ändert, solltest du Zhylon darüber informieren, damit die Verbindung bestehen bleibt und dein Server weiterhin verwaltet werden kann.  
Um die IP-Adresse zu aktualisieren, gehe zum **Einstellungen**-Tab und passe das Feld **IP-Adresse** unter den **Server-Einstellungen** an.

::: tip Hinweis
Wenn du einen AWS-Server neu startest, weist AWS dem Server eine neue IP-Adresse zu. Daher musst du die IP-Adresse nach jedem Neustart des Servers in Zhylon aktualisieren.
:::


### Zeitzone

Standardmäßig werden alle Zhylon-Server mit der UTC-Zeitzone eingerichtet und konfiguriert.
Falls du die Zeitzone deines Servers ändern möchtest, kannst du eine passende Zeitzone aus der Liste auswählen.
Zhylon verwendet den Befehl `timedatectl`, um die Zeitzone des Systems zu ändern.


## Server archivieren

Du kannst einen Server über die Zhylon-Oberfläche archivieren, indem du auf der Detailseite des Servers unten auf die Schaltfläche **Archivieren** klickst.
Durch das Archivieren wird Zhylon's Zugriff auf den Server entfernt.
Falls erforderlich, kannst du einen archivierten Server später über dein Zhylon-Profil wieder verbinden.

Das Archivieren eines Servers **löscht** ihn nicht vom Serveranbieter und führt **nicht** zu einem Datenverlust auf dem Server.


### Archivierungsberechtigung für Teams

Du kannst einem Team-Mitglied die Berechtigung erteilen, einen Server aus deinem Konto zu archivieren, indem du ihm die Berechtigung `server:archive` gewährst.


## Übertragen von Servern an andere Benutzer

Server können an andere Zhylon-Konten übertragen werden.
Dazu gibst du in den **Servereinstellungen** die E-Mail-Adresse des Zhylon-Kontos an, an das der Server übertragen werden soll.

Das empfangende Zhylon-Konto erhält eine E-Mail mit der Bitte, die Übertragung zu bestätigen.
Außerdem muss der Empfänger den entsprechenden [Serveranbieter](./providers) in seinem Konto eingerichtet haben, bevor die Übertragung erfolgen kann.
Falls der Server beispielsweise bei DigitalOcean gehostet wird, muss DigitalOcean als Serveranbieter im Konto des Empfängers hinterlegt sein.

::: tip Hinweis
Server können nur an Zhylon-Konten mit aktivem Abonnement übertragen werden, die ihr Serverlimit noch nicht erreicht haben.
:::


### Berechtigung zur Serverübertragung innerhalb eines Teams

Du kannst einem Team-Mitglied die Berechtigung erteilen, einen Server aus deinem Konto zu übertragen, indem du ihm die `server:transfer`-Berechtigung zuweist.


## Server löschen

Ein Server kann in der Zhylon-Oberfläche gelöscht werden, indem du auf der Detailseite des Servers die Schaltfläche **Server zerstören** anklickst.
Zhylon fordert dich auf, den Namen des Servers zur Bestätigung einzugeben.

::: warning Achtung ⚠
Das Löschen eines Servers **entfernt ihn dauerhaft** beim verbundenen Anbieter und führt zu **unwiderruflichem Datenverlust**.
:::


### Löschen von benutzerdefinierten Servern

Beim Löschen eines benutzerdefinierten Servers ([Custom VPS](./providers#bring-your-own-server)) wird der Server nur aus Zhylon entfernt.
Der Server selbst bleibt weiterhin bestehen und läuft weiter.


### Berechtigung zum Löschen innerhalb eines Teams

Du kannst einem Team-Mitglied die Berechtigung erteilen, einen Server aus deinem Konto zu löschen, indem du ihm die `server:delete`-Berechtigung zuweist.
