import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {listBusiness} from '../business/action/index'

class BusinessList extends React.Component {
    constructor() {
        super();
        this.state = {
            dataperpage: "3",
            currentpage: "1",
            data: [],
        }
    }

    componentWillMount() {
        this.props.listBusiness();
    }
  componentWillReceiveProps(nextProps){
        this.state.data=nextProps.businessrecord
  }
    pageChange = (e) => {
        this.setState({
            dataperpage: e.target.value
        })
    }
    handleClick = (event) => {
        this.setState({
            currentpage: Number(event.target.id)
        })
    };

    render() {
        let {dataperpage, currentpage, data} = this.state
        const indexoflastdata = currentpage * dataperpage
        const indexofirstdata = indexoflastdata - dataperpage
        const currentdata = data.slice(indexofirstdata, indexoflastdata);
        const pagenumber = [];
        for (let i = 1; i <= Math.ceil(data.length / dataperpage); i++) {
            pagenumber.push(i);
        }
        const renderpage = pagenumber.map(number => {
            return (
                <button className="tbt" id={number} key={number} onClick={this.handleClick}>{number}</button>
            )
        });
        return (
            <div>
                <div className="col-md-8">
                    <h2 align="center">Business List</h2>
                    <Table hover striped bordered>
                        <tbody>
                        <tr>
                            <td>
                                Total No of Busines:-{this.state.data.length}
                            </td>
                            <td>
                                <select onChange={this.pageChange}>
                                    <option value={3}>--Record Per Page</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>photo</th>
                            <th>Business Name</th>
                            <th>Address</th>
                            <th>Business Type</th>
                            <th>Phone</th>
                        </tr>
                        {
                            currentdata.map((v, i) => {
                                return <tr key={i}>
                                    <td align="center"><img src={"http://localhost:3000/uploads/" + v.photo}
                                             height="50px" width="50px" alt="NO img"/></td>
                                    <td>{v.businessInfo.businessName}</td>
                                    <td>{v.businessInfo.businessAddress}</td>
                                    <td>{v.businessInfo.businessType}</td>
                                    <td>{v.businessInfo.businessPhone}</td>
                                </tr>
                            })
                        }
                        <tr>
                            <td colSpan="9" className="tbt" align="center">
                                {renderpage}
                            </td>
                        </tr>
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