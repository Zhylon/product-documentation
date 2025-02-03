# Load Balancing

Erfahre, wie du Load Balancer verwendest, um den Traffic auf mehrere Server zu verteilen.


## Übersicht

Load Balancer werden eingesetzt, um den Web-Traffic auf zwei oder mehr Server zu verteilen.
Sie werden häufig für Webseiten mit hohem Traffic-Aufkommen verwendet.

Die wichtigsten Unterschiede zwischen einem **Zhylon**-Anwendungsserver und einem Load Balancer sind:

- Es wird **kein** Datenbankserver installiert
- PHP ist **nicht** installiert
- Node.js ist **nicht** installiert  


## Erstellen von Load Balancer

Beim Bereitstellen eines neuen Servers kannst du den **Load Balancer-Typ** auswählen.
Sobald die Bereitstellung abgeschlossen ist, kannst du eine **load-balancierte Website** erstellen.
Der **Name/Domäne** der Website sollte mit dem Namen der entsprechenden Website auf den Servern übereinstimmen, die den Traffic empfangen sollen.

Nachdem du die Website zu deinem Server hinzugefügt hast, wird **Zhylon** dich bitten, die Server auszuwählen, auf die der Traffic verteilt werden soll.
Die Liste der Server umfasst alle Server im selben **privaten Netzwerk** wie der Load Balancer.


### Load-Balancer-Methoden

**Zhylon** ermöglicht dir die Auswahl einer von drei Load-Balancer-Methoden:

1. **Round Robin** – Die **Standardmethode**, bei der Anfragen gleichmäßig auf alle Server verteilt werden.
2. **Least Connections** – Anfragen werden an den Server mit den **wenigsten aktiven Verbindungen** gesendet.
3. **IP Hash** – Die Weiterleitung erfolgt anhand der **IP-Adresse des Clients**, sodass Anfragen von derselben Adresse immer an denselben Server gesendet werden (sofern dieser verfügbar ist).

Die Load-Balancer-Methode kann jederzeit geändert werden.

::: tip Hinweis
Weitere Informationen zur Funktionsweise von **Nginx Load Balancern** findest du in der [**Nginx-Dokumentation**](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/#method).
:::


### Server-Gewichtung
  
Jeder Server innerhalb des Load-Balancers kann mit einer **individuellen Gewichtung** konfiguriert werden.
Dadurch lässt sich steuern, dass bestimmte Server **mehr Traffic** verarbeiten als andere.

**Beispiel:**
- **Server A** mit **Gewichtung 5**
- **Server B** mit **Gewichtung 1**  

Ergebnis: **Server A erhält 5 von 6 Anfragen**, während **Server B nur 1 von 6 Anfragen** verarbeitet.


### Backup-Server  

Server können als **Backup** markiert werden.
Diese erhalten **keinen Traffic**, es sei denn, **alle anderen Server** innerhalb des Load-Balancers **fallen aus**.


### Traffic-Pausierung

Du kannst den **Traffic zu einem bestimmten Server pausieren**.
Während dieser Zeit verarbeitet der Server **keine eingehenden Anfragen**.
Die Traffic-Pausierung kann jederzeit aufgehoben werden.


## SSL-Zertifikate & Load Balancer

Typischerweise werden SSL-Zertifikate auf den einzelnen Anwendungsservern installiert.  
Bei der Nutzung eines Load Balancers sollte das Zertifikat jedoch direkt auf dem Load Balancer selbst konfiguriert werden.

Weitere Informationen zur Verwaltung von SSL-Zertifikaten, einschließlich der Konfiguration für Load Balancer, findest du in der
[**SSL-Dokumentation**](/sites/ssl#ssl).


Wenn du SSL auf einem Load Balancer verwendest, musst du wahrscheinlich die **„trusted proxies“** für deine Anwendung konfigurieren.

Für Laravel-Anwendungen findest du weitere Informationen dazu in der
[**Dokumentation zu den vertrauenswürdigen Proxys**](https://laravel.com/docs/requests#configuring-trusted-proxies).
Diese Konfiguration stellt sicher, dass deine Anwendung die richtigen Informationen über die Ursprungs-IP der Anfragen erhält,
insbesondere wenn der Load Balancer als Proxy fungiert.
