# Zhylon SDK

Ein PHP-SDK, das die einfache Interaktion mit Zhylon ermöglicht.
Mit diesem SDK kannst du bequem die Funktionen und API von Zhylon in deinen PHP-Anwendungen nutzen.

::: danger Hinweis
Aktuell befindet sich das SDK noch in der Entwicklung und ist noch nicht verfügbar.
Du kannst aber die Forge-SDK `laravel/forge-sdk` von Laravel nutzen und den Endpoints von Zhylon verwenden.
Endpoints findest du in der [API-Dokumentation](/api).
:::

## Übersicht

Das [Zhylon SDK](https://github.com/zhylon/zhylon-sdk) bietet eine intuitive und ausdrucksstarke Schnittstelle, um mit der API von Zhylon zu interagieren und Zhylon-Server zu verwalten.  


## Installation

Um das SDK in deinem Projekt zu installieren, füge das Paket mit Composer hinzu:
    
```bash
composer require zhylon/zhylon-sdk
```


## Upgrade

Beim Upgrade auf eine neue Hauptversion des Zhylon SDK ist es wichtig, dass du den [Upgrade-Leitfaden](https://github.com/zhylon/zhylon-sdk/blob/master/UPGRADE.md) sorgfältig durchliest.


## Grundlegende Verwendung

Du kannst eine Instanz des SDK wie folgt erstellen:

```php
$zhylon = new \Zhylon\SDK\Zhylon(TOKEN_HERE);
```

Mit der `Zhylon-Instanz kannst du verschiedene Aktionen durchführen und die unterschiedlichen Ressourcen abrufen, die die API von Zhylon bereitstellt:  

```php
$servers = $zhylon->servers();
```
Dies gibt dir ein Array von Servern zurück, auf die du Zugriff hast.
Jeder Server wird durch eine Instanz von `Zhylon\SDK\Resources\Server` dargestellt, die mehrere öffentliche Eigenschaften wie `$name`, `$id`, `$size`, `$region` und andere enthält.

Du kannst auch einen einzelnen Server wie folgt abrufen:

```php
$server = $zhylon->server(SERVER_ID_HERE);
```

Bei mehreren Aktionen, die von diesem SDK unterstützt werden, musst du möglicherweise einige Parameter übergeben, beispielsweise beim Erstellen eines neuen Servers:  

```php
$server = $zhylon->createServer([
    "provider"=> ServerProviders::ZENVER,
    "credential_id"=> "h:RX9vO6almjy8x0B5Zg",
    "name"=> "test-via-api",
    "type"=> ServerTypes::APP,
    "size"=> "G1000",
    "database"=> "zhylon",
    "database_type" => InstallableServices::MYSQL_8,
    "php_version"=> InstallableServices::PHP_84,
    "region"=> "nue1"
]);
```

Diese Parameter werden in der POST-Anfrage verwendet, die an die Zhylon-Server gesendet wird.
Weitere Informationen zu den erforderlichen Parametern für jede Aktion findest du in der offiziellen [API-Dokumentation von Zhylon](/api).

Beachte, dass diese Anfrage beispielsweise nur den Servererstellungsprozess startet.
Dein Server benötigt möglicherweise einige Minuten, bis die Bereitstellung abgeschlossen ist.
Du musst die `$isReady`-Eigenschaft des Servers überprüfen, um zu erfahren, ob er bereit ist oder nicht.

Einige SDK-Methoden warten jedoch darauf, dass die Aktion auf der Seite von Zhylon abgeschlossen ist.
Dies geschieht, indem regelmäßig die Zhylon-Server kontaktiert werden, um zu überprüfen, ob unsere Aktion abgeschlossen ist, zum Beispiel:  

```php
$zhylon->createSite(SERVER_ID, [SITE_PARAMETERS]);
```

Diese Methode wird die Zhylon-Server alle 5 Sekunden anpingen und prüfen, ob der Status der neu erstellten Site auf `installiert` steht.
Sie gibt nur dann eine Rückmeldung, wenn dies der Fall ist.
Sollte das Warten 30 Sekunden überschreiten, wird eine `Zhylon\SDK\Exceptions\TimeoutException` ausgelöst.

Du kannst dieses Verhalten ganz einfach stoppen, indem du das Argument `$wait` auf false setzt:

```php
$zhylon->createSite(SERVER_ID, [SITE_PARAMETERS], false);
```

Du kannst auch den gewünschten Timeout-Wert festlegen:

```php
$zhylon->setTimeout(120)->createSite(SERVER_ID, [SITE_PARAMETERS]);
```
