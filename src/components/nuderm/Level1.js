import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import nudermStyle from "../../assets/scss/components/NuDerm-sign.module.scss"
import { CustomSelect } from '../../assets/js/custom-select'
import Scrollbars from "react-custom-scrollbars"
const Level1 = props => {
  const baseUrl = process.env.Base_URL;
  const [level, setLevel] = useState(1)
  var getday,getGender,getmonth,getSkinConcern,getState,getyear,getage=""
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
  
    if (getday === undefined) {
      document.querySelector('.globaldaySelect').classList.add("errorselect")

    }
    if (getmonth === undefined) {
      document.querySelector('.globalmonthSelect').classList.add("errorselect")

    }
    if (getyear === undefined) {
      document.querySelector('.globalyearSelect').classList.add("errorselect")

    }
    if (getState === undefined) {
      document.querySelector('.globalstateSelect').classList.add("errorselect")
    }
    
    if (list.length > 0) {
        for (var item of list) {
       
            item.parentElement.classList.add('error')
            // item.nextSibling.classList.remove('hide')
        }
    } else {

      let list = document.querySelectorAll('.needs-validations input:checked');
      for (let item of list) {
        
          obj[item.getAttribute("name")] = item.value;
        
        
      }

        let list2 = document.querySelectorAll('.needs-validations input');
        for (let item of list2) {
          if (item.getAttribute("name") !="yes_agreement") {
            obj[item.getAttribute("name")] = item.value;
          }else{
            if (item.checked === true) {
              window.fbq('track', 'Lead');
              console.log('hassan')
            }
         
          }
          
        }
     
      let getDate=`${getmonth}/${getday}/${getyear}`
    
      obj['date']=getDate;
      obj['state']=getState;
      if(getage){
        obj['age_range']=getage;
      }
     if (getGender) {
      obj['gender']=getGender;
     }
     if (getSkinConcern) {
      obj['primary_skin_concern']=getSkinConcern;
     }
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
          var otherDate = new Date(getyear,getmonth - 1,getday);
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
        
        });
};
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 
function monthSelectcon(e){
  document.querySelector('.monthSelect').innerHTML= e.target.nextSibling.innerText ;
  // close 
  getmonth=e.target.value;
    monthSelectData();

}
function monthSelectData(){
  let i =document.querySelectorAll('#monthSelect');
  document.querySelector('.globalmonthSelect').classList.remove("errorselect")

  for(let item of i ){
    if(  
      item.classList.contains('hide')){
        item.classList.remove('hide')
       
      document.querySelector('.filterprodline ').classList.remove('transparent-bg')

    }else{
      item.classList.add('hide')
      document.querySelector('.filterprodline ').classList.add('transparent-bg')

    }
  }

}
function yearSelectcon(e){
  document.querySelector('.yearSelect').innerHTML= e.target.nextSibling.innerText ;
  // close 
   getyear=e.target.value;
  yearSelectData();

}
function yearSelectData(){
  let i =document.querySelectorAll('#yearSelect');
  document.querySelector('.globalyearSelect').classList.remove("errorselect")

  for(let item of i ){
    if(  
      item.classList.contains('hide')){
        item.classList.remove('hide')
       
      document.querySelector('.filterprodline ').classList.remove('transparent-bg')

    }else{
      item.classList.add('hide')
      document.querySelector('.filterprodline ').classList.add('transparent-bg')

    }
  }

} 
function daySelectcon(e){
  document.querySelector('.daySelect').innerHTML= e.target.nextSibling.innerText ;
  // close 
  getday=e.target.value;
 
  daySelectData();

}
function daySelectData(){
  let i =document.querySelectorAll('#daySelect');
  document.querySelector('.globaldaySelect').classList.remove("errorselect")

  for(let item of i ){
    if(  
      item.classList.contains('hide')){
        item.classList.remove('hide')
       
      document.querySelector('.filterprodline ').classList.remove('transparent-bg')

    }else{
      item.classList.add('hide')
      document.querySelector('.filterprodline ').classList.add('transparent-bg')

    }
  }

} 
function ageSelectcon(e){
  document.querySelector('.ageSelect').innerHTML= e.target.nextSibling.innerText ;
  // close 
  getage=e.target.value;
  ageSelectData();

}
function ageSelectData(){
  let i =document.querySelectorAll('#ageSelect');
 
  for(let item of i ){
    if(  
      item.classList.contains('hide')){
        item.classList.remove('hide')
       
      document.querySelector('.filterprodline ').classList.remove('transparent-bg')

    }else{
      item.classList.add('hide')
      document.querySelector('.filterprodline ').classList.add('transparent-bg')

    }
  }

} 
function SkinConcernSelectData(){
  let i =document.querySelectorAll('#SkinConcernSelect');
 
  for(let item of i ){
    if(  
      item.classList.contains('hide')){
        item.classList.remove('hide')
       
      document.querySelector('.filterprodline ').classList.remove('transparent-bg')

    }else{
      item.classList.add('hide')
      document.querySelector('.filterprodline ').classList.add('transparent-bg')

    }
  }

} 

function SkinConcernSelectcon(e){
  document.querySelector('.SkinConcernSelect').innerHTML= e.target.nextSibling.innerText ;
  // close 
  getSkinConcern=e.target.value;

  SkinConcernSelectData();

}
function GenderSelectcon(e){
  document.querySelector('.GenderSelect').innerHTML= e.target.nextSibling.innerText ;
  // close 
  getGender=e.target.value;
  GenderSelectData();

}
function GenderSelectData(){
  let i =document.querySelectorAll('#GenderSelect');
 
  for(let item of i ){
    if(  
      item.classList.contains('hide')){
        item.classList.remove('hide')
       
      document.querySelector('.filterprodline ').classList.remove('transparent-bg')

    }else{
      item.classList.add('hide')
      document.querySelector('.filterprodline ').classList.add('transparent-bg')

    }
  }

} 
function StateSelectcon(e){
  document.querySelector('.StateSelect').innerHTML= e.target.nextSibling.innerText ;
  // close 
  getState=e.target.value;
  StateSelectData();

}
function StateSelectData(){
  let i =document.querySelectorAll('#StateSelect');
  document.querySelector('.globalstateSelect').classList.remove("errorselect")

  for(let item of i ){
    if(  
      item.classList.contains('hide')){
        item.classList.remove('hide')
       
      document.querySelector('.filterprodline ').classList.remove('transparent-bg')

    }else{
      item.classList.add('hide')
      document.querySelector('.filterprodline ').classList.add('transparent-bg')

    }
  }

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
              <div  onClick={() => { StateSelectData(); }} class="appointment-elemnt advanced-search global-select globalstateSelect filterprodline transparent-bg">
                  <p className={["form-label", nudermStyle.customlabel].join(" ")}>*State</p>
                <div id="prodLinesSelected">
                 <p class="input-name filtersearch StateSelect global-select-placeholder" >Select State</p>
                  <div class="product-lines hide" id="StateSelect">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter">
                          <li>
                              <label class="select-term">
                                  <input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Alabama"/>
                                  <span>Alabama</span></label></li>
                              <li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Alaska"/><span>Alaska</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Arizona"/><span>Arizona</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Arkansas"/><span>Arkansas</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="California"/><span>California</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Colorado"/><span>Colorado</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Connecticut"/><span>Connecticut</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Delaware"/><span>Delaware</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="District of Columbia"/><span>District of Columbia</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Florida"/><span>Florida</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Georgia"/><span>Georgia</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Hawaii"/><span>Hawaii</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Idaho"/><span>Idaho</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Illinois"/><span>Illinois</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Indiana"/><span>Indiana</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Iowa"/><span>Iowa</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Kansas"/><span>Kansas</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Kentucky"/><span>Kentucky</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Louisiana"/><span>Louisiana</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Maine"/><span>Maine</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Maryland"/><span>Maryland</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Massachusetts"/><span>Massachusetts</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Michigan"/><span>Michigan</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Minnesota"/><span>Minnesota</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Mississippi"/><span>Mississippi</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Missouri"/><span>Missouri</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Montana"/><span>Montana</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Nebraska"/><span>Nebraska</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Nevada"/><span>Nevada</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="New Hampshire"/><span>New Hampshire</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="New Jersey"/><span>New Jersey</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="New Mexico"/><span>New Mexico</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="New York"/><span>New York</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="North Carolina"/><span>North Carolina</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="North Dakota"/><span>North Dakota</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Ohio"/><span>Ohio</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Oklahoma"/><span>Oklahoma</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Oregon"/><span>Oregon</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Pennsylvania"/><span>Pennsylvania</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Rhode Island"/><span>Rhode Island</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="South Carolina"/><span>South Carolina</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="South Dakota"/><span>South Dakota</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Tennessee"/><span>Tennessee</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Texas"/><span>Texas</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Utah"/><span>Utah</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Vermont"/><span>Vermont</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Virginia"/><span>Virginia</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Washington"/><span>Washington</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="West Virginia"/><span>West Virginia</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Wisconsin"/><span>Wisconsin</span></label></li><li>
                              <label class="select-term"><input  class="popupVideoInput" required onChange={(e) => { StateSelectcon(e);}} name="state" type="radio" value="Wyoming"/><span>Wyoming</span></label></li>
                             
                        </ul>
                        </Scrollbars>
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
              <div  onClick={() => { monthSelectData(); }} class="appointment-elemnt advanced-search globalmonthSelect global-select filterprodline transparent-bg">
            <p className={["form-label", nudermStyle.customlabel].join(" ")}>Month</p>
           <div id="prodLinesSelected">
           <p class="input-name filtersearch monthSelect global-select-placeholder" >Choose Month</p>
              <div class="product-lines hide" id="monthSelect">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class=" select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="1"/><span>Jan</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="2"/><span>Feb</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="3"/><span>Mar</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="4"/><span>Apr</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="5"/><span>May</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="6"/><span>Jun</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="7"/><span>Jul</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="8"/><span>Aug</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="9"/><span>Sep</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="10"/><span>Oct</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="11"/><span>Nov</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { monthSelectcon(e);}} name="month" type="radio" value="12"/><span>Dec</span>
                              </label>
                            </li>
                          </ul>
                        </Scrollbars>
                      </div>
               </div>
          </div>
              <div  onClick={() => { daySelectData(); }} class="appointment-elemnt advanced-search globaldaySelect global-select filterprodline transparent-bg">
                 <p className={["form-label", nudermStyle.customlabel].join(" ")}>DAY</p>
                  <div id="prodLinesSelected">
                   <p class="input-name filtersearch daySelect global-select-placeholder" >Choose day</p>
                     <div class="product-lines hide" id="daySelect">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class=" select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="1"/><span>1</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="2"/><span>2</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="3"/><span>3</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="4"/><span>4</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="5"/><span>5</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="6"/><span>6</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="7"/><span>7</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="8"/><span>8</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="9"/><span>9</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="10"/><span>10</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="11"/><span>11</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="12"/><span>12</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="13"/><span>13</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="14"/><span>14</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="15"/><span>15</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="16"/><span>16</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="17"/><span>17</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="18"/><span>18</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="19"/><span>19</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="20"/><span>20</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="21"/><span>21</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="22"/><span>22</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="23"/><span>23</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="24"/><span>24</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="25"/><span>25</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="26"/><span>26</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="27"/><span>27</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="28"/><span>28</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="29"/><span>29</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { daySelectcon(e);}} name="day" type="radio" value="30"/><span>30</span>
                              </label>
                            </li>
                          </ul>
                        </Scrollbars>
                      </div>
               </div>
          </div>
              <div  onClick={() => { yearSelectData(); }} class="appointment-elemnt advanced-search globalyearSelect global-select filterprodline transparent-bg">
                  <p className={["form-label", nudermStyle.customlabel].join(" ")}>Year</p>
                <div id="prodLinesSelected">
                 <p class="input-name filtersearch yearSelect global-select-placeholder" >Choose Year</p>
                  <div class="product-lines hide" id="yearSelect">
                        <Scrollbars style={{ height: 180 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class=" select-term">
                              <input class="popupVideoInput" required onChange={(e) => { yearSelectcon(e);}} name="year" type="radio" value="2019"/><span>2019</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { yearSelectcon(e);}} name="year" type="radio" value="2020"/><span>2020</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput" required onChange={(e) => { yearSelectcon(e);}} name="year" type="radio" value="2021"/><span>2021</span>
                              </label>
                            </li>
                        </ul>
                        </Scrollbars>
                      </div>
               </div>
          </div>
              </div>
              <p className={nudermStyle.optional}>Optional Questions to Help us Better Serve You</p>
              <div  onClick={() => { ageSelectData(); }} className={["appointment-elemnt advanced-search global-select optionalWrap filterprodline transparent-bg",nudermStyle.optionalWrap].join(" ")}>
                  <p className={["form-label", nudermStyle.customlabel].join(" ")}>Age Range</p>
                <div id="prodLinesSelected">
                 <p class="input-name filtersearch ageSelect global-select-placeholder" >Select Age Range</p>
                  <div class="product-lines hide" id="ageSelect">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class=" select-term">
                              <input class="popupVideoInput"  onChange={(e) => { ageSelectcon(e);}} name="age" type="radio" value="18-24"/><span>18-24</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { ageSelectcon(e);}} name="age" type="radio" value="25-29"/><span>25-29</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { ageSelectcon(e);}} name="age" type="radio" value="30-34"/><span>30-34</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { ageSelectcon(e);}} name="age" type="radio" value="35-39"/><span>35-39</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { ageSelectcon(e);}} name="age" type="radio" value="40-44"/><span>40-44</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { ageSelectcon(e);}} name="age" type="radio" value="45-49"/><span>45-49</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { ageSelectcon(e);}} name="age" type="radio" value="50-54"/><span>50-54</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { ageSelectcon(e);}} name="age" type="radio" value="55-59"/><span>55-59</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { ageSelectcon(e);}} name="age" type="radio" value="60-64"/><span>60-64</span>
                              </label>
                            </li>
                            
                        </ul>
                        </Scrollbars>
                      </div>
               </div>
          </div>
             
             <div  onClick={() => { SkinConcernSelectData(); }} className={["appointment-elemnt advanced-search global-select optionalWrap filterprodline transparent-bg",nudermStyle.optionalWrap].join(" ")}>
                  <p className={["form-label", nudermStyle.customlabel].join(" ")}>Primary Skin Concern</p>
                <div id="prodLinesSelected">
                 <p class="input-name filtersearch SkinConcernSelect global-select-placeholder" >Select Skin Concern</p>
                  <div class="product-lines hide" id="SkinConcernSelect">
                        <Scrollbars style={{ height: 250 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class=" select-term">
                              <input class="popupVideoInput"  onChange={(e) => { SkinConcernSelectcon(e);}} name="SkinConcern" type="radio" value="Acne"/><span>Acne</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { SkinConcernSelectcon(e);}} name="SkinConcern" type="radio" value="Dehydrated_Skin"/><span>Dehydrated Skin</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { SkinConcernSelectcon(e);}} name="SkinConcern" type="radio" value="Elasticity_and_Sagging"/><span>Elasticity and Sagging</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { SkinConcernSelectcon(e);}} name="SkinConcern" type="radio" value="Eyes_Bags_and_Dark_Circles"/><span>Eyes Bags and Dark Circles</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { SkinConcernSelectcon(e);}} name="SkinConcern" type="radio" value="Fine_Lines_and_Wrinkles"/><span>Fine Lines and Wrinkles</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { SkinConcernSelectcon(e);}} name="SkinConcern" type="radio" value="Hyperpigmentation_and_Melasma"/><span>Hyperpigmentation and Melasma</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { SkinConcernSelectcon(e);}} name="SkinConcern" type="radio" value="Redness_Prone"/><span>Redness Prone</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { SkinConcernSelectcon(e);}} name="SkinConcern" type="radio" value="Sensitive_Skin"/><span>Sensitive Skin</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { SkinConcernSelectcon(e);}} name="SkinConcern" type="radio" value="Skin_Discoloration"/><span>Skin Discoloration</span>
                              </label>
                            </li>
                            
                        </ul>
                        </Scrollbars>
                      </div>
               </div>
          </div>
             
          <div  onClick={() => { GenderSelectData(); }} className={["appointment-elemnt advanced-search global-select optionalWrap filterprodline transparent-bg",nudermStyle.optionalWrap].join(" ")}>
                  <p className={["form-label", nudermStyle.customlabel].join(" ")}>Gender</p>
                <div id="prodLinesSelected">
                 <p class="input-name filtersearch GenderSelect global-select-placeholder" >Select Gender</p>
                  <div class="product-lines hide" id="GenderSelect">
                        <Scrollbars style={{ height: 120 }}>
                          <ul class="popupUl popupFilter">
                            <li>
                              <label class=" select-term">
                              <input class="popupVideoInput"  onChange={(e) => { GenderSelectcon(e);}} name="gender" type="radio" value="male"/><span>Male</span>
                              </label>
                            </li>
                            <li>
                              <label class="select-term">
                              <input class="popupVideoInput"  onChange={(e) => { GenderSelectcon(e);}} name="gender" type="radio" value="female"/><span>Female</span>
                              </label>
                            </li>
                          
                        </ul>
                        </Scrollbars>
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
                <input type="checkbox" defaultChecked={true} required name="yes_agreement" />
                <span className="checkmark"></span>
                <span>Yes, I want to receive emails to keep up with the latest products, skin care trends, and offers from Obagi.
                By registering, your information will be collected and used in the U.S. subject to our <Link to={"/privacy-policy"}> U.S.
                Privacy Policy</Link> and <Link to={"/terms-of-use"}>Terms of Use</Link>. For U.S. consumers only.</span>
              </label>
           </div>
           <div className={" col-12 col-lg-2 offset-lg-3"}>
              <button onClick={submitforming} type="submit" className={nudermStyle.signup} >
                Sign Up
              
              </button>
            </div>
           
        
          </form>

    
    </>
  )
}

export default Level1
