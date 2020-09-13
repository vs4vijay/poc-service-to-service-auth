#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const axios = require('axios');
const request = require('request');
const rp = require('request-promise');

const CONFIG = {
    api_url: process.env.API_URL || 'https://localhost:4000',
    cert: process.env.SSL_CERT || fs.readFileSync('../ca2/client-cert.pem'),
    key: process.env.SSL_KEY || fs.readFileSync('../ca2/client-key.pem'),
    ca: [ process.env.SSL_CA_CERT || fs.readFileSync('../ca1/ca-cert.pem') ]
};

const agent = new https.Agent({ 
    cert: CONFIG['cert'],
    key: CONFIG['key'],
    ca: CONFIG['ca']
});

// console.log(CONFIG);

// Using Axios
try {
    axios.get(CONFIG['api_url'], { httpsAgent: agent })
         .then(data => {
            console.log('data from axios', data.data);
         })
} catch (error) {
    console.error('error', error);
}

// Using request
rp.get(CONFIG['api_url'], { agent: agent })
    .then(data => {
        console.log('data from request', data);
    });



// Using native https.request
// var options = { 
//     hostname: 'localhost', 
//     port: 4000, 
//     path: '/', 
//     method: 'GET', 
//     cert: CONFIG['cert'],
//     key: CONFIG['key'],
//     ca: CONFIG['ca'],
// }; 
// var req = https.request(options, function(res) { 
//     res.on('data', function(data) { 
//         process.stdout.write(data); 
//     }); 
// }); 
// req.end();