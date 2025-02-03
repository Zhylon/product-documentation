# API

Erfahre, wie du starten und mit der Zhylon API interagieren kannst.

## Übersicht

Zhylon bietet eine umfassende API, die es dir ermöglicht, deine Zhylon-Server und -Sites programmgesteuert zu verwalten.
Für weitere Informationen, siehe die [Zhylon API-Dokumentation](/api).

Das offizielle [Zhylon PHP SDK](/general/sdk) bietet eine ausdrucksstarke Schnittstelle zur Interaktion mit der API von Zhylon und zur Verwaltung von Zhylon-Servern.


## Verwaltung von API-Token

API-Token können im [API-Dashboard](https://zhylon.net/user-profile/api) von Zhylon verwaltet werden.


### Neuen API-Token erstellen

Du musst ein API-Token generieren, um mit der Zhylon API zu interagieren.
Tokens werden verwendet, um dein Konto zu authentifizieren, ohne persönliche Daten bereitzustellen.
Du kannst so viele Tokens erstellen, wie du für deine Integrationen benötigst.


### API-Token löschen

Wenn du ein API-Token nicht mehr benötigst, kannst du es löschen, indem du auf die **X**-Schaltfläche neben dem Token-Namen in deinem [API-Token-Dashboard](https://zhylon.net/user-profile/api) klickst.


## Rate Limits

Die Zhylon API hat derzeit ein Rate Limit von 60 Anfragen pro Minute. Wenn du dieses Limit überschreitest, erhältst du eine `429 Too Many Requests`-Antwort.
