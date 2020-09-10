import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import LoginMenu from "../components/login-menu"
import Register from "../components/register"

const Registration = () => (
  <Layout>
      <LoginMenu currentPage = "register"/>
      <Register />
  </Layout>
)

export default Registration
