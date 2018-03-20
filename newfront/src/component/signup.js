import React from 'react';
import {Table, FormControl, Button} from 'react-bootstrap'
import Modal from 'react-modal'
import BusinessFullPage from '../business/components/businessFullPage'
import signUpPage from '../students/components/signUpPage'
class SignUp extends React.Component
{
    constructor(){
        super();
        this.state={
            sisRole:false,
            srole:''
        }
    }
    toggleRole = () => {
        this.setState({
           sisRole: !this.state.sisRole
        })
    };

    render()
    {
        return(
            <div>

                <Modal isOpen={this.state.sisRole} ariaHideApp={true} onRequestClose={this.toggleRole}
                   className="role-class">
                <Table bordered>
                    <tbody>
                    <tr>
                        <td align="center">
                            <Button bsSize="large" className="rolebtn" type="button" value="student"
                                    onClick={() => {
                                        this.setState({
                                            sisRole: false,
                                            srole: "student"
                                        });
                                        this.toggleModal()
                                    }}>I am Student</Button>
                        </td>
                        <td>
                            <Button bsSize="large" className="rolebtn" type="button" value="business"
                                    onClick={() => {
                                        this.setState({
                                            sisRole: false,
                                            srole: "business"
                                        });
                                        this.toggleModal()
                                    }}>I am Business Person</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Modal>
                {
                    this.state.srole === "student" ? <BusinessFullPage/> : <signUpPage/>
                }
            </div>
        )
    }
}
export default SignUp;