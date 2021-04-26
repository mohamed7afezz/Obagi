import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import ImgForm from '../assets/scss/components/images-and-form.module.scss'
import Player from '@vimeo/player'
import playbtnimg from "../assets/images/product-images/PlayVideo.svg"
import Scrollbars from 'react-custom-scrollbars';

const $ = require("jquery");
function playvideo(event) {
    
    if(event) {event.preventDefault();}
    let iframeContainer, player, playerOpts = {
        url: ''
    }

    // let url = event.target.parentNode.getAttribute("href");
    let url = document.querySelector('.playbtn').getAttribute("href");
    playerOpts.url = url;

    if (playerOpts.url.indexOf('youtube') > -1) {
        document.querySelector('.video-popup-wrap').innerHTML = '<iframe class="embed-responsive-item" src="' + url + '?rel=0&autoplay=true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allow="autoplay" allowfullscreen></iframe>';

        return;
    } else {
        document.querySelector('#v-video').innerHTML = `<iframe class="embed-responsive-item" src="${url}?autoplay=1&background=1&muted=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allow="autoplay" allowfullscreen></iframe>`;
    }

    document.querySelector('.video-wrapper').classList.add("played")
    player = new Player(document.querySelector('#v-video iframe'));

    player.play();


}
var Submit = false;
var ischanged = false;
function removemodal(e, isScroll,section) {
    e.preventDefault();
 

    if(isScroll) {
        let sectionId = section.split('#')[1];
        
        window.scroll({ top: $(`#${sectionId}`).offset().top - $('#mob-navigation').height(), behavior: 'smooth' });


    }
    document.querySelector("#youarein").classList.add("hidden");
}
let thanksmodal = () => {
    document.querySelector("#youarein").classList.remove('hidden')
    var container = document.querySelector("#youarein .container");

    document.querySelector("#youarein").addEventListener("click", function (e) {
        if (e.target !== document.querySelector("#youarein") && e.target !== container) return;
        document.querySelector("#youarein").classList.add("hidden");
    });


}

const ImagesForm = ({ node }) => {
    const baseUrl = process.env.Base_URL;
    useEffect(() => {

        document.addEventListener('scroll', () => 
        {

            if (!document.querySelector('.video-wrapper').classList.contains("played")) {
             
                if (document.documentElement.scrollTop + 300 >= document.querySelector('#entertowinSection').offsetTop) {
                    playvideo();
                    
                }
            }
           
           
        }
        
        )
    
          
   
        if (typeof window != undefined) {
            document.querySelectorAll('.new-select').forEach(select => select.addEventListener('click', function () {
                this.nextSibling.classList.remove('hide');
                this.classList.add('hide');
            }));

            document.querySelectorAll('.Give-val').forEach(item => item.addEventListener('click', function (e) {
                this.closest('.old-select').previousSibling.classList.remove('hide');
                this.closest('.old-select').classList.add('hide');

                if (this.closest('.day-select')) {
                    this.closest('.day-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;


                } else if (this.closest('.month-select')) {
                    this.closest('.month-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;

                } else if (this.closest('.year-select')) {
                    this.closest('.year-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;
                }
            }));
        }
    }, [])

    let today = new Date();
    let dd = String(("0" + today.getDate()).slice(-2));
    let mm = String(("0" + (today.getMonth() + 1)).slice(-2)); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    const [contestData, setContestData] = useState({
        webform_id: "vitamin_c_form_direction",
        firstname: "",
        lastname: "",
        email: "",
        date_of_birth: "",
        shipping_zip: "",
        subscription_date: today
    })

    const [isToday, setIsToday] = useState();
    function isValidDate(dateString) {
        // // First check for the pattern
        // if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        //     return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    };

    function errorList(form) {
        var list = '';
        var lastRadio = '';
        var listArray = []

        $(form).find(':invalid').each(function () {
            $(this).closest('.form-group').addClass('error');
            if (
                (
                    ($(this).attr('type') == 'radio' && lastRadio != $(this).attr('name')) ||
                    $(this).attr('type') != 'radio'
                ) &&
                $(this).prop("tagName").toLowerCase() != 'fieldset'
            ) {
                var isExisit = listArray.some(item => {
                    return item == $(this).attr('data-webform-required-error')
                })
                lastRadio = $(this).attr('name');
                if (!isExisit) {
                    listArray.push($(this).attr('data-webform-required-error'))
                    list += '<li class="text-danger error-li">' + $(this).attr('data-webform-required-error') + '</li>'
                }
            }

        })
        return list;
    }
    let isFormValid = false;
    let isDateValid = false;


    function handleAttr(event) {

        switch (event.target.name || event.target.attributes['data-name'].value) {

            case 'date':

                var dateOfBirth = contestData.date_of_birth.split('/');
                if (event.target.classList.contains('day')) {
                    dateOfBirth[0] = event.target.attributes['data-value'].value;
                } else if (event.target.classList.contains('month')) {
                    dateOfBirth[1] = event.target.attributes['data-value'].value;
                }
                else {
                    dateOfBirth[2] = event.target.attributes['data-value'].value;
                }
               
                dateOfBirth = dateOfBirth.join('/');
                setContestData({
                    ...contestData,
                    date_of_birth: dateOfBirth
                })


                break;
            case 'shipping_zip':
                setContestData({
                    ...contestData,
                    shipping_zip: event.target.value
                })


                break;
            // case 'email_sub':

            //     if(event.target.value == "on") {
            //         setContestData({
            //             ...contestData,
            //             email_optin: ["receivemail"]
            //         })
            //     } else {
            //         if (contestData.email_optin){ delete contestData.email_optin}
            //         setContestData({
            //             ...contestData
            //         })
            //     }

            //     break;
            default:

                break;
        }



    }
    function handleSubmit(e) {
        e.preventDefault();
        var form = document.querySelector('.needs-validation');
        // Loop over them and prevent submission
        if (form.checkValidity() === false) {
            $(".error-list-sec").html(errorList(form))
            isFormValid = false;

        } else {
            $(".error-list-sec").html('')

            isFormValid = true;

        }


        $(':invalid').change(function () {
            $(this).closest('.form-group').removeClass('error');
        })

        let userDate = contestData.date_of_birth.split("/")
        let now = new Date();
      
        let chosenDate = new Date(`${userDate[2]} ${userDate[1]} ${userDate[0]}`)
        // check date validality

        if (!isValidDate(contestData.date_of_birth) || contestData.date_of_birth === today.toString() || contestData.date_of_birth.length === 0 || chosenDate > now) {
            setIsToday(true);
            document.querySelectorAll(".form-group.select-group").forEach(item => {
                item.classList.add("error")
            });
            isDateValid = false;


        } else {
            document.querySelectorAll(".form-group.select-group").forEach(item => {
                item.classList.remove("error")
            });
            setIsToday(false);
            isDateValid = true;

        }


        if (isFormValid && isDateValid) {


            sendFormValues({ obj: contestData });


        }

    }
    function handleUpdate(event) {

        setContestData({
            ...contestData,
            [event.target.name]: event.target.value
        })



    }
    let yearsList = [];
    let currentYear = new Date().getFullYear()
    for (let i = 1900; i <= currentYear; i++) {
        yearsList.push(i.toString());
    }

    // function topFunction() {
    //     document.body.scrollTop = 0; // For Safari
    //     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // }

    const sendFormValues = (updatedItemData) => {
        let dataSubmit = updatedItemData.obj;

        document.querySelector('.submit-input').innerHTML = "SUBMITTING ..."
        if (document.querySelector('#registerCheck').checked) {
            dataSubmit.email_optin = ["receivemail"];
        } else {
            delete dataSubmit.email_optin;
        }

        let datefromate = dataSubmit.date_of_birth.split("/");
        dataSubmit.date_of_birth = [datefromate[1],datefromate[0],[datefromate[2]]].join("/")
        fetch(
            `${baseUrl}webform_rest/submit`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(dataSubmit)
            }
        )
            .then(res => res.json())
            .then(response => {
                document.querySelector('.submit-input').innerHTML = "SUBMIT";
                if (document.querySelector('#registerCheck').checked) {
                    window.fbq('track', 'Lead');
                }

                // empty form fieldsPropTypes.
                if (response.sid) {
                           thanksmodal();
                }
         
                document.querySelector('.regform').reset();
                document.querySelectorAll('.regform .select-selected').forEach(el => {
                    el.textContent = 'Select';
                })
                setContestData({
                    ...contestData,
                    date_of_birth: ""
                })
            })
            .catch(error => {
                document.querySelector('.submit-input').innerHTML = "SUBMIT"

            });
    };
    return (
        <>
            <div id="entertowinSection" className={["container-fluid register img-form", ImgForm.wrapper].join(" ")}>
                
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-5">
                                <div className="row">
                                    <div className="col-12 col-md-10 offset-md-2">
                                        <div className="video-wrapper">
                                            <div className={["img-wrap", ImgForm.videoWrapper].join(" ")}>
                                                
                                                {node.relationships.field_form_video ?
                                                    <>
                                                  
                                                        <a  href={node.relationships.field_form_video && node.relationships.field_form_video[0] ? node.relationships.field_form_video[0].field_video_link : ''} className="playbtn" onClick={playvideo}>
                                                            <img className={["playbtnimg", ImgForm.play].join(" ")} src={playbtnimg} alt="videomsg" />
                                                          
                                                        </a>
                                                        {node.relationships &&
                                                            node.relationships.field_form_video &&
                                                            node.relationships.field_form_video[0] &&
                                                            node.relationships.field_form_video[0].relationships &&
                                                            node.relationships.field_form_video[0].relationships.field_video_poster &&
                                                            node.relationships.field_form_video[0].relationships.field_video_poster.localFile ?
                                                            <Img alt="img" className={[ImgForm.videoimg, "videoposterimg"].join(" ")} fluid={node.relationships.field_form_video[0].relationships.field_video_poster.localFile.childImageSharp.fluid} />
                                                            : ""}
                                                            
                                                              <div id="v-video">
                                                  
                                                                </div>
                                                    </>
                                                    : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-none d-lg-flex">
                                    <div className="col-lg-10 pl-0">
                                        <div className={ImgForm.imgWrapper}>
                                            {node.relationships &&
                                                node.relationships.field_form_left_image &&
                                                node.relationships.field_form_left_image.localFile &&
                                                node.relationships.field_form_left_image.localFile.childImageSharp ?

                                                <Img fluid={node.relationships.field_form_left_image.localFile.childImageSharp.fluid} />

                                                : ""}

                                            {node.relationships &&
                                                node.relationships.field_form_overlay_img &&
                                                node.relationships.field_form_overlay_img.localFile &&
                                                node.relationships.field_form_overlay_img.localFile.childImageSharp ?

                                                <div className={ImgForm.overlayImg}>
                                                    <Img fluid={node.relationships.field_form_overlay_img.localFile.childImageSharp.fluid} />
                                                </div>
                                                : ""}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className={["col-12 col-lg-5 offset-lg-1", ImgForm.orange].join(" ")}>
                                <div className="row">
                                    <div className="col-12">
                                        {node.field_form_subtitle ? <div className={ImgForm.subtitle} dangerouslySetInnerHTML={{ __html: node.field_form_subtitle.processed }}></div> : ""}
                                        {node.field_form_title ? <div className={ImgForm.title} dangerouslySetInnerHTML={{ __html: node.field_form_title.processed }}></div> : ""}
                                        {node.field_form_description ? <div className={ImgForm.description} dangerouslySetInnerHTML={{ __html: node.field_form_description.processed }}></div> : ""}
                                        
                                    </div>
                                   
                                    <div className="col-12 col-lg-10 offset-lg-2">
                                        {node.field_form_mini_title ? <div id="entertowin" className={ImgForm.miniTitle} dangerouslySetInnerHTML={{ __html: node.field_form_mini_title.processed }}></div> : ""}
                                        {node.field_form_mini_subtitle ? <div className={ImgForm.miniSubtitle} dangerouslySetInnerHTML={{ __html: node.field_form_mini_subtitle.processed }}></div> : ""}

                                        <div className={ImgForm.formWrapper}>
                                            <div className="errors  errors-list">
                                                {/* <ul>
                                        {err !== undefined ? Object.entries(err).map(item => <li className="text-danger error-li">{item[1]}</li>) : ''}
                                    </ul> */}
                                                {isFormValid && isDateValid ? "" :
                                                    <ul className="error-list-sec"></ul>
                                                }
                                                {isToday == true ?
                                                    <ul>
                                                        <li className="text-danger error-li">Please submit the correct date of birth.</li>
                                                    </ul>
                                                    : ""}
                                            </div>
                                            <form noValidate="novalidate" class="regform needs-validation" >
                                                <div className="form-group">
                                                    <label for="firstname">*First name</label>
                                                    <input type="text" className="form-control" name="firstname" onChange={handleUpdate} id="firstname" required aria-describedby="firstname" placeholder="" data-webform-required-error="Please fill in your first name." />
                                                </div>

                                                <div className="form-group">
                                                    <label for="lastname">*Last name</label>
                                                    <input type="text" className="form-control" name="lastname" onChange={handleUpdate} id="lastname" required aria-describedby="lastname" placeholder="" data-webform-required-error="Please fill in your last name." />
                                                </div>

                                                <div className="form-group">
                                                    <label for="postalcode">*Postal Code</label>
                                                    <input type="text" className="form-control" name="shipping_zip" onChange={handleAttr} id="postalcode" required aria-describedby="postalcode" maxLength="5" minLength="5" placeholder="" data-webform-required-error="Please fill in your correct postal code." />
                                                </div>

                                                <div className="form-group">
                                                    <label for="mailaddress">*Email Address</label>
                                                    <input type="email" className="form-control" name="email" onChange={handleUpdate} id="mailaddress" required aria-describedby="emailHelp" placeholder="" data-webform-required-error="Please fill in your correct email." />
                                                </div>

                                                <div className="group-title">Date of Birth</div>

                                                <div className="day-mon-year">
                                                    <div className="day-month">
                                                        <div class="form-group select-group new-select  day-select">
                                                            <label for="reviewFormSelect" class="form-label">*Day</label>
                                                            <div class="select-selected">Select</div>
                                                        </div>
                                                        <div className="form-group select-group  old-select day-select hide">
                                                            <label for="reviewFormSelect" className="form-label">*Day</label>
                                                            <div className="select-wrap">
                                                                <Scrollbars style={{ height: 200 }}>
                                                                    <div className="form-control" id="reviewFormSelectDay">
                                                                        {
                                                                            Array.apply(null, { length: 32 }).map(Function.call, Number).map((day) => {
                                                                                if (day > 0)
                                                                                    return <div className="Give-val day" data-value={day < 10 ? `0${day}` : day} data-name='date' onClick={handleAttr}>{day < 10 ? `0${day}` : day}</div>
                                                                            })
                                                                        }

                                                                    </div>
                                                                </Scrollbars>
                                                            </div>
                                                        </div>
                                                        <div class="form-group select-group new-select  month-select">
                                                            <label for="reviewFormSelect" class="form-label">*Month</label>
                                                            <div class="select-selected">Select</div>
                                                        </div>
                                                        <div className="form-group select-group old-select  month-select hide">
                                                            <label for="reviewFormSelect" className="form-label">*Month</label>
                                                            <div className="select-wrap" >
                                                                <Scrollbars style={{ height: 200 }}>

                                                                    <div required className="form-control" name="date" id="reviewFormSelect">

                                                                        <div className="Give-val month" data-value="01" data-name="date" onClick={handleAttr}>January</div >
                                                                        <div className="Give-val month" data-value="02" data-name="date" onClick={handleAttr}>February</div >
                                                                        <div className="Give-val month" data-value="03" data-name="date" onClick={handleAttr}>March</div >
                                                                        <div className="Give-val month" data-value="04" data-name="date" onClick={handleAttr}>April</div >
                                                                        <div className="Give-val month" data-value="05" data-name="date" onClick={handleAttr}>May</div >
                                                                        <div className="Give-val month" data-value="06" data-name="date" onClick={handleAttr}>June</div >
                                                                        <div className="Give-val month" data-value="07" data-name="date" onClick={handleAttr}>July</div >
                                                                        <div className="Give-val month" data-value="08" data-name="date" onClick={handleAttr}>August</div >
                                                                        <div className="Give-val month" data-value="09" data-name="date" onClick={handleAttr}>September</div >
                                                                        <div className="Give-val month" data-value="10" data-name="date" onClick={handleAttr}>October</div >
                                                                        <div className="Give-val month" data-value="11" data-name="date" onClick={handleAttr}>November</div >
                                                                        <div className="Give-val month" data-value="12" data-name="date" onClick={handleAttr}>December</div >

                                                                    </div>
                                                                </Scrollbars>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="form-group select-group new-select  year-select">
                                                        <label for="reviewFormSelect" class="form-label">*Year</label>
                                                        <div class="select-selected">Select</div>
                                                    </div>

                                                    <div className="form-group select-group old-select  year-select hide">
                                                        <label for="reviewFormSelect" className="form-label">*Year</label>

                                                        <div className="select-wrap">
                                                            <Scrollbars style={{ height: 200 }}>
                                                                <div required className="form-control" name="date" id="reviewFormSelectYear">

                                                                    {yearsList.reverse().map((item, index) => {
                                                                        return (
                                                                            <div className="Give-val year" data-value={item} data-name="date" onClick={handleAttr}>{item}</div >
                                                                        )
                                                                    })}
                                                                </div>
                                                            </Scrollbars>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="form-check">

                                                    <label className="form-check-label terms" for="registerCheck">
                                                        <input type="checkbox" name="email_sub" onChange={handleAttr} className="form-check-input" id="registerCheck" defaultChecked={true} />
                                                        <span className="checkmark"></span>
                                                        <span>Yes, I want to receive emails to keep up with the latest products, skin care trends, and offers from Obagi. By submitting an entry, your information will be collected and used in the US subject to our US <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms-of-use">Terms of Use</Link>. For US consumers only.
                                    </span>
                                                    </label>
                                                </div>
                                                
                                                <div className="submit-wrapper">
                                                    <button type="submit" onClick={(e) => { handleSubmit(e); }}


                                                        className="submit-input"  >Submit</button>
                                                </div>

                                            </form>

                                        </div>
                                    </div>

                                </div>
               
                            </div>
                        </div>
                    </div>
                </div>
                {node.relationships &&
                                    node.relationships.field_form_background_img &&
                                    node.relationships.field_form_background_img.localFile &&
                                    node.relationships.field_form_background_img.localFile.childImageSharp ?
                                    <div className={ImgForm.bgImg}>
                                        <img src={node.relationships.field_form_background_img.localFile.childImageSharp.original.src} />
                                    </div>
                                    : ""}
                  
            </div>

            <div class="modal hidden" id="youarein">
                <div class="container">


                    <div className={ImgForm.boxes}>
                        <div class="modal-body">
                            <div className="modal-header">
                                <button onClick={(e) => { removemodal(e) }} className="close"></button>
                            </div>
                            <div className={ImgForm.Lines}>
                         {node.field_confirmation_massage_title ?       <div className={ImgForm.msgTitle} dangerouslySetInnerHTML={{ __html: node.field_confirmation_massage_title.processed }}></div>
                           :""}{node.field_confirmation_massage_descr?     <div className={ImgForm.msgDescrib} dangerouslySetInnerHTML={{ __html: node.field_confirmation_massage_descr.processed }}></div>:""}
                             {node.field_confirmation_massage_link_?   <a

                                    onClick={(e) => { removemodal(e, true,"#toSection"); }}
                                    className={ImgForm.msgLink} href="#toSection">
                                    {node.field_confirmation_massage_link_}


                                </a> :""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ImagesForm
