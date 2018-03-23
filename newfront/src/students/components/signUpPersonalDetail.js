import React from 'react';
import { bindActionCreators } from 'redux';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../index.css'
import {signupPageAction,setSignupPageFieldsAction} from '../action';
class SignUpPersonal extends React.Component{

    constructor(props){
        super(props);
        this.state={
            days:[],
            months:[],
            years:[],
            personalData:[],
            errors:[],
            displayErrors:false
        }
    }

    componentWillMount(){
        this.createDays();
        this.createMonths();
        this.createYears();
    }
    createDays=()=>{
        let days=[];
        for(let i=1;i<=31;i++){
            days.push(i);
        }
        this.setState({
            days
        })
    }
    createMonths=()=>{
        let months=[];
        for(let i=1;i<=12;i++){
            months.push(i);
        }
        this.setState({
            months
        })
    }
    createYears=()=>{
        let d=new Date();
        let years=[];
        for(let i=d.getFullYear()-50;i<=d.getFullYear();i++){
            years.push(i);
        }
        this.setState({
            years
        })
    }

    handleChange=(e)=>{
        const {name,value}=e.target;
        const {personalData}=this.state;
        if(name==='photo') {
            personalData[name] = e.target.files[0];
            this.state.errors[5]='';
        }
        else {
            personalData[name] = value;
            this.state.errors[6]='';
        }
        this.setState({
            personalData
        })
    }
    handleClose=()=>{
        // this.props.history.push('/');
        window.location="/";
    }
    handleSubmit=(e)=>{
        const {personalData}=this.state;
        let date=(personalData.month|| 1) + "/" + (personalData.day || 1) + "/" + (personalData.year || new Date().getFullYear()-50);
        personalData['dob']=date;
        this.setState({
            personalData
        },()=>{this.props.setSignupPageFieldsAction(personalData)})
    }
    nextPage=(e)=>{
        e.preventDefault();
        const {errors,personalData}=this.state;
        if(personalData.photo===undefined){
            errors[5] = 'Please select a profile pic.';
            this.setState({errors});
        }
        if(personalData.firstName===undefined||personalData.firstName===''|| personalData.lastName===undefined||
            personalData.lastName===''||personalData.email===undefined||personalData.email===''||personalData.password===undefined||
            personalData.password===''||personalData.phone===undefined||personalData.phone===''){
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
        if(len===cnt)
            this.props.signupPageAction(this.props.signUpPage + 1);
        else{
            this.setState({
                displayErrors:true
            })
            this.handleSubmit();
        }
    }
    validate=(e)=>{
        const {name,value}=e.target;
        const {errors}=this.state;
        if(name==='firstName'||name==='lastName'){
            if(!value)
                errors[name]=`Enter ${name}.`;
            else if(!/^([a-zA-Z ])*$/.test(value))
                errors[name]='Enter only Alphabets in First Name.';
            else
                errors[name]='';
        }
        if(name==='email'){
            if(!value)
                errors[name]='Enter Email.';
            else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.edu)+$/.test(value))
                errors[name]='Email should be in proper format & must ends with .edu .';
            else
                errors[name]='';
        }
        if(name==='password'){
            if(!value)
                errors[name]='Enter Password.';
            else if(value.length<8)
                errors[name]='Enter minimum 8 characters in Password.';
            else
                errors[name]='';
        }
        if(name==='phone'){
            if(!value)
                errors[name]='Enter Contact No.';
            else if(!/^[0-9]*$/.test(value))
                errors[name]='Enter only digits in Contact No.'
            else if(value.length<6 || value.length>11)
                errors[name]='Check the no. of digits in contact No. (6-11)';
            else
                errors[name]='';
        }
        if(name==='photo') {
             if(value===undefined)
                errors[name] = 'Please Select a profile pic.';
        }
        this.setState({
            errors
        })
    }
    render(){
        const {signupPageFields}=this.props;
        if(signupPageFields!==null)
            this.state.personalData=signupPageFields;
        const {days,months,years,personalData,errors,displayErrors}=this.state;
        return(
            <div className="registration-school-wrapper-class">
            <div className={'modal-dialog'}>
                <div className={'modal-content'}>
                    <div className={'modal-header'}>
                        <h3>Personal Information</h3>
                        <button className={'close'} onClick={this.handleClose}>&times;
                        </button>
                    </div>
                    <div className={'modal-body'}>
                        <form encType={'multipart/form-data'}>
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
                                <label>First Name :</label>
                                <input className={'form-control'} minLength={3} type={'text'} placeholder={'First Name'} name={'firstName'} onChange={this.handleChange} onBlur={this.validate} value={personalData.firstName}/>
                                {(errors['firstName']!==(''||undefined))?<label className={'text-danger'}>{errors['firstName']}</label>:<span></span>}
                            </div>
                            <div className={'form-group'}>
                                <label>Last Name :</label>
                                <input className={'form-control'} type={'text'} placeholder={'Last Name'} name={'lastName'} onChange={this.handleChange} onBlur={this.validate} value={personalData.lastName}/>
                                {(errors['lastName']!==(''||undefined))?<label className={'text-danger'}>{errors['lastName']}</label>:<span></span>}
                            </div>
                            <div className={'form-group'}>
                                <label>Email :</label>
                                <input className={'form-control'} type={'text'} placeholder={'Email'} name={'email'} onChange={this.handleChange} onBlur={this.validate} value={personalData.email}/>
                                {(errors['email']!==(''||undefined))?<label className={'text-danger'}>{errors['email']}</label>:<span></span>}
                            </div>
                            <div className="form-group">
                                <label>Gender :</label>
                                <input type="radio" name="gender" value={'Male'}  onChange={this.handleChange} checked={(personalData.gender==='Male')?'checked':''}/>Male
                                <input type={'radio'} name="gender" value={'Female'}  onChange={this.handleChange} checked={(personalData.gender==='Female')?'checked':''}/>Female
                            </div>
                            <div className={'form-group'}>
                                <label>Password :</label>
                                <input className={'form-control'} type={'password'} placeholder={'Password'} name={'password'} onChange={this.handleChange} onBlur={this.validate} value={personalData.password}/>
                                {(errors['password']!==(''||undefined))?<label className={'text-danger'}>{errors['password']}</label>:<span></span>}
                            </div>
                            <div className={'form-group'}>
                                <label>Date of Birth :</label>
                                <label>DD<select className={'form-control'} name={'day'} onChange={this.handleChange} value={personalData.day}>
                                {
                                    days.map((day)=>{
                                        return(
                                            <option key={day}>{day}</option>
                                        )
                                    })
                                }
                                </select></label>
                                <label>MM<select className={'form-control'} name={'month'} onChange={this.handleChange} value={personalData.month}>
                                {
                                    months.map((month)=>{
                                        return(
                                            <option key={month}>{month  }</option>
                                        )
                                    })
                                }
                                </select></label>
                                <label>YYYY<select className={'form-control'} name={'year'} onChange={this.handleChange} value={personalData.year}>
                                {
                                    years.map((year)=>{
                                        return(
                                            <option key={year}>{year  }</option>
                                        )
                                    })
                                }
                                </select></label>
                            </div>
                            <div className={'form-group'}>
                                <label>Contact No. :</label>
                                <input className={'form-control'} type={'text'} placeholder={'Contact No.'}name={'phone'} onChange={this.handleChange} onBlur={this.validate} value={personalData.phone}/>
                                {(errors['phone']!==(''||undefined))?<label className={'text-danger'}>{errors['phone']}</label>:<span></span>}
                            </div>
                            <div className={'form-group'}>
                                <label>Profile Image :</label>
                                <input className={'form-control'} type={'file'} name={'photo'} onBlur={this.validate} onChange={this.handleChange} file={personalData.photo}/>
                                {(errors['photo']!==(''||undefined))?<label className={'text-danger'}>{errors['photo']}</label>:<span></span>}
                            </div>
                            <Button bsStyle="primary" onClick={this.nextPage}>Next</Button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return{
        signUpPage:state.signupPage,
        signupPageFields:state.signupPageFields
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        signupPageAction,setSignupPageFieldsAction
    },dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(SignUpPersonal);