# SSH-Schlüssel / Git-Zugriff

Lerne, wie du SSH-Schlüssel auf deinen Zhylon-Servern verwaltest.


## Account SSH-Schlüssel

Beim Bereitstellen eines neuen Servers fügt Zhylon automatisch alle [SSH-Schlüssel aus deinem Konto](../accounts/ssh) hinzu.
Dadurch kannst du dich ohne Passwort per SSH mit deinem Server verbinden:

```sh
ssh zhylon@IP_ADDRESS
```  

## Server-SSH-Schlüssel / Git-Projektzugriff

Wenn ein Server bereitgestellt wird, wird ein SSH-Schlüsselpaar für den Server generiert.

- **Privater Schlüssel:** Gespeichert unter `~/.ssh/id_rsa`
- **Öffentlicher Schlüssel:** Gespeichert unter `~/.ssh/id_rsa.pub`

Beim Erstellen eines Servers hast du die Möglichkeit, diesen Schlüssel zu deinen verbundenen Quellcode-Verwaltungsanbietern hinzuzufügen.
Dadurch kann der Server jedes Repository klonen, auf das dein Quellcode-Konto Zugriff hat.

Falls du dies nicht möchtest, kannst du die Option **„SSH-Schlüssel des Servers zu den Quellcode-Anbietern hinzufügen“** deaktivieren.
In diesem Fall musst du für jedes Projekt [**Site-spezifische Deploy-Schlüssel**](#deploy-schlussel)
verwenden, um dem Server Zugriff auf einzelne Repositories bei Anbietern wie GitHub, GitLab oder Bitbucket zu gewähren.


### Deploy-Schlüssel

Manchmal möchtest du dem **Zhylon-Benutzer** nur Zugriff auf ein bestimmtes Repository gewähren.
Dies wird üblicherweise durch das Hinzufügen eines SSH-Schlüssels zu den **„Deploy Keys“** des jeweiligen Repositories bei GitHub, GitLab oder Bitbucket erreicht.


#### Deploy-Schlüssel für neue Seiten generieren

Wenn du eine neue Website auf deinem Server hinzufügst, kannst du einen **Deploy Key** für diese Anwendung generieren.
Nachdem der Schlüssel erstellt wurde, kannst du ihn im Dashboard deines Quellcode-Anbieters zu deinem Repository hinzufügen.
Dadurch kann dein Server nur dieses spezifische Repository klonen.


#### Flexible Nutzung von Deploy-Schlüsseln

Du kannst **Deploy-Schlüssel** auch auf Servern verwenden, die bereits über einen SSH-Schlüssel mit deinem Quellcode-Anbieter verbunden sind.
Dadurch kannst du dem Server Zugriff auf ein Repository gewähren, auf das das mit deinem **Zhylon-Konto** verknüpfte Quellcode-Konto **keinen direkten Kollaborationszugriff** hat.
