---
X_DIRECTORY: "{{DIRECTORY}}"
X_DOMAINS: "{{DOMAINS}}"
X_PATH: "{{PATH}}"
X_PORT: "{{PORT}}"
X_PORT_V6: "{{PORT_V6}}"
X_PROXY_PASS: "{{PROXY_PASS}}"
X_ROOT_PATH: "{{ROOT_PATH}}"
X_SERVER_PUBLIC_IP: "{{SERVER_PUBLIC_IP}}"
X_SERVER_PRIVATE_IP: "{{SERVER_PRIVATE_IP}}"
X_SITE: "{{SITE}}"
X_SITE_ID: "{{SITE_ID}}"
X_SERVER_ID: "{{SERVER_ID}}"
X_USER: "{{USER}}"
---
# NGINX Templates

Erfahre, wie du Nginx-Vorlagen verwenden kannst, um die Konfigurationen deiner Websites anzupassen.


## Überblick

Nginx-Templates ermöglichen es dir, die Nginx-Site-Konfiguration, die Zhylon beim Erstellen deiner neuen Site verwendet, anzupassen.

::: warning Vorsicht
Ungültige Nginx-Templates können dazu führen, dass Nginx nicht ordnungsgemäß funktioniert, wodurch deine bestehenden Sites möglicherweise nicht mehr reagieren.
Du solltest daher vorsichtig sein, wenn du benutzerdefinierte Nginx-Templates erstellst und bereitstellst.
:::


## Verwalten von Vorlagen

### Vorlage erstellen

Du kannst deine eigenen Nginx-Vorlagen direkt im Dashboard zur Verwaltung des Servers erstellen.
Bei der Erstellung einer neuen Vorlage musst du einen Namen für die Vorlage und deren Inhalt angeben.
Zhylon stellt eine Standardvorlage bereit, die du nach Bedarf anpassen kannst.

::: tip Hinweis
Obwohl die Standardvorlage keine Unterstützung für TLSv1.3 zeigt, wird Zhylon automatisch eine Website aktualisieren,
um dies zu unterstützen, wenn der Server dazu in der Lage ist.
:::


### Vorlagen bearbeiten

Du kannst den Namen und den Inhalt deiner Nginx-Vorlage jederzeit bearbeiten.
Änderungen an einer Vorlage haben keine Auswirkungen auf bestehende Websites, die diese Vorlage verwenden.


### Vorlagen löschen

Das Löschen einer Vorlage entfernt keine Websites, die für die Verwendung dieser Vorlage konfiguriert wurden.


## Vorlagenvariablen

Zhylon stellt mehrere Variablen zur Verfügung, die innerhalb deiner Vorlagen verwendet werden können, um deren Inhalt für neue Websites dynamisch zu ändern:

| **Variable**                             | **Beschreibung**                                                                                                                                       |  
|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `{{ $frontmatter.X_DIRECTORY }}`         | Das konfigurierte Webverzeichnis der Website, z. B. **`/public`**                                                                                      |  
| `{{ $frontmatter.X_DOMAINS }}`           | Die konfigurierten Domains, auf die die Website antworten soll, z. B. **`zhylon.net alias.zhylon.net`**                                                |                                  
| `{{ $frontmatter.X_PATH }}`              | Das webzugängliche Verzeichnis der Website, z. B. **`/home/zhylon/zhylon.net/public`**                                                                 |                                    
| `{{ $frontmatter.X_PORT }}`              | Der IPv4-Port, auf dem die Website hören soll (**`:80`**). Wenn der Webseitenname **`default`** ist, enthält diese Variable auch **`default_server`**. |
| `{{ $frontmatter.X_PORT_V6 }}`           | Der IPV6-Port, auf dem gehört werden soll (**`[::]:80`**). Wenn der Webseitenname **`default`** ist, enthält diese Variable auch **`default_server`**. |
| `{{ $frontmatter.X_PROXY_PASS }}`        | Der PHP-Socket, auf den gehört werden soll, z. B. **`unix:/var/run/php/php8.4-fpm.sock`**                                                              |               
| `{{ $frontmatter.X_ROOT_PATH }}`         | Der Root-Pfad der konfigurierten Website, z. B. **`/home/zhylon/zhylon.net`**                                                                          |                                            
| `{{ $frontmatter.X_SERVER_PUBLIC_IP }}`  | Die öffentliche IP-Adresse des Servers                                                                                                                 |                                                                      
| `{{ $frontmatter.X_SERVER_PRIVATE_IP }}` | Die private IP-Adresse des Servers, falls verfügbar                                                                                                    |                                                                          
| `{{ $frontmatter.X_SITE }}`              | Der Name der Website, z. B. **`zhylon.net`**. Dies unterscheidet sich von `{{ $frontmatter.X_DOMAINS }}`, da es keine Aliasnamen enthält.              |                 
| `{{ $frontmatter.X_SITE_ID }}`           | Die ID der Website, z. B. **`h:WdlPWwXxXrjdZkxr8B`**                                                                                                   |                                                                                                 
| `{{ $frontmatter.X_USER }}`              | Der Benutzer der Website, z. B. **`zhylon`**                                                                                                           |                                                                                                                   
| `{{ $frontmatter.X_SERVER_ID }}`         | Die ID des Servers, z. B. **`h:pAwULG9pYZkj2dEVyD`**                                                                                                   |                                                                          

Bei der Verwendung dieser Variablen solltest du sicherstellen, dass sie genau der oben gezeigten Syntax entsprechen.


## Team-Berechtigungen

Die Berechtigung zur Verwaltung von Nginx-Vorlagen wird durch die Berechtigung **`site:manage-nginx`** festgelegt.
Diese Berechtigung wird auch verwendet, um die Möglichkeit einzuschränken, die Nginx-Konfigurationsdatei einer bestehenden Website zu bearbeiten.
