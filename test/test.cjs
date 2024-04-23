const geoip = require('../').default;

console.log(geoip('12.34.56.78'));

console.log(geoip.asn('12.34.56.78'));
