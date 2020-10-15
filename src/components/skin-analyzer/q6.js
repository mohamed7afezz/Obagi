import React from 'react'


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
        <>
            <div className="row quiz-header-wrapper">
                <div className="col-1 d-none d-lg-block">
                    <button onClick={startOver} className="start-over">Start Over</button>
                </div>
                <div className="col-12 col-lg-2 offset-lg-4">
                    <div className="quiz-title">Skin Analyzer Quiz</div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-lg-6 offset-lg-3">
                    <div className="question-header">What is your skin tone on the Fitzpatrick Scale?</div>
                    <div className="question-text">The fitzpatrick is a universal scale that allows us to lorem ipsum dolor sit amet consectetur adipiscing elitp hasellus sodales ipsum commodo euismod.</div>
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
        </>
    )
}
export default Q6