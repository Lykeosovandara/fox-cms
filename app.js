const fs = require('fs');
const caBundle = fs.readFileSync('./ca-certificate.crt', {encoding:'utf8'});
// const ca = caBundle.split('-----END CERTIFICATE-----\r\n') .map(cert => cert +'-----END CERTIFICATE-----\r\n');
// We had to remove one extra item that is present due to
// an extra line at the end of the file.
// This may or may not be needed depending on the formatting
// of your .ca-bundle file.
// ca.pop();
console.log(caBundle);