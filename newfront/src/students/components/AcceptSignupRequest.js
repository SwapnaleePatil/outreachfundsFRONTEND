import React from 'react';
import {bindActionCreators} from 'redux';
import {fetchStudent} from '../action';
import {connect} from 'react-redux';
class AcceptSignupRequest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isApproved:false,
            isRejected:false
        }
    }
    componentWillMount(){
        this.approvedCheckboxes=new Set();
        this.rejectedCheckboxes=new Set();
        if(this.props.requests.length<=0)
            debugger;
            this.props.fetchStudent();
    }

    toggleCheckbox=(e)=>{
        const {name,value}=e.target;
        var val=value;
        if(name==="approve") {
            this.setState({
                isApproved: !this.state.isApproved,
                isRejected: (this.state.isApproved)?true:false
            })
        }
        else if(name==="reject"){
            this.setState({
                isRejected: !this.state.isRejected,
                isApproved: (this.state.isRejected)?true:false
            })
        }
        if(this.approvedCheckboxes.has(val)){
            this.approvedCheckboxes.delete(val)
            this.rejectedCheckboxes.add(val);
        }
        else{
            this.approvedCheckboxes.add(val);
            this.rejectedCheckboxes.delete(val);
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
                                    <td><input name={'approve'} type={'checkbox'} checked={this.state.isApproved} value={student._id} onChange={this.toggleCheckbox}/></td>
                                    <td><input name={'reject'} type={'checkbox'} checked={this.state.isRejected} value={student._id} onChange={this.toggleCheckbox}/></td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td colSpan={5} align={'right'}>
                            <button className={'btn btn-primary'}>Approve</button>
                        </td>
                        <td>
                            <button className={'btn btn-primary'}>Reject</button>
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
        requests:state.requests
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchStudent
    },dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(AcceptSignupRequest);