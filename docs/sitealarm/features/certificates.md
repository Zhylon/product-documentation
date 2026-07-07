# SSL-Zertifikate

Für jeden Monitor, der über `https://` erreichbar ist, überwacht Sitealarm automatisch
das SSL-Zertifikat deiner Website. Du musst dafür nichts extra einrichten: Sobald du einen
HTTPS-Monitor anlegst, wird die Zertifikatsüberwachung direkt mit aktiviert.

SSL-Zertifikate sind ein **Pro-Feature** (ab Pro-Plan enthalten, auf dem Free-Plan nicht verfügbar).

Eine [Domain-Verifizierung](domain-verification.html) ist dafür **nicht** nötig – die Prüfung erfolgt über
einen einzelnen, öffentlich einsehbaren Verbindungsaufbau und läuft daher unabhängig vom
Verifizierungsstatus deiner Domain.


## Was wird geprüft?

Sitealarm baut eine TLS-Verbindung zu deiner Domain auf (Port 443, mit SNI) und liest das
dabei präsentierte Zertifikat aus. Erfasst werden:

- **Gültigkeitszeitraum** (`Gültig ab` / `Gültig bis`)
- **Aussteller** (Issuer, z.B. "Let's Encrypt")
- **Zusätzliche Domains** (Subject Alternative Names / SAN-Liste)
- **Verwendung von SHA1** als Signaturalgorithmus (veraltet und unsicher – wird als Hinweis angezeigt)
- Ein **Hash** des Zertifikats, mit dem Sitealarm erkennt, ob sich das Zertifikat seit der letzten Prüfung geändert hat (z.B. nach einer Erneuerung)

**Wichtig zu wissen:** Aktuell wird nicht geprüft, ob das Zertifikat einer vertrauenswürdigen
Zertifizierungsstelle zugeordnet werden kann (Chain-of-Trust). Ein selbstsigniertes oder von einem
Client nicht akzeptiertes Zertifikat wird also nicht automatisch als "ungültig" erkannt, solange
Ablaufdatum und Domain-Zuordnung stimmen. Diese Prüfung ist aktuell in Arbeit.

Ob der im Zertifikat hinterlegte Domainname (inkl. Wildcard-Domains wie `*.example.com`) tatsächlich
zu deinem Monitor passt, wird geprüft und fließt in den Status "Gültig"/"Ungültig" ein.


## Wie oft wird geprüft?

Grundsätzlich prüft Sitealarm jedes Zertifikat **einmal täglich**. Ist ein Zertifikat bereits
abgelaufen, wird es stattdessen **stündlich** erneut geprüft, damit eine Erneuerung möglichst
schnell erkannt wird.


## Benachrichtigung über Probleme

Du wirst per E-Mail benachrichtigt, wenn:
- das Zertifikat **innerhalb der nächsten 14 Tage abläuft** ("wird bald ablaufen"), oder
- das Zertifikat **bereits abgelaufen** ist.

Dieser 14-Tage-Schwellenwert ist aktuell fest hinterlegt und weder pro Monitor noch
pro Plan konfigurierbar.

**Zu beachten:** Es gibt aktuell noch keine Drosselung dieser Benachrichtigungen – solange
sich ein Zertifikat innerhalb des 14-Tage-Fensters befindet bzw. bereits abgelaufen ist,
kannst du bei jedem erneuten Prüflauf eine weitere E-Mail erhalten (also bis zu einmal
täglich vor Ablauf, bis zu einmal pro Stunde nach Ablauf). Eine separate Bestätigungs-Mail,
wenn ein Zertifikat rechtzeitig erneuert wurde, wird nicht verschickt – der Status
springt in diesem Fall einfach wieder auf "Gültig" zurück.

Zertifikats-Benachrichtigungen werden aktuell **ausschließlich per E-Mail** verschickt.
Andere Kanäle wie Slack, Microsoft Teams, Discord oder Webhook, die für Monitore sonst zur
Verfügung stehen, werden für SSL-Zertifikate derzeit nicht unterstützt.


## Anzeigen der Zertifikatsdaten

Auf der Detailseite deines Monitors findest du (bei HTTPS-Monitoren) einen eigenen Tab "Zertifikat" mit:
- Status-Badge ("Gültig"/"Ungültig")
- Verbleibende Tage bis zum Ablauf, farblich abgestuft (grün: mehr als 14 Tage, gelb: 14 Tage oder weniger, rot: bereits abgelaufen)
- Aussteller, Gültigkeitszeitraum, SHA1-Hinweis, zusätzliche Domains, Hash und Zeitpunkt der letzten Prüfung

Hat sich das Zertifikat seit der letzten Prüfung geändert (z.B. durch eine Erneuerung),
zeigt dir Sitealarm zusätzlich das **vorherige Zertifikat** zum Vergleich an.

In der Monitor-Übersicht wird der Zertifikatsstatus außerdem als kompaktes Badge pro Monitor angezeigt.


## Aktivieren/Deaktivieren

Die Zertifikatsüberwachung lässt sich über den entsprechenden Schalter in den
Monitor-Einstellungen ein- und ausschalten. Sie wird automatisch aktiviert, sobald
ein Monitor mit `https://`-Schema angelegt wird, und automatisch deaktiviert, wenn ein Monitor
nicht (mehr) über HTTPS läuft.


## Zugriff über die API

Die Zertifikatsdaten eines Monitors lassen sich über einen eigenen Endpunkt abrufen:

```
GET /api/v2/monitors/{monitorId}/certificate
```

Die Antwort enthält jeweils einen `current`- und (falls vorhanden) einen
`previous`-Block mit `valid_from`, `valid_to`, `issuer`, `uses_sha1_hash`,
`alt_domains`, `hash`, `last_check`, `is_healthy` sowie den live berechneten `days_until_expiry`.
