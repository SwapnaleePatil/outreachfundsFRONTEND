import React from 'react';
import {Glyphicon, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import './businessCSS.css';
import {listBusiness, updateBusiness} from '../action/index';
import {bindActionCreators} from 'redux';

class BusinessProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: [],
            businessOwner: '',
            businessInfo: '',
            isEditing: false,
            msg: '',
            changeimg: false,
            previewFile: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            owner: nextProps.List,
            isEditing: nextProps.location.pathname.includes('edit') ? true : false
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
        this.setState({
            isEditing: this.props.location.pathname.includes('edit') ? true : false
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
        if (name === "businessEmail") {
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
        if (name === "businessPhone") {
            let rephone = /^((?!(0))[0-9]{6,13})$/;
            if (!rephone.test(e.target.value)) {
                this.setState({msg: "Enter Number between 6 to 13 digit"});
            }
        }
        if (name === "firstName" || name === "lastName" || name === "businessName" || name === "businessType") {
            let rename = /^([A-Za-z ])*$/;
            ;
            if (!rename.test(e.target.value)) {
                this.setState({msg: "Can't be Number"});
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
                this.setState({
                    msg: "Please Select Proper Birth Date"
                })
            }
        }
        if (e.target.value === "") {
            this.setState({msg: ""});
        }
    }
    getOwner = () => {
        let {businessOwner} = this.state;
        let {businessInfo} = this.state;
        this.props.List.map((value, index) => {
            if (value.tokens[0].token === localStorage.getItem('user')) {
                businessOwner = value;
                businessInfo = value.businessInfo;

            }
            this.setState({businessOwner, businessInfo})
        })
    }
    handleChange = (e) => {
        let {name, value} = e.target;
        const {businessOwner} = this.state;

        if (name === "photo") {
            businessOwner[name] = e.target.files[0];
        }
        else {
            businessOwner[name] = value;
        }
        this.setState({businessOwner})
    }
    handlebusinessDetail = (e) => {
        let {name, value} = e.target;
        const {businessInfo} = this.state;
        if (name === "businessHour") {
            let hour = businessInfo.businessHours.split(':');
            if (value <= 9) {
                hour[0] = "0" + value;
            }
            else {
                hour[0] = value;
            }
            businessInfo.businessHours = hour.join(':');
        }
        else if (name === "businessMinute") {
            let hour = businessInfo.businessHours.split(':');
            if (value <= 9) {
                hour[1] = "0" + value;
            }
            else {
                hour[1] = value;
            }
            businessInfo.businessHours = hour.join(':')
        }
        else {
            businessInfo[name] = value;
        }
        this.setState({businessInfo})
    }
    updateRecord = (e) => {
        e.preventDefault();
        if (this.state.msg !== "") {
            this.setState({
                msg: "Please Fill Valid Information"
            })
        }
        else {
            let {businessInfo, businessOwner} = this.state;
            let obj = {
                id: businessOwner._id,
                firstName: businessOwner.firstName,
                lastName: businessOwner.lastName,
                gender: businessOwner.gender,
                dob: businessOwner.dob,
                email: businessOwner.email,
                phone: businessOwner.phone,
                photo: businessOwner.photo,
                businessInfo: {
                    businessName: businessInfo.businessName,
                    businessType: businessInfo.businessType,
                    businessHours: businessInfo.businessHours,
                    businessAddress: businessInfo.businessAddress,
                    businessPhone: businessInfo.businessPhone,
                    businessEmail: businessInfo.businessEmail,
                },
            }
            let formData = new FormData();
            formData.append('obj', JSON.stringify(obj));
            formData.append('photo', businessOwner.photo);
            this.props.updateBusiness(formData);
            this.setState({
                isEditing: false,
            })
        }
    }
    handleimg = (e) => {
        e.preventDefault();
        this.setState({
            changeimg: true
        })
        let reader = new FileReader();
        let file = e.target.files[0];
         reader.onloadend = () => {
            this.setState({
                photo: file,
                previewFile: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    render() {
        let businessOwner = this.state.businessOwner;
        let businessInfo = this.state.businessInfo;
        let address = this.state.businessInfo && this.state.businessInfo.businessAddress.split(",");
        let isEditing = this.state.isEditing;
        return (
            <div className="container">
                <div className="col-lg-12">
                    <div className="col-sm-4">
                        <div className="containers">

                            {
                                this.state.changeimg ? <img className="image" src={this.state.previewFile}
                                                            style={{"width": "100%", "height": "100%"}}/>
                                    :
                                    <img className="image"
                                         src={"http://localhost:3000/uploads/" + businessOwner.photo}
                                         style={{"width": "100%", "height": "100%"}}/>

                            }
                            {isEditing && <div className="middle">
                                <input type="file" ref="img" id="fileLoader" name="photo" title="Load File"
                                       onChange={(e) => {
                                           this.handleChange(e);
                                           this.handleimg(e);
                                       }}/>
                                <div className="text btn-lg" onClick={(e) => this.refs.img.click()}>
                                    <Glyphicon className="iconcss" glyph="glyphicon glyphicon-camera gi-5px"/>
                                </div>
                            </div>}
                        </div>

                    </div>
                    <div className="col-sm-8">
                        <fieldset>
                            <legend style={{"color": "darkgreen"}}>Owner Details{' '}<span
                                style={{"color": "red"}}>{this.state.msg}</span></legend>
                            <table style={{"width": "100%"}}>
                                <tr>
                                    <td className="fieldsecond">Name</td>
                                    <td className="fieldseconds">{
                                        isEditing ?
                                            <div className="form-inline">
                                                <input className="form-control edittd" type="text" name="firstName"
                                                       value={businessOwner.firstName} required onChange={(e) => {
                                                    this.handleChange(e);
                                                    this.chkValidation(e)
                                                }}/>
                                                <input className="form-control edittd" required type='text'
                                                       name='lastName'
                                                       value={businessOwner.lastName} onChange={(e) => {
                                                    this.handleChange(e)
                                                    this.chkValidation(e);
                                                }}/>
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
                                                       value={businessOwner.email} required onChange={(e) => {
                                                    this.handleChange(e);
                                                    this.chkValidation(e);
                                                }}/>
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
                                                       onChange={(e) => {
                                                           this.handleChange(e);
                                                           this.chkValidation(e);
                                                       }} required/>
                                            </div>
                                            : businessOwner.dob && businessOwner.dob.split("T")[0]}</td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Phone</td>
                                    <td className="fieldseconds">{
                                        isEditing ?
                                            <div>
                                                <input className="form-control edittd" type='number' name='phone'
                                                       value={businessOwner.phone && businessOwner.phone}
                                                       onChange={(e) => {
                                                           this.handleChange(e);
                                                           this.chkValidation(e);
                                                       }} required/>
                                            </div>
                                            : businessOwner.phone && businessOwner.phone}</td>
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
                        <fieldset style={{"margin-top": "3%"}}>
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
                                            this.handlebusinessDetail(e);
                                            this.chkValidation(e)
                                        }} value={businessInfo && businessInfo.businessPhone}
                                               name="businessPhone" type="number" required
                                        /> :
                                        businessInfo && "+91" + businessInfo.businessPhone}</td>
                            </tr>

                            <tr>
                                <td className="field">Address</td>
                            </tr>
                            <tr>
                                <td className="fieldtd">{
                                    isEditing ? <textarea className="form-control" required
                                                          value={businessInfo && businessInfo.businessAddress}
                                                          onChange={this.handlebusinessDetail}
                                                          name="businessAddress"/> :
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
                        <fieldset style={{"margin-top": "2%"}}>
                            <legend style={{"color": "darkgreen"}}>Business Details</legend>
                            <table style={{"width": "100%"}}>
                                <tr>
                                    <td className="fieldsecond">Business Name:</td>
                                    <td align="left"
                                        className="fieldseconds">{isEditing ?
                                        <input className="form-control"
                                               value={businessInfo && businessInfo.businessName}
                                               onChange={(e) => {
                                                   this.handlebusinessDetail(e);
                                                   this.chkValidation(e);
                                               }} name="businessName" type="text"
                                               required/> : businessInfo && businessInfo.businessName || ''}</td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Business Type</td>
                                    <td align="left"
                                        className="fieldseconds">{
                                        isEditing ? <input className="form-control"
                                                           value={businessInfo && businessInfo.businessType}
                                                           onChange={(e) => {
                                                               this.handlebusinessDetail(e);
                                                               this.chkValidation(e);
                                                           }} name="businessType" type="text" required/>
                                            : businessInfo && businessInfo.businessType || ''}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Business Hour</td>
                                    <td align="left"
                                        className="fieldseconds">{isEditing ? <div className="form-inline">
                                            Hour:<input value={businessInfo && businessInfo.businessHours.split(":")[0]}
                                                        className="form-control"
                                                        style={{"width": "20%"}}
                                                        onChange={this.handlebusinessDetail} name="businessHour"
                                                        type="number"
                                                        min="00" max="24" required/>{'  '}
                                            Minute:<input value={businessInfo && businessInfo.businessHours.split(":")[1]}
                                                          className="form-control"
                                                          style={{"width": "20%"}}
                                                          onChange={this.handlebusinessDetail} name="businessMinute"
                                                          type="number"
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
                                                   this.handlebusinessDetail(e);
                                                   this.chkValidation(e);
                                               }} type="email" required/>
                                        : businessInfo && businessInfo.businessEmail || ''}</td>
                                </tr>
                                {isEditing ? <tr>
                                    <td colSpan="2" align="right"><Button bsStyle="success" onClick={this.updateRecord}>Update</Button>
                                    </td>
                                </tr> : ''
                                }

                            </table>
                        </fieldset>
                    </div>
                </div>
            </div>

        );
    }

}

function mapStateToProps(state) {
    return {List: state.businesslist}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({listBusiness, updateBusiness}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile)
