const protocol = require('./protocol');

module.exports = () => {
    return new Promise((resolve, reject) => {
		let body = {
			app_id: 'blM1T09mWjRhQXlZbE1ML21xbkM3QT09'
		};

		protocol.post(protocol.API.app_id, body).then(data => {
			if (!(data instanceof Array)) reject(data);
			if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
			protocol.setAppID(data[0].app_id);
			resolve(protocol.APP_ID);
		}, err => {
			reject(err);
		});
	})
}
