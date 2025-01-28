# Einführung

Zhylon ist ein umfassender Service für die Serververwaltung und das Deployment von Anwendungen.

## Was ist Zhylon?

Zhylon ist ein umfassender Service für die Serververwaltung und das Deployment von Anwendungen.
Er erleichtert das Bereitstellen von Servern und ermöglicht es dir, deine nächste Website im Handumdrehen zu starten. 
Egal, ob deine Anwendung mit Frameworks wie 
[Laravel](https://github.com/laravel/laravel),
[Symfony](https://github.com/symfony/symfony),
[Statamic](https://github.com/statamic/cms),
[WordPress](https://github.com/WordPress/WordPress)
oder als einfache PHP-Anwendung entwickelt wurde – Zhylon ist die ideale Lösung für dich.

Bei Zhylon leben und atmen wir PHP, doch wir sind auch bereit, andere Technologie-Stacks wie Node.js zu unterstützen.

Nachdem du dich mit deinem bevorzugten [Serveranbieter](/servers/providers) verbunden hast, kann Zhylon innerhalb weniger Minuten neue Server für dich bereitstellen.
Wir bieten die Möglichkeit, verschiedene [Servertypen](/servers/types) zu provisionieren (z. B. Webserver, Datenbankserver, Lastenausgleicher) und eine Vielzahl von Diensten zu konfigurieren, damit du sofort durchstarten kannst, darunter:

- Nginx-Webserver
- [PHP](/servers/php) (Unterstützung mehrerer Versionen)
- [Datenbank](/resources/database) (MySQL, Postgres oder MariaDB)
- Logrotate
- [UFW-Firewall](/resources/network#firewalls)
- [OPcache](/servers/php#opcache)
- [Memcached](/resources/caches)
- [Redis](/resources/caches)
- [Automatische Sicherheitsupdates](servers/provisioning-process#automated-security-updates)
- Und vieles mehr!

Darüber hinaus unterstützt Zhylon dich bei der Verwaltung von 
[geplanten Aufgaben](/resources/scheduler),
[Queue-Workern](/sites/queues),
[TLS/SSL-Zertifikaten](/sites/ssl) und weiteren Funktionen.
Nach der Provisionierung deines Servers kannst du deine Webanwendungen bequem über das Zhylon-Dashboard verwalten und deployen.


## Zhylon IP-Adressen

Um deine Server bereitzustellen und mit ihnen zu kommunizieren, benötigt Zhylon SSH-Zugriff.
Wenn du deine Server so konfiguriert hast, dass der SSH-Zugriff durch IP-Whitelist-Einstellungen eingeschränkt wird, musst du die folgenden Zhylon IP-Adressen zulassen:

- `127.0.0.1`
- `192.168.0.1`

Du kannst die IP-Adressen auch über die folgende URL abrufen: [https://zhylon.net/ips-v4.txt](https://zhylon.net/ips-v4.txt).
Dies ist besonders nützlich, wenn du deine Netzwerk- oder Firewall-Infrastruktur automatisieren möchtest.

Wenn du den HTTP-Verkehr einschränkst, muss dein Server auch eingehenden und ausgehenden Verkehr von `zhylon.net` zulassen.

::: tip Hinweis
Die IP-Adressen von Zhylon können sich gelegentlich ändern; wir werden dich jedoch immer mehrere Wochen im Voraus per E-Mail über eine IP-Änderung informieren.
:::


## Zhylon API

Zhylon bietet eine leistungsstarke API, mit der du deine Server programmatisch verwalten kannst und Zugriff auf die meisten Funktionen von Zhylon erhältst.
Die Dokumentation zur Zhylon API findest du [hier](/api).


## Rechtliche Hinweise und Compliance

Unsere [Nutzungsbedingungen](https://zhylon.net/terms-of-service),
[Datenschutzrichtlinien](https://zhylon.net/privacy-policy) und
[Vereinbarung zur Datenverarbeitung (DPA)](https://zhylon.net/data-processing-agreement)
enthalten Informationen zu den Bedingungen, Bestimmungen und Datenschutzpraktiken für die Nutzung von Zhylon.
