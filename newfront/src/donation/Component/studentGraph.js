import React, {Component} from 'react';

import {BarChart} from 'react-easy-chart'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getDonationAction} from '../actions/index'
import {FetchAllStudents} from '../../students/action/index'


class StudentGraph extends Component {
    constructor(){
        super();
        this.state={
            graphData:[],
            chartData:[],
            totalDonationAmount:0,
            confirmAmount:0,
            pendingAmount:0,
            monthAmount:0,
            yearAmount:0
        };
    }
    componentDidMount(){
        this.props.FetchAllStudents();
        // this.props.getDonationAction();

    }
    componentWillReceiveProps(nextProps){
        let {graphData} = this.state;
        graphData=[];
        // const temp = nextProps.students[0];
        nextProps.donationData.forEach((rec)=>{
            if(rec.organizationId === (nextProps.students[0] && nextProps.students[0].schoolId)){
                graphData.push(rec);
            }
        });
        this.setState({
            graphData
        },()=>{this.changeGraph();
        });
    }
    changeGraph=()=>{
        let {totalDonationAmount,confirmAmount,yearAmount,monthAmount,pendingAmount} = this.state;
        totalDonationAmount=0;
        confirmAmount=0;
        yearAmount=0;
        monthAmount=0;
        pendingAmount=0;
        this.state.graphData.forEach((value)=>{
            totalDonationAmount = totalDonationAmount + Number(value.amount);
        });

        this.state.graphData.forEach((value)=>{
            if(value.status){
               confirmAmount = confirmAmount + Number(value.amount);
            }
        });

        this.state.graphData.forEach((value)=>{
            if(!value.status){
                pendingAmount = pendingAmount + Number(value.amount);
            }
        });

        this.state.graphData.forEach((value)=>{
            if(Number(value.donationDate.slice(-4)) === Number(new Date().getFullYear())){
                yearAmount = yearAmount + Number(value.amount);
            }
        });

        this.state.graphData.forEach((value)=>{
            if(Number(value.donationDate.slice(3,-5)) === Number(new Date().getMonth())){
                monthAmount = monthAmount + Number(value.amount);
            }
        });
        this.setState({
            totalDonationAmount,
            pendingAmount,
            confirmAmount,
            yearAmount,
            monthAmount
        },()=>{
            console.log('asdasdasdad',totalDonationAmount);
        });
    };
    render() {

        return (
            <div>
                <center><h1>Graph</h1></center>
                <div>
                    <BarChart
                        colorBars
                        axisLabels={{x:'Events',y:'Amounts'}}
                        axes
                        height="300"
                        width="700"
                        data={[
                            {x:'Total Amount',y:this.state.totalDonationAmount},
                            {x:'Pending',y:this.state.pendingAmount},
                            {x:'Confirmed',y:this.state.confirmAmount},
                            {x:'This Month',y:this.state.monthAmount},
                            {x:'This Year',y:this.state.yearAmount},
                        ]}
                    />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        donationData: state.donation,
        businessInfo:state.businessInfo,
        students:state.students
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        // getDonationAction,
        FetchAllStudents
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(StudentGraph)