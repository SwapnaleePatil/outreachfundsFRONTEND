import React from 'react'
import {Navbar, NavItem, NavDropdown, Nav, MenuItem, FormControl, Glyphicon, Button} from 'react-bootstrap'
import '../index.css'
import {Route} from 'react-router-dom'
import Schedule from './schedule'
class MainPage extends React.Component {

    render() {

        const Navmenu=()=>(
            <div>
                <Navbar fluid={true} staticTop={true}>
                    <Navbar.Header className="imgnav">

                        <a href="#home"><img src={require('../images/logo2.png')}
                                             style={{width: 150, height: 100}} alt=""/></a>
                    </Navbar.Header>
                    <Nav bsStyle="tabs">

                        <NavItem className="navclassb" eventKey={1} href="#">
                            <FormControl type="text" placeholder="search buysinesses here" width="20%"/>
                        </NavItem>
                        <NavItem eventKey={2} className="navclass-item" href="/main/schedule">
                            <Button bsSize="large" className="navclass-bs">
                                Schedule <br/> <Glyphicon glyph="glyphicon glyphicon-calendar"/></Button>
                        </NavItem>

                        <NavItem eventKey={2} className="navclass-item" href="/main/donation">
                            <Button bsSize="large" className="navclass-bs">
                                Donation<br/> <Glyphicon glyph="glyphicon glyphicon-usd"/></Button>
                        </NavItem>
                    </Nav>
                    <Nav pullRight className="navclass-dropmenu">
                        <NavItem>
                            <Button bsSize="large" className="navclass-bs">
                                <Glyphicon glyph="glyphicon glyphicon-user">
                                    <NavDropdown eventKey={3} id="basic-nav-dropdown" className="navclassa">
                                        <MenuItem eventKey={3.1}>Edit Profile</MenuItem>
                                        <MenuItem eventKey={3.2}>Availability</MenuItem>
                                        <MenuItem eventKey={3.3}>Payments</MenuItem>
                                        <MenuItem eventKey={3.3}>View Profile</MenuItem>
                                        <MenuItem eventKey={3.3}>Logout</MenuItem>
                                    </NavDropdown></Glyphicon></Button>
                        </NavItem>
                    </Nav>
                </Navbar></div>

        );
        return (
            <div>
                <Navmenu/>
            </div>
        )
    }
}

export default MainPage