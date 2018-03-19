import React, {Component} from 'react';
import './heading.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {listBusiness} from './../business/action/index'
import {getEventDataAction} from './../donation/actions/getEventsDataAction'
import {fetchAllSchoolDetails} from './../students/action/index'
import {getDonationAction} from './../donation/actions/addDonationAction'
import {fetchStudent} from '../students/action/index'

class Heading extends Component {
    constructor() {
        super();
        this.state = {
            totalBusiness: 0,
            totalEvents: 0,
            totalSchools: 0,
            totalDonation: 0,
            eventsForStudent: []
        }
    }

    componentDidMount() {
        this.props.fetchStudent();
        this.props.listBusiness();
        this.props.getEventDataAction();
        this.props.fetchAllSchoolDetails();
        this.props.getDonationAction();
    }

    componentWillReceiveProps(nextProps) {
        console.log('student', nextProps.requests);
        let {totalDonation, totalEvents, eventsForStudent} = this.state;
        let tempArray = [];
        nextProps.events.forEach((value) => {
            // console.log('a',nextProps.requests[0] && nextProps.requests[0].schoolId);
            if ((nextProps.requests[0] && nextProps.requests[0].schoolId) === value.schoolOrganisation) {
                totalEvents = totalEvents + 1;
                eventsForStudent.push(value.eventName);
            }
            //totalEvents = totalEvents + value.amount;
        });
        nextProps.donation.forEach((i) => {
            eventsForStudent.forEach((j)=>{
                console.log('i',i);
                console.log('j',j);
                if(i.eventName === j)
                {
                    totalDonation = totalDonation + i.amount
                }
            });
        });

        // nextProps.donation.forEach((value,index)=>{
        //     if((eventsForStudent[0] && eventsForStudent[index].eventName) === value.eventName){
        //         console.log(value);
        //         totalDonation = totalDonation + value.amount;
        //     }
        // });
        // console.log(totalDonation);
        this.setState({
            totalBusiness: nextProps.businessList.length,
            totalSchools: nextProps.schools.length,
            totalDonation,
            totalEvents
        });
    }

    render() {
        return (
            <div>
                {/*<div className="col-sm-3">
                    <center><h2>Schools & Organizations</h2></center>
                    <div className="blocks">
                        <h2>Total Schools : {this.state.totalSchools}</h2>
                    </div>
                </div>*/}
                <div className="col-sm-4">
                    <center><h1>Events</h1></center>
                    <div className="blocks">
                        <h2>Total Events: {this.state.totalEvents}</h2>
                    </div>
                </div>
                <div className="col-sm-4">
                    <center><h1>Business</h1></center>
                    <div className="blocks">
                        <h2>Total Business: {this.state.totalBusiness}</h2>
                    </div>
                </div>
                <div className="col-sm-4">
                    <center><h1>Donation</h1></center>
                    <div className="blocks">
                        <h2>total Donation: ${this.state.totalDonation}</h2>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        businessList: state.businesslist,
        events: state.events,
        schools: state.schools,
        donation: state.donation,
        requests: state.requests
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        listBusiness,
        getEventDataAction,
        fetchAllSchoolDetails,
        getDonationAction,
        fetchStudent
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Heading)