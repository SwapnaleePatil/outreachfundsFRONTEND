import React from 'react';
import { bindActionCreators } from 'redux';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {signupPageAction,setSignupPageFieldsAction} from '../action';
class SignUpPersonal extends React.Component{

    constructor(props){
        super(props);
        this.state={
            days:[],
            months:[],
            years:[],
            personalData:[]
        }
    }
    nextPage=(e)=>{
        e.preventDefault();
        console.log("Signup page ",this.props.signUpPage);
        this.props.signupPageAction(this.props.signUpPage + 1);
        this.handleSubmit();
    }

    componentWillMount(){
        this.createDays();
        this.createMonths();
        this.createYears();
    }
    createDays=()=>{
        var days=[];
        for(let i=1;i<=31;i++){
            days.push(i);
        }
        this.setState({
            days
        })
    }
    createMonths=()=>{
        var months=[];
        for(let i=1;i<=12;i++){
            months.push(i);
        }
        this.setState({
            months
        })
    }
    createYears=()=>{
        var d=new Date();
        var years=[];
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
        if(name==='photo')
            personalData[name]=e.target.files[0];
        else
            personalData[name]=value;
        this.setState({
            personalData
        })
    }

    handleSubmit=(e)=>{
        console.log('submitted');
        const {personalData}=this.state;
        let date=(personalData.month|| 1) + "/" + (personalData.day || 1) + "/" + (personalData.year || new Date().getFullYear()-50);
        personalData['dob']=date;
        this.setState({
            personalData
        },()=>{this.props.setSignupPageFieldsAction(personalData)})


    }

    render(){
        const {signupPageFields}=this.props;
        if(signupPageFields!==null)
            this.state.personalData=signupPageFields;
        const {days,months,years,personalData}=this.state;
        return(
            <div className={'col-sm-6 jumbotron col-sm-offset-3'}>
                    <form className={'container col-sm-8 col-sm-offset-2'} encType={'multipart/form-data'}>
                        <div className={'modal-header'}><h2>Personal Information</h2></div>
                        <div align="right">
                            <Button onClick={()=>{
                                window.location="/"}
                            }
                            >Close</Button></div>
                        <div className={'modal-body'}>
                        <div className={'form-group'}>
                            <label>First Name :</label>
                            <input className={'form-control'} type={'text'} placeholder={'First Name'} name={'firstName'} onChange={this.handleChange} value={personalData.firstName}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Last Name :</label>
                            <input className={'form-control'} type={'text'} placeholder={'Last Name'} name={'lastName'} onChange={this.handleChange} value={personalData.lastName}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Email :</label>
                            <input className={'form-control'} type={'text'} placeholder={'Email'} name={'email'} onChange={this.handleChange} value={personalData.email}/>
                        </div>
                        <div className="form-group">
                            <label>Gender :</label>
                            <input type="radio" name="gender" value={'Male'}  onChange={this.handleChange} checked={(personalData.gender==='Male')?'checked':''}/>Male
                            <input type={'radio'} name="gender" value={'Female'}  onChange={this.handleChange} checked={(personalData.gender==='Female')?'checked':''}/>Female
                        </div>
                        <div className={'form-group'}>
                            <label>Password :</label>
                            <input className={'form-control'} type={'password'} placeholder={'Password'} name={'password'} onChange={this.handleChange} value={personalData.password}/>
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
                            <input className={'form-control'} type={'text'} placeholder={'Contact No.'}name={'phone'} onChange={this.handleChange} value={personalData.phone}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Profile Image :</label>
                            <input className={'form-control'} type={'file'} name={'photo'} onChange={this.handleChange}/>
                        </div>
                        <Button bsStyle="primary" onClick={this.nextPage}>Next</Button>
                        </div>
                    </form>
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