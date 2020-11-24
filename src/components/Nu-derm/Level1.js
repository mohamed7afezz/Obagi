import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import nudermStyle from "../../assets/scss/components/NuDerm-sign.module.scss"
import { CustomSelect } from '../../assets/js/custom-select'
const Level1 = props => {
  const [level, setLevel] = useState(1)
  function SetLevelNumber() {
    props.GetLevelNumber(2)
  }
  useEffect(() => {
    if (document.querySelectorAll('.custom-select .select-selected ').length < 1) {
      CustomSelect();
    }
  })
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
          <div
            className={[
              "col-lg-6",
              "col-12",
              "offset-lg-3",
              nudermStyle.secondSec,
            ].join(" ")}
          >
            <h3 className={nudermStyle.subtitle}>
              Stay on Track for Beautiful, Healthy-Looking Skin
            </h3>
            <p className={nudermStyle.desc}>
              Are you new to the Nu-Derm<sup>®</sup> System and excited to start
              your transformation? Join the New to Nu-Derm<sup>®</sup> Program
              and partner with us on your journey to beautiful, healthy-looking
              skin. By signing up below, you’ll receive timely information,
              inspiration, and encouragement every step of the way to help
              maximize results.
            </p>
          </div>

          <form>
            <div className={[nudermStyle.formContainer, "offset-lg-3", "col-12", "col-lg-4"].join(" ")}>
              <p className={nudermStyle.reqField}>*All fields required</p>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="I am a resident of the U.S."
                  required
                  type="radio"
                />
                <span class="radiomark"></span>I am a resident of the U.S.
              </label>
              <p className={nudermStyle.underselect}>
                This program is currently available only to U.S. residents.
               If you would like to receive updates on when it may become available in your country, <Link to="/careers">contact us.</Link>
              </p>
              <div className="group-wrapper">
                <div className="form-group select-group mb-0">

                  <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                    <label for="state" className={["form-label", nudermStyle.customlabel].join(" ")}>*STATE</label>
                    <select className="form-control" id="state">
                      <option value="">- None -</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AS">American Samoa</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="AE">Armed Forces (Canada, Europe, Africa, or Middle East)</option>
                      <option value="AA">Armed Forces Americas</option>
                      <option value="AP">Armed Forces Pacific</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District of Columbia</option>
                      <option value="FM">Federated States of Micronesia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="GU">Guam</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="MP">Northern Mariana Islands</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PW">Palau</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VI">Virgin Islands</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                      <option value="AB">Alberta</option>
                      <option value="BC">British Columbia</option>
                      <option value="MB">Manitoba</option>
                      <option value="NB">New Brunswick</option>
                      <option value="NL">Newfoundland and Labrador</option>
                      <option value="NS">Nova Scotia</option>
                      <option value="NT">Northwest Territories</option>
                      <option value="NU">Nunavut</option>
                      <option value="ON">Ontario</option>
                      <option value="PE">Prince Edward Island</option>
                      <option value="QC">Quebec</option>
                      <option value="SK">Saskatchewan</option>
                      <option value="YT">Yukon</option>
                    </select>
                  </div>
                </div>


              </div>
              <p className={nudermStyle.brief}>Due to state regulations, prescription drug products,
               including the Obagi Nu-Derm<sup>™</sup> System, generally
              may not be sold in physicians’ offices in the following states:
               MA, MT, NH, NY, and TX. For an effective, cosmetic skin-brightening option, the Obagi Nu-Derm Fx<sup>™</sup>
               System is available for residents in these 5
              states. While the New to Nu-Derm® Program is specifically designed for the Obagi Nu-Derm™ System,
               Obagi Nu-Derm Fx<sup>™</sup> System users may also benefit from the program and receive valuable information
            and helpful tips as well.</p>
              <div className={nudermStyle.inputfield}>
                <label>*EMAIL</label>
                <input name="email" type="email" />
              </div>
              <div className={nudermStyle.inputfield}>
                <label>*FIRST NAME</label>
                <input name="email" type="text" />
              </div>
              <div className={nudermStyle.inputfield}>
                <label>*LAST NAME</label>
                <input name="email" type="text" />
              </div>
              <p className={nudermStyle.calenderName}>Date You Will Start or Started Using the Nu-Derm System *</p>
              <div className={[nudermStyle.showflex, "showflex"].join(" ")}>
                <div className="group-wrapper">
                  <div className="form-group select-group mb-0">

                    <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                      <label for="monthCustom" className={["form-label", nudermStyle.customlabel].join(" ")}>MONTH</label>
                      <select className="form-control" id="monthCustom">
                        <option value="">- None -</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AS">American Samoa</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="AE">Armed Forces (Canada, Europe, Africa, or Middle East)</option>
                        <option value="AA">Armed Forces Americas</option>
                        <option value="AP">Armed Forces Pacific</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="group-wrapper">
                  <div className="form-group select-group mb-0">

                    <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                      <label for="dayCustom" className={["form-label", nudermStyle.customlabel].join(" ")}>DAY</label>
                      <select className="form-control" id="dayCustom">
                        <option value="">- None -</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AS">American Samoa</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="AE">Armed Forces (Canada, Europe, Africa, or Middle East)</option>
                        <option value="AA">Armed Forces Americas</option>
                        <option value="AP">Armed Forces Pacific</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="group-wrapper">
                  <div className="form-group select-group mb-0">

                    <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                      <label for="yearCustom" className={["form-label", nudermStyle.customlabel].join(" ")}>YEAR</label>
                      <select className="form-control" id="yearCustom">
                        <option value="">- None -</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AS">American Samoa</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="AE">Armed Forces (Canada, Europe, Africa, or Middle East)</option>
                        <option value="AA">Armed Forces Americas</option>
                        <option value="AP">Armed Forces Pacific</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <p className={nudermStyle.optional}>Optional Questions to Help us Better Serve You</p>
              <div className={["group-wrapper", nudermStyle.optionalWrap].join(" ")}>
                <div className="form-group select-group mb-0">

                  <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                    <label for="AgeRange" className={["form-label", nudermStyle.customlabel].join(" ")}>Age Range</label>
                    <select className="form-control" id="AgeRange">
                      <option value="">- None -</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AS">American Samoa</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="AE">Armed Forces (Canada, Europe, Africa, or Middle East)</option>
                      <option value="AA">Armed Forces Americas</option>
                      <option value="AP">Armed Forces Pacific</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={["group-wrapper", nudermStyle.optionalWrap].join(" ")}>
                <div className="form-group select-group mb-0">

                  <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                    <label for="PrimarySkinConcern" className={["form-label", nudermStyle.customlabel].join(" ")}>Primary Skin Concern</label>
                    <select className="form-control" id="PrimarySkinConcern">
                      <option value="">- None -</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AS">American Samoa</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="AE">Armed Forces (Canada, Europe, Africa, or Middle East)</option>
                      <option value="AA">Armed Forces Americas</option>
                      <option value="AP">Armed Forces Pacific</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={["group-wrapper", nudermStyle.optionalWrap].join(" ")}>
                <div className="form-group select-group mb-0">

                  <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                    <label for="GenderCustom" className={["form-label", nudermStyle.customlabel].join(" ")}>Gender</label>
                    <select className="form-control" id="GenderCustom">
                      <option value="">- None -</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AS">American Samoa</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="AE">Armed Forces (Canada, Europe, Africa, or Middle East)</option>
                      <option value="AA">Armed Forces Americas</option>
                      <option value="AP">Armed Forces Pacific</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={[nudermStyle.inputfield, "mt-24"].join(" ")}>
                <label>Your Skin Care Physician's Name</label>
                <input name="fName" type="text" />
              </div>
              <div className={[nudermStyle.inputfield, nudermStyle.mt24].join(" ")}>
                <label>Physician's Affiliated Practice Name</label>
                <input name="email" type="text" />
              </div>
              <p className={nudermStyle.formnNote}>By submitting your physician’s information,
              you are consenting to allow Obagi Medical to send your information to your physician and notify him/her of your enrollment.
             </p> </div>
            <div className={"col-12 col-lg-6 offset-lg-3"}>
              <label className="terms footnote" >
                Yes, I want to receive emails to keep up with the latest products, skin care trends, and offers from Obagi.
                By registering, your information will be collected and used in the U.S. subject to our U.S.
                Privacy Policy and Terms of Use. For U.S. consumers only.
                <input type="checkbox" defaultChecked={true} required name="yes_i_want_to_receive_emails_to_keep_up_with_the_latest_products" />
                <span className="checkmark"></span>
              </label>
           </div>
           <div className={" col-12 col-lg-2 offset-lg-3"}>
              <button className={nudermStyle.signup} >
                Sign Up
              
              </button>
            </div>
            <div className={" col-12 col-lg-6 offset-lg-3"}>
              <p className={nudermStyle.ffootnote} >
              By submitting your information, you confirm you have read and agree with the terms of our Privacy Policy and Legal Notice.
              
              </p>
              <p className={nudermStyle.ffootnote}>             Obagi will never sell, rent, or share your personal information with any third parties for marketing purposes without your express permission. View full Privacy Policy.
</p>
            </div>
        
          </form>

        </div>
      </div>
    </>
  )
}

export default Level1
