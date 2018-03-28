import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import axios from 'axios'
import {listBusiness} from '../business/action/index'
import {fetchStudent} from '../students/action/index'
import {compose, withProps} from "recompose";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

class BusinessList extends React.Component {
    constructor() {
        super();


        this.state = {
            dataperpage: "3",
            currentpage: "1",
            data: [],
            addressRecord:[],
            address:""
        }
    }
    getAddress=(value)=>{
        axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${value.businessInfo.businessAddress}&key=AIzaSyDnLHO64ZXLw-EjuyENOZrydHpKHGRyfD8`).then((response)=>{
            if(response.data.status === 'ZERO_RESULTS'){
                console.log('Wrong Address....');
            }
            else{
                this.setState({
                    lat: response.data.results[0].geometry.location.lat,
                    long: response.data.results[0].geometry.location.lng
                });
            }
        })
    };
    componentWillMount() {
        this.props.listBusiness();
        this.props.fetchStudent();
    }
  componentWillReceiveProps(nextProps){
        this.setState({
            data:nextProps.businessrecord
        });
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

        const asd = {
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: `400px`}}/>,
            mapElement: <div style={{height: `140%`, width: '500px'}}/>,
        };
        const Asd = compose(
            withScriptjs,
            withGoogleMap
        )((props) => (
            <GoogleMap defaultZoom={15} defaultCenter={{lat: this.state.lat, lng: this.state.long}}>
                {
                    <Marker position={{lat: this.state.lat, lng: this.state.long}}/>
                }
            </GoogleMap>
        ));


        //pagination
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
                <div className="col-sm-8">

                    <Table hover striped bordered>
                        <tbody>
                        <tr>
                            <td colSpan={5}>
                            <h2 align="center">Business List</h2>
                            </td>
                        </tr>
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

                                return <tr key={i} onClick={()=>{this.getAddress(v)}}>
                                    <td align="center"><img src={"http://192.168.200.33:3005/uploads/" + v.photo}
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
                <div className="col-sm-4">{
                    this.props.businessrecord.length!==0 &&
                        <Asd {...asd}/>
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({businessrecord: state.businesslist,
        studentRecord:state.students})
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({listBusiness,fetchStudent}, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessList)