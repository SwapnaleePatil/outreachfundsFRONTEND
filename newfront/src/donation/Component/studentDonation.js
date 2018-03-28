import React,{Component} from 'react';
import {connect} from 'react-redux';
import './addDonation.css'
import _ from 'lodash'
import {Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {getDonationAction} from '../actions/index'
import {approveDonation} from '../actions/index'
import {FetchStudent} from './../actions/index'
import {getEventDataAction} from './../actions/index'

import {fetchAllSchoolDetails} from '../../students/action/index'
import StudentGraph from './studentGraph'

class StudentDonation extends Component {
    constructor() {
        super();
        this.state = {
            donationData: [],
            editable: false,
            currentPage: 1,
            recordsPerPage: 2,
            paginationData: [],
            isAsc: true,
            eventArray:[]
        }
    }
    componentDidMount(){
        // this.props.FetchAllStudents();
        if(this.props.donationData.length===0){
            this.props.getDonationAction();
        }
        this.props.FetchStudent();
        this.props.getEventDataAction();
        this.props.fetchAllSchoolDetails();
    };

    componentWillReceiveProps(nextProps) {
        let {donationData, editable,eventArray} = this.state;
        eventArray=nextProps.eventsData
        donationData = [];
        editable = false;
        nextProps.donationData.forEach((rec, index) => {
            if (rec.organizationId === (nextProps.studentLogged.data && nextProps.studentLogged.data.schoolId)) {
                console.log('Logged In Student', nextProps.studentLogged.data.roleTitle);
                if (nextProps.studentLogged.data.roleTitle === 'Admin') {
                    editable = true;
                }
                donationData.push(rec);
            }
        });
        this.setState({
            donationData,
            editable,
            eventArray
        })

    }

    Approved = (id) => {
        let data = {
            '_id': id
        };
        this.props.approveDonation(data);
    };
    sort = (e) => {
        let {donationData} = this.state;
        if (this.state.isAsc) {
            donationData = _.orderBy(donationData, [e.target.id], ['asc']);
        }
        else {
            donationData = _.orderBy(donationData, [e.target.id], ['desc']);
        }
        this.setState({
            isAsc: !this.state.isAsc,
            donationData
        });
    };
    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
       const {donationData, currentPage, recordsPerPage} = this.state;
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
                    active
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    style={{cursor: "pointer", display: "inline-block", margin:"2%"}}
                >
                    {number}
                </Button>

            );
        });
        return (
            <div>
                <center><h1>Donation Information</h1></center>
                <div className="col-sm-6">
                    <h2>Donation Information</h2>
                    <label>No. of Records : </label>
                    <select onChange={(e) => {
                        this.setState({
                            recordsPerPage: e.target.value
                        });
                    }}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </select>
                    <table className="table" border="1">
                        <tbody>
                        <tr className="a">
                            <th onClick={(e) => {
                                this.sort(e)
                            }} id="donationDate">Donation Date
                            </th>
                            <th>Event Name</th>
                            <th>Organization Name</th>
                            {/*<th>Business Name</th>*/}
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                        {
                            currentTodo.map((value, index) => {
                                return <tr style={{borderSpacing:"15px"}}>
                                    <td>{value.donationDate}</td>
                                    <td>{

                                        this.state.eventArray.map((e) => {
                                            if (value.eventId === e._id) {
                                                return e.eventName
                                            }
                                        })
                                    }</td>
                                    <td>{
                                        this.props.organizationData.map((e) => {
                                            if (value.organizationId === e._id) {
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
                                            value.status ?
                                                <div>
                                                    <div className="approve-class">Approved</div>
                                                </div>
                                                :
                                                <div>
                                                    <Button onClick={()=>{this.Approved(value._id)}} disabled={!this.state.editable}>Pending</Button>

                                                </div>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                        <tr>
                            <td colSpan="6" style={{textAlign: "center"}}>
                                {
                                    renderPageNumbers
                                }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-6">
                    <StudentGraph/>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("State",state)
    return {
        donationData: state.donation,
        requests: state.requests,
        studentLogged: state.studentLogged,
        organizationData: state.schools,
        businessInfo: state.businessInfo,
        eventsData: state.events,
        students: state.students
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getDonationAction,
        approveDonation,
        FetchStudent,
         getEventDataAction,
        fetchAllSchoolDetails,
    }, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(StudentDonation)