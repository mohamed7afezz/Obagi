import React from 'react'


const Q3 = (props) => {
    function sendBackData(e) {
        props.passChildData('q3', e.target.value, 4);
    }
    function startOver(e) {
        props.passChildData('q2', '', 1);
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
                    <div className="question-header">Are you looking for a preventative solution or corrective solution?</div>
                    <div className="question-text">The difference between the two is important when determining your skincare routine. Lorem ipsum dolor sit amet consectetur adipiscing hasellus .</div>
                </div>
            </div>

            <div className="row first-three">
                <div className="col-12 col-lg-2 offset-lg-4">
                    <input type="radio" id="Preventative" name="q" value="Preventative" onChange={sendBackData} />
                    <label htmlFor="Preventative">Preventative</label>
                </div>

                <div className="col-12 col-lg-2">
                    <input type="radio" id="Corrective" name="q" value="Corrective" onChange={sendBackData} />
                    <label htmlFor="Corrective">Corrective</label>
                </div>
            </div>

            <div className="row d-lg-none">
                <div className="col-12">
                    <button onClick={startOver} className="start-over">Start Over</button>
                </div>
            </div>
        </>
    )
}
export default Q3