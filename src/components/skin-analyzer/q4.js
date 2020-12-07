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
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      } 
    return (
        <div className="skinanalyzer-questions-wrapper">
            <div className="row question-progress-wrapper d-lg-none justify-content-center">
                <div className="col-auto">
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
                    <div className="question-header">What Areas Are You Most Concerned About?</div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-auto">
                <div className="question-text">Your skin concern is our concern, too. What’s the number one skin concern that you are looking to address?</div>

                </div>
                </div>

            <>
                {checkDataCondition((props.brandJourney == "Clinical Persona"),
                    <>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="FineLinesAndWrinklesC" name="q" value="Fine Lines And Wrinkles" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="FineLinesAndWrinklesC">Fine Lines and Wrinkles</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="SkinDiscolorationC" name="q" value="Skin Discoloration" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="SkinDiscolorationC">Skin Discoloration</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="BreakoutsC" name="q" value="Breakouts" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="BreakoutsC">Breakouts</label>
                            </div>
                            </div>
                            <div className="row justify-content-center">

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="DehydratedSkinC" name="q" value="Dehydrated Skin" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="DehydratedSkinC">Dehydrated Skin</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="RednessProneC" name="q" value="Redness Prone" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="RednessProneC">Redness Prone</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="TiredPuffyEyesC" name="q" value="Tired & Puffy Eyes" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TiredPuffyEyesC">Tired and Puffy Eyes</label>
                            </div>
                            </div>
                            <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="SensitiveSkinC" name="q" value="Sensitive Skin" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="SensitiveSkinC">Sensitive Skin</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="ElasticitySaggingSkinC" name="q" value="Elasticity & Sagging Skin" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="ElasticitySaggingSkinC">Elasticity and Sagging Skin</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="PoresC" name="q" value="Pores" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="PoresC">Pores</label>
                            </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-auto label-wrapper">
                                    <input type="radio" id="RoughSkinC" name="q" value="Rough Skin" onChange={sendBackData} />
                                    <label onClick={topFunction}  htmlFor="RoughSkinC">Rough Skin</label>
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
                    <div className="fourth-question">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="FineLinesAndWrinkles" name="q" value="Fine Lines And Wrinkles" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="FineLinesAndWrinkles">Fine Lines and Wrinkles</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="SkinDiscoloration" name="q" value="Skin Discoloration" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="SkinDiscoloration">Skin Discoloration</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="Acne" name="q" value="Acne" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="Acne">Acne</label>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="DehydratedSkin" name="q" value="Dehydrated Skin" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="DehydratedSkin">Dehydrated Skin</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="RednessProne" name="q" value="Redness Prone" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="RednessProne">Redness Prone</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="EyeBagsAndDarkCircles" name="q" value="Eye Bags And Dark Circles" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="EyeBagsAndDarkCircles">Eye Bags and Dark Circles</label>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="SensitiveSkin" name="q" value="Sensitive Skin" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="SensitiveSkin">Sensitive Skin</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="ElastisitySagging" name="q" value="Elastisity & Sagging" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="ElastisitySagging">Elasticity and Sagging</label>
                            </div>

                            <div className="col-12 col-lg-auto label-wrapper">
                                <input type="radio" id="HyperpigmentationMelasma" name="q" value="Hyperpigmentation & Melasma" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="HyperpigmentationMelasma">Hyperpigmentation and Melasma</label>
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