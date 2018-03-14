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
            ownerData: []
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
        console.log("props", this.props.Fields);
        e.preventDefault();
        const {businessSignup, businessFields} = this.props;
        businessSignup(1);
        businessFields();
        let ownerData = this.state.ownerData
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

        console.log(ownerData.photo);
        let formData = new FormData();
        formData.append('obj', JSON.stringify(obj));
        formData.append('photo', ownerData.photo);
        console.log("obj", formData)
        this.props.addBusiness(formData);
    }
    handlePreviousPage = (e) => {
        e.preventDefault();
        const {businessSignup, businessFields, Page} = this.props;
        businessSignup(Page - 1);
        businessFields(this.state.ownerData);
    }

    render() {
        const {Fields} = this.props;
        if (Fields !== null)
            this.state.ownerData = Fields;
        let ownerData = this.state.ownerData;
        return (
            <form onSubmit={this.submitData}>
                <div className='tablecss'>
                    <div style={{"background-color": "white"}}><Modal.Header><label>Business
                        Information</label></Modal.Header></div>
                    <div>
                        <Table hover bordered responsive style={{"background-color": "white"}}>
                            <tbody>
                            <tr>
                                <td><label>Card Type:</label></td>
                                <td><input value={ownerData.cardType} onChange={this.handleChange} name="cardType"
                                           className="form-control" type="text"/></td>
                            </tr>
                            <tr>
                                <td><label>Card Number:</label></td>
                                <td><input value={ownerData.cardNumber} onChange={this.handleChange} name="cardNumber"
                                           className="form-control" type="number"/></td>
                            </tr>
                            <tr>
                                <td><label>Expires On:</label></td>
                                <td><input value={ownerData.expiresOn} onChange={this.handleChange} name="expiresOn"
                                           className="form-control" type="date"/></td>
                            </tr>
                            <tr>
                                <td><label>Security Code:</label></td>
                                <td><input value={ownerData.securityCode} onChange={this.handleChange}
                                           name="securityCode" className="form-control" type="number"/></td>
                            </tr>
                            <tr>
                                <td><label>Postal Code:</label></td>
                                <td><input value={ownerData.postalCode} onChange={this.handleChange} name="postalCode"
                                           className="form-control" type="number"/></td>
                            </tr>
                            <tr>
                                <td><label>Country:</label></td>
                                <td>
                                    <select name="country" onChange={this.handleChange}>
                                        <option>==Select City==</option>
                                        <option value="India">India</option>
                                        <option value="London">London</option>
                                    </select></td>
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
