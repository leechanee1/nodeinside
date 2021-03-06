const protocol = require('./protocol');

let login = (user_id, user_pw) => {
	return new Promise((resolve, reject) => {
		let body = {
			user_id,
			user_pw
		};

		protocol.post(protocol.API.login, body).then(data => {
			if (!(data instanceof Array)) reject(data);
			if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
			data[0].type = 'login';
			resolve(data[0]);
		}, err => {
			reject(err);
		});
	})
};

let guest = (name, password) => {
	return new Promise(resolve => {
		let result = {
			type: 'guest',
			name,
			password
		}

		resolve(result);
	})
};

module.exports = {
	login,
	guest
};
