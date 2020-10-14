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
                        <input type="radio" id="RetinolC" name="q" value="Retinol" onChange={handleInputChange}/>
                        <label htmlFor="RetinolC">Retinol</label>

                        <input type="radio" id="GlycolicAcidC" name="q" value="Glycolic Acid" onChange={handleInputChange}/>
                        <label htmlFor="GlycolicAcidC">Glycolic Acid</label>

                        <input type="radio" id="SalicylicAcidC" name="q" value="Salicylic Acid" onChange={handleInputChange}/>
                        <label htmlFor="SalicylicAcidC">Salicylic Acid</label>

                        <input type="radio" id="LacticAcidC" name="q" value="Lactic Acid" onChange={handleInputChange}/>
                        <label htmlFor="LacticAcidC">Lactic Acid</label>
                        
                        <input type="radio" id="VitaminCC" name="q" value="Vitamin C" onChange={handleInputChange}/>
                        <label htmlFor="VitaminCC">Vitamin C</label>

                        <input type="radio" id="KinetinGrowthFactorsC" name="q" value="Kinetin (Growth Factors)" onChange={handleInputChange}/>
                        <label htmlFor="KinetinGrowthFactorsC">Kinetin (Growth Factors)</label>

                        <input type="radio" id="ArbutinC" name="q" value="Arbutin" onChange={handleInputChange}/>
                        <label htmlFor="ArbutinC">Arbutin</label>
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

                        <input type="radio" id="Salicylicacid" name="q" value="Salicylic acid" onChange={handleInputChange}/>
                        <label htmlFor="Salicylicacid">Salicylic acid</label>
                        
                        <input type="radio" id="Caffeine" name="q" value="Caffeine" onChange={handleInputChange}/>
                        <label htmlFor="Caffeine">Caffeine</label>

                        <input type="radio" id="Hydroquinone" name="q" value="Hydroquinone" onChange={handleInputChange}/>
                        <label htmlFor="Hydroquinone">Hydroquinone</label>

                        <input type="radio" id="Lacticacid" name="q" value="Lactic acid" onChange={handleInputChange}/>
                        <label htmlFor="Lacticacid">Lactic acid</label>

                        <input type="radio" id="BenzoylPeroxide" name="q" value="Benzoyl Peroxide" onChange={handleInputChange}/>
                        <label htmlFor="BenzoylPeroxide">Benzoyl Peroxide</label>

                        <input type="radio" id="Glycerin" name="q" value="Glycerin" onChange={handleInputChange}/>
                        <label htmlFor="Glycerin">Glycerin</label>

                        <input type="radio" id="Peptides" name="q" value="Peptides" onChange={handleInputChange}/>
                        <label htmlFor="Peptides">Peptides</label>

                        <input type="radio" id="Arbutin" name="q" value="Arbutin" onChange={handleInputChange}/>
                        <label htmlFor="Arbutin">Arbutin</label>

                        <input type="radio" id="AHAsBHAsPHAs" name="q" value="AHAs / BHAs / PHAs" onChange={handleInputChange}/>
                        <label htmlFor="AHAsBHAsPHAs">AHAs / BHAs / PHAs</label>

                        <input type="radio" id="VitaminC" name="q" value="Vitamin-C" onChange={handleInputChange}/>
                        <label htmlFor="VitaminC">Vitamin-C</label>

                        <input type="radio" id="Retinol" name="q" value="Retinol" onChange={handleInputChange}/>
                        <label htmlFor="Retinol">Retinol</label>

                        <input type="radio" id="Antioxidants" name="q" value="Antioxidants" onChange={handleInputChange}/>
                        <label htmlFor="Antioxidants">Antioxidants</label>
                    </>
                )}
                <button onClick={sendBackData}>See Your Results</button>
            </div>
        </div>
    )
}
export default Q7