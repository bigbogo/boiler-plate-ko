import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {

    // option=> null:아무나 접근 가능, true : 로그인한 유저만 접근가능, false : 로그인한 유저는 접근 불가능한 페이지

    function AuthenticationCheck(props){

        const dispatch =useDispatch();

        /*
        useEffect 자주쓰이는 용도중 하나가 백엔드에서의 작업을 요할때 많이 씁니다.
        현재 auth 부분에서  현재 유저가 올바른 토큰을 가지고 있는 사람인지를 체크해서 잘 갖고 있다면 인증이 된 사람, 인증이 되지 않은 사람을 분류해주는 
        기능을 하는데 올바른 토큰을 가지고 있는지 체크를 할떄 데이터 베이스를 확인을 해야합니다.
        그래서 useEffect를 통해서 request를 백엔드에 날려야 하기때문에  auth에서는 useEffect를 사용한것
        */
        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                //로그인 하지 않은 상태 false
                if(!response.payload.isAuth){
                    if(option) {
                        // option이 true 일 경우
                        props.history.push('/login')
                    }
                }else{ // 로그인한 상태 true
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false)
                        props.history.push('/')
                    }
                }
            })

            
        }, [])
        
        return (
            //다른 파일에서 만들어진 컴포넌트를 Import 해와서 사용할때는 항상 <컴포넌트 이름 />으로 해주셔야 사용가능
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}