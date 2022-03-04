// auth.js 미들웨어

// User 모델을 불러온다
const { User } = require('../models/User');

let auth = (req, res, next) => {  // req, res 콜백 만들어주고
    // 인증처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다. index.js에서 저장시에 토큰을 x_auth 에 저장했으니 거기서 꺼낸다
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다, User 모델에서 findByToken 만들어 주고 사용 (userSchema.statics.findByToken)
    User.findByToken(token, (err, user) =>{   // err, user 콜백을 줬었죠
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})  // user가 없다면 클라이언트에 json형식으로 어센티케이션 false 고 error가 있다고 전달

        // token 과 user 정보를 auth 미들웨어 에서 사용할수 있게 넣어줌
        req.token = token;
        req.user = user;

        // next 해주는 이유는 index.js에 > app.get('/api/users/auth', auth,~ ) 미들웨어에서 넘어 갈수있게
        next();
    })  

    // 유저가 있으면 인증 Okay

    // 유저가 없으면 인증 No !

}

// auth를 다른파일에도 사용할수 있게 exports 해줌
module.exports = { auth };
