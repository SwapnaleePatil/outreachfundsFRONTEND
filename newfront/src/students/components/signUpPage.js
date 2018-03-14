import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SignUpPersonal from './signUpPersonalDetail';
import SignUpSchool from './signUpSchoolDetail';
import {signupPageAction} from '../action';
class signUpPage extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        if(this.props.signUpPage===0)
            this.props.signupPageAction();
        }

    render(){
        debugger;
        console.log("Page : ",this.props.signUpPage);
        return(
            <div>
                {(this.props.signUpPage===1)?<SignUpPersonal/>:<span></span>}
                {(this.props.signUpPage===2)?<SignUpSchool/>:<span></span>}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return{
        signUpPage:state.signupPage
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        signupPageAction
    },dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(signUpPage);