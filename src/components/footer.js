import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useEffect } from 'react';
import Menu from "./menu"
import footerStyles from "../assets/scss/components/footer.module.scss"
import Img from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagramSquare,
  faFacebookF,
  faYoutube,
  faTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons"






const Footer = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "general.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)



  const size = useWindowSize();
  let screenWidth = size.width;
  let mediumScreen = 768;


  // Hook



  console.log("size", screenWidth);


  return (
    <footer>
      <div className="container-fluid footer">
        <div className={footerStyles.footerSection}>
          <div className="row">
            <div className={["col-12 offset-lg-1 col-lg-2", footerStyles.firstCol].join(" ")}>

              <div className={footerStyles.obagiLogo}>
                <Img className="d-none d-lg-block" fluid={data.placeholderImage.childImageSharp.fluid} />
                <div
                  className={[
                    footerStyles.socialMedia,
                    " d-flex",
                  ].join(" ")}
                >
                  <div className={footerStyles.socialIcon}>
                    <Link to="#">
                      <FontAwesomeIcon
                        icon={faInstagramSquare}
                        className={footerStyles.icon}
                      />
                    </Link>
                  </div>
                  <div className={footerStyles.socialIcon}>
                    <Link to="#">
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className={footerStyles.icon}
                      />
                    </Link>
                  </div>
                  <div className={footerStyles.socialIcon}>
                    <Link to="#">
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className={footerStyles.icon}
                      />
                    </Link>
                  </div>
                  <div className={footerStyles.socialIcon}>
                    <Link to="#">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className={footerStyles.icon}
                      />
                    </Link>
                  </div>
                  <div className={footerStyles.socialIcon}>
                    <Link to="#">
                      <FontAwesomeIcon
                        icon={faPinterest}
                        className={footerStyles.icon}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={["col-12 col-md-6 col-lg-2 offset-lg-1", footerStyles.secondCol].join(" ")}>
              <div className="footer-menus-wrapper">
                <Menu
                  menuName={`second-footer`}
                  menuClass={`footer-menu`}
                  isExpandable={size.width < mediumScreen ? true : false}
                />
{/* 
                <div className={footerStyles.margin}></div> */}
        
                <Menu
                  menuName={`first-footer`}
                  menuClass={`footer-menu mt-md-auto`}
                  isExpandable={size.width < mediumScreen ? true : false}
                />

              </div>

            </div>
            <div className={["col-12 col-md-6 col-lg-2", footerStyles.thirdCol].join(" ")}>
              <div className="footer-menus-wrapper">
                <Menu
                  menuName={`third-footer`}
                  menuClass={`footer-menu`}
                  isExpandable={size.width < mediumScreen ? true : false}
                />

                <div className={footerStyles.margin}></div>
          
                  <Menu
                    menuName={`fourth-footer`}
                    menuClass={`footer-menu`}
                    isExpandable={size.width < mediumScreen ? true : false}
                  />

                </div>
            </div>
            {/* <div className="col-lg-1 d-none d-lg-block">
                        <div className={footerStyles.verticalLine}></div>
                    </div> */}
            <div className={["col-12 col-lg-3", footerStyles.fourthCol].join(" ")}>
              <form className={footerStyles.form}>
                <div className="form-group formGroup">
                  <label
                    htmlFor="inputEmail"
                    className={footerStyles.formTitle}
                  >
                    Let’s Connect!
                  </label>
                  <div className={footerStyles.signup}>
                    <div className={footerStyles.inputSection}>
                      <label
                        htmlFor="inputEmail"
                        className={footerStyles.formEmail}
                      >
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        className={footerStyles.formBox}
                        id="inputEmail"
                        aria-describedby="emailHelp"
                      ></input>
                    </div>
                    <button type="button" className="btn signup-btn d-lg-none">SUBSCRIBE</button>
                  </div>
                  <div className={footerStyles.terms}>
                    <label className="terms">
                      Yes, I want to receive emails to keep up with the latest
                      products, skin care trends, and offers from Obagi. By
                      registering, your information will be collected and used
                      in the U.S. subject to our U.S. <Link className={footerStyles.termslink} to="#"> Privacy Policy</Link> and <Link className={footerStyles.termslink} to="#">Terms
                      of Use</Link>. For U.S. consumers only.
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <button type="button" className="btn signup-btn d-none d-lg-block">SIGN UP</button>
                  </div>
                </div>
              </form>
            </div>
            <div className={["col-12 col-lg-10 offset-lg-1 d-flex spaceBetween", footerStyles.fifthCol].join(" ")}>
              <p className={footerStyles.footerNote}>
                ©2020 Obagi Cosmeceuticals LLC. All rights reserved.
                OBG.02313.USA.16
              </p>
              <ul className="footerprivacy">
                <Link to='#' className="footerprivacyli">Privacy Policy</Link>
                <Link to='#' className="footerprivacyli">Terms of Use</Link>
                <Link to='#' className="footerprivacyli">Cookie Policy</Link>
                <Link to='#' className="footerprivacyli">User Generated Content Terms</Link>
                <Link to='#' className="footerprivacyli">Sitemap</Link>
                <p id="demo"></p>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function useWindowSize() {

  // Initialize state with undefined width/height so server and client renders match

  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

  const [windowSize, setWindowSize] = useState({

    width: undefined

  });



  useEffect(() => {

    // Handler to call on window resize

    function handleResize() {

      // Set window width/height to state

      setWindowSize({

        width: window.innerWidth

      });

    }



    // Add event listener

    window.addEventListener("resize", handleResize);



    // Call handler right away so state gets updated with initial window size

    handleResize();



    // Remove event listener on cleanup

    return () => window.removeEventListener("resize", handleResize);

  }, []); // Empty array ensures that effect is only run on mount



  return windowSize;

}



export default Footer


