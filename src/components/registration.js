import React from "react"
import Layout from "./layout"
import LoginMenu from "./login-menu"
import Register from "./register"
import SEO from './seo';
import { graphql } from 'gatsby';


const Registration = () => (
  <>
      <LoginMenu currentPage = "register"/>
      <Register />
  </>
)

export default Registration
export const fragment = graphql`
    fragment paragraphRegistration on paragraph__registration {
        id
    }`
