# Backups

Auf dieser Seite findest du Informationen zu den verschiedenen Backup-Optionen, die Zhylon anbietet.
Es gibt zwei Arten von Backups, die du in Zhylon verwenden kannst:

- [Datenbank-Backups](#datenbank-backups) - Sicherung von MySQL- oder Postgres-Datenbanken
- [App-Backups](#app-backups) - Sicherung von Dateien und Ordnern deiner Anwendung


## Datenbank-Backups

Erfahre, wie du automatische Datenbank-Backups einrichtest und verwaltest.


### Übersicht

Zhylon unterstützt **automatisierte Datenbank-Backups**, die direkt über das Server-Dashboard geplant werden können.
Du kannst eine oder mehrere Datenbanken in einem festgelegten Intervall sichern und bei Bedarf auf frühere Backups zurückgreifen.

Das für die Backups verwendete Skript ist **Open Source** und auf [GitHub](https://github.com/zhylon/zhylon-database-backups) verfügbar.


## App-Backups

Erfahre, wie du automatische App-Backups einrichtest und verwaltest.


### Übersicht

Ein App-Backup ist eine Sicherung deiner Anwendung, die alle Dateien und Ordner enthält, die für den Betrieb deiner Anwendung erforderlich sind.
Zhylon bietet die Möglichkeit, automatische App-Backups zu erstellen und zu verwalten, die regelmäßig auf deinem Server ausgeführt werden.

Du kannst für jede Seite deines Servers ein eigenes Backup-Intervall festlegen und die Anzahl der aufbewahrten Backups konfigurieren.
Außerdem kannst du einzelne Verzeichnisse oder Dateien von der Sicherung ausschließen oder spezielle Dateien hinzufügen, die nicht standardmäßig gesichert werden.

Standardmäßig werden folgende Verzeichnisse und Dateien in einem App-Backup gesichert:

- `release` - Verzeichnis mit den veröffentlichten Versionen deiner Anwendung
- `storage` - Speicherordner für temporäre Dateien
- `.env` - Konfigurationsdatei für deine Anwendung
- `.zhylon` - Konfigurationsverzeichnis für Zhylon


## Erstellen einer Backup-Konfiguration

### Speicheranbieter

Du kannst deine Datenbank-Backups bei folgenden Anbietern speichern:

- [**Zenver Storagebox**](https://storagebox.zhylon.net/) (Standard)
- [**Amazon S3**](https://aws.amazon.com/s3/)
- [**DigitalOcean Spaces**](https://www.digitalocean.com/products/spaces/)
- [**Scaleway**](https://www.scaleway.com/en/object-storage/)
- [**OVH Cloud**](https://www.ovhcloud.com/en/public-cloud/object-storage/)
- [**Backblaze B2**](https://www.backblaze.com/cloud-storage)
- Benutzerdefiniert (S3-kompatibel)

::: tip Hinweis
Wir empfehlen die Verwendung von **Zenver Storagebox** für die Speicherung deiner Datenbank-Backups, da es sich um einen speziell für Zhylon entwickelten Dienst handelt.
Dieser kann direkt eingebunden werden und benötigt keine zusätzlichen Konfigurationen.
**Zenver Storagebox** ist verfügbar, wenn du `Zenver` auch als [Serveranbieter](./providers#unterstutzte-serveranbieter) verwendest.
:::

Für Amazon S3, DigitalOcean Spaces, Scaleway und OVH Cloud musst du Zhylon folgende Informationen bereitstellen:

- **Region**, in der das Backup gespeichert werden soll (z. B. `eu-west-2`, `nyc3`)
- Den Namen deines Speicher `"Buckets"`
- **Zugangsdaten**: Access Key und Secret Key für die Verbindung mit dem Speicherdienst


Wenn dein Server auf **Amazon EC2** läuft, kannst du alternativ die **EC2-Identität** nutzen, um das Backup direkt zu S3 zu streamen, ohne Zugangsdaten anzugeben.
Dazu musst du lediglich die Option **„Use EC2 Assumed Role“** aktivieren.

::: warning Achtung
Wenn du **Amazon S3** zur Speicherung deiner Datenbank-Backups verwendest, muss dein **AWS IAM-Benutzer** über folgende Berechtigungen für S3 verfügen:

- `s3:PutObject` – Hochladen von Objekten
- `s3:GetObject` – Herunterladen von Objekten
- `s3:ListBucket` – Auflisten der Inhalte im Bucket
- `s3:DeleteObject` – Löschen von Objekten
:::


Wenn du einen **benutzerdefinierten, S3-kompatiblen Anbieter** nutzt, musst du folgende Angaben machen:

- Service-Endpunkt / URL
- Den Namen deines Speicher `"Buckets"`
- Zugriffs- und Geheimschlüssel, die für die Verbindung zum Speicherdienst benötigt werden

Zusätzlich kannst du ein **Speicherverzeichnis** angeben, in dem die Backups relativ zum Bucket-Root abgelegt werden.
Lässt du dieses Feld leer, werden die Backups direkt im Root-Verzeichnis des Buckets gespeichert.


::: tip Hinweis
Nicht alle Anbieter sind vollständig mit der Amazon S3 API kompatibel.
Einige Anbieter, wie **OVH** und **Scaleway**, erfordern eine spezielle Konfiguration, um korrekt zu funktionieren.
Dies geschieht in der Regel durch die Verwendung des `awscli-plugin-endpoint`.
:::


### Häufigkeitsoptionen

Im **Zhylon**-Dashboard für Datenbank-Backups kannst du festlegen, wie oft deine Datenbank gesichert werden soll:

- **Stündlich**
- **Täglich** (zu einer bestimmten Uhrzeit)
- **Wöchentlich** (an einem bestimmten Tag und einer bestimmten Uhrzeit)
- **Benutzerdefiniert**

Wenn du über die API ein **tägliches** oder **wöchentliches** Backup erstellst, kannst du eine beliebige Uhrzeit angeben (z. B. `13:37`).
In der **Zhylon**-Oberfläche kannst du jedoch nur Zeiten in **30-Minuten-Schritten** auswählen.
Die angegebene Uhrzeit entspricht der **lokalen Zeit** deines Webbrowsers.

Mit der Option **Benutzerdefiniert** kannst du einen **eigenen Cron-Ausdruck** definieren.
Falls du Unterstützung benötigst, kannst du einen Dienst wie [**crontab.guru**](https://crontab.guru/) verwenden, um eine passende Cron-Syntax zu generieren.


### Aufbewahrung von Backups

**Zhylon** löscht alte Backups automatisch gemäß deiner eingestellten Aufbewahrungsrate.
Wenn du beispielsweise eine **Aufbewahrungsrate von „fünf“** konfiguriert hast, werden nur die **fünf neuesten Backups** bei deinem Speicheranbieter gespeichert.
Ältere Backups werden automatisch entfernt.


### Benachrichtigungen bei fehlgeschlagenen Backups

Du kannst eine **E-Mail-Adresse** angeben, um **Benachrichtigungen über fehlgeschlagene Backups** zu erhalten.
Falls mehrere Personen informiert werden sollen, empfiehlt es sich, eine **Verteilerliste** wie z. B. **team@example.com** zu verwenden.

Zusätzlich zeigt **Zhylon** fehlgeschlagene Backups im **Backup-Panel** des Server-Management-Dashboards an.




## Verwaltung von Backups

### Backup-Konfigurationen bearbeiten

Bestehende Backup-Konfigurationen können über die **Zhylon UI** bearbeitet werden.
**Standardmäßig sind die Einstellungen gesperrt**, um **versehentliche Änderungen** zu vermeiden.
Durch einen Klick auf **„Bearbeiten“** kannst du die Bearbeitung freischalten.

Wenn du die **Datenbanken änderst, die gesichert werden sollen**, fordert **Zhylon** eine **Bestätigung**, um sicherzustellen, dass die Änderung beabsichtigt war. Dies verhindert **Datenverluste**, falls eine Datenbank versehentlich aus der Backup-Konfiguration entfernt wird.


### Löschen von Backup-Konfigurationen

Du kannst eine Backup-Konfiguration löschen, indem du im **Backup-Dashboard** des Servers unter dem Abschnitt **„Backup-Konfigurationen“** auf den **„Löschen“**-Button neben der gewünschten Konfiguration klickst.

::: warning Achtung ⚠
Beim Löschen einer Backup-Konfiguration werden die **bereits erstellten Backups nicht aus dem Cloud-Speicher entfernt**.
Falls du sie löschen möchtest, musst du dies **manuell** tun.
:::


### Wiederherstellen von Backups

Du kannst Backups in deine Datenbank über den Abschnitt **„Letzte Backups“** wiederherstellen.
Klicke einfach auf den **„Wiederherstellen“**-Button neben dem gewünschten Backup.
Die Backups werden in die Datenbank wiederhergestellt, aus der sie erstellt wurden.
Wenn die Backup-Konfiguration mehr als eine Datenbank enthält, wirst du aufgefordert, auszuwählen, welche Datenbank wiederhergestellt werden soll.

Falls du ein Backup auf einen anderen Server oder in eine andere Datenbank wiederherstellen musst,
kannst du das Backup-Archiv von deinem Cloud-Speicheranbieter herunterladen und mit einem Datenbankverwaltungstool wie [**DataGrip**](https://www.jetbrains.com/datagrip/) wiederherstellen.


### Löschen von Backups

Wenn du ein einzelnes Backup löschen möchtest, kannst du dies tun, indem du auf den **„Löschen“**-Button neben dem Backup klickst.

Beim Löschen eines Backups werden deine Backup-Archive von deinem Cloud-Speicheranbieter entfernt.
Bitte sei vorsichtig, wenn du Backups löschst.


### Backup-Ausgabe

Jeder Backup-Prozess erstellt ein eigenes Protokoll, damit du den Ablauf des Datenbank-Backup-Prozesses im Falle eines Fehlers überprüfen kannst.
Du kannst die Ausgabe eines Backups anzeigen, indem du auf das **„Augen“-Symbol** neben deinem Backup klickst.


## Teams-Berechtigungen

Die Fähigkeit, Datenbank-Backups zu verwalten, ist in zwei Berechtigungen unterteilt:

- `server:create-backups`
- `server:delete-backups`
