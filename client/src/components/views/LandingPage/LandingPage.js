import React,{ useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

  useEffect(() => {


    /*
    backend 서버로 요청을 보내는데 Cors 정책 제한이 있음.
    Cors 가 타사이트들에서 내 backend서버에 요청을 보내면 보안적 문제가 있으므로 client 쪽에서만 proxy 서버 설정을 마치고 CORS 문제를 해결
    https://create-react-app.dev/docs/proxying-api-requests-in-development/

    백엔드에서  설정을 해서 CORS 문제를 해결할 때는 cors라는 모듈이 있는데 그걸 백엔드에 설치한 후에  
    특정 url에서 오는 요청은 허락을 해줄수가 있습니다
    */
    //axios.get('http://localhost:5000/api/hello')
    axios.get('/api/hello')  // get request를 서버로 보낸다. endpoint는 /api/hello
    .then(response => console.log(response.data))

  }, [])

  const onClickHandler = () => {
    axios.get('/api/users/logout')
        .then(response => {
            console.log(response.data)
            if(response.data.success){
              props.history.push("/login")     // history.push 를 사용하려면 react-router-dom 을 import 해서 쓰는거로 바뀜 withRouter()
            }else{
              alert('로그아웃 실패!')
            }
        })            
  }

  return (
    <div sytle={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height:'100vh'
    }}>
        <h2>시작 페이지</h2>
        
        <button onClick={onClickHandler}>
          로그아웃
        </button>
    </div>
  )
}

export default withRouter(LandingPage)