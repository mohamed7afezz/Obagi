import React, { createContext, useState, useEffect } from 'react';
import { navigate } from 'gatsby';

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
            credentials: 'include',
            body: JSON.stringify(user),
            mode: 'cors'
        })).json();

        if(isAuthUserRes.success && typeof window !== "undefined") {
            window.location.href = `${baseUrl}custmer_login_sso`;
        }
        return false;
    }

    // logout
    async function handleLogout () {
        fetch(`${baseUrl}custmer_logout`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        });

        fetch('https://gtotest.mybigcommerce.com/login.php?action=logout', {
            method:'GET',mode:'no-cors',credentials: 'include'
        });

        setUser(false);
    }

    const [isLoading, setIsLoading] = useState(false);

    // register
    async function handleRegister(user) {

        setIsLoading(true);

        const newUserRes = await (await fetch(`${baseUrl}bigcommerce/v1/customer`, {
            method: "POST",
            mode: "no-cors",
            credentials: 'include',
            body: JSON.stringify([user])
        }));
        console.log('bahii', newUserRes.status)
        
        if(newUserRes.status == 200){

            setIsLoading(false);

            await getUserData();



            // if (isLoading) {
            //     return <div>Loading...</div>
            // } else {
                navigate("/my-account/orders");

            // }
            
        } else{
            return newUserRes;
        }
    }

    return (
        <UserContext.Provider value={{user, handleLogin, handleLogout, handleRegister}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;