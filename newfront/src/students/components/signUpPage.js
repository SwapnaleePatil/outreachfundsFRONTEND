import React from 'react';
import '../../index.css'
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
        return(
            <div className="registration-school-class">
                {(this.props.signUpPage===1)?<SignUpPersonal history={this.props.history}/>:<span></span>}
                {(this.props.signUpPage===2)?<SignUpSchool history={this.props.history}/>:<span></span>}
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