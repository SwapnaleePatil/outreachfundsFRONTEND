import studentlogin from './studentlogin'
import businesslogin from './businesslogin'
import {combineReducers} from 'redux'
import signupPageReducer from '../students/reducers/reducer-signUpPaging';
import signupPageFieldsReducer from '../students/reducers/reducer-signup-fields';
const rootreducer=combineReducers({
    businesslogin,studentlogin,
    signupPage:signupPageReducer,
    signupPageFields:signupPageFieldsReducer
});
export default rootreducer;
