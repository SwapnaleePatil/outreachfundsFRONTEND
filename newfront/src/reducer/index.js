import studentlogin from './studentlogin'
import businesslogin from './businesslogin'
import {combineReducers} from 'redux'
import studentReducer from '../students/reducers/reducer-student';
import signupPageReducer from '../students/reducers/reducer-signUpPaging';
import signupPageFieldsReducer from '../students/reducers/reducer-signup-fields';
import requestReducer from '../students/reducers/reducer-request';
import schoolReducer from '../students/reducers/reducer-schools';
import businesslist from '../business/reducers/businessReducer'
import businessSignUpPageReducer from '../business/reducers/businessPage';
import businessFieldsReducer from '../business/reducers/businessFieldsReducer';
import scheduleEvent from './scheduleevent'
const rootreducer=combineReducers({
    blogin:businesslogin,
    slogin:studentlogin,
    businesslist:businesslist,
    signupPage:signupPageReducer,
    signupPageFields:signupPageFieldsReducer,
    scheduleevent:scheduleEvent,
    students:studentReducer,
    requests:requestReducer,
    schools:schoolReducer,
    businessSignUpRed:businessSignUpPageReducer,
    businessFieldsRed:businessFieldsReducer
});

export default rootreducer;
