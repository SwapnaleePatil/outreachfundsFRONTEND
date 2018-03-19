import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import './businessCSS.css';
import {listBusiness} from '../action/index';
import {bindActionCreators} from 'redux';

class BusinessProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: [],
            businessOwner: '',
            isEditing: true
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            owner: nextProps.List
        }, () => {
            this.getOwner();
        });

    }

    componentWillMount() {
        this.getOwner();
        if (this.props.List.length !== 0) {
            this.setState({
                owner: this.props.List
            })
        }
        else {
            this.props.listBusiness();
        }

    }

    getOwner = () => {
        let {businessOwner} = this.state;
        this.props.List.map((value, index) => {
            //console.log("Value",value.tokens[0].token);
            if (value.tokens[0].token === localStorage.getItem('user')) {
                businessOwner = value
            }
            this.setState({businessOwner}, () => {
                console.log("Value", this.state.businessOwner);
            })
        })
    }
    handleChange = () => {

    }

    render() {
        let businessOwner = this.state.businessOwner;
        let businessInfo = this.state.businessOwner.businessInfo;
        let address = this.state.businessOwner.businessInfo && this.state.businessOwner.businessInfo.businessAddress.split(",");
        let isEditing = this.state.isEditing;
        return (
            <div className="container">
                <div className="col-lg-12">
                    <div className="col-sm-4">
                        <img className="image"
                        src={"http://localhost:3000/uploads/" + businessOwner.photo}
                        style={{"width": "100%", "height": "100%"}}/>
                        <div className="middle">
                            <div className="text btn-lg"><Glyphicon glyph="glyphicon glyphicon-camera"  /></div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <fieldset>
                            <legend style={{"color": "darkgreen"}}>Owner Details</legend>
                            <table style={{"width": "100%"}}>
                                <tr>
                                    <td className="fieldsecond">Name</td>
                                    <td className="fieldseconds">{
                                        isEditing ?
                                            <div className="form-inline">
                                                <input className="form-control edittd" type='text' name='firstName'
                                                       value={businessOwner.firstName} onChange={this.handleChange}/>
                                                <input className="form-control edittd" type='text' name='lastName'
                                                       value={businessOwner.lastName} onChange={this.handleChange}/>
                                            </div>
                                            : businessOwner.firstName + " " + businessOwner.lastName
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Email</td>
                                    <td className="fieldseconds">{
                                        isEditing ?
                                            <div>
                                                <input className="form-control edittd" type='email' name='email'
                                                       value={businessOwner.email} onChange={this.handleChange}/>
                                            </div>
                                            : businessOwner.email}</td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Date Of Birth</td>
                                    <td className="fieldseconds">{
                                        isEditing ?
                                            <div>
                                                <input className="form-control edittd" type='date' name='dob'
                                                       value={businessOwner.dob && businessOwner.dob.split("T")[0]}
                                                       onChange={this.handleChange}/>
                                            </div>
                                            : businessOwner.dob && businessOwner.dob.split("T")[0]}</td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Gender</td>
                                    <td className="fieldseconds">{isEditing ?
                                        <div>
                                            <input onChange={this.handleChange}
                                                   checked={businessOwner.gender === "male" ? true : false}
                                                   name="gender"
                                                   type="radio" value="male"/>{' '}Male{' '}
                                            <input name="gender" onChange={this.handleChange}
                                                   checked={businessOwner.gender === "female" ? true : false}
                                                   type="radio"
                                                   value="female"/>{' '}Female </div>
                                        : businessOwner.gender}</td>
                                </tr>
                            </table>
                        </fieldset>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="col-sm-4">
                        <fieldset style={{"margin-top": "5%"}}>
                            <legend style={{"color": "darkgreen"}}>Contact Details</legend>
                        </fieldset>

                        <table>
                            <tr>
                                <td className="field">Phone Number</td>
                            </tr>
                            <tr>
                                <td className="fieldtd">{
                                    isEditing ?
                                        <input className="form-control" maxLength="13" minLength="6" onChange={(e) => {
                                            this.handleChange(e);
                                            this.chkValidation(e)
                                        }} value={businessInfo && businessInfo.businessPhone}
                                               name="phone" type="number" required
                                        /> :
                                        businessInfo && "+91" + businessInfo.businessPhone}</td>
                            </tr>

                            <tr>
                                <td className="field">Address</td>
                            </tr>
                            <tr>
                                <td className="fieldtd">{
                                    isEditing ? <textarea className="form-control" value={businessInfo && businessInfo.businessAddress}
                                                          onChange={this.handleChange} name="businessAddress"/> :
                                        address && address.map((value, i) => {
                                            return (
                                                <div>{value}<br/></div>

                                            )
                                        })
                                }</td>
                            </tr>

                        </table>
                    </div>
                    <div className="col-sm-8">
                        <fieldset style={{"margin-top": "3%"}}>
                            <legend style={{"color": "darkgreen"}}>Business Details</legend>
                            <table style={{"width": "100%"}}>
                                <tr>
                                    <td className="fieldsecond">Business Name:</td>
                                    <td align="left"
                                        className="fieldseconds">{isEditing ?
                                        <input className="form-control" value={businessInfo && businessInfo.businessName}
                                               onChange={(e) => {
                                                   this.handleChange(e);
                                                   this.chkValidation(e);
                                               }} name="businessName" type="text"
                                               required/> : businessInfo && businessInfo.businessName || ''}</td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Business Type</td>
                                    <td align="left"
                                        className="fieldseconds">{
                                        isEditing ? <input className="form-control" value={businessInfo && businessInfo.businessType}
                                                           onChange={(e) => {
                                                               this.handleChange(e);
                                                               this.chkValidation(e);
                                                           }} name="businessType" type="text" required/>
                                            : businessInfo && businessInfo.businessType || ''}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Business Hour</td>
                                    <td align="left"
                                        className="fieldseconds">{isEditing ? <div className="form-inline">
                                            Hour:<input value={businessInfo && businessInfo.businessHour} className="form-control"
                                                        style={{"width": "20%"}}
                                                        onChange={this.handleChange} name="businessHour" type="number"
                                                        min="00" max="24" required/>{'  '}
                                            Minute:<input value={businessInfo && businessInfo.businessMinute} className="form-control"
                                                          style={{"width": "20%"}}
                                                          onChange={this.handleChange} name="businessMinute" type="number"
                                                          min="00" max="59" required/></div>
                                        : businessInfo && businessInfo.businessHours || ''}</td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Business Email</td>
                                    <td align="left"
                                        className="fieldseconds">{isEditing ?
                                        <input className="form-control" name="businessEmail"
                                               value={businessInfo && businessInfo.businessEmail}
                                               onChange={(e) => {
                                                   this.handleChange(e);
                                                   this.chkValidation(e);
                                               }} type="email" required/>
                                        : businessInfo && businessInfo.businessEmail || ''}</td>
                                </tr>

                            </table>
                        </fieldset>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    console.log("List", state.businesslist)
    return {List: state.businesslist}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({listBusiness}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile)
