import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import './businessCSS.css'
import {connect} from 'react-redux'
import {businessFields} from '../action/index'
import {businessSignup} from "../action/index";
import {bindActionCreators} from 'redux';

class SecondPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerData: [],
        }
    }

    handlePreviousPage = (e) => {
        e.preventDefault();
        const {businessSignup, businessFields, Page} = this.props;
        businessSignup(Page - 1);
        businessFields(this.state.ownerData);
    }
    handleChange = (e) => {
        const {Fields} = this.props;
        const {name, value} = e.target;
        var {ownerData} = this.state;
        if (ownerData.length <= 0)
            ownerData = Fields;
        ownerData[name] = value;
        this.setState({ownerData})
    }
    chkValidation = (e) => {
         this.setState({msg: ""});
        let name = e.target.name;
        if (name === "businessName" || name === "businessType") {
            let rename = /^([A-Za-z ])*$/;;
            if (!rename.test(e.target.value)) {
                this.setState({msg: "Do not Enter Number Please"});
            }
        }
        if (name === "businessEmail") {
            let reemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!reemail.test(e.target.value)) {
                this.setState({msg: "Email is InValid"});
            }
        }
       if (name === "businessPhone") {
            let rephone = /^((?!(0))[0-9]{6,13})$/;
            if (!rephone.test(e.target.value)) {
                this.setState({msg: "Enter Number between 6 to 13 digit"});
            }
        }
    }
    handlePage = (e) => {
        e.preventDefault();
        if (this.state.msg !== "") {
            this.setState({
                msg: "Please Fill Valid Information"
            })
        } else {
            this.props.businessSignup(this.props.Page + 1);
            this.handleSubmit();
        }
    }
    handleSubmit = () => {
        let {ownerData}=this.state;
        if(ownerData["businessHour"]<9)
        {
            ownerData["businessHour"]="0"+ownerData["businessHour"];
        }else{
            ownerData["businessHour"]=ownerData["businessHour"];
        }
        if(ownerData["businessMinute"]<9)
        {
            ownerData["businessMinute"]="0"+ownerData["businessMinute"];
        }else{
            ownerData["businessMinute"]=ownerData["businessMinute"];
        }
        ownerData["businessHours"]=ownerData["businessHour"]+":"+ownerData["businessMinute"];
        this.setState({ownerData})
        this.props.businessFields(this.state.ownerData);
    }

    render() {
       const {Fields} = this.props;
        if (Fields !== null)
            this.state.ownerData = Fields;
        let ownerData = this.state.ownerData;
        return (
            <form onSubmit={this.handlePage}>
                <div className='tablecss'>
                    <div style={{"background-color": "white"}}><Modal.Header><label>Business
                        Information</label></Modal.Header>
                        <div align="right">
                            <Button onClick={()=>{
                                window.location="/"}
                            }
                            >Close</Button></div>
                    <span style={{"color": "red"}}>{this.state.msg}</span></div>
                    <div>
                        <Table bordered condensed hover responsive style={{"background-color": "white"}}>
                            <tbody>
                            <tr>
                                <td><label>Business Name</label></td>
                                <td><input className="form-control" value={ownerData.businessName}
                                           onChange={(e) => {
                                               this.handleChange(e);
                                               this.chkValidation(e);
                                           }} name="businessName" type="text" required/></td>
                            </tr>
                            <tr>
                                <td><label>Business Hours</label></td>
                                <td>
                                    <div className="form-inline">
                                        Hour:<input value={ownerData.businessHour} className="form-control"
                                                    style={{"width": "20%"}}
                                                    onChange={this.handleChange} name="businessHour" type="number"
                                                    min="00" max="24" required/>{'  '}
                                        Minute:<input value={ownerData.businessMinute} className="form-control"
                                                      style={{"width": "20%"}}
                                                      onChange={this.handleChange} name="businessMinute" type="number"
                                                      min="00" max="59" required/></div>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Business Type</label></td>
                                <td><input className="form-control" value={ownerData.businessType}
                                           onChange={(e) => {
                                               this.handleChange(e);
                                               this.chkValidation(e);
                                           }} name="businessType" type="text" required/></td>
                            </tr>
                            <tr>
                                <td><label>Phone no</label></td>
                                <td><input name="businessPhone" type="number" className="form-control"
                                           value={ownerData.businessPhone}
                                           onChange={(e) => {
                                               this.handleChange(e);
                                               this.chkValidation(e);
                                           }} required/></td>
                            </tr>
                            <tr>
                                <td><label>Business Email</label></td>
                                <td><input className="form-control" name="businessEmail" value={ownerData.businessEmail}
                                           onChange={(e) => {
                                               this.handleChange(e);
                                               this.chkValidation(e);
                                           }} type="email" required/></td>
                            </tr>
                            <tr>
                                <td><label>Address</label></td>
                                <td><textarea className="form-control" value={ownerData.businessAddress}
                                           onChange={this.handleChange} name="businessAddress" /></td>
                            </tr>
                            <tr>
                                <td><label>Tax Payer Id</label></td>
                                <td><input className="form-control" value={ownerData.taxPayerId}
                                           onChange={this.handleChange} name="taxPayerId" type="number" required/></td>
                            </tr>
                            <tr>
                                <td><Button active type="button" bsStyle="info" onClick={this.handlePreviousPage}>
                                    Previous
                                </Button></td>
                                 <td><Button active type="submit" bsStyle="info">Next</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </form>

        );
    }
}

function mapStateToProps(state) {
    return {
        Page: state.businessSignUpRed,
        Fields: state.businessFieldsRed
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({businessFields, businessSignup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondPage)
