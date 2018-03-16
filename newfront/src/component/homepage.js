import React from 'react'
import {Navbar, NavItem, NavDropdown, Nav, MenuItem, Carousel} from 'react-bootstrap'
import {Table, FormControl, Button} from 'react-bootstrap'
import galary from './galary'
import {businessLogin} from '../action/index'
import {studentLogin} from '../action/index'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import '../index.css'
import Modal from 'react-modal'
// import Login from './login'
let message = "";

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            isActive: false,
            isRole: false,
            role: "",
            message: ""
        }
    }

    onEmailChange = (e) => {
        message = "";
        this.setState({
            email: e.target.value
        });
        let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.edu$/;
        if (this.state.role === "student") {
            if (!re.test(e.target.value)) {
                message = "Student Email is not valid";
            }
        } else {
            re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!re.test(e.target.value)) {
                message = "Email is not Valid";
            }
        }

    };
    onPassChange = (e) => {
        message = ""
        this.setState({
            password: e.target.value
        });
        e.target.value.length < 6 ? message = "password should be greater than 6 character" : message = "";
    };
    loginstudent = () => {
        let data = {
            username: this.state.email,
            password: this.state.password
        };
        this.props.studentLogin(data);
    };
    loginbusiness = () => {
        let data = {
            username: this.state.email,
            password: this.state.password
        };
        this.props.businessLogin(data);
        if (this.props.businesslogin.data === "User Not Found"){
            message = "invalid Email Or Password"
        }
    };
    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    };
    toggleRole = () => {
        this.setState({
            isRole: !this.state.isRole
        })
    };

    render() {
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

                    <Modal isOpen={this.state.isActive} className="loginp" ariaHideApp={false}>
                        <Table bordered>
                            <tbody>
                            <tr>
                                <td align="right">
                                    <a href="#" onClick={this.toggleModal}>X</a>
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
                                    <span className="error-message">{message}</span>
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

                                </td>
                            </tr>
                            <tr>
                                <td>
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


                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    Or
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <h3><a href="">Sign Up</a></h3>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Modal>


                    {/*header menu bar*/}
                    <div>
                        <Navbar bsStyle="tabs" fluid={true} staticTop={true} className="navbar-class">
                            <Navbar.Header className="imgnav">

                                <a href="/"><img src={require('../images/logo2.png')}
                                                 style={{width: 150, height: 100}} alt=""/></a>
                            </Navbar.Header>
                            <Nav pullRight>
                                <NavItem className="navclassa" eventKey={1} href="/main/businessSignUp">
                                    SignUp
                                </NavItem>
                                <NavItem eventKey={2} className="navclassa" href="#" onClick={this.toggleRole}>
                                    Login
                                </NavItem>
                                <NavDropdown eventKey={3} title="More" id="basic-nav-dropdown" className="navclassa">
                                    <MenuItem eventKey={3.1}>About Us</MenuItem>
                                    <MenuItem eventKey={3.2}>Contact Us</MenuItem>
                                    <MenuItem eventKey={3.3}>FundRising Ideas</MenuItem>
                                </NavDropdown>
                            </Nav>
                        </Navbar></div>
                    <div className="carosel-class">
                        <Carousel interval={2000}>
                            <Carousel.Item>
                                <img width={1500} height={500} alt="1550x300" src={require('../images/school.png')}/>
                                <Carousel.Caption>
                                    <h3>Student Fund Rising</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={1500} height={500} alt="900x500" src={require("../images/carosoul1.jpg")}/>
                                <Carousel.Caption>
                                    <h3>Help to Develop School </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={1500} height={500} alt="900x500" src={require("../images/carosoul2.jpg")}/>
                                <Carousel.Caption>
                                    <h3>We togather can do it</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
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
                    <div className="outer-gallary-class">

                        {galary()}
                    </div>
                </div>


            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return ({businesslogin: state.blogin,studentlogin:state.slogin})

}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({businessLogin,studentLogin}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);