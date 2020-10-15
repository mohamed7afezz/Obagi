import React from 'react'
import ProgressBar from '../../components/progress-bar'


const Q4 = (props) => {
    function sendBackData(e) {
        props.passChildData('q4', e.target.value, 5);
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
            <div className="row question-progress-wrapper d-lg-none">
                <div className="col-12">
                    <ProgressBar
                        percentage="57.14285714285714%"
                        index="4"
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
                    <div className="question-header">What area are you most concerned about?</div>
                    <div className="question-text">Tell us your main skin concern so we can make sure we deliver the products with the right effect. Lorem ipsum dolor sit amet consectetur adipiscing.</div>
                </div>
            </div>

            <>
                {checkDataCondition((props.brandJourney == "Clinical Persona"),
                    <>
                        <div className="row">
                            <div className="col-12 col-lg-2 offset-lg-3 label-wrapper">
                                <input type="radio" id="FineLinesAndWrinklesC" name="q" value="Fine Lines And Wrinkles" onChange={sendBackData} />
                                <label htmlFor="FineLinesAndWrinklesC">Fine Lines And Wrinkles</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="SkinDiscolorationC" name="q" value="Skin Discoloration" onChange={sendBackData} />
                                <label htmlFor="SkinDiscolorationC">Skin Discoloration</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="BreakoutsC" name="q" value="Breakouts" onChange={sendBackData} />
                                <label htmlFor="BreakoutsC">Breakouts</label>
                            </div>

                            <div className="col-12 col-lg-2 offset-lg-3 label-wrapper">
                                <input type="radio" id="DehydratedSkinC" name="q" value="Dehydrated Skin" onChange={sendBackData} />
                                <label htmlFor="DehydratedSkinC">Dehydrated Skin</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="RednessProneC" name="q" value="Redness Prone" onChange={sendBackData} />
                                <label htmlFor="RednessProneC">Redness Prone</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="TiredPuffyEyesC" name="q" value="Tired & Puffy Eyes" onChange={sendBackData} />
                                <label htmlFor="TiredPuffyEyesC">Tired & Puffy Eyes</label>
                            </div>

                            <div className="col-12 col-lg-2 offset-lg-3 label-wrapper">
                                <input type="radio" id="SensitiveSkinC" name="q" value="Sensitive Skin" onChange={sendBackData} />
                                <label htmlFor="SensitiveSkinC">Sensitive Skin</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="ElasticitySaggingSkinC" name="q" value="Elasticity & Sagging Skin" onChange={sendBackData} />
                                <label htmlFor="ElasticitySaggingSkinC">Elasticity & Sagging Skin</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="PoresC" name="q" value="Pores" onChange={sendBackData} />
                                <label htmlFor="PoresC">Pores</label>
                            </div>

                            <div className="col-12 col-lg-2 offset-lg-3 label-wrapper">
                                <input type="radio" id="RoughSkinC" name="q" value="Rough Skin" onChange={sendBackData} />
                                <label htmlFor="RoughSkinC">Rough Skin</label>
                            </div>
                        </div>

                    </>
                )}
                {checkDataCondition((props.brandJourney != "Clinical Persona"),
                    <div className="fourth-question">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="FineLinesAndWrinkles" name="q" value="Fine Lines And Wrinkles" onChange={sendBackData} />
                                <label htmlFor="FineLinesAndWrinkles">Fine Lines And Wrinkles</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="SkinDiscoloration" name="q" value="Skin Discoloration" onChange={sendBackData} />
                                <label htmlFor="SkinDiscoloration">Skin Discoloration</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Acne" name="q" value="Acne" onChange={sendBackData} />
                                <label htmlFor="Acne">Acne</label>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="DehydratedSkin" name="q" value="Dehydrated Skin" onChange={sendBackData} />
                                <label htmlFor="DehydratedSkin">Dehydrated Skin</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="RednessProne" name="q" value="Redness Prone" onChange={sendBackData} />
                                <label htmlFor="RednessProne">Redness Prone</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="EyeBagsAndDarkCircles" name="q" value="Eye Bags And Dark Circles" onChange={sendBackData} />
                                <label htmlFor="EyeBagsAndDarkCircles">Eye Bags And Dark Circles</label>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="SensitiveSkin" name="q" value="Sensitive Skin" onChange={sendBackData} />
                                <label htmlFor="SensitiveSkin">Sensitive Skin</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="ElastisitySagging" name="q" value="Elastisity & Sagging" onChange={sendBackData} />
                                <label htmlFor="ElastisitySagging">Elastisity & Sagging</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="HyperpigmentationMelasma" name="q" value="Hyperpigmentation & Melasma" onChange={sendBackData} />
                                <label htmlFor="HyperpigmentationMelasma">Hyperpigmentation & Melasma</label>
                            </div>
                        </div>
                    </div>
                )}
            </>
            <div className="row d-lg-none">
                <div className="col-12">
                    <button onClick={startOver} className="start-over">Start Over</button>
                </div>
            </div>

            <div className="row question-progress-wrapper d-none d-lg-flex">
                <div className="col-auto">
                    <ProgressBar
                        percentage="57.14285714285714%"
                        index="4"
                        total="7"
                    />
                </div>
            </div>
        </div>
    )
}
export default Q4