import React, { useState, useEffect, useContext } from 'react';

import multistepformStyles from '../../assets/scss/components/multistepform.module.scss'
import stepIcon from '../../assets/images/product-images/stepIcon.svg'
import iconsGeneralMinus from '../../assets/images/product-images/iconsGeneralMinus.svg'
import iconsGeneralplus from '../../assets/images/product-images/iconsGeneralPlus.svg'

import { graphql, Link } from 'gatsby'
import Scrollbars from 'react-custom-scrollbars'
const $ = require('jquery')
const MultiStepForm = ({ node }) => {
    const baseUrl = process.env.Base_URL;
    let ageList = ["51-60", "41-50", "31-40", "20-30"];
    let skinList = ["Dry Skin", "Oily Skin", "Combination Skin", "Normal Skin"];
    useEffect(() => {
        if (typeof window != undefined) {
            document.querySelectorAll('.new-select').forEach(select => select.addEventListener('click', function () {
                this.nextSibling.classList.remove('hide');
                this.classList.add('hide');
            }));
            document.querySelectorAll('.Give-val').forEach(item => item.addEventListener('click', function (e) {
                this.closest('.select-group').previousSibling.classList.remove('hide');
                this.closest('.select-group').classList.add('hide');

                if (this.closest('.Age-select')) {
                    this.closest('.Age-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;
                } else if (this.closest('.Skin-select')) {
                    this.closest('.Skin-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;

                }
            }));
        }
    });
    function choosefile(e) {
        e.target.parentElement.nextSibling.classList.remove('d-none')
        e.target.parentElement.nextSibling.innerHTML = e.target.files[0].name;
    }
    var checkinput = true;
    var checkselect = true;
    var checkterms = true;
    function validateForm(e) {
        e.preventDefault();
     
        var form = document.querySelector('.needs-validation');
        if (form.checkValidity() === false) {
            $(form).find('.select-selected').each(function () { 
                
                if ($(this)[0].innerHTML === "Select") {
                    $(this).closest('.form-group').addClass('error');
                    
                    checkselect = false;
                }else{
                    $(this).closest('.form-group').removeClass('error');
                  
                }
            })

            $(form).find(':invalid').each(function () {
                $(this).closest('.form-group').addClass('error');
                checkinput = false;
            })
            if(!document.querySelector('#registerCheck').checked){
                checkterms= false;
                document.querySelector('#registerCheck').parentElement.classList.add('error');
            }else{
                checkterms = true;
                 document.querySelector('#registerCheck').parentElement.classList.remove('error');
                 
            }
        }
       
        if (checkinput && checkselect && checkterms ) {
            var obj = { webform_id: "nu_cil_form" };
            if (document.querySelectorAll(".needs-validation .error").length > 0) {
              
            }else{
            var savevalidinput = document.querySelectorAll('.nu_cli input');
            savevalidinput.forEach(item => {
               if (item.getAttribute("type") != 'file') {
                obj[item.getAttribute("name")] = item.value;
               }
                  
             
            });
            
            var savevalidselect = document.querySelectorAll('.nu_cli select');
            savevalidselect.forEach(item => {
               
                obj[item.getAttribute("name")] = item.value;
         
        });
            obj['tell_us_about_your_story']=document.querySelector('.nu_cli textarea').value;
            var formData = new FormData();
            console.log( document.querySelector("#beforeImage").files[0]);
            formData.append("file", document.querySelector("#beforeImage").files[0]);
            obj["before_image"]=formData;
            sendFormValues({ obj });
        }}
       
    
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
           
               
               }          })
            .catch(error => {
           
            });
    };
    function handlechange(e) {
        $(e.target).closest('.error').removeClass('error');
        checkinput = true;
    }
    function handleSelect(e) {
        checkselect = true;
        $(e.currentTarget).removeClass('error');
    
    }
    return (
        <div className={["container-fluid", multistepformStyles.sectionWrapper].join(" ")}>
            <form noValidate="novalidate" class={["register nu_cli needs-validation", multistepformStyles.FormStyle].join(" ")}>
                <div className={["row", multistepformStyles.Formwrap].join(" ")}>
                    <div className={"col-12 col-md-11 offset-md-1"}>
                        <h3 className={[multistepformStyles.formHeader]}> <span className={[multistepformStyles.stepnumber, "d-none"].join(" ")}>1</span>
                            <span><img src={stepIcon} className="img-fluid" /></span>
                            Submit Your Photos
                        </h3>
                    </div>
                    <div className={["col-12", "offset-md-1 col-md-3", multistepformStyles.leftSection].join(" ")}>

                        <p className={[multistepformStyles.formDescription]}>Upload one “before“ photo (week 0 or any time pre-treatment) and one “after“ photo (taken at least 16 weeks or later). Make sure we can see the real you! No mascara or eye makeup, just pure you. Be sure to fill out all the fields and keep contact information consistent. </p>
                    </div>
                    <div className={["col-12", "col-md-6", "offset-md-1", multistepformStyles.rightSection].join(" ")}>
                        <div className={multistepformStyles.uploadWrapper}>
                            <p className={[multistepformStyles.formsteptitle].join(" ")}>Before Using Nu-Cil Photo (Week 0)</p>
                            <p className={[multistepformStyles.formstepdescription].join(" ")}>
                                Photograph your lashes from the same angle each time. Try a frontal view with your eyes open or a superior view with your eyes closed.     </p>
                            <p className={"mb-24"}> <Link to="#">More Tips +</Link></p>
                            <span className={multistepformStyles.inputContainer}>

                                <input id="beforeImage" className={multistepformStyles.inputUpload} onChange={choosefile} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />
                            </span>
                            <span className={[multistepformStyles.inputValue, "d-none inputValue"].join(" ")}>

                            </span>
                        </div>
                        <div className={multistepformStyles.uploadWrapper}>
                            <p className={[multistepformStyles.formsteptitle].join(" ")}>After Using Nu-Cil Photo (Week 16)</p>
                            <p className={[multistepformStyles.formstepdescription].join(" ")}>
                                Photograph your lashes from the same angle each time. Try a frontal view with your eyes open or a superior view with your eyes closed.     </p>
                            <p className={"mb-24"}> <Link to="#">More Tips +</Link></p>
                            <span className={multistepformStyles.inputContainer}>

                                <input id="afterImage" className={multistepformStyles.inputUpload} onChange={choosefile} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />

                            </span>
                            <span className={[multistepformStyles.inputValue, "d-none inputValue"].join(" ")}>

                            </span>
                        </div>

                    </div>
                    <div className={["col-12 col-md-10 offset-md-1", multistepformStyles.seprator].join(" ")}>

                    </div>
                </div>
                <div className={["row", multistepformStyles.Formwrap].join(" ")}>
                    <div className={"col-12 col-md-11 offset-md-1"}>
                        <h3 className={[multistepformStyles.formHeader]}> <span className={[multistepformStyles.stepnumber].join(" ")}>2</span>

                            Tell Us Your Story
                        </h3>
                    </div>
                    <div className={["col-12", "offset-md-1 col-md-3", multistepformStyles.leftSection].join(" ")}>

                        <p className={[multistepformStyles.formDescription]}>We want to know why you chose Nu-Cil and how the product has helped you and your lashes. When it comes to beauty, everyone's story is unique—so tell us yours!
                            Please feel free to share as much or as little as you want. </p>
                    </div>
                    <div className={["col-12", "col-md-6", "offset-md-1", multistepformStyles.rightSection].join(" ")}>
                        <p className={multistepformStyles.required}>*Required fileds</p>
                        <div className={multistepformStyles.dFlex}>
                            <div className={["form-group", multistepformStyles.formGroup].join(" ")}>
                                <label for="firstname">*First name</label>
                                <input type="text" onChange={handlechange} className="form-control" name="first_name" id="firstname" required aria-describedby="firstname" placeholder="" data-webform-required-error="Please fill in your first name." />
                            </div>
                            <div className={["form-group", multistepformStyles.formGroup].join(" ")}>
                                <label for="lastname">*Last name</label>
                                <input type="text" onChange={handlechange} className="form-control" name="last_name" id="lastname" required aria-describedby="lastname" placeholder="" data-webform-required-error="Please fill in your last name." />
                            </div>
                            <div className={["form-group", multistepformStyles.formGroup].join(" ")}>
                                <label for="email">*Email Address</label>
                                <input type="email" onChange={handlechange} className="form-control" name="email_address" id="eamil" required aria-describedby="eamil" placeholder="" data-webform-required-error="Please fill in your eamil address." />
                            </div>
                            <div className={["form-group", multistepformStyles.formGroup].join(" ")}>
                                <label for="Phone">*Phone Number</label>
                                <input type="text" onChange={handlechange} className="form-control" name="phone_number" id="Phone" required aria-describedby="phonenumber" placeholder="" data-webform-required-error="Please fill in your phone number." />
                            </div>
                            <div className={["", multistepformStyles.formGroup].join(" ")}>


                                <div onClick={handleSelect} class={["form-group select-group new-select  Age-select", multistepformStyles.formGroup].join(" ")}>
                                    <label for="reviewFormSelect" class="form-label">*Age Range</label>
                                    <div name="age_range" class="select-selected">Select</div>
                                </div>

                                <div className={[" select-group Age-select  age-select hide", multistepformStyles.selectGroup].join(" ")}>
                                    <label for="reviewFormSelect" className="form-label">*Age Range</label>

                                    <div className={["select-wrap", multistepformStyles.selectWrap].join(" ")}>
                                        <Scrollbars style={{ height: 200 }}>
                                            <div required className="form-control" name="date" >

                                                {ageList.reverse().map((item, index) => {
                                                    return (
                                                        <div className="Give-val age" data-value={item} data-name="date">{item}</div >
                                                    )
                                                })}
                                            </div>
                                        </Scrollbars>
                                    </div>
                                </div>



                            </div>
                            <div className={["", multistepformStyles.formGroup].join(" ")}>


                                <div  onClick={handleSelect} class={["form-group select-group new-select  Skin-select", multistepformStyles.formGroup].join(" ")}>
                                    <label for="reviewFormSelect" class="form-label">*Skin Type</label>
                                    <div name="skin_type" class="select-selected">Select</div>
                                </div>

                                <div className={[" select-group skintype-select  Skin-select hide", multistepformStyles.selectGroup].join(" ")}>
                                    <label for="reviewFormSelect" className="form-label">*Skin Type</label>

                                    <div className={["select-wrap", multistepformStyles.selectWrap].join(" ")}>
                                        <Scrollbars style={{ height: 200 }}>
                                            <div required className="form-control" name="skintype" >

                                                {skinList.reverse().map((item, index) => {
                                                    return (
                                                        <div className="Give-val skintype" data-value={item} data-name="skintype">{item}</div >
                                                    )
                                                })}
                                            </div>
                                        </Scrollbars>
                                    </div>
                                </div>



                            </div>
                            <div className={multistepformStyles.massageStyle}>
                                <p className={multistepformStyles.feildTitle}>Tell us about your story.</p>
                                <div className={["form-group ", multistepformStyles.w100, multistepformStyles.formGroup, multistepformStyles.mb0].join(" ")}>
                                    <label for="firstname">Add Message</label>
                                    <textarea type="text" className="" name="tell_us_about_your_story" id="Massage" placeholder="" data-webform-required-error="Please fill in your first name." />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={["col-12 col-md-10 offset-md-1", multistepformStyles.seprator].join(" ")}>

                    </div>
                </div>
                <div className={["row", multistepformStyles.Formwrap].join(" ")}>
                    <div className={"col-12 col-md-11 offset-md-1"}>
                        <h3 className={[multistepformStyles.formHeader]}> <span className={[multistepformStyles.stepnumber].join(" ")}>3</span>

                            Confirm and Submit
                        </h3>
                    </div>
                    <div className={["col-12", "offset-md-1 col-md-3", multistepformStyles.leftSection].join(" ")}>

                        <p className={[multistepformStyles.formDescription]}>Once you submit your entries, we'll review them for potential inclusion in future materials. </p>
                    </div>
                    <div className={["col-12", "col-md-6", "offset-md-1", multistepformStyles.rightSection].join(" ")}>
                        <div className="form-check">

                            <label className={["form-check-label terms", multistepformStyles.termsWrapper].join(" ")} for="registerCheck">
                                <input type="checkbox" name="terms_and_condition" required className="form-check-input" id="registerCheck" defaultChecked={true} />
                                <span className={["checkmark", multistepformStyles.checkMark].join(" ")}></span>
                                <span className={multistepformStyles.termsNote}>*I have read and agree to the <Link to="/terms-of-use">Terms & Conditions</Link> and grant Obagi® permission to use my submitted information to be featured in future Nu-Cil® communications.
                                </span>
                            </label>
                            <button onClick={validateForm} type="submit" className={multistepformStyles.submitForm}>Submit Your Story</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>

    )
}

export default MultiStepForm;

export const fragment = graphql`
    fragment formSectionParagraph on paragraph__form_section {
        id
        field_form_before_after_title {
          processed
        }
        field_form_before_after_descript {
          processed
        }
        field_story {
          processed
        }
        field_story_description {
          processed
        }
        field_form_terms_title {
          processed
        }
        field_form_terms_description {
          processed
        }
      }
`;
