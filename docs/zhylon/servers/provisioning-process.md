# Root-Zugriff / Sicherheit

Erfahre mehr über die Sicherheitsmaßnahmen, die **Zhylon** ergreift, um deinen Server zu schützen.

## Bereitstellungsprozess

Während der ersten Bereitstellung deines Servers verbindet sich **Zhylon** über SSH als Root-Benutzer.
Dies ermöglicht es **Zhylon**, Repositories hinzuzufügen, Abhängigkeiten zu installieren und neue Dienste, Firewalls und mehr zu konfigurieren.

Der Bereitstellungsprozess kann mehr als 15 Minuten in Anspruch nehmen, abhängig von verschiedenen Faktoren wie der Geschwindigkeit deines Servers,
der Geschwindigkeit deiner Netzwerkverbindung und der Anzahl der zu installierenden Dienste.


### Nach der Bereitstellung

Nach der anfänglichen Bereitstellung deines Servers nutzt **Zhylon** weiterhin den Root-Zugriff, um die Software, Dienste und Konfiguration deines Servers zu verwalten.
Beispielsweise wird Root-Zugriff benötigt, um Folgendes zu verwalten:

- Firewalls
- Daemons
- Geplante Aufgaben
- Isolierte Benutzer
- PHP-Konfiguration und -Verwaltung
- Weitere Abhängigkeiten des Betriebssystems


## Sicherheit

Wir nehmen Sicherheit sehr ernst und tun alles, um die Daten unserer Kunden zu schützen.
Im Folgenden findest du einen kurzen Überblick über einige der Schritte, die wir unternehmen, um die Sicherheit deines Servers zu gewährleisten:

- **Zhylon** gibt für jeden Server, mit dem es sich verbindet, einen einzigartigen SSH-Schlüssel aus.
- Passwortbasierte SSH-Verbindungen zum Server werden während der Bereitstellung deaktiviert.
- Jeder Server erhält ein einzigartiges Root-Passwort.
- Alle Ports sind standardmäßig mit UFW, einer sicheren Firewall für Ubuntu, blockiert. Anschließend öffnen wir ausdrücklich die Ports: 22 (SSH), 80 (HTTP) und 443 (HTTPS).
- Automatisierte Sicherheitsupdates werden mithilfe des automatisierten Sicherheitsfreigabeprogramms von Ubuntu installiert.


### Automatisierte Sicherheitsupdates

Sicherheitsupdates werden wöchentlich automatisch auf deinem Server angewendet.
**Zhylon** erreicht dies, indem es den automatischen Sicherheitsupdate-Dienst von Ubuntu aktiviert und konfiguriert, der im Betriebssystem integriert ist.

**Zhylon** aktualisiert jedoch keine andere Software wie PHP oder MySQL automatisch, da dies dazu führen könnte, dass dein Server Ausfallzeiten erleidet,
wenn der Code deiner Anwendung nicht mit dem Upgrade kompatibel ist.
Es ist jedoch möglich, [neue Versionen zu installieren](./php#mehrere-php-versionen) und vorhandene Versionen von PHP manuell
über die **Zhylon**-Benutzeroberfläche zu [patchen](./php#aktualisierung-von-php-zwischen-patch-versionen).
