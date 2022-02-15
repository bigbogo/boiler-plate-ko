const express = require('express')
const app = express()
const port = 5000

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

app.get('/', (req, res) => {
  res.send('Hello World!~~ 안녕 하세요')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})