# Monitoring

## Various uptime checks

To check uptime, we perform a simple `GET` request against the website you specify.
A check is considered successful when the response is a `2xx` HTTP response. On the site's settings screen,
several options are available to customize this check to your needs:

- **Search for string**: If you specify a string, the response is checked for this string.
  If the string isn't found, the check is marked as failed.
- **Missing string**: If you specify a string, the response is checked for this string.
  If the string is found, the check is marked as failed.
- **Response header**: If you specify a header, the response is checked for this header.
  If the header isn't found, the check is marked as failed.
- **HTTP verb**: You can choose the HTTP verb used for the check.
  By default, a `GET` verb is used. You can also choose `POST`, `PUT`, or `PATCH`.
- **Payload**: If you've chosen an HTTP verb that requires a payload, you can specify the payload here.
- **Request headers**: You can specify additional headers to attach to the request here.


## Check frequency

Uptime checks run **every minute** from our main location. This location always makes the
final decision on whether a notification is triggered.

In addition, you can enable any number of independent locations per monitor for confirmation
(see [Our locations](#our-locations)). These locations **never** trigger an alert themselves —
they only confirm what the main location already suspects:

1. The main location detects a problem and remembers the time.
2. Only after a configurable wait time has elapsed is a notification even considered.
3. If no additional locations are enabled for the monitor, you're notified immediately.
4. If locations are enabled but haven't been reachable for a while (no heartbeat), they're
   considered untrustworthy — you're also notified immediately in that case.
5. If at least one active, reachable location also reports "unreachable" during the same
   period, the problem is considered confirmed and you're notified.
6. If no active location reports a problem, no notification is triggered (yet).

You can adjust the wait time before a notification under 'Monitors > Settings > Uptime >
Notification settings' if the default feels too fast or too slow.

As soon as the website is reachable again from all responsible locations, you're notified about that too.


## What counts as downtime?

We classify downtime in two ways:

- If we receive anything other than an `HTTP/2xx` response code on the checked page, we consider the page unreachable.
Note that we follow `HTTP/301` and `HTTP/302` redirects. The final result of the redirect should be an `HTTP/2xx`.
- If we receive an `HTTP/2xx` response but can't find the optional check string specified on the website's "Settings" page, we consider the page unreachable.
- If the website takes longer than **5 seconds** to load, we consider it unreachable.

Any one of these events marks the page as unavailable.

For example, an `HTTP/204 No Content` response is also considered "online".


## Our locations

Our main location is in Frankfurt, Germany — every monitor is checked from there.

We also operate additional, independent locations that you can enable per monitor for confirmation under
'Monitors > Settings > Uptime > Locations'. If no additional location is enabled for a monitor, it's
checked exclusively from the main location.

You can see which locations are currently available directly in the monitor settings — the list keeps
growing, since both we and the community can register new locations.


### Adding locations
If you'd like to suggest another location, or provide one yourself, feel free to contact us.
Please read the information under [Providing locations for Sitealarm](/api/self-hosted-location.html).
