import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import nudermStyle from "../../assets/scss/components/NuDerm-sign.module.scss"
const Level2 = () => {
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
           <div className={["col-12","offset-lg-3","col-lg-6","mt-24"].join(" ")}>
               <h1 className={nudermStyle.thankYou}>
               Thank You for Signing Up!
               </h1>
               <p className={[nudermStyle.servayDesc,"mb-40"].join(" ")}>Based on the start date you indicated, it looks like you’ve already completed the Nu-Derm System.
                    Because the New to Nu-Derm Program was designed to guide new Nu-Derm users,
                     you’ll receive the complete set of 14 emails over the course of 18 weeks as if you were new to Nu-Derm.
                    If you would prefer not to receive these emails, simply click below to opt out.
                    </p>
                <p className={nudermStyle.servayDesc}>      In the meantime, we’d love to get your feedback on the type of information you’d like to see and how we can build a program that can better meet the needs and expectations of experienced users like you. Please answer the 5 brief questions below; the survey should only take 2-3 minutes of your time.</p>
           </div>
           <form className={[nudermStyle.Servayform].join(" ")}>
               <div className={["offset-lg-3","col-12","col-lg-6",nudermStyle.QuestionContainer].join(" ")}>
            <p className={nudermStyle.Qtitle}>
            1. Please select the primary reason you signed up for the New to Nu-Derm<sup>®</sup> Program.
            </p>
            <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I wanted to see if I used Nu-Derm correctly."
                  required
                  type="radio"
                  name="reason"
                />
                <span class="radiomark"></span>I wanted to see if I used Nu-Derm correctly.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I wanted to learn how to maintain and optimize results."
                  required
                  type="radio"
                  name="reason"
                />
                <span class="radiomark"></span>I wanted to learn how to maintain and optimize results.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I’m considering using the Nu-Derm System again in the future."
                  required
                  type="radio"
                  name="reason"
                />
                <span class="radiomark"></span>I’m considering using the Nu-Derm System again in the future.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I was looking for exclusive offers or rebate opportunities."
                  required
                  type="radio"
                  name="reason"
                />
                <span class="radiomark"></span>I was looking for exclusive offers or rebate opportunities.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I didn’t know it was designed for those just starting the Nu-Derm System."
                  required
                  type="radio"
                  name="reason"
                />
                <span class="radiomark"></span>I didn’t know it was designed for those just starting the Nu-Derm System.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I didn’t know it was designed for those just starting the Nu-Derm System."
                  required
                  type="radio"
                  name="reason"
                />
                <span class="radiomark"></span>
                <div className={nudermStyle.inputfield}>
                <label>Other</label>
                <input className="otherInput" name="Other" type="text" />
              </div>
                </label>
               </div>
               <div className={["offset-lg-3","col-12","col-lg-6",nudermStyle.QuestionContainer].join(" ")}>
            <p className={nudermStyle.Qtitle}>
            2. Please rank the following topics you would be interested in learning about in order of most interested (1) to least interested (5).            </p>
            <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I wanted to see if I used Nu-Derm correctly."
                  required
                  type="checkbox"
                  name="reason"
                />
                <span class="checkmark"></span>I wanted to see if I used Nu-Derm correctly.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I wanted to learn how to maintain and optimize results."
                  required
                  type="checkbox"
                  name="reason"
                />
                <span class="checkmark"></span>I wanted to learn how to maintain and optimize results.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I’m considering using the Nu-Derm System again in the future."
                  required
                  type="checkbox"
                  name="reason"
                />
                <span class="checkmark"></span>I’m considering using the Nu-Derm System again in the future.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I was looking for exclusive offers or rebate opportunities."
                  required
                  type="checkbox"
                  name="reason"
                />
                <span class="checkmark"></span>I was looking for exclusive offers or rebate opportunities.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I didn’t know it was designed for those just starting the Nu-Derm System."
                  required
                  type="checkbox"
                  name="reason"
                />
                <span class="checkmark"></span>I didn’t know it was designed for those just starting the Nu-Derm System.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I didn’t know it was designed for those just starting the Nu-Derm System."
                  required
                  type="radio"
                  name="reason"
                />
                <span class="checkmark"></span>
                <div className={nudermStyle.inputfield}>
                <label>Other</label>
                <input className="otherInput" name="Other" type="text" />
              </div>
                </label>
               
            </div>
           </form>
        </>
    )
}

export default Level2