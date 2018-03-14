import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import './businessCSS.css'
import {connect} from 'react-redux'
import {businessFields} from '../action/index'
import {businessSignup} from "../action/index";
import {bindActionCreators} from 'redux';

class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerData: [],
            photo:'',
        }
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        const {ownerData} = this.state;
        if(name==="photo")
        {
            debugger
            ownerData[name]=e.target.files[0];
        }
        else {
            ownerData[name] = value;
        }this.setState({ownerData},()=>{
            console.log("Data",ownerData);
        })
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
        const {Fields}=this.props;
        if(Fields!==null)
            this.state.ownerData=Fields;
        let ownerData = this.state.ownerData;
        return (
            <form onSubmit={this.handlePage}>
                <div className='tablecss'>
                    <div style={{"background-color": "white"}}><Modal.Header><label>Business
                        Information</label></Modal.Header></div>
                    <div>
                        <Table hover bordered condensed responsive style={{"background-color": "white"}}>
                            <tbody>
                            <tr>
                                <td><label>Select Pic</label></td>
                                <td><input className="form-control" name="photo" type="file"
                                           onChange={this.handleChange}
                                            />
                                    <img src="" alt=""/></td>
                            </tr>
                            <tr>
                                <td><label>First Name</label></td>
                                <td><input className="form-control" name="firstName" type="text"
                                           value={ownerData.firstName} onChange={this.handleChange}
                                            /></td>
                            </tr>
                            <tr>
                                <td><label>Last Name</label></td>
                                <td><input className="form-control" name="lastName" type="text"
                                           value={ownerData.lastName} onChange={this.handleChange}
                                            /></td>
                            </tr>
                            <tr>
                                <td><label>Gender</label></td>
                                <td><input onChange={this.handleChange}
                                           checked={ownerData.gender === "male" ? true : false} name="gender"
                                           type="radio" value="male"/>{' '}Male{' '}
                                    <input name="gender" onChange={this.handleChange}
                                           checked={ownerData.gender === "female" ? true : false} type="radio"
                                           value="female"/>{' '}Female
                                </td>
                            </tr>
                            <tr>
                                <td><label>Date Of Birth</label></td>
                                <td><input className="form-control" onChange={this.handleChange} name="dob" type="date"
                                            /></td>
                            </tr>
                            <tr>
                                <td><label>Email:</label></td>
                                <td><input className="form-control" onChange={this.handleChange} value={ownerData.email}
                                           name="email" type="email"
                                            /></td>
                            </tr>
                            <tr>
                                <td><label>Password:</label></td>
                                <td><input className="form-control" onChange={this.handleChange} value={ownerData.password}
                                           name="password" type="password"
                                            /></td>
                            </tr>
                            <tr>
                                <td><label>Phone:</label></td>
                                <td><input className="form-control" onChange={this.handleChange} value={ownerData.phone}
                                           name="phone" type="number"
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
