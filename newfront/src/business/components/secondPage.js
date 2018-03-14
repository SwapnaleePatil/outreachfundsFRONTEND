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
            ownerData: []
        }
    }

    handlePreviousPage = (e) => {
        e.preventDefault();
        const {businessSignup, businessFields, Page} = this.props;
        businessSignup(Page - 1);
        businessFields(this.state.ownerData);
    }
    handleChange = (e) => {
        console.log("Log",this.props)
        const {Fields}=this.props;
        const {name,value}=e.target;
        var {ownerData}=this.state;
        if(ownerData.length<=0)
            ownerData = Fields;
        ownerData[name]=value;
        this.setState({ownerData},()=>{
            console.log("OwnerData",ownerData);
        })
    }
    handlePage = (e) => {
        e.preventDefault();
        this.props.businessSignup(this.props.Page + 1);
        this.handleSubmit();
    }
    handleSubmit = () => {
        this.props.businessFields(this.state.ownerData);
    }

    render() {
        debugger

        const {Fields}=this.props;
        if(Fields!==null)
            this.state.ownerData=Fields;
        let ownerData = this.state.ownerData;
        return (
            <form onSubmit={this.handlePage}>
                <div className='tablecss'>
                    <div style={{"background-color": "white"}}><Modal.Header><label>Business
                        Information</label></Modal.Header></div>
                    <div>
                        <Table bordered condensed hover responsive style={{"background-color": "white"}}>
                            <tbody>
                            <tr>
                                <td><label>Business Name</label></td>
                                <td><input className="form-control" value={ownerData.businessName}
                                           onChange={this.handleChange} name="businessName" type="text"/></td>
                            </tr>
                            <tr>
                                <td><label>Business Hours</label></td>
                                <td><input className="form-control" value={ownerData.businessHours}
                                           onChange={this.handleChange} name="businessHours" type="time"/></td>
                            </tr>
                            <tr>
                                <td><label>Business Type</label></td>
                                <td><input className="form-control" value={ownerData.businessType}
                                           onChange={this.handleChange} name="businessType" type="text"/></td>
                            </tr>
                            <tr>
                                <td><label>Phone no</label></td>
                                <td><input className="form-control" value={ownerData.businessPhone}
                                           onChange={this.handleChange} name="businessPhone" type="number"/></td>
                            </tr>
                            <tr>
                                <td><label>Business Email</label></td>
                                <td><input className="form-control" name="businessEmail" value={ownerData.businessEmail}
                                           onChange={this.handleChange} type="email"/></td>
                            </tr>
                            <tr>
                                <td><label>Address</label></td>
                                <td><input className="form-control" value={ownerData.businessAddress}
                                           onChange={this.handleChange} name="businessAddress" type="text"/></td>
                            </tr>
                            <tr>
                                <td><label>Tax Payer Id</label></td>
                                <td><input className="form-control" value={ownerData.taxPayerId}
                                           onChange={this.handleChange} name="taxPayerId" type="number"/></td>
                            </tr>
                            <tr>
                                <td><Button active type="button" bsStyle="info" onClick={this.handlePreviousPage}>
                                    Previous
                                </Button></td>
                                <td><Button active type="submit" bsStyle="info" >Next</Button>
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
    console.log("Fields",state.businessFieldsRed)
    return {
        Page: state.businessSignUpRed,
        Fields: state.businessFieldsRed
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({businessFields, businessSignup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondPage)
