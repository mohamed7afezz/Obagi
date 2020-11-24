import React, { useState } from 'react'
import Level1 from "../nu-derm/Level1"
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
                {checkDataCondition((level == 1), <Level1 GetLevelNumber={setLevel} />)}
            </div>
        </>
    )
}

export default NudermSignUp