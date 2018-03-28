import React, {Component} from 'react';
import './addDonation.css'
import {Button,FormControl,FormGroup,HelpBlock,Table} from 'react-bootstrap';
import _ from 'lodash';
import {connect} from 'react-redux';
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import {bindActionCreators} from 'redux';
import {getEventDataAction} from '../actions/index'
import {fetchAllSchoolDetails} from './../../students/action/index'
import {addDonationAction, updateDonationAction} from '../actions/index'

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
            eventId:"",
            currentPage:1,
            recordsPerPage:2,
            paginationData:[],
            isAsc:true,
            eventsData:[]
        }
    }

    componentWillMount() {
        // this.props.FetchByToken();
        if(this.props.donationData.length===0){
            this.props.getEventDataAction();
        }
        this.props.fetchAllSchoolDetails();
        // this.props.getOrganizationAndSchool();
    }

    componentWillReceiveProps(nextProps) {
        //display
        let {eventsData,donationData} = this.state;
        eventsData=[];
        donationData=[];
        nextProps.eventsData.forEach((rec)=>{
            if(rec.businessSponsor.includes((this.props.businessInfo.User && this.props.businessInfo.User._id)) && rec.accept.includes((this.props.businessInfo.User && this.props.businessInfo.User._id))){
                eventsData.push(rec);
            }
        });
        nextProps.donationData.forEach((rec)=>{
            if(rec.businessId === (this.props.businessInfo.User && this.props.businessInfo.User._id)){
                donationData.push(rec);
            }
        });
        this.setState({
            eventsData,
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
    success=(msg)=>{
        //e.preventDefault();
        Alert.success(msg, {
            position: 'top-right',
            effect: 'scale',
            beep: true,
            timeout: 1500,
            offset: 100
        });
    };
    onChange = (e) => {

        this.setState({
            [e.target.id]: Math.abs(e.target.value)
        });
    };
    sort=(e)=>{
        let{donationData} = this.state;
        if(this.state.isAsc) {
            donationData = _.orderBy(donationData, [e.target.id], ['asc']);
        }
        else {
            donationData= _.orderBy(donationData, [e.target.id], ['desc']);
        }
        this.setState({
            isAsc:!this.state.isAsc,
            donationData
        });
    };
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
            this.success('Donation Amount Updated.');
            document.getElementById('SelectEvent').selectedIndex="default";
            document.getElementById('treventDate').style.visibility = "hidden";
            document.getElementById('trorganizationName').style.visibility = "hidden";
            document.getElementById('trlocation').style.visibility = "hidden";
            document.getElementById('tramount').style.visibility = "hidden";
            document.getElementById('trbutton').style.visibility = "hidden";
            document.getElementById('help').style.visibility = "visible";
        }
        else {
            this.props.addDonationAction(data);
            this.success('Donation Added.')
        }
    };
    displayEvents = () => {
        let items = [];
        items.push(<option value="" selected={true} disabled={true} hidden={true}>Select Event</option>);
        this.state.eventsData.forEach((value, index) => {
            items.push(<option value={value._id} key={index}>{value.eventName}</option>)
        });
        return items;
    };
    handleClick=(event)=>{
        this.setState({
            currentPage: Number(event.target.id)
        });
    };
    onEventChange = (e) => {
        let tempId=0;
        this.setState({
            amount:""
        });
        document.getElementById('treventDate').style.visibility = "visible";
        document.getElementById('trorganizationName').style.visibility = "visible";
        document.getElementById('trlocation').style.visibility = "visible";
        document.getElementById('tramount').style.visibility = "visible";
        document.getElementById('trbutton').style.visibility = "visible";
        document.getElementById('help').style.visibility = "hidden";
        tempId = (this.props.eventsData.findIndex((events)=>events._id===e.target.value));
        console.log('tempId',tempId);
        this.setState({
            date: this.props.eventsData[tempId].eventDate,
            eventName: this.props.eventsData[tempId].eventName,
            organizationId: this.props.eventsData[tempId].schoolOrganisation,
            location: this.props.eventsData[tempId].location,
            organizationName:this.state.organizationNameArr[tempId],
            eventId:this.props.eventsData[tempId].eventId
        });
    };
    render() {
        const {donationData,currentPage,recordsPerPage} = this.state;
        const indexOfLastTodo = currentPage * recordsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - recordsPerPage;
        const currentTodo = donationData.slice(indexOfFirstTodo, indexOfLastTodo);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(donationData.length / recordsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <Button
                    className=""
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    style={{cursor:"pointer",display:"inline-block", marginLeft:"2%",marginRight:"2%"}}
                >
                    { number }
                </Button>

            );
        });

        return (
            <div>
                <h1>Donate Amount</h1>
                <table style={{border:"0px"}}>
                    <tbody>
                    <tr>
                        <th>Event Name :</th>
                        <FormGroup>
                            <FormControl componentClass="select" id="SelectEvent" default="Select Event" onChange={(e) => {
                                this.onEventChange(e)
                            }}>{this.displayEvents()}</FormControl>
                        </FormGroup>
                        <HelpBlock id="help">Please Select the Event for further procession</HelpBlock>
                    </tr>
                    <tr id="treventDate" style={{visibility: "hidden"}}>
                        <th>Date :</th>
                        <FormGroup>
                            <FormControl type="text" value={this.state.date.slice(0,10)} id="eventDate" readOnly={true}/>
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
                            <HelpBlock id="helpAmount">Enter Amount in dollar($)</HelpBlock>
                        </td>
                    </tr>
                    <tr id="trbutton" style={{visibility: "hidden"}}>
                        <th colSpan="2"><Button id="donate" onClick={() => {
                            this.onSubmit()
                        }}>Donate</Button></th>
                    </tr>
                    </tbody>
                </table>
                <center><h2>Donation Requests</h2></center>

                <Table bordered striped>
                    <tbody>
                    <tr>
                        <td style={{border:"none"}}><label>No. of Records : </label>
                            <select onChange={(e)=>{
                                this.setState({
                                    recordsPerPage:e.target.value
                                });
                            }}>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                            </select>

                        </td>
                    </tr>
                    <tr>
                        <th onClick={(e)=>{this.sort(e)}} id="eventDate">Event Date</th>
                        <th>Event Name</th>
                        <th>Organization Name</th>
                        <th>Location</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                    {
                        currentTodo.map((value, index) => {
                            return <tr>
                                <td>{value.eventDate && value.eventDate.slice(0,10)}</td>
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
                                        <b className="text-success">Confirmed</b>
                                        :
                                        <b className="text-danger">Pending</b>
                                }</td>
                            </tr>
                        })
                    }
                    <tr>
                        <td colSpan="6" style={{textAlign:"center"}}>
                            {
                                renderPageNumbers
                            }
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <Alert stack={{limit: 6}} html={true} />
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
        updateDonationAction,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DisplayForm)