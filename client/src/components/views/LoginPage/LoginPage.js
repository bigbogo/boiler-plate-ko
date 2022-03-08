import React, { useState } from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux'
import { loginUser} from '../../../_actions/user_action';

function LoginPage(props) {

    //Dispatch 를 통해서 action을 날림
    const dispatch = useDispatch();

    //서버에 보내기 전에 state 에 가지고 있음.
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // 로그인 버튼 클릭시 refresh를 막아주기위해
        event.preventDefault();

        console.log('Email :', Email)
        console.log('Password :', Password)

        let body = {
            email: Email,
            password: Password
        }

        // ※Redux Data Flow
        //   ACTION(user_action.js) -------> REDUCER(user_reducer.js) -------> STORE(Redux DevTools 크롬 확장프로그램 state 확인가능)  
        //      ↑                                                                                         ↓
        //      └------------- dispatch(action) --------- react Component <--------  Subscribe  ----------┘

      
        dispatch(loginUser(body))
            .then(response => {
                
                if(response.payload.loginSuccess) {
                    // 로그인이 성공했을때 root 페이지로 이동시킨다. (root페이지 = LandingPage)
                    props.history.push('/')
                }else{
                    alert('Error!!!')
                }
            })

        // _actions 폴더에 만든다
        // 여기서 request action 할것을 _actions 폴더에 있는 user_action.js 에서 해주게 하자
        // backend 서버에 email 과 password를 보내준다
        // Axios.post('/api/users/login', body)
        //   .then(response => {
        //   })
  }

    return (
        <div sytle={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height:'100vh'
        }}>
          
            <form style={{  display: 'flex', flexDirection: 'column' }}
                    onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button>
                    Login
                </button>

            </form>
          
        </div>
    )
}

export default LoginPage