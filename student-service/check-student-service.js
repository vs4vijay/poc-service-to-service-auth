#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const axios = require('axios');

let CONFIG = {
    api_url: process.env.API_URL || 'https://localhost:4000',
    cert: process.env.SSL_CERT || fs.readFileSync('../ca2/client-cert.pem'),
    key: process.env.SSL_KEY || fs.readFileSync('../ca2/client-key.pem'),
    ca: [ process.env.SSL_CA_CERT || fs.readFileSync('../ca1/ca-cert.pem') ]
};


// CONFIG = {
//     api_url: process.env.API_URL || 'https://vmagpelbdv01-751592261.ap-southeast-1.elb.amazonaws.com/albms-dev1/',
//     ca: process.env.SSL_CA_CERT || fs.readFileSync('../certs/qa.cer')
// };


const agent = new https.Agent({ 
    cert: CONFIG['cert'],
    key: CONFIG['key'],
    ca: CONFIG['ca'], // Only passing CA cert is necessary
});

try {
    axios.get(CONFIG['api_url'], { httpsAgent: agent })
         .then(data => {
            console.log('data', data.data);
         })
} catch (error) {
    console.error('error', error);
}

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