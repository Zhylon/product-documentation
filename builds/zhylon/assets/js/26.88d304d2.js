(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{301:function(e,n,t){"use strict";t.r(n);var s=t(14),r=Object(s.a)({},(function(){var e=this,n=e._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"daemons"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#daemons"}},[e._v("#")]),e._v(" Daemons")]),e._v(" "),n("p",[e._v("Lerne, wie du Hintergrundprozesse auf deinem Zhylon-Server konfigurieren und verwalten kannst.")]),e._v(" "),n("h2",{attrs:{id:"ubersicht"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ubersicht"}},[e._v("#")]),e._v(" Übersicht")]),e._v(" "),n("p",[e._v("Daemons, unterstützt von "),n("strong",[n("a",{attrs:{href:"http://supervisord.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Supervisor"),n("OutboundLink")],1)]),e._v(", dienen dazu, lang laufende Skripte am Leben zu halten.\nZum Beispiel könntest du einen Daemon starten, um eine "),n("strong",[n("a",{attrs:{href:"http://reactphp.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("ReactPHP"),n("OutboundLink")],1)]),e._v("-Anwendung am Laufen zu halten.\nWenn der Prozess stoppt, wird Supervisor den Prozess automatisch neu starten.")]),e._v(" "),n("h2",{attrs:{id:"konfiguration-von-daemons"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#konfiguration-von-daemons"}},[e._v("#")]),e._v(" Konfiguration von Daemons")]),e._v(" "),n("p",[e._v("Beim Erstellen eines neuen Daemons musst du Zhylon die folgenden Informationen bereitstellen:")]),e._v(" "),n("ul",[n("li",[n("p",[n("strong",[e._v("Befehl:")]),e._v(" Der Befehl, der vom Daemon ausgeführt werden soll. Zum Beispiel: "),n("strong",[n("code",[e._v("php artisan websockets:serve")])]),e._v(".")])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Benutzer:")]),e._v(" Der Betriebssystembenutzer, der verwendet werden soll, um den Befehl auszuführen. Standardmäßig wird der Benutzer "),n("strong",[n("code",[e._v("zhylon")])]),e._v(" verwendet.")])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Verzeichnis:")]),e._v(" Das Verzeichnis, aus dem der Befehl ausgeführt werden soll. Dieses Feld kann leer gelassen werden.")])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Prozesse:")]),e._v(" Diese Option bestimmt, wie viele Instanzen des Prozesses gleichzeitig laufen sollen.")])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Start-Sekunden:")]),e._v(" Die Gesamtzahl an Sekunden, die das Programm laufen muss, um den Start als erfolgreich zu betrachten.")])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Stop-Sekunden:")]),e._v(" Die Anzahl der Sekunden, die Supervisor dem Daemon gewährt, um ihn sanft zu stoppen, bevor eine erzwungene Beendigung erfolgt.")])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Stop-Signal:")]),e._v(" Das Signal, das verwendet wird, um das Programm zu beenden, wenn ein Stop angefordert wird.")])])]),e._v(" "),n("h3",{attrs:{id:"manuelles-neustarten-von-daemons"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#manuelles-neustarten-von-daemons"}},[e._v("#")]),e._v(" Manuelles Neustarten von Daemons")]),e._v(" "),n("p",[e._v("Du kannst einen Daemon manuell neu starten, indem du den Befehl\n"),n("strong",[n("code",[e._v("sudo -S supervisorctl restart daemon-{id}:*")])]),e._v(" verwendest, wobei "),n("strong",[n("code",[e._v("{id}")])]),e._v(" die ID des Daemons ist.\nWenn die ID des Daemons beispielsweise "),n("strong",[n("code",[e._v("h:H3hxDfKZE0mHsxTqwN")])]),e._v(" ist, kannst du ihn mit folgendem Befehl neu starten:\n"),n("strong",[n("code",[e._v("sudo -S supervisorctl restart daemon-h:H3hxDfKZE0mHsxTqwN:*")])]),e._v(".")]),e._v(" "),n("p",[e._v("Du kannst diesen Befehl auch innerhalb des Deployment-Skripts deiner Anwendung ausführen, um den Daemon während eines Deployments neu zu starten.")]),e._v(" "),n("h2",{attrs:{id:"logdateien"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#logdateien"}},[e._v("#")]),e._v(" Logdateien")]),e._v(" "),n("p",[e._v("Zhylon konfiguriert deinen Daemon automatisch so, dass er in eine eigene Logdatei schreibt.\nDie Logdateien findest du im Verzeichnis "),n("strong",[n("code",[e._v("/home/zhylon/.zhylon/")])]),e._v(".\nDie Logdateien sind nach dem Muster "),n("code",[e._v("daemon-*.log")]),e._v(" benannt.")]),e._v(" "),n("p",[e._v("Wenn du die Benutzerisolationsfunktionen von Zhylon verwendest, solltest du zum\n"),n("strong",[n("code",[e._v(".zhylon")])]),e._v("-Verzeichnis innerhalb des Verzeichnisses "),n("code",[e._v("/home/{username}")]),e._v(" navigieren, je nachdem, welchem Benutzer der Prozess gehört,\num die Logdateien des Daemons zu finden.")]),e._v(" "),n("h2",{attrs:{id:"team-berechtigungen"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#team-berechtigungen"}},[e._v("#")]),e._v(" Team-Berechtigungen**")]),e._v(" "),n("p",[e._v("Du kannst einem Mitglied des Teams die Berechtigung erteilen, Daemons zu erstellen und zu verwalten, indem du die Berechtigungen\n"),n("strong",[n("code",[e._v("server:create-daemons")])]),e._v(" und "),n("strong",[n("code",[e._v("server:delete-daemons")])]),e._v(" vergibst.")])])}),[],!1,null,null,null);n.default=r.exports}}]);