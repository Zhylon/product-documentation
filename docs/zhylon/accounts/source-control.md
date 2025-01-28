# Source Control

Mit **Source Control** kannst du deine Projekte direkt aus einem Git-Repository in Zhylon deployen.
Zhylon unterstützt dabei sowohl bekannte Git-Anbieter als auch selbst gehostete Repositories.


## Einführung

Mit **Source Control** kannst du deine Projekte direkt aus einem Git-Repository in Zhylon deployen.
Zhylon unterstützt dabei sowohl bekannte Git-Anbieter als auch selbst gehostete Repositories.



## Unterstützte Git-Anbieter

Zhylon unterstützt die folgenden Git-Anbieter:
- [GitHub](https://github.com/)
- [GitLab](https://about.gitlab.com/) (gehostet & selbst gehostet)
- [Bitbucket](https://bitbucket.org/)
- Custom Git Repositories (eigene Git-Server)


### Nutzung eines eigenen Git-Providers in Zhylon

Wenn dein Git-Provider kein offizieller Anbieter ist, kannst du beim Erstellen einer neuen Site auf deinem Server die Option **Custom** verwenden.

Wähle zunächst die Option **Custom** aus, wenn du deine Git-basierte Site erstellst.
Füge dann den generierten SSH-Schlüssel zu deinem Source-Control-Provider hinzu und gib den vollständigen Repository-Pfad an (`git@provider.com:user/repository.git`).



## Provider-Verwaltung

### Anbieter verbinden

Du kannst jederzeit über das Source-Control-Dashboard in deinem Zhylon-Konto eine Verbindung zu einem der unterstützten
[Source-Control-Anbieter](https://zhylon.net/user-profile/source-control)
herstellen.


### Anbieter trennen

Du kannst einen verbundenen Source-Control-Anbieter entfernen, indem du auf die Schaltfläche **Trennen** neben dem Anbieter klickst.

::: warning Hinweis
Beachte, dass du deinen Anbieter nicht trennen kannst, wenn noch Sites davon abhängen.
:::


### Token aktualisieren

Wenn du die Verbindung von Zhylon zu deinem Source-Control-Anbieter aktualisieren möchtest, kannst du dies tun, 
indem du auf die Schaltfläche **Token aktualisieren** neben dem Namen des Source-Control-Anbieters im 
Source-Control-Dashboard deines Zhylon-Kontos klickst.


### Aktualisieren des Zugriffs und der Berechtigungen für Source Control

Um die Verbindung zu deinem Source-Control-Anbieter zu aktualisieren und den Zugriff auf verschiedene Organisationen, Repositories oder Token-Berechtigungen zu ändern:

1. Gehe zu den Einstellungen deines Source-Control-Anbieters.
2. Suche die Zhylon OAuth-Anwendung und deinstalliere sie.
3. Kehre zu Zhylon zurück.
4. Klicke auf die Schaltfläche **Token aktualisieren**, um einen neuen OAuth-Authentifizierungsprozess zu starten.

Wenn du Zugriff auf unterschiedliche Organisationen oder Repositories benötigst, 
reicht das bloße Aktualisieren des Tokens möglicherweise nicht aus, 
um die erforderlichen Berechtigungen zu gewähren.
Das Durchlaufen des vollständigen OAuth-Authentifizierungsprozesses ermöglicht es dir, 
den Zugriff auf die gewünschten Organisationen und Repositories mit dem entsprechenden Berechtigungsumfang ausdrücklich zu autorisieren.
