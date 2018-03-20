import React from 'react'
import DisplayForm from './../donation/donationComponent/addDonation'
import Graph from './../donation/donationComponent/graph'

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
                    <Graph/>
                </div>
            </div>
        )
    }
}
export default Donation;