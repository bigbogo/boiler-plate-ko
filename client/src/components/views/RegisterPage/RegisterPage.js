import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { registerUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  //Dispatch 를 통해서 action을 날림
  const dispatch = useDispatch();

  //서버에 보내기 전에 state 에 가지고 있음.
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  

  const onEmailHandler = (event) => {
      setEmail(event.currentTarget.value)
  }
  
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
      // 로그인 버튼 클릭시 refresh를 막아주기위해
      event.preventDefault();

      if(Password !== ConfirmPassword){
        return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
      }
      
      let body = {
          email: Email,
          name: Name,
          password: Password
      }

      // ※Redux Data Flow
      //   ACTION(user_action.js) -------> REDUCER(user_reducer.js) -------> STORE(Redux DevTools 크롬 확장프로그램 state 확인가능)  
      //      ↑                                                                                         ↓
      //      └------------- dispatch(action) --------- react Component <--------  Subscribe  ----------┘
    
      dispatch(registerUser(body))
        .then(response => {
            
            if(response.payload.success) {
                // 회원가입 성공시
                props.history.push('/login')  // history.push 를 사용하려면 react-router-dom 을 import 해서 쓰는거로 바뀜 withRouter()
            }else{
                alert('Failed to sign up !!!')
            }
        })
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br/>
        <button>
            회원가입
        </button>

      </form>
      
  </div>
  )
}

export default withRouter(RegisterPage)