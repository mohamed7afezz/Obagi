require('isomorphic-fetch');
export const isBrowser = () => typeof window !== "undefined"

export const getUser = async () => {
  const userData = await (await fetch(`${baseUrl}bigcommerce/v1/customer`,{
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })).json();
  
  return userData !== "User not login."? userData[0] : {};
}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

const baseUrl = process.env.Base_URL;

export const handleLogin = async ({ email, password }) => {
  // send request to drupal with username and password
  const user = {
    username: email,
    password: password
  }

  const isAuthUserRes = await (await fetch(`${baseUrl}bigcommerce/v1/signin`, {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(user),
    mode: 'cors'
  })).json();
  // const isAuthUserRes = await isAuthUserReq.json();

  if(isAuthUserRes.success && typeof window !== "undefined") {
    // const userData = await (await fetch(`${baseUrl}bigcommerce/v1/customer`,{
    //   method: 'GET',
    //   credentials: 'include',
    //   mode: 'cors'
    // })).json();
  
    // return window.location.href = `${baseUrl}custmer_login_sso`;
  }

  // if (username === `john` && password === `pass`) {
  //   return setUser({
  //     username: `john`,
  //     name: `Johnny`,
  //     email: `johnny@example.org`,
  //   })
  // }

  return false
}

export const isLoggedIn = async () => {
  const user = await getUser();

  return !!user.first_name
}

export const logout = callback => {
  setUser({})
  callback()
}