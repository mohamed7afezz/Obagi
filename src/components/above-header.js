import React, { useContext, useState, useEffect } from "react"
import { StaticQuery, useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import aboveHeader from '../assets/scss/components/above-header.module.scss'
import { isLoggedIn } from '../services/auth'
import UserContext from '../providers/user-provider'
import $ from 'jquery'

const AboveHeader = ({ menuType, id, notifClass, node }) => {

  const { notif, setNotif } = useContext(UserContext);
  const data = useStaticQuery(graphql`
      query {
        close: file(relativePath: { eq: "close.png" }) {
          childImageSharp {
            fluid (quality: 100){
              ...GatsbyImageSharpFluid
            }
          }
        }
        allBlockContentBasic(filter: {id: {eq: "a869412d-dd07-5c0a-89a5-12d82d1493e4"}}) {
          edges {
            node {
              id
              body {
                processed
              }
            }
          }
        }
      }
    `)

  function closeNotification() {

    if (document.getElementById("notificationMob").style.display !== "none") {
      document.getElementById("notificationMob").style.display = "none";
    }
    if (document.getElementById("notificationDesk").style.display !== "none" && document.getElementById("notificationDesk").classList.contains("d-lg-block")) {
      document.getElementById("notificationDesk").classList.remove("d-lg-block")
      document.getElementById("notificationDesk").style.display = "none";
    } else if(document.getElementById("notificationDesk").style.display !== "none") {
      document.getElementById("notificationDesk").style.display = "none";
    }
    document.getElementById("desk-navigation").style.top = "0";
    // document.getElementById("mob-navigation").style.top="0";
    // document.getElementById("search-wrapper").style.top="0";
    setNotif(false);
    if (document.getElementById("Showbag")) {
      document.getElementById("Showbag").classList.add("showbag-top");
    }

    if (isLoggedIn()) {
      document.getElementById("show-account").style.top = "98px";
    }

    if (document.getElementById("search-wrapper").style.display === "none" && document.getElementById("mob-navigation").style.display !== "none" && document.querySelector(".node-home")) {
      document.querySelector(".node-home").classList.add("node-big-home-margin");

    } else if (document.getElementById("search-wrapper").style.display === "none" && document.getElementById("mob-navigation").style.display !== "none" && document.querySelector(".node-clinical")) {
      document.querySelector(".node-clinical").classList.add("node-big-general-margin");

    } else if (document.getElementById("search-wrapper").style.display === "none" && document.getElementById("mob-navigation").style.display !== "none" && document.querySelector(".node-medical")) {
      document.querySelector(".node-medical").classList.add("node-big-general-margin");

    }
    else if (document.querySelector(".node-medical") && menuType !== "absolute") {
      document.querySelector(".node-medical").classList.add("node-general-margin");
      // document.querySelector(".search-margin").style.marginTop = "0";

    } else if (document.querySelector(".node-medical")) {
      document.querySelector(".node-medical").classList.add("node-general-margin");
      document.querySelector(".search-margin").style.marginTop = "0";

    } else if (document.querySelector(".node-clinical") && menuType !== "absolute") {
      document.querySelector(".node-clinical").classList.add("node-general-margin");
      // document.querySelector(".search-margin").style.marginTop = "0";
    } else if (document.querySelector(".node-clinical")) {
      document.querySelector(".node-clinical").classList.add("node-general-margin");
      document.querySelector(".search-margin").style.marginTop = "0";

    }
    else if (document.querySelector(".node-home") && menuType !== "absolute") {
      document.querySelector(".node-home").classList.add("node-home-margin");
    } else {
      document.querySelector(".node-home").classList.add("node-home-margin");
      document.querySelector(".search-margin").style.marginTop = "0";

    }

    let headerHeight
    if ($(window).width() < 992) {
      headerHeight = $("#mob-navigation").outerHeight() + 'px';
      $("#gatsby-focus-wrapper > div > div > main > div").first().css("padding-top", headerHeight);
    } else {
      $("#gatsby-focus-wrapper > div > div > main > div").first().css("padding-top", '0');
    }

  }

  return (
    <div id={id} className={notifClass}>
      {/* <div className="container-fluid"> */}
      <div className={[aboveHeader.wrapper, "row"].join(" ")}>
        <div className={["col", aboveHeader.columnWrapper].join(" ")}>
          <div className={aboveHeader.text} dangerouslySetInnerHTML={{__html: data.allBlockContentBasic.edges[0].node.body.processed}}></div>
          <div className={aboveHeader.closeButton}><button type="button" onClick={() => { closeNotification(); }}><Img alt="img"  fluid={data.close.childImageSharp.fluid} className={aboveHeader.closeImg} /></button></div>
        </div>
      </div>
      {/* </div> */}

    </div>
  )
}

{/* <StaticQuery
    query={graphql`
            query {
     
            }`}
            /> */}

export default AboveHeader