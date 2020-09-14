import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import addressBoxStyles from '../assets/scss/components/address-box.module.scss'
import AddressModal from "./address-modal"

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
    index }) => {


    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    phone = formatPhoneNumber(phone);

    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                <AddressModal
                        firstName = {firstName}
                        lastName = {lastName}
                        firstAddres = {firstAddress}
                        secondAddress = {secondAddress}
                        city = {city}
                        state = {state}
                        postalCode = {postalCode}
                        phone = {phone}
                        id = {id}
                 />
                <div className={addressBoxStyles.boxWrapper}>
                    <div className={addressBoxStyles.boxHeader}>
                        <div>Address {index}</div>
                        <div className={addressBoxStyles.buttonsWrapper}>
                            <button type="button" className={addressBoxStyles.headerButton} data-toggle="modal" data-target={"#address" + id}>Edit</button>
                            <button type="button" className={addressBoxStyles.headerButton}>Delete</button>
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