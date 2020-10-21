import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import myAccountStyles from '../assets/scss/components/my-account.module.scss'
import Slider from "react-slick"
import Stars from './stars'
import OrderNoHistory from "./order-no-history"
import OrderHistoryRow from "./order-history-row"
import OrderHistory from "./order-history"
import OrderDetails from "./order-details"
import AddressBox from "./address-box"
import $ from 'jquery'

const Customer = ({ node, children, activeTab }) => {




    const data = useStaticQuery(graphql`
    query {
      skinanalyzer: file(relativePath: { eq: "image.png" }) {
        childImageSharp {
          fluid (quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    `)

    return (


        <div className="container-fluid my-account customer-care">
            <div className="row">
                <div className="col-12 col-lg-10 offset-lg-1">
                    <div className={myAccountStyles.title}>Customer Care</div>
                </div>
            </div>
            <div className="row d-lg-none">
                <div className="col-12">
                    <div className="dropdown">
                        <button className="dropdown-toggle myaccount-toggle" type="button" id="accountDropdownButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {activeTab === "covid-19"? "COVID-19 Information" : activeTab === "contact-us"? "Contact Us" : activeTab === "shipping-returns"? "Shipping & Returns" : activeTab === "faq"? "FAQ's" : activeTab === "my-account"? "My Account" : "Select"}
                        </button>
                        <div className="dropdown-menu myaccount-dropdown" aria-labelledby="accountDropdownButton">
                            <Link to="/covid-19" className={activeTab == "covid-19" ? "active account-tab" : "account-tab"}  id="covid">COVID-19 Information</Link>
                            <Link to="/customer-care/contact-us" className={activeTab == "contact-us" ? "active account-tab" : "account-tab"} id="contact">Contact Us</Link>
                            <Link to="#" className={activeTab == "shipping-returns" ? "active account-tab" : "account-tab"} id="shipping">Shipping & Returns</Link>
                            <Link to="/FAQ" className={activeTab == "faq" ? "active account-tab" : "account-tab"} id="faqs">FAQ</Link>
                            <Link to="/my-account/orders" className={activeTab == "my-account" ? "active account-tab" : "account-tab"} id="account">My Account</Link>

                        </div>
                    </div>
                </div>
            </div>
            <div className=" list-wrapper">
                <div className="row">

                    <div className="col-lg-2 offset-lg-1 d-none d-lg-block">
                        <div className="list-group" id="myList" role="tablist">
                            <Link className={activeTab == "covid-19" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/covid-19">COVID-19 Information</Link>
                            <Link className={activeTab == "contact-us" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/customer-care/contact-us" >Contact Us</Link>
                            <Link className={activeTab == "shipping-returns" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="#" >Shipping & Returns</Link>
                            <Link className={activeTab == "faq" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/FAQ" >FAQ</Link>
                            <Link className={activeTab == "my-account" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/my-account/orders" >My Account</Link>

                            <div className={myAccountStyles.csTitle}>Customer Service</div>
                            <div className={myAccountStyles.csText}>Our Customer Service Representatives are available to assist you Monday through Friday, from 7am – 4pm PST at 1-800-636-7546.</div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-8">
                        <div className="tab-content">

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Customer;