import studentlogin from './studentlogin'
import businesslogin from './businesslogin'
import {combineReducers} from 'redux'
const rootreducer=combineReducers({businesslogin,studentlogin});
export default rootreducer;
