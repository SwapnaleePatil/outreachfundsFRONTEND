import React from 'react'
import DisplayForm from '../donation/Component/addDonation'
import StudentDonation from '../donation/Component/studentDonation'
import Graph from '../donation/Component/graph'
import StudentGraph from '../donation/Component/studentGraph'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAllSchoolDetails} from '../students/action/index'
import {FetchByToken, getDonationAction, getEventDataAction} from '../donation/actions/index'

class Donation extends React.Component {
    constructor() {
        super();
        this.state = {
            isBusiness: null
        }
    }

    componentWillMount() {
        this.props.FetchByToken();
        // this.props.getEventDataAction();
        // this.props.fetchAllSchoolDetails();
        this.props.getDonationAction();
    }

    componentWillReceiveProps(nextProps) {
        console.log('Business Info', nextProps.businessInfo);
        if (nextProps.businessInfo.message === "User Found") {
            this.setState({
                isBusiness: true
            });
        }
        else if (nextProps.businessInfo.message === "User Not Found") {
            this.setState({
                isBusiness: false
            });
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isBusiness ?
                        <div>
                            <div className="col-sm-6">
                                <DisplayForm/>
                            </div>
                            <div className="col-sm-6">
                                <Graph/>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="col-sm-12">
                                <StudentDonation/>
                            </div>

                        </div>
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        donationData: state.donation,
        // organizationData: state.schools,
        // eventsData: state.events,
        businessInfo: state.businessInfo
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        // fetchAllSchoolDetails,
        getDonationAction,
        FetchByToken,
        // getEventDataAction
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Donation)