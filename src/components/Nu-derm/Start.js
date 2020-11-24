import React, { useState } from 'react'
const NudermSignUp = () => {
    const [level, setLevel] = useState(1);
    function checkDataCondition(condition, data) {
        if (condition) {
            return data;
        } else {
            return '';
        }
    }
    return (
        <>
            <div className="analyzer-intro">
                {checkDataCondition((step == 0), <Intro passChildData={setStep} />)}
            </div>
        </>
    )
}

export default NudermSignUp