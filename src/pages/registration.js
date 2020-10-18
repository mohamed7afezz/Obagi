import React from "react"
import Layout from "../components/layout"
import LoginMenu from "../components/login-menu"
import Register from "../components/register"
import SEO from '../components/seo';
import { graphql } from 'gatsby';


const Registration = ({ data }) => (
  <Layout>
      <SEO title="Registration" description="Registration Page Description" />
      <LoginMenu currentPage = "register"/>
      <Register />
  </Layout>
)

export default Registration
