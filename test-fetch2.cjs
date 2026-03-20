const https = require('https');

https.get('https://schwesterherz.netlify.app/images/Foot_care_03.jpg', (res) => {
  let data = [];
  res.on('data', (chunk) => {
    data.push(chunk);
  });
  res.on('end', () => {
    const buffer = Buffer.concat(data);
    console.log(buffer.slice(0, 10));
  });
}).on('error', (e) => {
  console.error(e);
});
