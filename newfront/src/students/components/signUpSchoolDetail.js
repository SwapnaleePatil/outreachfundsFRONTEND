import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {signupPageAction,setSignupPageFieldsAction,fetchAllSchoolDetails} from '../action';


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

        if(name==='selectedSchool')
            this.handleSchoolNameChange(e);

        schoolData[name]=value;
        this.setState({
            schoolData
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const {signupPageAction,setSignupPageFieldsAction,signupPageFields} =this.props;
        console.log("Complete student data - ",signupPageFields);
        signupPageAction(1);
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
        if(e.target.selectedOptions[0].id==='other') {
            this.setState({addSchool: true})
            schoolData['orgName']='';
        }
        else{
            this.setState({addSchool:false})
            var selectedSchool=e.target.selectedOptions[0].innerHTML;
            const {Schools}=this.props;
            var arr=Schools.filter((school)=>school.schoolName===selectedSchool);
            schoolData['organisationName']=arr[0].organisationName;
            schoolData['organisationAddress']=arr[0].organisationAddress;
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
            <div className={'container row'}>
                <form className={'col-sm-10'}>
                    <div className={'form-group form-inline row'}>
                        <label className={'font-weight-bold col-sm-2'}>School Name :</label>
                        <select className={'form-control col-sm-9'} name={'selectedSchool'} onChange={this.handleChange} value={schoolData.selectedSchool}>
                            <option>{'---Select School---'}</option>
                            {
                               Schools.map((school)=>{
                                    return <option key={school._id}>{school.schoolName}</option>
                                })
                            }
                            <option id={'other'}>{'Other'}</option>
                        </select>

                    </div>
                    <div className={'form-group row'}>
                        <div className={'col-sm-3 col-md-offset-1'}>
                        {(this.state.addSchool)?<input className={'form-control col-sm-2 col-md-offset-4'} name={'school'} onChange={this.handleChange} value={schoolData.school} type={'text'}/>:<span></span>}
                        </div>
                    </div>
                    <div className={'form-group form-inline row'}>
                        <label className={'font-weight-bold col-sm-2'}>Organization Name :</label>
                        <input className={'form-control col-sm-9'} type={'text'} placeholder={'Organization Name'} name={'organisationName'} onChange={this.handleChange} value={schoolData.orgName}/>
                    </div>
                    <div className="form-group radio form-inline">
                        <label className={'font-weight-bold col-sm-2'}>Role :</label>
                        <label><input type="radio" name="role" value={'Officer'}  onChange={this.handleChange} checked={(schoolData.role==='Officer')?'checked':''}/>Officer</label>
                        <label className={'col-sm-2'}><input type="radio" name="role" value={'Member'}  onChange={this.handleChange} checked={(schoolData.role==='Member')?'checked':''}/>Member</label>
                    </div>
                    <div className={'form-group form-inline row'}>
                        <label className={'font-weight-bold col-sm-2'}>Address :</label>
                        <textarea className={'form-control col-sm-10'} placeholder={'Address'} name={'organisationAddress'} onChange={this.handleChange}>{schoolData.orgAddress}</textarea>
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
        signupPageAction,setSignupPageFieldsAction,fetchAllSchoolDetails
    },dispatch)
};

export default connect(mapStateToProps,matchDispatchToProps)(SignUpSchool);