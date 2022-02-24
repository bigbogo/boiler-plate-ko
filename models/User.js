const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // API문서 확인 -> https://www.npmjs.com/package/bcrypt
const saltRounds = 10 //salt(몇글자인지 10자리)를 이용해서 비밀번호를 암호화

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

const User = mongoose.model('User', userSchema)

module.exports = {User}