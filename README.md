# Steam TOTP

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
