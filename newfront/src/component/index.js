import React from 'react'
import HomePage from "./homepage";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Switch,Route,BrowserRouter,Redirect} from 'react-router-dom'
import MainPage from "./mainpage";
import Schedule from './schedule'
import Donation from "./donation";
import DisplayForm from '../donation/Component/addDonation'
import DashBoard from "./dashboard";
import BusinessList from './businesslisting'
import SignUp from './signup'
import BusinessFullPage from '../business/components/businessFullPage'
import StudentSignUpPage from '../students/components/signUpPage'
import StudentDonation from '../donation/Component/studentDonation'
import BusinessProfile from '../business/components/businessProfile'
import StudentProfile from '../students/components/studentProfile';
import AcceptSignupRequest from '../students/components/AcceptSignupRequest';

class Main extends React.Component {
    render() {
        const logout=()=>{
            window.location="/"
                localStorage.removeItem('user');
        };
       const availability=()=> (
            <div>
                Comming Soon...
            </div>

        )
        const aboutUs=()=> (
            <div>
                Comming Soon...
            </div>

        )
       const contactUs=()=> (
            <div>
                Comming Soon...
            </div>

        )
        const fundRaisingIdea=()=> (
            <div>
                Comming Soon...
            </div>

        )
        const payment=()=> (
            <div>
                Comming Soon...
            </div>

        )

        const Private = ({...props}) => {
            return localStorage.getItem('user')?   <div>
                    <MainPage/>  <Route {...props}/></div> :
                    <Redirect to="/"/>
        };
        const Public = ({...props}) => {

            return !localStorage.getItem('user')?
                <div><Route {...props}/></div>:
                    <Redirect to="/home"/>

        };
        const about=()=>(
            <div>
                new
            </div>
        );
        return (
            <BrowserRouter>
                <Switch>
                    <Private exact path="/logout" component={logout} />
                    <Public exact path="/" component={HomePage}/>
                    <Private exact path="/availability" component={availability}/>

                    <Private exact path="/payment" component={payment}/>
                    <Public exact path="/aboutus" component={aboutUs}/>

                    <Public exact path="/contactus" component={contactUs}/>
                    <Public exact path="/fundideas" component={fundRaisingIdea}/>

                    <Public exact path="/main/businessSignUp" component={BusinessFullPage}/>
                    <Public exact path="/main/studentSignUp" component={StudentSignUpPage}/>
                    <Private exact path="/main/schedule" component={Schedule}/>
                    <Private exact path="/main/donation" component={Donation}/>
                    <Private exact path="/main/studentdonation" component={StudentDonation}/>
                    <Private exact path="/home" component={BusinessList}/>

                    <Private exact path="/dashboard" component={DashBoard}/>
                      <Private exact path="/main/requests" component={AcceptSignupRequest}/>

                    <Private exact path="/viewProfile" component={BusinessProfile}/>
                    <Private exact path="/editProfile" component={BusinessProfile}/>

                    <Private exact path="/viewStudentProfile" component={StudentProfile}/>
                    <Private exact path="/editStudentProfile" component={StudentProfile}/>

                </Switch>
            </BrowserRouter>
        );
    }
}
export default(Main)