import React from 'react';
import {bindActionCreators} from 'redux';
import {fetchAdmin,approveSignupRequests,rejectSignupRequests} from '../action';
import {connect} from 'react-redux';
class AcceptSignupRequest extends React.Component {
    componentWillMount() {
        this.approvedCheckboxes = new Set();
        this.rejectedCheckboxes = new Set();
        if (this.props.requests.length <= 0)
            this.props.fetchAdmin();
    }

    toggleApproveCheckbox = (e) => {
        var val = e.target.value;
        console.log("Value - ", val);
        if (this.approvedCheckboxes.has(val)) {
            this.approvedCheckboxes.delete(val)
            this.rejectedCheckboxes.add(val);
        }
        else {
            this.approvedCheckboxes.add(val);
            this.rejectedCheckboxes.delete(val);
        }
        console.log(this.approvedCheckboxes);
        console.log(this.rejectedCheckboxes);
    }

    handleRequest = (e) => {
        debugger;
        if (this.approvedCheckboxes.size > 0) {
            this.props.approveSignupRequests(this.approvedCheckboxes);
        }
        if (this.rejectedCheckboxes.size > 0)
            this.props.rejectSignupRequests(this.rejectedCheckboxes);
    }

    render() {
        const {requests} = this.props;
        return (
            <div className={'container'}>
                <div><p className={'font-weight-bold'}>Requests which are not approved gets rejected automatically.</p></div>
                <table className={'table table-hover table-bordered'}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact No.</th>
                        <th>Email</th>
                        <th>Role Title</th>
                        <th>Approve</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(requests.length > 0) ?
                        requests.map((student) => {
                            this.rejectedCheckboxes.add(student._id);
                            return (
                                <tr key={student._id}>
                                    <td>{student.firstName}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.email}</td>
                                    <td>{student.roleTitle}</td>
                                    <td><input id={student._id} type={'checkbox'} value={student._id}
                                               onChange={this.toggleApproveCheckbox}/></td>
                                </tr>
                            )
                        }) :
                        <tr>
                            <td colSpan={'6'} align={'center'}>{'No Requests.'}</td>
                        </tr>

                    }
                    <tr>
                        <td colSpan={6} align={'right'}>
                            <button className={'btn btn-primary'} name={'approve'} onClick={this.handleRequest}>
                                Approve
                            </button>
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
        fetchAdmin,approveSignupRequests,rejectSignupRequests
    },dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(AcceptSignupRequest);