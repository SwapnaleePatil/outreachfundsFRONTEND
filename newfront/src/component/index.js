import React from 'react'
import HomePage from "./homepage";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Switch,Route,BrowserRouter,Redirect} from 'react-router-dom'
import MainPage from "./mainpage";
import Schedule from './schedule'
import Donation from "./donation";
import StudentSignUp from "../students/components/signUpPage";


class Main extends React.Component {
    render() {

        const Private = ({...props}) => {

            return this.props.studentlogin.user?   <div>
                        <Route {...props}/></div> :
                    <Redirect to="/"/>
        };
        const Public = ({...props}) => {

            return !this.props.studentlogin.user ?
                <div> <MainPage/>  <Route {...props}/></div>:
                    <Redirect to="/home"/>

        };
        const about=()=>(
            <div>
                new
            </div>
        )

        return (
            <BrowserRouter>
                <Switch>
                    <Public exact path="/" component={HomePage}/>
                    <Public exact path="/main/studentSignup" component={StudentSignUp}/>
                    <Public exact path="/main/schedule" component={Schedule}/>
                    <Public exact path="/main/donation" component={Donation}/>
                    <Public exact path="/home" component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
const mapStateToProps=(state)=>{
    return state;
};
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({},dispatch)
};
export default connect(mapStateToProps,mapDispatchToProps)(Main)