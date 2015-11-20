var Crypto = require('crypto');

/**
 * Generate a Steam-style TOTP authentication code.
 * @param {Buffer|string} secret - Your TOTP shared_secret as a Buffer, hex, or base64
 * @param {number} [timeOffset=0] - If you know how far off your clock is from the Steam servers, put the offset here in seconds
 * @returns {string}
 */
exports.generateAuthCode = function(secret, timeOffset) {
	secret = bufferizeSecret(secret);

	var time = Math.floor(Date.now() / 1000) + (timeOffset || 0);

	var buffer = new Buffer(8);
	buffer.writeUInt32BE(0, 0); // This will stop working in 2038!
	buffer.writeUInt32BE(Math.floor(time / 30), 4);

	var hmac = Crypto.createHmac('sha1', secret);
	hmac = hmac.update(buffer).digest();

	var start = hmac[19] & 0x0F;
	hmac = hmac.slice(start, start + 4);

	var fullcode = hmac.readUInt32BE() & 0x7fffffff;

	var chars = '23456789BCDFGHJKMNPQRTVWXY';

	var code = '';
	for(var i = 0; i < 5; i++) {
		code += chars.charAt(fullcode % chars.length);
		fullcode /= chars.length;
	}

	return code;
};

function bufferizeSecret(secret) {
	if(typeof secret === 'string') {
		// Check if it's hex
		if(secret.match(/[0-9a-f]{40}/i)) {
			return new Buffer(secret, 'hex');
		} else {
			// Looks like it's base64
			return new Buffer(secret, 'base64');
		}
	}

	return secret;
}
