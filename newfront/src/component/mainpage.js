import React from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {listBusiness} from '../business/action/index'
import {Navbar, NavItem, NavDropdown, Nav, MenuItem, FormControl, Glyphicon, Button,Table,Badge,Dropdown,ButtonToolbar} from 'react-bootstrap'
import '../index.css'


import {Route, NavLink} from 'react-router-dom'


class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            isSearching: false,
            searchdata: [],
            name: "",
            user: ''
        }
    }
    componentWillMount() {
        this.props.listBusiness();
    }

    componentWillReceiveProps(nextProps) {

        this.state.data = nextProps.businessrecord;
        let user = this.state;
        nextProps.businessrecord.map((v, i) => {
            v.tokens.map((value, i) => {
                if (value.token === localStorage.getItem('user')) {
                    user = value;
                    this.setState({
                        user
                    }, () => {
                        console.log("user", this.state.user);
                    })
                }
                //alert("user",this.state.user)
            });
        });
    }
    logout=()=> {

        localStorage.removeItem('user');
        window.location = "/"
    }
    searching = (e) => {
        this.setState({
            name:e.target.value
        });
        console.log(e.target.value);
        this.setState({
            name:e.target.value,
            isSearching: true,
            searchdata: []
        });
        let {searchdata} = this.state;
        searchdata = [];
        this.state.data.map((value, i) => {
            if (value.businessInfo.businessName.includes(e.target.value)) {
                searchdata.push(value)
            }
            this.setState({
                searchdata
            });
            if (e.target.value === "") {
                this.setState({
                    isSearching: false
                })
            }
        })
    };
    render() {
        return (
            <div>
                <Navbar  fluid={true} staticTop={true} className="navbar-class-main">
                    <Navbar.Header className="imgnav">

                        <a href="/home"><img src={require('../images/logo2.png')}
                                             style={{width: 150, height: 100}} alt=""/></a>
                    </Navbar.Header>
                    <Nav bsStyle="tabs">
                        <NavItem className="navclassb" eventKey={1}>
                            <FormControl type="text" placeholder="search businesses here" name="search" onChange={this.searching} width="20%"/>
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
                             <ButtonToolbar>
                                    <Dropdown id="dropdown-custom-1" >
                                        <Dropdown.Toggle className="navclass-bs">
                                            <Glyphicon glyph="glyphicon glyphicon-user"/>
                                        </Dropdown.Toggle>
                                    <Dropdown.Menu className="super-colors">
                                        {this.state.user ? <MenuItem eventKey={4.1}><NavLink to="/editProfile">Edit
                                                Profile</NavLink></MenuItem>
                                            : <MenuItem eventKey={4.1}><NavLink to="/editStudentProfile">Edit
                                                Profile</NavLink></MenuItem>
                                        }
                                    <MenuItem eventKey={4.2} ><NavLink to="/availability">Availability</NavLink></MenuItem>
                                    <MenuItem eventKey={4.3}><NavLink to="/payment">Payments</NavLink></MenuItem>
                                        {this.state.user ?
                                            <MenuItem eventKey={4.4}><NavLink to="/viewProfile">View
                                                Profile</NavLink></MenuItem> :
                                            <MenuItem eventKey={4.4}><NavLink to="/viewStudentProfile">View
                                                Profile</NavLink></MenuItem>
                                        }
                                    {/*<MenuItem eventKey={4.5} ><NavLink to={'/main/requests'}>Requests</NavLink></MenuItem>*/}
                                    <MenuItem eventKey={4.6} onClick={this.logout}>Logout</MenuItem>
                                    </Dropdown.Menu>
                                    </Dropdown>
                             </ButtonToolbar>
                    </Nav>
                </Navbar>
                {this.state.isSearching ?
                <Table striped bordered>
                    <tbody>
                    <tr>
                        <td colspan={5} align="center">
                            <h4>   business List</h4>
                        </td>
                    </tr>
                <tr>
                    <th>photo</th>
                    <th>Business Name</th>
                    <th>Address</th>
                    <th>Business Type</th>
                    <th>Phone</th>
                </tr>
                {
                   this.state.searchdata.map((v, i) => {
                        return <tr key={i}>
                            <td><img src={"http://localhost:3000/uploads/" + v.photo}
                                     height="50px" width="50px" alt="NO img"/></td>
                            <td>{v.businessInfo.businessName}</td>
                            <td>{v.businessInfo.businessAddress}</td>
                            <td>{v.businessInfo.businessType}</td>
                            <td>{v.businessInfo.businessPhone}</td>
                        </tr>
                    })
                }

            </tbody>
                </Table>:""}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return ({businessrecord: state.businesslist})
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({listBusiness}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(MainPage)