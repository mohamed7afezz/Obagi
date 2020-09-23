import React, { createContext, useState, useEffect } from 'react';
import { navigate } from 'gatsby';

const UserContext = createContext();

const baseUrl = process.env.Base_URL;

const isBrowser = () => typeof window !== "undefined"

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(false);
    const [err, setErr] = useState();

    async function getUserData() {

        const userData = await (await fetch(`${baseUrl}bigcommerce/v1/customer`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })).json();

        if (userData !== "User not login.") {
            setUser(userData[0]);
        }
    }

    //get user data
    useEffect(() => {
        getUserData();
    }, []);

    // Login
    const [isLoading, setIsLoading] = useState(false);


    async function handleLogin({ email, password }) {
        setIsLoading(true);

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

        if (isAuthUserRes.success && typeof window !== "undefined") {
            window.location.href = `${baseUrl}custmer_login_sso`;
        } else {
            setIsLoading(false);
        }


        return false;

    }

    // logout
    async function handleLogout() {
        fetch(`${baseUrl}custmer_logout`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        });

        fetch('https://gtotest.mybigcommerce.com/login.php?action=logout', {
            method: 'GET', mode: 'no-cors', credentials: 'include'
        });

        setUser(false);
    }


    // register
    async function handleRegister(user) {


        const newUserRes = await fetch(`${baseUrl}bigcommerce/v1/customer`, {
            method: "POST",
            mode: "no-cors",
            credentials: 'include',
            body: JSON.stringify([user])
        })
    
        // .then(res => console.log("resss", res))
        // .catch(error => {
        //     console.log("resss", error)
        // })
    //     .then((result) => result.json())
    //     .then((result) => {

    //     if (result.id) {
    //       dispatch(savedUser( result ));
    //     } else {
    //       dispatch(savingUserError( result ));
    //     }
    // });
        
        console.log('bahii', newUserRes.status)

        if (newUserRes.status == 200) {


            await getUserData();



            navigate("/my-account/orders");


        } else {

            // console.log("resss",setErr(newUserRes))

            // let response = await newUserRes.json();
            // console.log("resss", response, newUserRes.errors)
            // setErr(newUserRes);
        }
    }

    return (
        <UserContext.Provider value={{ user, err, isLoading, handleLogin, handleLogout, handleRegister }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;