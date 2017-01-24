const protocol = require('./protocol');

let read = (gall_id, page = 1) => {
	return new Promise((resolve, reject) => {
		let body = {
			id : gall_id,
			page
		};

		protocol.get(protocol.API.gallery.read, body).then(data => {
			if (!(data instanceof Array)) reject(data);
			if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
			resolve(data[0]);
		}, err => {
			reject(err);
		});
	})
};

module.exports = {
	read
};
