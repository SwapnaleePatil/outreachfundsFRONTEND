import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Table,Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {getDonationAction} from '../actions/index'
import {approveDonation} from '../actions/index'
import {FetchStudent} from './../actions/index'
import {getEventDataAction} from '../actions/index'
import {fetchAllSchoolDetails} from '../../students/action/index'
import StudentGraph from './studentGraph'
// import {FetchAllStudents} from '../../students/action/index'


class StudentDonation extends Component{
    constructor(){
        super();
        this.state={
            donationData:[],
            editable:false
        }
    }
    componentDidMount(){
        // this.props.FetchAllStudents();
        this.props.getDonationAction();
        this.props.FetchStudent();
        this.props.getEventDataAction();
        this.props.fetchAllSchoolDetails();
    };
    componentWillReceiveProps(nextProps){
        let {donationData,editable} = this.state;
        donationData=[];
        editable=false;
        nextProps.donationData.forEach((rec,index)=>{
            if(rec.organizationId === (nextProps.studentLogged.data && nextProps.studentLogged.data.schoolId)){
                if(nextProps.studentLogged.data.roleTitle === 'Admin'){
                    editable=true;
                }
                donationData.push(rec);
            }
        });
        this.setState({
            donationData,
            editable
        })

    }
    Approved=(id)=>{
        let data={
            '_id':id
        };
        this.props.approveDonation(data);
    };
    render(){
        return(
            <div>
                <center><h1>Donation Information</h1></center>
                <div className="col-sm-6">
                    <h2>Donation Information</h2>
                    <Table bordered striped>
                        <tbody>
                        <tr>
                            <th>Donation Date</th>
                            <th>Event Name</th>
                            <th>Organization Name</th>
                            {/*<th>Business Name</th>*/}
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                        {
                            this.state.donationData.map((value,index)=>{
                                return<tr>
                                    <td>{value.donationDate}</td>
                                    <td>{
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
                                    {/*<td>{
                                        this.props.businessInfo.map((e)=>{
                                            if(value.businessId === e._id){
                                                return e.businessInfo.businessName
                                            }
                                        })
                                    }</td>*/}
                                    <td>{value.location}</td>
                                    <td>{value.amount}</td>
                                    <td>
                                        {
                                            value.status?
                                                <Button>Approved</Button>
                                                :
                                                <Button onClick={()=>{this.Approved(value._id)}} disabled={!this.state.editable}>Pending</Button>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </div>
                <div className="col-sm-6">
                    <StudentGraph/>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        donationData:state.donation,
        requests:state.requests,
        studentLogged:state.studentLogged,
        organizationData:state.schools,
        businessInfo:state.businessInfo,
        eventsData:state.events,
        students:state.students
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getDonationAction,
        approveDonation,
        FetchStudent,
        getEventDataAction,
        fetchAllSchoolDetails,
    },dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(StudentDonation)