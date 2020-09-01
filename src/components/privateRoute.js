import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/my-account/signin`) {
    navigate("/my-account/signin")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute