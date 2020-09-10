import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import loginMenu from '../assets/scss/components/login-menu.module.scss'
import Login from './login'
const ForgotPwd = ({ node }) => {

    return (

        <>
            <div className="container-fluid forgot-pw">
                <div className="row">
                    <div className="col-12">
                        <div className="forgot-title">Forgot Password?</div>
                        <div className="forgot-text">Fill in your email below to request a new password. <span>An email</span> will be sent to the address below containing a link to verify your email address.</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-4 offset-lg-4">
                        <form>

                            <div class="form-group">
                                <label for="emailadd">Email Address</label>
                                <input type="email" class="form-control" name="email" id="emailadd" aria-describedby="emailHelp" placeholder="" />
                            </div>


                            <div className="submit-wrapper">
                                <input className="submit-input" type="submit" value="Reset Password" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ForgotPwd