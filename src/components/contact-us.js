import React, { useEffect, useState, useContext } from "react"
import { Link } from 'gatsby'
import Customer from '../components/customer-care'
import { CustomSelect } from '../assets/js/custom-select'
import myAccountStyles from '../assets/scss/components/my-account.module.scss'

export default function Contact() {

    function removevaild(e){
        let item= e.target
        
         item.closest('.form-element-con').classList.remove('error')
         
         item.nextSibling.classList.add('hide')
       }
       function removevaildspan(e) {
        let item= e.target
        
         item.closest('.form-element-con').classList.remove('error')
         
       }
        const sendFormValues = (updatedItemData) => {
         fetch(
           `https://dev-obagi.azurewebsites.net/api/webform_rest/submit`,
           {
             credentials: 'same-origin',
             mode: 'cors',
             method: 'POST',
             body: JSON.stringify(updatedItemData)
           }
         )
           .then(res => res.json())
           .then(response => {
             console.log(response)
           })
           .catch(error => {
             console.log('error',error)
           });
        };
     
      
     function submitforming(e){
       var obj={webform_id : "contact_us"};
       var list = document.querySelectorAll('.needs-validations input:invalid');
    //   var text_area= document.querySelector('textarea:invaild')
   //   text_area.closest('.form-element-con').classList.add('error')
       if (list.length > 0){
       for (var item of list) {
         item.parentElement.classList.add('error')
         item.nextSibling.classList.remove('hide')
     }}else{
       let list2 = document.querySelectorAll('.needs-validations input');
       for (let item of list2) {
         item.parentElement.classList.remove('error')
         item.nextSibling.classList.add('hide')
         obj[item.getAttribute("name")]=item.value;
      }
     
      obj[document.querySelector('.needs-validations select').getAttribute("name")]=[`${document.querySelector('.needs-validations select').value}`]
     
     sendFormValues({obj})
     }
     }

    useEffect(() => {
        if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
            CustomSelect();
        }
    })



    return (
        <Customer activeTab="contact-us">
            <div className="contact-us">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="d-none d-lg-flex second-title-wrapper">
                            <div className={myAccountStyles.secondTitle}>Contact Us</div>
                        </div>
                        <div className="contact-text">If you have any questions or want more information about Obagi, please contact us. We love hearing from our customers and we would be glad to further assist you.</div>
                        <div className="contact-title">Email Obagi</div>
                    </div>
                </div>


                    {/* The below row -ONLY- appears after the submit request is successful  *****************/}

                {/* <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="contact-thanks-note">Thank you for contacting Obagi</div>
                        <div className="contact-thanks-text">We’ve received your message. You should receive a response within 2 to 3 business days.</div>
                    </div>
                </div> */}

                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="contact-text">Submit your message below, and we will respond to most inquiries within 2 to 3 business days.</div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <form class="needs-validations" onSubmit={(e) => {e.preventDefault();}}>
                            <div className="required-field">*All fields required</div>


                            <div className="check-group">
                                <div className="form-check form-element-con">
                                    <label className="radioLabel form-check-label" for="contactFirstRadio" onClick={removevaildspan}>
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="contactFirstRadio" value="option1"required />
                                        <span class="radiomark"></span>
                                        I am a Patient/Consumer
                                    </label>
                                </div>
                                <div className="form-check form-element-con">
                                    <label className="radioLabel form-check-label" for="contactSecondRadio" onClick={removevaildspan}>
                                        <input required className="form-check-input" type="radio" name="exampleRadios" id="contactSecondRadio" value="option2" />
                                        <span class="radiomark"></span>
                                        I am a Physician/Skin Care Professional
                                    </label>
                                </div>
                            </div>


                            <div className="form-group form-element-con">
                                <label for="contactFName" className="form-label">*First name</label>
                                <input type="text" className="form-control" onClick={removevaild} id="contactFName" aria-describedby="contactFName" placeholder="" required />
                                <p  className="error-msg hide">Please Enter Your First Name</p>
                            </div>
                            <div className="form-group form-element-con">
                                <label for="contactLName" className="form-label">*Last name</label>
                                <input type="text" className="form-control" onClick={removevaild} id="contactLName" aria-describedby="contactLName" placeholder="" required />
                                <p  className="error-msg hide">Please Enter Your First Name</p>
                            </div>

                            <div className="form-group select-group">
                                <label for="state" className="form-label">*Subject</label>
                                <div className="select-wrapper custom-select">
                                    <select className="form-control"  id="subject">
                                        <option value="Alabama">Subject 1</option>
                                        <option value="Alabama">Subject 2</option>
                                        <option value="Alabama">Subject 2</option>
                                        <option value="Alabama">Subject 3</option>
                                        <option value="Alabama">Subject 4</option>
                                        <option value="Alabama">Subject 5</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group textarea-group form-element-con">
                                <label for="contactDesc" className="form-label">Description</label>
                                <textarea required type="text" className="form-control textarea-control" id="contactDesc" aria-describedby="contactDesc" placeholder="Type here…" />

                            </div>

                            <div className="question">How would you like to be contacted:</div>

                            <div className="second-check-group">
                                <div className="form-check form-element-con">
                                    <label className="radioLabel form-check-label" for="contactEmailRadio" onClick={removevaildspan}>
                                        <input className="form-check-input" type="radio" name="phoneRadio" id="contactEmailRadio" value="option1"required />
                                        <span class="radiomark"></span>
                                        Email
                                </label>
                                </div>
                                <div className="form-check form-element-con">
                                    <label className="radioLabel form-check-label" for="contactPhoneRadio" onClick={removevaildspan}>
                                        <input className="form-check-input" type="radio" name="phoneRadio" id="contactPhoneRadio" value="option2" required/>
                                        <span class="radiomark"></span>
                                        Phone
                                </label>
                                </div>
                            </div>

                            <div className="form-group form-element-con">
                                <label for="contactPhone" className="form-label">*Phone</label>
                                <input type="text" className="form-control" onClick={removevaild} id="contactPhone" aria-describedby="contactPhone" placeholder="" required />
                                <p  className="error-msg hide">Please Enter Your First Name</p>
                            </div>

                            <div className="footnote">Including area code and/or country code, no spaces or dashes (e.g., 1234567890)</div>
                            <input  onClick={(e) => {submitforming(e);}} className="button-link" type="submit" value="Send Message" required/>

                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-8">

                        <div className="contact-info-wrapper">
                            <div className="contact-info-subwrapper">
                                <div className="contact-title">Call Obagi</div>
                                <div className="contact-mini-wrapper">
                                    <div>Phone: 1-800-636-7546</div>
                                    <div>Fax: 1-877-791-7096</div>
                                </div>
                                <div className="contact-mini-wrapper">
                                    <div>Monday - Friday (excluding holidays)</div>
                                    <div>7AM - 4PM PST</div>
                                </div>
                            </div>

                            <div className="contact-info-subwrapper">
                                <div className="contact-title">Write Obagi</div>
                                <div className="contact-mini-wrapper">
                                    <div>Phone: 1-800-636-7546</div>
                                    <div>Fax: 1-877-791-7096</div>
                                </div>
                                <div className="contact-mini-wrapper">
                                    <div>Monday - Friday (excluding holidays)</div>
                                    <div>7AM - 4PM PST</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Customer>
    )
}
