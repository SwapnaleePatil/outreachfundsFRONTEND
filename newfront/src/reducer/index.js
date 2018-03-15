import studentlogin from './studentlogin'
import businesslogin from './businesslogin'
import {combineReducers} from 'redux'
import signupPageReducer from '../students/reducers/reducer-signUpPaging';
import signupPageFieldsReducer from '../students/reducers/reducer-signup-fields';
import businesslist from '../business/reducers/businessReducer'
import businessSignUpPageReducer from '../business/reducers/businessSignUpReducer';
import businessFieldsReducer from '../business/reducers/businessFieldsReducer';

const rootreducer=combineReducers({
    blogin:businesslogin,
    slogin:studentlogin,
    businesslist:businesslist,
    signupPage:signupPageReducer,
    signupPageFields:signupPageFieldsReducer,
    businessSignUpRed:businessSignUpPageReducer,
    businessFieldsRed:businessFieldsReducer
});

export default rootreducer;
