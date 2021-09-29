import React, { useContext, useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes, { func } from "prop-types"

import * as styles from '../assets/scss/components/header.module.scss'
import Menu from './menu'
import MegaMenu from './mega-menu'
import { useLocation } from "@reach/router"
import CartContext from '../providers/cart-provider';
import human from '../assets/images/Human.png'
import Search from './search'
import ShowAccount from './show-account'
import { isLoggedIn } from '../services/auth'
import UserContext from '../providers/user-provider'
import SearchContext from "../providers/search-provider"
import AboveHeader from './above-header'
import mobLogo from '../assets/images/Obagi.svg'
import searchImg from '../assets/images/Search.svg'
import bagImg from '../assets/images/Bag.svg'
import menuImg from '../assets/images/Menu.svg'

const baseUrl = process.env.Base_URL;
const $ = require("jquery");
const Header = ({ siteTitle, nodeType, menuType, fragment, hideMobBar, showMobBar }) => {

  const { search, setSearchIndex, searchInIndex } = useContext(SearchContext)

  const { user, handleLogout } = useContext(UserContext);

  const location = useLocation();

  const data = useStaticQuery(graphql`
    query {
      ClinicalProduct: allNodeClinicalProduct {
        nodes {
          field_clinical_id
          title
          field_clinical_free_sample
          field_clinical_price
          field_clinical_sku
          field_min_quantity
          path {
            alias
          }
          field_clinical_description {
            processed
          }
          relationships {
            field_clinical_image {
              localFile {
                childImageSharp {
                  fluid (quality: 100){
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
      MedicalProduct: allNodeMedicalProduct {
        nodes {
          field_is_best_seller
          field_medical_id
          title
          field_medical_free_sample
          field_medical_price
          field_medical_premier_points_id
          field_medical_sku
          field_min_quantity
          field_medical_premier_points
          path {
            alias
          }
          field_medical_description {
            processed
          }
          relationships {
            field_medical_rx {
              name
            }
            field_medical_image {
              localFile {
                childImageSharp {
                  fluid (quality: 100){
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
      logo: file(relativePath: { eq: "obagi.png" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
      logoDesk: file(relativePath: { eq: "obagi-logo1.png" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
      search: file(relativePath: { eq: "search.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
      searchIcon: file(relativePath: { eq: "search.png" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
      close: file(relativePath: { eq: "close.png" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cart: file(relativePath: { eq: "bag.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
      menu: file(relativePath: { eq: "menu.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }


      medical: file(relativePath: { eq: "11-29-201841057.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
    }
    clinical: file(relativePath: { eq: "2022-ob-02-0076-group-shot.png" }) {
      childImageSharp {
        fluid (quality: 100){
          ...GatsbyImageSharpFluid
        }
      }
  }
  ourstory: file(relativePath: { eq: "01-0576-copy.png" }) {
    childImageSharp {
      fluid (quality: 100){
        ...GatsbyImageSharpFluid
      }
    }
}
innovation: file(relativePath: { eq: "2019-ob-14-petri-dish-0242-copy.png" }) {
  childImageSharp {
    fluid (quality: 100){
      ...GatsbyImageSharpFluid
    }
  }
}
skincare: file(relativePath: { eq: "04-0868-copy.png" }) {
  childImageSharp {
    fluid (quality: 100){
      ...GatsbyImageSharpFluid
    }
  }
}
istocksmall: file(relativePath: { eq: "i-stock-985783976.png" }) {
  childImageSharp {
    fluid (quality: 100){
      ...GatsbyImageSharpFluid
    }
  }
}

blog: file(relativePath: { eq: "blog-clenziderm-model.png" }) {
  childImageSharp {
    fluid (quality: 100){
      ...GatsbyImageSharpFluid
    }
  }
}

press: file(relativePath: { eq: "11-29-201841195.png" }) {
  childImageSharp {
    fluid (quality: 100){
      ...GatsbyImageSharpFluid
    }
  }
}
personIcon: file(relativePath: { eq: "user-type.png" }) {
  childImageSharp {
    fixed (quality: 100){
      ...GatsbyImageSharpFixed
    }
  }
}

    istock: file(relativePath: { eq: "2-i-stock-985783976.png" }) {
      childImageSharp {
        fluid (quality: 100){
          ...GatsbyImageSharpFluid
        }
      }
  }
    testarrow: file(relativePath: { eq: "small-right.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
    }
    skinclusion: file(relativePath: { eq: "skinclusion-logo-2019-tag-outlined-sm-tm.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
    }


    }
  `)
 
  setSearchIndex(data.ClinicalProduct, data.MedicalProduct)
  useEffect(() => {
    // if (typeof window !== "undefined") {

    //   (function (c, b, f, k, a) { c[b] = c[b] || {}; for (c[b].q = c[b].q || []; a < k.length;)f(k[a++], c[b]) })(window, "extole", function (c, b) { b[c] = b[c] || function () { b.q.push([c, arguments]) } }, ["createZone"], 0);
    //   window.extole.createZone({
    //     name: "mobile_menu",
    //     element_id: 'extole_zone_mobile_menu',
    //     data: {
    //       "partner_user_id": user ? user.id : "", // RECOMMENDED IF AVAILABLE
    //       "email": user ? user.email : "", // RECOMMENDED IF AVAILABLE
    //       "first_name": user ? user.first_name : "", // RECOMMENDED IF AVAILABLE
    //       "last_name": user ? user.last_name : "" // RECOMMENDED IF AVAILABLE
    //     }
    //   });


    // }
      adjustHeight();

      $('#mobNavButton').css('display','block');

  }, []);


  async function inputval(e) {
    e.preventDefault();
    var search = document.getElementById("search-wrapper");
    var deskNav = document.getElementById("desk-navigation");
    var nav = document.getElementById("mob-navigation");
    if (e.keyCode === 13) {
      // Cancel the default action, if needed
      search.style.display = "none";
      deskNav.classList.add("d-lg-block");
      nav.style.display = "block";
      deskOpenSearch();
      // openSearch();
      // Trigger the button element with a click
      document.querySelector(".searchIcon").click();
    }
    let searchkey = e.target.value.toLowerCase();
    searchInIndex(searchkey)

    // if ( searchkey.length >2) {
    //   search(searchkey)

    // }
  }
  function removeFirstIcons() {
    var x = document.getElementById("first-icons");
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }

  function openBag() {
    if (document.querySelector(".Notify")) {
      document.querySelector(".Notify").style.display = "block";
    }
  }
  function removeCategory() {
    let y = document.querySelector("#category-section");
    if (y.style.display === "none" &&  (!nodeType.includes('medical') && !nodeType.includes('clinical') )) {
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
  }

  function openSearch() {
    var search = document.getElementById("search-wrapper");
    var nav = document.getElementById("mob-navigation");
    var not = document.getElementById("notificationMob");
    var body = document.querySelector("body");

    if (search.style.display === "none" && not.style.display !== "none" && document.querySelector(".node-clinical")) {

      search.style.display = "block";
      nav.style.display = "none";
      // document.querySelector(".node-clinical").style.marginTop= "134.5px";


    } else if (search.style.display === "none" && not.style.display !== "none" && document.querySelector(".node-medical")) {

      search.style.display = "block";
      nav.style.display = "none";
      // document.querySelector(".node-medical").style.marginTop= "134.5px";

    } else if (search.style.display === "none" && not.style.display !== "none" && document.querySelector(".node-home")) {

      search.style.display = "block";
      nav.style.display = "none";
      // document.querySelector(".node-home").style.marginTop= "134.5px";


    }

    else if (search.style.display === "none" && not.style.display === "none" && document.querySelector(".node-home")) {
      search.style.display = "block";
      nav.style.display = "none";
      // document.querySelector(".node-home").style.marginTop= "78.5px";


      // body.classList.remove("body-search-notif");
    } else if (search.style.display === "none" && not.style.display === "none" && document.querySelector(".node-clinical")) {
      search.style.display = "block";
      nav.style.display = "none";
      // document.querySelector(".node-clinical").style.marginTop= "78.5px";


      // body.classList.remove("body-search-notif");
    } else if (search.style.display === "none" && not.style.display === "none" && document.querySelector(".node-medical")) {
      search.style.display = "block";
      nav.style.display = "none";
      // document.querySelector(".node-medical").style.marginTop= "78.5px";


      // body.classList.remove("body-search-notif");
    }
    else if (search.style.display !== "none" && not.style.display !== "none" && document.querySelector(".node-home")) {
      search.style.display = "none";
      nav.style.display = "block";
      // document.querySelector(".node-home").style.marginTop= "192.5px";

    }
    else if (search.style.display !== "none" && not.style.display !== "none" && document.querySelector(".node-clinical")) {
      search.style.display = "none";
      nav.style.display = "block";
      // document.querySelector(".node-clinical").style.marginTop= "135.5px";

    }
    else if (search.style.display !== "none" && not.style.display !== "none" && document.querySelector(".node-medical")) {
      search.style.display = "none";
      nav.style.display = "block";
      // document.querySelector(".node-medical").style.marginTop= "135.5px";

    } else if (search.style.display !== "none" && not.style.display === "none" && document.querySelector(".node-home")) {
      search.style.display = "none";
      nav.style.display = "block";
      // document.querySelector(".node-home").style.marginTop= "136.5px";

    }
    else if (search.style.display !== "none" && not.style.display === "none" && document.querySelector(".node-medical")) {
      search.style.display = "none";
      nav.style.display = "block";
      // document.querySelector(".node-medical").style.marginTop= "79.5px";

    }
    else if (search.style.display !== "none" && not.style.display === "none" && document.querySelector(".node-clinical")) {
      search.style.display = "none";
      nav.style.display = "block";
      // document.querySelector(".node-clinical").style.marginTop= "79.5px";

    }
    else {
      search.style.display = "none";
      nav.style.display = "block";


    }
  }

  function deskOpenSearch() {
    var search = document.getElementById("search-wrapper");
    var not = document.getElementById("notificationDesk");
    var body = document.querySelector("body");
    var deskNav = document.getElementById("desk-navigation");

    if (search.style.display === "none" && not.style.display !== "none" && menuType === "absolute") {

      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
      search.classList.add("search-margin");

    } else if (search.style.display === "none" && not.style.display !== "none" && menuType !== "absolute") {

      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
      // search.style.position = "relative";
      search.classList.add("relative-class");

    } else if (search.style.display === "none" && not.style.display === "none" && menuType === "absolute") {
      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
    } else if (search.style.display === "none" && not.style.display === "none" && menuType !== "absolute") {

      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
      // search.style.position = "relative";
      search.classList.add("relative-class");

    }
    else {
      search.style.display = "none";
      deskNav.classList.add("d-lg-block");
    }
  }
//   let homeMargin
//   let medicalMargin
//   let clinicalMargin

//   homeMargin = $(".node-home").css('margin-top');
//   clinicalMargin = $(".node-clinical").css('margin-top');
//   medicalMargin = $(".node-medical").css('margin-top');


  function adjustHeight() {
    let headerHeight
    if ($(window).width() < 992) {
      headerHeight = $("#mob-navigation").outerHeight() + 'px';
      $("#gatsby-focus-wrapper > div > div > main > div").first().css("padding-top", headerHeight);
    } else {
      $("#gatsby-focus-wrapper > div > div > main > div").first().css("padding-top", '0');
    }
  
  }

//   function defer(method) {
//     if (window.jQuery) {
//         method();
//     } else {
//         setTimeout(function() { defer(method) }, 50);
//     }
// }

  if(typeof window !== "undefined") {  
    $(window).on('resize', function () {
      adjustHeight();
    })
  }

  // $(window).on('resize', function () {


  // //   if ($(window).width() > 768) {
  // //     $(".node-clinical").css("margin-top", "0");
  // //     $(".node-medical").css("margin-top", "0");
  // //     $(".node-home").css("margin-top", "0");
  // //   } else if ($(window).width() <= 768){
  // //     $(".node-clinical").css("margin-top", homeMargin);
  // //     $(".node-medical").css("margin-top", clinicalMargin);
  // //     $(".node-home").css("margin-top", medicalMargin);
  // //   }
  // //   // if ($(window).width() <= 768) {

  // //   //   if($(".search-margin")) {
  // //   //     $(".search-margin").removeClass("search-margin");
  // //   //   }
  // //   // }
  // // })

  

  return (


    <header>
      <div className={[styles.header, "d-lg-none"].join(" ")} id="mob-navigation">
        <div className={["container-fluid", styles.navContainer].join(" ")}>
          <AboveHeader menuType={menuType} id="notificationMob" className="d-lg-none" />

          <div className="row">
            <div className={styles.topNav}>
              <div className="col-4 offset-0">
                <Link to="/" ><img alt="img"  src={mobLogo} className={styles.obagiLogo} /></Link>
              </div>

              <div className="col-6 offset-2">
                <div className={styles.icons}>
                  <div className={styles.firstIcons} id="first-icons">
                    <div id="search-button" onClick={() => { openSearch(); }}><button type="button" className={styles.navButton}><img alt="img"  src={searchImg} className={styles.iconImg} /></button></div>
                    <CartContext.Consumer>
                      {value => {
                          let productsQuantity = value && value.state.cart && value.state.cart.lineItems && value.state.cart.lineItems.physical_items && value.state.cart.lineItems.physical_items.map(item => item.quantity)
                          .filter(product => product != undefined)
                          .reduce((acc, i) => acc + i, 0)
                        return (
                          <div className={styles.cartWrapper}>
                            <button type="button" className={'locker'} onClick={() => { value.addNotification('Item added successfully'); openBag(); }} className={styles.navButton}>
                              <img alt="img"  src={bagImg} className={styles.iconImg} />
                              {productsQuantity > 0 && (
                                  <p className={[styles.cartCounter, "cahngepos"].join(" ")}>{productsQuantity}</p>
                                )}
                            </button></div>
                        );
                      }}
                    </CartContext.Consumer>

                  </div>
                  <button id="mobNavButton" style={{display: "none"}} className={[styles.navButton, styles.iconImg, styles.menuButton, "navbar-toggler"].join(" ")} type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" onClick={() => { removeCategory(); }}></button>
                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col col-padding">
              <div className="collapse navbar-collapse nav-container" id="navbar">
                <Menu menuName={`main-nav-mobile`} menuClass={`navbar navbar-expand-lg nav-mobile`} isExpandable={true} />

                <div className={[styles.lowerSection, "mob-menu-lower-section"].join(" ")}>
                  <span className={[styles.spacebetween, "d-flex"].join(" ")}><img src={human} alt="img"/>{user ? <Link to="/my-account/orders">Welcome, {user.first_name}</Link> : <Link to="/my-account/signin">SIGN IN</Link>}</span>
                  <span id='extole_zone_mobile_menu' className={styles.mobileReferralSpan}>Refer a friend</span>
                </div>

              </div>
            </div>
          </div>



          <div className={styles.categorySection} id="category-section" style={{ display: (showMobBar? "block" : nodeType.includes('medical') || nodeType.includes('clinical') || hideMobBar ? "none" : "block" )}} >
            <div className="row">
              <div className="col-6 col-md-3 offset-md-3">
                <Link to="/medical"><div className={nodeType ? (nodeType.includes('medical') ? styles.category + ' ' + styles.activeSubmenu : styles.category) : styles.category}>MEDICAL</div></Link>
              </div>
              <div className="col-6 col-md-3">
                <Link to="/clinical"><div className={nodeType ? (nodeType.includes('clinical') ? styles.category + ' ' + styles.activeSubmenu : styles.category) : styles.category}>CLINICAL</div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={styles.searchWrapper} id="search-wrapper" style={{ display: "none" }}>
        <div>
          <div className={["container-fluid", styles.relativeSearch].join(" ")}>
            <div className="row">
              <div className="col-12 col-lg-10 offset-lg-1">
                <div className={styles.searchSection}>
                  <Link onClick={() => { deskOpenSearch(); }} to="/search-page" className={[styles.searchIcon, "searchIcon"].join(" ")} ><Img alt="img"  fixed={data.searchIcon.childImageSharp.fixed} /></Link>
                  <input type="search" onKeyUp={inputval} className={[styles.searchInput, "searchInputm"].join(" ")}></input>
                  <button className={[styles.closeIcon, "d-lg-none"].join(" ")} onClick={() => { openSearch(); }}><Img alt="img"  fixed={data.close.childImageSharp.fixed} /></button>
                  <button type="button" className={[styles.closeIcon, "d-none d-lg-block "].join(" ")} onClick={() => { deskOpenSearch(); }}><Img alt="img"  fixed={data.close.childImageSharp.fixed} /></button>
                </div>
              </div>
            </div>


            <div className={["row", styles.searchResultWrapper].join(" ")}>
              <div className="col-12 col-lg-10 offset-lg-1">
                <div className={[styles.results, "pb-48"].join(" ")}>
                  <Search />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={["d-none d-lg-block col-padding ", styles.navigationBarDesk, (menuType === 'absolute' ? 'absolute-extended ' + styles.topStyles : ' relative-general-nav ' + styles.generalNav)].join(" ")} id="desk-navigation">
        <div className={styles.upperNav}>

          <div className="row mr-0 ml-0">
            <div className="container-fluid">
              <div className="row mr-0">



                <div className="col col-padding">
                  <div className={styles.mainLinks}>
                    <Link to="/medical" className={nodeType ? (nodeType.includes('medical') ? styles.navSubmenu + ' ' + styles.activeSubmenu : styles.navSubmenu) : styles.navSubmenu}>MEDICAL</Link>
                    <Link to="/clinical" className={nodeType ? (nodeType.includes('clinical') ? styles.navSubmenu + ' ' + styles.activeSubmenu : styles.navSubmenu) : styles.navSubmenu}>CLINICAL</Link>
                  </div>
                </div>

                <div className={["col", styles.logoSection].join(" ")}>
                  <Link to="/" ><Img alt="img"  fixed={data.logoDesk.childImageSharp.fixed} className={styles.obagiLogo} /></Link>
                </div>

                <div className="col col-padding">
                  <div className={styles.navLastSection}>
                    <p>
                      {
                        user ?
                          <>
                            <button type="button" data-toggle="modal" data-target="#show-account">
                              <Img alt="img"  fixed={data.personIcon.childImageSharp.fixed} /> Welcome, {user.first_name}
                            </button>
                            {/* <button type="button" onClick={handleLogout}>Logout</button> */}
                          </>
                          :
                          <Link to="/my-account/signin">SIGN IN</Link>
                      }
                    </p>
                    <div className={styles.navButton} onClick={() => { deskOpenSearch(); }}><button type="button" ><Img alt="img"  fluid={data.search.childImageSharp.fluid} className={styles.iconImg} /></button></div>
                    <CartContext.Consumer>
                      {value => {
                          let productsQuantity = value && value.state.cart && value.state.cart.lineItems && value.state.cart.lineItems.physical_items && value.state.cart.lineItems.physical_items.map(item => item.quantity)
                          .filter(product => product != undefined)
                          .reduce((acc, i) => acc + i, 0)
                        return (
                          <div className={styles.navButton}>
                            <div className={styles.cartWrapper}>
                              <button type="button" className={'locker'} onClick={() => { value.addNotification('Item added successfully'); openBag(); }}><Img alt="img"  fluid={data.cart.childImageSharp.fluid} className={styles.iconImg} />
                                {productsQuantity > 0 && (
                                    <p className={[styles.cartCounter, "cahngepos"].join(" ")}>{productsQuantity}</p>
                                  )}
                              </button></div></div>
                        );
                      }}
                    </CartContext.Consumer>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        <div className={styles.lowerNav}>
          <div className="row mr-0 ml-0">
            <div className="container-fluid">
              <div className="row mr-0 ml-0">
                <div className="col-12 col-padding">

                  {nodeType ? (nodeType.includes('clinical') ? <Menu menuName={`clinical-navigation`} menuClass={`navbar extended-nav`} />
                    : nodeType.includes('medical') ? <Menu menuName={`medical-navigation`} menuClass={`navbar extended-nav`} />
                      : (menuType === 'absolute' ? <MegaMenu menuClass={`navbar nav-desk`} isExpandable={true} /> : <MegaMenu menuClass={`navbar nav-desk relative-nav-desk`} isExpandable={true} />))
                    : (menuType === 'absolute' ? <MegaMenu menuClass={`navbar nav-desk`} isExpandable={true} /> : <MegaMenu menuClass={`navbar nav-desk relative-nav-desk`} isExpandable={true} />)}


                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {isLoggedIn() ? <ShowAccount /> : ''}







    </header>


  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}



export default Header