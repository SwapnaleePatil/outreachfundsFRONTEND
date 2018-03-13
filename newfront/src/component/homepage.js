import React from 'react'
import {Navbar, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap'
// import {NavLink,Switch,Route,BrowserRouter} from 'react-router-dom'

import {Table, FormControl, Button} from 'react-bootstrap'
import galary from './galary'

// import MainPage from './mainpage'
import '../index.css'
import Modal from 'react-modal'
// import Login from './login'

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            passoword: "",
            isActive: false,
            isRole: false,
            role: "",
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
    loginstudent = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        };
    };
    loginbusiness = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        };
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
            <div className="home-class">
                {/*modal for decide role of the user at logintime*/}
                <Modal isOpen={this.state.isRole} ariaHideApp={false} className="role-class">
                    <Table bordered>
                        <tbody>
                        <tr>
                            <td>
                                Are You Student:<input type="radio" value="student" onClick={() => {
                                this.setState({
                                    isRole: false
                                });
                                this.toggleModal()
                            }} onChange={() => {
                                this.setState({
                                    role: "student"
                                });

                            }}/>
                            </td>
                            <td>
                                Or Business:<input type="radio" value="business" onClick={() => {
                                this.setState({
                                    isRole: false
                                });
                                this.toggleModal()
                            }} onChange={() => {
                                this.setState({
                                    role: "business"
                                })
                            }}/>
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
                                    <Button className="lbtn" bsStyle="info" onClick={this.loginstudent}>Login</Button> :
                                    <Button className="lbtn" bsStyle="info" onClick={this.loginbusiness}>Login</Button>
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
                    <Navbar fluid={true} staticTop={true}>
                        <Navbar.Header className="imgnav">

                                <a href="/"><img  src={require('../images/logo2.png')}
                                                                     style={{width: 150, height:100}} alt=""/></a>
                        </Navbar.Header>
                        <Nav pullRight>
                            <NavItem className="navclassa" eventKey={1} href="/main/studentSignup">
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

export default HomePage;