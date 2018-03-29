import {combineReducers} from 'redux'

//Business
import businesslist from './business/businessReducer'
import newBusiness from './business/businessCrud'
import businessSignUpPageReducer from './business/businessPage';
import businessFieldsReducer from './business/businessFieldsReducer';
import loginuser from './business/loginUser';

//Student
import studentReducer from './student/reducer-student';
import signupPageReducer from './student/reducer-signUpPaging';
import signupPageFieldsReducer from './student/reducer-signup-fields';
import requestReducer from './student/reducer-request';
import schoolReducer from './student/reducer-schools';

//Donation
import donationReducer from './donation/donationReducer';
import eventReducer from './donation/eventReducer';
import getBusiness from './donation/getBusinessId';
import studentLogged from './donation/studentLogged';

//Common
import loginReducer from './common/reducer-login'
import scheduleEventBySponser from './common/eventsponser'
import scheduleEvent from './common/scheduleevent'

const rootreducer = combineReducers({

    //business
    businesslist: businesslist,
    newBusiness: newBusiness,
    businessSignUpRed: businessSignUpPageReducer,
    businessFieldsRed: businessFieldsReducer,
    loginuser: loginuser,

    //student
    students: studentReducer,
    signupPage: signupPageReducer,
    signupPageFields: signupPageFieldsReducer,
    requests: requestReducer,
    schools: schoolReducer,

    //donation
    donation: donationReducer,
    events: eventReducer,
    businessInfo: getBusiness,
    studentLogged: studentLogged,

    //common
    loginResponse: loginReducer,
    scheduleevent: scheduleEvent,
    eventsbysponser: scheduleEventBySponser,


});

export default rootreducer;
