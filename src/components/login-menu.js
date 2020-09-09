import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import loginMenu from '../assets/scss/components/login-menu.module.scss'
import Login from './login'
const LoginMenu = ({ node }) => {

    return (

        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className={loginMenu.headerWrapper}>
                            <Link to="#" className={loginMenu.header}>Sign In</Link>
                            <Link to="#" className={loginMenu.header}>Register</Link>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default LoginMenu;