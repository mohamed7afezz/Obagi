import { Link } from 'gatsby';
import React from 'react'
import ProgressBar from '../../components/progress-bar'

const Q2 = (props) => {
    function sendBackData(e) {
        props.passChildData('q2', e.target.value, 3);
    }
    function startOver(e) {
        props.passChildData('q2', '', 1);
    }
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      } 
    return (
        <>
        {<div className={["white-color Analyzer-padding breadcramp-con", "col-12"].join(" ")}>
              <p className="breadcramp">
                <Link to="/">Home</Link>{" "}
               / <span>Skin Analyzer</span>
                    </p>
            
              </div>}
        <div className="skinanalyzer-questions-wrapper">
            <div className="row question-progress-wrapper d-lg-none justify-content-center">
                <div className="col-auto">
                    <ProgressBar
                        percentage="28.57142857142857%"
                        index="2"
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
            <div className="row justify-content-center">
                <div className="col-12 col-lg-auto ">
                    <div className="question-header">Do You See a Skin Care Expert Regularly or Would You Be Willing to Go See One?</div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6 offset-lg-3 p-lg-0">
                <div className="question-text">Obagi has been backed by physicians for over 30 years. To inquire about specific skin care needs, we always recommend you speak with an Obagi skin care professional before starting a new regimen.</div>

                </div>
                </div>

            <di className="row first-three justify-content-center">
                <div className="col-12 col-lg-auto">
                    <input type="radio" id="Yes" name="q2" value="Yes" onChange={sendBackData} />
                    <label onClick={topFunction}  htmlFor="Yes">Yes</label>
                </div>
                <div className="col-12 col-lg-auto">
                    <input type="radio" id="No" name="q2" value="No" onChange={sendBackData} />
                    <label onClick={topFunction}  htmlFor="No">No</label>
                </div>
            </di>
            <div className="row d-lg-none">
                <div className="col-12">
                    <button onClick={startOver} className="start-over">Start Over</button>
                </div>
            </div>

            <div className="row question-progress-wrapper d-none d-lg-flex">
                <div className="col-auto">
                    <ProgressBar 
                        percentage="28.57142857142857%"
                        index="2"
                        total="7"
                    />
                </div>
            </div>
        </div>
        </>
    )
}
export default Q2