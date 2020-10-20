import React from 'react'
import ProgressBar from '../../components/progress-bar'

const Q3 = (props) => {
    function sendBackData(e) {
        props.passChildData('q3', e.target.value, 4);
    }
    function startOver(e) {
        props.passChildData('q2', '', 1);
    }
    return (
        <div className="skinanalyzer-questions-wrapper">
            <div className="row question-progress-wrapper d-lg-none">
                <div className="col-12">
                    <ProgressBar
                        percentage="42.85714285714286%"
                        index="3"
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
                    <div className="question-header">Are you looking for a preventative solution or corrective solution?</div>
                    <div className="question-text">The difference between the two is important when determining your Skin care routine. Lorem ipsum dolor sit amet consectetur adipiscing hasellus .</div>
                </div>
            </div>

            <div className="row first-three justify-content-center">
                <div className="col-12 col-lg-auto">
                    <input type="radio" id="Preventative" name="q" value="Preventative" onChange={sendBackData} />
                    <label htmlFor="Preventative">Preventative</label>
                </div>

                <div className="col-12 col-lg-auto">
                    <input type="radio" id="Corrective" name="q" value="Corrective" onChange={sendBackData} />
                    <label htmlFor="Corrective">Corrective</label>
                </div>
            </div>

            <div className="row d-lg-none">
                <div className="col-12">
                    <button onClick={startOver} className="start-over">Start Over</button>
                </div>
            </div>

            <div className="row question-progress-wrapper d-none d-lg-flex">
                <div className="col-auto">
                    <ProgressBar 
                        percentage="42.85714285714286%"
                        index="3"
                        total="7"
                    />
                </div>
            </div>
        </div>
    )
}
export default Q3