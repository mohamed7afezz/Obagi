import React, { useContext, useState,useEffect } from "react"
import { navigate, Link } from "gatsby"
// import { handleLogin, isLoggedIn } from "../services/auth"
import UserContext from "../providers/user-provider"
import LoginMenu from '../components/login-menu'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
const Login = () => {
  useEffect(() => {
    if(window != undefined){
      if(window.location.href.includes("reset_password") && document.querySelector('#reset-password')){
        document.querySelector('#reset-password').classList.remove("d-none");
        
      }
      if(window.location.href.includes("change_password") && document.querySelector('#change-password')){
        document.querySelector('#change-password').classList.remove("d-none");
      }
    }
    
  })
  const { user, isLoading, matchEmail, handleLogin, redirectUrl, setIsLoading } = useContext(UserContext);

  const [state, setState] = useState({
    email: ``,
    password: ``,
  });

  function handleUpdate(event) {

    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    handleLogin(state)
  }


  if (user && typeof window !== 'undefined') {
    navigate(redirectUrl ? redirectUrl : `/my-account/orders`)
  }

  return (
    <>
      <LoginMenu currentPage="login" />
      {isLoading ?
        <div>
          <ClipLoader
            css={spinner}
            size={150}
            color={"#123abc"}
          />
        </div>
        :
        <div className="container-fluid login">
          <div className="row">
            <div className="col-12 col-lg-3 offset-lg-3">

              <div className="instruction d-lg-none">
                <div>Enter your email address and password below to sign in.</div>
              </div>

              <div id="reset-password" class="alert alert-success d-none" role="alert">
                If the entered email address is associated with this store, you will receive a password reset email. If you don't receive this e-mail, please check your junk mail folder or contact us for further assistance. 
              </div>
              <div id="change-password" class="alert alert-success d-none" role="alert">
                Your password has been successfully updated.
              </div>
              <div className="d-none d-lg-block">
                <div className="desk-signin">Sign In</div>
                <div className="desk-instruction">Enter your email address and password below to sign in.</div>
              </div>

              <form
                method="post"
                onSubmit={event => {
                  handleSubmit(event)
                  // if (typeof window !== 'undefined') {
                  //   navigate(`/my-account/signin`)
                  // }
                }}
              >

                <div class="form-group">
                  <label for="mail">Email Address</label>
                  <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="" onChange={handleUpdate} />
                </div>


                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="" name="password" onChange={handleUpdate} />
                </div>
                <p className={`form-control ${matchEmail == false ? 'text-warning' : 'd-none'}`}> Email or Password is incorrect.</p>
                <div className="check-wrapper">
                  <div class="form-check">

                    <label class="form-check-label terms" for="registerCheck">
                      Remember Me
                  <input type="checkbox" class="form-check-input" id="registerCheck" />
                      <span class="checkmark"></span>
                    </label>
                  </div>

                  <a href="https://gtotest.mybigcommerce.com/login.php?action=reset_password" className="forgot-pw">Forgot Password</a>
                </div>

                <input className="submit-input" type="submit" value="Sign In" />
              </form>
            </div>

            <div className="col-12 col-lg-3">
              <div className="benefits-wrapper">

                <div className="d-lg-none">
                  <div className="benefits-title">Don’t have an account?</div>
                  <div className="benefits-text">Create one to enjoy complimentary shipping, faster checkout, and Exlusive Access to new product announcements and insights on the latest formulas and innovations.</div>
                </div>


                <div className="d-none d-lg-block">

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
                <Link to="/registration" className="button-link">Register Now</Link>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )

}


export default Login