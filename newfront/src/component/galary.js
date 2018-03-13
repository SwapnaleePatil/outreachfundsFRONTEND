import React from 'react'
import '../index.css'
const gallary = () => (
<div className="gallary-class">
    <div className="row">
        <div className="col-sm-4">
            <navbar/>
            <div className="thumbnail">
                <a href="http://cdn1.theodysseyonline.com/files/2016/01/04/6358748036944186621892622963_music.jpg">
                    <img
                        src={require('../images/charity3.jpg')}
                        style={{width: 300, height:300}}
                        alt=""/>
                </a>
                <div className="caption"><p>this is the image of music..</p></div>

            </div>
        </div>
        <div className="col-sm-4">
            <div className="thumbnail">
                <a href="http://www.indiancricketstars.com/wp-content/uploads/2015/03/gully.jpg">
                    <img  src={require('../images/charity2.jpg')}
                         style={{width: 300, height:300}} alt=""/>
                </a>
                <div className="caption"><p>this is the image of cricket</p></div>
            </div>
        </div>
        <div className="col-sm-4">
            <div className="thumbnail">
                <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Youth-soccer-indiana.jpg/400px-Youth-soccer-indiana.jpg">
                    <img
                        src={require('../images/charity.jpg')}
                        style={{width: 300, height:300}} alt=""/>
                </a>
                <div className="caption"><p>this is the image of football..</p></div>

            </div>
        </div>
    </div>
    <div className="row">

    <div className="col-sm-4">
            <div className="thumbnail">
                <a href="https://www.broomhillmanor.co.uk/wp-content/uploads/2014/05/Child-Facilities-Snooker1.jpg">
                    <img
                        src={require('../images/charity.jpg')}
                        style={{width: 300, height:300}} alt=""/>
                </a>
                <div className="caption"><p>this is the image of snooker..</p></div>
            </div>
        </div>
        <div className="col-sm-4">
            <div className="thumbnail">
                <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Youth-soccer-indiana.jpg/400px-Youth-soccer-indiana.jpg">
                    <img
                        src={require('../images/charity.jpg')}
                        style={{width: 300, height:300}} alt=""/>
                </a>
                <div className="caption"><p>this is the image of football..</p></div>

            </div>
        </div>
        <div className="col-sm-4">
            <div className="thumbnail">
                <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Youth-soccer-indiana.jpg/400px-Youth-soccer-indiana.jpg">
                    <img
                        src={require('../images/charity3.jpg')}
                        style={{width: 300, height:300}} alt=""/>
                </a>
                <div className="caption"><p>this is the image of football..</p></div>

            </div>
        </div>
    </div>

</div>
)

export default gallary;