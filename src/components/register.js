import React, { useState, useEffect } from 'react';
import { navigate, Link } from "gatsby"
import LoginMenu from "./login-menu"
import { CustomSelect } from '../assets/js/custom-select'

const Register = () => {
    const size = useWindowSize();
    let screenWidth = size.width;
    let largeScreen = 992;


    useEffect(() => {
        if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
            CustomSelect();
        }
    })



    return (
        <>
            <div className="container-fluid register">

                <div className="row">
                    <div className="col-12 col-lg-3 offset-lg-1">
                        {screenWidth < largeScreen ?
                            <button class="question-header collapsed" data-toggle="collapse" data-target="#register" aria-expanded="false" aria-controls="register">
                                Why Register?
                            </button>
                            :
                            <div className="question-header">Why Register?</div>
                        }
                        <div id={screenWidth < largeScreen ? "register" : ""} class={screenWidth < largeScreen ? "collapse benefits-wrapper" : "benefits-wrapper"} aria-labelledby={screenWidth < largeScreen ? "headingOne" : ""}>

                            <div className="benefits-subwrapper">
                                <div className="benefit-number">1</div>
                                <div className="title-text">
                                    <div className="benefits-title">Complimentary Shipping</div>
                                    <div className="benefits-text">Registered members receive complimentary shipping on orders of $100 or more.</div>
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

                        <form>
                            <div class="form-group">
                                <label for="firstname">*First name</label>
                                <input type="text" class="form-control" name="first" id="firstname" aria-describedby="firstname" placeholder="" />
                            </div>

                            <div class="form-group">
                                <label for="lastname">*Last name</label>
                                <input type="text" class="form-control" name="lname" id="lastname" aria-describedby="lastname" placeholder="" />
                            </div>

                            <div class="form-group">
                                <label for="postalcode">*Postal Code</label>
                                <input type="text" class="form-control" name="postalcode" id="postalcode" aria-describedby="postalcode" placeholder="" />
                            </div>

                            <div class="form-group">
                                <label for="phonenum">Phone Number (Optional)</label>
                                <input type="tel" class="form-control" name="phone" id="phonenum" aria-describedby="phonenumber" placeholder="" />
                            </div>

                            <div class="form-group">
                                <label for="mailaddress">*Email Address</label>
                                <input type="email" class="form-control" name="email" id="mailaddress" aria-describedby="emailHelp" placeholder="" />
                            </div>

                            <div className="group-title">Date of Birth</div>

                            <div className="day-mon-year">
                                <div className="day-month">
                                    <div class="form-group select-group">
                                        <label for="reviewFormSelect" className="form-label">*Day</label>
                                        <div className="select-wrapper custom-select">
                                            <select class="form-control" id="reviewFormSelect">
                                                <option>Select</option>
                                                <option>Select</option>
                                                <option>5 Star</option>
                                                <option>4 Stars</option>
                                                <option>3 Star</option>
                                                <option>2 Star</option>
                                                <option>1 Star</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group select-group">
                                        <label for="reviewFormSelect" className="form-label">*Month</label>
                                        <div className="select-wrapper custom-select">
                                            <select class="form-control" id="reviewFormSelect">
                                                <option>Select</option>
                                                <option>Select</option>
                                                <option>5 Star</option>
                                                <option>4 Stars</option>
                                                <option>3 Star</option>
                                                <option>2 Star</option>
                                                <option>1 Star</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group select-group">
                                <label for="reviewFormSelect" className="form-label">*Year</label>
                                <div className="select-wrapper custom-select">
                                    <select class="form-control" id="reviewFormSelect">
                                        <option>Select</option>
                                        <option>Select</option>
                                        <option>5 Star</option>
                                        <option>4 Stars</option>
                                        <option>3 Star</option>
                                        <option>2 Star</option>
                                        <option>1 Star</option>
                                    </select>
                                </div>
                            </div>
                            </div>

                            <div className="group-title">Create Password</div>


                            <div class="form-group">
                                <label for="pwd">*Password</label>
                                <input type="password" class="form-control" name="password" id="pwd" aria-describedby="password" placeholder="" />
                            </div>

                            <div class="form-group">
                                <label for="confpwd">*Confirm Password</label>
                                <input type="password" class="form-control" name="confirmpassword" id="confpwd" aria-describedby="confirmpassword" placeholder="" />
                            </div>

                            <div class="form-check">

                                <label class="form-check-label terms" for="registerCheck">
                                    Yes, I want to receive emails to keep up with the latest products, skin care trends, and offers from Obagi. By registering, your information will be collected and used in the U.S. subject to our U.S. <Link to="#">Privacy Policy</Link> and <Link to="#">Terms of Use</Link>. For U.S. consumers only.
                                    <input type="checkbox" class="form-check-input" id="registerCheck" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>

                            <div className="submit-wrapper">
                                <input className="submit-input" type="submit" value="Create Account" />
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

