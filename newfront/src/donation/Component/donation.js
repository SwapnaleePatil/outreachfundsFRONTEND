import React from 'react'
import DisplayForm from './addDonation'

class Donation extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <div className="col-sm-6">
                    <DisplayForm/>
                </div>
                <div className="col-sm-6">
                    <h1>ad</h1>
                </div>
            </div>
        )
    }
}
export default Donation;