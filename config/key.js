/*
local 환경 development 와 deploy(배포)한 후 cloud 서비스 이용해서 개발을 할 수 있다.
이 두 가지 경우를 따로 생각해야 한다.
local 환경의 development 모드는 위 작성한 dev.js에서 변수를 가져갈 수 있다.
그런데 deploy 후 HEROKU 서비스를 이용한다고 하면 따로 몽고 uri 값을 주고 dev.js가 아니라 
HEROKU 사이트에 직접 입력해 줘야 한다.
*/
console.log("key.js process.env.NODE_ENV : " + process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production'){  // NODE_ENV는 환경변수이다. 두가지 모드 판별
    module.exports = require('./prod');  // prod.js에서 가져온다
}else{
    module.exports = require('./dev');
}