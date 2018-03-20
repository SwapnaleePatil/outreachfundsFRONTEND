import React from 'react';
import { bindActionCreators } from 'redux';
import {Button,ButtonToolbar,Jumbotron,FormGroup,ControlLabel,FormControl,
    Radio
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {signupPageAction,setSignupPageFieldsAction,fetchAllSchoolDetails,registerStudent,registerSchool} from '../action';


class SignUpSchool extends React.Component{
    constructor(props){
        super(props);
        this.state={
            schoolData:[],
            addSchool:false
        }
    }

    componentWillMount(){
        if(this.props.Schools.length<=0)
            this.props.fetchAllSchoolDetails();
    }

    handleChange=(e)=>{
        const {signupPageFields}=this.props;
        const {name,value}=e.target;

        var {schoolData}=this.state;
        if(schoolData.length<=0)
            schoolData = signupPageFields;

        if(name==='selectedSchool') {
            this.handleSchoolNameChange(e);
            schoolData['schoolId']=(e.target.selectedOptions[0].id || null);
        }
        else
            schoolData[name]=value;
        this.setState({
            schoolData
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        console.log("new schools list  - ",this.props.Schools);
        const {signupPageAction,setSignupPageFieldsAction,signupPageFields,registerStudent,registerSchool} =this.props;
        let formData = new FormData();
        let schoolInfo={
            "schoolName":signupPageFields.school,
            "organisationName":signupPageFields.organisationName,
            "organisationAddress":signupPageFields.organisationAddress,
            "organisationEmail":signupPageFields.organisationEmail,
            "organisationContact":signupPageFields.organisationContact
        }
        let obj={
            firstName:signupPageFields.firstName,
            lastName:signupPageFields.lastName,
            gender:signupPageFields.gender,
            email:signupPageFields.email,
            dob:signupPageFields.dob,
            password:signupPageFields.password,
            phone:signupPageFields.phone,
            role:signupPageFields.role,
            roleStatus:signupPageFields.roleStatus,
            roleTitle:signupPageFields.roleTitle,
            schoolId:signupPageFields.schoolId
        }
        if(signupPageFields.schoolId===null){
            formData.append('data', JSON.stringify(obj));
            formData.append('photo', signupPageFields.photo);
            registerSchool(schoolInfo,formData);
        }
        else {
            formData.append('data', JSON.stringify(obj));
            formData.append('photo', signupPageFields.photo);
            registerStudent(formData);
        }


        setSignupPageFieldsAction();


    }

    previousPage=(e)=>{
        e.preventDefault();
        const {signupPageAction,setSignupPageFieldsAction,signUpPage} =this.props;
        signupPageAction(signUpPage - 1);
        setSignupPageFieldsAction(this.state.schoolData);
    }

    handleSchoolNameChange=(e)=>{
        const {schoolData}=this.state;
        if(e.target.selectedOptions[0].innerHTML==='Other') {
            this.setState({addSchool: true})
            schoolData['organisationName']='';
            schoolData['organisationAddress']='';
            schoolData['organisationEmail']='';
            schoolData['organisationContact']='';
            schoolData['role']='Officer';
            schoolData['roleTitle']='Admin';
            schoolData['roleStatus']=true;
        }
        else{
            this.setState({addSchool:false})
            var selectedSchool=e.target.selectedOptions[0].innerHTML;
            const {Schools}=this.props;
            var arr=Schools.filter((school)=>school.schoolName===selectedSchool);
            schoolData['organisationName']=arr[0].organisationName;
            schoolData['organisationAddress']=arr[0].organisationAddress;
            schoolData['organisationEmail']=arr[0].organisationEmail;
            schoolData['organisationContact']=arr[0].organisationContact;
            schoolData['role']='Member';
            schoolData['roleTitle']='';
            schoolData['roleStatus']=false;
            this.setState({
                schoolData
            })
        }
    }

    render(){

        const {signupPageFields,Schools}=this.props;
        if(signupPageFields!==null)
            this.state.schoolData=signupPageFields;
        const {schoolData}=this.state;
        return(
            <div className={'col-sm-6 jumbotron col-sm-offset-3'}>
                <form className={'container col-sm-8 col-sm-offset-2'}>
                    <div className={'modal-header'}><h2>School Information</h2></div>
                    <div align="right">
                        <Button onClick={()=>{
                            window.location="/"}
                        }
                        >Close</Button></div>
                    <div className={'modal-body'}>
                    <div className={'form-group'}>
                        <label>School Name :</label>
                            <select className={'form-control'} name={'selectedSchool'} onChange={this.handleChange} value={schoolData.selectedSchool}>
                            <option>{'---Select School---'}</option>
                            {
                               Schools.map((school)=>{
                                    return <option key={school._id} id={school._id}>{school.schoolName}</option>
                                })
                            }
                            <option>{'Other'}</option>
                        </select>

                    </div>
                    <div className={'form-group'}>
                        {(this.state.addSchool)?<input className={'form-control'} name={'school'} onChange={this.handleChange} value={schoolData.school} type={'text'}/>:<span></span>}
                    </div>
                    <div className={'form-group'}>
                        <label >Organization Name :</label>
                        <input className={'form-control'} type={'text'} placeholder={'Organization Name'} name={'organisationName'} onChange={this.handleChange} value={schoolData.organisationName}/>
                    </div>
                    <div className={'form-group'}>
                        <label>Role :</label>
                        <input type={'radio'} name="role" value={'Officer'}  onChange={this.handleChange} checked={(schoolData.role==='Officer')?'checked':''}/>Officer
                        <input type={'radio'} name="role" value={'Member'}  onChange={this.handleChange} checked={(schoolData.role==='Member')?'checked':''}/>Member
                    </div>
                    <div className={'form-group'}>
                        <label>Role Title :</label>
                        <input type={'text'} className={'form-control'} placeholder={'Role Title'} name={'roleTitle'} onChange={this.handleChange} value={schoolData.roleTitle}/>
                    </div>
                    <div className={'form-group'}>
                        <label>Address :</label>
                        <textarea placeholder={'Address'} className={'form-control'} name={'organisationAddress'} onChange={this.handleChange} value={schoolData.organisationAddress}>{schoolData.organisationAddress}</textarea>
                    </div>
                    <div className={'form-group'}>
                        <label>Email :</label>
                        <input className={'form-control'} type={'text'} placeholder={'Email'} name={'organisationEmail'} onChange={this.handleChange} value={schoolData.organisationEmail}/>
                    </div>
                    <div className={'form-group'}>
                        <label>Contact No. :</label>
                        <input type={'text'} className={'form-control'} placeholder={'Contact No.'} name={'organisationContact'} onChange={this.handleChange} value={schoolData.organisationContact}/>
                    </div>
                    <div>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={this.previousPage}>Previous</Button>
                        <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
                    </ButtonToolbar>
                    </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("School",state.schools);
    return{
        signUpPage:state.signupPage,
        signupPageFields:state.signupPageFields,
        Schools:state.schools
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signupPageAction,setSignupPageFieldsAction,fetchAllSchoolDetails,
        registerStudent,registerSchool
    },dispatch)
};

export default connect(mapStateToProps,matchDispatchToProps)(SignUpSchool);