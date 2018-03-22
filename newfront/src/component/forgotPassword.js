import React, {Component} from 'react';
import {Table, FormControl, Button} from 'react-bootstrap'
import '../index.css'

class ForgotPassword extends Component {
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

export default ForgotPassword