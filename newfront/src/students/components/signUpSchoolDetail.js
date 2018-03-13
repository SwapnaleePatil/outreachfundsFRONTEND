import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {signupPageAction,setSignupPageFieldsAction} from '../action';

class SignUpSchool extends React.Component{
    constructor(props){
        super(props);
        this.state={
            schoolData:[]
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const {signupPageAction,setSignupPageFieldsAction} =this.props;
        signupPageAction(1);
        setSignupPageFieldsAction();
    }

    handleChange=(e)=>{
        const {signupPageFields}=this.props;
        const {name,value}=e.target;
        var {schoolData}=this.state;
        if(schoolData.length<=0)
            schoolData = signupPageFields;
        schoolData[name]=value;
        this.setState({
            schoolData
        })
    }
    previousPage=(e)=>{
        e.preventDefault();
        const {signupPageAction,setSignupPageFieldsAction,signUpPage} =this.props;
        signupPageAction(signUpPage - 1);
        setSignupPageFieldsAction(this.state.schoolData);
    }

    render(){
        const {signupPageFields}=this.props;
        if(signupPageFields!==null)
            this.state.schoolData=signupPageFields;
        const {schoolData}=this.state;
        return(
            <div className={'container row'}>
                <form className={'col-sm-10'}>
                    <div className={'form-group form-inline row'}>
                        <label className={'font-weight-bold col-sm-2'}>School Name :</label>
                        <select className={'form-control col-sm-9'}>
                            <option>{'---Select School---'}</option>
                        </select>
                    </div>
                    <div className={'form-group form-inline row'}>
                        <label className={'font-weight-bold col-sm-2'}>Organization Name :</label>
                        <input className={'form-control col-sm-9'} type={'text'} placeholder={'Organization Name'} name={'orgName'} onChange={this.handleChange} value={schoolData.orgName}/>
                    </div>
                    <div className="form-group radio form-inline">
                        <label className={'font-weight-bold col-sm-2'}>Role :</label>
                        <label><input type="radio" name="role" value={'Officer'}  onChange={this.handleChange} checked={(schoolData.role==='Officer')?'checked':''}/>Officer</label>
                        <label className={'col-sm-2'}><input type="radio" name="role" value={'Member'}  onChange={this.handleChange} checked={(schoolData.role==='Member')?'checked':''}/>Member</label>
                    </div>
                    <div className={'form-group form-inline row'}>
                        <label className={'font-weight-bold col-sm-2'}>Address :</label>
                        <textarea className={'form-control col-sm-10'} placeholder={'Address'} name={'orgAddress'} onChange={this.handleChange}>{schoolData.orgAddress}</textarea>
                    </div>
                    <div className={'form-group form-inline row'}>
                        <label className={'font-weight-bold col-sm-2'}>Email :</label>
                        <input className={'form-control col-sm-10'} type={'text'} placeholder={'Email'} name={'orgEmail'} onChange={this.handleChange} value={schoolData.orgEmail}/>
                    </div>
                    <div className={'form-group form-inline row'}>
                        <label className={'font-weight-bold col-sm-2'}>Contact No. :</label>
                        <input className={'form-control col-sm-10'} type={'text'} placeholder={'Contact No.'} name={'orgContact'} onChange={this.handleChange} value={schoolData.orgContact}/>
                    </div>
                    <div className={'btn-group float-right'}>
                    <button onClick={this.previousPage} className={'btn btn-primary'}>Previous</button>
                        <button onClick={this.handleSubmit} className={'btn btn-primary'}>Submit</button>
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

export default connect(mapStateToProps,matchDispatchToProps)(SignUpSchool);