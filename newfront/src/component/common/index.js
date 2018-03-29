import React from 'react'
import HomePage from "./homepage";
import {Navbar, NavItem, NavDropdown, Nav, MenuItem, Carousel} from 'react-bootstrap';
import Search from '../publicComponents/search';
import ContactUs from '../publicComponents/contactUs';
import Availability from '../publicComponents/availability';
import FundRaisingIdea from '../publicComponents/fundRaisingIdea';
import {Switch,BrowserRouter,Redirect} from 'react-router-dom'
import Schedule from './schedule'
import Donation from "./donation";
import Private from '../Routes/privateRoute';
import Public from '../Routes/publicRoutes';
import DashBoard from "./dashboard";
import BusinessList from './businesslisting'
import BusinessFullPage from '../business/businessFullPage'
import StudentSignUpPage from '../student/signUpPage'
import StudentDonation from '../donation/studentDonation'
import BusinessProfile from '../business/businessProfile'
import StudentProfile from '../student/studentProfile';
import AcceptSignupRequest from '../student/AcceptSignupRequest';
import StudentForgotPassword from './forgotPassword'
import BusinessForgotPassword from './businessforgotPassword'

class Main extends React.Component {

    render() {
        const logout=()=>{
                localStorage.removeItem('user');
        };

        return (
            <BrowserRouter>
                <Switch>

                    <Public exact path="/" component={HomePage}/>
                    <Public exact path="/contactus" component={ContactUs}/>
                    <Public exact path="/fundideas" component={FundRaisingIdea}/>
                    <Public exact path="/businessSignUp" component={BusinessFullPage}/>
                    <Public exact path="/studentSignUp" component={StudentSignUpPage}/>
                    <Private exact path="/main" component={BusinessList}/>
                    <Private exact path="/main/schedule" component={Schedule}/>
                    <Private exact path="/main/donation" component={Donation}/>
                    <Private exact path="/main/studentdonation" component={StudentDonation}/>
                    <Private exact path="/dashboard" component={DashBoard}/>
                    <Private exact path="/main/requests" component={AcceptSignupRequest}/>
                    <Private exact path="/search" component={Search}/>
                    <Private exact path="/viewProfile" component={BusinessProfile}/>
                    <Private exact path="/editProfile" component={BusinessProfile}/>
                    <Private exact path="/availability" component={Availability}/>
                    <Private exact path="/viewStudentProfile" component={StudentProfile}/>
                    <Private exact path="/editStudentProfile" component={StudentProfile}/>
                    <Public exact path="/studentforgotPassword/:email" component={StudentForgotPassword}/>
                    <Public exact path="/businessforgotPassword/:email" component={BusinessForgotPassword}/>
                    <Public exact path="*" component={HomePage}/>
                    <Private exact path="*" component={BusinessList}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default(Main)