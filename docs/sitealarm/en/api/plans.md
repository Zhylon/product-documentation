# Plans & Limits

Sitealarm offers various plans (Free, Pro, Team) with different monitor limits,
check intervals, and feature unlocks. Currently, only read-only endpoints exist for this —
switching plans is not currently available as self-service, but is done manually by us.

## Retrieve all public plans

Returns the plans shown on the pricing page (only `is_public = true`).

#### Request

- HTTP Method: `GET`
- URL: `/api/plans`
- Authentication: not required

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

Possible values for feature flags such as `broken_links` or `mixed_content` are `false`, `"coming_soon"`, or `true`.


## Retrieve your own limits

Returns the limits that actually apply to the currently logged-in user — including individual
overrides, which take precedence over the plan's default values.

#### Request

- HTTP Method: `GET`
- URL: `/api/v2/user/plan-limits`
- Authentication: required (`Authorization: Bearer <token>`)

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

- `monitor_limit`: maximum number of monitors for this user.
- `check_interval_seconds`: shortest allowed check interval.
- `checks_used`: number of monitors currently created.
- `features`: merged feature flags (individual overrides take precedence over the plan default).

Deviating limits (e.g. for Friends & Family) are set exclusively manually on our end —
there is no self-service or checkout flow for this.
