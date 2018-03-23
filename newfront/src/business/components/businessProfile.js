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
            error: {},
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

    //Validation
    chkValidation = (e) => {
        let {error} = this.state;
        let name = e.target.name;
        if (name === "email") {
            let reemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!reemail.test(e.target.value)) {
                error.email = "Email is InValid"
            }
            else {
                error.email = ""
            }
        }
        if (name === "businessEmail") {
            let reemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!reemail.test(e.target.value)) {
                error.businessEmail = "Email is InValid"
            }
            else {
                error.businessEmail = "";
            }
        }
        //
        if (name === "phone") {
            let rephone = /^((?!(0))[0-9]{6,13})$/;
            if (!rephone.test(e.target.value)) {
                error.phone = "Enter Number between 6 to 13 digit";
            }
            else {
                error.phone = "";
            }
        }
        if (name === "businessPhone") {
            let rephone = /^((?!(0))[0-9]{6,13})$/;
            if (!rephone.test(e.target.value)) {
                error.businessPhone = "Enter Number between 6 to 13 digit";
            }
            else {
                error.businessPhone = "";
            }
        }
        if (name === "firstName") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.firstName = "Enter Valid First Name"
            }
            else {
                error.firstName = ""
            }
            ;
        }
        if (name === "lastName") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.lastName = "Enter Valid Last Name"
            }
            else {
                error.lastName = ""
            }
            ;
        }
        if (name === "businessName") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.businessName = "Enter Valid Business Name"
            }
            else {
                error.businessName = ""
            }
            ;
        }
        if (name === "businessType") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.businessType = "Enter Valid Business Type"
            }
            else {
                error.businessType = ""
            }
            ;
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
                error.dob = "";
            }
        }
        this.setState({error});
        if (e.target.value === "") {
            this.setState({error: ""});
        }
    }
    //Get Owner By Token
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
    //Handle Change in State
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
    //Handle Change In Business Detail
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
    //Update The Record
    updateRecord = (e) => {
        e.preventDefault();
        let flag = 0;
        const {error} = this.state;
        for (let key in error) {
            if (error[key] !== '') {
                flag = 1;
            }
        }
        if (flag === 0) {

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
            this.props.history.push('/viewProfile')
        }
    }
    //Handle The Image
    handleimg = (e) => {
        if (e.target.files.length) {

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
    }

    render() {
        let {businessOwner, businessInfo, isEditing, error} = this.state;
        let address = this.state.businessInfo && this.state.businessInfo.businessAddress.split(",");
        return (
            this.state.businessOwner !== "" ?

                <div className="container">
                    <div className="col-lg-12">
                        <div className="col-sm-4">
                            <div className="containers">

                                {
                                    this.state.changeimg ? <img className="image" src={this.state.previewFile}
                                                                style={{"width": "100%", "height": "100%"}}/>
                                        :
                                        <img className="image"
                                             src={"http://192.168.200.33:3005/uploads/" + businessOwner.photo}
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
                                    <tbody>
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
                                                : businessOwner.firstName + " " + businessOwner.lastName}
                                            {error.firstName && <span style={{"color": "red"}}>{error.firstName}</span>}
                                            {error.lastName && <span style={{"color": "red"}}>{error.lastName}</span>}


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
                                                : businessOwner.email}
                                            {error.email && <span style={{"color": "red"}}>{error.email}</span>}
                                        </td>
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
                                                : businessOwner.dob && businessOwner.dob.split("T")[0]}
                                            {error.dob && <span style={{"color": "red"}}>{error.dob}</span>}
                                        </td>
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
                                                : businessOwner.phone && businessOwner.phone}
                                            {error.phone && <span style={{"color": "red"}}>{error.phone}</span>}

                                        </td>
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
                                    </tbody>
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
                                <tbody>
                                <tr>
                                    <td className="field">Phone Number</td>
                                </tr>
                                <tr>
                                    <td className="fieldtd">{
                                        isEditing ?
                                            <input className="form-control" maxLength="13" minLength="6"
                                                   onChange={(e) => {
                                                       this.handlebusinessDetail(e);
                                                       this.chkValidation(e)
                                                   }} value={businessInfo && businessInfo.businessPhone}
                                                   name="businessPhone" type="number" required
                                            />

                                            :
                                            businessInfo && businessInfo.businessPhone}
                                        {error.businessPhone &&
                                        <span style={{"color": "red"}}>{error.businessPhone}</span>}</td>
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
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-8">
                            <fieldset style={{"margin-top": "2%"}}>
                                <legend style={{"color": "darkgreen"}}>Business Details</legend>
                                <table style={{"width": "100%"}}>
                                    <tbody>
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
                                                   required/> : businessInfo && businessInfo.businessName || ''}
                                            {error.businessName &&
                                            <span style={{"color": "red"}}>{error.businessName}</span>}
                                        </td>
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
                                            {error.businessType &&
                                            <span style={{"color": "red"}}>{error.businessType}</span>}
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
                                                            min="0" max="24" required/>{'  '}
                                                Minute:<input
                                                value={businessInfo && businessInfo.businessHours.split(":")[1]}
                                                className="form-control"
                                                style={{"width": "20%"}}
                                                onChange={this.handlebusinessDetail} name="businessMinute"
                                                type="number"
                                                min="0" max="59" required/></div>
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
                                            : businessInfo && businessInfo.businessEmail || ''}
                                            {error.businessEmail &&
                                            <span style={{"color": "red"}}>{error.businessEmail}</span>}
                                        </td>
                                    </tr>
                                    {isEditing ? <tr>
                                        <td colSpan="2" align="right"><Button bsStyle="success"
                                                                              onClick={this.updateRecord}>Update</Button>
                                        </td>
                                    </tr> : ''
                                    }
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                    </div>
                </div> : <div>Comming Soon</div>

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
