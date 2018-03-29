import React from 'react'
import {Navbar, NavItem, NavDropdown, Nav, MenuItem, Carousel} from 'react-bootstrap'
import {Table, FormControl, Button} from 'react-bootstrap'
import axios from 'axios';
import axiosI from '../../services/axiosInstance';
import galary from './galary'
import {businessLogin} from '../../action/common'
import {studentLogin} from '../../action/common'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import '../../index.css'
import Modal from 'react-modal'
import {NavLink} from 'react-router-dom'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            isActive: false,
            isSActive:false,
            isRole: false,
            role: "",
            sisRole:false,
            srole:'',
            error:{},
            loginResponse:''
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({loginResponse:nextProps.loginResponse},()=> {
            let {error} = this.state;
                if (this.state.loginResponse.hasOwnProperty('data')&&this.state.loginResponse.data.message === "login failed") {
                    error.password = "invalid Email Or Password"
                }
                else {
                    error.password = "";
                }
                this.setState({error});
             }
        );
        if(nextProps.loginResponse.hasOwnProperty('data')) {
            debugger;
            if (nextProps.loginResponse.data.message === 'login successful') {
                localStorage.setItem('user', nextProps.loginResponse.data.token);
                this.props.history.push('/main');
            }
        }
    }
    onEmailChange = (e) => {
        let {error}=this.state;
        error.email="";
        this.setState({
            email: e.target.value
        });
        let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.edu$/;
        if (this.state.role === "student") {
            if (!re.test(e.target.value)) {
                error.email = "Enter Valid Email";
            }
            else {
                error.email="";
            }
        } else {
            re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!re.test(e.target.value)) {
                error.email = "Enter Valid Email";
            }
            else {
                error.email="";
            }
        }
        this.setState({error})

    };
    onPassChange = (e) => {
        // message = ""
        this.setState({
            password: e.target.value
        });
        // e.target.value.length < 6 ? message = "password should be greater than 6 character" : message = "";
    };
    loginstudent = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.studentLogin(data);
    };
    //Forgot Password
    forgotPassword=()=>{

        if(this.state.email.length===0){
            this.unsuccess("Please enter your Email ID...");
        }
        else if(this.state.role==='business')
        {
            axiosI.post('businessforgotPassword',{'email':this.state.email}).then((response)=>{
                console.log('response is : ',response.data);
                if(response.data === "failed"){
                    //alert('Invalid Email...');
                    this.unsuccess("Invalid Email...");
                }
                else
                {
                    // alert('Message Sent...');
                    this.success("Email Sent...");
                }
                // this.props.history.push(`/businessforgotPassword/${this.state.email}`);
            }).catch((err)=>{
                console.log(err);
            })
        }
        else
        {
            axiosI.post('studentforgotPassword',{'email':this.state.email}).then((response)=>{
                console.log('response is : ',response);
                if(response.data === "failed"){
                    //alert('Invalid Email...');
                    this.unsuccess("Invalid Email...");
                }
                else
                {
                    // alert('Message Sent...');
                    this.success("Email Sent...");
                }
                //this.props.history.push(`/studentforgotPassword/${this.state.email}`);
            }).catch((err)=>{
                console.log(err);
            })
        }
    };
    //Forgot Password
    success=(msg)=>{
        //e.preventDefault();
        Alert.success(msg, {
            position: 'top-right',
            effect: 'scale',
            beep: true,
            timeout: 1500,
            offset: 100
        });
    };
    //Forgot Password
    unsuccess=(msg)=>{
        // e.preventDefault();
        Alert.error(msg,{
            position:'top-right',
            effect:'bouncyflip',
            beep:true,
            timeout:1500,
            offset:100
        })
    }
    loginbusiness = () => {
        let {error}=this.state;
        let data = {
            username: this.state.email,
            password: this.state.password
        };
        this.props.businessLogin(data);
        
    };
    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    };
    toggleRole = () => {
        this.setState({
            error:{},
            isRole: !this.state.isRole
        })
    };
    toggleSRole = () => {
        this.setState({
            sisRole: !this.state.sisRole
        })
    };
    handleSignup=(role)=>{
        if(role==='student')
            this.props.history.push('/studentSignUp');
        else
            this.props.history.push('/businessSignUp');
    }
    googleLogin=()=>{
        alert('gmail login');
        axios.get('/auth/google').then((res) => {
            // console.log(res.data);
            this.props.history.push('/disp');
        }).catch((e) => {
            console.log(`Error : ${e.message}`);
        });
    }
    render() {
        let {error}=this.state;
        return (
            <section>
                <div>

                    {/*modal for decide role of the user at logintime*/}
                    <Modal isOpen={this.state.isRole} ariaHideApp={true} onRequestClose={this.toggleRole}
                           className="role-class">
                        <Table bordered>
                            <tbody>
                            <tr>
                                <td align="center">
                                    <Button bsSize="large" className="rolebtn" type="button" value="student"
                                            onClick={() => {
                                                this.setState({
                                                    isRole: false,
                                                    role: "student"
                                                });
                                                this.toggleModal()
                                            }}>I am Student</Button>
                                </td>
                                <td>
                                    <Button bsSize="large" className="rolebtn" type="button" value="business"
                                            onClick={() => {
                                                this.setState({
                                                    isRole: false,
                                                    role: "business"
                                                });
                                                this.toggleModal()
                                            }}>I am Business Person</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Modal>
                    {/*modal for login*/}
                    <Modal isOpen={this.state.isActive}  ariaHideApp={false} style={{
                        content:{
                            paddingTop: '.5%',
                        paddingBottom: '1%',
                        marginTop: '5%',
                        marginLeft: '35%',
                        marginRight: '35%',

                        backgroundColor: '#EDEFF7'
                        },
                        overlay:{

                        }
                    }}>
                        <Table>
                            <tbody>
                            <tr>
                                <td align="right">
                                    <a onClick={this.toggleModal}>X</a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center">{
                                    this.state.role === "business" ? <h3>Business Login</h3> :
                                        <h3>Student Login</h3>
                                }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>Enter Email</h4>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FormControl type="text" name="email" onChange={this.onEmailChange}
                                                 placeholder="Enter Email Id"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {error.email && <span style={{"color": "red"}}>{error.email}</span>}
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
                                    <FormControl type="password" name="password" onChange={this.onPassChange}
                                                 placeholder="Enter Password"/>
                                    {error.password && <span style={{"color": "red"}}>{error.password}</span>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a onClick={()=>{this.forgotPassword()}}>Forgot Password?</a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" className="lbtn">
                                    {this.state.role === "student" ?
                                        <Button className="lbtn" bsStyle="info"
                                                onClick={this.loginstudent}>Login</Button> :
                                        <Button className="lbtn" bsStyle="info"
                                                onClick={this.loginbusiness}>Login</Button>
                                    }
                                    <a href="http://localhost:3005/auth/google" className="btn btn-block btn-social btn-google" >
                                        <span className="fa fa-google"></span> Google
                                    </a>



                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    Or
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <h3 onClick={()=>{this.state.role === "student" ?this.handleSignup('student'):this.handleSignup('business')}}>
                                        <NavLink to={''}>Sign Up</NavLink></h3>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Modal>
{/*sign up pages*/}

                    <div>

                        <Modal isOpen={this.state.sisRole} ariaHideApp={true} onRequestClose={this.toggleSRole}
                               className="role-class">
                            <Table bordered>
                                <tbody>
                                <tr>
                                    <td align="center">
                                        <Button bsSize="large" className="rolebtn" type="button" value="student"
                                                onClick={() => {
                                                   this.props.history.push("/studentSignUp")
                                                }}>I am Student</Button>
                                    </td>
                                    <td>
                                        <Button bsSize="large" className="rolebtn" type="button" value="business"
                                                onClick={() => {
                                                    this.props.history.push("/businessSignUp")
                                                }}>I am Business Person</Button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Modal>

                    </div>
                    {/*header menu bar*/}
                    <div>
                        <Navbar bsStyle="tabs" fluid={true} staticTop={true} className="navbar-class">
                            <Navbar.Header className="imgnav">

                                <NavLink to={'/'}><img src={require('../../images/logo2.png')}
                                              style={{width: 150, height: 100}} alt=""/></NavLink>
                            </Navbar.Header>
                            <Nav pullRight>
                                <NavItem className="navclassa" eventKey={1} href="#" onClick={this.toggleSRole}>
                                    SignUp
                                </NavItem>
                                <NavItem eventKey={2} className="navclassa" onClick={this.toggleRole}>
                                    Login
                                </NavItem>
                            </Nav>
                        </Navbar></div>
                    <div className="carosel-class">
                        <Carousel interval={2000}>
                            <Carousel.Item>
                                <img width={1500} height={500} alt="1550x300" src={require('../../images/school.png')}/>
                                <Carousel.Caption>
                                    <h3>Student Fund Rising</h3>

                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={1500} height={500} alt="900x500" src={require("../../images/carosoul1.jpg")}/>
                                <Carousel.Caption>
                                    <h3>Help to Develop School </h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={1500} height={500} alt="900x500" src={require("../../images/carosoul2.jpg")}/>
                                <Carousel.Caption>
                                    <h3>We togather can do it</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>;
                    </div>
                </div>

                <div>
                    <Table>
                        <tbody>
                        <tr>
                            <td align="center">
                                <h1> Fund Raising Is Good</h1>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <Alert stack={{limit: 3}} html={true} />
                    <div className="outer-gallary-class">
                        {galary()}
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return ({loginResponse:state.loginResponse})

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({businessLogin,studentLogin}, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);