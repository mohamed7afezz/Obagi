import React from 'react'
import ProgressBar from '../progress-bar';


const Q1 = (props) => {
    function sendBackData(e) {
        props.passChildData('q1', e.target.value, 2);
    }
    return (
        <div className="skinanalyzer-questions-wrapper">
            <div className="row question-progress-wrapper first-question-progress d-lg-none justify-content-center">
                <div className="col-auto">
                    <ProgressBar 
                        percentage = "5px"
                        index = "1"
                        total = "7"
                    />
                </div>
            </div>
            <div className="row first-question">
                <div className="col-12 col-lg-6 offset-lg-3">
                    <div className="quiz-header-wrapper">
                        <div className="quiz-title">Skin Analyzer Quiz</div>
                    </div>
                    <div className="question-header">Let’s start with your age</div>
                    <div className="question-text">By asking your age we can determine lorem ipsum dolor sit amet consectetur adipiscing elitp hasellus sodales ipsum id erat commodo euismod.</div>
                </div>
            </div>
            <div className="row first-three justify-content-center">
                <div className="col-6 col-lg-auto">
                    <input type="radio" id="20" name="q1" value="20s" onChange={sendBackData} />
                    <label htmlFor="20">20’s</label>
                </div>
                <div className="col-6 col-lg-auto">
                    <input type="radio" id="30" name="q1" value="30s" onChange={sendBackData} />
                    <label htmlFor="30">30’s</label>
                </div>
                <div className="col-6 col-lg-auto">
                    <input type="radio" id="40" name="q1" value="40s" onChange={sendBackData} />
                    <label htmlFor="40">40’s</label>
                </div>
                <div className="col-6 col-lg-auto">
                    <input type="radio" id="50" name="q1" value="50+" onChange={sendBackData} />
                    <label htmlFor="40">50+</label>
                </div>
            </div>
            <div className="row question-progress-wrapper first-question-progress d-none d-lg-flex">
                <div className="col-auto">
                    <ProgressBar 
                        percentage = "5px"
                        index = "1"
                        total = "7"
                    />
                </div>
            </div>
        </div>
    )
}
export default Q1