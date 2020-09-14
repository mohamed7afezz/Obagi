import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import addressModalStyles from '../assets/scss/components/address-modal.module.scss'
import {CustomSelect} from '../assets/js/custom-select'

const AddressModal = ({ node,
    firstName,
    lastName,
    firstAddress,
    secondAddress,
    postalCode,
    city,
    state,
    phone,
    id
}) => {


    useEffect(() => {
        if(document.querySelectorAll('.custom-select .select-selected').length < 1) {
          CustomSelect();
        }
    })

    return (


        <div className="modal fade address-modal" id={id? "address" + id : "address-modal"} tabindex="-1" role="dialog" aria-labelledby="addressModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                        <div className="modal-title" id="addressModalLabel">Edit Address</div>
                        <div className="modal-title-footnote">*Required fileds</div>
                    </div>


                    <div className="modal-body">
                        <form>
                            <div className="group-wrapper">
                                <div className="form-group">
                                    <label for={id? "input" + id : "input"} className="form-label">*First name</label>
                                    <input type="email" className="form-control" id={id? "input" + id : "input"} aria-describedby="emailHelp" placeholder={firstName? firstName :"Enter first name"} />

                                </div>
                                <div className="form-group">
                                    <label for={id? "example" + id : "example"} className="form-label">*Last name</label>
                                    <input type="email" className="form-control" id={id? "example" + id : "example"} aria-describedby="emailHelp" placeholder={lastName ? lastName : "Enter last name"} />

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div className="form-group">
                                    <label for={id? "exampleInput" + id : "exampleInput"} className="form-label">*Street Address</label>
                                    <input type="email" className="form-control" id={id? "exampleInput" + id : "exampleInput"} aria-describedby="emailHelp" placeholder={firstAddress? firstAddress : "Enter street address"} />

                                </div>
                                <div className="form-group">
                                    <label for={id? "exampleInputEmai" + id : "exampleInputEmai"} className="form-label">Apt, Suite or Floor</label>
                                    <input type="email" className="form-control" id={id? "exampleInputEmai" + id : "exampleInputEmai"} aria-describedby="emailHelp" placeholder={secondAddress? secondAddress : "Enter floor"} />

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div className="form-group">
                                    <label for={id? "exampleInputEmail" + id : "exampleInputEmail"} className="form-label">*Postal Code</label>
                                    <input type="email" className="form-control" id={id? "exampleInputEmail" + id : "exampleInputEmail"} aria-describedby="emailHelp" placeholder={postalCode? postalCode : "Enter postal code"} />

                                </div>
                                <div className="form-group">
                                    <label for={id? "exampleInputEmail1" + id : "exampleInputEmail1"} className="form-label">*City</label>
                                    <input type="email" className="form-control" id={id? "exampleInputEmail1" + id : "exampleInputEmail1"} aria-describedby="emailHelp" placeholder={city? city : "Enter city"} />

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div className="form-group select-group">
                                    <label for={id? "addressFormSelect" + id : "addressFormSelect"} className="form-label">*State/Province</label>
                                    <div className="select-wrapper custom-select">
                                        <select className="form-control" id={id? "addressFormSelect" + id : "addressFormSelect"}>
                                            <option>{state? state : "Select"}</option>
                                            <option>{state? state : "Select"}</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label for="exampleInputEmail1" className="form-label">Phone Number</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={phone? phone : "Enter phone number"} />

                                </div>
                            </div>
                        </form>
                    </div>


                    <div className="modal-footer">
                        <input className="modal-button" type="submit" value="Update" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressModal