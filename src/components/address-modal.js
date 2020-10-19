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
                                            <option value="">- None -</option>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AS">American Samoa</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="AE">Armed Forces (Canada, Europe, Africa, or Middle East)</option>
                                            <option value="AA">Armed Forces Americas</option>
                                            <option value="AP">Armed Forces Pacific</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="DC">District of Columbia</option>
                                            <option value="FM">Federated States of Micronesia</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="GU">Guam</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MH">Marshall Islands</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="MP">Northern Mariana Islands</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PW">Palau</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="PR">Puerto Rico</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VI">Virgin Islands</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                            <option value="AB">Alberta</option>
                                            <option value="BC">British Columbia</option>
                                            <option value="MB">Manitoba</option>
                                            <option value="NB">New Brunswick</option>
                                            <option value="NL">Newfoundland and Labrador</option>
                                            <option value="NS">Nova Scotia</option>
                                            <option value="NT">Northwest Territories</option>
                                            <option value="NU">Nunavut</option>
                                            <option value="ON">Ontario</option>
                                            <option value="PE">Prince Edward Island</option>
                                            <option value="QC">Quebec</option>
                                            <option value="SK">Saskatchewan</option>
                                            <option value="YT">Yukon</option>
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