import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import './businessCSS.css'
import {connect} from'react-redux'
import {businessFields} from '../action/index'
import {businessPage} from "../action/index";
import {bindActionCreators} from 'redux';
class ThirdPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            ownerData:[]
        }
    }
    //Handle Change In State
    handleChange=(e)=>{
        const {Fields}=this.props;
        const {name,value}=e.target;
        var {ownerData}=this.state;
        if(ownerData.length<=0)
            ownerData = Fields;
        ownerData[name]=value;
        this.setState({
            ownerData
        })
    }
    //handle Paging
    handlePage=(e)=>{
        e.preventDefault();
        this.props.businessPage(this.props.Page + 1);
        this.handleSubmit();
    }
    //handle Paging
    handlePreviousPage = (e) => {
        e.preventDefault();
        const {businessPage, businessFields, Page} = this.props;
        businessPage(Page - 1);
        businessFields(this.state.ownerData);
    }
    //handle form data
    handleSubmit=()=>{
        this.props.businessFields(this.state.ownerData);
    }
    render() {
        const {Fields}=this.props;
        if(Fields!==null)
            this.state.ownerData=Fields;
        let ownerData=this.state.ownerData;
        return (
            <form onSubmit={this.handlePage}>
                <div className='tablecss'>
                    <div style={{"background-color": "white"}}><Modal.Header><label>Business
                        Information</label></Modal.Header>
                        <div align="right">
                            <Button onClick={()=>{
                                window.location="/"}
                            }
                            >Close</Button></div></div>
                    <div>
                        <Table bordered condensed hover responsive style={{"background-color": "white"}}>
                            <tbody>
                            <tr>
                                <td ><label>Subscription Pricing</label></td>
                                <td>
                                    <tr>
                                        <td><input name="pricing" type="radio" value="$14.99" onChange={this.handleChange} checked={ownerData.pricing==="$14.99"?true:false}/> {' '}
                                            Monthly Subscription: $14.99 Per Month
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><input name="pricing" type="radio" value="$12.99" onChange={this.handleChange} checked={ownerData.pricing==="$12.99"?true:false}/> {' '}
                                            Monthly Subscription: $12.99 Per Month
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><input name="pricing" type="radio" value="$8.99" onChange={this.handleChange} checked={ownerData.pricing==="$8.99"?true:false}/> {' '}
                                            Monthly Subscription: $8.99 Per Month
                                        </td>
                                    </tr>
                                </td>
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
        Page:state.businessSignUpRed,
        Fields:state.businessFieldsRed
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({businessFields,businessPage},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(ThirdPage)
