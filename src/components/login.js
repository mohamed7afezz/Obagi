import React, { useContext, useState } from "react"
import { navigate } from "gatsby"
// import { handleLogin, isLoggedIn } from "../services/auth"
import UserContext from "../providers/user-provider"

const Login = () => {
  
  const {user, handleLogin} = useContext(UserContext);

  const [state, setState] = useState({
    email: ``,
    password: ``,
  });

  function handleUpdate (event) {
    
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit (event) {
    event.preventDefault()
    handleLogin(state)
  }


  if (user && typeof window !== 'undefined') {
    navigate(`/my-account`)
  }

  return (
    <>
      <h1>Log in</h1>
      <form
        method="post"
        onSubmit={event => {
          handleSubmit(event)
          if(typeof window !== 'undefined') {
            navigate(`/my-account/signin`)
          }
        }}
      >
        <label>
          Email
          <input type="email" name="email" onChange={handleUpdate} />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={handleUpdate}
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </>
  )

}


export default Login