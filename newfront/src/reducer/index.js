import loginReducer from './reducer-login'
import {combineReducers} from 'redux'
import studentReducer from '../students/reducers/reducer-student';
import signupPageReducer from '../students/reducers/reducer-signUpPaging';
import signupPageFieldsReducer from '../students/reducers/reducer-signup-fields';
import requestReducer from '../students/reducers/reducer-request';
import schoolReducer from '../students/reducers/reducer-schools';
import businesslist from '../business/reducers/businessReducer'
import businessSignUpPageReducer from '../business/reducers/businessPage';
import businessFieldsReducer from '../business/reducers/businessFieldsReducer';
import donationReducer from './../donation/reducers/donationReducer';
import eventReducer from './../donation/reducers/eventReducer';
import getBusiness from './../donation/reducers/getBusinessId';
import studentLogged from '../donation/reducers/studentLogged';
import scheduleEventBySponser from './eventsponser'
import scheduleEvent from './scheduleevent'
const rootreducer=combineReducers({
    loginResponse:loginReducer,
    businesslist:businesslist,
    signupPage:signupPageReducer,
    signupPageFields:signupPageFieldsReducer,
    scheduleevent:scheduleEvent,
    eventsbysponser:scheduleEventBySponser,
    students:studentReducer,
    requests:requestReducer,
    schools:schoolReducer,
    businessSignUpRed:businessSignUpPageReducer,
    businessFieldsRed:businessFieldsReducer,
    donation:donationReducer,
    events:eventReducer,
    businessInfo:getBusiness,
    studentLogged:studentLogged
});

export default rootreducer;
