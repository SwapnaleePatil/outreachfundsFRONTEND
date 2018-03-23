import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {logoutAction} from '../action';
import {listBusiness} from '../business/action/index'
import {Navbar, NavItem, NavDropdown, Nav, MenuItem, FormControl, Glyphicon, Button,Table,Badge,Dropdown,ButtonToolbar} from 'react-bootstrap'
import '../index.css'
import {Route, NavLink,Redirect} from 'react-router-dom'

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            isSearching: false,
            searchdata: [],
            name: "",
            user: '',
            isNull:false
        }
    }
    componentWillMount() {
        this.props.listBusiness();
    }

    componentWillReceiveProps(nextProps) {

        this.state.data = nextProps.businessrecord;
        let user = this.state;
        nextProps.businessrecord.map((v) => {
            v.tokens.map((value) => {
                if (value.token === localStorage.getItem('user')) {
                    user = value;
                    this.setState({
                        user
                    })
                }
                //alert("user",this.state.user)
            });
        });
    }
    logout=()=> {
        localStorage.removeItem('user');
        this.props.logoutAction();
    }
    searching = (e) => {
        this.setState({
            name:e.target.value
        });
        this.setState({
            name:e.target.value,
            isSearching: true,
            searchdata: []
        });
        let {searchdata} = this.state;
        searchdata = [];
        this.state.data.map((value) => {
            if (value.businessInfo.businessName.includes(e.target.value)) {
                searchdata.push(value)
            }
            this.setState({
                searchdata
            });
            if (e.target.value === "") {
                this.setState({
                    isSearching: false,
                    isNull:true
                })
            }
        })
    };
    render() {
        return (
            <div>
                <Navbar  fluid={true} staticTop={true} className="navbar-class-main">
                    <Navbar.Header className="imgnav">
                        <NavLink to={"/main"}><img src={require('../images/logo2.png')}
                                             style={{width: 150, height: 100}} alt=""/></NavLink>
                    </Navbar.Header>
                    <Nav bsStyle="tabs">
                        <NavItem className="navclassb" eventKey={1}>
                            <FormControl type="text" placeholder="search businesses here" name="search" onChange={this.searching} width="20%"/>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={2} className="navclass-item">
                            <NavLink to={"/main/schedule"}>
                            <Button bsSize="large" className="navclass-bs">Schedule <br/> <Glyphicon glyph="glyphicon glyphicon-calendar"/></Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={3} className="navclass-item">
                            <NavLink to={"/main/donation"}>
                            <Button bsSize="large" className="navclass-bs">Donation<br/> <Glyphicon glyph="glyphicon glyphicon-usd"/></Button></NavLink>
                        </NavItem>
                    </Nav>
                    <Nav pullRight className="navclass-dropmenu">
                             <ButtonToolbar>
                                    <Dropdown id="dropdown-custom-1" >
                                        <Dropdown.Toggle className="navclass-bs">
                                            <Glyphicon glyph="glyphicon glyphicon-user"/>
                                        </Dropdown.Toggle>
                                    <Dropdown.Menu className="super-colors">
                                        {this.state.user ?
                                            <MenuItem eventKey={4.1}>
                                                <NavLink to="/editProfile">Edit Profile</NavLink>
                                            </MenuItem>
                                            : <MenuItem eventKey={4.1}>
                                                <NavLink to="/editStudentProfile">Edit Profile</NavLink>
                                            </MenuItem>
                                        }

                                        {this.state.user ?
                                            <MenuItem eventKey={4.4}><NavLink to="/viewProfile">View
                                                Profile</NavLink></MenuItem> :
                                            <MenuItem eventKey={4.4}><NavLink to="/viewStudentProfile">View
                                                Profile</NavLink></MenuItem>
                                        }
                                    {(this.props.loginResponse.hasOwnProperty('data'))&&(this.props.loginResponse.data.userType==='S')?<MenuItem eventKey={4.5} ><NavLink to={'/main/requests'}>Requests</NavLink></MenuItem>:''}
                                    <MenuItem eventKey={4.6} onClick={this.logout}><NavLink to="" onClick={this.logout}>
                                        Logout</NavLink></MenuItem>
                                    </Dropdown.Menu>
                                    </Dropdown>
                             </ButtonToolbar>
                    </Nav>
                </Navbar>
                {this.state.isNull && <div><Redirect to="/main"/> {this.state.isNull=false}</div>}

                {this.state.isSearching &&
                    <div>
                    <Redirect to="/search"/>
                <Table striped bordered>
                    <tbody>
                    <tr>
                        <td colspan={5} align="center">
                            <h4>business List</h4>
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
                </Table></div>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return ({businessrecord: state.businesslist,loginResponse:state.loginResponse})
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({listBusiness,logoutAction}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(MainPage)