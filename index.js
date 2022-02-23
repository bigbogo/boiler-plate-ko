const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded 이 정보를 가져올수 있게
app.use(bodyParser.urlencoded({extended: true}));

//application/json 이 정보를 가져올수 있게
app.use(bodyParser.json());

// mongoDB연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sch:k23456@boilerplate.erva9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))


// 실행시 npm install로 express 모듈 다운로드 -> 다운로드 완료하면 package.json 에 dependencies 에 자동 추가가 됨
//npm install express --save

//npm run start

// 실행시 npm install로 mongoose 모듈 다운로드 -> 다운로드 완료하면 package.json 에 dependencies 에 자동 추가가 됨 (mongodb 모듈)
//npm install mongoose --save


// 간단한 hello world 라우터
app.get('/', (req, res) => {
  res.send('Hello World!~~ 안녕 하세요')
})


// 라우터는 /register
app.post('/register', (req, res) => {
  // 회원 가입할때 필요한 정보들을 client에서 가져오면 그 정보를 데이터에 넣어준다
  const user = new User(req.body) // req.body에 json 형태의 정보들 - bodyparser가 json형태로 만들어줌

  user.save((err, doc) => {
    if(err) return res.json({ success: false, message: err.message})
    return res.status(200).json({ 
      success: true
    })
  }) //

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})