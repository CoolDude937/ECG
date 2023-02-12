import React from 'react';
import Heartrate from './Heartrate/Heartrate';
import Profile from './Profile/Profile';
import Rate from './Heartrate/Rate';
import "./head.scss";
const Head = () => {
    return(
        <div className="head">
            <Profile className='left'/>
            <div> </div>
        </div>
    )
}

export default Head;