import React from 'react'


const Q2 = (props) => {
    function sendBackData(e) {
        props.passChildData('q2',e.target.value,3);
    }
    function startOver(e) {
        props.passChildData('q2','',1);
    }
    return (
        <div>
            <button onClick={startOver}>Start Over</button>
            <p>Do you see a dermatoloist regularly or are you willing to see one?</p>
            <div>
                <input type="radio" id="Yes" name="q2" value="Yes" onChange={sendBackData}/>
                <label htmlFor="Yes">Yes</label>
                <input type="radio" id="No" name="q2" value="No" onChange={sendBackData}/>
                <label htmlFor="No">No</label>
            </div>
        </div>
    )
}
export default Q2