import React, {Component} from 'react';
import './addDonation.css'
import {Button, FormControl, FormGroup, HelpBlock, Table} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getEventDataAction} from '../actions/getEventsDataAction'
// import {getOrganizationAndSchool} from './../actions/getDonationDataAction'
import {fetchAllSchoolDetails} from './../../students/action/index'
import {addDonationAction, getDonationAction, updateDonationAction} from './../actions/addDonationAction'

class DisplayForm extends Component {
    constructor() {
        super();
        this.state = {
            amount: "",
            eventName: "",
            organizationName: "",
            allData: [],
            organizationNameArr: [],
            date: "",
            location: ""
        }
    }

    componentWillMount() {
        this.props.getEventDataAction();
        this.props.fetchAllSchoolDetails();
        this.props.getDonationAction();
        // this.props.getOrganizationAndSchool();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.donationData);
        let arr = nextProps.organizationData;
        let newarr;
        let final = [];
        nextProps.eventsData.map((value) => {
            newarr = arr.filter((school) => value.schoolOrganisation === school._id);
            final.push(newarr[0].organisationName);
        });
        this.setState({
            organizationNameArr: final
        });
    }

    onChange = (e) => {

        this.setState({
            [e.target.id]: Math.abs(e.target.value)
        });
    }
    onSubmit = () => {
        let status = false;
        let Udata = {};
        let data = {
            'eventDate': this.state.date,
            'donationDate': `${new Date().getDate()}-${('0' + new Date().getMonth()).slice(-2)}-${new Date().getFullYear()}`,
            'eventName': this.state.eventName,
            'organizationName': this.state.organizationName,
            'location': this.state.location,
            'amount': Math.abs(Number(this.state.amount))
        };
        this.props.donationData.forEach((value) => {
            if (this.state.eventName === value.eventName && this.state.organizationName === value.organizationName) {
                value.amount = Number(value.amount) + Number(this.state.amount);
                Udata = {
                    '_id': value._id,
                    'eventDate': this.state.date,
                    'donationDate': `${new Date().getDate()}-${('0' + new Date().getMonth()).slice(-2)}-${new Date().getFullYear()}`,
                    'eventName': this.state.eventName,
                    'organizationName': this.state.organizationName,
                    'location': this.state.location,
                    'amount': Math.abs(Number(value.amount)),
                    'status': false
                };
                status = true;
            }
        });
        if (status) {
            this.props.updateDonationAction(Udata);
            status = false;
        }
        else {
            this.props.addDonationAction(data);
        }
    };
    donate = (value, index) => {

        this.setState({
            date: value.eventDate,
            eventName: value.eventName,
            organizationName: this.state.organizationNameArr[index],
            location: value.location
        });
    };
    onEventChange = (e) => {

        this.setState({
            amount:""
        });

        document.getElementById('treventDate').style.visibility = "visible";
        document.getElementById('trorganizationName').style.visibility = "visible";
        document.getElementById('trlocation').style.visibility = "visible";
        document.getElementById('tramount').style.visibility = "visible";
        document.getElementById('trbutton').style.visibility = "visible";

        this.setState({
            date: this.props.eventsData[e.target.value].eventDate,
            eventName: this.props.eventsData[e.target.value].eventName,
            organizationName: this.state.organizationNameArr[e.target.value],
            location: this.props.eventsData[e.target.value].location
        });
    };
    displayEvents = () => {
        let items = [];
        items.push(<option value="" selected={true} disabled={true} hidden={true}>Select Event</option>);
        this.props.eventsData.map((value, index) => {
            items.push(<option value={index} key={index}>{value.eventName}</option>)
        });
        return items;
    };

    render() {
        console.log('donation data', this.props.donationData);
        return (
            <div>
                <h1>Donate Amount</h1>
                <Table>
                    <tr>
                        <th>Event Name :</th>
                        <FormGroup>
                            <FormControl componentClass="select" default="Select Event" onChange={(e) => {
                                this.onEventChange(e)
                            }}>{this.displayEvents()}</FormControl>
                        </FormGroup>
                        <HelpBlock>Please Select the Event for further procession</HelpBlock>
                    </tr>
                    <tr id="treventDate" style={{visibility: "hidden"}}>
                        <th>Date :</th>
                        <FormGroup>
                            <FormControl type="text" value={this.state.date} id="eventDate" readOnly={true}/>
                        </FormGroup>
                    </tr>
                    <tr id="trorganizationName" style={{visibility: "hidden"}}>
                        <th>Organization Name :</th>
                        <td>
                            <FormGroup>
                                <FormControl type="text" value={this.state.organizationName} id="organizationName" readOnly={true}/>
                            </FormGroup>
                        </td>
                    </tr>
                    <tr id="trlocation" style={{visibility: "hidden"}}>
                        <th>Location :</th>
                        <td>
                            <FormGroup>
                                <FormControl type="text" value={this.state.location} id="location" readOnly={true}/>
                            </FormGroup>
                        </td>
                    </tr>
                    <tr id="tramount" style={{visibility: "hidden"}}>
                        <th>Amount :</th>
                        <td>
                            <FormGroup>
                                <FormControl type="number" id="amount" value={this.state.amount} onChange={(e) => {
                                    this.onChange(e)
                                }} placeholder=" in $"/>
                            </FormGroup>
                        </td>
                    </tr>
                    <tr id="trbutton" style={{visibility: "hidden"}}>
                        <th colSpan="2"><Button id="donate" onClick={() => {
                            this.onSubmit()
                        }}>Donate</Button></th>
                    </tr>
                </Table>
                <center><h2>Donation Requests</h2></center>
                <Table>
                    <tr>
                        <th>Event Date</th>
                        <th>Event Name</th>
                        <th>Organization Name</th>
                        <th>Location</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                    {
                        this.props.donationData.map((value, index) => {
                            return <tr>
                                <td>{value.eventDate}</td>
                                <td>{value.eventName}</td>
                                <td>{value.organizationName}</td>
                                <td>{value.location}</td>
                                <td>{value.amount}</td>
                                <td>{
                                    value.status ?
                                        <b>Confirmed</b>
                                        :
                                        <b>Pending</b>
                                }</td>
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
        donationData: state.donation,
        organizationData: state.schools,
        eventsData: state.events
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getEventDataAction,
        fetchAllSchoolDetails,
        addDonationAction,
        getDonationAction,
        updateDonationAction
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DisplayForm)