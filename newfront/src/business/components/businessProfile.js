import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux'
import './businessCSS.css'
import {listBusiness} from '../action/index'
class BusinessProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerData: [],
        }
    }
    componentWillMount()
    {
    }
    render() {
        return (
            <div  style={{"margin-left": "25%","margin-right": "20%"}}>
                <div className="col-sm-4">
                    <div>
                        <img src="https://www.reduceimages.com/img/image-after.jpg"
                             style={{"width": "90%", "height": "90%"}}/></div>
                    <div className="heading"> Owner Detail </div>
                    <div>
                        <div className="field"><label> First Name </label>: Swapnalee</div>
                        <div className="field"><label>Last Name </label>:Patil</div>
                        <div className="field"><label> Gender </label>:Female</div>
                        <div className="field"><label> Date Of Birth </label>:19/09/1994</div>
                        <div className="field"><label> Email </label>:monapatil@gmail.com</div>
                        <div className="field"><label> Phone </label>:7878782232</div>

                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="heading">Business Detail</div>
                    <div>
                        <div className="fieldsecond"><label>Business Name </label>: La net Team Software Solution</div>
                        <div className="fieldsecond"><label>Business Type </label>: Software Company</div>
                        <div className="fieldsecond"><label>Business Hours </label>: 08:00</div>
                        <div className="fieldsecond"><label>Business Address </label>: <h4 align="right">405/406 Luxuria Business Hub,<br/>
                            Near VR mall,<br/>
                            Surat - Dumas Rd,<br/>
                            Surat, Gujarat 395007</h4></div>
                        <div className="fieldsecond"><label>Business Phone</label>:7878782232</div>
                        <div className="fieldsecond"><label>Business Email</label>:monapatil@gmail.com</div>

                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile)
