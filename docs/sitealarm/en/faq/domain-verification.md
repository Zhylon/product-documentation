# Domain Verification

To link your domain with your account, you need to verify it.
There are several methods you can use to verify your domain.

If your domain has not yet been verified, we check every **24 hours** whether your domain can be verified.
For newly created sites, we check every **15 minutes** whether the domain has been verified.

## DNS Verification

For DNS verification, you need to add a TXT record to your DNS settings.
This record is checked by us, and if it is correct, your domain will be verified.

The TXT record at your DNS provider must look like this:

```
zhylon-verification={your-verification-token}
```

## META Tag Verification

For META tag verification, you need to insert a META tag into the `<head>` section of your website.
This META tag is checked by us, and if it is correct, your domain will be verified.

The META tag must look like this:

```html
<meta name="zhylon-verification" content="{your-verification-token}">
```

## File Verification

For file verification, you need to place a file with a specific name and content on your web server.
This file is checked by us, and if it is correct, your domain will be verified.

The file must look like this:

```txt
zhylon-verification={your-verification-token}
```

You must place this file under the name `.well-known/zhylon-verification.txt` in the directory of your website.

## Deployment via Zhylon

If you have deployed your website via Zhylon, you can verify your domain directly through Zhylon.
For this, we recommend using our PHP package [zhylon/helpers](https://github.com/Zhylon/helpers).

You can use the existing functions to insert a meta tag into your HTML.
Once you have installed the package, you can use the `zhylon_verification_meta_tag()` function to generate the meta tag.

```php
echo __zhylon_verification_meta_tag();
```

This is especially useful if your site is reachable via multiple domains or is no longer deployed via Zhylon.
