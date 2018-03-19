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
            photo: '',
            msg: '',
        }
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        const {ownerData} = this.state;
        if (name === "photo") {
            ownerData[name] = e.target.files[0];
        }
        else {
            ownerData[name] = value;
        }
        this.setState({ownerData}, () => {
            console.log("Data", ownerData);
        })

    }
    chkValidation = (e) => {
        this.setState({msg: ""});
        let name = e.target.name;
        if (name === "email") {
            let reemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!reemail.test(e.target.value)) {
                this.setState({msg: "Email is InValid"});
            }
        }
        // 
        if (name === "phone") {
            let rephone = /^((?!(0))[0-9]{6,13})$/;
            if (!rephone.test(e.target.value)) {
                this.setState({msg: "Enter Number between 6 to 13 digit"});
            }
        }
        if (name === "firstName" || name === "lastName") {
            let rename = /^([0-9])*$/;
            if (rename.test(e.target.value)) {
                this.setState({msg: "First Name Or Lastname Can't be Number"});
            }
        }
        if(name==="dob")
        {
            let date=new Date();
            let day=date.getDate();
            let month=date.getMonth()+1;
            if(month<=9)
            {
                month="0"+month;
            }
            let year=date.getFullYear()-10;
            let dobdate=year+'-'+month+'-'+day;
            if(e.target.value>dobdate)
            {
                this.setState({
                    msg:"Please Select Proper Birth Date"
                })
            }
        }
        if (e.target.value === "") {
            this.setState({msg: ""});
        }
        console.log("Msg", this.state.msg);
    }
    handlePage = (e) => {
      e.preventDefault();
        if (this.state.msg !== "") {
            this.setState({
                msg: "Please Fill Valid Information"
            })
        } else {
            this.props.businessSignup(this.props.Page + 1);
            this.handleSubmit();
        }
    }
    handleSubmit = () => {
        this.props.businessFields(this.state.ownerData);
    }
    render() {
        const {Fields} = this.props;
        if (Fields !== null)
            this.state.ownerData = Fields;
        let ownerData = this.state.ownerData;
        console.log("dob",this.state.ownerData);
        //let datadob=this.state.ownerData.dob.split("T");
        return (
            <form onSubmit={this.handlePage}>
                <div className='tablecss'>
                    <div style={{"background-color": "white"}}><Modal.Header><label>Business
                        Information</label></Modal.Header>
                        <span style={{"color": "red"}}>{this.state.msg}</span></div>
                    <div>
                        <Table hover bordered condensed responsive style={{"background-color": "white"}}>
                            <tbody>
                            <tr>
                                <td><label>Select Pic</label></td>
                                <td><input className="form-control" name="photo" type="file"
                                           onChange={this.handleChange}  required/></td>
                            </tr>
                            <tr>
                                <td><label>First Name</label></td>
                                <td><input className="form-control" name="firstName" type="text"
                                           value={ownerData.firstName} minLength="3" onChange=
                                               {(e) => {
                                                   this.handleChange(e);
                                                   this.chkValidation(e);
                                               }} required /></td>
                            </tr>
                            <tr>
                                <td><label>Last Name</label></td>
                                <td><input className="form-control" name="lastName" type="text"
                                           value={ownerData.lastName} minLength="3" onChange={(e) => {
                                    this.handleChange(e);
                                    this.chkValidation(e);
                                }} required /></td>
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
                                <td><input className="form-control" onChange={(e) => {
                                    this.handleChange(e);
                                    this.chkValidation(e);
                                }} name="dob" type="date"
                                           required /></td>
                            </tr>
                            <tr>
                                <td><label>Email:</label></td>
                                <td><input className="form-control" onChange={
                                    (e) => {
                                        this.handleChange(e);
                                        this.chkValidation(e);
                                    }
                                } value={ownerData.email}
                                           name="email" type="email"
                                           required /></td>
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
                                <td><input className="form-control" maxLength="13" minLength="6" onChange={(e) => {
                                    this.handleChange(e);
                                    this.chkValidation(e)
                                }} value={ownerData.phone}
                                           name="phone" type="number"  required
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
