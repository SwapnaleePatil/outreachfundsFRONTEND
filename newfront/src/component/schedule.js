import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, FormControl, Button, FormGroup, ControlLabel} from 'react-bootstrap'
import {listBusiness} from '../business/action'
class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {
            isCalender: false
        }
    }

    toggleCalander = () => {
        this.setState({
            isCalender: !this.state.isCalender
        })
    };
    componentWillMount(){
        this.props.listBusiness();
    }

    render() {
        return (
            <div className="schedule-class">

                <div className="col-md-10">
                    <Table bordered striped>
                        <tbody>
                        <tr>
                            <th>Dates</th>
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Time</th>
                            <th>Business Sponsor Name</th>
                        </tr>
                        <tr>
                            <td>
                                21/2/2018
                            </td>
                            <td>
                                Hope with Fun
                            </td>
                            <td>
                                Luxuria Business Hub,surat
                            </td>
                            <td>
                                from:21/2/2018 to:23/2/2018
                            </td>
                            <td>
                                Lanet Team Software Solution
                            </td>
                        </tr>
                        <tr>
                            <td>
                                21/2/2018
                            </td>
                            <td>
                                Hope with Fun
                            </td>
                            <td>
                                Luxuria Business Hub,surat
                            </td>
                            <td>
                                from:21/2/2018 to:23/2/2018
                            </td>
                            <td>
                                Lanet Team Software Solution
                            </td>
                        </tr>
                        <tr>
                            <td>
                                21/2/2018
                            </td>
                            <td>
                                Hope with Fun
                            </td>
                            <td>
                                Luxuria Business Hub,surat
                            </td>
                            <td>
                                from:21/2/2018 to:23/2/2018
                            </td>
                            <td>
                                Lanet Team Software Solution
                            </td>
                        </tr>
                        <tr>
                            <td>
                                21/2/2018
                            </td>
                            <td>
                                Hope with Fun
                            </td>
                            <td>
                                Luxuria Business Hub,surat
                            </td>
                            <td>
                                from:21/2/2018 to:23/2/2018
                            </td>
                            <td>
                                Lanet Team Software Solution
                            </td>
                        </tr>
                        <tr>
                            <td>
                                21/2/2018
                            </td>
                            <td>
                                Hope with Fun
                            </td>
                            <td>
                                Luxuria Business Hub,surat
                            </td>
                            <td>
                                from:21/2/2018 to:23/2/2018
                            </td>
                            <td>
                                Lanet Team Software Solution
                            </td>
                        </tr>
                        <tr>
                            <td>
                                21/2/2018
                            </td>
                            <td>
                                Hope with Fun
                            </td>
                            <td>
                                Luxuria Business Hub,surat
                            </td>
                            <td>
                                from:21/2/2018 to:23/2/2018
                            </td>
                            <td>
                                Lanet Team Software Solution
                            </td>
                        </tr>
                        <tr>
                            <td>
                                21/2/2018
                            </td>
                            <td>
                                Hope with Fun
                            </td>
                            <td>
                                Luxuria Business Hub,surat
                            </td>
                            <td>
                                from:21/2/2018 to:23/2/2018
                            </td>
                            <td>
                                Lanet Team Software Solution
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                <Modal isOpen={this.state.isCalender} ariaHideApp={false} className="schedulemodal">
                    <Table bordered>
                        <tbody>
                        <tr>
                            <td align="center">
                                <ControlLabel> Event Scheduler</ControlLabel>
                            </td>
                            <td align="right">
                                <a href="#" onClick={this.toggleCalander}>X</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>Event Name:</ControlLabel>
                                <FormControl type="text" placeholder="Enter Event Name"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>Organization:</ControlLabel>
                                <FormControl type="text" placeholder="Organisation Name"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel> Location:</ControlLabel>
                                <FormControl type="text" placeholder="Address"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>Date:</ControlLabel>
                                <FormControl type="Date"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>From:</ControlLabel> <input type="date"/>
                                <ControlLabel>To :</ControlLabel> <input type="date"/>
                            </td>
                        </tr>
                        <tr>
                            <td><FormGroup controlId="formControlsSelect">
                                <ControlLabel>Business Sponser</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option>select option</option>{
                                      this.props.business.map((v,i)=>{
                                       return <option key={i} value={v.businessInfo.businessName}>{v.businessInfo.businessName}</option>
                                      })
                                     }
                                </FormControl>
                            </FormGroup>
                            </td>
                        </tr>
                        <tr>
                            <td><ControlLabel> Donation type:</ControlLabel><br/>
                                <input type="radio" name="donation" value="onsite"/>:OnSite<br/>
                                <input type="radio" name="donation" value="edonate"/>: eDonation
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>Donation Option</ControlLabel>
                                    <FormControl componentClass="select" placeholder="select">
                                        <option>select option</option>
                                        <option value="5%">5% of total sale</option>
                                        <option value="10%">10% of total sale</option>
                                        <option value="15%">15% of total sale</option>
                                        <option value="custom">your choice</option>
                                    </FormControl>
                                </FormGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button bsStyle="info">Create Event</Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Modal>
                <div className="col-md-2">
                    <h2> Raise an Event</h2>
                    <a onClick={() => {
                        this.setState({
                            isCalender: true
                        })
                    }}><img src={require('../images/calenderpic.jpg')}
                            style={{width: 200, height: 200}} alt="" onClick={this.toggleCalander}/></a>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return ({business:state.businesslist})
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({listBusiness},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Schedule);