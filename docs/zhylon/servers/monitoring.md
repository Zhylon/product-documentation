# Monitoring

Erfahre, wie du die Server-Überwachung in Zhylon einrichtest.

Dies betrifft nur die reine Überwachung von Servern.
Für die Überwachung von Websites und Projekten siehe [Monitoring für Seiten (aka Sitealarm.de)](../sites/monitoring).

### Übersicht

Zhylon kann so konfiguriert werden, dass es die folgenden Metriken deines Servers überwacht und dich per E-Mail benachrichtigt, wenn sich deren Status ändert:

- Durchschnittliche CPU-Auslastung
- Belegter Speicherplatz
- Belegter Arbeitsspeicher


## Überwachungsarten

### Durchschnittliche CPU-Auslastung

Dieser Monitor verfolgt die durchschnittliche Systemlast des Servers über ein **einminütiges Intervall**.


### Belegter Speicherplatz

Überwacht die **genutzte Speicherkapazität** der primären Festplatte.


### Belegter Arbeitsspeicher

Misst, wie viel **RAM aktiv genutzt** wird.


## Erstellen von Überwachungen

Du kannst eine neue Überwachung im **Monitoring-Tab** innerhalb des Server-Dashboards einrichten.
So richtest du eine Überwachung ein:

1. **Metrik auswählen**, die überwacht werden soll.
2. Festlegen, ob der Wert der Metrik `>=` **(größer/gleich)** oder `<=` **(kleiner/gleich)** einem Grenzwert sein soll.
3. **Schwellwert** (in Prozent) eingeben, ab wann eine Benachrichtigung erfolgen soll.
4. **Dauer (in Minuten)** festlegen, wie lange der Wert den Schwellwert überschreiten muss, bevor eine Benachrichtigung ausgelöst wird.
5. **E-Mail-Adresse** angeben, an die Benachrichtigungen gesendet werden sollen.
6. Auf **"Monitor installieren"** klicken.

Sobald der Monitor aktiv ist, sammelt der Server **Metrikdaten** und sendet eine Benachrichtigung, wenn sich der Zustand ändert.

::: tip Hinweis ⚠
 Zhylon erlaubt nur **eine E-Mail-Adresse** für Benachrichtigungen.
Falls mehrere Personen informiert werden sollen, empfiehlt es sich, eine **E-Mail-Verteilerliste** (z. B. team@beispiel.de) zu verwenden.
:::


### Erfassungsfrequenzen der Metriken

- CPU-Auslastung & Genutzter Arbeitsspeicher: Daten werden **jede Minute** erfasst.
- Festplattenspeicher: Daten werden **stündlich** erfasst.

## Berechtigungen für Teams

Die Verwaltung von Server-Monitoren ist in zwei Berechtigungen unterteilt:

- `server:create-monitors` → Erlaubt das Erstellen neuer Überwachungen.
- `server:delete-monitors` → Erlaubt das Löschen bestehender Überwachungen.