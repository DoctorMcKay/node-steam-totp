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

## generateAuthCode(secret[, timeOffset])
- `secret` - Your `shared_secret`, as a `Buffer`, hex string, or base64 string
- `timeOffset` - If you know your clock's offset from the Steam servers, you can provide it here. This number of seconds will be added to the current time to produce the final time. Default 0.

Returns your current 5-character alphanumeric TOTP code as a string.
