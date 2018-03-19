import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {listBusiness} from '../business/action/index'
import MapDisplay from './mapDisplay';
import axios from 'axios'
import {compose, withProps} from "recompose";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

class BusinessList extends React.Component {
    constructor() {
        super();
        this.state={
            addressRecord:[],
            address:""
        }
    }

    componentWillMount() {
        this.props.listBusiness();
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
                            return <tr key={i} onClick={()=>{this.getAddress(v)}}>
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
                <div className="col-sm-4">
                    <Asd {...asd}/>
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