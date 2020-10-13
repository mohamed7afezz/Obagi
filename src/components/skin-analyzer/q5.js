import React from 'react'


const Q5 = (props) => {
    function sendBackData(e) {
        props.passChildData('q5',e.target.value,6);
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
                        <input type="radio" id="DrySkin" name="q" value="Dry Skin" onChange={sendBackData}/>
                        <label htmlFor="DrySkin">Dry Skin</label>
                        <input type="radio" id="NormalSkin" name="q" value="Normal Skin" onChange={sendBackData}/>
                        <label htmlFor="NormalSkin">Normal Skin</label>
                        <input type="radio" id="CombinationSkin" name="q" value="Combination Skin" onChange={sendBackData}/>
                        <label htmlFor="CombinationSkin">Combination Skin</label>
                    </>
                )}
                {checkDataCondition((props.brandJourney!="Clinical Persona"),
                    <>
                        <input type="radio" id="DrySkin" name="q" value="Dry Skin" onChange={sendBackData}/>
                        <label htmlFor="DrySkin">Dry Skin</label>
                        <input type="radio" id="NormalSkin" name="q" value="Normal Skin" onChange={sendBackData}/>
                        <label htmlFor="NormalSkin">Normal Skin</label>
                        <input type="radio" id="CombinationSkin" name="q" value="Combination Skin" onChange={sendBackData}/>
                        <label htmlFor="CombinationSkin">Combination Skin</label>
                    </>
                )}
            </div>
        </div>
    )
}
export default Q5