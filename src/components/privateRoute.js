import React, { useContext } from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
import UserContext from "../providers/user-provider"

const PrivateRoute = ({ component: Component, location, ...rest }) => {

  const {user} = useContext(UserContext);

  if (!user && location.pathname !== `/my-account/signin`) {
    if(typeof window !== 'undefined') {
      navigate("/my-account/signin")
    }
      
    return null
  }


  return <Component {...rest} />
}

export default PrivateRoute