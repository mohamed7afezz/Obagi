import React from 'react'
import ProgressBar from '../../components/progress-bar'



const Q6 = (props) => {
    function sendBackData(e) {
        props.passChildData('q6', e.target.value, 7);
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
        <div className="skinanalyzer-questions-wrapper sixth-question-wrapper">
            <div className="row question-progress-wrapper d-lg-none justify-content-center">
                <div className="col-auto">
                    <ProgressBar
                        percentage="85.71428571428571%"
                        index="6"
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
                    <div className="question-header">
                        What Is Your Skin Tone on the Fitzspatrick Scale?
                        <button type="button" className="analyzer-info-button" data-toggle="modal" data-target="#infoModal">
                            &#8520;
                        </button>
                    </div>
                    <div className="question-text">The Fitzpatrick Skin Tone Scale classifies skin by pigmentation and reaction to sun exposure. Type I skin generally burns; Type VI skin rarely burns.</div>
                </div>
            </div>

            <>
                {checkDataCondition((props.brandJourney == "Clinical Persona"),
                    <>
                        <div className="row sixth-question">
                            <div className="col-6 col-lg-2 offset-lg-3">
                                <input type="radio" id="TypeIC" name="q" value="Type I" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeIC" id="firstColorC">Type I</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeIIC" name="q" value="Type II" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeIIC" id="secondColorC">Type II</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeIIIC" name="q" value="Type III" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeIIIC" id="thirdColorC">Type III</label>
                            </div>

                            <div className="col-6 col-lg-2 offset-lg-3">
                                <input type="radio" id="TypeIVC" name="q" value="Type IV" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeIVC" id="fourthColorC">Type IV</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeVC" name="q" value="Type V" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeVC" id="fifthColorC">Type V</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeVIC" name="q" value="Type VI" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeVIC" id="sixthColorC">Type VI</label>
                            </div>
                        </div>
                    </>
                )}
                {checkDataCondition((props.brandJourney != "Clinical Persona"),
                    <>
                        <div className="row sixth-question">
                            <div className="col-6  col-lg-2 offset-lg-3">
                                <input type="radio" id="TypeI" name="q" value="Type I" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeI" id="firstColor">Type I</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeII" name="q" value="Type II" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeII" id="secondColor">Type II</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeIII" name="q" value="Type III" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeIII" id="thirdColor">Type III</label>
                            </div>

                            <div className="col-6 col-lg-2 offset-lg-3">
                                <input type="radio" id="TypeIV" name="q" value="Type IV" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeIV" id="fourthColor">Type IV</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeV" name="q" value="Type V" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeV" id="fifthColor">Type V</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeVI" name="q" value="Type VI" onChange={sendBackData} />
                                <label onClick={topFunction}  htmlFor="TypeVI" id="sixthColor">Type VI</label>
                            </div>
                        </div>
                    </>
                )}
            </>

            <div className="row d-lg-none">
                <div className="col-12">
                    <button onClick={startOver} className="start-over">Start Over</button>
                </div>
            </div>

            <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title" id="infoModalLabel">Fitzpatrick Scale</div>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="skin-type-title">Skin Type I</div>
                            <div className="skin-type-desc">
                                <p>Skin Color (before sun exposure): ivory</p>
                                <p>Eye Color: light blue, light gray, or light green</p>
                                <p>Natural Hair Color: red or light blonde</p>
                                <p>Sun Reaction: skin always freckles, always burns and peels, and never tans</p>
                            </div>

                            <div className="skin-type-title">Skin Type II</div>
                            <div className="skin-type-desc">
                                <p>Skin Color (before sun exposure): fair or pale</p>
                                <p>Eye Color: blue, gray, or green</p>
                                <p>Natural Hair Color: blonde</p>
                                <p>Sun Reaction: skin usually freckles, burns and peels often, and rarely tans</p>
                            </div>

                            <div className="skin-type-title">Skin Type III</div>
                            <div className="skin-type-desc">
                                <p>Skin Color (before sun exposure): fair to beige, with golden undertones</p>
                                <p>Eye Color: hazel or light brown</p>
                                <p>Natural Hair Color: dark blonde or light brown</p>
                                <p>Sun Reaction: skin might freckle, burns on occasion, and sometimes tans</p>
                            </div>

                            <div className="skin-type-title">Skin Type IV</div>
                            <div className="skin-type-desc">
                                <p>Skin Color (before sun exposure): olive or light brown</p>
                                <p>Eye Color: dark brown</p>
                                <p>Natural Hair Color: dark brown</p>
                                <p>Sun Reaction: doesn’t really freckle, burns rarely, and tans often</p>
                            </div>

                            <div className="skin-type-title">Skin Type V</div>
                            <div className="skin-type-desc">
                                <p>Skin Color (before sun exposure): dark brown</p>
                                <p>Eye Color: dark brown to black</p>
                                <p>Natural Hair Color: dark brown to black</p>
                                <p>Sun Reaction: rarely freckles, almost never burns, and always tans</p>
                            </div>

                            <div className="skin-type-title">Skin Type VI</div>
                            <div className="skin-type-desc">
                                <p>Skin Color (before sun exposure): deeply pigmented dark brown to darkest brown</p>
                                <p>Eye Color: brownish black</p>
                                <p>Natural Hair Color: black</p>
                                <p>Sun Reaction: never freckles, never burns, and always tans darkly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row question-progress-wrapper d-none d-lg-flex">
                <div className="col-auto">
                    <ProgressBar
                        percentage="85.71428571428571%"
                        index="6"
                        total="7"
                    />
                </div>
            </div>
        </div>
    )
}
export default Q6