# Domain Verification

## What does verification confirm?

Domain verification confirms that you're the owner of a domain. To do this, you add a
TXT record to your DNS settings:

```
zhylon-verification=<your-token>
```

The token is unique per domain and can be copied from the overview under **Domain Verification**. The
check runs automatically every few hours, or manually via "Recheck".

Important: verification only confirms ownership. It doesn't override any crawling rules of the
target domain (see [robots.txt](#robots-txt-always-applies) below) and isn't a general prerequisite for
all checks.

## Which checks require verification?

| Check                                      | Verification required? | Reason                                                                          |
|---------------------------------------------|----------------------|--------------------------------------------------------------------------------|
| [Uptime](monitoring.html)                   | No                    | Single, publicly accessible request with no notable server load                |
| [SSL certificate](certificates.html)        | No                    | Single, publicly accessible request                                            |
| [App health](app-health.html)               | No                    | Authentication happens via its own secret, not via domain ownership            |
| [Broken links](broken-links.html)           | Yes                   | Deep crawl across multiple pages of the domain                                 |
| [Mixed content](mixed-content.html)         | Yes                   | Deep crawl across multiple pages of the domain                                 |
| Sitemap check                               | Yes                   | Deep crawl across multiple pages of the domain                                 |

Uptime and SSL certificate checks therefore run immediately after creating a monitor, regardless of the
domain's verification status.

Broken links, mixed content, and the sitemap check are currently still under construction ("Coming soon")
and don't yet run automatically. Once these checks go live, the verification requirement will apply
automatically — domains that are already verified won't need to take any further action.

## robots.txt always applies

For all deep-crawl checks, Sitealarm strictly respects the target domain's robots.txt, regardless of
verification status. Verification only confirms ownership — it doesn't override the target server's
crawl rules.

- Sitealarm crawls with its own, clearly identifiable user agent.
- A specified `Crawl-delay` is honored.
- robots.txt is cached for 24 hours.
- If robots.txt is unreachable, we act conservatively: we assume a delay between requests instead of
  crawling without restriction.
- A `Disallow: /` (a complete crawl ban) is not bypassed — not even for a verified domain.

If a deep-crawl check is blocked by robots.txt, we show this as its own notice on the monitor. This is
deliberately different from "domain not verified": the former is an external restriction imposed by the
target server that we don't bypass; the latter you can resolve yourself by adding the DNS TXT record.
