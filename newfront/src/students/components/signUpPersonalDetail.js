import React from 'react';
import { bindActionCreators } from 'redux';
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
        personalData[name]=value;
        personalData['flag']=1;
        this.setState({
            personalData
        })
    }

    handleSubmit=(e)=>{
        console.log('submitted');
        this.props.setSignupPageFieldsAction(this.state.personalData);

    }

    render(){
        const {signupPageFields}=this.props;
        if(signupPageFields!==null)
            this.state.personalData=signupPageFields;
        const {days,months,years,personalData}=this.state;
        return(
                <div className={'container row'}>
                    <form className={'col-sm-10'}>
                        <div className={'form-group form-inline row'}>
                            <label className={'font-weight-bold col-sm-2'}>First Name :</label>
                            <input className={'form-control col-sm-4'} type={'text'} placeholder={'First Name'} name={'fnm'} onChange={this.handleChange} value={personalData.fnm}/>
                            <label className={'font-weight-bold col-sm-2'}>Last Name :</label>
                            <input className={'form-control col-sm-4'} type={'text'} placeholder={'Last Name'} name={'lnm'} onChange={this.handleChange} value={personalData.lnm}/>
                        </div>
                        <div className={'form-group form-inline row'}>
                            <label className={'font-weight-bold col-sm-2'}>Email :</label>
                            <input className={'form-control col-sm-10'} type={'text'} placeholder={'Email'} name={'email'} onChange={this.handleChange} value={personalData.email}/>
                        </div>
                        <div className="form-group radio form-inline">
                            <label className={'font-weight-bold col-sm-2'}>Gender :</label>
                            <label><input type="radio" name="gender" value={'Male'}  onChange={this.handleChange} checked={(personalData.gender==='Male')?'checked':''}/>Male</label>
                            <label className={'col-sm-2'}><input type="radio" name="gender" value={'Female'}  onChange={this.handleChange} checked={(personalData.gender==='Female')?'checked':''}/>Female</label>
                        </div>
                        <div className={'form-group form-inline row'}>
                            <label className={'font-weight-bold col-sm-2'}>Date of Birth :</label>
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
                        <div className={'form-group form-inline row'}>
                            <label className={'font-weight-bold col-sm-2'}>Contact No. :</label>
                            <input className={'form-control col-sm-10'} type={'text'} placeholder={'Contact No.'}name={'phone'} onChange={this.handleChange} value={personalData.phone}/>
                        </div>
                        <div className={'form-group form-inline row'}>
                            <label className={'font-weight-bold col-sm-2'}>Profile Image :</label>
                            <input className={'form-control col-sm-10'} type={'file'}/>
                        </div>
                        <button onClick={this.nextPage} className={'btn btn-primary float-right'}>Next</button>
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