# Domain Verifizierung

Damit du deine Domain mit deinem Account verknüpfen kannst, musst du sie verifizieren.
Hierzu gibt es verschiedene Möglichkeiten, die du nutzen kannst, um deine Domain zu verifizieren.

Wenn deine Domain noch nicht verifiziert ist, prüfen wir alle **24 Stunden**, ob deine Domain verifiziert werden konnte.
Bei neu angelegten Seiten prüfen wir alle **15 Minuten**, ob die Domain verifiziert wurde.

## DNS-Verifizierung

Bei der DNS-Verifizierung musst du einen TXT-Eintrag in deinen DNS-Einstellungen hinzufügen.
Dieser Eintrag wird von uns geprüft und wenn er korrekt ist, wird deine Domain verifiziert.

Der TXT-Eintrag bei deinem DNS-Provider muss folgendermaßen aussehen:

```
zhylon-verification={dein-verifizierungs-token}
```

## META-Tag-Verifizierung

Bei der META-Tag-Verifizierung musst du einen META-Tag in den `<head>`-Bereich deiner Webseite einfügen.
Dieser META-Tag wird von uns geprüft und wenn er korrekt ist, wird deine Domain verifiziert.

Der META-Tag muss folgendermaßen aussehen:

```html
<meta name="zhylon-verification" content="{dein-verifizierungs-token}">
```

## Datei-Verifizierung

Bei der Datei-Verifizierung musst du eine Datei mit einem bestimmten Namen und Inhalt auf deinem Webserver ablegen.
Diese Datei wird von uns geprüft und wenn sie korrekt ist, wird deine Domain verifiziert.

Die Datei muss folgendermaßen aussehen:

```txt
zhylon-verification={dein-verifizierungs-token}
```

Diese Datei musst du mit dem Namen `.well-known/zhylon-verification.txt` in das Verzeichnis deiner Webseite ablegen.

## Deployment via Zhylon

Wenn du deine Webseite über Zhylon deployt hast, kannst du deine Domain direkt über Zhylon verifizieren.
Hierzu empfehlen wir dir die Verwendung unseres PHP-Pakets [zhylon/helpers](https://github.com/Zhylon/helpers).

Hierzu kannst du die vorhandenen Funktionen nutzen, um einen Meta-Tag in dein HTML einzufügen.
Wenn du das Paket installiert hast, kannst du die Funktion `zhylon_verification_meta_tag()` verwenden, um den Meta-Tag zu erzeugen.

```php
echo __zhylon_verification_meta_tag();
```

Das macht besonders dann Sinn, wenn deine Seite über mehrere Domains erreichbar ist oder nicht mehr über Zhylon bereitgestellt wird.
