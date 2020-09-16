import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import addressBoxStyles from '../assets/scss/components/address-box.module.scss'
import AddressModal from "./address-modal"


const baseUrl = process.env.Base_URL;

const AddressBox = ({ node,
    firstName,
    lastName,
    firstAddress,
    secondAddress,
    city,
    state,
    postalCode,
    phone,
    id,
    index,
    addressType,
    countryCode
}) => {


    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    phone = formatPhoneNumber(phone);


    function editData() {
        if(typeof window !== "undefined") {
            document.querySelector("#address-modal #fname").value = firstName;
            document.querySelector("#address-modal #lname").value = lastName;
            document.querySelector("#address-modal #stadd").value = firstAddress;
            document.querySelector("#address-modal #apt").value = secondAddress;
            document.querySelector("#address-modal #city").value = city;
            document.querySelector("#address-modal .select-selected").innerHTML = state;
            document.querySelector("#address-modal .select-items > div").innerHTML = state;
            document.querySelector("#address-modal #pcode").value = postalCode;
            document.querySelector("#address-modal #phone").value = phone;
            document.querySelector("#address-modal #order-id").value = id;
        }
    }

    function addClass() {
        let modal = document.getElementById("address-modal");
        if (modal.classList.contains("add-address")) {
            modal.classList.remove("add-address")
        }

        modal.classList.add("edit-address");
    }


    // const [addresses, setAddresses] = useState({});

    async function deleteAddress() {

        const addressBoxData = await fetch(`${baseUrl}bigcommerce/v1/delete_addresses`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                address_id: id
            })
        });

        if (addressBoxData.status == 200 && typeof window !== "undefined") {
            window.location.reload();
            
        }
        console.log("box", addressBoxData.status);
    }


    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                {/* <AddressModal
                        firstName = {firstName}
                        lastName = {lastName}
                        firstAddres = {firstAddress}
                        secondAddress = {secondAddress}
                        city = {city}
                        state = {state}
                        postalCode = {postalCode}
                        phone = {phone}
                        id = {id}
                        key = {id}
                 /> */}
                <div className={addressBoxStyles.boxWrapper}>
                    <div className={addressBoxStyles.boxHeader}>
                        <div>Address {index}</div>
                        <div className={addressBoxStyles.buttonsWrapper}>
                            <button type="button" className={addressBoxStyles.headerButton} data-toggle="modal" data-target="#address-modal" onClick={() => {editData(); addClass();}}>Edit</button>
                            <button type="button" className={addressBoxStyles.headerButton} onClick={() => {deleteAddress();}}>Delete</button>
                        </div>
                    </div>
                    <div className={addressBoxStyles.infoWrapper}>
                        <p>{firstName + " " + lastName}</p>
                        <p>{firstAddress}</p>
                        <p>{secondAddress}</p>
                        <p>{city + ", " + state + ", " + postalCode}</p>
                        <p>{phone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressBox