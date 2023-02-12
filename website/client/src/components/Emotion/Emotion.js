import React, {useState, useEffect} from 'react';


const Emotion = () => {
    const [angry, setAngry] = useState(0);
    const [happy, setHappy] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [sad, setSad] = useState(0);
    const [surprised, setSurprised] = useState(0);
    
    return(
        <div>
            <button onClick={()=> setHappy(happy + 1)}>press</button>
            <div className='angry bubble'><h1>Angry: {angry* 100}%</h1></div>
            <div className ='happy bubble'><h1>Happy: {happy* 100}%</h1></div>
            <div className='neutral bubble'><h1>Neutral: {neutral* 100}%</h1></div>
            <div className='sad bubble'><h1>Sad: {sad* 100}%</h1></div>
            <div className='surprised bubble'><h1>Surprised: {surprised* 100}%</h1></div>
        </div>
    )
}
export default Emotion;