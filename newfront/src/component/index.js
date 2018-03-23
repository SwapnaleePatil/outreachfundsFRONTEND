import React from 'react'
import HomePage from "./homepage";
import AboutUs from '../publicComponents/aboutUs';
import {Navbar, NavItem, NavDropdown, Nav, MenuItem, Carousel} from 'react-bootstrap';
import Payment from '../publicComponents/payment';
import ContactUs from '../publicComponents/contactUs';
import Availability from '../publicComponents/availability';
import FundRaisingIdea from '../publicComponents/fundRaisingIdea';
import {Switch,BrowserRouter} from 'react-router-dom'
import Schedule from './schedule'
import Donation from "./donation";
import Private from './Routes/privateRoute';
import Public from './Routes/publicRoutes';
import DashBoard from "./dashboard";
import BusinessList from './businesslisting'
import BusinessFullPage from '../business/components/businessFullPage'
import StudentSignUpPage from '../students/components/signUpPage'
import StudentDonation from '../donation/Component/studentDonation'
import BusinessProfile from '../business/components/businessProfile'
import StudentProfile from '../students/components/studentProfile';
import AcceptSignupRequest from '../students/components/AcceptSignupRequest';
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
                    <Public exact path="/aboutus" component={AboutUs}/>
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

                    <Private exact path="/viewProfile" component={BusinessProfile}/>
                    <Private exact path="/editProfile" component={BusinessProfile}/>
                    <Private exact path="/availability" component={Availability}/>
                    <Private exact path="/payment" component={Payment}/>
                    <Private exact path="/viewStudentProfile" component={StudentProfile}/>
                    <Private exact path="/editStudentProfile" component={StudentProfile}/>
                    <Public exact path="/studentforgotPassword/:email" component={StudentForgotPassword}/>
                    <Public exact path="/businessforgotPassword/:email" component={BusinessForgotPassword}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default(Main)