import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import './businessCSS.css'
import {connect} from 'react-redux'
import {businessFields} from '../action/index'
import {businessPage} from "../action/index";
import {bindActionCreators} from 'redux';

class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerData: [],
            photo: '',

            error: {}
        }
    }
    //Handle The Change in State
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
    //Validation
    chkValidation = (e) => {
        let {error } = this.state;
         let name = e.target.name;
        if (name === "email") {
            let reemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!reemail.test(e.target.value)) {
                error.email = "Email Is Invalid";
                         }
            else {
                error.email="";
            }
        }
        // 
        if (name === "phone") {
            let rephone = /^((?!(0))[0-9]{6,13})$/;
            if (!rephone.test(e.target.value)) {
                error.phone = "Enter Number between 6 to 13 digit";
                        }
            else {
                error.phone="";
            }
        }
        if (name === "firstName") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.firstName = "Enter Valid First Name";
                  }
            else {
                error.firstName="";
            }
        }
        if (name === "lastName") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.lastName = "Enter Valid Last Name";
                 }
            else {
                error.lastName="";
            }
        }
        if (name === "dob") {
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            if (month <= 9) {
                month = "0" + month;
            }
            let year = date.getFullYear() - 15;
            let dobdate = year + '-' + month + '-' + day;
            if (e.target.value > dobdate) {
                error.dob = "Please Select Proper Birth Date";
            }
            else {
                error.dob="";
            }
        }
        this.setState({
           error
        })
       if (e.target.value === "") {
            this.setState({error: ""});
        }
    }
    //To Redirect On Next Page
    handlePage = (e) => {
        e.preventDefault();
        const {error} =this.state;
        //const keys = Object.keys(error);
        let flag = 0;
        for(let key in error){
            console.log(key);
            if(error[key]!==''){
                flag=1;
            }
        }
       // debugger;
        if (flag===0) {
            this.props.businessPage(this.props.Page + 1);
            this.handleSubmit();
        }
    }
    //Maintain Field Data
    handleSubmit = () => {
        this.props.businessFields(this.state.ownerData);
    }

    render() {
        const {Fields} = this.props;
        if (Fields !== null)
            this.state.ownerData = Fields;
        let ownerData = this.state.ownerData;
        let {error}=this.state;
        return (
            <form onSubmit={this.handlePage}>
                <div className='tablecss'>
                    <div style={{"background-color": "white"}}><Modal.Header><label>Business
                        Information</label></Modal.Header>
                        </div>
                    <div style={{"background-color": "white"}} align="right">
                        <Button onClick={() => {
                            window.location = "/"
                        }
                        }
                        >Close</Button></div>
                    <div>
                        <Table hover bordered condensed responsive style={{"background-color": "white"}}>
                            <tbody>
                            <tr>
                                <td><label>Select Pic</label></td>
                                <td><input className="form-control" name="photo" type="file"
                                           onChange={this.handleChange} required/></td>
                            </tr>
                            <tr>
                                <td><label>First Name</label></td>
                                <td><input className="form-control" name="firstName" type="text"
                                           value={ownerData.firstName} minLength="3"  onChange=
                                               {(e) => {
                                                   this.handleChange(e);
                                                   this.chkValidation(e);
                                               }} required/>
                                    {error.firstName && <span style={{"color": "red"}}>{error.firstName}</span>}</td>
                            </tr>
                            <tr>
                                <td><label>Last Name</label></td>
                                <td><input className="form-control" name="lastName" type="text"
                                           value={ownerData.lastName} minLength="3" onChange={(e) => {
                                    this.handleChange(e);
                                    this.chkValidation(e);
                                }} required/>
                                    {error.lastName && <span style={{"color": "red"}}>{error.lastName}</span>}</td>
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
                                }} name="dob" type="date"  value={ownerData.dob && ownerData.dob.split("T")[0]}
                                           required/>
                                    {error.dob && <span style={{"color": "red"}}>{error.dob}</span>}</td>
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
                                           required/>
                                    {error.email && <span style={{"color": "red"}}>{error.email}</span>}</td>
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
                                           name="phone" type="number" required
                                />{error.phone && <span style={{"color": "red"}}>{error.phone}</span>}</td>
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
    return bindActionCreators({businessFields, businessPage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage)
