// 이전 State(스테잇) 과 action object를 받은 후에 nextState 를 return 한다.
// Reducer는 pure function 이기에 reducer 내부에서 하지 말아야할것들이 있다.
// 예) (previousState, action) => nextState    // 이전state, action 으로 nextState 로 만드는 것
// 초반에는 확실히 redux 가 Running pub 가 높음..

// ※Redux Data Flow
//   ACTION(user_action.js) -------> REDUCER(user_reducer.js) -------> STORE(Redux DevTools 크롬 확장프로그램 state 확인가능)  
//      ↑                                                                                         ↓
//      └------------- dispatch(action) --------- react Component <--------  Subscribe  ----------┘

import { 
    LOGIN_USER
} from '../_actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {    // 이전state, action 으로 nextState 로 만드는 것
    // 다른 타입이 올때마다 처리를 해줘야해서 switch 사용
    switch (action.type) {
        // 타입이 login_user 일 경우
        case LOGIN_USER:
            
            return {...state, loginSuccess: action.payload }   // backend서버 에서 넘어온 action.payload
            // Spread Opertor(스프레드 오퍼레이터, 스프레드 연산자)
            /* {...state} Spread Opertor Array
                var arr1 = [1, 2, 3, 4, 5]; 
                var arr2 = [...arr1, 6, 7, 8, 9]; 
                console.log(arr2); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
            */
            break;
    
        default:
            return state;
    }
}