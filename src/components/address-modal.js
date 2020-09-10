import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import addressModalStyles from '../assets/scss/components/address-modal.module.scss'
import {CustomSelect} from '../assets/js/custom-select'

const AddressModal = ({ node }) => {

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
                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="form-label">*First name</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter first name" />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="form-label">*Last name</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter last name" />

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="form-label">*Street Address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter street address" />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="form-label">Apt, Suite or Floor</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter floor" />

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="form-label">*Postal Code</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter postal code" />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="form-label">*City</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter city" />

                                </div>
                            </div>
                            <div className="group-wrapper">
                                <div class="form-group select-group">
                                    <label for="addressFormSelect" className="form-label">*State/Province</label>
                                    <div className="select-wrapper custom-select">
                                        <select class="form-control" id="addressFormSelect">
                                            <option>New Jersey</option>
                                            <option>New Jersey</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail1" className="form-label">Phone Number</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone number" />

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