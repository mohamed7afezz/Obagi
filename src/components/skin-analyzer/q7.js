import React, { useState } from 'react'
import ProgressBar from '../../components/progress-bar'



const Q7 = (props) => {
    const [disableButton, setDisableButton] = useState();
    const [ingredients, setIngredients] = useState('');
    function handleInputChange(e) {
        setIngredients(e.target.value)
    }
    function sendBackData(e) {
        props.passChildData('q7', ingredients, 8);
    }
    function startOver(e) {
        props.passChildData('q2', '', 1);
    }
    function checkDataCondition(condition, data) {
        if (condition) {
            return data;
        } else {
            return '';
        }
    }
    return (
        <div className="skinanalyzer-questions-wrapper">
            <div className="row question-progress-wrapper last-question-progress d-lg-none justify-content-center">
                <div className="col-auto">
                    <ProgressBar
                        percentage="100%"
                        index="7"
                        total="7"
                    />
                </div>
            </div>
            <div className="row quiz-header-wrapper">
                <div className="col-2 d-none d-lg-block">
                    <button onClick={startOver} className="start-over">Start Over</button>
                </div>
                <div className="col-12 col-lg-2 offset-lg-3">
                    <div className="quiz-title">Skin Analyzer Quiz</div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-lg-6 offset-lg-3">
                    <div className="question-header">What Key Ingredients Are You Looking For?</div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-auto">
                    <div className="question-text">Please specify any key ingredients you are interested in incorporating to your daily skin care regimen.</div>

                </div>
            </div>

            <>
                {checkDataCondition((props.brandJourney == "Clinical Persona"),
                    <>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="RetinolC" name="q" value="Retinol" onChange={handleInputChange} />
                                <label htmlFor="RetinolC">Retinol</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="GlycolicAcidC" name="q" value="Glycolic Acid" onChange={handleInputChange} />
                                <label htmlFor="GlycolicAcidC">Glycolic Acid</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="SalicylicAcidC" name="q" value="Salicylic Acid" onChange={handleInputChange} />
                                <label htmlFor="SalicylicAcidC">Salicylic Acid</label>
                            </div>


                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="LacticAcidC" name="q" value="Lactic Acid" onChange={handleInputChange} />
                                <label htmlFor="LacticAcidC">Lactic Acid</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="VitaminCC" name="q" value="Vitamin C" onChange={handleInputChange} />
                                <label htmlFor="VitaminCC">Vitamin C</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="KinetinGrowthFactorsC" name="q" value="Kinetin (Growth Factors)" onChange={handleInputChange} />
                                <label htmlFor="KinetinGrowthFactorsC">Kinetin (Growth Factors)</label>
                            </div>



                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="ArbutinC" name="q" value="Arbutin" onChange={handleInputChange} />
                                <label htmlFor="ArbutinC">Arbutin</label>
                            </div>
                            <div className="col-12 col-lg-auto label-wrapper">
                                <div className="empty-option"></div>
                            </div>
                            <div className="col-12 col-lg-auto label-wrapper">
                                <div className="empty-option"></div>
                            </div>
                        </div>
                    </>
                )}
                {checkDataCondition((props.brandJourney != "Clinical Persona"),
                    <>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="GlycolicAcid" name="q" value="Glycolic Acid" onChange={handleInputChange} />
                                <label htmlFor="GlycolicAcid">Glycolic Acid</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="HyaluronicAcid" name="q" value="Hyaluronic Acid" onChange={handleInputChange} />
                                <label htmlFor="HyaluronicAcid">Hyaluronic Acid</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Niacinamide" name="q" value="Niacinamide" onChange={handleInputChange} />
                                <label htmlFor="Niacinamide">Niacinamide</label>
                            </div>


                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Salicylicacid" name="q" value="Salicylic acid" onChange={handleInputChange} />
                                <label htmlFor="Salicylicacid">Salicylic Acid</label>
                            </div>
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Caffeine" name="q" value="Caffeine" onChange={handleInputChange} />
                                <label htmlFor="Caffeine">Caffeine</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Hydroquinone" name="q" value="Hydroquinone" onChange={handleInputChange} />
                                <label htmlFor="Hydroquinone">Hydroquinone</label>
                            </div>





                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Lacticacid" name="q" value="Lactic acid" onChange={handleInputChange} />
                                <label htmlFor="Lacticacid">Lactic Acid</label>
                            </div>
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="BenzoylPeroxide" name="q" value="Benzoyl Peroxide" onChange={handleInputChange} />
                                <label htmlFor="BenzoylPeroxide">Benzoyl Peroxide</label>
                            </div>
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Glycerin" name="q" value="Glycerin" onChange={handleInputChange} />
                                <label htmlFor="Glycerin">Glycerin</label>
                            </div>




                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Peptides" name="q" value="Peptides" onChange={handleInputChange} />
                                <label htmlFor="Peptides">Peptides</label>
                            </div>
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Arbutin" name="q" value="Arbutin" onChange={handleInputChange} />
                                <label htmlFor="Arbutin">Arbutin</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="AHAsBHAsPHAs" name="q" value="AHAs / BHAs / PHAs" onChange={handleInputChange} />
                                <label htmlFor="AHAsBHAsPHAs">AHAs / BHAs / PHAs</label>
                            </div>



                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="VitaminC" name="q" value="Vitamin-C" onChange={handleInputChange} />
                                <label htmlFor="VitaminC">Vitamin-C</label>
                            </div>
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Retinol" name="q" value="Retinol" onChange={handleInputChange} />
                                <label htmlFor="Retinol">Retinol</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Antioxidants" name="q" value="Antioxidants" onChange={handleInputChange} />
                                <label htmlFor="Antioxidants">Antioxidants</label>
                            </div>

                        </div>
                    </>
                )}
            </>
            <div className="row seventh-question justify-content-center">
                <div className="col-12 col-lg-auto">
                    <button onClick={sendBackData} className="button-link" disabled={ingredients == ''}>See Your Results</button>
                </div>
            </div>

            {/* <div className="row question-progress-wrapper last-question-progress d-none d-lg-flex">
                <div className="col-5 offset-4">
                    <ProgressBar 
                        percentage="100"
                        index="7"
                        total="7"
                    />
                </div>
            </div> */}
        </div>
    )
}
export default Q7