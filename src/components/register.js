import React, { useState, useEffect, useContext } from 'react';
import { navigate, Link } from "gatsby"
import UserContext from '../providers/user-provider';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
// import $ from 'jquery'
import '../assets/css/override.css';
import Scrollbars from 'react-custom-scrollbars';
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
const $ = require('jquery')
const Register = () => {
    const size = useWindowSize();
    let screenWidth = size.width;
    let largeScreen = 992;
    const [validForm, setValidForm] = useState(false);

    const { user, err, handleRegister, isLoading } = useContext(UserContext);

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

    if (user) {
        if (typeof window !== 'undefined') {
            navigate('/my-account/orders');
        }
    }


    const [isPassMatch, setIsPassMatch] = useState();
    const [passConfirm, setPassConfirm] = useState(false);

    function checkPassMatch(event) {
        //compare pass
        let confPass = '';
        let check = false;
        if (event.target.name === 'password') {
            confPass = document.querySelector('.conf-password').value;
        } else {
            confPass = document.querySelector('.password').value;
        }

        if (confPass === event.target.value) {
            setIsPassMatch(true);
            check = true;
            $('.submit-input').removeAttr('disabled');
        } else {
            setIsPassMatch(false);
            check = false;

            $('.submit-input').attr('disabled', 'disabled');


        }


        return check;
    }

    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        authentication: {
            force_password_reset: false,
            new_password: "",
        },
        attributes: [
            {
                // Date of birth
                attribute_id: 1,
                attribute_value: "",
            },

            {
                // Postal Code
                attribute_id: 2,
                attribute_value: "",
            },

            {
                // email subscribtion
                attribute_id: 4,
                attribute_value: "yes",
            }
        ]
    })


    function handleUpdate(event) {

        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        });



    }

    function handlePassword(event) {
        if (checkPassMatch(event)) {

            setNewUser({
                ...newUser,
                authentication: {
                    ...newUser.authentication,
                    new_password: event.target.value
                }

            })


        } else {


            return false;
        }
    }

    // Date format must be yyyy/mm/dd
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

    function handleAttr(event) {

        switch (event.target.name || event.target.attributes['data-name'].value) {

            case 'date':

                var dateOfBirth = newUser.attributes[0].attribute_value.split('-');
                if (event.target.classList.contains('day')) {
                    dateOfBirth[2] = event.target.attributes['data-value'].value;
                } else if (event.target.classList.contains('month')) {
                    dateOfBirth[1] = event.target.attributes['data-value'].value;
                } else {
                    dateOfBirth[0] = event.target.attributes['data-value'].value;
                }
                dateOfBirth = dateOfBirth.join('-');

                setNewUser({
                    ...newUser,
                    attributes: newUser.attributes.map(item => {
                        if (item.attribute_id === 1) {
                            item.attribute_value = dateOfBirth;
                        }
                        return item;
                    })
                })


                break;
            case 'postal_code':
                setNewUser({
                    ...newUser,
                    attributes: newUser.attributes.map(item => {
                        if (item.attribute_id === 2) {
                            item.attribute_value = event.target.value;
                        }
                        return item;
                    })
                })


                break;
            case 'email_sub':
                setNewUser({
                    ...newUser,
                    attributes: newUser.attributes.map(item => {
                        if (item.attribute_id === 4) {
                            item.attribute_value = event.target.checked ? 'yes' : 'no';
                            
                        }
                        return item;
                    })
                })


                break;
            default:

                break;
        }


    }
    let today = new Date();
    let dd = String(("0" + today.getDate()).slice(-2));
    let mm = String(("0" + (today.getMonth() + 1)).slice(-2)); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;


    const [isToday, setIsToday] = useState();
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
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

        let userDate = newUser.attributes[0].attribute_value.split("-")
        let now = new Date();
        let chosenDate = new Date(`${userDate[2]} ${userDate[1]} ${userDate[0]}`)
        // check date validality
        if (!isValidDate(newUser.attributes[0].attribute_value) || newUser.attributes[0].attribute_value === today.toString() || newUser.attributes[0].attribute_value.length === 0 || chosenDate > now) {
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


            handleRegister(newUser);
            if (document.querySelector('input[name="email_sub"]')) {
                
            //window.fbq('track', 'Lead');
            window.dataLayer.push({
                'event': 'fb_tags_trigger',
                'fb_event_name': 'Lead'
              });
            
            }


        }

    }

    let yearsList = [];
    let currentYear = new Date().getFullYear()
    for (let i = 1900; i <= currentYear; i++) {
        yearsList.push(i.toString());
    }


    return (
        <>
            {isLoading ?
                <div>
                    <ClipLoader
                        css={spinner}
                        size={150}
                        color={"#123abc"}
                    />
                </div>
                : ""}
            <div className="container-fluid register">

                <div className="row">
                    <div className="col-12 col-lg-3 offset-lg-1">
                        {screenWidth < largeScreen ?
                            <button className="question-header collapsed" data-toggle="collapse" data-target="#register" aria-expanded="false" aria-controls="register">
                                Why Register?
                            </button>
                            :
                            <div className="question-header">Why Register?</div>
                        }
                        <div id={screenWidth < largeScreen ? "register" : ""} className={screenWidth < largeScreen ? "collapse benefits-wrapper" : "benefits-wrapper"} aria-labelledby={screenWidth < largeScreen ? "headingOne" : ""}>

                            <div className="benefits-subwrapper">
                                <div className="benefit-number">1</div>
                                <div className="title-text">
                                    <div className="benefits-title">Complimentary Shipping</div>
                                    <div className="benefits-text">Registered members receive complimentary shipping on orders of $125 or more.</div>
                                </div>
                            </div>

                            <div className="benefits-subwrapper">
                                <div className="benefit-number">2</div>
                                <div className="title-text">
                                    <div className="benefits-title">Fast Checkout</div>
                                    <div className="benefits-text">Safely save your shipping and payment information in your account.</div>
                                </div>
                            </div>

                            <div className="benefits-subwrapper">
                                <div className="benefit-number">3</div>
                                <div className="title-text">
                                    <div className="benefits-title">Exclusive Access</div>
                                    <div className="benefits-text">Registered members receive first access to new product announcements and insights on the latest formulas and innovations.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">

                        <div className="required-field">*Required fields</div>
                        <div className="errors  errors-list">
                            <ul>
                                {err !== undefined ? Object.entries(err).map(item => <li className="text-danger error-li">{item[1]}</li>) : ''}
                            </ul>
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
                                <label for="phonenum">Phone Number (Optional)</label>
                                <input type="tel" className="form-control" name="phone" onChange={handleUpdate} id="phonenum" aria-describedby="phonenumber" placeholder="" />
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

                            <div className="group-title">Create Password</div>


                            <div className="form-group">
                                <label for="pwd">*Password</label>
                                <input required type="password" className={`form-control password ${((isPassMatch == false) && passConfirm) ? 'text-warning' : ''}`} onKeyUp={handlePassword} name="password" id="pwd" aria-describedby="password" placeholder="" data-webform-required-error="Please fill in a password." />
                            </div>

                            <div className="form-group">
                                <label for="confpwd">*Confirm Password</label>
                                <input required type="password" className={`form-control conf-password ${((isPassMatch == false) && passConfirm) ? 'text-warning' : ''}`} onKeyUp={handlePassword} onBlur={(e) => { setPassConfirm(true) }} name="confirmpassword" id="confpwd" aria-describedby="confirmpassword" placeholder="" data-webform-required-error="Please confirm password." />
                            </div>

                            <p className={`form-control ${((isPassMatch == false) && passConfirm) ? 'text-warning' : 'd-none'}`}> Password doesn't match</p>
                            <p id="json-errors"></p>

                            <div className="form-check">

                                <label className="form-check-label terms" for="registerCheck">
                                    <input type="checkbox" name="email_sub" onChange={handleAttr} className="form-check-input" id="registerCheck" defaultChecked={true} />
                                    <span className="checkmark"></span>
                                    <span>Yes, I want to receive emails to keep up with the latest products, skin care trends, and offers from Obagi. By registering, your information will be collected and used in the US subject to our US <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms-of-use">Terms of Use</Link>. For US consumers only.
                                    </span>
                                </label>
                            </div>

                            <div className="submit-wrapper">
                                <button type="submit" onClick={(e) => { handleSubmit(e); topFunction(e) }}


                                    className="submit-input"  >Create Account</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
            {/* } */}
        </>
    )

}


function useWindowSize() {

    // Initialize state with undefined width/height so server and client renders match

    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

    const [windowSize, setWindowSize] = useState({

        width: undefined

    });



    useEffect(() => {


        // Handler to call on window resize

        function handleResize() {

            // Set window width/height to state

            setWindowSize({

                width: window.innerWidth

            });

        }



        // Add event listener

        window.addEventListener("resize", handleResize);



        // Call handler right away so state gets updated with initial window size

        handleResize();



        // Remove event listener on cleanup

        return () => window.removeEventListener("resize", handleResize);

    }, []); // Empty array ensures that effect is only run on mount



    return windowSize;

}


export default Register

