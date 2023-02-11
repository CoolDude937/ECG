import React from 'react';
import Heartrate from './Heartrate/Heartrate';
import Profile from './Profile/Profile';
const Head = () => {
    return(
        <div className="head">
            <Profile />
            <Heartrate />
        </div>
    )
}

export default Head;