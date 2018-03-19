import React from 'react';
import {bindActionCreators} from 'redux';
import {fetchStudent} from '../action';
import {connect} from 'react-redux';
class AcceptSignupRequest extends React.Component{
    componentWillMount(){
        if(this.props.requests.length<=0)
            this.props.fetchStudent();
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
                        <th>Approved</th>
                        <th>Rejected</th>
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
                                    <td><input type={'checkbox'}/></td>
                                    <td><input type={'checkbox'}/></td>
                                </tr>
                            )
                        })
                    }
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