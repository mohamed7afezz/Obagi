import React, { useContext, useState } from "react"
import { navigate, Link } from "gatsby"
// import { handleLogin, isLoggedIn } from "../services/auth"
import UserContext from "../providers/user-provider"

const Login = () => {

  const { user, handleLogin } = useContext(UserContext);

  const [state, setState] = useState({
    email: ``,
    password: ``,
  });

  function handleUpdate(event) {

    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    handleLogin(state)
  }


  if (user && typeof window !== 'undefined') {
    navigate(`/my-account`)
  }

  return (
    <div className="row login">
      <div className="col-12">
        <div className="instruction">
          <div>Enter your email address and password below to sign in.</div>
        </div>
        <form
          method="post"
          onSubmit={event => {
            handleSubmit(event)
            if (typeof window !== 'undefined') {
              navigate(`/my-account/signin`)
            }
          }}
        >

          <div class="form-group">
            <label for="mail">Email Address</label>
            <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="" onChange={handleUpdate} />
          </div>


          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" name="password" onChange={handleUpdate} />
          </div>

          <div className="check-wrapper">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Remember Me</label>
            </div>

            <Link to="#" className="forgot-pw">Forgot Password</Link>
          </div>

          <input className="submit-input" type="submit" value="Sign In" />
        </form>
      </div>

      <div className="col-12">
          <div>

          </div>
      </div>
    </div>
  )

}


export default Login