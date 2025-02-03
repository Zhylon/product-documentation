# Netzwerk

Lerne, wie du dein Servernetzwerk und die Firewall verwalten kannst.


## Übersicht

Zhylon ermöglicht es dir, die Firewall deines Servers zu verwalten und zu konfigurieren, welche Server über das
Netzwerk-Management-Panel innerhalb des Server-Dashboards mit anderen Servern kommunizieren können.

Wenn du manuell eine UFW-Regel auf deinem Server erstellst, wird dies nicht im Zhylon-Dashboard angezeigt.
Zhylon ist nur über die im Dashboard erstellten Regeln informiert.


## Servernetzwerk

Servernetzwerke ermöglichen es dir, einen verbundenen Server problemlos als separaten Datenbank-, Cache- oder Warteschlangenserver zu verwenden.
Damit ein Server mit einem internen Netzwerk verbunden werden kann, muss er:

- Vom gleichen Anbieter erstellt werden.
- Dieselben Anmeldeinformationen des Serveranbieters verwenden.
- Dem gleichen Benutzer gehören.
- In derselben Region sein.

Sobald du den Zugriff von einem Server auf einen anderen gewährt hast, kannst du auf den anderen Server über seine private IP-Adresse zugreifen.


## Firewalls

Du kannst deine Firewall über das Zhylon-Dashboard im Reiter **„Netzwerk“** des Serververwaltungs-Dashboards konfigurieren und verwalten.
Firewalls werden verwendet, um Ports auf deinem Server für das Internet zu öffnen. Zum Beispiel musst du beim Verwenden von FTP möglicherweise Port **`21`** öffnen.

Zur Erhöhung der Sicherheit kannst du die geöffneten Ports auf bestimmte IP-Adressen beschränken.

Im Feld „Von IP-Adresse“ kannst du mehrere IP-Adressen angeben, indem du eine Liste von durch Kommas getrennten IP-Adressen eingibst.
Zum Beispiel: **`192.168.1.1,192.168.1.2,192.168.1.3`**.


### Portbereiche

Beim Erstellen neuer Firewall-Regeln kannst du einen Bereich von Ports angeben, die geöffnet werden sollen (z. B. **`8000:8010`**),
wodurch jeder Port von **`8000`** bis **`8010`** geöffnet wird.


### Erlauben / Verweigern Regeln

Hinweis: **`deny`** = verweigern, **`allow`** = erlauben.

Du kannst auswählen, ob der Traffic, der einer bestimmten Regel entspricht, erlaubt oder verweigert werden soll.
Durch das Erstellen einer **`deny`**-Regel verhinderst du, dass der Traffic den Dienst erreicht.

::: tip Hinweis
Damit **`deny`**-Regeln korrekt funktionieren, werden sie mit höherer Priorität als **`allow`**-Regeln hinzugefügt.
Jede neue **`deny`**-Regel für IPv4-Adressen wird oberhalb bestehender **`deny`**-Regeln hinzugefügt.
UFW unterstützt derzeit keine IPv6-Regeln mit der höchsten Priorität.
:::


## Standard-Firewall-Regeln

Im Rahmen des Bereitstellungsprozesses konfiguriert Zhylon automatisch drei Regeln:

- **SSH** - Erlaube den Traffic auf Port 22 von jeder IP-Adresse
- **HTTP** - Erlaube den Traffic auf Port 80 von jeder IP-Adresse
- **HTTPS** - Erlaube den Traffic auf Port 443 von jeder IP-Adresse

Es ist wichtig zu beachten, dass, obwohl eingehender Traffic auf Port 22 für SSH-Verbindungen erlaubt ist, SSH-Verbindungen,
die keinen SSH-Schlüssel verwenden, nicht akzeptiert werden.
Daher ist es nicht möglich, eine SSH-Verbindung zu deinem Server durch Brute-Force-Angriffe herzustellen.

**Du solltest die Regel, die den SSH-Traffic zu deinem Server erlaubt, niemals löschen; andernfalls kann Zhylon nicht auf deinen Server zugreifen oder ihn verwalten.**


### Gelöschte SSH-Firewall-Regel

Wenn du die Firewall-Regel (typischerweise Port 22) über die Zhylon-Oberfläche oder direkt auf dem Server gelöscht hast,
kann Zhylon nicht mehr mit dem Server verbinden und diese Regel nicht für dich wiederherstellen.

Um das zu beheben, musst du direkt über deinen Anbieter auf den Server zugreifen und den SSH-Port manuell wieder hinzufügen.
DigitalOcean ermöglicht es dir, über ihr Dashboard eine Remote-Verbindung herzustellen.

Zhylon verwendet **`ufw`** für die Firewall.
Sobald du mit dem Server verbunden bist, musst du Folgendes als **`root`**-Benutzer ausführen:

```bash
ufw allow 22
```


## Team-Berechtigungen

Du kannst einem Mitglied des Kreises die Berechtigung erteilen, das Netzwerk des Servers zu verwalten,
indem du die Berechtigung **`server:manage-network`** vergibst.
