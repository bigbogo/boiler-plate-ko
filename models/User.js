const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // API문서 확인 -> https://www.npmjs.com/package/bcrypt
const saltRounds = 10 //salt(몇글자인지 10자리)를 이용해서 비밀번호를 암호화

const jwt = require('jsonwebtoken');  // jsonwebtoken 을 사용

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


// index.js 실행시 user.save 수행하기 전에 실행되는 로직
userSchema.pre('save', function( next ){
    
    var user = this; //userSchema를 가져와서

    //비밀번호를 바꿀때만 암호화를 해야해서 조건 추가
    if(user.isModified('password')){

        //비밀번호를 암호화 시키자
        bcrypt.genSalt(saltRounds, function(err, salt){ // callback function
            
            if(err) return next(err)   // error가 발생하면 user.save로 보낸다

            bcrypt.hash(user.password, salt, function(err, hash){ //암호화 해준다
                if(err) return next(err)  // error가 발생하면 user.save로 보낸다

                user.password = hash  // 암호화된 패스워드값
                next()
            })
        })
    }else{
        // 비밀번호를 바꾸는것이 아닌 다른 정보를 바꿀경우에
        next()
    }
})


// index.js에 비밀번호 체크를 User.js 모델에서 만들자
userSchema.methods.comparePassword = function(plainPassword, cb) {
    //비밀번호를 비교할때 plainPassword(입력된패스워드) 와 암호화된 비밀번호($2b$10$t6FqzLFiRVntMF21OPh4yekWnL1czIrfAzTCbi3LZa/NzB1GIkXh2) 를 체크
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err) // 리턴 cb(콜백) 에러
        cb(null, isMatch)  // 에러는 없고, isMatch는 true 비밀번호가 맞으면 
    })
}


userSchema.methods.generateToken = function(cb) {
    var user = this;
    
    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')  // mongodb 의 _id를 넣어주자, secretToken 은 아무 단어 넣어주면됨 

    // 위에 userSchema 에 token에 넣어준다 tokenExp 는 나중에 하자
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}



userSchema.statics.findByToken = function( token, cb) {
    var user = this;

    // 토큰을 디코드 한다, 토큰을 만들었던 이름 : secretToken
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
         // findOne은 몽고DB에 있는 메소드임. findOne찾기 _id 와 token 을 찾는데
        user.findOne({"_id": decoded, "token": token}, function(err, user){  
            if (err) return cb(err);  // 에러가 있으면 cd 콜백 err 를 리턴
            cb(null, user)        // 없으면 user
        }) 

    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User}