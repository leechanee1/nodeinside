const protocol = require('./protocol');
const fs       = require('fs');

let read = (gall_id, article_no) => {
	return new Promise((resolve, reject) => {
		let body = {
			id: gall_id,
			no: article_no
		};

		protocol.get(protocol.API.article.read, body).then(data => {
			if (!(data instanceof Array)) reject(data);
			if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
			resolve(data[0]);
		}, err => {
			reject(err);
		});
	})
};

let detail = (gall_id, article_no) => {
	return new Promise((resolve, reject) => {
		let body = {
			id: gall_id,
			no: article_no
		}

		protocol.get(protocol.API.article.detail, body).then(data => {
			if (!(data instanceof Array)) reject(data);
			if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
			resolve(data[0]);
		}, err => {
			reject(err);
		});
	})
};

let images = (gall_id, article_no) => {
	return new Promise((resolve, reject) => {
		let body = {
			id: gall_id,
			no: article_no
		}

		protocol.get(protocol.API.article.images, body).then(data => {
			if (!(data instanceof Array)) reject(data);
			if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
			resolve(data);
		}, err => {
			reject(err);
		});
	})
};

let write = (session, gall_id, subject, content) => {
	return new Promise((resolve, reject) => {
		let body = {
			mode: 'write',
			id: gall_id,
			subject,
		};

		if (typeof content === 'string') {
			body['memo_block[0]'] = content;
		} else if (content instanceof Array && content.length > 0) {
			let image_idx = 0;
			for (let i = 0; i < content.length; i++) {
				// 파일명이 포함되어있다면
				if (/.(jp(?:e|)g|gif|png)$/i.test(content[i])) {
					// 이미지 스트림 가져와서 넣어줌
					body[`upload[${image_idx++}]`] = fs.createReadStream(content[i]);
					body[`memo_block[${i}]`] = `Dc_App_Img_${image_idx}`;
				} else {
					// 그냥 내용이라면
					body[`memo_block[${i}]`] = content[i];
				}
			}
		}

		if (session.type === 'login') {
			body.user_id = session.user_id;
		} else if (session.type === 'guest') {
			body.name = session.name;
			body.password = session.password;
		}

		protocol.post(protocol.API.article.write, body).then(data => {
			if (!(data instanceof Array)) reject(data);
			if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
			resolve(data[0]);
		}, err => {
			reject(err);
		});
	})
};

let del = (session, gall_id, article_no) => {
	return new Promise((resolve, reject) => {
		let body = {
			mode: 'board_del',
			id: gall_id,
			no: article_no,
		};

		if (session.type === 'login') {
			body.user_id = session.user_id;
		} else if (session.type === 'guest') {
			body.write_pw = session.password;
		}

		protocol.post(protocol.API.article.del, body).then(data => {
			if (!(data instanceof Array)) reject(data);
			if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
			resolve(data[0]);
		}, err => {
			reject(err);
		});
	})
};

module.exports = {
	read,
	detail,
	images,
	write,
	del
}
