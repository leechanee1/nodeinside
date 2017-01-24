const protocol = require('./protocol');

let login = (user_id, user_pw) => {
	return new Promise((resolve, reject) => {
		let body = {
			user_id,
			user_pw
		};

		protocol.post(protocol.API.login, body).then(data => {
			if (!(data instanceof Array)) reject(data);
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
