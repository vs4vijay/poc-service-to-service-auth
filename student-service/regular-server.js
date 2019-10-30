#!/usr/bin/env node

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => { 
	console.log('Request');
	res.send({message: 'Hello World!'});
});

app.listen(PORT, () => console.log(`Aplication running on port ${PORT}`))
