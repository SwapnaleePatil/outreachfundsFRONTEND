import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import _ from 'lodash'
import {bindActionCreators} from 'redux'
import SelectField from 'material-ui/SelectField';
import MenuItemMaterial from 'material-ui/MenuItem';
import {Table, FormControl, Button, FormGroup, ControlLabel, DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap'
import {scheduleevents, eventslist, actionevents} from '../action/index'
import {listBusiness} from '../business/action/index'
import {fetchAllSchoolDetails} from '../students/action/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
let business = "";
let school = "";
let eventlenght = ""

class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {
            isCalender: false,
            eventData: [],
            businessname: "",
            eventowner: "",
            businesseventer: [],
            isEditing: false,
            values: [],
            dataperpage: "3",
            currentpage: "1",
            data: [],
            isSearching: false,
            searchdata: [],
            businessNameSelect: []
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
        this.setState({data: nextProps.events});
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
                console.log(this.state.eventowner)
            });
        });
    }


    onFieldChange = (e) => {
        let {name, value} = e.target;
        let {eventData} = this.state;
        eventData[name] = value;
        this.setState({
            eventData
        })
        ;
    };


    rejectEvent = (did) => {
        let data = {
            id: did,
            status: false
        };
        this.props.actionevents(data)
        this.clearData();

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
            let data = {
                businessSponsor: this.state.businessNameSelect,
                ...this.state.eventData
            };
            this.props.scheduleevents(data);
        }
        this.toggleCalander();
        this.clearData();
    };
    clearData = () => {
        this.state.eventData = [];
        this.state.isEditing = false;
    };
    acceptSchedule = (did) => {

        let data = {
            id: did,
            accept: true,
        };
        this.props.actionevents(data)
    };
    editEvent = () => {
        let data = {
            id: this.state.eventData._id,
            ...this.state.eventData
        };
        this.toggleCalander();
        this.props.actionevents(data);

        this.clearData();
    };
    pageChange = (e) => {
        this.setState({
            dataperpage: e.target.value
        })
    };

    handleChange = (event, index, businessNameSelect) => this.setState({businessNameSelect});
    handleClick = (event) => {
        this.setState({
            currentpage: Number(event.target.id)
        })
    };
    searching = (e) => {
        this.setState({
            name: e.target.value
        });

        this.setState({
            name: e.target.value,
            isSearching: true,
            searchdata: []
        });
        let {searchdata} = this.state;
        searchdata = [];
        this.state.data.map((value, i) => {
            if (value.eventName.includes(e.target.value)) {
                searchdata.push(value)
            }
            this.setState({
                searchdata
            });
            if (e.target.value === "") {
                this.setState({
                    isSearching: false
                })
            }
        })
    };

    render() {
        debugger;
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
            <div className="schedule-class">

                <div className="col-md-9">
                    {/*Events which are in review now*/}

                    {this.state.businessname !== "" ?
                        <Table bordered striped>
                            <tbody>
                            <tr>
                                <td colspan={7} align="center"><h4>Events In Review</h4></td>
                            </tr>
                            <tr>
                                <th>Dates</th>
                                <th>Organization Name</th>
                                <th>Event Name</th>
                                <th>Location</th>
                                <th>Time</th>
                                <th>Business Sponsor Name</th>
                                <th>Status</th>

                            </tr>

                            {this.props.events.map((v, i) => {
                                if (this.state.eventowner === v.businessSponsor.includes(this.state.eventowner)) {
                                    console.log(this.state.eventowner);
                                    debugger;
                                    return <tr>
                                        <td>
                                            {v.eventDate && v.eventDate.split("T")[0]}
                                        </td>
                                        {
                                            this.props.organization.map((value, i) => {
                                                if (value._id === v.schoolOrganisation) {
                                                    school = value.organisationName
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
                                        {
                                            v.accept === true ?
                                                <td>Comfirmed</td> :
                                                <td>
                                                    <DropdownButton title="Action" id="bg-nested-dropdown">
                                                        <MenuItem eventKey="1" onClick={() => {
                                                            this.acceptSchedule(v._id)
                                                        }}>Accept</MenuItem>
                                                        <MenuItem eventKey="2" onClick={() => {
                                                            this.setState({
                                                                eventData: v,
                                                                isEditing: true
                                                            });
                                                            this.toggleCalander()
                                                        }}>Edit Schedule</MenuItem>
                                                        <MenuItem eventKey="3" onClick={() => {
                                                            this.rejectEvent(v._id)
                                                        }}>Reject</MenuItem>
                                                    </DropdownButton>
                                                </td>
                                        }

                                    </tr>
                                }

                            })
                            }
                            </tbody>
                        </Table>
                        :
                        <Table bordered striped>
                            <tbody>
                            <tr>
                                <td colspan={7} align="center"><h4>Events</h4></td>
                            </tr>
                            <tr>
                            <td>Total No Of Event:-{eventlenght = this.props.events.length}</td>
                            <td>
                            <select onChange={this.pageChange}>
                            <option value={3}>--Record Per Page</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>


                            </select>
                            </td>
                            <td colSpan="2">
                            <FormControl type="text" placeholder="Search Event" onChange={(e) => {
                            this.searching(e)
                            }}/>
                            </td>
                            </tr>
                            <tr>
                                <th>Dates</th>
                                <th>Organization Name</th>
                                <th>Event Name</th>
                                <th>Location</th>
                                <th>Time</th>
                                <th>Business Sponsor Name</th>
                                <th>Status</th>

                            </tr>
                            {currentdata.map((v, i) => {
                                return <tr key={i}>
                                <td>
                                {v.eventDate && v.eventDate.split("T")[0]}
                                </td>
                                {
                                    this.props.organization.map((value, i) => {
                                        if (value._id === v.schoolOrganisation) {
                                            school = value.organisationName
                                        }
                                    })
                                }
                                <td> {school}</td>
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
                                        {v.accept===true?
                                        <td className="approve-class">approved</td>:
                                            <td className="pending-class">pending</td>
                                        }
                                </tr>
                                // <tr>
                                // <td colSpan="9" className="tbt" align="center">
                                // {renderpage}
                                // </td>
                                // </tr>

                            })
                            }
                            <tr>
                                <td colSpan="9" className="tbt" align="center">
                                    {renderpage}
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    }


                    {/*All Events*/}


                    {/*<h2 align="center">All Events</h2>*/}
                    {/*<Table bordered striped>*/}
                        {/*<tbody>*/}
                        {/*<tr>*/}
                            {/*<td>Total No Of Event:-{eventlenght = this.props.events.length}</td>*/}
                            {/*<td>*/}
                                {/*<select onChange={this.pageChange}>*/}
                                    {/*<option value={3}>--Record Per Page</option>*/}
                                    {/*<option value={2}>2</option>*/}
                                    {/*<option value={3}>3</option>*/}
                                    {/*<option value={4}>4</option>*/}
                                    {/*<option value={5}>5</option>*/}
                                    {/*<option value={10}>10</option>*/}
                                    {/*<option value={20}>20</option>*/}
                                    {/*<option value={50}>50</option>*/}


                                {/*</select>*/}
                            {/*</td>*/}
                            {/*<td colSpan="2">*/}
                                {/*<FormControl type="text" placeholder="Search Event" onChange={(e) => {*/}
                                    {/*this.searching(e)*/}
                                {/*}}/>*/}
                            {/*</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                            {/*<th>Dates</th>*/}
                            {/*<th>Organization Name</th>*/}
                            {/*<th> Event Name</th>*/}
                            {/*<th>Location</th>*/}
                            {/*<th>Time</th>*/}
                            {/*<th>Sponser</th>*/}
                        {/*</tr>*/}
                        {/*{this.state.isSearching ?*/}
                            {/*this.state.searchdata.map((v, i) => {*/}

                                {/*if (v.accept === true) {*/}
                                    {/*return <tr key={i}>*/}
                                        {/*<td>*/}
                                            {/*{v.eventDate && v.eventDate.split("T")[0]}*/}
                                        {/*</td>*/}
                                        {/*{*/}
                                            {/*this.props.organization.map((value, i) => {*/}
                                                {/*if (value._id === v.schoolOrganisation) {*/}
                                                    {/*school = value.organisationName*/}
                                                {/*}*/}
                                            {/*})*/}
                                        {/*}*/}
                                        {/*<td> {school}</td>*/}
                                        {/*<td>*/}
                                            {/*{v.eventName}*/}
                                        {/*</td>*/}
                                        {/*<td>*/}
                                            {/*{v.location}*/}
                                        {/*</td>*/}
                                        {/*<td>*/}
                                            {/*{v.eventTime}*/}
                                        {/*</td>*/}
                                        {/*{this.props.business.map((value, i) => {*/}
                                            {/*if (value._id === v.businessSponsor) {*/}
                                                {/*business = value.businessInfo.businessName*/}
                                            {/*}*/}
                                        {/*})}*/}
                                        {/*<td>{business}</td>*/}

                                    {/*</tr>*/}
                                {/*}*/}
                            {/*}) :*/}
                            {/*currentdata.map((v, i) => {*/}
                                {/*if (v.accept === true) {*/}
                                    {/*return <tr key={i}>*/}
                                        {/*<td>*/}
                                            {/*{v.eventDate && v.eventDate.split("T")[0]}*/}
                                        {/*</td>*/}
                                        {/*{*/}
                                            {/*this.props.organization.map((value, i) => {*/}
                                                {/*if (value._id === v.schoolOrganisation) {*/}
                                                    {/*school = value.organisationName*/}
                                                {/*}*/}
                                            {/*})*/}
                                        {/*}*/}
                                        {/*<td> {school}</td>*/}
                                        {/*<td>*/}
                                            {/*{v.eventName}*/}
                                        {/*</td>*/}
                                        {/*<td>*/}
                                            {/*{v.location}*/}
                                        {/*</td>*/}
                                        {/*<td>*/}
                                            {/*{v.eventTime}*/}
                                        {/*</td>*/}
                                        {/*{this.props.business.map((value, i) => {*/}
                                            {/*if (value._id === v.businessSponsor) {*/}
                                                {/*business = value.businessInfo.businessName*/}
                                            {/*}*/}
                                        {/*})}*/}
                                        {/*<td>{business}</td>*/}
                                    {/*</tr>*/}
                                {/*}*/}

                            {/*})*/}
                        {/*}*/}
                        {/*<tr>*/}
                            {/*<td colSpan="9" className="tbt" align="center">*/}
                                {/*{renderpage}*/}
                            {/*</td>*/}
                        {/*</tr>*/}
                        {/*</tbody>*/}
                    {/*</Table>*/}

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
                        <a href="#" onClick={() => {
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
                        <FormControl type="text" name="eventName" value={this.state.eventData.eventName}
                                     placeholder="Enter Event Name"
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
                                this.props.organization.map((value, i) => {
                                    if (value._id === this.state.eventData.schoolOrganisation) {
                                        school = value.organisationName
                                    }
                                })
                            }
                            {this.state.isEditing ?
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
                        <FormControl name="location" type="text" value={this.state.eventData.location}
                                     placeholder="Address"
                                     onChange={(e) => {
                                         this.onFieldChange(e)
                                     }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <ControlLabel>Date:</ControlLabel>
                        <FormControl type="Date" name="eventDate"
                                     value={this.state.eventData.eventDate && this.state.eventData.eventDate.split("T")[0]}
                                     onChange={(e) => {
                                         this.onFieldChange(e)
                                     }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <ControlLabel>Time:</ControlLabel>
                        <FormControl type="text" name="eventTime" value={this.state.eventData.eventTime}
                                     placeholder="Event Time"
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
                            <MuiThemeProvider>
                                <SelectField
                                    multiple={true}
                                    hintText="Select a name"
                                    value={this.state.businessNameSelect}
                                    onChange={this.handleChange}
                                >
                                    {
                                        this.props.business.map((v, i) => {
                                            return <MenuItemMaterial
                                                key={i}
                                                insetChildren={true}
                                                checked={this.state.businessNameSelect && this.state.businessNameSelect.indexOf(v._id) > -1}
                                                value={v._id}
                                                primaryText={v.businessInfo.businessName}
                                            />
                                        })
                                    }
                                </SelectField>
                            </MuiThemeProvider>
                        }

                    </FormGroup>
                    </td>
                </tr>
                <tr>
                    <td><ControlLabel> Donation type:</ControlLabel><br/>
                        <input type="radio" name="fundraisingOption"
                               defaultChecked={this.state.eventData.fundraisingOption === "onsite" ? true : ""}
                               value="onsite"
                               onChange={(e) => {
                                   this.onFieldChange(e)
                               }}/>:OnSite<br/>
                        <input type="radio" name="fundraisingOption"
                               defaultChecked={this.state.eventData.fundraisingOption === "onsite" ? true : ""}
                               value="edonate"
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
                                {this.state.isEditing ?
                                    <option>{this.state.eventData.donationOption}</option> :
                                    <option>select option</option>}
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
                        {this.state.isEditing ?
                            <Button bsStyle="info" style={{width: "40%"}} onClick={this.editEvent}>Edit
                                Event</Button> :

                            <Button bsStyle="info" style={{width: "40%"}} onClick={this.scheduleEvent}>Create
                                Event</Button>}
                    </td>
                </tr>
                </tbody>
            </Table>
        </Modal>
        <div className="col-md-3" align="center">
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
        return bindActionCreators({
            listBusiness,
            fetchAllSchoolDetails,
            scheduleevents,
            eventslist,
            actionevents,
        }, dispatch)
    };
export default connect(mapStateToProps, mapDispatchToProps)

(
    Schedule
)
;