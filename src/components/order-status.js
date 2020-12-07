import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Customer from './customer-care'
import myAccountStyles from '../assets/scss/components/my-account.module.scss'

const OrderStatus = ({ node }) => {
    return (
        <Customer activeTab="order-status">
            <div className="container-fluid contact-us ">
                <div className="row">
                    <div class="col-12 col-md-12">
                        <div className={myAccountStyles.FsectionWrap}>
                            <div>
                                <div className={myAccountStyles.fsubtitle}>Order Status</div>
                                <div className={["contact-text",myAccountStyles.alAccount].join(" ")}>
                                    ALeardy have an account ?
                                  </div>
                            </div>
                            <Link className={myAccountStyles.buttonWrapper} to={"/my-account/signin"}>Sign In</Link>
                        </div>
                        <p className={myAccountStyles.Needpara}>Need Your Tracking or return info? Find your order here</p>
                    </div>
                    <form className={[myAccountStyles.formContainer].join(" ")}>

                        <div className="form-group form-element-con">
                            <label for="contactFName" className="form-label">ORDER NUMBER</label>
                            <input type="text" className="form-control" name="first_name" placeholder="" />
                            <p className="error-msg hide">Please Enter Your First Name</p>
                        </div>

                        <div className="form-group form-element-con">
                            <label for="contactFName" className="form-label">*Email ADDRESS</label>
                            <input type="text" className="form-control" name="Email_name" placeholder="" />
                            <p className="error-msg hide">Please Enter Your Email Address</p>
                        </div>
                        <p className={myAccountStyles.formNote}>*Email is required to track this order</p>
                        <div className={myAccountStyles.orderButtonContainer}>
                        <button className={myAccountStyles.orderButton} type="submit">TAKE ORDER</button>
                        </div>
                    </form>
                </div>
            </div>
        </Customer>
    )
}

export default OrderStatus

export const fragment = graphql`
    fragment paragraphOrderStatus on paragraph__order_status {
        id
        
    }`