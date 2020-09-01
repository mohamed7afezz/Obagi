import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import UserAccount from "../components/my-account"
import ShowAccount from "../components/show-account"
import Login from "../components/login"
import PrivateRoute from "../components/privateRoute"
const Signin = () => (
  <Layout>
    <Router>
    <PrivateRoute path="/MyAccount" component={UserAccount} />
        <UserAccount path="/my-account/signin"/>
      <ShowAccount path="/signin/ShowAccount" />
      <Login path="/signin/login" />
    </Router>
  </Layout>
)

export default Signin