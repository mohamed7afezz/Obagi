import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import nudermStyle from "../../assets/scss/components/NuDerm-sign.module.scss"
import Level1 from "../nu-derm/Level1"
import Level2 from "../nu-derm/Level2"
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
            <div className="container-fluid">
                <div className="row">
                    <div
                        className={[
                            "col-lg-10",
                            "col-12",
                            "offset-lg-1",
                            nudermStyle.pagehero,
                        ].join(" ")}
                    >
                        <h1 className={nudermStyle.title}>
                            New to Nu-Derm<sup>®</sup>
                        </h1>
                    </div>
                    {checkDataCondition((level == 1), <Level1 GetLevelNumber={setLevel} />)}
                    {checkDataCondition((level == 2), <Level2 GetLevelNumber={setLevel} />)}
                </div>
            </div>
        </>
    )
}

export default NudermSignUp