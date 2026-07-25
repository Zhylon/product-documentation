# Migration from other providers

If you are already using another provider to monitor your websites, you can easily migrate your websites to Sitealarm.
The best way to do this is by using the Sitealarm API.

On this page, we provide some examples of how you can migrate your websites from other providers to Sitealarm.

## UptimeRobot

To migrate from UptimeRobot to Sitealarm, you need an API key for each of your websites.
If you use Sitealarm as a team and are not the administrator, you will also need to know your team's ID.

To do this, simply download the following file:

Then you can run the file with the following command:

```bash
bash migrate-from-uptimerobot.sh
```

The history of your websites will not be migrated.

By default, the following checks are enabled:
- Monitoring
- Certificate check

Please note that certificate checking is only enabled for websites that start with `https://`.
For websites that start with `http://`, certificate checking is not enabled.

In addition, websites that already exist in Sitealarm are not migrated.
