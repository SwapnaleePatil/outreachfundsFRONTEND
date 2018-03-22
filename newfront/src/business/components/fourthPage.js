import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import './businessCSS.css'
import {connect} from 'react-redux'
import {businessFields} from '../action/index'
import {businessSignup} from "../action/index";
import {addBusiness} from "../action/index";

import {bindActionCreators} from 'redux';

class FourthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerData: [],
            error: {},
        }
    }

    handleChange = (e) => {
        const {Fields} = this.props;
        const {name, value} = e.target;
        var {ownerData} = this.state;
        if (ownerData.length <= 0)
            ownerData = Fields;
        ownerData[name] = value;
        this.setState({
            ownerData
        })

    }
    submitData = (e) => {
        e.preventDefault();
        debugger;
        const {ownerData,error} = this.state;
        if (!ownerData.country) {
            error.country="Please Select Country"
            this.setState({error})
        }
        else {
            error.country="";
            let flag = 0;
            for (let key in error) {
                console.log(key);
                if (error[key] !== '') {
                    flag = 1;
                }
            }
            if (flag === 0) {

                const {businessSignup, businessFields} = this.props;
                businessSignup(1);
                businessFields();
                //let {ownerData} = this.state;
                if (ownerData["expireMonth"] < 9) {
                    ownerData["expireMonth"] = "0" + ownerData["expireMonth"];
                } else {
                    ownerData["expireMonth"] = ownerData["expireMonth"];
                }
                ownerData["expiresOn"] = ownerData["expireMonth"] + "/" + ownerData["expireYear"]
                let obj = {

                    firstName: ownerData.firstName,
                    lastName: ownerData.lastName,
                    gender: ownerData.gender,
                    dob: ownerData.dob,
                    email: ownerData.email,
                    password: ownerData.password,
                    phone: ownerData.phone,
                    businessInfo: {
                        businessName: ownerData.businessName,
                        businessType: ownerData.businessType,
                        businessHours: ownerData.businessHours,
                        businessAddress: ownerData.businessAddress,
                        businessPhone: ownerData.businessPhone,
                        businessEmail: ownerData.email,
                        taxPayerId: ownerData.taxPayerId
                    },
                    subscription: {
                        pricing: ownerData.pricing,
                        subscriptionDate: Date.now(),
                        cardDetail: {
                            cardType: ownerData.cardType,
                            cardNumber: ownerData.cardNumber,
                            expiresOn: ownerData.expiresOn,
                            securityCode: ownerData.securityCode,
                            postalCode: ownerData.postalCode,
                            country: ownerData.country
                        }
                    }
                }
                let formData = new FormData();
                formData.append('obj', JSON.stringify(obj));
                formData.append('photo', ownerData.photo);
                this.props.addBusiness(formData);


            }
            this.setState({error})
        }


    }
    chkValidation = (e) => {
        let {error} = this.state;
        let name = e.target.name;
        if (name === "cardNumber") {
            let renum = /^[0-9]{16}$/;
            if (!renum.test(e.target.value)) {
                error.cardNumber = "Enter 16 digit Number";
            }
            else {
                error.cardNumber = "";
            }
        }
        if (name === "securityCode") {
            let rescode = /^[0-9]{3}$/;

            if (!rescode.test(e.target.value)) {

                error.securityCode = "Enter 3 digit Number"
            }else {
                error.securityCode = "";
            }
        }
        if (name === "postalCode") {
            let repcode = /^[0-9]{6}$/;

            if (!repcode.test(e.target.value)) {
                error.postalCode = "Enter 6 digit Number"
            }else {
                error.postalCode = "";
            }
        }
        this.setState({
            error
        })
        if (e.target.value === "") {
            this.setState({error: ""});
        }
    }
    handlePreviousPage = (e) => {
        e.preventDefault();
        const {businessSignup, businessFields, Page} = this.props;
        businessSignup(Page - 1);
        businessFields(this.state.ownerData);
    }

    render() {
        let {error}=this.state;
        const {Fields} = this.props;
        if (Fields !== null)
            this.state.ownerData = Fields;
        let ownerData = this.state.ownerData;

        return (
            <form onSubmit={this.submitData}>
                <div className='tablecss'>
                    <div style={{"background-color": "white"}}><Modal.Header><label>Business
                        Information</label></Modal.Header>
                        <span style={{"color": "red"}}>{this.state.msg}</span></div>
                    <div>
                        <div align="right">
                            <Button onClick={() => {
                                window.location = "/"
                            }
                            }
                            >Close</Button></div>
                        <Table hover bordered responsive style={{"background-color": "white"}}>
                            <tbody>
                            <tr>
                                <td><label>Card Type:</label></td>
                                <td><input value={ownerData.cardType} onChange={this.handleChange} name="cardType"
                                           className="form-control" type="text" required/></td>
                            </tr>
                            <tr>
                                <td><label>Card Number:</label></td>
                                <td><input value={ownerData.cardNumber} onChange={(e) => {
                                    this.handleChange(e);
                                    this.chkValidation(e);
                                }} name="cardNumber" className="form-control" type="number" required/>
                                    {error.cardNumber && <span style={{"color": "red"}}>{error.cardNumber}</span>}</td>
                            </tr>
                            <tr>
                                <td><label>Expires On:</label></td>
                                <td>
                                    <div className="form-inline">
                                        Month:<input value={ownerData.expireMonth} className="form-control"
                                                     style={{"width": "20%"}}
                                                     onChange={this.handleChange} name="expireMonth" type="number"
                                                     min="01" max="12" required/>{'  '}
                                        Year:<input value={ownerData.expireYear} className="form-control"
                                                    style={{"width": "20%"}}
                                                    onChange={this.handleChange} name="expireYear" type="number"
                                                    min="2020" max="2040" required/></div>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Security Code:</label></td>
                                <td><input value={ownerData.securityCode} onChange={(e) => {
                                    this.handleChange(e);
                                    this.chkValidation(e);
                                }} required name="securityCode" className="form-control" type="number"/>
                                    {error.securityCode && <span style={{"color": "red"}}>{error.securityCode}</span>}
                                </td>
                            </tr>
                            <tr>
                                <td><label>Postal Code:</label></td>
                                <td><input value={ownerData.postalCode} onChange={(e) => {
                                    this.handleChange(e);
                                    this.chkValidation(e);
                                }} name="postalCode" required className="form-control" type="number"/>
                                    {error.postalCode && <span style={{"color": "red"}}>{error.postalCode}</span>}</td>
                            </tr>
                            <tr>
                                <td><label>Country:</label></td>
                                <td>
                                    <select name="country" onChange={this.handleChange}>
                                        <option>==Select Country==</option>
                                        <option value="India">India</option>
                                        <option value="London">London</option>
                                        <option value="UK">India</option>
                                        <option value="USA">USA</option>
                                        <option value="China">China</option>
                                        <option value="Japan">Japan</option>
                                    </select>{this.state.error.country &&
                                <span style={{"color": "red"}}>{this.state.error.country}</span>}</td>
                            </tr>
                            <tr>
                                <td><Button active type="button" bsStyle="info" onClick={this.handlePreviousPage}>
                                    Previous
                                </Button></td>
                                <td><Button active type="submit" bsStyle="info">Submit</Button>
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
    return bindActionCreators({businessFields, businessSignup, addBusiness}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FourthPage)
