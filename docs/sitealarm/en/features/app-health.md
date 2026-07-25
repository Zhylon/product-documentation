# App Health

With Sitealarm you can monitor various aspects of your application and your server.
This lets you get notified when, for example, any of the following occur:
- disk space is running low
- the database is unreachable
- Redis is unreachable
- emails can't be sent
- an application restart is required
- ...

You can monitor any action point of your application you like – how many individual checks you can add within one app health check depends on your plan (see [Limits](#limits)).

App Health is a Pro feature and must be enabled on an existing monitor. It's not available on the Free plan.


## Getting started
### Two delivery modes: poll or push

There are two ways your health check results can reach Sitealarm:

1. **Poll mode (default)** – Sitealarm calls an endpoint of your application via HTTP request every 15 minutes. Your application responds with JSON containing the health check results.
2. **Push mode (Team plan)** – Instead of Sitealarm calling your application, your application (e.g. via a cron job) actively sends the result to a push endpoint on Sitealarm. This is useful, for example, if your server isn't reachable from the outside, or if you want to report health checks directly from a deployment or scheduler script.

In both cases the JSON format is identical – only the direction of transfer differs. The mode is set per health check on the settings page.

### Respond with your health check results (poll mode)

Sitealarm doesn't execute any code inside your application or your server.
Instead, you should perform the checks yourself.
Sitealarm sends an HTTP request to your application at a specific endpoint.
Your application should respond with JSON containing the health check results.

The request Sitealarm sends to your application includes a secret value in the `health-check-secret` header.
To make sure a request actually comes from Sitealarm, you should verify that this secret value is correct.

The endpoint the request is sent to, as well as the secret token in the header, can be configured in the health check settings.

**A note on caching:** Sitealarm caches your endpoint's response for 30 minutes. If you re-run the check manually in the meantime, you may therefore not get fresh data from your endpoint within this window – the cached response is delivered instead.

### Pushing results to Sitealarm (push mode)

In push mode, you send the result of your health checks yourself via a `POST` request to Sitealarm, instead of us calling your application:

```
POST /api/v2/health-check/{token}/push
```

The `{token}` is the secret token from your health check's settings. The request body has the same JSON format as in poll mode (see below), including `finishedAt` and `checkResults`.

A few specifics of push mode:
- Push is a **Team plan feature**. If your plan is no longer eligible, the endpoint responds with `403` and the health check is automatically disabled.
- The endpoint is limited to **30 requests per minute per token** (rate limiting).
- If the incoming `finishedAt` value is less than or equal to the last stored value, the request is recognized as a duplicate, answered with `{"status": "duplicate", "processed": false}`, and not processed further. This prevents accidental duplicate notifications if your script calls the endpoint multiple times with the same result.
- A successful, new processing run is confirmed with `{"status": "ok", "processed": true}`.

Example with `curl`:

```bash
curl -X POST "https://app.sitealarm.de/api/v2/health-check/YOUR_TOKEN/push" \
    -H "Content-Type: application/json" \
    -d '{
        "finishedAt": '"$(date +%s)"',
        "checkResults": [
            {
                "name": "database",
                "label": "Database",
                "status": "ok",
                "notificationMessage": "",
                "shortSummary": "Reachable",
                "meta": []
            }
        ]
    }'
```

### Integrating with your application

Here's how you can configure your application to respond with the expected health check results:
- Laravel
- any PHP application
- all other programming languages


### Structure of a check result

Each entry in `checkResults` describes a single action point and has the following fields:

| Field | Required | Description |
|---|---|---|
| `name` | yes | Unique, stable identifier of the check (e.g. `database`). Sitealarm uses `name` to recognize whether this is an already-known or a new check. |
| `status` | yes | One of `ok`, `warning`, `crashed`, `skipped`, `failed` (see below). |
| `label` | no | Display name of the check in the UI. |
| `notificationMessage` | no | Text shown in notifications when there's a problem. |
| `shortSummary` | no | Short summary shown in the overview. |
| `meta` | no | Any additional key-value data that's stored and displayed in the check's history (e.g. measurements). |

#### Possible `status` values

- **`ok`** – The check succeeded. Considered healthy, doesn't trigger a failure notification.
- **`warning`** – The check is running but degraded. Shown separately from hard failures in the UI, but still triggers notifications (with its own throttling).
- **`crashed`** – The check failed hard (e.g. due to an exception). Treated the same as `failed`.
- **`failed`** – The check returned a negative result. Triggers a failure notification.
- **`skipped`** – The check was deliberately skipped (e.g. because it wasn't relevant for this run). Not considered a failure and doesn't trigger a notification.

If you send any other, unsupported value, the check is internally tracked as `unknown` and treated as a failure.


### Viewing health check results in Sitealarm

The overview page shows all monitors with app health enabled. You can filter by status there: `ok`, `error`, `stale`, `pending` (no result received yet), `disabled`, `no_endpoint` (no endpoint configured), and `unconfigured`.

You can click on one of the checks to see its history. Status, message, and `meta` data are shown for each historical point in time there.

By default, we store results in full resolution (one entry per fetch) for 7 days.
After that, older entries are compacted to one entry per hour until they're 30 days old in total – after which they're deleted.
These two periods can technically vary by plan, but currently apply the same way across all plans.
If you want to keep the history longer, consider using our API to fetch the results and store them in your own storage.

### `finishedAt` and stale results

In **poll mode**, Sitealarm checks the `finishedAt` timestamp from your endpoint's response.
If this value is more than 60 minutes older than the current time, we assume your health check scheduler is no longer running and only stale, cached results are being served.
In this case we mark the check as "stale" and notify you – regardless of what's in `checkResults`.
Make sure `finishedAt` is recalculated fresh on every fetch and doesn't come from an old cache.

In **push mode**, the timestamp of the last successfully processed push is used instead (not the `finishedAt` value from the payload): if more than 60 minutes have passed since the last push arrived, the check is likewise marked as "stale". If no push has ever arrived, we don't jump to "stale" prematurely – monitoring only kicks in after the first successful push.

The 60-minute threshold is currently fixed and not configurable per monitor.


### Getting notified about problems

Whenever a problem is detected in your health checks (or resolved), Sitealarm can notify you.
To do so, you need to enable notifications for health checks on the settings page.

We send you a notification for every failing or degraded check (`failed`, `crashed`, `warning`).
To avoid flooding you with notifications, we send at most one notification per failing health check every 3 hours (180 minutes) by default.
You can adjust this interval per health check in the settings (minimum 15 minutes).
We also send you a notification once a problem has been resolved.

In addition, we send a summary once a day at 07:30 with the current status of all configured checks – independent of the notification interval mentioned above.

Individual checks can also be muted (snoozed) in the UI. A snoozed check is still monitored and logged in the history, but doesn't trigger notifications until you unsnooze it.

**Supported notification channels for App Health:** email, Microsoft Teams, and Slack. Other channels available for monitors (e.g. webhook, Discord, Pushover) aren't currently supported for App Health notifications, even if they're generally enabled on your plan.


### Adding and removing health checks

Every individual health check your server sends back is added to Sitealarm.
To remove a specific check from Sitealarm, simply stop having your server send that result to us, and we'll also remove that check from our system.


## Laravel

Register a route that returns your health check results as JSON, and protect it with the `health-check-secret` header.

```php
// routes/web.php
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    if (request()->header('health-check-secret') !== config('services.sitealarm.health_check_secret')) {
        abort(403);
    }

    $databaseOk = true;
    try {
        DB::connection()->getPdo();
    } catch (\Exception $e) {
        $databaseOk = false;
    }

    $diskUsedPercentage = round((1 - disk_free_space('/') / disk_total_space('/')) * 100);

    return response()->json([
        'finishedAt'   => now()->timestamp,
        'checkResults' => [
            [
                'name'                => 'database',
                'label'               => 'Database',
                'status'              => $databaseOk ? 'ok' : 'failed',
                'notificationMessage' => $databaseOk ? '' : 'Database unreachable',
                'shortSummary'        => $databaseOk ? 'Reachable' : 'Error',
                'meta'                => [],
            ],
            [
                'name'                => 'disk-space',
                'label'               => 'Disk space',
                'status'              => $diskUsedPercentage > 90 ? 'failed' : 'ok',
                'notificationMessage' => $diskUsedPercentage > 90 ? "Disk is {$diskUsedPercentage}% full" : '',
                'shortSummary'        => "{$diskUsedPercentage}%",
                'meta'                => ['disk_space_used_percentage' => $diskUsedPercentage],
            ],
        ],
    ]);
});
```

Store the secret token from the health check settings, e.g. as `SITEALARM_HEALTH_CHECK_SECRET`, in your `.env`, and wire it up via `config/services.php`:

```php
// config/services.php
'sitealarm' => [
    'health_check_secret' => env('SITEALARM_HEALTH_CHECK_SECRET'),
],
```

If you'd like to manage several, more fine-grained checks (e.g. Redis, queue, disk space), take a look at the [`spatie/laravel-health`](https://github.com/spatie/laravel-health) package – it already ships ready-made checks and a configurable endpoint in the same JSON format.

**Important:** `finishedAt` must be freshly computed on every fetch (e.g. `now()->timestamp`). If you return a cached, stale value, Sitealarm will mark the check as "stale" (see above).

If you'd rather use push mode, you can send the same JSON payload via a cron job (e.g. with `Http::post(...)` or a scheduled command) to `POST /api/v2/health-check/{token}/push`, instead of providing a route for polling.


## PHP applications

Even without a framework, you can output the expected JSON format directly:

```php
<?php

header('Content-Type: application/json');

$expectedSecret = getenv('SITEALARM_HEALTH_CHECK_SECRET');
if (($_SERVER['HTTP_HEALTH_CHECK_SECRET'] ?? null) !== $expectedSecret) {
    http_response_code(403);
    exit;
}

$databaseStatus = 'failed';
try {
    new PDO('mysql:host=localhost;dbname=app', 'user', 'password');
    $databaseStatus = 'ok';
} catch (PDOException $e) {
    $databaseStatus = 'failed';
}

$diskUsedPercentage = round((1 - disk_free_space('/') / disk_total_space('/')) * 100);

echo json_encode([
    'finishedAt'   => time(),
    'checkResults' => [
        [
            'name'                => 'database',
            'label'               => 'Database',
            'status'              => $databaseStatus,
            'notificationMessage' => 'ok' === $databaseStatus ? '' : 'Database unreachable',
            'shortSummary'        => 'ok' === $databaseStatus ? 'Reachable' : 'Error',
            'meta'                => [],
        ],
        [
            'name'                => 'disk-space',
            'label'               => 'Disk space',
            'status'              => $diskUsedPercentage > 90 ? 'failed' : 'ok',
            'notificationMessage' => $diskUsedPercentage > 90 ? "Disk is {$diskUsedPercentage}% full" : '',
            'shortSummary'        => "{$diskUsedPercentage}%",
            'meta'                => ['disk_space_used_percentage' => $diskUsedPercentage],
        ],
    ],
]);
```

As in the Laravel example: `finishedAt` must be recalculated on every call (`time()`), not sourced from a cache.


## All other languages

Sitealarm can monitor the health of any application, regardless of the framework or programming language used.

We won't perform any health checks ourselves.
Your application or infrastructure should perform the desired checks.
The results of the checks should be exposed at an HTTP endpoint (poll mode) or actively sent to Sitealarm (push mode, see above).

Every few minutes, Sitealarm visits this endpoint to fetch the health checks.
The endpoint URL can be configured in the health check settings.


The request Sitealarm sends to your app includes a secret value in the `health-check-secret` header.
To make sure a request actually comes from Sitealarm, you should verify that this secret value is correct.


## Limits

- **Number of checks:** Each health check (i.e. each monitor) currently supports a maximum of **5 distinct checks** (distinguished by `name`). If you send additional, new check names, they'll be dropped until an existing check is removed.
- **`meta` fields:** A maximum of **5 key-value pairs** from `meta` are stored per check. Extra entries are silently truncated.
- **Push rate limit:** The push endpoint accepts a maximum of **30 requests per minute** per token.

These limits are technically configurable per plan, but currently the same values apply to all plans (Free, Pro, Team).
