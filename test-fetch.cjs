const https = require('https');

https.get('https://schwesterherz.netlify.app/images/Foot_care_03.jpg', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error(e);
});
