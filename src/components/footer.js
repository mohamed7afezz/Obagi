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



let thanksmodal =()=>{
  document.querySelector("#formsubmition").classList.remove('hidden')
  var container = document.querySelector("#formsubmition .container");

  document.querySelector("#formsubmition").addEventListener("click", function (e) {
    if (e.target !== document.querySelector("#formsubmition") && e.target !== container) return;     
    document.querySelector("#formsubmition").classList.add("hidden");
  });

  
}


const Footer = ({ siteTitle }) => {

  function removevaild(e){
    let item= e.target
    
     item.closest('.formInputCon').classList.remove('error')
     if (item.classList.contains('error-msg')) {
      item.classList.add('hide')
     }
     if (item.classList.contains('error')) {
      item.classList.remove('error')
     }
   }
    const sendFormValues = (updatedItemData) => {
     fetch(
       `https://dev-obagi.azurewebsites.net/api/webform_rest/submit`,
       {
        headers:{
          "Content-Type": "application/json",

        },
         method: 'POST',
         body: JSON.stringify(updatedItemData.obj)
       }
     )
       .then(res => res.json())
       .then(response => {
         console.log(response)
       })
       .catch(error => {
         console.log('error',error)
       });
    };
 
  
 function submitforming(e){
   var obj={webform_id : "subscription"};
   var forms = document.getElementsByClassName('needs-valid');
   var list = document.querySelectorAll('.needs-valid input:invalid');
   if (list.length > 0){
   for (var item of list) {
     item.parentElement.classList.add('error')
     item.nextSibling.classList.remove('hide')
 }}else{
   let list2 = document.querySelectorAll('.needs-valid input');
   for (let item of list2) {
     item.parentElement.classList.remove('error')
     if (item.getAttribute("type") != "checkbox") {
      item.nextSibling.classList.add('hide')
     }
     
     obj[item.getAttribute("name")]=item.value;
     thanksmodal();
  }
  
  
 sendFormValues({obj})
 }
 }

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "general1.png" }) {
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
                        icon={faPinterest}
                        className={footerStyles.icon}
                      />
                    </Link>
                  </div>
                  <div className={footerStyles.socialIcon}>
                    <a href="https://www.instagram.com/obagiclinical/">
                      <FontAwesomeIcon
                        icon={faInstagramSquare}
                        className={footerStyles.icon}
                      />
                    </a>
                  </div>
                  <div className={footerStyles.socialIcon}>
                    <a href="https://www.facebook.com/ObagiClinicalProducts">
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className={footerStyles.icon}
                      />
                    </a>
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
                    <a href="https://twitter.com/obagiclinical?lang=en">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className={footerStyles.icon}
                      />
                    </a>
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
              <form className={[footerStyles.form,"needs-valid"].join(" ")}  onSubmit={(e) => {e.preventDefault();}}>
                <div className="form-group formGroup">
                  <label
                    htmlFor="inputEmail"
                    className={footerStyles.formTitle}
                  >
                    Let’s Connect!
                  </label>
                  <div className={footerStyles.signup}>
                    <div className={[footerStyles.inputSection,'formInputCon'].join(' ')}>
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
                        name="email_address"
                        required
                      ></input>
                       <p onClick={removevaild} className="error-msg hide">Please Enter Your Eail Address</p>

                    </div>
                    <button type="button" className="btn signup-btn d-lg-none">SUBSCRIBE</button>
                  </div>
                  <div className={[footerStyles.terms,"formInputCon"].join(" ")}>
                    <label className="terms"  onClick={removevaild}>
                      Yes, I want to receive emails to keep up with the latest
                      products, skin care trends, and offers from Obagi. By
                      registering, your information will be collected and used
                      in the US subject to our US <Link className={footerStyles.termslink} to="#"> Privacy Policy</Link> and <Link className={footerStyles.termslink} to="#">Terms
                      of Use</Link>. For US consumers only.
                      <input  type="checkbox" defaultChecked={true} required name="yes_i_want_to_receive_emails_to_keep_up_with_the_latest_products" />
                      <span className="checkmark"></span>
                    </label>
                    <button type="button" onClick={(e) => {submitforming(e)}} className="btn signup-btn d-none d-lg-block">SIGN UP</button>
                  </div>
                </div>
              </form>
            </div>
            <div className={["col-12 col-lg-10 offset-lg-1 d-flex spaceBetween", footerStyles.fifthCol].join(" ")}>
              <p className={footerStyles.footerNote}>
                ©2020 <Link className="footer-obagi-link" to="www.obagi.com">www.obagi.com</Link> Cosmeceuticals LLC. All rights reserved.
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


