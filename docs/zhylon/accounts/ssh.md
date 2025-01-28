# SSH-Schlüssel

SSH-Schlüssel werden verwendet, um sich über das SSH-Protokoll mit deinem Server zu authentifizieren.
Hier erfährst du, wie du deine SSH-Schlüssel zu deinem Zhylon-Konto und zu deinen Servern hinzufügst.


## Einführung

SSH ist ein Protokoll, das es dir ermöglicht, über ein Befehlszeilen-Terminal auf deinen Server zuzugreifen.
SSH-Schlüssel dienen der Authentifizierung mit deinem Server über das SSH-Protokoll.
Wenn du neu bei SSH-Schlüsseln bist, empfehlen wir dir, die
[GitHub-Dokumentation zur Generierung von SSH-Schlüsseln](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
zu lesen, um zu beginnen.

Nachdem du deinen SSH-Schlüssel zu deinem Server hinzugefügt hast, kannst du dich ohne Passwort per SSH mit dem Server verbinden:

```bash
ssh zhylon@SERVER_PUBLIC_IP_ADDRESS
```


### Hinzufügen Deines SSH-Schlüssels zu neuen Servern

Bevor du einen Server zum ersten Mal bereitstellst, solltest du deine SSH-Schlüssel zu deinem Konto hinzufügen.
Dies kannst du auf der Seite für [SSH-Schlüssel](https://zhylon.net/user-profile/ssh-keys) in deinem Zhylon-Dashboard tun.

Im Rahmen des Bereitstellungsprozesses wird Zhylon alle aktiven SSH-Schlüssel zu deinem Zhylon-Konto hinzufügen.
Dadurch kannst du dich als Benutzer `zhylon` per SSH mit dem Server verbinden.

Wenn eine deiner Webseiten die Benutzerisolation verwendet, wirst du aufgefordert, den Benutzer auszuwählen, dem du den Schlüssel hinzufügen möchtest.
Anschließend kannst du dich als dieser Benutzer per SSH mit dem Server verbinden.


### Hinzufügen eines SSH-Schlüssels zu bestehenden Servern

Wenn du bereits Server bereitgestellt hast und einen neuen SSH-Schlüssel zu mehreren Servern gleichzeitig hinzufügen möchtest, füge zuerst deinen Schlüssel über die Seite für
[SSH-Schlüssel](https://zhylon.net/user-profile/ssh-keys)
zu deinem Konto hinzu.
Sobald er in der Liste der "Aktiven Schlüssel" aufgeführt ist, kannst du die Aktion "Zu Servern hinzufügen" verwenden und die Server auswählen, zu denen der Schlüssel hinzugefügt werden soll.

Alternativ kannst du SSH-Schlüssel auch [direkt einem Server hinzufügen](/servers/ssh), ohne sie zuvor zu deinem Konto hinzuzufügen.


## Server-Öffentlicher Schlüssel

Während des Bereitstellungsprozesses generiert Zhylon ein eigenes Schlüsselpaar, um auf den Server zugreifen zu können.
Der öffentliche Schlüssel dieses Schlüsselpaares wird in die Datei `authorized_keys` sowohl des `root`- als auch des `zhylon`-Benutzers eingefügt.

## Zhylon-Öffentlicher Schlüssel

Während des Bereitstellungsprozesses erstellt Zhylon einen öffentlichen Schlüssel für den `zhylon `-Benutzer.
Dieser Schlüssel wird von Git verwendet, um die Projekte auf deinem Server zu klonen. 
Der Schlüssel wird beim Quellcodeanbieter hinzugefügt und befindet sich unter `/home/zhylon/.ssh/id_rsa.pub`.

