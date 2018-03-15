import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FirstPage from './firstPage';
import SecondPage from './secondPage';
import ThirdPage from './thirdPage';
import FourthPage from './fourthPage';
import {businessSignup} from '../action';
class BusinessFullPage extends React.Component{
    componentWillMount(){
        if(this.props.Page===0)
            this.props.businessSignup();
    }
    render(){
        console.log("Page : ",this.props.Page);
        return(
            <div>
                {(this.props.Page===1)?<FirstPage/>:<span></span>}
                {(this.props.Page===2)?<SecondPage/>:<span></span>}
                {(this.props.Page===3)?<ThirdPage/>:<span></span>}
                {(this.props.Page===4)?<FourthPage/>:<span></span>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        Page:state.businessSignUpRed
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        businessSignup
    },dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(BusinessFullPage);