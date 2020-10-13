import React, { useEffect, useState, useContext } from "react"
import { Link } from 'gatsby'
import Customer from '../components/customer-care'
import { CustomSelect } from '../assets/js/custom-select'

export default function Contact() {

    useEffect(() => {
        if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
            CustomSelect();
        }
    })



    return (
        <Customer activeTab="contact-us">
            <div className="contact-us">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="contact-text">If you have any questions or want more information about Obagi, please contact us. We love hearing from our customers and we would be glad to further assist you.</div>
                        <div className="contact-title">Email Obagi</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="contact-text">Submit your message below, and we will respond to most inquiries within 2 to 3 business days.</div>
                        <form>
                            <div className="required-field">*All fields required</div>


                            <div className="check-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="contactFirstRadio" value="option1" />
                                    <label className="form-check-label" for="contactFirstRadio">
                                        I am a Patient/Consumer
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="contactSecondRadio" value="option2" />
                                    <label className="form-check-label" for="contactSecondRadio">
                                        I am a Physician/Skin Care Professional
                                    </label>
                                </div>
                            </div>


                            <div className="form-group">
                                <label for="contactFName" className="form-label">*First name</label>
                                <input type="text" className="form-control" id="contactFName" aria-describedby="contactFName" placeholder="" required />

                            </div>
                            <div className="form-group">
                                <label for="contactLName" className="form-label">*Last name</label>
                                <input type="text" className="form-control" id="contactLName" aria-describedby="contactLName" placeholder="" required />

                            </div>

                            <div className="form-group select-group">
                                <label for="state" className="form-label">*Subject</label>
                                <div className="select-wrapper custom-select">
                                    <select className="form-control" id="subject">
                                        <option value="Alabama">Subject 1</option>
                                        <option value="Alabama">Subject 2</option>
                                        <option value="Alabama">Subject 2</option>
                                        <option value="Alabama">Subject 3</option>
                                        <option value="Alabama">Subject 4</option>
                                        <option value="Alabama">Subject 5</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group textarea-group">
                                <label for="contactDesc" className="form-label">Description</label>
                                <textarea type="text" className="form-control textarea-control" id="contactDesc" aria-describedby="contactDesc" placeholder="Type here…" />

                            </div>

                            <div className="question">How would you like to be contacted:</div>

                            <div className="second-check-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="emailRadio" id="contactEmailRadio" value="option1" />
                                    <label className="form-check-label" for="contactEmailRadio">
                                        Email
                                </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="phoneRadio" id="contactPhoneRadio" value="option2" />
                                    <label className="form-check-label" for="contactPhoneRadio">
                                        Phone
                                </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="contactPhone" className="form-label">*Phone</label>
                                <input type="text" className="form-control" id="contactPhone" aria-describedby="contactPhone" placeholder="" required />

                            </div>

                            <div className="footnote">Including area code and/or country code, no spaces or dashes (e.g., 1234567890)</div>
                            <input className="button-link" type="submit" value="Send Message" />

                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-8">

                        <div className="contact-info-wrapper">
                            <div className="contact-info-subwrapper">
                                <div className="contact-title">Call Obagi</div>
                                <div className="contact-mini-wrapper">
                                    <div>Phone: 1-800-636-7546</div>
                                    <div>Fax: 1-877-791-7096</div>
                                </div>
                                <div className="contact-mini-wrapper">
                                    <div>Monday - Friday (excluding holidays)</div>
                                    <div>7AM - 4PM PST</div>
                                </div>
                            </div>

                            <div className="contact-info-subwrapper">
                                <div className="contact-title">Write Obagi</div>
                                <div className="contact-mini-wrapper">
                                    <div>Phone: 1-800-636-7546</div>
                                    <div>Fax: 1-877-791-7096</div>
                                </div>
                                <div className="contact-mini-wrapper">
                                    <div>Monday - Friday (excluding holidays)</div>
                                    <div>7AM - 4PM PST</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Customer>
    )
}
