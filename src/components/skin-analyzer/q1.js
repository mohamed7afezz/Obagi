import React from 'react'


const Q1 = (props) => {
    function sendBackData(e) {
        props.passChildData('q1',e.target.value,2);
    }
    return (
        <div>
            <p>Let’s start with your age</p>
            <div>
                <input type="radio" id="20" name="q1" value="20s" onChange={sendBackData}/>
                <label htmlFor="20">20’s</label>
                <input type="radio" id="30" name="q1" value="30s" onChange={sendBackData}/>
                <label htmlFor="30">30’s</label>
                <input type="radio" id="40" name="q1" value="40s" onChange={sendBackData}/>
                <label htmlFor="40">40’s</label>
            </div>
        </div>
    )
}
export default Q1