# Pläne & Limits

Sitealarm bietet verschiedene Pläne (Free, Pro, Team) mit unterschiedlichen Monitor-Limits,
Check-Intervallen und Feature-Freischaltungen. Aktuell gibt es dafür ausschließlich lesende Endpunkte —
ein Wechsel des Plans erfolgt derzeit nicht per Self-Service, sondern manuell durch uns.

## Alle öffentlichen Pläne abrufen

Liefert die Pläne, die auf der Preisseite angezeigt werden (nur `is_public = true`).

#### Request

- HTTP Method: `GET`
- URL: `/api/plans`
- Authentifizierung: nicht erforderlich

#### Response

```json
{
  "data": [
    {
      "slug": "free",
      "name": "Free",
      "price_cents": 0,
      "currency": "EUR",
      "monitor_limit": 5,
      "check_interval_seconds": 300,
      "features": {
        "keyword_search": true,
        "heartbeat_monitoring": true,
        "application_health_monitor": false,
        "status_pages": false,
        "multi_user": false,
        "api_access": false,
        "broken_links": "coming_soon",
        "mixed_content": "coming_soon",
        "notification_channels": ["email"]
      }
    }
  ]
}
```

Mögliche Werte für Feature-Flags wie `broken_links` oder `mixed_content` sind `false`, `"coming_soon"` oder `true`.


## Eigene Limits abrufen

Liefert die für den aktuell angemeldeten Nutzer tatsächlich geltenden Limits — inklusive individueller
Overrides, die Vorrang vor den Plan-Standardwerten haben.

#### Request

- HTTP Method: `GET`
- URL: `/api/v2/user/plan-limits`
- Authentifizierung: erforderlich (`Authorization: Bearer <token>`)

#### Response

```json
{
  "data": {
    "monitor_limit": 5,
    "check_interval_seconds": 300,
    "checks_used": 3,
    "features": {
      "keyword_search": true,
      "heartbeat_monitoring": true
    }
  }
}
```

- `monitor_limit`: maximale Anzahl an Monitoren für diesen Nutzer.
- `check_interval_seconds`: kürzestes erlaubtes Check-Intervall.
- `checks_used`: Anzahl der aktuell angelegten Monitore.
- `features`: gemergte Feature-Flags (individuelle Overrides schlagen den Plan-Standard).

Abweichende Limits (z. B. für Friends & Family) werden ausschließlich manuell auf unserer Seite gesetzt —
hierfür gibt es keinen Self-Service- oder Checkout-Flow.
