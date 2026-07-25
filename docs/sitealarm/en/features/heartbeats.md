# Heartbeats

Heartbeats let you monitor processes that are supposed to become active *on their own* – e.g.
cron jobs, backup scripts, queue workers, or scheduled batch jobs. Instead of Sitealarm calling
your application (as with [App Health](app-health.html) or [uptime monitoring](monitoring.html)), your
script itself reports back to Sitealarm after every successful run ("dead man's switch" principle).

If your script doesn't report in within the expected time frame, Sitealarm assumes the job is
no longer running, and notifies you.

Heartbeats are available on **every plan** (including Free) and share a combined quota with your
monitors (see [Limits](#limits)).


## Getting started

When you create a heartbeat, you get a unique ping URL. You call this at the end (or beginning)
of your script – e.g. via `curl` at the end of a cron job.

```
0 * * * * your-backup-script.sh && curl -fsS --retry 3 -o /dev/null "https://ping.sitealarm.app/{token}"
```

As long as this call comes in regularly within the configured interval, the heartbeat stays
"active". If it stops coming in, the status switches to "failed" after at most interval +
tolerance, and you're notified.


### Two ping URLs

Every heartbeat has two equivalent URLs you can use:

- **Short URL** (recommended): `https://ping.sitealarm.app/{token}` – compact, ideal for a one-line cron job.
- **Standard API URL**: `https://sitealarm.app/api/v2/heartbeat/{token}` – if you'd rather work with the classic API endpoint, or want to explicitly report a failure (see below).

Both variants can be called via `GET` or `POST` – it makes no difference which HTTP method you use.

**Important:** The short URL only lets you report a *successful* run. If you want to explicitly
report a failure (e.g. because your script itself detects that something went wrong), use the
standard API URL with the `/failed` suffix (see next section).


### Reporting success or failure

Two endpoints are available via the standard API URL:

| Endpoint | Meaning |
|---|---|
| `GET/POST /api/v2/heartbeat/{token}` | The run was successful. |
| `GET/POST /api/v2/heartbeat/{token}/failed` | The run explicitly failed. |

Optionally, you can send a short message along, which is shown e.g. in the notification email and in the history:

```bash
curl "https://sitealarm.app/api/v2/heartbeat/YOUR_TOKEN?message=Backup+successful,+120MB"
```

or on failure:

```bash
curl "https://sitealarm.app/api/v2/heartbeat/YOUR_TOKEN/failed?message=Backup+failed:+out+of+disk+space"
```

Both endpoints always respond with an empty `200 OK` – regardless of whether the token is valid
or an internal error occurred. That way you can append the ping call to your script without
complicated error handling, without a Sitealarm issue affecting your actual job.


## Interval and tolerance

When creating a heartbeat, you set two values:

- **Interval (`period`)** – how often your script would normally check in.
- **Tolerance (`grace`)** – an additional buffer before a missing ping is counted as a failure.

A heartbeat is considered overdue once more than **interval + tolerance** has passed since the
last successful ping:

```
Due at = last ping + interval + tolerance
```

In the UI, common time windows are available to choose from for both values (1/5/10/30 minutes,
1 hour, plus 1 day for the interval). Via the API, any value in seconds is possible (minimum 60
seconds each). If not specified, interval and tolerance both default to 1 hour (3600 seconds) when
created.

A newly created heartbeat that has never received a ping is **not** automatically marked as
failed – it stays "waiting for ping" (pending) until the first ping arrives.


## Detecting missed pings

Sitealarm checks **once per minute** whether a heartbeat is overdue. So if a script is, say,
exactly on time, it can take up to another minute before Sitealarm actually notices the failure
and sends a notification.

If your script instead actively reports in via the `/failed` endpoint, the status is set to
"failed" immediately (without waiting for the once-a-minute check).

If a heartbeat stays failed across several checks in a row, currently a notification is only
sent for **the first detected interruption** – not for every subsequent check while the failure
persists. Only a renewed successful ping (recovery) triggers another notification.


## Notifications

On every status change (active → failed or failed → active), Sitealarm sends you an email
notification. Repeated pings with an unchanged status don't trigger another notification.

To avoid flooding you with emails, a fixed minimum interval of **2 minutes** also applies between
two notification emails per heartbeat.

Currently, heartbeat notifications are sent **exclusively via email**. Other channels (Microsoft
Teams, Slack, Discord, webhook) available for monitors and App Health aren't currently supported
for heartbeats.

You can disable heartbeat notifications in your account's email notification settings.


## Pausing

The data model already includes the ability to pause monitoring for maintenance windows – a
paused heartbeat is skipped by the failure check. However, this feature isn't yet controllable
via the UI or the API; there's currently no way to pause or reactivate a heartbeat yourself.


## History

For each heartbeat, the last **25 events** (status changes / pings) are stored and shown in the
detail view – including status, message, timestamp, and number of failed attempts. Older
entries are automatically removed daily. Unlike App Health, there's no time-based, plan-dependent
retention period here, but a fixed cap of 25 entries per heartbeat – regardless of plan.


## Managing via the API

Heartbeats can be fully managed via the API:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v2/heartbeats` | List all your own heartbeats |
| `POST` | `/api/v2/heartbeats` | Create a new heartbeat |
| `GET` | `/api/v2/heartbeats/{id}` | Details including history |
| `PATCH` | `/api/v2/heartbeats/{id}` | Change name, interval, tolerance, enabled state |
| `DELETE` | `/api/v2/heartbeats/{id}` | Delete a heartbeat (including its history) |

When creating one, you can specify `name`, `period` (seconds, min. 60), and `grace` (seconds,
min. 60). If omitted, Sitealarm uses the defaults mentioned above.


## Limits

Heartbeats are generally available on every plan (including Free). However, they share a
combined quota with your monitors: every heartbeat counts against your plan's limit just like a
monitor does. For example, if your Free plan has a limit of 5, you could create 5 monitors, or 3
monitors and 2 heartbeats, or any other combination – but never more than 5 entries in total at
the same time.
