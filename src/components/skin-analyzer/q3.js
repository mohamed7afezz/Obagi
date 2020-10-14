import React from 'react'


const Q3 = (props) => {
    function sendBackData(e) {
        props.passChildData('q3',e.target.value,4);
    }
    function startOver(e) {
        props.passChildData('q2','',1);
    }
    return (
        <div>
            <button onClick={startOver}>Start Over</button>
            <p>Are you looking htmlFor a preventative solution or corrective solution?</p>
            <div>
                <input type="radio" id="Preventative" name="q" value="Preventative" onChange={sendBackData}/>
                <label htmlFor="Preventative">Preventative</label>
                <input type="radio" id="Corrective" name="q" value="Corrective" onChange={sendBackData}/>
                <label htmlFor="Corrective">Corrective</label>
            </div>
        </div>
    )
}
export default Q3