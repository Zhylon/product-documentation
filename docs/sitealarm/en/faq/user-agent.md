# User-Agent Policy

Sitealarm uses a **unique, product-specific User-Agent** for all HTTP requests.
This User-Agent serves transparency, better traceability in server logs, and
clear differentiation from generic or automated clients.


## Why we use our own User-Agent

A clearly defined User-Agent has several advantages:

* **Transparency for operators**: Anyone who sees requests in their logs can immediately recognize that the request comes from Sitealarm.
* **Support capability**: In case of questions or anomalies, Sitealarm can help faster based on the User-Agent.
* **Security & abuse handling**: Many systems filter or classify traffic based on the User-Agent. A dedicated User-Agent reduces misunderstandings and "false positives".
* **Operational quality**: Generic framework User-Agents (e.g. `python-httpx`, `GuzzleHttp`) say nothing about the origin. A clear User-Agent shows accountability.


## Current User-Agent

Sitealarm currently uses the following User-Agent:

```
Mozilla/5.0 (compatible; Sitealarm-UptimeMonitor/4.4; +https://sitealarm.app/docs)
```


### Meaning of the components

* `Mozilla/5.0 (compatible; … )`
  Historically established, widely used convention for identifying non-interactive clients. This does **not** mean that a browser is being used.

* `Sitealarm-UptimeMonitor/4.4`
  Product name (Sitealarm) + module/function (UptimeMonitor) + version.

* `+https://docs.sitealarm.app/`
  Reference to this documentation. It explains how this works and possible edge cases.


## Transition period during changes (rollouts)

When the User-Agent changes (e.g. renaming, versioning), there may be a transition period during which
**multiple User-Agent variants occur in parallel**.<br>
Reason: rollouts are **not** carried out simultaneously across all systems.

During this period, both variants are valid and functional. Once the rollout
is complete, only the current variant will be used.


## Which requests Sitealarm typically sends

Sitealarm performs different HTTP checks depending on the feature. Typical examples:

* **Uptime Monitoring**: Fetching the homepage or health endpoint
* **HTTP Status Checks**: Checking for 200/3xx/4xx/5xx
* **TLS/SSL Checks** (if active): Connecting to the target host for certificate verification

**Important:** Sitealarm does not attempt to disguise itself as a browser. The User-Agent
is deliberately recognizable as Sitealarm.


## Recommendations for operators


### 1) Handling Sitealarm in firewalls / WAFs

If you want to allow Sitealarm, we recommend **allowing it based on the User-Agent**
(or alternatively via IP/allowlisting, if you use fixed IPs).

Example (pseudo rule):

* Allow: User-Agent contains `Sitealarm-UptimeMonitor`

**Note:** The User-Agent is not a cryptographic identity. It is a transparency
and governance signal. For high-security setups, we additionally recommend:

* API key/token
* IP allowlisting (if available)
* Mutual TLS (if offered)
* Your own auth mechanisms on health endpoints


### 2) Rate limits

Sitealarm sends requests at defined intervals. If rate limits are active, make
sure that monitoring requests are not unexpectedly blocked (e.g. `429 Too Many Requests`).
If rate limits are required, we recommend a separate limit for monitoring/health endpoints.


### 3) Logging

We recommend marking Sitealarm traffic in your logs, e.g. by filtering by User-Agent.
This makes later analysis easier ("was that a real user or monitoring?").


## Troubleshooting

### "We see requests from Sitealarm, is this a bot/attack?"

If the User-Agent contains `Sitealarm` and references this documentation, it is
usually **monitoring traffic** (e.g. uptime checks). Please check:

* The URL/endpoint being checked
* Frequency/interval
* HTTP status codes

If you are unsure, contact us via the support channels listed on `sitealarm.app`.

### "Why do we see multiple User-Agents?"

This is typically a rollout effect. During transition periods, older
and newer variants can occur in parallel.

### "Can I block Sitealarm?"

Yes. If you do not want external monitoring, you can block requests based on the
User-Agent. Please note: monitoring/alerts will then no longer work as expected.

### "We use a WAF that blocks monitoring"

If your WAF blocks unusual requests, check:

* whether your WAF handles `HEAD` or `GET` restrictively
* whether bot rules block "unknown UA"
* whether rate limits are being triggered

Recommendation:

* Exception/allowlist for `Sitealarm-UptimeMonitor`
* If necessary, separate the monitoring endpoint (`/health`, `/status`)

---


## Alternative User-Agents

Depending on the product or module used, Sitealarm may use different User-Agents.
All variants are clearly recognizable as Sitealarm and reference the documentation.


### Overview

| Product / Module      | Example User-Agent                                                                    |
|-----------------------|----------------------------------------------------------------------------------------|
| **General**           | `Mozilla/5.0 (compatible; Sitealarm-UptimeMonitor/4.4; +https://sitealarm.app/docs)`   |
| **Uptime Check**      | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; uptime-monitor)` |
| **SSL Certificate**   | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; ssl-check)`      |
| **App Health**        | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; app-health')`    |
| **Sitemap Check**     | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; sitemap-check)`  |
| **Monitor Import**    | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; monitor-import)` |
| **Webhooks**          | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; webhook)`        |
| **Mixed Content**     | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; mixed-content)`  |
| **Broken links**      | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; broken-links)`   |
| **SMS Notifications** | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; notify-sms)`     |
| **Robots.txt Check**  | `Mozilla/5.0 (compatible; Sitealarm/4.4; +https://sitealarm.app/docs; robots)`         |
| **Future modules**    | `Mozilla/5.0 (compatible; Sitealarm/<Version>; +https://sitealarm.app/docs) <module>`  |

---


### Allowlisting

Depending on your security requirements, there are two recommended approaches:


#### Option 1: Allow all Sitealarm modules (recommended)

Automatically allows all current and future Sitealarm checks.

* **Criterion:** User-Agent contains `Sitealarm`
* Advantage: no adjustments needed for new modules

#### Option 2: Allow only individual modules

Allows specific functions only (e.g. only uptime monitoring).

* **Criterion:** exact or partial match on the respective module,
  e.g. `Sitealarm-UptimeMonitor`
* Advantage: maximum control
* Disadvantage: adjustment needed when new modules are used

---


### Notes

* All Sitealarm User-Agents are **product-specific**, **versioned**, and **not generic**.
* Sitealarm does **not** use framework User-Agents (e.g. `curl`, `python-httpx`, `GuzzleHttp`).
* Changes or new modules are documented.

---


## Changes to this policy

This User-Agent policy may evolve over time. Changes will be documented
and (for relevant transitions) announced in advance.
