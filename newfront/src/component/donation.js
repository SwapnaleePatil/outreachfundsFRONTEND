import React from 'react'
import DisplayForm from '../donation/Component/addDonation'
import Graph from '../donation/Component/graph'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAllSchoolDetails} from '../students/action/index'
import {FetchByToken} from '../donation/actions/index'
import {getDonationAction} from '../donation/actions/index'
import {getEventDataAction} from '../donation/actions/index'

class Donation extends React.Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.props.FetchByToken();
        this.props.getEventDataAction();
        this.props.fetchAllSchoolDetails();
        this.props.getDonationAction();
    }
    render(){
        return(

            <div>
                <div className="col-sm-6">
                    <DisplayForm/>
                </div>
                <div className="col-sm-6">
                    <Graph/>
                </div>
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
        fetchAllSchoolDetails,
        getDonationAction,
        FetchByToken,
        getEventDataAction
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Donation)