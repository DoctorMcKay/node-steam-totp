# Steam TOTP
[![npm version](https://img.shields.io/npm/v/steam-totp.svg)](https://npmjs.com/package/steam-totp)
[![npm downloads](https://img.shields.io/npm/dm/steam-totp.svg)](https://npmjs.com/package/steam-totp)
[![license](https://img.shields.io/npm/l/steam-totp.svg)](https://github.com/DoctorMcKay/node-steam-totp/blob/master/LICENSE)
[![paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=N36YVAT42CZ4G&item_name=node%2dsteam%2dtotp&currency_code=USD)

This lightweight module generates Steam-style 5-digit alphanumeric two-factor authentication codes given a shared secret.

Usage is simple:

```js
var SteamTotp = require('steam-totp');
var code = SteamTotp.generateAuthCode('cnOgv/KdpLoP6Nbh0GMkXkPXALQ=');
```

## time([timeOffset])
- `timeOffset` - Default 0 if omitted. This many seconds will be added to the returned value.

**v1.2.0 or later is required to use this function**

Simply returns the current local time in Unix time. This is just `Math.floor(Date.now() / 1000) + timeOffset`.

## getAuthCode(secret[, timeOffset])
- `secret` - Your `shared_secret`, as a `Buffer`, hex string, or base64 string
- `timeOffset` - If you know your clock's offset from the Steam servers, you can provide it here. This number of seconds will be added to the current time to produce the final time. Default 0.

Returns your current 5-character alphanumeric TOTP code as a string.

*Alias: generateAuthCode(secret[, timeOffset])*

## getConfirmationKey(identitySecret, time, tag)
- `identitySecret` - Your `identity_secret`, as a `Buffer`, hex string, or base64 string
- `time` - The Unix time for which you are generating this secret. Generally should be the current time.
- `tag` - The tag which identifies what this request (and therefore key) will be for. "conf" to load the confirmations page, "details" to load details about a trade, "allow" to confirm a trade, "cancel" to cancel it.

**v1.1.0 or later is required to use this function**

Returns a string containing your base64 confirmation key for use with the mobile confirmations web page.

*Alias: generateConfirmationKey(identitySecret, time, tag)*

## getTimeOffset(callback)
- `callback` - Called when the request completes
    - `offset` - The time offset in seconds
    - `latency` - The time in milliseconds between when we sent the request and when we received a response

**v1.2.0 or later is required to use this function**

Queries the Steam servers for their time, then subtracts our local time from it to get our offset.

The offset is how many seconds we are **behind** Steam. Therefore, **add** this number to our local time to get Steam time.

You can pass this value to `time()` or to `getAuthCode()` as-is with no math involved.
