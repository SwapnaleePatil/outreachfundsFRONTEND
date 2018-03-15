import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {listBusiness} from '../business/action/index'

class BusinessList extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.listBusiness();
    }

    render() {
        return (
            <div>
            <div className="col-md-8">
                <Table hover striped bordered >
                    <tbody>
                    <tr>
                        <th>photo</th>
                        <th>Business Name</th>
                        <th>Address</th>
                        <th>Business Type</th>
                        <th>Phone</th>
                    </tr>
                    {
                        this.props.businessrecord.map((v, i) => {
                            return <tr key={i}>
                                <td><img src={"http://localhost:3000/uploads/" + v.photo}
                                                            height="50px" width="50px" alt="NO img"/></td>
                                <td>{v.businessInfo.businessName}</td>
                                <td>{v.businessInfo.businessAddress}</td>
                                <td>{v.businessInfo.businessType}</td>
                                <td>{v.businessInfo.businessPhone}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({businessrecord: state.businesslist})
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({listBusiness}, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessList)