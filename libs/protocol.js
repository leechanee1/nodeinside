'use strict';

let request  = require('request');
let qs       = require('querystring').stringify;
let toBase64 = str => new Buffer(str).toString('base64');
let toOption = obj => Object.assign(obj, {
	HEADER,
	json: true,
	gzip: true
});

const APP_ID = 'dFdyNnU3V0pGL0UxUElnZlozTnZvUEJIMWZXREVGNEREWG44QzVQRGZxdz0=';
const API    = require('./api-protocol');
const headers = {
	'User-Agent': "dcinside.app",
	'Referer': "http://m.dcinside.com",
	'Accept-Encoding': 'gzip, deflate',
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

let post(api, body) => {
	body.app_id = APP_ID;
	// let params = `${api}?${qs(body)}`;
	// let url = `${API.redirect}?hash=${toBase64(params)}`;
	let option = toOption({
		url,
		headers,
		formData: body
	});
	return new Promise((resolve, reject) => {
		request.post(option, (err, res, body) => {
			if (err) reject(err);
			resolve(body, res);
		});
	});
};

let get(api, body) => {
	body.app_id = APP_ID;
	let params = `${api}?${qs(body)}`;
	let url = `${API.redirect}?hash=${toBase64(params)}`;
	let option = toOption({
		url,
		headers
	});
	return new Promise((resolve, reject) => {
		request.get(option, (err, res, body) => {
			if (err) reject(err);
			resolve(body, res);
		});
	});
};

module.exports = {
	post,
	get,
	APP_ID,
	API
};
