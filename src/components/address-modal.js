import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import addressModalStyles from '../assets/scss/components/address-modal.module.scss'
import { CustomSelect } from '../assets/js/custom-select'

const baseUrl = process.env.Base_URL;


const AddressModal = ({ node,
    firstName,
    lastName,
    firstAddress,
    secondAddress,
    postalCode,
    city,
    state,
    phone,
    id,
    addressType,
    countryCode,
}) => {


    useEffect(() => {
        if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
            CustomSelect();
        }
    })

    const [addresses, setAddresses] = useState({});

    // let fname, lname, stadd, apt, cityadd, stateadd, pcode, ccode, type, orid, phonenum;






    async function updateAddresses(event) {
        event.preventDefault();

        if(typeof window !== "undefined") {

    
            var addressDetails = {
                first_name: document.querySelector("#address-modal #fname").value,
                last_name: document.querySelector("#address-modal #lname").value,
                address1: document.querySelector("#address-modal #stadd").value,
                address2: document.querySelector("#address-modal #apt").value,
                city: document.querySelector("#address-modal #city").value,
                state_or_province: document.querySelector("#address-modal .select-selected").innerHTML,
                postal_code: document.querySelector("#address-modal #pcode").value,
                country_code : "US",
                phone: document.querySelector("#address-modal #phone").value,
                address_type: "residential",
                id: parseInt(document.querySelector("#address-modal #order-id").value)
            }
        }
        

        const addressesData = await fetch((document.querySelector("#address-modal").classList.contains("add-address") ? `${baseUrl}bigcommerce/v1/customer_addresses` : `${baseUrl}bigcommerce/v1/update_addresses`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify([addressDetails])
        })

        if (addressesData.status == 200 && typeof window !== "undefined") {
            window.location.reload();
            
        }

        
    }


    return (


        <div className="modal fade address-modal" id="address-modal" tabindex="-1" role="dialog" aria-labelledby="addressModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                        <div className="modal-title" id="addressModalLabel">Edit Address</div>
                        <div className="modal-title-footnote">*Required fileds</div>
                    </div>


                    <div className="modal-body">
                        <form method="post"
                            onSubmit={event => {
                                updateAddresses(event)
                            }}>
                            <div className="group-wrapper">
                                <div className="form-group">
                                    <label for="fname" className="form-label">*First name</label>
                                    <input type="text" className="form-control" id="fname" aria-describedby="emailHelp" placeholder=""/>

                                </div>
                                <div className="form-group">
                                    <label for="lname" className="form-label">*Last name</label>
                                    <input type="text" className="form-control" id="lname" aria-describedby="emailHelp" placeholder=""/>

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div className="form-group">
                                    <label for="stadd" className="form-label">*Street Address</label>
                                    <input type="text" className="form-control" id="stadd" aria-describedby="emailHelp" placeholder=""/>

                                </div>
                                <div className="form-group">
                                    <label for="apt" className="form-label">Apt, Suite or Floor</label>
                                    <input type="text" className="form-control" id="apt" aria-describedby="emailHelp" placeholder=""/>

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div className="form-group">
                                    <label for="pcode" className="form-label">*Postal Code</label>
                                    <input type="text" className="form-control" id="pcode" aria-describedby="emailHelp" placeholder=""/>

                                </div>
                                <div className="form-group">
                                    <label for="city" className="form-label">*City</label>
                                    <input type="text" className="form-control" id="city" aria-describedby="city" placeholder="" />

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div className="form-group select-group">
                                    <label for="state" className="form-label">*State/Province</label>
                                    <div className="select-wrapper custom-select">
                                        <select className="form-control" id="state">
                                            <option value="Alabama">cairo</option>
                                            <option value="Alabama">alex</option>
                                            <option value="Alabama">Alabama</option>
                                            <option value="Alabama">Alabama</option>
                                            <option value="Alabama">Alabama</option>
                                            <option value="Alabama">Alabama</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label for="phone" className="form-label">Phone Number</label>
                                    <input type="tel" className="form-control" id="phone" aria-describedby="phone" placeholder=""/>

                                </div>
                            </div>
                            <p className="mb-16">whenever we ask then to submit info to us:<br/>
Obagi will never sell, rent, or share your personal information with any third parties for marketing purposes without your express permission. By submitting your information, you confirm you have read and agree with the terms of our Privacy Policy.</p>
                            <input className="modal-button" type="submit" value="Update" />
                            <input id="order-id" type="hidden" />
                        </form>
                    </div>


                    <div className="modal-footer">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressModal