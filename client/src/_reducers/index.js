import { combineReducers } from "redux";
import user from './user_reducer';

// ※Redux Data Flow
//   ACTION(user_action.js) -------> REDUCER(user_reducer.js) -------> STORE(Redux DevTools 크롬 확장프로그램 state 확인가능)  
//      ↑                                                                                         ↓
//      └------------- dispatch(action) --------- react Component <--------  Subscribe  ----------┘

const rootReducer = combineReducers({
    user
})

export default rootReducer