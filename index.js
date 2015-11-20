var Crypto = require('crypto');

/**
 * Generate a Steam-style TOTP authentication code.
 * @param {Buffer} secret - Your TOTP shared_secret
 * @param {number} [timeOffset=0] - If you know how far off your clock is from the Steam servers, put the offset here in seconds
 * @returns {string}
 */
exports.generateAuthCode = function(secret, timeOffset) {
	var time = Math.floor(Date.now() / 1000) + (timeOffset || 0);

	var buffer = new Buffer(8);
	buffer.writeUInt32BE(0, 0); // This will stop working in 2038!
	buffer.writeUInt32BE(Math.floor(time / 30), 4);

	var hmac = require('crypto').createHmac('sha1', secret);
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
