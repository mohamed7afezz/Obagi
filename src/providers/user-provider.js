import React, { createContext, useState, useEffect } from 'react';
import { navigate } from 'gatsby';

const UserContext = createContext();

const baseUrl = process.env.Base_URL;

const isBrowser = () => typeof window !== "undefined"

export const UserProvider = ({ children }) => {

    const [redirectUrl, setRedirectUrl] = useState();
    const [user, setUser] = useState(false);
    const [notif, setNotif] = useState();
    const [err, setErr] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [matchEmail, setMatchEmail] = useState(true);

    async function getUserData() {

        setIsLoading(true);
        const userData = await (await fetch(`${baseUrl}bigcommerce/v1/customer`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })).json();

        if (userData !== "User not login.") {
            setUser(userData[0]);
        }
        setIsLoading(false);

    }

    //get user data
    useEffect(() => {
        getUserData();
    }, []);

    // Login



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


        if(!isAuthUserRes.success && typeof window !== "undefined") {
            setMatchEmail(false);
        }
        else if (isAuthUserRes.success && typeof window !== "undefined") {
            window.location.href = `${baseUrl}custmer_login_sso`;
            setMatchEmail(true);

        }
        setIsLoading(false);


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
            credentials: 'include',
            body: JSON.stringify([user])
        })
        

        if (newUserRes.status == 200) {


            await getUserData();



            navigate("/my-account/orders");


        } else {
            let res = await newUserRes.json();
            setErr(res.errors);
        }
    }

    return (
        <UserContext.Provider value={{ user, err, matchEmail, isLoading, redirectUrl, notif, setNotif, setIsLoading, setRedirectUrl, handleLogin, handleLogout, handleRegister }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;