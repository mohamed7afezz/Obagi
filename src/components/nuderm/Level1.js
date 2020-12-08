import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import nudermStyle from "../../assets/scss/components/NuDerm-sign.module.scss"
import { CustomSelect } from '../../assets/js/custom-select'
const Level1 = props => {
  const baseUrl = process.env.Base_URL;
  const [level, setLevel] = useState(1)
  // function SetLevelNumber() {
  //   props.GetLevelNumber(2)
  // }
  useEffect(() => {
    if (document.querySelectorAll('.custom-select .select-selected ').length < 1) {
      CustomSelect();
    }
  })
  function removevaild(e) {
    let item = e.target

    item.parentElement.classList.remove('error')

    let i = document.querySelectorAll(`input[name=${item.getAttribute('name')}]`)

    for (let j = 0; j < i.length; j++) {

        i[j].parentElement.classList.remove('error')
    }
    if (item.classList.contains('error-msg')) {
        item.classList.add('hide')
    } else
        if (item.classList.contains('error')) {
            item.classList.remove('error');

        } else if (item.nextSibling != null && !item.nextSibling.classList.contains('radiomark')) {

            item.nextSibling.classList.add('hide')


        }



}

  function submitforming(e) {
    var obj = { webform_id: "prc_new_to_nu_derm" };
    var list = document.querySelectorAll('.needs-validations input:invalid');
    if (list.length > 0) {
        for (var item of list) {
            item.parentElement.classList.add('error')
            // item.nextSibling.classList.remove('hide')
        }
    } else {
        let list2 = document.querySelectorAll('.needs-validations input');
        for (let item of list2) {
          if (item.getAttribute("name") !="yes_agreement") {
            obj[item.getAttribute("name")] = item.value;
          }
          
        }
        let listSelect = document.querySelectorAll('.needs-validations select');
        for (let item1 of listSelect) {
       let i ="";
       i=item1.getAttribute("name");
     
          if (i != "month" && i != "day" && i != "year") {
            obj[item1.getAttribute("name")] = item1.value;
          }  
      }
      let getDate=`${document.querySelector('select[name="month"]').value}/${document.querySelector('select[name="day"]').value}/${document.querySelector('select[name="year"]').value}`
      obj['date']=getDate;
      obj["yes_agreement"] =["recieve_email"]
        // obj['description'] = `${document.querySelector("#contactDesc").value}`
        // obj[document.querySelector('.needs-validations select').getAttribute("name")] = `${document.querySelector('.needs-validations select').value}`
        sendFormValues({ obj })
    }
}
  const sendFormValues = (updatedItemData) => {
    fetch(
        `${baseUrl}webform_rest/submit`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(updatedItemData.obj)
        }
    )
        .then(res => res.json())
        .then(response => {
         if (response["sid"]) {
          var d = new Date();
          var otherDate = new Date(document.querySelector('select[name="year"]').value,document.querySelector('select[name="month"]').value - 1,document.querySelector('select[name="day"]').value);
          var bool = (otherDate.getTime() >= d.getTime());
         if (bool === true) {
          props.GetLevelNumber(3)
         }else{
          props.GetLevelNumber(2)
         }
          
          topFunction()
         }
        })
        .catch(error => {
            // console.log('error', error)
        });
};
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 
  return (
    <>
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
              Are you new to the Nu-Derm System and excited to start
              your transformation? Join the New to Nu-Derm Program
              and partner with us on your journey to beautiful, healthy-looking
              skin. By signing up below, you’ll receive timely information,
              inspiration, and encouragement every step of the way to help
              maximize results.
            </p>
          </div>

          <form class="needs-validations" onSubmit={(e) => { e.preventDefault(); }}>
            <div className={[nudermStyle.formContainer, "offset-lg-3", "col-12", "col-lg-4"].join(" ")}>
              <p className={nudermStyle.reqField}>*All fields required</p>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="residen_of_the_U.S"
                  required
                  type="radio"
                  onChange={removevaild}
                  name="resident_of_the_u_s_"
                />
                <span class="radiomark"></span>I am a resident of the U.S.
              </label>
              <p className={nudermStyle.underselect}>
                This program is currently available only to U.S. residents.
               If you would like to receive updates on when it may become available in your country, <Link to="/customer-care/contact-us">contact us.</Link>
              </p>
              <div className="group-wrapper">
                <div className="form-group select-group mb-0">

                  <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                    <label for="state" className={["form-label", nudermStyle.customlabel].join(" ")}>*STATE</label>
                    <select name="state" className="form-control" id="state">
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
              states. While the New to Nu-Derm Program is specifically designed for the Obagi Nu-Derm System,
               Obagi Nu-Derm Fx System users may also benefit from the program and receive valuable information
            and helpful tips as well.</p>
              <div className={nudermStyle.inputfield}>
                <label>*EMAIL</label>
                <input required name="email" type="email"  onChange={removevaild}/>
              </div>
              <div className={nudermStyle.inputfield}>
                <label>*FIRST NAME</label>
                <input required name="first_name" type="text" onChange={removevaild}/>
              </div>
              <div className={nudermStyle.inputfield}>
                <label>*LAST NAME</label>
                <input required name="last_name" type="text" onChange={removevaild}/>
              </div>
              <p className={nudermStyle.calenderName}>Date You Will Start or Started Using the Nu-Derm System *</p>
              <div className={[nudermStyle.showflex, "showflex"].join(" ")}>
                <div className="group-wrapper">
                  <div className="form-group select-group mb-0">

                    <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                      <label for="monthCustom" className={["form-label", nudermStyle.customlabel].join(" ")}>MONTH</label>
                      <select name="month" className="form-control" id="monthCustom">
                        <option value="">Month</option><option value="1" >Jan</option><option value="2">Feb</option><option value="3">Mar</option><option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option><option value="7">Jul</option><option value="8">Aug</option><option value="9">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="group-wrapper">
                  <div className="form-group select-group mb-0">

                    <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                      <label for="dayCustom" className={["form-label", nudermStyle.customlabel].join(" ")}>DAY</label>
                      <select name="day" className="form-control" id="dayCustom">
                      <option value="">Day</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="group-wrapper">
                  <div className="form-group select-group mb-0">

                    <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                      <label for="yearCustom" className={["form-label", nudermStyle.customlabel].join(" ")}>YEAR</label>
                      <select name="year" className="form-control" id="yearCustom">
                      <option value="">Year</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
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
                    <select className="form-control" name="age_range" id="AgeRange">
                      <option value="">- None -</option>
                      <option value="18-24">18-24</option>
                      <option value="25-29">25-29</option>
                      <option value="30-34">30-34</option>
                      <option value="35-39">35-39</option>
                      <option value="40-44">40-44</option>
                      <option value="45-49">45-49</option>
                      <option value="50-54">50-54</option>
                      <option value="55-59">55-59</option>
                      <option value="60-64">60-64</option>
                      <option value="65_and_over">65 and over</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={["group-wrapper", nudermStyle.optionalWrap].join(" ")}>
                <div className="form-group select-group mb-0">

                  <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                    <label for="PrimarySkinConcern" className={["form-label", nudermStyle.customlabel].join(" ")}>Primary Skin Concern</label>
                    <select className="form-control" name="primary_skin_concern" id="PrimarySkinConcern">
                    <option value="">- None -</option><option value="Acne">Acne</option><option value="Dehydrated_Skin">Dehydrated Skin</option><option value="Elasticity_and_Sagging">Elasticity and Sagging</option><option value="Eyes_Bags_and_Dark_Circles">Eyes Bags and Dark Circles</option><option value="Fine_Lines_and_Wrinkles">Fine Lines and Wrinkles</option><option value="Hyperpigmentation_and_Melasma">Hyperpigmentation and Melasma</option><option value="Redness_Prone">Redness Prone</option><option value="Sensitive_Skin">Sensitive_Skin</option><option value="Skin_Discoloration">Skin Discoloration</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={["group-wrapper", nudermStyle.optionalWrap].join(" ")}>
                <div className="form-group select-group mb-0">

                  <div className={["select-wrapper", "nudermCustomSelect", "custom-select", nudermStyle.CustomSelect].join(" ")}>
                    <label for="GenderCustom" className={["form-label", nudermStyle.customlabel].join(" ")}>Gender</label>
                    <select className="form-control" name="gender" id="GenderCustom">
                    <option value="" >- None -</option><option value="male">Male</option><option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={[nudermStyle.inputfield, "mt-24"].join(" ")}>
                <label>Your Skin Care Physician's Name</label>
                <input name="your_skin_care_physician_s_name" type="text" />
              </div>
              <div className={[nudermStyle.inputfield, nudermStyle.mt24].join(" ")}>
                <label>Physician's Affiliated Practice Name</label>
                <input name="physician_s_affiliated_practice_name" type="text" />
              </div>
              <p className={nudermStyle.formnNote}>By submitting your physician’s information,
              you are consenting to allow Obagi Medical to send your information to your physician and notify him/her of your enrollment.
             </p> </div>
            <div className={"col-12 col-lg-6 offset-lg-3"}>
              <label className="terms footnote" >
                Yes, I want to receive emails to keep up with the latest products, skin care trends, and offers from Obagi.
                By registering, your information will be collected and used in the U.S. subject to our U.S.
                Privacy Policy and Terms of Use. For U.S. consumers only.
                <input type="checkbox" defaultChecked={true} required name="yes_agreement" />
                <span className="checkmark"></span>
              </label>
           </div>
           <div className={" col-12 col-lg-2 offset-lg-3"}>
              <button onClick={submitforming} type="submit" className={nudermStyle.signup} >
                Sign Up
              
              </button>
            </div>
            <div className={" col-12 col-lg-6 offset-lg-3"}>
              <p className={nudermStyle.ffootnote} >
              By submitting your information, you confirm you have read and agree with the terms of our Privacy Policy and Legal Notice.
              
              </p>
              <p className={nudermStyle.ffootnote}>  Obagi will never sell, rent, or share your personal information with any third parties for marketing purposes without your express permission. View full Privacy Policy.
</p>
            </div>
        
          </form>

    
    </>
  )
}

export default Level1
