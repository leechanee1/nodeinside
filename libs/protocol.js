'use strict';

let request  = require('request');
let qs       = require('querystring').stringify;
let toBase64 = str => new Buffer(str).toString('base64');
let toOption = obj => Object.assign(obj, {
	headers,
	json: true,
	gzip: true
});

let APP_ID = '';
const API    = require('./api-protocol');
const headers = {
	'User-Agent': "dcinside.app",
	'Referer': "http://m.dcinside.com",
	'Accept-Encoding': 'gzip, deflate',
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

let setAppID = app_id => APP_ID = app_id;

let post = (api, body) => {
	if (!APP_ID && api !== API.app_id) throw 'app_id is missing. run nodeinside() first.';
	if (api !== API.app_id) body.app_id = APP_ID;
	let option = toOption({
		url: api,
		headers,
		formData: body
	});
	return new Promise((resolve, reject) => {
		request.post(option, (err, res, body) => {
			if (err) reject(err);
			if (typeof body === 'string') {
				body = body.replace(/\s{1,}/g, ' ');
				body = body.replace(/\r\n/g, ' ');
				body = JSON.parse(body);
			}
			resolve(body);
		});
	});
};

let get = (api, body) => {
	if (!APP_ID) throw 'app_id is missing. run nodeinside() first.';
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
			resolve(body);
		});
	});
};

module.exports = {
	post,
	get,
	APP_ID,
	API,
	setAppID
};
