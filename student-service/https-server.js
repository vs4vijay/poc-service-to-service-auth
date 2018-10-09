#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

const PORT = 3000;

const options = {
    key: fs.readFileSync('./certs/server-key.pem'),
    cert: fs.readFileSync('./certs/server-cert.pem'),
    requestCert: false,
    rejectUnauthorized: true
};


const server = https.createServer(options, app).listen(PORT, () => {
    console.log(`Aplication running on port ${PORT} with HTTPS`)
});

app.get('/', (req, res) => { 
	console.log('Request');
	res.send({message: 'Student Service from Secure Server!'});
});