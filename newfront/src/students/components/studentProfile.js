import React from 'react';
import {bindActionCreators} from 'redux';
import {Glyphicon, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import '../../business/components/businessCSS.css';
import {fetchStudent} from '../action/index'
import {fetchAllSchoolDetails} from '../action/index'
import {updateSchool} from '../action/index'
import {updateStudent} from '../action/index'
class StudentProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            student: {},
            school: [],
            selectedSchool: '',
            isEditing: false,
            error: {},
            changeimg: false,
            previewFile: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            school: nextProps.School,
            student: nextProps.Student,
            isEditing: nextProps.location.pathname.includes('edit') ? true : false

        }, () => {
            this.getSchool();
        })

    }
    componentWillMount() {
        this.setState({
            student: this.props.Student
        });
        if (this.props.School.length > 0) {
            this.setState({
                school: this.props.School
            }, () => {
                this.getSchool();
            })
        }
        else {
            this.props.fetchAllSchoolDetails();
            this.props.fetchStudent();
        }
        this.setState({
            isEditing: this.props.location.pathname.includes('edit') ? true : false
        })
    }
    getSchool = () => {
        let {selectedSchool} = this.state;
        this.state.school.map((value) => {
            if (value._id === this.props.Student.schoolId) {
                selectedSchool = value;
            }
        })
        this.setState({selectedSchool})
    }
    handleChange = (e) => {
        let {name, value} = e.target;
        const {student} = this.state;

        if (name === "photo") {
            student[name] = e.target.files[0];
        }
        else {
            student[name] = value;
        }
        this.setState({student})
    }
    handleorganisationDetail = (e) => {
        let {name, value} = e.target;
        const {selectedSchool} = this.state;
        selectedSchool[name] = value;
        this.setState({selectedSchool})
    }
    chkValidation = (e) => {
        let {error}=this.state;
        let name = e.target.name;
        if (name === "email") {
            let reemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!reemail.test(e.target.value)) {
                error.email= "Email is InValid"
            }
            else
            {
                error.email=""
            }
        }
        if (name === "organisationEmail") {
            let reemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!reemail.test(e.target.value)) {
                error.organisationEmail= "Email is InValid"
            }
            else {
                error.organisationEmail="";
            }
        }
        //
        if (name === "phone") {
            let rephone = /^((?!(0))[0-9]{6,13})$/;
            if (!rephone.test(e.target.value)) {
                error.phone= "Enter Number between 6 to 13 digit";
            }
            else
            {
                error.phone="";
            }
        }
        if (name === "organisationPhone") {
            let rephone = /^((?!(0))[0-9]{6,13})$/;
            if (!rephone.test(e.target.value)) {
                error.organisationPhone= "Enter Number between 6 to 13 digit";
            }
            else {
                error.organisationPhone="";
            }
        }
        if (name === "firstName") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.firstName= "Enter Valid First Name"
            }
            else {error.firstName=""};
        }
        if (name === "lastName") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.lastName= "Enter Valid Last Name"
            }
            else {error.lastName=""};
        }
        if (name === "organisationName") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.organisationName= "Enter Valid Organisation Name"
            }
            else {error.organisationName=""};
        }
        if (name === "schoolName") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                error.schoolName= "Enter Valid School Name"
            }
            else {error.schoolName=""};
        }
        if (name === "roleTitle") {
            let rename = /^([A-Za-z ])*$/;
            if (!rename.test(e.target.value)) {
                this.setState({msg: "Enter Valid Role Title"});
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
                error.dob="Please Select Proper Birth Date";
            }
            else {
                error.dob="";
            }
        }
        this.setState({error});

        if (e.target.value === "") {
            this.setState({error: {}});
        }
    }
    handleimg = (e) => {
        if(e.target.files.length){
            let {student}=this.state;
            this.setState({
                changeimg: true
            })
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                student["photo"]=file;
                this.setState({
                    student,
                    previewFile: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    }
    updateRecord = (e) => {
        e.preventDefault();
        const {error}=this.state;
        let flag = 0;
        for (let key in error) {
            if (error[key] !== '') {
                flag = 1;
            }
        }
        if (flag === 0) {
                let {student,selectedSchool}=this.state;
                let studentObj={
                    id:student._id,
                    firstName:student.firstName,
                    lastName:student.lastName,
                    gender:student.gender,
                    dob:student.dob,
                    email:student.email,
                    phone:student.phone,
                    roleTitle:student.roleTitle,
                    schoolId:student.schoolId
                };
                let schoolObj={
                    id:student.schoolId,
                    schoolName:selectedSchool.schoolName,
                    organisationName:selectedSchool.organisationName,
                    organisationEmail:selectedSchool.organisationEmail,
                    organisationAddress:selectedSchool.organisationAddress,
                    organisationContact:selectedSchool.organisationContact
                }
            let formData = new FormData();
            formData.append('obj', JSON.stringify(studentObj));
            formData.append('photo', student.photo);

            this.props.updateSchool(schoolObj);
            this.props.updateStudent(formData);
            this.setState({
                isEditing: false,
            })
            this.props.history.push('/viewStudentProfile');
        }
    }
    render() {
        let {student,selectedSchool,isEditing,error}=this.state;
        let address = this.state.selectedSchool.organisationAddress && this.state.selectedSchool.organisationAddress.split(",");

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
                                         src={"http://192.168.200.33:3005/uploads/" + student.photo}
                                         style={{"width": "100%", "height": "100%"}}/>

                            }
                            {isEditing && <div className="middle">
                                <input type="file" ref="img" id="fileLoader" name="photo" title="Load File"
                                       onChange={(e) => {
                                           // this.handleChange(e);
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
                            <legend style={{"color": "darkgreen"}}>Student Details{' '}<span
                                style={{"color": "red"}}>{this.state.msg}</span></legend>
                            <table style={{"width": "100%"}}>
                                <tbody>
                                <tr>
                                    <td className="fieldsecond">Name</td>
                                    <td className="fieldseconds">{
                                        isEditing ?
                                            <div className="form-inline">
                                                <input className="form-control edittd" type="text" name="firstName"
                                                       value={student.firstName} required onChange={(e) => {
                                                    this.handleChange(e);
                                                    this.chkValidation(e)
                                                }}/>
                                                <input className="form-control edittd" required type='text'
                                                       name='lastName'
                                                       value={student.lastName} onChange={(e) => {
                                                    this.handleChange(e)
                                                    this.chkValidation(e);
                                                }}/>
                                            </div>

                                            : student.firstName + " " + student.lastName
                                    }
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
                                                       value={student.email} required onChange={(e) => {
                                                    this.handleChange(e);
                                                    this.chkValidation(e);
                                                }}/>
                                            </div>
                                            : student.email}
                                        {error.email && <span style={{"color": "red"}}>{error.email}</span>}

                                    </td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Date Of Birth</td>
                                    <td className="fieldseconds">{
                                        isEditing ?
                                            <div>
                                                <input className="form-control edittd" type='date' name='dob'
                                                       value={student.dob && student.dob.split("T")[0]}
                                                       onChange={(e) => {
                                                           this.handleChange(e);
                                                           this.chkValidation(e);
                                                       }} required/>
                                            </div>
                                            : student.dob && student.dob.split("T")[0]}
                                        {error.dob && <span style={{"color": "red"}}>{error.dob}</span>}

                                    </td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Phone</td>
                                    <td className="fieldseconds">{
                                        isEditing ?
                                            <div>
                                                <input className="form-control edittd" type='number' name='phone'
                                                       value={student.phone && student.phone}
                                                       onChange={(e) => {
                                                           this.handleChange(e);
                                                           this.chkValidation(e);
                                                       }} required/>
                                            </div>
                                            : student.phone && student.phone}
                                        {error.phone && <span style={{"color": "red"}}>{error.phone}</span>}

                                    </td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Gender</td>
                                    <td className="fieldseconds">{isEditing ?
                                        <div>
                                            <input onChange={this.handleChange}
                                                   checked={student.gender === "male" ? true : false}
                                                   name="gender"
                                                   type="radio" value="male"/>{' '}Male{' '}
                                            <input name="gender" onChange={this.handleChange}
                                                   checked={student.gender === "female" ? true : false}
                                                   type="radio"
                                                   value="female"/>{' '}Female </div>
                                        : student.gender}</td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Role Title</td>
                                    <td className="fieldseconds">{
                                        isEditing ?
                                            <div>
                                                <input className="form-control edittd" type='text' name='roleTitle'
                                                       value={student.roleTitle && student.roleTitle}
                                                       onChange={(e) => {
                                                           this.handleChange(e);
                                                           this.chkValidation(e);
                                                       }} required/>
                                            </div>
                                            : student.roleTitle && student.roleTitle}</td>
                                    {error.roleTitle && <span style={{"color": "red"}}>{error.roleTitle}</span>}

                                </tr>
                                </tbody>
                            </table>
                        </fieldset>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="col-sm-4">
                        <fieldset style={{"margin-top": "3%"}}>
                            <legend style={{"color": "darkgreen"}}>School Contact Details</legend>
                        </fieldset>

                        <table>
                            <tbody>
                            <tr>
                                <td className="field">Phone Number</td>
                            </tr>
                            <tr>
                                <td className="fieldtd">{
                                    isEditing ?
                                        <input className="form-control" maxLength="13" minLength="6" onChange={(e) => {
                                            this.handleorganisationDetail(e);
                                            this.chkValidation(e)
                                        }} value={selectedSchool && selectedSchool.organisationContact}
                                               name="organisationContact" type="number" required
                                        /> :
                                        selectedSchool && selectedSchool.organisationContact}
                                    {error.organisationContact && <span style={{"color": "red"}}>{error.organisationContact}</span>}

                                </td>
                            </tr>

                            <tr>
                                <td className="field">Address</td>
                            </tr>
                            <tr>
                                <td className="fieldtd">{
                                    isEditing ? <textarea className="form-control" required
                                                          value={selectedSchool && selectedSchool.organisationAddress}
                                                          onChange={this.handleorganisationDetail}
                                                          name="organisationAddress"/> :
                                        address && address.map((value, i) => {
                                            return (
                                                <div>{value}<br/></div>

                                            )
                                        })
                                }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-8">
                        <fieldset style={{"margin-top": "2%"}}>
                            <legend style={{"color": "darkgreen"}}>School Details</legend>
                            <table style={{"width": "100%"}}>
                                <tbody>
                                <tr>
                                    <td className="fieldsecond">School Name:</td>
                                    <td align="left"
                                        className="fieldseconds">{isEditing ?
                                        <input className="form-control"
                                               value={selectedSchool && selectedSchool.schoolName}
                                               onChange={(e) => {
                                                   this.handleorganisationDetail(e);
                                                   this.chkValidation(e);
                                               }} name="schoolName" type="text"
                                               required/> : selectedSchool && selectedSchool.schoolName || ''}
                                        {error.schoolName && <span style={{"color": "red"}}>{error.schoolName}</span>}

                                    </td>
                                </tr>
                                <tr>
                                    <td className="fieldsecond">Organisation Name:</td>
                                    <td align="left"
                                        className="fieldseconds">{isEditing ?
                                        <input className="form-control"
                                               value={selectedSchool && selectedSchool.organisationName}
                                               onChange={(e) => {
                                                   this.handleorganisationDetail(e);
                                                   this.chkValidation(e);
                                               }} name="organisationName" type="text"
                                               required/> : selectedSchool && selectedSchool.organisationName || ''}
                                        {error.organisationName && <span style={{"color": "red"}}>{error.organisationName}</span>}

                                    </td>

                                </tr>

                                <tr>
                                    <td className="fieldsecond">Organisation Email</td>
                                    <td align="left"
                                        className="fieldseconds">{isEditing ?
                                        <input className="form-control" name="organisationEmail"
                                               value={selectedSchool && selectedSchool.organisationEmail}
                                               onChange={(e) => {
                                                   this.handleorganisationDetail(e);
                                                   this.chkValidation(e);
                                               }} type="email" required/>
                                        : selectedSchool && selectedSchool.organisationEmail || ''}
                                        {error.organisationEmail && <span style={{"color": "red"}}>{error.organisationEmail}</span>}

                                    </td>
                                </tr>
                                {isEditing ? <tr>
                                    <td colSpan="2" align="right"><Button bsStyle="success" onClick={this.updateRecord}>Update</Button>
                                    </td>
                                </tr> : ''
                                }
                                </tbody>
                            </table>
                        </fieldset>
                    </div>
                </div>


            </div>
        )

    }


}

function mapStateToProps(state) {
   return {
        Student: state.students,
        School: state.schools
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchStudent, fetchAllSchoolDetails,updateSchool,updateStudent}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);