import React from 'react'
import { Link, graphql, useStaticQuery} from 'gatsby'
import Img from 'gatsby-image'
import aboveHeader from '../assets/scss/components/above-header.module.scss'
import { isLoggedIn } from '../services/auth'
const AboveHeader = () => {

    const data = useStaticQuery(graphql`
      query {
        close: file(relativePath: { eq: "close.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `)

    function closeNotification() {
      document.getElementById("notification").style.display = "none";
      document.getElementById("desk-navigation").style.top="0";
      document.getElementById("mob-navigation").style.top="0";
      document.getElementById("search-wrapper").style.top="0";
      
      if(isLoggedIn()) {
        document.getElementById("show-account").style.top="98px";
      }

      if(document.getElementById("search-wrapper").style.display === "none" && document.getElementById("mob-navigation").style.display !== "none" && document.querySelector(".node-home")) {
        document.querySelector(".node-home").classList.add("node-big-home-margin");
        
      } else if(document.getElementById("search-wrapper").style.display === "none" && document.getElementById("mob-navigation").style.display !== "none" && document.querySelector(".node-clinical")) {
        document.querySelector(".node-clinical").classList.add("node-big-general-margin");
        
      }  else if(document.getElementById("search-wrapper").style.display === "none" && document.getElementById("mob-navigation").style.display !== "none" && document.querySelector(".node-medical")) {
        document.querySelector(".node-medical").classList.add("node-big-general-margin");
        
      }
       else if(document.querySelector(".node-medical")){
        document.querySelector(".node-medical").classList.add("node-general-margin");

      } else if (document.querySelector(".node-clinical")) {
        document.querySelector(".node-clinical").classList.add("node-general-margin");
      }
      else {
        document.querySelector(".node-home").classList.add("node-home-margin");
      }

    }

    return (
        <div className={aboveHeader.wrapper} id="notification">
            <div className="container-fluid">
                <div className="row">
                    <div className={["col", aboveHeader.columnWrapper].join(" ")}>
                    <div className={aboveHeader.text}><p>Learn about our <Link to="#">Door Stop Delivery</Link> & Free Shipping</p></div>
                    <div className={aboveHeader.closeButton}><button type="button" onClick={() => {closeNotification();}}><Img fluid={data.close.childImageSharp.fluid} className={aboveHeader.closeImg}/></button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboveHeader