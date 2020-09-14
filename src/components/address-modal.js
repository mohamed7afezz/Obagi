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


        <div className="modal fade address-modal" id="address-modal" tabindex="-1" role="dialog" aria-labelledby="addressModalLabel" aria-hidden="true">
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
                                    <label for="fname" className="form-label">*First name</label>
                                    <input type="text" className="form-control" id="fname" aria-describedby="emailHelp" placeholder="" value=""/>

                                </div>
                                <div className="form-group">
                                    <label for="lname" className="form-label">*Last name</label>
                                    <input type="text" className="form-control" id="lname" aria-describedby="emailHelp" placeholder="" value=""/>

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div className="form-group">
                                    <label for="stadd" className="form-label">*Street Address</label>
                                    <input type="text" className="form-control" id="stadd" aria-describedby="emailHelp" placeholder="" value=""/>

                                </div>
                                <div className="form-group">
                                    <label for="apt" className="form-label">Apt, Suite or Floor</label>
                                    <input type="text" className="form-control" id="apt" aria-describedby="emailHelp" placeholder="" value=""/>

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div className="form-group">
                                    <label for="pcode" className="form-label">*Postal Code</label>
                                    <input type="text" className="form-control" id="pcode" aria-describedby="emailHelp" placeholder="" value=""/>

                                </div>
                                <div className="form-group">
                                    <label for="city" className="form-label">*City</label>
                                    <input type="text" className="form-control" id="city" aria-describedby="city" placeholder="" value=""/>

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div className="form-group select-group">
                                    <label for="state" className="form-label">*State/Province</label>
                                    <div className="select-wrapper custom-select">
                                        <select className="form-control" id="state">
                                            <option>Select</option>
                                            <option>Select</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label for="phone" className="form-label">Phone Number</label>
                                    <input type="tel" className="form-control" id="phone" aria-describedby="phone" placeholder="" value=""/>

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