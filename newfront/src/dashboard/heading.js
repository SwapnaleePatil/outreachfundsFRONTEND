import React, {Component} from 'react';
import './heading.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {listBusiness} from './../business/action/index'
import {getEventDataAction} from './../donation/actions/getEventsDataAction'
import {fetchAllSchoolDetails} from './../students/action/index'
import {getDonationAction} from './../donation/actions/addDonationAction'

class Heading extends Component {
    constructor(){
        super();
        this.state={
            totalBusiness:0,
            totalEvents:0,
            totalSchools:0,
            totalDonation:0
        }
    }
    componentDidMount(){
        this.props.listBusiness();
        this.props.getEventDataAction();
        this.props.fetchAllSchoolDetails();
        this.props.getDonationAction();
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.donation);
        let {totalDonation} = this.state;
        nextProps.donation.forEach((value)=>{
            totalDonation = totalDonation + value.amount;
        });
        console.log(totalDonation);
        this.setState({
            totalBusiness:nextProps.businessList.length,
            totalEvents:nextProps.events.length,
            totalSchools:nextProps.schools.length,
            totalDonation
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
function mapStateToProps(state){
    return {
        businessList:state.businesslist,
        events:state.events,
        schools:state.schools,
        donation:state.donation
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        listBusiness,
        getEventDataAction,
        fetchAllSchoolDetails,
        getDonationAction
    },dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Heading)