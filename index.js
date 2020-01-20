const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const app = express();

const isRelease = process.env.RELEASE === "prod";
const sslKeys = process.env.SSL_KEYS && JSON.parse(process.env.SSL_KEYS);
const port = isRelease? (sslKeys? 443 : 80) : 3000;
const options = sslKeys && {
    key: fs.readFileSync(sslKeys.key, 'utf8'),
    cert: fs.readFileSync(sslKeys.cert, 'utf8'),
};
const server = isRelease? https.createServer(options, express()) : http.createServer(express());

app
	.set('view engine', 'ejs')
	.use('/app_res', express.static(path.join(__dirname, '/app_res')))
	.use('/.well-known', express.static(path.join(__dirname, '/.well-known')))
	.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, '/index.html'));
	})
	.listen(port, () => {
		console.log('Starting Server...');
		console.log('HTTPS:', sslKeys? 'on' : 'off');
		console.log('Deploy:', isRelease? 'release' : 'develop');
		console.log('Start on port:', port);
		if(sslKeys) console.log('SSL_KEYS', options)
	});