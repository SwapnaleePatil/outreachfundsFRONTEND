import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {signupPageAction,setSignupPageFieldsAction,fetchAllSchoolDetails,registerStudent,registerSchool} from '../action';


class SignUpSchool extends React.Component{
    constructor(props){
        super(props);
        this.state={
            schoolData:[],
            addSchool:false,
            displayErrors:false,
            errors:[]
        }
    }

    componentWillMount(){
        if(this.props.Schools.length<=0)
            this.props.fetchAllSchoolDetails();
    }

    handleChange=(e)=>{
        const {signupPageFields}=this.props;
        const {name,value}=e.target;

        var {schoolData,orgName}=this.state;
        if(schoolData.length<=0)
            schoolData = signupPageFields;
        if(name==='selectedSchool') {
            schoolData['schoolId']=(e.target.selectedOptions[0].id || null);
            this.handleSchoolNameChange(e);
        }
        else {
            schoolData[name] = value;
            this.state.errors[6]='';
        }
        this.setState({
            schoolData
        })
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
            schoolData['selectedSchool']='Other';
            schoolData['school']='';
            schoolData['roleTitle']='Admin';
            schoolData['roleStatus']=true;
        }
        else{
            this.setState({addSchool:false,errors:[]})
            var selectedSchool=e.target.selectedOptions[0].innerHTML;
            const {Schools}=this.props;
            var arr=Schools.filter((school)=>school.schoolName===selectedSchool);
            schoolData['organisationName']=arr[0].organisationName;
            schoolData['organisationAddress']=arr[0].organisationAddress;
            schoolData['organisationEmail']=arr[0].organisationEmail;
            schoolData['organisationContact']=arr[0].organisationContact;
            schoolData['school']=selectedSchool;
            schoolData['selectedSchool']=selectedSchool;
            schoolData['role']='Member';
            schoolData['roleTitle']='';
            schoolData['roleStatus']=false;
            this.setState({
                schoolData
            },()=>{
                setSignupPageFieldsAction(this.state.schoolData);
            })
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const {setSignupPageFieldsAction,signupPageFields,registerStudent,registerSchool} =this.props;
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
        formData.append('data', JSON.stringify(obj));
        formData.append('photo', signupPageFields.photo);
        const {errors,schoolData}=this.state;
        if(schoolData.organisationName===undefined||schoolData.organisationName===''
        ||schoolData.organisationEmail===undefined||schoolData.organisationEmail===''
        ||schoolData.organisationContact===undefined||schoolData.organisationContact===''
        ||schoolData.roleTitle===undefined||schoolData.roleTitle===''){
            errors[6] = 'Please fill out all fields.';
            this.setState({errors});
        }
        let len=errors.length;
        let cnt=0;
        for(let i=0;i<errors.length;i++){
            if(errors[i]===''|| errors[i]===undefined){
                cnt++;
            }
        }
        if(len===cnt) {
            if (signupPageFields.schoolId === null) {
                registerSchool(schoolInfo, formData);
            }
            else {
                registerStudent(formData);
            }
            setSignupPageFieldsAction();
        }
        else{
            this.setState({displayErrors:true})
        }
    }

    previousPage=(e)=>{
        e.preventDefault();
        const {signupPageAction,setSignupPageFieldsAction,signUpPage} =this.props;
        signupPageAction(signUpPage - 1);
        setSignupPageFieldsAction(this.state.schoolData);
    }

    validate=(e)=>{
        const {name,value}=e.target;
        console.log(value);
        const {errors}=this.state;
        if(name==='school'||name==='organisationName'||name==='roleTitle'){
            if(!value)
                errors[name]=`Enter ${name}.`;
            else if(!/^([a-zA-Z ])*$/.test(value))
                errors[name]=`Enter Only Alphabets in ${name}.`;
            else
                errors[name]='';
        }
        if(name==='organisationEmail'){
            if(!value)
                errors[name]='Enter Email.';
            else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
                errors[name]='Enter email in proper format.';
            else
                errors[name]='';
        }

        if(name==='organisationContact'){
            if(!value)
                errors[name]='Enter Contact No.';
            else if(!/^[0-9]*$/.test(value))
                errors[name]='Enter only digits in Contact No.'
            else if(value.length<6 || value.length>11)
                errors[name]='Check the no. of digits in contact No. (6-11)';
            else
                errors[name]='';
        }
        if(name==='selectedSchool'){
            if(value.indexOf('Select School')>0)
                errors[name]='select any school.';
            else
                errors[name]='';
        }
        console.log(errors);
        this.setState({
            errors
        })
    }
    render(){
        const {signupPageFields,Schools}=this.props;
        if(signupPageFields!==null)
            this.state.schoolData=signupPageFields;
        const {schoolData,errors,displayErrors,orgName}=this.state;
        return(
            <div className={'modal-dialog'}>
                <div className={'modal-content'}>
                    <div className={'modal-header'}>
                        <h4>School Information</h4>
                        <button className={'close'} onClick={()=>{
                            window.location="/"}
                        }
                        >&times;</button>
                    </div>
                    <div className={'modal-body'}>
                        <form>
                            <div>
                                {
                                    (errors.length>0 && displayErrors)?
                                        errors.map((err)=>{
                                            return(
                                                (err!=='')?<div><label className={'text-danger'}>{err}</label><br/></div>:<span></span>
                                            )
                                        }):<span></span>
                                }
                            </div>
                            <div className={'form-group'}>
                                <label>School Name :</label>
                                    <select autoFocus className={'form-control'} name={'selectedSchool'} onChange={this.handleChange} value={schoolData.selectedSchool} onBlur={this.validate}>
                                        <option>{'---Select School---'}</option>
                                        {
                                            Schools.map((school)=>{
                                                return <option key={school._id} id={school._id}>{school.schoolName}</option>
                                            })
                                        }
                                        <option>{'Other'}</option>
                                    </select>
                                {(errors['selectedSchool']!==(''||undefined))?<label className={'text-danger'}>{errors['selectedSchool']}</label>:<span></span>}
                            </div>
                            <div className={'form-group'}>
                                {(this.state.addSchool || schoolData.selectedSchool==='Other')?<input className={'form-control'} name={'school'} onChange={this.handleChange} onBlur={this.validate} value={schoolData.school} type={'text'}/>:<span></span>}
                                {(errors['school']!==(''||undefined))?<label className={'text-danger'}>{errors['school']}</label>:<span></span>}
                            </div>
                            <div className={'form-group'}>
                                <label >Organization Name :</label>
                                <input className={'form-control'} type={'text'} placeholder={'Organization Name'}
                                        name={'organisationName'}
                                        onChange={this.handleChange} onBlur={this.validate}
                                        value={schoolData.organisationName}/>
                                {(errors['organisationName']!==(''||undefined))?<label className={'text-danger'}>{errors['organisationName']}</label>:<span></span>}
                            </div>
                            <div className={'form-group'}>
                                <label>Role :</label>
                                <input type={'radio'} name="role" value={'Officer'}  onChange={this.handleChange} checked={(schoolData.role==='Officer')?'checked':''} disabled={'disabled'}/>Officer
                                <input type={'radio'} name="role" value={'Member'}  onChange={this.handleChange} checked={(schoolData.role==='Member')?'checked':''} disabled={'disabled'}/>Member
                            </div>
                            <div className={'form-group'}>
                                <label>Role Title :</label>
                                <input type={'text'} className={'form-control'} placeholder={'Role Title'} name={'roleTitle'} onChange={this.handleChange} onBlur={this.validate} value={schoolData.roleTitle}/>
                                {(errors['roleTitle']!==(''||undefined))?<label className={'text-danger'}>{errors['roleTitle']}</label>:<span></span>}
                            </div>
                            <div className={'form-group'}>
                                <label>Address :</label>
                                <textarea placeholder={'Address'} className={'form-control'} name={'organisationAddress'} onChange={this.handleChange} value={schoolData.organisationAddress}>{schoolData.organisationAddress}</textarea>
                            </div>
                            <div className={'form-group'}>
                                <label>Email :</label>
                                <input className={'form-control'} type={'text'} placeholder={'Email'} name={'organisationEmail'} onChange={this.handleChange} onBlur={this.validate} value={schoolData.organisationEmail}/>
                                {(errors['organisationEmail']!==(''||undefined))?<label className={'text-danger'}>{errors['organisationEmail']}</label>:<span></span>}
                            </div>
                            <div className={'form-group'}>
                                <label>Contact No. :</label>
                                <input type={'text'} className={'form-control'} placeholder={'Contact No.'} name={'organisationContact'} onChange={this.handleChange} onBlur={this.validate} value={schoolData.organisationContact}/>
                                {(errors['organisationContact']!==(''||undefined))?<label className={'text-danger'}>{errors['organisationContact']}</label>:<span></span>}
                            </div>
                            <div>
                                <ButtonToolbar>
                                    <Button bsStyle="primary" onClick={this.previousPage}>Previous</Button>
                                    <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
                                </ButtonToolbar>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=> {
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