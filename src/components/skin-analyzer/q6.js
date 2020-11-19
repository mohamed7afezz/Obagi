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
                                <label htmlFor="TypeIC" id="firstColorC">Type I</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeIIC" name="q" value="Type II" onChange={sendBackData} />
                                <label htmlFor="TypeIIC" id="secondColorC">Type II</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeIIIC" name="q" value="Type III" onChange={sendBackData} />
                                <label htmlFor="TypeIIIC" id="thirdColorC">Type III</label>
                            </div>

                            <div className="col-6 col-lg-2 offset-lg-3">
                                <input type="radio" id="TypeIVC" name="q" value="Type IV" onChange={sendBackData} />
                                <label htmlFor="TypeIVC" id="fourthColorC">Type IV</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeVC" name="q" value="Type V" onChange={sendBackData} />
                                <label htmlFor="TypeVC" id="fifthColorC">Type V</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeVIC" name="q" value="Type VI" onChange={sendBackData} />
                                <label htmlFor="TypeVIC" id="sixthColorC">Type VI</label>
                            </div>
                        </div>
                    </>
                )}
                {checkDataCondition((props.brandJourney != "Clinical Persona"),
                    <>
                        <div className="row sixth-question">
                            <div className="col-6  col-lg-2 offset-lg-3">
                                <input type="radio" id="TypeI" name="q" value="Type I" onChange={sendBackData} />
                                <label htmlFor="TypeI" id="firstColor">Type I</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeII" name="q" value="Type II" onChange={sendBackData} />
                                <label htmlFor="TypeII" id="secondColor">Type II</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeIII" name="q" value="Type III" onChange={sendBackData} />
                                <label htmlFor="TypeIII" id="thirdColor">Type III</label>
                            </div>

                            <div className="col-6 col-lg-2 offset-lg-3">
                                <input type="radio" id="TypeIV" name="q" value="Type IV" onChange={sendBackData} />
                                <label htmlFor="TypeIV" id="fourthColor">Type IV</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeV" name="q" value="Type V" onChange={sendBackData} />
                                <label htmlFor="TypeV" id="fifthColor">Type V</label>
                            </div>

                            <div className="col-6 col-lg-2">
                                <input type="radio" id="TypeVI" name="q" value="Type VI" onChange={sendBackData} />
                                <label htmlFor="TypeVI" id="sixthColor">Type VI</label>
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
                            <div className="skin-type-desc">Skin Color (before sun exposure): ivory
                            Eye Color: light blue, light gray, or light green
                            Natural Hair Color: red or light blonde
                            Sun Reaction: skin always freckles, always burns and peels, and never tans
                            </div>

                            <div className="skin-type-title">Skin Type II</div>
                            <div className="skin-type-desc">Skin Color (before sun exposure): fair or pale
                            Eye Color: blue, gray, or green
                            Natural Hair Color: blonde
                            Sun Reaction: skin usually freckles, burns and peels often, and rarely tans
                            </div>

                            <div className="skin-type-title">Skin Type III</div>
                            <div className="skin-type-desc">Skin Color (before sun exposure): fair to beige, with golden undertones
                            Eye Color: hazel or light brown
                            Natural Hair Color: dark blonde or light brown
                            Sun Reaction: skin might freckle, burns on occasion, and sometimes tans
                            </div>

                            <div className="skin-type-title">Skin Type IV</div>
                            <div className="skin-type-desc">Skin Color (before sun exposure): olive or light brown
                            Eye Color: dark brown
                            Natural Hair Color: dark brown
                            Sun Reaction: doesn’t really freckle, burns rarely, and tans often
                            </div>

                            <div className="skin-type-title">Skin Type V</div>
                            <div className="skin-type-desc">Skin Color (before sun exposure): dark brown
                            Eye Color: dark brown to black
                            Natural Hair Color: dark brown to black
                            Sun Reaction: rarely freckles, almost never burns, and always tans
                            </div>

                            <div className="skin-type-title">Skin Type VI</div>
                            <div className="skin-type-desc">Skin Color (before sun exposure): deeply pigmented dark brown to darkest brown
                            Eye Color: brownish black
                            Natural Hair Color: black
                            Sun Reaction: never freckles, never burns, and always tans darkly
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