import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import './businessCSS.css'
import {connect} from 'react-redux'
import {businessFields} from '../action/index'
import {businessSignup} from "../action/index";
import {bindActionCreators} from 'redux';
var msg='';
class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerData: [],
            photo: '',
        }
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        const {ownerData} = this.state;
        if (name === "photo") {
            debugger
            ownerData[name] = e.target.files[0];
        }
        else {
            ownerData[name] = value;
        }
        this.setState({ownerData}, () => {
            console.log("Data", ownerData);
        })
        if(e.target.value==="")
        {
            msg="";
        }
    }
    chkValidation=(e)=>{

    let name=e.target.name;
        if(name==="email")
        {
            let re =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if(re.test(e.target.value))
            {
                msg="Email is InValid";
            }
        }

    }
    handlePage = (e) => {
        e.preventDefault();
        this.props.businessSignup(this.props.Page + 1);
            this.handleSubmit();
    }
    handleSubmit = () => {
        this.props.businessFields(this.state.ownerData);
    }

    render() {
        const {Fields} = this.props;
        if (Fields !== null)
            this.state.ownerData = Fields;
        let ownerData = this.state.ownerData;
        return (
            <form onSubmit={this.handlePage}>
                <div className='tablecss'>
                    <div style={{"background-color": "white"}}><Modal.Header><label>Business
                        Information</label></Modal.Header>
                    <span style={{"color":"red"}}>{msg}</span></div>
                    <div>
                        <Table hover bordered condensed responsive style={{"background-color": "white"}}>
                            <tbody>
                            <tr>
                                <td><label>Select Pic</label></td>
                                <td><input className="form-control" name="photo" type="file"onChange={this.handleChange} required/></td>
                            </tr>
                            <tr>
                                <td><label>First Name</label></td>
                                <td><input className="form-control" name="firstName" type="text" value={ownerData.firstName} minLength="3" onChange={this.handleChange} required/></td>
                            </tr>
                            <tr>
                                <td><label>Last Name</label></td>
                                <td><input className="form-control" name="lastName" type="text" value={ownerData.lastName} minLength="3" onChange={this.handleChange} required/></td>
                            </tr>
                            <tr>
                                <td><label>Gender</label></td>
                                <td><input onChange={this.handleChange} checked={ownerData.gender === "male" ? true : false} name="gender" type="radio" value="male"/>{' '}Male{' '}
                                    <input name="gender" onChange={this.handleChange}checked={ownerData.gender === "female" ? true : false} type="radio" value="female"/>{' '}Female
                                </td>
                            </tr>
                            <tr>
                                <td><label>Date Of Birth</label></td>
                                <td><input className="form-control" onChange={this.handleChange} name="dob" type="date" required/></td>
                            </tr>
                            <tr>
                                <td><label>Email:</label></td>
                                <td><input className="form-control" onChange={
                                    (e)=>{this.handleChange(e);
                                        this.chkValidation(e);}
                                } value={ownerData.email}
                                           name="email" type="email" required
                                /></td>
                            </tr>
                            <tr>
                                <td><label>Password:</label></td>
                                <td><input className="form-control" onChange={this.handleChange}
                                           value={ownerData.password}
                                           minLength="8"
                                           maxLength="32"
                                           name="password" type="password" required
                                /></td>
                            </tr>
                            <tr>
                                <td><label>Phone:</label></td>
                                <td><input className="form-control" maxLength="13" minLength="6" onChange={this.handleChange} value={ownerData.phone}
                                           name="phone" type="number" required
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan='2'><Button bsStyle="info" type="submit" active
                                >Next</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </form>

        );
    }
}
function mapStateToProps(state) {
    return {
        Page: state.businessSignUpRed,
        Fields: state.businessFieldsRed
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({businessFields, businessSignup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage)
