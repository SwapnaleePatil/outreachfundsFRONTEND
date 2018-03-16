import React from 'react'
import {Navbar, NavItem, NavDropdown, Nav, MenuItem, FormControl, Glyphicon, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';
import '../index.css'
import BusinessProfile from '../business/components/businessProfile'

class MainPage extends React.Component {
    render() {
        const logout = () => {
            window.location = "/logout"
        };
        const about = () => (
          window.location='/profile'
        )

        const Navmenu = () => (
            <div>
                <Navbar bsStyle="tabs" fluid={true} staticTop={true} className="navbar-class-main">
                    <Navbar.Header className="imgnav">

                        <a href="/home"><img src={require('../images/logo2.png')}
                                             style={{width: 150, height: 100}} alt=""/></a>
                    </Navbar.Header>
                    <Nav bsStyle="tabs">

                        <NavItem className="navclassb" eventKey={1} href="#">
                            <FormControl type="text" placeholder="search businesses here" width="20%"/>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={2} className="navclass-item" href="/main/schedule">
                            <Button bsSize="large" className="navclass-bs">
                                Schedule <br/> <Glyphicon glyph="glyphicon glyphicon-calendar"/></Button>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={3} className="navclass-item" href="/main/donation">
                            <Button bsSize="large" className="navclass-bs">
                                Donation<br/> <Glyphicon glyph="glyphicon glyphicon-usd"/></Button>
                        </NavItem>
                    </Nav>
                    <Nav pullRight className="navclass-dropmenu">
                        <Button bsSize="large" className="navclass-bs">
                            <Glyphicon glyph="glyphicon glyphicon-user">
                                <NavDropdown eventKey={4} id="basic-nav-dropdown" title="" className="navclassa">
                                    <MenuItem eventKey={4.1}>Edit Profile</MenuItem>
                                    <MenuItem eventKey={4.2}>Availability</MenuItem>
                                    <MenuItem eventKey={4.3}>Payments</MenuItem>
                                    <MenuItem eventKey={4.4} onClick={about}>View Profile</MenuItem>
                                    <MenuItem eventKey={4.5}><NavLink to={'/main/requests'}>Requests</NavLink></MenuItem>
                                    <MenuItem eventKey={4.6} onClick={logout}>Logout</MenuItem>
                                </NavDropdown></Glyphicon></Button>
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