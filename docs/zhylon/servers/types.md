# Server Types

Erfahre mehr über die verschiedenen Serverarten, die du mit Zhylon bereitstellen kannst.

## Einführung

Zhylon unterstützt die Bereitstellung mehrerer Arten von Servern:

- App-Servers
- Web-Servers
- Worker-Server
- Load-Balancer
- Datenbank-Servers
- Cache-Servers

Im Folgenden werden wir jede dieser Serverarten im Detail besprechen.


## Serverarten

Hier findest du eine Übersicht darüber, welche Funktionen die verschiedenen Servertypen bieten:

| Type                  | Nginx | PHP  | Databases *  | IMDb *  | Node.js  | MeiliSearch |
|-----------------------|:-----:|:----:|:------------:|:-------:|:--------:|:-----------:|
| App-Server            |   ✅   |  ✅   |      ✅       |    ✅    |    ✅     |             |
| Web-Server            |   ✅   |  ✅   |              |         |    ✅     |             |
| Database Server       |       |      |      ✅       |         |          |             |
| Cache-Server |       |      |              |         |    ✅     |             |
| Worker-Servers        |       |  ✅   |              |         |          |             |
| MeiliSearch Server        |       |     |              |         |          |      ✅       |
| Load-Balancer         |   ✅   |      |              |         |          |             |

* Verfügbare Datenbanken: MySQL, Postgres, MariaDB
* Verfügbare In-Memory-Databases (IMDb): Redis, Memcached


## Anwendungsserver

Anwendungsserver sind so konzipiert, dass sie alles enthalten, was du benötigst, um eine typische Laravel- oder PHP-Anwendung auf einem einzigen Server bereitzustellen.
Daher werden sie mit folgender Software ausgestattet:

- PHP
- Nginx
- MySQL / Postgres / MariaDB (je nach Auswahl)
- Redis
- Memcached
- Node.js
- Supervisor

Anwendungsserver sind die am häufigsten bereitgestellte Serverart bei Zhylon.
Wenn du dir unsicher bist, welcher Servertyp für dich geeignet ist, solltest du in der Regel einen Anwendungsserver bereitstellen.
Wenn deine Anwendung wächst, kannst du spezielle Server für Dienste wie Datenbanken oder Caching hinzufügen.

Für den Einstieg wird jedoch ein Anwendungsserver empfohlen.


## Webserver

Webserver enthalten die notwendige Software, um eine typische Laravel- oder PHP-Anwendung bereitzustellen, jedoch ohne Datenbank oder Cache.
Diese Server sind dafür ausgelegt, mit dedizierten Datenbank- und Cache-Servern [vernetzt zu werden](/resources/network).

Webserver werden mit der folgenden Software ausgestattet:

- PHP
- Nginx
- Node.js
- Supervisor


## Datenbankserver

Datenbankserver dienen als dedizierte MySQL-, Postgres- oder MariaDB-Server für deine Anwendung.
Sie sind dafür gedacht, von einem dedizierten Anwendungs- oder Webserver über Zhylons [Netzwerkmanagement-Funktionen](/resources/network) angesprochen zu werden.

Die bereitgestellte Software hängt von deiner Auswahl während der Servererstellung ab:

- MySQL
- MariaDB
- PostgreSQL  


## Cache-Server

Cache-Server dienen als dedizierte Redis- oder Memcached-Server für deine Anwendung.
Sie sollen von einem dedizierten Anwendungs- oder Webserver über Zhylons [Netzwerkmanagement-Funktionen](/resources/network) genutzt werden.

Bereitgestellte Software:

- Redis
- Memcached  


## Worker-Server

Worker-Server dienen als dedizierte PHP-Queue-Worker für deine Anwendung.
Sie sind dafür ausgelegt, mit deinen Webservern vernetzt zu werden, enthalten kein Nginx und sind nicht über HTTP erreichbar.

Bereitgestellte Software:

- PHP
- Supervisor  


## Meilisearch-Server

Meilisearch-Server installieren [Meilisearch](https://meilisearch.com/), um deiner Anwendung einen blitzschnellen Suchdienst anzubieten.
Sie sind dafür vorgesehen, mit einem anderen Server verbunden zu sein und über ein **[privates Netzwerk](/resources/network.html#servernetzwerk)** zu kommunizieren.

Ein Meilisearch-Server zeigt und verwaltet nur eine einzige **[Site](/sites/the-basics)**.
Du kannst auf diesem Server keine weiteren Sites erstellen oder löschen.
Wenn du von einem Web- oder Anwendungsserver eine Verbindung zum Meilisearch-Server herstellen möchtest, solltest du dies über seine private IP-Adresse tun.


## Load Balancer

Load Balancer dienen dazu, eingehenden Web-Traffic gleichmäßig auf deine Server zu verteilen.
Dazu verwenden sie Nginx als "Reverse Proxy".

Bereitgestellte Software:
- Nginx

Nach der Bereitstellung kannst du deinen Load Balancer [individuell konfigurieren](/servers/load-balancing), um deine Anforderungen zu erfüllen.
