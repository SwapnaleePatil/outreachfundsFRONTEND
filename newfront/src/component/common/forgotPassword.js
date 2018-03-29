import React, {Component} from 'react';
import {Table, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../../index.css'
import {StudentUpdatePassword} from '../../action/common'

class StudentForgotPassword extends Component {
    constructor(){
        super();
        this.state={
            password:"",
            conformpassword:""
        }
    }
    componentDidMount(){
        console.log('Email : ',this.props.match.params.email);

    }
    onChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
    };
    Submit=()=>{
        if(this.state.password===this.state.conformpassword){
            if(this.state.password.length > 8){
                this.props.StudentUpdatePassword(this.state.password,this.state.email);
                this.props.history.push('/');
            }
            else
            {
                alert('Password must be of more than 8 characters.');
            }
        }
        else
        {
            alert('Password does not matched');
        }
    };
    render() {
        return (
            <div>
                <h1>Forgot Password ?</h1>
                <div className="dv">
                    <center><div>
                        <input type="password" className="inputtext" id="password" placeholder="Password" onChange={(e)=>{
                            this.onChange(e)
                        }}/></div>
                    <div>
                        <input type="password" id="conformpassword" className="inputtext" placeholder="Conform Password" onChange={(e)=>{
                            this.onChange(e)
                        }}/>
                    </div></center>
                    <center><div>
                        <button onClick={(e)=>{this.Submit()}} style={{width:"150px",height:"60px"}}>Update Password</button>
                    </div></center>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {

    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        StudentUpdatePassword
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(StudentForgotPassword)