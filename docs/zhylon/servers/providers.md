# Server Providers

Erfahre mehr über die von Zhylon unterstützten Serveranbieter.

## Unterstützte Serveranbieter

Zhylon kann Server auf den folgenden Cloud-Serveranbietern erstellen und verwalten:

- [Zenver](https://www.zenver.de/)
  - Zenver ist der interne Serveranbieter von Zhylon und bietet eine nahtlose Integration mit unserem Service.
- [DigitalOcean](https://www.digitalocean.com/)
- ~~[Vultr](https://www.vultr.com/)~~
- ~~[Akamai / Linode Cloud](https://www.linode.com/)~~
- ~~[Amazon AWS](https://aws.amazon.com/)~~
- [Hetzner Cloud](https://www.hetzner.com/cloud)
- [Bring Your Own Server](#bring-your-own-server)  

*Ein paar Anbieter sind noch nicht verfügbar, aber wir arbeiten daran, sie in Zukunft zu unterstützen.*

::: tip Hinweis
Wenn dein bevorzugter Serveranbieter nicht von Zhylon unterstützt wird, kannst du die Option "Custom VPS" nutzen, um deinen Server zu erstellen.
Custom VPS-Server erhalten alle Funktionen wie die von offiziell unterstützten Serveranbietern.
[Erfahre mehr](#bring-your-own-server).
:::


## Verknüpfung von Serveranbietern

Du kannst Serveranbieter über dein [Dashboard der Serveranbieter](https://zhylon.net/user-profile/server-providers) verknüpfen.
Es ist möglich, beliebig viele Konten unterstützter Anbieter zu verknüpfen, einschließlich mehrerer Konten für einen einzelnen Anbieter.


## DigitalOcean OAuth-Zugriff

Der einfachste Weg, Zhylon die Kommunikation mit deinem DigitalOcean-Konto zu ermöglichen, ist die Verwendung des Buttons "Login mit DigitalOcean".
Diese Option findest du auf der Seite der [Serveranbieter](https://zhylon.net/user-profile/server-providers) in deinem Zhylon-Konto.

Durch Klicken auf den Button "Login mit DigitalOcean" wirst du zur Autorisierungsseite von DigitalOcean weitergeleitet,
wo du die erforderlichen Berechtigungen, die von Zhylon angefordert werden, genehmigen musst.

Sobald du die Genehmigung erteilt hast, erstellt Zhylon ein OAuth-Zugangsberechtigung,
die den Zugriff auf die notwendigen Berechtigungen für die Bereitstellung und Verwaltung deiner Server in deinem Namen ermöglicht.


## Zugriff auf die DigitalOcean API

Neben der Gewährung des Zugriffs für Zhylon über OAuth kannst du auch ein persönliches
[Zugriffstoken](https://cloud.digitalocean.com/account/api/tokens) verwenden, um die Kommunikation zwischen Zhylon und deinem DigitalOcean-Konto zu ermöglichen.
Beim Erstellen eines neuen persönlichen Zugriffstokens für dein DigitalOcean-Konto musst du die zugehörigen Berechtigungen (Scopes) auswählen.
Du musst entweder Folgendes wählen:

1. **Vollzugriff:** Gewährt Zugriff auf alle Berechtigungen basierend auf den aktuellen Rollenberechtigungen des Kontos.
2. **Benutzerdefinierte Berechtigungen:** Gewährt detaillierte Berechtigungen für spezifische Bereiche.
Folgende Berechtigungen sind **erforderlich**, damit Zhylon einen Server erfolgreich bereitstellen kann:
    - **Droplet** - Erstellen / Lesen / Aktualisieren / Löschen
    - **Reservierte IP** - Erstellen / Lesen / Aktualisieren / Löschen
    - **SSH-Schlüssel** - Erstellen / Lesen / Aktualisieren / Löschen
    - **VPC-Schlüssel** - Erstellen / Lesen / Aktualisieren / Löschen


## Hetzner Cloud API-Zugriff

Hetzner API-Token sind projektspezifisch.
Wenn du Hetzner-Projekte verwendest, solltest du sicherstellen, dass Zhylon über ein API-Token für jedes Hetzner-Projekt verfügt.


## Bring Your Own Server

Neben der Unterstützung mehrerer erster Serveranbieter ermöglicht Zhylon auch die Nutzung deiner eigenen benutzerdefinierten Server.
Wähle dazu die Option **"Custom VPS"**, wenn du einen neuen Server erstellst.
Bei der Bereitstellung eines Custom VPS kann Zhylon nur einen bestehenden Server verwalten und nicht auf diesem benutzerdefinierten Anbieter neue Server erstellen.

Bitte überprüfe außerdem die folgenden Serveranforderungen:

- Der Server **muss** mit einer frischen Installation von Ubuntu `22.04` oder `24.04 x64` laufen.
- Der Server **muss** extern über das Internet erreichbar sein.
- Der Server **muss den** `Root-SSH-Zugriff` aktiviert haben.
- Die Serveranforderungen *sollten mindestens* Folgendes erfüllen: 1 CPU-Kern mit 1 GHz, 1 GB RAM und 10 GB Speicherplatz.
- Der Server **muss** `curl` installiert haben.
- Stelle sicher, dass keine Firewall oder Sicherheitsgruppe die Anfragen an den Server drosselt.
Eine Drosselung der SSH-Anfragen kann dazu führen, dass die Bereitstellung in der finalen Phase fehlschlägt.
- Einige Serveranbieter könnten den Inhalt von `/root/.ssh/authorized_keys` ändern.
Falls dies auf deinen Anbieter zutrifft, stelle sicher, dass sie den Zugriff von Zhylons öffentlichem Schlüssel auf den Server erlauben.
Du kannst diesen Schlüssel finden, indem du die folgende URL besuchst: [https://zhylon.net/servers/{serverID}/settings](https://zhylon.net/servers/{serverID}/settings).
- Wenn du den SSH-Zugriff nach IP-Adresse einschränkst, konsultiere die Dokumentation zu den [Zhylon-IP-Adressen](/general/#zhylon-ip-adressen).
- Wenn du dein internes Netzwerk durch Network Address Translation (NAT) schützt und öffentliche SSH-Ports auf andere interne SSH-Ports abbildest,
kannst du Zhylon darüber informieren, indem du das Kontrollkästchen **"Dieser Server befindet sich hinter einem NAT"** aktivierst.
Dadurch wird ein zusätzliches Eingabefeld **"NAT SSH-Port"** angezeigt, das du verwenden kannst, um Zhylon über den SSH-Port zu informieren, auf den der SSH-Verkehr abgebildet wird.
Zhylon wird diesen Port verwenden, um den Verkehr über `ufw` in den Server zuzulassen.
Wenn der interne SSH-Port mit dem öffentlichen SSH-Port übereinstimmt, **kannst** du das Feld für den **NAT SSH-Port** leer lassen.


