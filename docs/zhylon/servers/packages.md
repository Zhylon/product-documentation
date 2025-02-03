# Composer Packages

Verwaltung von Composer-Zugangsdaten auf deinem Server


## Übersicht

Zhylon ermöglicht es dir, den Abschnitt „http-basic“ der Datei `auth.json` in der Composer-Konfiguration des ausgewählten Serverbenutzers zu verwalten.
Die angegebenen Zugangsdaten werden nur auf dem von Zhylon verwalteten Server gespeichert – nicht in Zhylon selbst.


## Globale Composer-Zugangsdaten

Die auf Server-Ebene verwalteten Composer-Zugangsdaten gelten für alle Websites, die vom gleichen Ubuntu-Benutzerkonto betrieben werden.
Wenn du beispielsweise zwei Websites unter dem Benutzer `zhylon` installiert hast, profitieren beide Websites von den global gespeicherten Zugangsdaten.

Wenn du eine detailliertere Kontrolle über die Zugangsdaten benötigst, solltest du die [**Packages-Dokumentation**](../sites/packages) für einzelne Websites prüfen.


## Benutzerauswahl

Falls du Websites mit Benutzerisolierung konfiguriert hast, musst du zuerst den entsprechenden Server-Benutzer auswählen.
Die Datei `auth.json` ist innerhalb jedes einzelnen Server-Benutzerkontos global.


## Verwaltung von Zugangsdaten

Zhylon macht es einfach, Composer-Zugangsdaten für alle Websites auf deinem Server zu verwalten.
Du kannst Zugangsdaten direkt über die Zhylon-Oberfläche hinzufügen, entfernen und aktualisieren.


### Zugangsdaten hinzufügen

Zusätzliche Zugangsdaten können durch Klicken auf die Schaltfläche **„Zugangsdaten hinzufügen“** hinzugefügt werden.
Dafür musst du folgende Informationen angeben:

- **Repository-URL** – Dies dient dazu, dass Composer die Zugangsdaten mit dem jeweiligen Paket verknüpfen kann, für das sich der Anbieter authentifizieren möchte.
- **Benutzername** – Oft eine E-Mail-Adresse, kann aber auch eine andere eindeutige Kennung sein, die vom Paket-Anbieter verwendet wird.
- **Passwort** – In der Regel das Passwort für den Benutzernamen, kann aber in einigen Fällen auch ein Lizenzschlüssel sein.

Nach dem Eintragen dieser Daten klickst du auf **„Speichern“**, um die Zugangsdaten in der globalen Composer-Konfigurationsdatei des Benutzers
(`~/.config/composer/auth.json`) zu speichern.


### Zugangsdaten entfernen

Um bestehende Composer-Zugangsdaten zu entfernen, kannst du auf das rote **„X“**-Symbol klicken.

Nachdem du Zugangsdaten entfernt hast, musst du auf **„Speichern“** klicken, um die Konfigurationsänderungen auf dem Server zu übernehmen.


### Zugangsdaten aktualisieren

Alle angezeigten Zugangsdaten können mit neuen, passenden Werten aktualisiert werden.

Nachdem du eine Zugangsdatenänderung vorgenommen hast, musst du auf **„Speichern“** klicken, um die neue Konfiguration auf dem Server zu übernehmen.


## Team-Berechtigungen

Die Berechtigung zur Verwaltung der Composer-Pakete eines Servers wird durch die **`server:manage-packages`**-Berechtigung gesteuert.
Diese Berechtigung ermöglicht es einem Team-Mitglied auch, die Composer-Pakete einer bestimmten Seite zu verwalten.

