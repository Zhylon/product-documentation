# Daemons

Lerne, wie du Hintergrundprozesse auf deinem Zhylon-Server konfigurieren und verwalten kannst.


## Übersicht

Daemons, unterstützt von **[Supervisor](http://supervisord.org/)**, dienen dazu, lang laufende Skripte am Leben zu halten.
Zum Beispiel könntest du einen Daemon starten, um eine **[ReactPHP](http://reactphp.org/)**-Anwendung am Laufen zu halten.
Wenn der Prozess stoppt, wird Supervisor den Prozess automatisch neu starten.


## Konfiguration von Daemons

Beim Erstellen eines neuen Daemons musst du Zhylon die folgenden Informationen bereitstellen:

- **Befehl:** Der Befehl, der vom Daemon ausgeführt werden soll. Zum Beispiel: **`php artisan websockets:serve`**.

- **Benutzer:** Der Betriebssystembenutzer, der verwendet werden soll, um den Befehl auszuführen. Standardmäßig wird der Benutzer **`zhylon`** verwendet.

- **Verzeichnis:** Das Verzeichnis, aus dem der Befehl ausgeführt werden soll. Dieses Feld kann leer gelassen werden.

- **Prozesse:** Diese Option bestimmt, wie viele Instanzen des Prozesses gleichzeitig laufen sollen.

- **Start-Sekunden:** Die Gesamtzahl an Sekunden, die das Programm laufen muss, um den Start als erfolgreich zu betrachten.

- **Stop-Sekunden:** Die Anzahl der Sekunden, die Supervisor dem Daemon gewährt, um ihn sanft zu stoppen, bevor eine erzwungene Beendigung erfolgt.

- **Stop-Signal:** Das Signal, das verwendet wird, um das Programm zu beenden, wenn ein Stop angefordert wird.


### Manuelles Neustarten von Daemons

Du kannst einen Daemon manuell neu starten, indem du den Befehl
**`sudo -S supervisorctl restart daemon-{id}:*`** verwendest, wobei **`{id}`** die ID des Daemons ist.
Wenn die ID des Daemons beispielsweise **`h:H3hxDfKZE0mHsxTqwN`** ist, kannst du ihn mit folgendem Befehl neu starten:
**`sudo -S supervisorctl restart daemon-h:H3hxDfKZE0mHsxTqwN:*`**.

Du kannst diesen Befehl auch innerhalb des Deployment-Skripts deiner Anwendung ausführen, um den Daemon während eines Deployments neu zu starten.


## Logdateien

Zhylon konfiguriert deinen Daemon automatisch so, dass er in eine eigene Logdatei schreibt.
Die Logdateien findest du im Verzeichnis **`/home/zhylon/.zhylon/`**.
Die Logdateien sind nach dem Muster `daemon-*.log` benannt.

Wenn du die Benutzerisolationsfunktionen von Zhylon verwendest, solltest du zum
**`.zhylon`**-Verzeichnis innerhalb des Verzeichnisses `/home/{username}` navigieren, je nachdem, welchem Benutzer der Prozess gehört,
um die Logdateien des Daemons zu finden.


## Team-Berechtigungen**

Du kannst einem Mitglied des Teams die Berechtigung erteilen, Daemons zu erstellen und zu verwalten, indem du die Berechtigungen
**`server:create-daemons`** und **`server:delete-daemons`** vergibst.
