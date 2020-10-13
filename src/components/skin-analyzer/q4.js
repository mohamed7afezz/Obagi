import React from 'react'


const Q4 = (props) => {
    function sendBackData(e) {
        props.passChildData('q4',e.target.value,5);
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
                        <input type="radio" id="FineLinesAndWrinkles" name="q" value="Fine Lines And Wrinkles" onChange={sendBackData}/>
                        <label htmlFor="FineLinesAndWrinkles">Fine Lines And Wrinkles</label>
                        <input type="radio" id="SkinDiscoloration" name="q" value="Skin Discoloration" onChange={sendBackData}/>
                        <label htmlFor="SkinDiscoloration">Skin Discoloration</label>
                        <input type="radio" id="Breakouts" name="q" value="Breakouts" onChange={sendBackData}/>
                        <label htmlFor="Breakouts">Breakouts</label>
                    </>
                )}
                {checkDataCondition((props.brandJourney!="Clinical Persona"),
                    <>
                        <input type="radio" id="FineLinesAndWrinkles" name="q" value="Fine Lines And Wrinkles" onChange={sendBackData}/>
                        <label htmlFor="FineLinesAndWrinkles">Fine Lines And Wrinkles</label>
                        <input type="radio" id="SkinDiscoloration" name="q" value="Skin Discoloration" onChange={sendBackData}/>
                        <label htmlFor="SkinDiscoloration">Skin Discoloration</label>
                        <input type="radio" id="Acne" name="q" value="Acne" onChange={sendBackData}/>
                        <label htmlFor="Acne">Acne</label>
                    </>
                )}
            </div>
        </div>
    )
}
export default Q4