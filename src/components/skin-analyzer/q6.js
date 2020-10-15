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
                        <input type="radio" id="TypeIC" name="q" value="Type I" onChange={sendBackData}/>
                        <label htmlFor="TypeIC">Type I</label>

                        <input type="radio" id="TypeIIC" name="q" value="Type II" onChange={sendBackData}/>
                        <label htmlFor="TypeIIC">Type II</label>

                        <input type="radio" id="TypeIIIC" name="q" value="Type III" onChange={sendBackData}/>
                        <label htmlFor="TypeIIIC">Type III</label>

                        <input type="radio" id="TypeIVC" name="q" value="Type IV" onChange={sendBackData}/>
                        <label htmlFor="TypeIVC">Type IV</label>

                        <input type="radio" id="TypeVC" name="q" value="Type V" onChange={sendBackData}/>
                        <label htmlFor="TypeVC">Type V</label>

                        <input type="radio" id="TypeVIC" name="q" value="Type VI" onChange={sendBackData}/>
                        <label htmlFor="TypeVIC">Type VI</label>
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

                        <input type="radio" id="TypeIV" name="q" value="Type IV" onChange={sendBackData}/>
                        <label htmlFor="TypeIV">Type IV</label>

                        <input type="radio" id="TypeV" name="q" value="Type V" onChange={sendBackData}/>
                        <label htmlFor="TypeV">Type V</label>

                        <input type="radio" id="TypeVI" name="q" value="Type VI" onChange={sendBackData}/>
                        <label htmlFor="TypeVI">Type VI</label>
                    </>
                )}
            </div>
        </div>
    )
}
export default Q6