import React, { useState } from 'react'
import Intro from './intro'
import Q1 from './q1';
import Q2 from './q2';
import Q3 from './q3';
import Q4 from './q4';
import Q5 from './q5';
import Q6 from './q6';
import Q7 from './q7';
import Resulte from './resulte';
import { getBrandJourney } from './brandJourney';
const questionsResult = {};
const SkinAnalyzerMain = () => {
    const [step, setStep] = useState(0);
    function checkDataCondition(condition, data) {
        if (condition) {
            return data;
        } else {
            return '';
        }
    }
    function changeQuestion(qName, qValue, setpValue) {
        questionsResult[qName] = qValue;
        setStep(setpValue);
    }
    return (
        <div className="skinanalyzer">
            <div className="analyzer-intro">
                {checkDataCondition((step == 0), <Intro passChildData={setStep} />)}
            </div>

            <div className="analyzer-questions">
                <div className="container-fluid">
                        {checkDataCondition((step == 1), <Q1 passChildData={changeQuestion} />)}
                        {checkDataCondition((step == 2), <Q2 passChildData={changeQuestion} />)}
                        {checkDataCondition((step == 3), <Q3 passChildData={changeQuestion} />)}
                        {checkDataCondition((step == 4), <Q4 passChildData={changeQuestion} brandJourney={getBrandJourney(questionsResult)} />)}
                        {checkDataCondition((step == 5), <Q5 passChildData={changeQuestion} brandJourney={getBrandJourney(questionsResult)} />)}
                        {checkDataCondition((step == 6), <Q6 passChildData={changeQuestion} brandJourney={getBrandJourney(questionsResult)} />)}
                        {checkDataCondition((step == 7), <Q7 passChildData={changeQuestion} brandJourney={getBrandJourney(questionsResult)} />)}
                </div>
            </div>

            <div className="analyzer-result">
                {checkDataCondition((step == 8), <Resulte passChildData={changeQuestion} questionsResult={questionsResult} brandJourney={getBrandJourney(questionsResult)} />)}
            </div>
        </div>
    )
}


export default SkinAnalyzerMain
