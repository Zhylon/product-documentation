# SSL Certificates

For every monitor reachable over `https://`, Sitealarm automatically monitors your website's SSL certificate. You don't need to set up anything extra: as soon as you create an HTTPS monitor, certificate monitoring is enabled right along with it.

SSL certificates are a **Pro feature** (included from the Pro plan onward, not available on the Free plan).

[Domain verification](domain-verification.html) is **not** required for this – the check happens via a single, publicly accessible connection attempt and therefore runs independently of your domain's verification status.


## What gets checked?

Sitealarm establishes a TLS connection to your domain (port 443, with SNI) and reads the certificate presented during that handshake. We capture:

- **Validity period** (`valid from` / `valid to`)
- **Issuer** (e.g. "Let's Encrypt")
- **Additional domains** (Subject Alternative Names / SAN list)
- **Use of SHA1** as the signature algorithm (deprecated and insecure – shown as a warning)
- A **hash** of the certificate, which Sitealarm uses to detect whether the certificate has changed since the last check (e.g. after a renewal)

**Important to know:** Currently, we don't check whether the certificate can be traced back to a trusted certificate authority (chain of trust). A self-signed or otherwise untrusted certificate is therefore not automatically flagged as "invalid", as long as the expiry date and domain match are correct. This check is currently in progress.

Whether the domain name stored in the certificate (including wildcard domains like `*.example.com`) actually matches your monitor is checked and factors into the "valid"/"invalid" status.


## How often is it checked?

By default, Sitealarm checks every certificate **once a day**. If a certificate has already expired, it's instead rechecked **every hour**, so a renewal is detected as quickly as possible.


## Notifications about problems

You're notified by email when:
- the certificate **expires within the next 14 days** ("will expire soon"), or
- the certificate **has already expired**.

This 14-day threshold is currently fixed and isn't configurable per monitor or per plan.

**Note:** There's currently no throttling of these notifications – as long as a certificate is within the 14-day window or has already expired, you may receive another email on every recheck (i.e. up to once a day before expiry, up to once an hour after expiry). No separate confirmation email is sent when a certificate is renewed in time – the status simply switches back to "valid" in that case.

Certificate notifications are currently sent **exclusively via email**. Other channels such as Slack, Microsoft Teams, Discord, or webhook, which are otherwise available for monitors, aren't currently supported for SSL certificates.


## Viewing certificate data

On your monitor's detail page you'll find (for HTTPS monitors) a dedicated "Certificate" tab with:
- Status badge ("Valid"/"Invalid")
- Days remaining until expiry, color-coded (green: more than 14 days, yellow: 14 days or fewer, red: already expired)
- Issuer, validity period, SHA1 warning, additional domains, hash, and time of the last check

If the certificate has changed since the last check (e.g. due to a renewal), Sitealarm also shows you the **previous certificate** for comparison.

In the monitor overview, the certificate status is also shown as a compact badge per monitor.


## Enabling/disabling

Certificate monitoring can be toggled on and off via the corresponding switch in the monitor settings. It's automatically enabled as soon as a monitor is created with `https://` as its scheme, and automatically disabled when a monitor no longer runs over HTTPS.


## Access via the API

A monitor's certificate data can be retrieved via a dedicated endpoint:

```
GET /api/v2/monitors/{monitorId}/certificate
```

The response contains a `current` block and, if available, a `previous` block, each with `valid_from`, `valid_to`, `issuer`, `uses_sha1_hash`, `alt_domains`, `hash`, `last_check`, `is_healthy`, and a live-computed `days_until_expiry`.
