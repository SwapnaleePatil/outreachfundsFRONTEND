import React from 'react'
import Modal from 'react-modal'
import {Table, FormControl, Button} from 'react-bootstrap'

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
    }

    render() {
        return (
            <div>
                <div className="col-md-10">
                </div>
                <Modal isOpen={this.state.isCalender} ariaHideApp={false} className="schedulemodal">
                    <Table bordered>
                        <tbody>
                        <tr>
                            <td align="right">
                                <a href="#" onClick={this.toggleCalander}>X</a>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                Event Scheduler
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl type="text" placeholder="Enter Event Name"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl type="text" placeholder="Organisation Name"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl type="text" placeholder="Address"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl type="Date"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                From: <input type="date" width="10%"/>
                                To :<input type="date"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl type="text" placeholder="Search Business Here"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                               <input type="radio" value="onsite"/>:OnSite<br/>
                               <input type="radio" value="edonate"/>: eDonation
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button bsStyle="info">Create Event</Button>
                                <Button bsStyle="danger">Cancel</Button>
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
                            style={{width: 200, height: 200}} alt=""/></a>
                </div>
            </div>
        )
    }
}

export default Schedule;