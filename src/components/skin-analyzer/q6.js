import React from 'react'


const Q6 = (props) => {
    function sendBackData(e) {
        props.passChildData('q6',e.target.value,7);
    }
    function startOver(e) {
        props.passChildData('q2','',1);
    }
    function checkDataCondition(condition, data) {
        if (condition) {
          return data;
        } else {
          return '';
        }
    }
    return (
        <div>
            <button onClick={startOver}>Start Over</button>
            <p>What area are you most concerned about?</p>
            <div>
                {checkDataCondition((props.brandJourney=="Clinical Persona"),
                    <>
                        <input type="radio" id="TypeI" name="q" value="Type I" onChange={sendBackData}/>
                        <label htmlFor="TypeI">Type I</label>
                        <input type="radio" id="TypeII" name="q" value="Type II" onChange={sendBackData}/>
                        <label htmlFor="TypeII">Type II</label>
                        <input type="radio" id="TypeIII" name="q" value="Type III" onChange={sendBackData}/>
                        <label htmlFor="TypeIII">Type III</label>
                    </>
                )}
                {checkDataCondition((props.brandJourney!="Clinical Persona"),
                    <>
                        <input type="radio" id="TypeI" name="q" value="Type I" onChange={sendBackData}/>
                        <label htmlFor="TypeI">Type I</label>
                        <input type="radio" id="TypeII" name="q" value="Type II" onChange={sendBackData}/>
                        <label htmlFor="TypeII">Type II</label>
                        <input type="radio" id="TypeIII" name="q" value="Type III" onChange={sendBackData}/>
                        <label htmlFor="TypeIII">Type III</label>
                    </>
                )}
            </div>
        </div>
    )
}
export default Q6