// ※Redux Data Flow
//   ACTION(user_action.js) -------> REDUCER(user_reducer.js) -------> STORE(Redux DevTools 크롬 확장프로그램 state 확인가능)  
//      ↑                                                                                         ↓
//      └------------- dispatch(action) --------- react Component <--------  Subscribe  ----------┘

import axios from 'axios';
import { 
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function loginUser(dataToSubmit){

    // LoginPage.js 에서 로그인 정보 body를 dataToSubmit 로 받아서, request 변수에 지정 (서버에서 받은 데이터를 request에 저장)
    const request = axios.post('/api/users/login', dataToSubmit)   // backend서버에 index.js  /api/users/login 보낸다
       .then(response => response.data )


    //return을 시켜서 reducer로 넘겨주는 작업
    return{
        type: LOGIN_USER,  // types.js 에서 가져오는 식으로 변경
        payload: request
    }
}


export function registerUser(dataToSubmit){

    const request = axios.post('/api/users/register', dataToSubmit)   // backend서버에 index.js  /api/users/register 로 보낸다
       .then(response => response.data )

    //return을 시켜서 reducer로 넘겨주는 작업
    return{
        type: REGISTER_USER,  // types.js 에서 가져오는 식으로 변경
        payload: request
    }
}