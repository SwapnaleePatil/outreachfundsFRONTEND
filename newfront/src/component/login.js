import React from 'react'
import {Table,FormControl,Button} from 'react-bootstrap'
import '../index.css'
class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        }
    }
    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    };
    onPassChange = (e) => {
        this.setState({
            password: e.target.value
        })
    };
    loginuser = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        };
    };

    render(){
        return(
            <div className="outerlog">
                <div className="loginp">

                    <Table bordered>
                        <tbody>
                        <tr>
                            <td align="center">
                                <h3>Student Login</h3>
                                <span className="errorm">{this.state.emessage}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Enter Email</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl type="text" name="email" onChange={this.onEmailChange} placeholder="Enter Email Id" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4> Enter Password</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl type="password" name="password" onChange={this.onPassChange} placeholder="Enter Password"/>

                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" className="lbtn">
                                <Button className="lbtn" bsStyle="info" onClick={this.loginuser} >Login</Button>

                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                Or
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <h3>  <a href="">Sign Up</a></h3>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
export default Login