const protocol = require('./protocol');
const fs       = require('fs');

let read = (gall_id, article_no, page = 1) => {
    return new Promise((resolve, reject) => {
        let body = {
            id: gall_id,
            no: article_no,
            re_page: page
        }

        protocol.get(protocol.API.comment.read, body).then(data => {
            if (!(data instanceof Array)) reject(data);
            if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
            resolve(data[0]);
        }, err => {
            reject(err);
        });
    })
};

let write = (session, gall_id, article_no, memo, detail_idx) => {
    return new Promise((resolve, reject) => {
        let body = {
            mode: 'comment',
            id: gall_id,
            no: article_no,
            comment_memo: memo,
            detail_idx
        };

        if (session.type === 'login') {
            body.user_id = session.user_id;
        } else if (session.type === 'guest') {
            body.comment_nick = session.name;
            body.comment_pw = session.password;
            body.mode = 'comment_nonmember';
        }

        protocol.post(protocol.API.comment.write, body).then(data => {
            if (!(data instanceof Array)) reject(data);
            if (data[0].hasOwnProperty('result') && JSON.parse(data[0].result.toString().toLowerCase()) === false) reject(data[0]);
            resolve(data[0]);
        }, err => {
            reject(err);
        });
    });
}

let dccon = (session, gall_id, article_no, package_idx, detail_idx) => {
    return new Promise((resolve, reject) => {
        let body = {
            type: 'insert',
			user_id: session.user_id,
			package_idx,
			detail_idx
        };

        protocol.post(protocol.API.comment.dccon, body).then(data => {
            if (data.hasOwnProperty('result') && data.result !== 'ok') reject(data);
            resolve(write(session, gall_id, article_no, data.img_tag, detail_idx));
        }, err => {
			reject(err);
		});
    });
};

let voice = (session, gall_id, article_no, audio) => {
	return new Promise((resolve, reject) => {
		let zf = num => {
			let t = num + '';
			return t.length < 2 && (t = '0' + t), t
		};
		let now = new Date();
		let d = now.getFullYear() + zf(now.getMonth() + 1) + zf(now.getDate()) + zf(now.getHours()) + zf(now.getMinutes()) + zf(now.getSeconds());
		let body = {
			best_comno: 'undefined',
			reg_time: '',
			app_version: '1.0.4',
			user_no: session.user_no,
			gall_id,
			comment_nick_encode: session.name,
			file_name: `${d}_Vc_${article_no}_0.mp3`,
			board_id: session.user_id,
			url: `http://m.dcinside.com/view.php?id=${gall_id}&no=${article_no}`,
			best_comid: 'undefined',
			gall_no: article_no,
			ip: '',
			comment_txt: '',
			write_type: '1',
			best_chk: '',
			title: '',
			ukey: '',
			name: session.name,
			gall_name: '@|1',
			comment_nick: session.name,
			di_code: '',
			upfile: fs.createReadStream(audio)
		};

		protocol.post(protocol.API.comment.voice, body).then(data => {
            data = JSON.parse(data.match(/({.+})/)[0].toLowerCase());
            console.log(data);
            if (data.hasOwnProperty('result') && data.result === false) reject(data);
            resolve(data);
        }, err => {
            reject(err);
        });
	});
};

module.exports = {
    read,
    write,
    dccon,
    voice
};
