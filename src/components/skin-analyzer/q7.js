import React,{useState} from 'react'


const Q7 = (props) => {
    const [ingredients, setIngredients] = useState('');
    function handleInputChange(e) {
        setIngredients(e.target.value)
    }
    function sendBackData(e) {
        props.passChildData('q7',ingredients,8);
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
            <p>What product types or ingredients are you looking htmlFor?</p>
            <div>
                {checkDataCondition((props.brandJourney=="Clinical Persona"),
                    <>
                        <input type="radio" id="Retinol" name="q" value="Retinol" onChange={handleInputChange}/>
                        <label htmlFor="Retinol">Retinol</label>
                        <input type="radio" id="GlycolicAcid" name="q" value="Glycolic Acid" onChange={handleInputChange}/>
                        <label htmlFor="GlycolicAcid">Glycolic Acid</label>
                        <input type="radio" id="SalicylicAcid" name="q" value="Salicylic Acid" onChange={handleInputChange}/>
                        <label htmlFor="SalicylicAcid">Salicylic Acid</label>
                    </>
                )}
                {checkDataCondition((props.brandJourney!="Clinical Persona"),
                    <>
                        <input type="radio" id="GlycolicAcid" name="q" value="Glycolic Acid" onChange={handleInputChange}/>
                        <label htmlFor="GlycolicAcid">Glycolic Acid</label>
                        <input type="radio" id="HyaluronicAcid" name="q" value="Hyaluronic Acid" onChange={handleInputChange}/>
                        <label htmlFor="HyaluronicAcid">Hyaluronic Acid</label>
                        <input type="radio" id="Niacinamide" name="q" value="Niacinamide" onChange={handleInputChange}/>
                        <label htmlFor="Niacinamide">Niacinamide</label>
                    </>
                )}
                <button onClick={sendBackData}>See Your Results</button>
            </div>
        </div>
    )
}
export default Q7