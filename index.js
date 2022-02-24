// MERN 스택은 Mongodb, Express.js, React.js, Node.js를 줄인 말로 아주 궁합이 좋은 풀스택인것, 네가지 요소를 사용하여 웹사이트를 개발하는 것
/*
MongoDB는 NoSQL DB이다.
NoSQL이라고 해서 SQL이 없는 데이터베이스가 아니라, 사실은 Not Only SQL 이다.
단순히 기존 RDBMS가 가지고 있는 특성들 뿐만 아니라,
새로운(?) 특성들을 추가적으로 지원한다는 것을 뜻한다.
또한 기본적으로 자바스크립트 문법
*/
/*
Express.js는 웹 프레임워크이다.
더 쉽게 말하자면 웹을 빠르게 개발할 수 있는 편리한, 다양한 도구들의
집합체
*/
/*
프론트엔드를 위해서 React.js를 사용, React JS 는 facebook에서 제공해주는 Front-End 라이브러리이다.
라이브러리 이므로, 웹을 만드는 데 꼭 필요한 도구들이 모두 기본적으로 제공되지는 않는다.
하지만 그만큼 가볍다.
또 React.js는 View단을 조작하는 라이브러리
*/
/*
Node.js는 구글 크롬의 자바스크립트 엔진에 기반해 만들어진 서버 사이드 플랫폼이다.
또한 Node.js 는 JavaScript의 runtime이다. 즉 JavaScript Program을
실행할 수 있게 도와준다.
Node.js는 이벤트기반, 논블로킹 I/O 모델을 사용해 가볍고 효율적
*/
// 백엔드를 위해서 node.js 사용, node js 나오기 전까지는 javascript를 브라우저 속에서만 썼었는데, 이제는 node.js나옴으로 인해
// 브라우저 외에 서버사이드에서도 사용할수 있다. javascript를 서버사이드에서 쓸수있게 되었다.
// node.js가, 자동차 엔진이라면 바퀴나 브레이크시스템 등(웹사이트나, 어플리케이션)을 쉽게 만들 수 있게 해주는 프레임워크(express.js)
const express = require('express') 
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");

const { use } = require('bcrypt/promises');

const config = require('./config/key');

//application/x-www-form-urlencoded 이 정보를 가져올수 있게
app.use(bodyParser.urlencoded({extended: true}));

//application/json 이 정보를 가져올수 있게
app.use(bodyParser.json());

app.use(cookieParser());

// mongoDB연결
const mongoose = require('mongoose');

mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))


// 실행시 npm install로 express 모듈 다운로드 -> 다운로드 완료하면 package.json 에 dependencies 에 자동 추가가 됨
//npm install express --save

//npm run start

// 실행시 npm install로 mongoose 모듈 다운로드 -> 다운로드 완료하면 package.json 에 dependencies 에 자동 추가가 됨 (mongodb 모듈)
//npm install mongoose --save


// 간단한 hello world 라우터
// npm run backend => nodemon으로 서버를 자동 재기동, 페이지 refresh 적용
// loaclhost:5000
app.get('/', (req, res) => {
  res.send('Hello World!~~ 안녕하세요 nodemon~~ !!')
})




// 라우터는 /register
app.post('/register', (req, res) => {
  // 회원 가입할때 필요한 정보들을 client에서 가져오면 그 정보를 데이터에 넣어준다
  const user = new User(req.body) // req.body를 모델에 넣자, req.body에 json 형태의 정보들 - bodyparser가 json형태로 만들어줌

  user.save((err, doc) => {
    if(err) return res.json({ success: false, message: err.message}) // 에러시 에러메시지를 return

    return res.status(200).json({
      success: true
    })
  }) //

})


/////// 로그인 기능
app.post('/login', (req, res) => {
  console.log("1")
    //요청한 이메일을 데이터베이스에서 있는지 찾는다
    //Mongodb 제공 메소드 이용(findOne)
    User.findOne({ email: req.body.email}, (err, user) => {
        if(!user) {
          return res.json({ 
            loginSuccess: false,
            message: "이메일에 해당하는 user가 없습니다."
          })
        }
        console.log("2")

    //요청한 이메일이 데이터베이스에 있으면, user에 담겨있겠지... 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password , (err, isMatch) => {
      console.log('err', err)
      console.log('isMatch', isMatch)
      if(!isMatch) //비밀번호가 틀리면
        return res.json({ loginSucess: false, message: "비밀번호가 틀렸습니다." }); 
      
        console.log("3")
      //비밀번호가 맞다면 토큰을 생성하기
        user.generateToken((err, user) => {
          if(err) return res.status(400).send(err);
          console.log("4")
        // 토큰을 저장한다. 쿠키 , 로컬스토리지 등에 저장
        res.cookie("x_auth", user.token)
        .status(200) // 성공했다
        .json({ loginSuccess: true, userId: user.id })

      })
    })
  })
})
    


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})