/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes, { node } from "prop-types"
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import Helmet from 'react-helmet'
import Header from "./header"
import Footer from './footer'
import AboveHeader from './above-header'


import '../assets/scss/components/layout.scss'

import NavBlocks from "../assets/scss/components/nav-blocks"
import Popup from "./videopopup"
import Showbag from "./Cart/bag-preview"
import scrollDown from '../assets/images/scroll-down.png'

const $ = require("jquery");

const Layout = ({ children,nodeType,menuType}) => {
  if(!nodeType){
    nodeType='home';
  }
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  
  useEffect(() => {

    let scrollSection = window.innerHeight
    let scrollButton = document.querySelector("#slideDownButton");
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", function () {
        if (window.scrollY > (scrollSection)) {
          scrollButton.classList.remove("d-none");
          scrollButton.classList.add("upsideButton");


        } else {
          scrollButton.classList.add("d-none");
          scrollButton.classList.remove("upsideButton");
        }

      })
    }
  }, [])

  function scrollUp(e, id) {
    e.preventDefault();

    if (typeof window != undefined) {
      $('html,body').animate({ scrollTop: 0 });
    }
  }

  // Similar to componentDidMount and componentDidUpdate: 
  return (
    <div className={`node-${nodeType}`}>
      <AboveHeader menuType={menuType} notifClass="d-none d-lg-block" id="notificationDesk"/>
      <Header siteTitle={data.site.siteMetadata.title} nodeType={nodeType} menuType={menuType}/>
      {/* <NavBlocks /> */}
      <div>
        <main>
          {children}
          <div className="d-none d-lg-block"><button id="slideDownButton" className="scroll-button d-none" onClick={(e) => { scrollUp(e); }}><img src={scrollDown} /></button></div>

        </main>
        <Showbag />
        <Footer />
        <Popup/>
      </div>
          <div class="modal hidden" id="formsubmition">
           <div class="container">
              <div class="modal-body">
                  <h2>Thank you for your submission</h2>
                  <p>Your request has been submitted</p>
              </div>
           </div>
         </div>

         <div class="modal hidden" id="moremaxprice">
           <div class="container">
              <div class="modal-body">
                  <h2>Obagi Maximum Purchase Policy</h2>
                  <h5>Orders placed on Obagi.com are limited to 3 units per product, with a maximum allowable purchase of $750 per order.</h5>
              </div>
           </div>
         </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
