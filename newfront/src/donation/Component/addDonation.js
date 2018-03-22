import React, {Component} from 'react';
import './graph.css'
import {Button,FormControl,FormGroup,HelpBlock,Table} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getEventDataAction} from '../actions/index'
import {fetchAllSchoolDetails} from './../../students/action/index'
import {addDonationAction, getDonationAction, updateDonationAction} from '../actions/index'
import {FetchByToken} from '../actions/index'

class DisplayForm extends Component {
    constructor() {
        super();
        this.state = {
            amount: "",
            eventName: "",
            organizationId: "",
            allData: [],
            organizationNameArr: [],
            date: "",
            location: "",
            donationData:[],
            organizationName:"",
            eventId:""
        }
    }

    componentDidMount() {
        this.props.FetchByToken();
        this.props.getEventDataAction();
        this.props.fetchAllSchoolDetails();
        this.props.getDonationAction();
        // this.props.getOrganizationAndSchool();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.donationData);

        //display
        let {donationData} = this.state;
        donationData=[]
        nextProps.donationData.forEach((rec)=>{
            if(rec.businessId === (this.props.businessInfo.User && this.props.businessInfo.User._id)){
                donationData.push(rec);
            }
        });
        this.setState({
            donationData
        });

        let arr = nextProps.organizationData;
        let newarr;
        let final = [];
        nextProps.eventsData.forEach((value) => {

            newarr = arr.filter((school) => value.schoolOrganisation === school._id);
            final.push(newarr[0] && newarr[0].organisationName);
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
        let eventId = "";
        let organizationId="";
        debugger;
        this.props.eventsData.forEach((value)=>{
            if(value.eventName === this.state.eventName){
                eventId = value._id;
                organizationId = value.schoolOrganisation;
            }
        });
        console.log('business Info',this.props.businessInfo);
        let data = {
            'eventDate': this.state.date,
            'donationDate': `${new Date().getDate()}-${('0' + new Date().getMonth()).slice(-2)}-${new Date().getFullYear()}`,
            'eventId': eventId,
            'businessId':this.props.businessInfo.User._id,
            'organizationId': organizationId,
            'location': this.state.location,
            'amount': Math.abs(Number(this.state.amount))
        };
        this.props.donationData.forEach((value) => {
            if (eventId === value.eventId && this.props.businessInfo.User._id === value.businessId) {
                value.amount = Number(value.amount) + Number(this.state.amount);
                Udata = {
                    '_id': value._id,
                    'eventDate': this.state.date,
                    'donationDate': `${new Date().getDate()}-${('0' + new Date().getMonth()).slice(-2)}-${new Date().getFullYear()}`,
                    'eventId': eventId,
                    'organizationId': organizationId,
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
    /*donate = (value, index) => {

        this.setState({
            date: value.eventDate,
            eventName: value.eventName,
            organizationName: this.state.organizationNameArr[index],
            location: value.location
        });
    };*/
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
            organizationId: this.props.eventsData[e.target.value].schoolOrganisation,
            location: this.props.eventsData[e.target.value].location,
            organizationName:this.state.organizationNameArr[e.target.value],
            eventId:this.props.eventsData[e.target.value].eventId
        });
    };
    displayEvents = () => {
        let items = [];
        items.push(<option value="" selected={true} disabled={true} hidden={true}>Select Event</option>);
        this.props.eventsData.forEach((value, index) => {
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
                    <tbody>
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
                    </tbody>
                </Table>
                <center><h2>Donation Requests</h2></center>
                <Table bordered striped>
                    <tbody>
                    <tr>
                        <th>Event Date</th>
                        <th>Event Name</th>
                        <th>Organization Name</th>
                        <th>Location</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                    {
                        this.state.donationData.map((value, index) => {
                            return <tr>
                                <td>{value.eventDate}</td>
                                <td>
                                    {
                                        this.props.eventsData.map((e)=>{
                                            if(value.eventId === e._id){
                                                return e.eventName
                                            }
                                        })
                                }</td>
                                <td>{
                                    this.props.organizationData.map((e)=>{
                                        if(value.organizationId === e._id){
                                            return e.organisationName
                                        }
                                    })
                                }</td>
                                <td>{value.location}</td>
                                <td>{`$ ${value.amount}`}</td>
                                <td>{
                                    value.status ?
                                        <b>Confirmed</b>
                                        :
                                        <b>Pending</b>
                                }</td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        donationData: state.donation,
        organizationData: state.schools,
        eventsData: state.events,
        businessInfo:state.businessInfo
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getEventDataAction,
        fetchAllSchoolDetails,
        addDonationAction,
        getDonationAction,
        updateDonationAction,
        FetchByToken
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DisplayForm)