import React from 'react'


const Q5 = (props) => {
    function sendBackData(e) {
        props.passChildData('q5', e.target.value, 6);
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
                    <div className="question-header">What is your skin type?</div>
                    <div className="question-text">All skincare products will react differently depending on your skin type. Lorem ipsum dolor sit amet consectetur adipiscing elitp hasellus sodales.</div>
                </div>
            </div>

            <>
                {checkDataCondition((props.brandJourney == "Clinical Persona"),
                    <>
                        <div className="row">
                            <div className="col-12 col-lg-2 offset-lg-4 label-wrapper">
                                <input type="radio" id="DrySkinC" name="q" value="Dry Skin" onChange={sendBackData} />
                                <label htmlFor="DrySkinC">Dry Skin</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="NormalSkinC" name="q" value="Normal Skin" onChange={sendBackData} />
                                <label htmlFor="NormalSkinC">Normal Skin</label>
                            </div>
                     
                            <div className="col-12 col-lg-2 offset-lg-4 label-wrapper">
                                <input type="radio" id="CombinationSkinC" name="q" value="Combination Skin" onChange={sendBackData} />
                                <label htmlFor="CombinationSkinC">Combination Skin</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="OilySkinC" name="q" value="Oily Skin" onChange={sendBackData} />
                                <label htmlFor="OilySkinC">Oily Skin</label>
                            </div>
                        </div>
                    </>
                )}
                {checkDataCondition((props.brandJourney != "Clinical Persona"),
                    <>
                        <div className="row">
                            <div className="col-12 col-lg-2 offset-lg-4 label-wrapper">
                                <input type="radio" id="DrySkin" name="q" value="Dry Skin" onChange={sendBackData} />
                                <label htmlFor="DrySkin">Dry Skin</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="NormalSkin" name="q" value="Normal Skin" onChange={sendBackData} />
                                <label htmlFor="NormalSkin">Normal Skin</label>
                            </div>
                    
                            <div className="col-12 col-lg-2 offset-lg-4 label-wrapper">
                                <input type="radio" id="CombinationSkin" name="q" value="Combination Skin" onChange={sendBackData} />
                                <label htmlFor="CombinationSkin">Combination Skin</label>
                            </div>

                            <div className="col-12 col-lg-2 label-wrapper">
                                <input type="radio" id="OilySkin" name="q" value="Oily Skin" onChange={sendBackData} />
                                <label htmlFor="OilySkin">Oily Skin</label>
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
export default Q5