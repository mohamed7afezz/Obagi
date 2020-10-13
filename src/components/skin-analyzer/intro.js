import React from 'react'


const Intro = (props) => {
    function sendBackData() {
        props.passChildData(1);
    }
    return (
        <div>
            Find your skincare solution
            <button onClick={sendBackData}>Take the Quiz</button>
        </div>
    )
}
export default Intro