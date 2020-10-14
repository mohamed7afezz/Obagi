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
                        <input type="radio" id="FineLinesAndWrinklesC" name="q" value="Fine Lines And Wrinkles" onChange={sendBackData}/>
                        <label htmlFor="FineLinesAndWrinklesC">Fine Lines And Wrinkles</label>

                        <input type="radio" id="SkinDiscolorationC" name="q" value="Skin Discoloration" onChange={sendBackData}/>
                        <label htmlFor="SkinDiscolorationC">Skin Discoloration</label>

                        <input type="radio" id="BreakoutsC" name="q" value="Breakouts" onChange={sendBackData}/>
                        <label htmlFor="BreakoutsC">Breakouts</label>

                        <input type="radio" id="DehydratedSkinC" name="q" value="Dehydrated Skin" onChange={sendBackData}/>
                        <label htmlFor="DehydratedSkinC">Dehydrated Skin</label>

                        <input type="radio" id="RednessProneC" name="q" value="Redness Prone" onChange={sendBackData}/>
                        <label htmlFor="RednessProneC">Redness Prone</label>

                        <input type="radio" id="TiredPuffyEyesC" name="q" value="Tired & Puffy Eyes" onChange={sendBackData}/>
                        <label htmlFor="TiredPuffyEyesC">Tired & Puffy Eyes</label>

                        <input type="radio" id="SensitiveSkinC" name="q" value="Sensitive Skin" onChange={sendBackData}/>
                        <label htmlFor="SensitiveSkinC">Sensitive Skin</label>

                        <input type="radio" id="ElasticitySaggingSkinC" name="q" value="Elasticity & Sagging Skin" onChange={sendBackData}/>
                        <label htmlFor="ElasticitySaggingSkinC">Elasticity & Sagging Skin</label>

                        <input type="radio" id="PoresC" name="q" value="Pores" onChange={sendBackData}/>
                        <label htmlFor="PoresC">Pores</label>

                        <input type="radio" id="RoughSkinC" name="q" value="Rough Skin" onChange={sendBackData}/>
                        <label htmlFor="RoughSkinC">Rough Skin</label>                        
                        
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

                        <input type="radio" id="DehydratedSkin" name="q" value="Dehydrated Skin" onChange={sendBackData}/>
                        <label htmlFor="DehydratedSkin">Dehydrated Skin</label>

                        <input type="radio" id="RednessProne" name="q" value="Redness Prone" onChange={sendBackData}/>
                        <label htmlFor="RednessProne">Redness Prone</label>

                        <input type="radio" id="EyeBagsAndDarkCircles" name="q" value="Eye Bags And Dark Circles" onChange={sendBackData}/>
                        <label htmlFor="EyeBagsAndDarkCircles">Eye Bags And Dark Circles</label>

                        <input type="radio" id="SensitiveSkin" name="q" value="Sensitive Skin" onChange={sendBackData}/>
                        <label htmlFor="SensitiveSkin">Sensitive Skin</label>

                        <input type="radio" id="ElastisitySagging" name="q" value="Elastisity & Sagging" onChange={sendBackData}/>
                        <label htmlFor="ElastisitySagging">Elastisity & Sagging</label>

                        <input type="radio" id="HyperpigmentationMelasma" name="q" value="Hyperpigmentation & Melasma" onChange={sendBackData}/>
                        <label htmlFor="HyperpigmentationMelasma">Hyperpigmentation & Melasma</label>
                    </>
                )}
            </div>
        </div>
    )
}
export default Q4