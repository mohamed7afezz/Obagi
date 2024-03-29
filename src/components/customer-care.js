import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import * as myAccountStyles from '../assets/scss/components/my-account.module.scss'
import Slider from "react-slick"
import Stars from './stars'
import OrderNoHistory from "./order-no-history"
import OrderHistoryRow from "./order-history-row"
import OrderHistory from "./order-history"
import OrderDetails from "./order-details"
import AddressBox from "./address-box"
import $ from 'jquery'

const Customer = ({ node, children, activeTab, currentPage }) => {




    const data = useStaticQuery(graphql`{
  skinanalyzer: file(relativePath: {eq: "image.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  menulink: allMenuLinkContentMenuLinkContent(
    filter: {menu_name: {eq: "customer-care-sidebar"}}
  ) {
    edges {
      node {
        menu_name
        title
        link {
          uri
        }
      }
    }
  }
}
`)

    console.log('ash data', data.menulink, activeTab, currentPage)

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
                        <button className="dropdown-toggle myaccount-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {currentPage? currentPage : "Select"}
                        </button>
                        <div className="dropdown-menu myaccount-dropdown">
                            <Link to="/covid-19" className={activeTab == "covid-19" ? "active account-tab" : "account-tab"}  id="covid">COVID-19 Information</Link>
                            {/* <Link to="/customer-care/contact-us" className={activeTab == "contact-us" ? "active account-tab" : "account-tab"} id="contact">Contact Us</Link>
                            <Link to="/order-status" className={activeTab == "order-status" ? "active account-tab" : "account-tab"}  id="covid">Order Status</Link>
                            <Link to="/online-ordering-and-returns-policy" className={activeTab == "shipping-returns" ? "active account-tab" : "account-tab"} id="shipping">Online Ordering & Returns Policy</Link>
                            <Link to="/FAQ" className={activeTab == "faq" ? "active account-tab" : "account-tab"} id="faqs">FAQs</Link> */}
                            <Link to="/my-account/orders" className={activeTab == "my-account" ? "active account-tab" : "account-tab"} id="account">My Account</Link>
                            {/* <Link to="/contest-rules" className={activeTab == "contest-rules" ? "active account-tab" : "account-tab"} id="contest-rules">Contest Rules</Link>
                            <Link to="/promotions" className={activeTab == "promotions" ? "active account-tab" : "account-tab"} id="promotions">Promotions</Link> */}
                            {data.menulink.edges.map(item => {
                                return (
                                    <Link to={item.node.link.uri.replace('internal:','')} className={activeTab == item.node.link.uri.replace('internal:','') ? "active account-tab" : "account-tab"}>{item.node.title}</Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" list-wrapper">
                <div className="row">

                    <div className="col-lg-2 offset-lg-1 d-none d-lg-block">
                        <div className="list-group" id="myList" role="tablist">
                            <Link className={activeTab == "covid-19" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/covid-19">COVID-19 Information</Link>
                            {/* <Link className={activeTab == "contact-us" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/customer-care/contact-us" >Contact Us</Link>
                            <Link className={activeTab == "order-status" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/order-status" >Order Status</Link>
                            <Link className={activeTab == "shipping-returns" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/online-ordering-and-returns-policy" >Online Ordering & Returns Policy</Link>
                            <Link className={activeTab == "faq" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/FAQ" >FAQs</Link> */}
                            <Link className={activeTab == "my-account" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/my-account/orders" >My Account</Link>
                            {/* <Link className={activeTab == "contest-rules" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/contest-rules" >Contest Rules</Link> */}
                            {/* <Link className={activeTab == "promotions" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} to="/promotions" >Promotions</Link> */}
                            {data.menulink.edges.map(item => {
                                return (
                                    <Link to={item.node.link.uri.replace('internal:','')} className={activeTab == item.node.link.uri.replace('internal:','') ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>{item.node.title}</Link>
                                )
                            })}
                            
                            <div className={myAccountStyles.csTitle}>Customer Service</div>
                            <div className={myAccountStyles.csText}>Our Customer Service Representatives are available to assist you Monday through Friday, from 7am – 4pm PST at <span className={myAccountStyles.csNumber}>1-800-636-7546</span>.</div>
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