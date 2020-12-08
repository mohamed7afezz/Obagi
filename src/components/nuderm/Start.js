import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import nudermStyle from "../../assets/scss/components/NuDerm-sign.module.scss"
import Level1 from "./Level1"
import Level2 from "./Level2"
import ThankYou from "./thank-You"
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
                            "nuderm-start",
                            nudermStyle.pagehero,
                        ].join(" ")}
                    >
                        <h1 className={nudermStyle.title}>
                            New to Nu-Derm<sup>®</sup>
                        </h1>
                    </div>
                    {checkDataCondition((level == 1), <Level1 GetLevelNumber={setLevel} />)}
                    {checkDataCondition((level == 2), <Level2 GetLevelNumber={setLevel} />)}
                    {checkDataCondition((level == 3), <ThankYou GetLevelNumber={setLevel} />)}
                </div>
            </div>
        </>
    )
}

export default NudermSignUp