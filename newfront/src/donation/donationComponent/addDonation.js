import React, {Component} from 'react';
import {Button, FormControl, FormGroup, Table} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getDonationDataAction} from './../actions/getDonationDataAction'
import {addDonationAction} from './../actions/addDonationAction'

class DisplayForm extends Component {
    constructor() {
        super();
        this.state = {
            amount: "",
            eventName: "",
            organizationName: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('All Props : ', nextProps);
    }

    onChange = (e) => {
        this.setState({
            amount: e.target.value
        });
    }
    onSubmit = () => {


    };

    render() {
        return (
            <div>
                <h1>Donate Amount</h1>
                <Table>
                    <tr>
                        <th>Date :</th>
                        <td>
                            <h4><b>{new Date().getDate()}-{new Date().getMonth()}-{new Date().getFullYear()}</b></h4>
                        </td>

                    </tr>
                    <tr>
                        <th>Event Name :</th>
                        <FormGroup>
                            <FormControl type="text" value={this.state.eventName} id="eventName" onChange={(e) => {
                                this.onChange(e)
                            }}/>
                        </FormGroup>
                    </tr>
                    <tr>
                        <th>Organization Name :</th>
                        <td>
                            <FormGroup>
                                <FormControl type="text" value={this.state.organizationName} id="organizationName"
                                             onChange={(e) => {
                                                 this.onChange(e)
                                             }}/>
                            </FormGroup>
                        </td>
                    </tr>
                    <tr>
                        <th>Location :</th>
                        <td>
                            <FormGroup>
                                <FormControl type="text" value={this.state.location} id="location" onChange={(e) => {
                                    this.onChange(e)
                                }}/>
                            </FormGroup>
                        </td>
                    </tr>
                    <tr>
                        <th>Amount :</th>
                        <td>
                            <FormGroup>
                                <FormControl type="text" id="amount" value={this.state.amount} onChange={(e) => {
                                    this.onChange(e)
                                }} placeholder="$ 25000"/>
                            </FormGroup>
                        </td>
                    </tr>
                    <tr>
                        <th colSpan="2"><Button id="donate" onClick={() => {
                            this.onSubmit()
                        }}>Donate</Button></th>
                    </tr>
                </Table>
                <center><h2>Donation Requests</h2></center>
                <Table>
                    <tr>
                        <th>Date</th>
                        <th>Event Name</th>
                        <th>Organization Name</th>
                        <th>Location</th>
                    </tr>
                    {
                        this.props.donationData.map((value,index)=>{
                            return<tr>
                                <td>{value}</td>
                            </tr>
                        })
                    }
                </Table>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        donationData: state.donationPage
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getDonationDataAction,
        addDonationAction
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DisplayForm)