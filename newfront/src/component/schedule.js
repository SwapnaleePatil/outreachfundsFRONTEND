import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, FormControl, Button, FormGroup, ControlLabel} from 'react-bootstrap'
import {scheduleevents, eventslist} from '../action/index'
import {listBusiness} from '../business/action/index'
import {fetchAllSchoolDetails} from '../students/action/index'

let business = "";

class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {
            isCalender: false,
            eventData: [],
            businessname: "",
        }
    }

    toggleCalander = () => {
        this.setState({
            isCalender: !this.state.isCalender
        })
    };

    componentWillMount() {
        this.props.listBusiness();
        this.props.fetchAllSchoolDetails();
        this.props.eventslist();
    }

    componentWillReceiveProps() {
        let {businessname} = this.state
        this.props.business.map((v, i) => {
            v.tokens.map((value, i) => {
                if (value.token === localStorage.getItem('user')) {
                    debugger;
                    businessname = v.businessInfo.businessName
                    this.setState({
                        businessname
                    })
                }
            });

        });
    }

    onFieldChange = (e) => {
        let {name, value} = e.target;
        let {eventData} = this.state;
        eventData[name] = value
        this.setState({
            eventData
        })
        ;
    };
    scheduleEvent = () => {

        let data = {
            ...this.state.eventData
        };
        this.props.scheduleevents(data);
        this.toggleCalander();
    };

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
                        {
                            this.props.events.map((v, i) => {

                                return <tr key={i}>
                                    <td>
                                        {v.eventDate.split("T")[0]}
                                    </td>
                                    <td>
                                        {v.eventName}
                                    </td>
                                    <td>
                                        {v.location}
                                    </td>
                                    <td>
                                        {v.eventTime}
                                    </td>
                                    {this.props.business.map((value, i) => {
                                        if (value._id === v.businessSponsor) {
                                            business = value.businessInfo.businessName
                                        }
                                    })}
                                    <td>{business}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </div>
                <Modal isOpen={this.state.isCalender} ariaHideApp={false} style={{
                    content: {
                        height: "90%",
                        marginTop: '5%',
                        marginLeft: '33%',
                        marginRight: '33%',
                        paddingLeft: '1.5%',
                        opacity: '.8',
                        backgroundColor: '#EDEFF7'
                    }
                }}>
                    <Table bordered>
                        <tbody>
                        <tr>
                            <td align="right">
                                <a href="#" onClick={this.toggleCalander}>X</a>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <ControlLabel> Event Scheduler</ControlLabel>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>Event Name:</ControlLabel>
                                <FormControl type="text" name="eventName" placeholder="Enter Event Name"
                                             onChange={(e) => {
                                                 this.onFieldChange(e)
                                             }}/>
                            </td>
                        </tr>
                        <tr>
                            <td><FormGroup controlId="formControlsSelect">
                                <ControlLabel>School Organization</ControlLabel>
                                <FormControl name="schoolOrganisation" componentClass="select"
                                             placeholder="select" onChange={(e) => {
                                    this.onFieldChange(e)
                                }}>
                                    {
                                        this.props.organization.map((v, i) => {
                                            return <option key={i} value={v._id}>{v.organisationName}</option>
                                        })
                                    }
                                </FormControl>
                            </FormGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel> Location:</ControlLabel>
                                <FormControl name="location" type="text" placeholder="Address" onChange={(e) => {
                                    this.onFieldChange(e)
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>Date:</ControlLabel>
                                <FormControl type="Date" name="eventDate" onChange={(e) => {
                                    this.onFieldChange(e)
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>Time:</ControlLabel>
                                <FormControl type="text" name="eventTime" placeholder="Event Time" onChange={(e) => {
                                    this.onFieldChange(e)
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <td><FormGroup controlId="formControlsSelect">
                                <ControlLabel>Business Sponser</ControlLabel>
                                <FormControl name="businessSponsor" onChange={(e) => {
                                    this.onFieldChange(e)
                                }} componentClass="select" placeholder="select">
                                    {
                                        this.state.businessname !== "" ?
                                            <option>{this.state.businessname}</option> :
                                            <option>select option</option>}
                                    {
                                        this.props.business.map((v, i) => {
                                            return <option key={i}
                                                           value={v._id}>{v.businessInfo.businessName}</option>
                                        })
                                    }


                                </FormControl>
                            </FormGroup>
                            </td>
                        </tr>
                        <tr>
                            <td><ControlLabel> Donation type:</ControlLabel><br/>
                                <input type="radio" name="fundraisingOption" value="onsite" onChange={(e) => {
                                    this.onFieldChange(e)
                                }}/>:OnSite<br/>
                                <input type="radio" name="fundraisingOption" value="edonate" onChange={(e) => {
                                    this.onFieldChange(e)
                                }}/>: eDonation
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>Donation Option</ControlLabel>
                                    <FormControl name="donationOption" onChange={(e) => {
                                        this.onFieldChange(e)
                                    }} componentClass="select" placeholder="select">
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
                            <td align="center">
                                <Button bsStyle="info" style={{width: "40%"}} onClick={this.scheduleEvent}>Create
                                    Event</Button>
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

const
    mapStateToProps = (state) => {
        return ({business: state.businesslist, organization: state.schools, events: state.scheduleevent})
    };
const
    mapDispatchToProps = (dispatch) => {
        return bindActionCreators({listBusiness, fetchAllSchoolDetails, scheduleevents, eventslist}, dispatch)
    };
export default connect(mapStateToProps, mapDispatchToProps)

(
    Schedule
)
;