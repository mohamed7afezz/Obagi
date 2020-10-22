import React, { useState, useEffect, useContext } from 'react';
import { navigate, Link } from "gatsby"
import LoginMenu from "./login-menu"
import { CustomSelect } from '../assets/js/custom-select'
import UserContext from '../providers/user-provider';
import { map } from 'jquery';
import $ from 'jquery'
import '../assets/css/override.css';
const Register = () => {
    const size = useWindowSize();
    let screenWidth = size.width;
    let largeScreen = 992;

    const {user, err, handleRegister} = useContext(UserContext);

    if(user) {
        if(typeof window !== 'undefined') {
            navigate('/my-account/orders');
        }
    }
    function checkvaild(){
        
        if (!document.querySelector(".regform").checkValidity()) {
            // console.log( document.querySelector(".regform").validationMessage)
          } else {
            // console.log("hassan",document.querySelector(".regform").checkValidity())
          } 
    }
    useEffect(() => {
        // if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
        //     // CustomSelect();

        //     //the issue is here
        //     // document.querySelectorAll('input[type="date"]').forEach(item => {
        //     //     item.addEventListener('change', handleAttr)
        //     // });
        // }
    });

    const [isPassMatch, setIsPassMatch] = useState();

    function checkPassMatch(event) {
        //compare pass
        let confPass = '';
        let check = false;
        if(event.target.name === 'password') {
            confPass = document.querySelector('.conf-password').value;
        } else {
            confPass = document.querySelector('.password').value;
        }

        if(confPass === event.target.value) {
            setIsPassMatch(true);
            check = true;
            $('.submit-input').removeAttr('disabled');
        } else {
            setIsPassMatch(false);
            check = false;
            // document.querySelectorAll(".submit-input").disabled = true;
            $('.submit-input').attr('disabled','disabled');


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
        if(checkPassMatch(event)) {
           
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

    function handleAttr(event) {
        

        switch (event.target.name) {
            
            case 'date':
                

                
                // var dateOfBirth = newUser.attributes[0].attribute_value.split('-');
                // if(event.target.classList.contains('day')) {
                //     dateOfBirth[2] = event.target.value
                // } else if (event.target.classList.contains('month')) {
                //     dateOfBirth[1] = event.target.value
                // } else {
                //     dateOfBirth[0] = event.target.value
                // }
                // dateOfBirth = dateOfBirth.join('-');

                
                setNewUser({
                    ...newUser,
                    attributes: newUser.attributes.map(item => {
                        if(item.attribute_id === 1) {
                            item.attribute_value = event.target.value;
                        }
                        return item;
                    })
                })

                break;
            case 'postal_code':
                setNewUser({
                    ...newUser,
                    attributes: newUser.attributes.map(item => {
                        if(item.attribute_id === 2) {
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
                        if(item.attribute_id === 4) {
                            item.attribute_value = event.target.checked? 'yes' : 'no';
                        }
                        return item;
                    })
                })
                break;
            default:
                console.log('not in the attributes');
                break;
        }
       
    }



    function handleSubmit(event) {
        event.preventDefault();
        handleRegister(newUser);
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

                        <div className={`errors ${err != undefined? 'errors bg-light' : ''}`}>
                            <ul>
                                {err !== undefined? Object.entries(err).map(item => <li className="text-danger">{item[1]}</li>): ''}
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
                                    <div className="form-group select-group">
                                        <label for="reviewFormSelect" className="form-label">*Day</label>
                                        {/* <div className="select-wrapper custom-select"> */}
                                            <input required className="form-control day" name="date" type="date" id="reviewFormSelect" onChange={handleAttr}/>
                                                {/* <option>Select</option>
                                                <option>Select</option>
                                                <option value="01">1</option>
                                                <option value="02">2</option>
                                                <option value="03">3</option>
                                                <option value="04">4</option>
                                                <option value="05">5</option>
                                            </select> */}
                                        {/* </div> */}
                                    </div>
{/* 
                                    <div className="form-group select-group">
                                        <label for="reviewFormSelect" className="form-label">*Month</label>
                                        <div className="select-wrapper custom-select" >
                                            <select required className="form-control month" name="date" id="reviewFormSelect">
                                                <option>Select</option>
                                                <option>Select</option>
                                                <option value="01">1</option>
                                                <option value="02">2</option>
                                                <option value="03">3</option>
                                                <option value="04">4</option>
                                                <option value="05">5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group select-group">
                                <label for="reviewFormSelect" className="form-label">*Year</label>
                                <div className="select-wrapper custom-select">
                                    <select required className="form-control year" name="date" id="reviewFormSelect">
                                        <option>Select</option>
                                        <option>Select</option>
                                        <option value="1999">1999</option>
                                        <option value="1998">1998</option>
                                        <option value="1997">1997</option>
                                        <option value="1996">1996</option>
                                        <option value="1995">1995</option>
                                    </select>
                                </div>  */}
                            </div>
                            </div>

                            <div className="group-title">Create Password</div>


                            <div className="form-group">
                                <label for="pwd">*Password</label>
                                <input required type="password" className={`form-control password ${isPassMatch == false? 'text-warning' : ''}`} onKeyUp={handlePassword} name="password" id="pwd" aria-describedby="password" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label for="confpwd">*Confirm Password</label>
                                <input required type="password" className={`form-control conf-password ${isPassMatch == false? 'text-warning' : ''}`} onKeyUp={handlePassword} name="confirmpassword" id="confpwd" aria-describedby="confirmpassword" placeholder="" />
                            </div>

                            <p className={`form-control ${isPassMatch == false? 'text-warning' : 'd-none'}`}> Pass doesn't match</p>
                            <p id="json-errors"></p>

                            <div className="form-check">

                                <label className="form-check-label terms" for="registerCheck">
                                    Yes, I want to receive emails to keep up with the latest products, skin care trends, and offers from Obagi. By registering, your information will be collected and used in the US subject to our US <Link to="#">Privacy Policy</Link> and <Link to="#">Terms of Use</Link>. For US consumers only.
                                    <input type="checkbox" name="email_sub" onChange={handleAttr} className="form-check-input" id="registerCheck" defaultChecked={true}/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>

                            <div className="submit-wrapper">
                                <input onClick={() => checkvaild()} className="submit-input" type="submit" value="Create Account"/>
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

