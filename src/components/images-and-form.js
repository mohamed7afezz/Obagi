import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import ImgForm from '../assets/scss/components/images-and-form.module.scss'
import Player from '@vimeo/player'
import playbtnimg from "../assets/images/product-images/PlayVideo.svg"
import Scrollbars from 'react-custom-scrollbars';

const $ = require("jquery");
function playvideo(event) {
    let iframeContainer, player, playerOpts = {
        url: ''
    }

    let url = event.target.parentNode.getAttribute("href");
    playerOpts.url = url;

    if (!playerOpts.url.indexOf('youtube') > -1) {
        document.querySelector('.video-popup-wrap').innerHTML = '<iframe class="embed-responsive-item" src="' + url + '?rel=0&autoplay=true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

        return;
    }

    player = new Player.Vimeo(document.querySelector('#VideoPopUp iframe'), playerOpts);

    player.play();


}

const ImagesForm = ({ node }) => {
    const baseUrl = process.env.Base_URL;
    useEffect(() => {
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

    today = yyyy + '/' + mm + '/' + dd;
    const [contestData, setContestData] = useState({
        firstname : "",
        lastname : "",
        email : "",
        date_of_birth : "",
        shipping_zip: "",
        email_optin:["receivemail"],
        subscription_date: today
    })

    const [isToday, setIsToday] = useState();
    function isValidDate(dateString) {
        // // First check for the pattern
        // if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        //     return false;

        // Parse the date parts to integers
        var parts = dateString.split("-");
        var day = parseInt(parts[2], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[0], 10);

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

                var dateOfBirth = []
                if (event.target.classList.contains('day')) {
                    dateOfBirth[2] = event.target.attributes['data-value'].value;
                } else if (event.target.classList.contains('month')) {
                    dateOfBirth[1] = event.target.attributes['data-value'].value;
                } else {
                    dateOfBirth[0] = event.target.attributes['data-value'].value;
                }
                dateOfBirth = dateOfBirth.join('/');

                setContestData({
                    ...contestData,
                    date_of_birth : dateOfBirth
                })


                break;
            case 'postal_code':
                setContestData({
                    ...contestData,
                    shipping_zip : event.target.value
                })


                break;
            case 'email_sub':
                setContestData({
                    ...contestData,
                    email_optin : event.target.value
                })


                break;
            default:

                break;
        }


    }
    function handleSubmit(e) {
        let contestData = {"webform_id" : "vitamin_c_form_direction"}
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


        if (isFormValid && isDateValid) {


            sendFormValues({obj: contestData});


        }

    }
    function handleUpdate(event) {

        setContestData({
            ...contestData,
            [event.target.name] : event.target.value
        })



    }
    let yearsList = [];
    let currentYear = new Date().getFullYear()
    for (let i = 1900; i <= currentYear; i++) {
        yearsList.push(i.toString());
    }

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
               
            })
            .catch(error => {
             
            });
    };
    return (


        <div className="container-fluid register">
            <div className="row">
                <div className="col-12">
                    <div className="video-wrapper">
                        <div className={["img-wrap", ImgForm.imageWrap].join(" ")}>
                            {node.relationships.field_form_video ?
                                <>
                                    <a className="popupvideo" data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href={node.relationships.field_form_video ? node.relationships.field_form_video.field_video_link : ''} className="playbtn">
                                        <img className={["playbtnimg", ImgForm.play].join(" ")} src={playbtnimg} alt="videomsg" />
                                    </a>
                                    {node.relationships &&
                                        node.relationships.field_form_video &&
                                        node.relationships.field_form_video.relationships &&
                                        node.relationships.field_form_video.relationships.field_video_poster &&
                                        node.relationships.field_form_video.relationships.field_video_poster.localFile ?
                                        <Img alt="img" className={ImgForm.videoimg} fluid={node.relationships.field_form_video.relationships.field_video_poster.localFile.childImageSharp.fluid} />
                                        : ""}
                                </>
                                : ""
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    {node.field_form_subtitle ? <div className={ImgForm.subtitle} dangerouslySetInnerHTML={{ __html: node.field_form_subtitle.processed }}></div> : ""}
                    {node.field_form_title ? <div className={ImgForm.title} dangerouslySetInnerHTML={{ __html: node.field_form_title.processed }}></div> : ""}
                    {node.field_form_description ? <div className={ImgForm.description} dangerouslySetInnerHTML={{ __html: node.field_form_description.processed }}></div> : ""}
                </div>
                <div className="col-12">
                    {node.relationships.field_form_mini_title ? <div className={ImgForm.miniTitle} dangerouslySetInnerHTML={{ __html: node.relationships.field_form_mini_title.processed }}></div> : ""}
                    {node.relationships.field_form_mini_subtitle ? <div className={ImgForm.miniSubtitle} dangerouslySetInnerHTML={{ __html: node.relationships.field_form_mini_subtitle.processed }}></div> : ""}

                    <div className={ImgForm.formWrapper}>

                        <form noValidate="novalidate" class="regform needs-validation" >
                            <div className="form-group">
                                <label for="firstname">*First name</label>
                                <input type="text" className="form-control" name="first_name" onChange={handleUpdate} id="firstname" required aria-describedby="firstname" placeholder="" data-webform-required-error="Please fill in your first name." />
                            </div>

                            <div className="form-group">
                                <label for="lastname">*Last name</label>
                                <input type="text" className="form-control" name="last_name" onChange={handleUpdate} id="lastname" required aria-describedby="lastname" placeholder="" data-webform-required-error="Please fill in your last name." />
                            </div>

                            <div className="form-group">
                                <label for="postalcode">*Postal Code</label>
                                <input type="text" className="form-control" name="postal_code" onChange={handleAttr} id="postalcode" required aria-describedby="postalcode" maxLength="5" minLength="5" placeholder="" data-webform-required-error="Please fill in your correct postal code." />
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
                                    <span>Yes, I want to receive emails to keep up with the latest products, skin care trends, and offers from Obagi. By regarding, your information will be collected and used in the US subject to our US <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms-of-use">Terms of Use</Link>. For US consumers only.
                                    </span>
                                </label>
                            </div>

                            <div className="submit-wrapper">
                                <button type="submit" onClick={(e) => { handleSubmit(e); topFunction(e) }}


                                    className="submit-input"  >Submit</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ImagesForm

export const fragment = graphql`
    fragment paragraphImagesAndForm on paragraph__images_and_form {
        id
        field_form_subtitle {
            processed
          }
          field_form_title {
            processed
          }
          field_form_description {
            processed
          }
          field_form_mini_title {
            processed
          }
          field_form_mini_subtitle {
            processed
          }
          relationships {
            field_form_background_img {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            field_form_left_image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            field_form_overlay_img {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            field_form_video {
              field_video_link
              relationships {
                field_video_poster {
                  localFile {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            
          }
        }
        
    }
      
      
`;
