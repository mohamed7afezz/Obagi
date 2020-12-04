import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import nudermStyle from "../../assets/scss/components/NuDerm-sign.module.scss"
const Level2 = props => {
  const baseUrl = process.env.Base_URL;

    const [level, setLevel] = useState(1);
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
      let savecheckvalue=[];

      var obj = { webform_id: "nu_derm_survey" };
      var list = document.querySelectorAll('.needs-validations input:invalid');
      if (list.length > 0) {
          for (var item of list) {
              item.parentElement.classList.add('error')
              // item.nextSibling.classList.remove('hide')
          }
      } else {
          let list2 = document.querySelectorAll('.needs-validations input[type="radio"]:checked');
          for (let item of list2) {
            
              obj[item.getAttribute("name")] = item.value;
              if (item.value === "taketext") {
                obj[item.getAttribute("name")]= document.querySelector('.taketext').value;
              }
              else if (item.value === "taketext2"){
                obj[item.getAttribute("name")]= document.querySelector('.taketext2').value;
              }
              else if (item.value === "taketext3"){
                obj[item.getAttribute("name")]= document.querySelector('.taketext3').value;
              }
          }
              let listCheck = document.querySelectorAll('.needs-validations.servay input[type="checkbox"]:checked')

          for (let item2 of listCheck) {
            if (item2.value != "taketext1"){
            savecheckvalue.push(item2.value)}
             else if(item2.value === "taketext1"){
              obj[item2.getAttribute("name")]= savecheckvalue.push(document.querySelector('.taketext1').value);
            }
          }
          let savetextArea=document.querySelector('textarea').value;
          obj['2_please_rank_the_following_topics_you_would_be_interested_in_le']=savecheckvalue;
          obj['5_please_provide_any_additional_thoughts_or_ideas_you_would_like']=savetextArea
          let listSelect = document.querySelectorAll('.needs-validations select');
          for (let item1 of listSelect) {
         let i ="";
         i=item1.getAttribute("name");
       
            if (i != "month" && i != "day" && i != "year") {
              obj[item1.getAttribute("name")] = item1.value;
            }  
        }
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
         
              props.GetLevelNumber(3)
              topFunction()
             }          })
          .catch(error => {
              // console.log('error', error)
          });
  };
    function checkDataCondition(condition, data) {
        if (condition) {
            return data;
        } else {
            return '';
        }
    }
    function topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
           <form onSubmit={(e) => { e.preventDefault(); }} className={[nudermStyle.Servayform,"needs-validations servay"].join(" ")}>
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
                  value="correctly_use"
                  
                  type="radio"
                  name="1_please_select_the_primary_reason_you_signed_up_for_the_new_to_"
                />
                <span class="radiomark"></span>I wanted to see if I used Nu-Derm correctly.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="maintain_results"
                  
                  type="radio"
                  name="1_please_select_the_primary_reason_you_signed_up_for_the_new_to_"
                />
                <span class="radiomark"></span>I wanted to learn how to maintain and optimize results.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="future_use"
                  
                  type="radio"
                  name="1_please_select_the_primary_reason_you_signed_up_for_the_new_to_"
                />
                <span class="radiomark"></span>I’m considering using the Nu-Derm System again in the future.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="exclusive_offers"
                  
                  type="radio"
                  name="1_please_select_the_primary_reason_you_signed_up_for_the_new_to_"
                />
                <span class="radiomark"></span>I was looking for exclusive offers or rebate opportunities.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="start_system"
                  
                  type="radio"
                  name="1_please_select_the_primary_reason_you_signed_up_for_the_new_to_"
                />
                <span class="radiomark"></span>I didn’t know it was designed for those just starting the Nu-Derm System.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label lastinput"].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input "].join(" ")}
                  id={nudermStyle.formradio}
                  value="taketext"
                  
                  type="radio"
                  name="1_please_select_the_primary_reason_you_signed_up_for_the_new_to_"
                />
                <span class="radiomark"></span>
                <div className={nudermStyle.inputfield}>
                <label>Other</label>
                <input className="otherInput taketext"  name="1_please_select_the_primary_reason_you_signed_up_for_the_new_to_" type="text" />
              </div>
                </label>
               </div>
               <div className={["offset-lg-3","col-12","col-lg-6",nudermStyle.QuestionContainer].join(" ")}>
            <p className={nudermStyle.Qtitle}>
            2. Please rank the following topics you would be interested in learning about in order of most interested (1) to least interested (5).            </p>
            <label
                className={[nudermStyle.RadioLabel, "new-check terms  form-check-label "].join(" ")}
              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="correctly_use_2"
                  
                  type="checkbox"
                  name="2_please_rank_the_following_topics_you_would_be_interested_in_le"
                />
                <span class="checkmark"></span>I wanted to see if I used Nu-Derm correctly.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "new-check terms  form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="maintain_results_2"
                  
                  type="checkbox"
                  name="2_please_rank_the_following_topics_you_would_be_interested_in_le"
                />
                <span class="checkmark"></span>I wanted to learn how to maintain and optimize results.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "new-check terms  form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="future_use_2"
                  
                  type="checkbox"
                  name="2_please_rank_the_following_topics_you_would_be_interested_in_le"
                />
                <span class="checkmark"></span>I wanted to learn how to maintain and optimize results.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "new-check terms  form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="exclusive_offers_2"
                  
                  type="checkbox"
                  name="2_please_rank_the_following_topics_you_would_be_interested_in_le"
                />
                <span class="checkmark"></span>I was looking for exclusive offers or rebate opportunities.
              </label>
              <label
                className={[nudermStyle.RadioLabel, "new-check terms lastinput form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="taketext1"
                  
                  type="checkbox"
                  name="2_please_rank_the_following_topics_you_would_be_interested_in_le"
                />
                <span class="checkmark"></span>
                <div className={nudermStyle.inputfield}>
                <label>Other</label>
                <input className="otherInput taketext1" name="2_please_rank_the_following_topics_you_would_be_interested_in_le" type="text" />
              </div>
                </label>
               
            </div>
               <div className={["offset-lg-3","col-12","col-lg-6",nudermStyle.QuestionContainer].join(" ")}>
            <p className={nudermStyle.Qtitle}>
              3. How would you prefer to receive this type of information?
              </p>
            <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="email_only"
                  
                  type="radio"
                  name="3_how_would_you_prefer_to_receive_this_type_of_information_"
                />
                <span class="radiomark"></span>Email Only
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="msg_only"
                  
                  type="radio"
                  name="3_how_would_you_prefer_to_receive_this_type_of_information_"
                />
                <span class="radiomark"></span>Text message only
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="mail_text"
                  
                  type="radio"
                  name="3_how_would_you_prefer_to_receive_this_type_of_information_"
                />
                <span class="radiomark"></span>Email and text message
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="blog_site"
                  
                  type="radio"
                  name="3_how_would_you_prefer_to_receive_this_type_of_information_"
                />
                <span class="radiomark"></span>Blog or website
              </label>
             <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label lastinput"].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input "].join(" ")}
                  id={nudermStyle.formradio}
                  value="taketext2"
                  
                  type="radio"
                  name="3_how_would_you_prefer_to_receive_this_type_of_information_"
                />
                <span class="radiomark"></span>
                <div className={nudermStyle.inputfield}>
                <label>Other</label>
                <input className="otherInput taketext2" name="3_how_would_you_prefer_to_receive_this_type_of_information_" type="text" />
              </div>
                </label>
               </div>
               <div className={["offset-lg-3","col-12","col-lg-6",nudermStyle.QuestionContainer].join(" ")}>
            <p className={nudermStyle.Qtitle}>
            4. How often would you prefer to receive the information?            </p>
            <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="once_week"
                  
                  type="radio"
                  name="4_how_often_would_you_prefer_to_receive_the_information_"
                />
                <span class="radiomark"></span>Once a week
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="once_month"
                  
                  type="radio"
                  name="4_how_often_would_you_prefer_to_receive_the_information_"
                />
                <span class="radiomark"></span>Once a month
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="twice_month"
                  
                  type="radio"
                  name="4_how_often_would_you_prefer_to_receive_the_information_"
                />
                <span class="radiomark"></span>Twice a month
              </label>
              <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label "].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input"].join(" ")}
                  id={nudermStyle.formradio}
                  value="once_3_months"
                  
                  type="radio"
                  name="4_how_often_would_you_prefer_to_receive_the_information_"
                />
                <span class="radiomark"></span>Once every 3 months
              </label>
             <label
                className={[nudermStyle.RadioLabel, "radioLabel form-check-label lastinput"].join(" ")}

              >
                <input
                  className={[nudermStyle.radio, "form-check-input "].join(" ")}
                  id={nudermStyle.formradio}
                  value="taketext3"
                  type="radio"
                  name="4_how_often_would_you_prefer_to_receive_the_information_"
                />
                <span class="radiomark"></span>
                <div className={nudermStyle.inputfield}>
                <label>Other</label>
                <input className="otherInput taketext3" name="4_how_often_would_you_prefer_to_receive_the_information_" type="text" />
              </div>
                </label>
               </div>
               <div className={["offset-lg-3","col-12","col-lg-6",nudermStyle.QuestionContainer].join(" ")}>
              <p className={nudermStyle.Qtitle}>
               5. Please provide any additional thoughts or ideas you would like to share.              </p>
              <div className={[nudermStyle.inputfield,nudermStyle.textarea].join(" ")}>
                <label>DESCRIPTION</label>

                <textarea placeholder="Type here…" className="textareainput" name="5_please_provide_any_additional_thoughts_or_ideas_you_would_like" type="text" ></textarea>
              </div>
              <p className={nudermStyle.formfooter}>
              By submitting your information, you confirm you have read and agree with the terms of our <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="#">Legal Notice</Link>.</p>
              <p className={nudermStyle.formfooter}>
        Obagi will never sell, rent, or share your personal information with any third parties for marketing purposes without your express permission. View full Privacy Policy.</p>
            </div>
               <div className={["offset-lg-3","col-12","col-lg-2",nudermStyle.QuestionContainer].join(" ")}>    
               <button onClick={submitforming} type="submit" className={nudermStyle.signup} >submit survey</button>
               </div>
           </form>
        </>
    )
}

export default Level2