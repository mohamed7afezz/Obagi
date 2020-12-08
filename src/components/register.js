import React, { useState, useEffect, useContext } from 'react';
import { navigate, Link } from "gatsby"
import LoginMenu from "./login-menu"
import { CustomSelect } from '../assets/js/custom-select'
import UserContext from '../providers/user-provider';
import { map } from 'jquery';
import $ from 'jquery'
import '../assets/css/override.css';
import Scrollbars from 'react-custom-scrollbars';
const Register = () => {
    const size = useWindowSize();
    let screenWidth = size.width;
    let largeScreen = 992;

    const { user, err, handleRegister } = useContext(UserContext);
    useEffect(() => {
        if(typeof window != undefined) {
            // console.log("ashhh", yearsList)
            document.querySelectorAll('.new-select').forEach(select => select.addEventListener('click',function(){
                this.nextSibling.classList.remove('hide');
                this.classList.add('hide');
            }));
            
            document.querySelectorAll('.Give-val').forEach(item => item.addEventListener('click',function(e){
                this.closest('.old-select').previousSibling.classList.remove('hide');
                this.closest('.old-select').classList.add('hide');
                
                if(this.closest('.day-select')){
                    this.closest('.day-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;
                //  $('input[name="day"]').val()=$(this).attr('value')
    
                }else if(this.closest('.month-select')){
                    this.closest('.month-select').previousSibling.querySelector('.select-selected').innerHTML = this.innerHTML;
                    
                }else if(this.closest('.year-select')){
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
    function checkvaild() {

        if (!document.querySelector(".regform").checkValidity()) {
            // console.log( document.querySelector(".regform").validationMessage)
        } else {
            // console.log("hassan",document.querySelector(".regform").checkValidity())
        }
    }
    // useEffect(() => {
    //     if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
    //         CustomSelect();

    //         //the issue is here
       
    //     }
    //     // document.querySelectorAll('.Give-val').forEach(item => {
    //     //     item.addEventListener('click', handleAttr)
    //     // });
    // });

    const [isPassMatch, setIsPassMatch] = useState();

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
            // document.querySelectorAll(".submit-input").disabled = true;
            $('.submit-input').attr('disabled', 'disabled');


        }

        // console.log("dis", document.querySelectorAll(".submit-input").disabled)

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
                attribute_value: "no",
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
                // console.log("ashhuser", newUser)

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
        // console.log("ashhuser", newUser)

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
        // console.log("ashhuser", newUser)

                break;
            default:
                // console.log('not in the attributes');
                break;
        }


    }
    let today = new Date();
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    // console.log("today", today)

    // console.log("ashhh input", newUser.attributes[0].attribute_value, newUser.attributes[0].attribute_value.type, today.toString())

    const [isToday, setIsToday] = useState();

    function handleSubmit(event) {
        event.preventDefault();
        // check date validality
        if (!isValidDate(newUser.attributes[0].attribute_value) || newUser.attributes[0].attribute_value === today.toString()) {
            // show error message for date of birth field
            // console.log('bahiii', 'date wrong')
            setIsToday(true);
            return false;
        }
        handleRegister(newUser);
    }

    let yearsList = [];
    let currentYear = new Date().getFullYear()
    for (let i = 1900; i <= currentYear; i++) {
        yearsList.push(i.toString());
    }
    

    return (
        <>
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

                        <div className={`errors ${err != undefined ? 'errors bg-light' : ''}`}>
                            <ul>
                                {err !== undefined ? Object.entries(err).map(item => <li className="text-danger">{item[1]}</li>) : ''}
                                {isToday == true ? <li className="text-danger">Please submit the correct date of birth.</li> : ""}
                            </ul>

                        </div>

                        <form class="regform" onSubmit={e => {
                            handleSubmit(e);

                        }}>
                            <div className="form-group">
                                <label for="firstname">*First name</label>
                                <input type="text" className="form-control" name="first_name" onChange={handleUpdate} id="firstname" required aria-describedby="firstname" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label for="lastname">*Last name</label>
                                <input type="text" className="form-control" name="last_name" onChange={handleUpdate} id="lastname" required aria-describedby="lastname" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label for="postalcode">*Postal Code</label>
                                <input type="text" className="form-control" name="postal_code" onChange={handleAttr} id="postalcode" required aria-describedby="postalcode" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label for="phonenum">Phone Number (Optional)</label>
                                <input type="tel" className="form-control" name="phone" onChange={handleUpdate} id="phonenum" aria-describedby="phonenumber" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label for="mailaddress">*Email Address</label>
                                <input type="email" className="form-control" name="email" onChange={handleUpdate} id="mailaddress" required aria-describedby="emailHelp" placeholder="" />
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
                                                        Array.apply(null, {length: 32}).map(Function.call, Number).map((day) => {
                                                            if(day > 0)
                                                                return <div className="Give-val day" data-value={day < 10? `0${day}` : day} data-name='date' onClick={handleAttr}>{day < 10? `0${day}` : day}</div>
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
                                <input required type="password" className={`form-control password ${isPassMatch == false ? 'text-warning' : ''}`} onKeyUp={handlePassword} name="password" id="pwd" aria-describedby="password" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label for="confpwd">*Confirm Password</label>
                                <input required type="password" className={`form-control conf-password ${isPassMatch == false ? 'text-warning' : ''}`} onKeyUp={handlePassword} name="confirmpassword" id="confpwd" aria-describedby="confirmpassword" placeholder="" />
                            </div>

                            <p className={`form-control ${isPassMatch == false ? 'text-warning' : 'd-none'}`}> Password doesn't match</p>
                            <p id="json-errors"></p>

                            <div className="form-check">

                                <label className="form-check-label terms" for="registerCheck">
                                    Yes, I want to receive emails to keep up with the latest products, skin care trends, and offers from Obagi. By registering, your information will be collected and used in the US subject to our US <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms-of-use">Terms of Use</Link>. For US consumers only.
                                    <input type="checkbox" name="email_sub" onChange={handleAttr} className="form-check-input" id="registerCheck" defaultChecked={true} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>

                            <div className="submit-wrapper">
                                <input onClick={() => checkvaild()} className="submit-input" type="submit" value="Create Account" />
                            </div>

                        </form>
                    </div>

                </div>
            </div>

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

