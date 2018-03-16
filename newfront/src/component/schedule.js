import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, FormControl, Button, FormGroup, ControlLabel, DropdownButton, MenuItem} from 'react-bootstrap'
import {scheduleevents, eventslist,actionevents} from '../action/index'
import {listBusiness} from '../business/action/index'
import {fetchAllSchoolDetails} from '../students/action/index'

let business = "";
let school="";
class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {
            isCalender: false,
            eventData: [],
            businessname: "",
            eventowner: "",
            businesseventer: [],
            isEditing:false,
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

    componentWillReceiveProps(nextProps) {

        let {businessname, eventowner} = this.state;
        nextProps.business.map((v, i) => {
            v.tokens.map((value, i) => {
                if (value.token === localStorage.getItem('user')) {
                    businessname = v.businessInfo.businessName;
                    eventowner = v._id;
                    this.setState({
                        businessname,
                        eventowner
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
        if (this.state.businessname !== "") {
            let data = {
                businessSponsor: this.state.eventowner,
                ...this.state.eventData
            };
            this.props.scheduleevents(data);
        } else {
            this.props.scheduleevents(data);
        }
        this.toggleCalander();
    };
    clearData=()=>{
        this.state.eventData=[];
        this.state.isEditing=false;
    };
       acceptSchedule=(did)=>{
           debugger;
           let data={
               id:did,
             accept:true,
           };
      this.props.actionevents(data)
       };
       editEvent=()=>{
           let data={
               id:this.state.eventData._id,
               ...this.state.eventData
           };
           this.toggleCalander();
           this.props.actionevents(data);

          this.clearData();
       }
    render() {

        return (
            <div className="schedule-class">

                <div className="col-md-8">
{/*Events which are in review now*/}

                    {this.state.businessname!==""?
                        <Table bordered striped>
                        <tbody>
                        <tr>
                            <td colspan={7} align="center"><h4>Events In Review</h4></td>
                        </tr><tr><th>Dates</th>
                            <th>Organization Name</th>
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Time</th>
                            <th>Business Sponsor Name</th>
                            <th>Action</th>
                        </tr>
                        {this.props.events.map((v, i) => {
                            debugger;
                            if (this.state.eventowner === v.businessSponsor) {
                                if (v.accept === false) {
                                    debugger;
                                    return <tr>
                                        <td>
                                            {v.eventDate.split("T")[0]}
                                        </td>
                                        {
                                        this.props.organization.map((value,i)=>{
                                            if(value._id===v.schoolOrganisation){
                                                school=value.organisationName
                                            }
                                        })
                                    }
                                        <td>
                                            {school}
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
                                        <td>
                                            {business}
                                        </td>
                                        <td>
                                            <DropdownButton title="Action" id="bg-nested-dropdown">
                                                <MenuItem eventKey="1" onClick={()=>{this.acceptSchedule(v._id)}}>Accept</MenuItem>
                                                <MenuItem eventKey="2" onClick={()=>{
                                                    this.setState({
                                                        eventData:v,
                                                        isEditing:true
                                                    });
                                                    this.toggleCalander()
                                                }}>Edit Schedule</MenuItem>
                                                <MenuItem eventKey="3">Reject</MenuItem>
                                            </DropdownButton>
                                        </td>
                                    </tr>
                                }
                            }
                        })
                        }
                        </tbody>
                    </Table>
:""}


{/*All Events*/}
                    <h2 align="center"> All Events</h2>
                    <Table bordered striped>
                        <tbody>
                        <tr>
                            <th>Dates</th>
                            <th>Organization Name</th>
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Time</th>
                            <th>Business Sponsor Name</th>
                        </tr>
                        {
                            this.props.events.map((v, i) => {
                                if (v.accept === true) {
                                    return <tr key={i}>
                                        <td>
                                            {v.eventDate.split("T")[0]}
                                        </td>
                                        {
                                            this.props.organization.map((value,i)=>{
                                                if(value._id===v.schoolOrganisation){
                                                    school=value.organisationName
                                                }
                                            })
                                        }<td> {school}</td>
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
                                        {/*{this.state.eventowner === v.businessSponsor ?*/}
                                        {/*<td>action</td> : ""*/}
                                        {/*}*/}
                                    </tr>
                                }

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
                                <a href="#" onClick={()=>{
                                 this.clearData();
                                    this.toggleCalander();
                                }}>X</a>
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
                                <FormControl type="text" name="eventName" value={this.state.eventData.eventName} placeholder="Enter Event Name"
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
                                        this.props.organization.map((value,i)=>{
                                            if(value._id===this.state.eventData.schoolOrganisation){
                                                school=value.organisationName
                                            }
                                        })
                                    }
                                    {    this.state.isEditing?
                                        <option>{school}</option>
                                       : <option>--select--</option>
                                    }

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
                                <FormControl name="location" type="text" value={this.state.eventData.location} placeholder="Address"
                                             onChange={(e) => {
                                                 this.onFieldChange(e)
                                             }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>Date:</ControlLabel>
                                <FormControl type="Date" name="eventDate" value={this.state.eventData.eventDate} onChange={(e) => {
                                    this.onFieldChange(e)
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>Time:</ControlLabel>
                                <FormControl type="text" name="eventTime" value={this.state.eventData.eventTime} placeholder="Event Time"
                                             onChange={(e) => {
                                                 this.onFieldChange(e)
                                             }}/>
                            </td>
                        </tr>
                        <tr>
                            <td><FormGroup controlId="formControlsSelect">
                                <ControlLabel>Business Sponser</ControlLabel><br/>
                                {this.state.businessname !== "" ?
                                    <ControlLabel>{this.state.businessname}</ControlLabel> :
                                    <FormControl name="businessSponsor" onChange={(e) => {
                                        this.onFieldChange(e)
                                    }} componentClass="select" placeholder="select">
                                        {
                                            // this.state.businessname !== "" ?
                                            //     <option>{this.state.businessname}</option> :
                                            <option>select option</option>}
                                        {
                                            this.props.business.map((v, i) => {
                                                return <option key={i}
                                                               value={v._id}>{v.businessInfo.businessName}</option>
                                            })
                                        }


                                    </FormControl>}
                            </FormGroup>
                            </td>
                        </tr>
                        <tr>
                            <td><ControlLabel> Donation type:</ControlLabel><br/>
                                <input type="radio" name="fundraisingOption" checked={this.state.eventData.fundraisingOption==="onsite"?true:""} value="onsite"
                                       onChange={(e) => {
                                           this.onFieldChange(e)
                                       }}/>:OnSite<br/>
                                <input type="radio" name="fundraisingOption" checked={this.state.eventData.fundraisingOption==="onsite"?true:""} value="edonate"
                                       onChange={(e) => {
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
                                        {this.state.isEditing?
                                        <option>{this.state.eventData.donationOption}</option>:
                                            <option>select option</option>
                                        }
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
                                {this.state.isEditing?
                                    <Button bsStyle="info" style={{width: "40%"}} onClick={this.editEvent}>Edit
                                        Event</Button>:

                                <Button bsStyle="info" style={{width: "40%"}} onClick={this.scheduleEvent}>Create
                                    Event</Button>}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Modal>
                <div className="col-md-4" align="center">
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
        return bindActionCreators({listBusiness, fetchAllSchoolDetails, scheduleevents, eventslist,actionevents,}, dispatch)
    };
export default connect(mapStateToProps, mapDispatchToProps)

(
    Schedule
)
;