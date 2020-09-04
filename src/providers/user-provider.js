import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const baseUrl = process.env.Base_URL;

const isBrowser = () => typeof window !== "undefined"

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(false);

    async function getUserData() {

        const userData = await (await fetch(`${baseUrl}bigcommerce/v1/customer`,{
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })).json();

        if(userData !== "User not login.") {
            setUser(userData[0]);
        }
    }

    //get user data
    useEffect(() => {
        getUserData();
    }, []);

    // Login

    async function handleLogin({email, password}) {
        
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

        if(isAuthUserRes.success && typeof window !== "undefined") {
            window.location.href = `${baseUrl}custmer_login_sso`;
        }
        return false;
    }

    return (
        <UserContext.Provider value={{user, handleLogin}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;