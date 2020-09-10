import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import loginMenu from '../assets/scss/components/login-menu.module.scss'
import Login from './login'
const LoginMenu = ({ node, currentPage }) => {

    return (

        <>
            <div className="row">
                <div className="col-12 col-lg-10 offset-lg-1">
                    <div className={[loginMenu.headerWrapper, "d-lg-none"].join(" ")}>
                        <Link to="/my-account/signin" className={currentPage === "login"? loginMenu.header + " " + loginMenu.underline : loginMenu.header }>Sign In</Link>
                        <Link to="/registration" className={currentPage === "register"? loginMenu.header + " " + loginMenu.underline : loginMenu.header }>Register</Link>
                    </div>

                    {currentPage === "login" ?
                        <div className={[loginMenu.deskHeader, "d-none d-lg-block"].join(" ")}>
                            My Account
                    </div>
                        : ""}

                    {currentPage === "register" ?
                        <div className={[loginMenu.deskCreateHeader, "d-none d-lg-block"].join(" ")}>
                            Create an Account
                        </div>
                    : ""}
                </div>
            </div>

        </>
    )
}
export default LoginMenu