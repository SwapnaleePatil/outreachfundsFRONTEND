import React from 'react'
import '../../index.css'

const gallary = () => (
    <div className="gallary-class">
        <div className="row">
            <div className="gallary-class-row">

                <div className="col-sm-4">
                    <div className="img-thumbnail">
                        <img
                            src={require('../../images/charity.jpg')}
                            style={{width: 470, height: 350}}
                            alt=""/>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="img-thumbnail">
                        <img src={require('../../images/charity1.jpg')}
                             style={{height: 350}} alt=""/>

                        <div className="caption">
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="img-thumbnail">
                        <img
                            src={require('../../images/charity5.jpg')}
                            style={{height: 350}}
                            alt=""/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="gallary-class-row">
                <div className="col-sm-7">
                    <img
                        src={require('../../images/fundrising.jpg')}
                        style={{width: 800, height: 350}} alt=""/>
                </div>
                <div className="col-sm-5">
                    <h2><p align="center" className="font-p">Here many events ganerated for student Fund rising,we helped schools to gather more than 2 million dollar for student and school development</p></h2>
                </div>
            </div>
        </div>
    </div>
);
export default gallary;