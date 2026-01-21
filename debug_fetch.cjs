
const https = require('https');

https.get('https://anichinv2.icu/?id=v6q7v4r', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(data);
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
