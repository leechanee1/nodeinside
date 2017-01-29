# nodeinside
nodeinside는 Node.js용 디시인사이드 비공식 API 모듈입니다. GoLang 으로 제작된 [goinside (by geeksbaek)](https://github.com/geeksbaek/goinside)에서 착안되어 만들어졌고, 일부 구조를 참조하였습니다.

##안내
> 해당 모듈은 개인적으로 사용하기 위해 만들어졌기 때문에 특별한 경우가 아니라면 **추가적인 기능 업데이트는 이루어지지 않습니다**.

##설치
```
# 김청하 솔로대박 기원
$ npm install --save nodeinside

// 이후 아래와 같이 모듈을 불러와 사용합니다.
let nodeinside = require('nodeinside');
nodeinside.init().then(() => { /* do */ });
```

##기능
nodeinside의 모든 method는 **Promise**를 반환합니다.
동기적으로 사용하려면 **co** 모듈을 사용하세요.

###로그인 세션
```
nodeinside.session.login(user_id, user_pw);
// user_id - 디시인사이드 아이디
// user_pw - 디시인사이드 비밀번호
```

###게스트 세션
```
nodeinside.session.guest(guest_nickname, article_pw);
// guest_nickname - 사용할 유동닉 이름
// article_pw - 게시글에 사용할 비밀번호
```

###갤러리(글 목록) 조회
```
nodeinside.gallery.read(gall_id, page);
// gall_id - 갤러리 고유 아이디(ex: chungha)
// page - 조회할 페이지 (기본값 1)
```

###게시글 내용 조회
```
nodeinside.article.read(gall_id, article_no);
// gall_id - 갤러리 고유 아이디(ex: chungha)
// article_no - 게시글 번호
```

###게시글 상세 정보 조회
```
nodeinside.article.detail(gall_id, article_no);
// gall_id - 갤러리 고유 아이디(ex: chungha)
// article_no - 게시글 번호
```

###게시글 이미지 정보 조회
```
nodeinside.article.images(gall_id, article_no);
// gall_id - 갤러리 고유 아이디(ex: chungha)
// article_no - 게시글 번호
```

###게시글 작성
```
nodeinside.article.write(session, gall_id, subject, content);
// session - 세션 정보가 담긴 Object
// gall_id - 갤러리 고유 아이디(ex: chungha)
// subject - 게시글 제목
// content - 본문 내용. 기본적으로 String형으로 입력받고, Array 타입으로 입력하면 게시글 문단 별로 작성됨. Array에 이미지 경로 입력 시 이미지 첨부됨.
// ['문단 1', './img/test.jpg', '문단 2']
```

###게시글 삭제
```
nodeinside.article.del(session, gall_id, article_no);
// session - 세션 정보가 담긴 Object
// gall_id - 갤러리 고유 아이디(ex: chungha)
// article_no - 게시글 번호
```

###덧글 조회
```
nodeinside.comment.read(gall_id, article_no, page);
// gall_id - 갤러리 고유 아이디(ex: chungha)
// article_no - 게시글 번호
// page - 덧글 페이지 번호. 생략 시 기본값 1
```

###덧글 작성
```
nodeinside.comment.write(session, gall_id, article_no, memo);
// session - 세션 정보가 담긴 Object
// gall_id - 갤러리 고유 아이디(ex: chungha)
// article_no - 게시글 번호
// memo - 덧글 내용
```

###디씨콘 작성
```
nodeinside.comment.dccon(session, gall_id, article_no, package_idx, detail_idx);
// session - 세션 정보가 담긴 Object
// gall_id - 갤러리 고유 아이디(ex: chungha)
// article_no - 게시글 번호
// package_idx - 디씨콘 package_idx
// detail_idx - 디씨콘 detail_idx
// 구매 및 사용기한이 남은 디씨콘이어야 합니다.
```

###보이스리플 작성
```
nodeinside.comment.voice(session, gall_id, article_no, audio);
// session - 세션 정보가 담긴 Object
// gall_id - 갤러리 고유 아이디(ex: chungha)
// article_no - 게시글 번호
// audio - 보이스리플로 업로드 할 음성파일 경로 (30초)
```

##Licence
MIT
