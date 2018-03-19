import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Table,Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {getDonationAction} from './../actions/addDonationAction'
import {approveDonation} from './../actions/addDonationAction'

class StudentDonation extends Component{
    constructor(){
        super();

    }
    componentWillMount(){
        this.props.getDonationAction();
    };
    componentWillReceiveProps(nextProps){
        console.log('asd',nextProps.donationData);
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
                    <Table>
                        <tr>
                            <th>Donation Date</th>
                            <th>Event Name</th>
                            <th>Organization Name</th>
                            <th>Location</th>
                            <th>Amount</th>
                        </tr>
                        {
                            this.props.donationData.map((value,index)=>{
                                return<tr>
                                    <td>{value.donationDate}</td>
                                    <td>{value.eventName}</td>
                                    <td>{value.organizationName}</td>
                                    <td>{value.location}</td>
                                    <td>{value.amount}</td>
                                    <td>
                                        {
                                            value.status?
                                                <Button>Approved</Button>
                                                :
                                                <Button onClick={()=>{this.Approved(value._id)}}>Pending</Button>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </Table>
                </div>
                <div className="col-sm-6">
                    <h2>Donation Graph</h2>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        donationData:state.donation
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getDonationAction,
        approveDonation
    },dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(StudentDonation)