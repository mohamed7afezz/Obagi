import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
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
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <footer>
      <div className="container-fluid">
        <div className={footerStyles.footerSection}>
          <div className="row">
            <div className="col-12 offset-lg-1 col-lg-2">
              <div className={footerStyles.obagiLogo}>
                <Img fluid={data.placeholderImage.childImageSharp.fluid} />
                <div
                  className={[
                    footerStyles.socialMedia,
                    "d-none d-md-flex",
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
            <div className="col-6 col-lg-2 offset-lg-1">
              <div className="col col-padding">
                <Menu
                  menuName={`first-footer`}
                  menuClass={`footer-menu`}
                  isExpandable={false}
                />
                <div className={footerStyles.margin}></div>
              </div>
              <div className="col col-padding">
                <Menu
                  menuName={`second-footer`}
                  menuClass={`footer-menu`}
                  isExpandable={false}
                />
              </div>
            </div>
            <div className="col-6 col-lg-2">
              <Menu
                menuName={`third-footer`}
                menuClass={`footer-menu`}
                isExpandable={false}
              />
            </div>
            {/* <div className="col-lg-1 d-none d-lg-block">
                        <div className={footerStyles.verticalLine}></div>
                    </div> */}
            <div className="col-12 col-lg-3">
              <form className={footerStyles.form}>
                <div class="form-group formGroup">
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
                        class={footerStyles.formBox}
                        id="inputEmail"
                        aria-describedby="emailHelp"
                      ></input>
                    </div>
                  </div>
                  <div className={footerStyles.terms}>
                    <label class="terms">
                      Yes, I want to receive emails to keep up with the latest
                      products, skin care trends, and offers from Obagi. By
                      registering, your information will be collected and used
                      in the U.S. subject to our U.S. <Link className={footerStyles.termslink} to="#"> Privacy Policy</Link> and <Link className={footerStyles.termslink} to="#">Terms
                      of Use</Link>. For U.S. consumers only.
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                <button class={'btn signup-btn'}>SIGN UP</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-10 offset-1 d-flex spaceBetween mt-65">
              <p className={footerStyles.footerNote}>
                ©2020 Obagi Cosmeceuticals LLC. All rights reserved.
                OBG.02313.USA.16
              </p>
              <ul class="footerprivacy">
              <Link to='#' class="footerprivacyli">Privacy Policy</Link>
              <Link to='#' class="footerprivacyli">Terms of Use</Link>
              <Link to='#' class="footerprivacyli">Cookie Policy</Link>
              <Link to='#' class="footerprivacyli">User Generated Content Terms</Link>
              <Link to='#' class="footerprivacyli">Sitemap</Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
