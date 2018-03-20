import React from 'react';
import {bindActionCreators} from 'redux';
import {fetchStudent,approveSignupRequests,rejectSignupRequests} from '../action';
import {connect} from 'react-redux';
class AcceptSignupRequest extends React.Component{
    componentWillMount(){
        this.approvedCheckboxes=new Set();
        this.rejectedCheckboxes=new Set();
        if(this.props.requests.length<=0)
            this.props.fetchStudent();
    }

    toggleApproveCheckbox=(e)=>{
        var val=e.target.value;
        console.log("Value - ",val);
            if(this.approvedCheckboxes.has(val)){
                this.approvedCheckboxes.delete(val)
                this.rejectedCheckboxes.add(val);
            }
            else{
                this.approvedCheckboxes.add(val);
                this.rejectedCheckboxes.delete(val);
            }
    }

    toggleRejectCheckbox=(e)=>{
        var val=e.target.value;
        if(this.rejectedCheckboxes.has(val)){
            this.rejectedCheckboxes.delete(val)
            this.approvedCheckboxes.add(val);
        }
        else{
            this.rejectedCheckboxes.add(val);
            this.approvedCheckboxes.delete(val);
        }
    }
    handleRequest=(e)=>{
        const{name}=e.target;
        if(name==='approve'){
            this.props.approveSignupRequests(this.approvedCheckboxes);
        }
        else if(name==='reject'){
            this.props.rejectSignupRequests(this.rejectedCheckboxes);
        }
    }
    render(){
        const {requests} =this.props;
        return(
            <div className={'container'}>
                <table className={'table table-hover table-bordered'}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact No.</th>
                        <th>Email</th>
                        <th>Role Title</th>
                        <th>Approve</th>
                        <th>Reject</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        requests.map((student) => {
                            return (
                                <tr key={student._id}>
                                    <td>{student.firstName}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.email}</td>
                                    <td>{student.roleTitle}</td>
                                    <td><input id={student._id} type={'checkbox'} value={student._id} onChange={this.toggleApproveCheckbox}/></td>
                                    <td><input id={student._id} type={'checkbox'} value={student._id} onChange={this.toggleRejectCheckbox}/></td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td colSpan={5} align={'right'}>
                            <button className={'btn btn-primary'} name={'approve'} onClick={this.handleRequest}>Approve</button>
                        </td>
                        <td>
                            <button className={'btn btn-primary'} name={'reject'} onClick={this.handleRequest}>Reject</button>
                        </td>
                    </tr>
                    </tbody>

                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        requests:state.requests,
        studentLogged:state.studentLogged
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchStudent,approveSignupRequests,rejectSignupRequests
    },dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(AcceptSignupRequest);