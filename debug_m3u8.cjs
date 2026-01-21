
const fetch = require('node-fetch'); // might not be available, using https instead
const https = require('https');

const options = {
    hostname: 'anichinv2.icu',
    path: '/z/v6q7v4r.m3u8',
    method: 'GET',
    headers: {
        'Referer': 'https://anichinv2.icu/?id=v6q7v4r',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.on('data', (chunk) => {
        // console.log(`BODY: ${chunk.toString().substring(0, 100)}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();
