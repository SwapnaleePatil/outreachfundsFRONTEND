import studentlogin from './studentlogin'
import businesslogin from './businesslogin'
import {combineReducers} from 'redux'
import studentReducer from '../students/reducers/reducer-student';
import signupPageReducer from '../students/reducers/reducer-signUpPaging';
import signupPageFieldsReducer from '../students/reducers/reducer-signup-fields';
import schoolReducer from '../students/reducers/reducer-schools';
const rootreducer=combineReducers({
    businesslogin,studentlogin,
    signupPage:signupPageReducer,
    signupPageFields:signupPageFieldsReducer,
    schools:schoolReducer,
    students:studentReducer
});
export default rootreducer;
