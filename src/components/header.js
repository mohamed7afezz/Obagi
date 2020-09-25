import React, { useContext, useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from "prop-types"

import headerStyles from '../assets/scss/components/header.module.scss'
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

const baseUrl = process.env.Base_URL;

const Header = ({ siteTitle, nodeType, menuType }) => {
  const {search} = useContext(SearchContext)
  const {user, handleLogout} = useContext(UserContext);
 
  const location = useLocation();
 
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "obagi.png" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
      logoDesk: file(relativePath: { eq: "obagi-logo.png" }) {
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

  useEffect(() => {
    if (typeof window !== "undefined") {

      (function(c,b,f,k,a){c[b]=c[b]||{};for(c[b].q=c[b].q||[];a<k.length;)f(k[a++],c[b])})(window,"extole",function (c,b){b[c]=b[c]||function (){b.q.push([c,arguments])}},["createZone"],0);
      window.extole.createZone({
          name: "mobile_menu",
          element_id: 'extole_zone_mobile_menu',
          data: {
            "partner_user_id": user ? user.id : "", // RECOMMENDED IF AVAILABLE
            "email": user ? user.email : "", // RECOMMENDED IF AVAILABLE
            "first_name": user ? user.first_name : "", // RECOMMENDED IF AVAILABLE
            "last_name": user ? user.last_name : "" // RECOMMENDED IF AVAILABLE
          }
      });

    }

  }, []);

 
  async  function  inputval(e){
    e.preventDefault();
    if (e.keyCode === 13) {
      // Cancel the default action, if needed
      console.log('ay')
      // Trigger the button element with a click
      document.querySelector(".searchIcon").click();
    }
    let searchkey= e.target.value
  if ( searchkey.length >2) {
    search(searchkey)
}else{
  search("searchkey")
} 
   }
  function removeFirstIcons() {
    var x = document.getElementById("first-icons");
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }

  function removeCategory() {
    var y = document.getElementById("category-section");
    if (y.style.display === "none") {
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
  }


  function openSearch() {
    var search = document.getElementById("search-wrapper");
    var nav = document.getElementById("mob-navigation");
    var not = document.getElementById("notification");
    var body = document.querySelector("body");

    if (search.style.display === "none" && not.style.display !== "none" && document.querySelector(".node-clinical"))  {

      search.style.display = "block";
      nav.style.display = "none";
      document.querySelector(".node-clinical").style.marginTop= "134.5px";


    } else if (search.style.display === "none" && not.style.display !== "none" && document.querySelector(".node-medical"))  {

      search.style.display = "block";
      nav.style.display = "none";
      document.querySelector(".node-medical").style.marginTop= "134.5px";

    } else if (search.style.display === "none" && not.style.display !== "none" && document.querySelector(".node-home"))  {

      search.style.display = "block";
      nav.style.display = "none";
      document.querySelector(".node-home").style.marginTop= "134.5px";


    } 
    
    else if (search.style.display === "none" && not.style.display === "none" && document.querySelector(".node-home")) {
      search.style.display = "block";
      nav.style.display = "none";
      document.querySelector(".node-home").style.marginTop= "78.5px";


      // body.classList.remove("body-search-notif");
    }    else if (search.style.display === "none" && not.style.display === "none" && document.querySelector(".node-clinical")) {
      search.style.display = "block";
      nav.style.display = "none";
      document.querySelector(".node-clinical").style.marginTop= "78.5px";


      // body.classList.remove("body-search-notif");
    }     else if (search.style.display === "none" && not.style.display === "none" && document.querySelector(".node-medical")) {
      search.style.display = "block";
      nav.style.display = "none";
      document.querySelector(".node-medical").style.marginTop= "78.5px";


      // body.classList.remove("body-search-notif");
    }
     else if (search.style.display !== "none" && not.style.display !== "none" && document.querySelector(".node-home")) {
      search.style.display = "none";
      nav.style.display = "block";
      document.querySelector(".node-home").style.marginTop= "192.5px";

    }
    else if (search.style.display !== "none" && not.style.display !== "none" && document.querySelector(".node-clinical")) {
      search.style.display = "none";
      nav.style.display = "block";
      document.querySelector(".node-clinical").style.marginTop= "135.5px";

    }
    else if (search.style.display !== "none" && not.style.display !== "none" && document.querySelector(".node-medical")) {
      search.style.display = "none";
      nav.style.display = "block";
      document.querySelector(".node-medical").style.marginTop= "135.5px";

    }    else if (search.style.display !== "none" && not.style.display === "none" && document.querySelector(".node-home")) {
      search.style.display = "none";
      nav.style.display = "block";
      document.querySelector(".node-home").style.marginTop= "136.5px";

    }
    else if (search.style.display !== "none" && not.style.display === "none" && document.querySelector(".node-medical")) {
      search.style.display = "none";
      nav.style.display = "block";
      document.querySelector(".node-medical").style.marginTop= "79.5px";

    }
    else if (search.style.display !== "none" && not.style.display === "none" && document.querySelector(".node-clinical")) {
      search.style.display = "none";
      nav.style.display = "block";
      document.querySelector(".node-clinical").style.marginTop= "79.5px";

    }
    else {
      search.style.display = "none";
      nav.style.display = "block";

      
    }
  }

  function deskOpenSearch() {
    var search = document.getElementById("search-wrapper");
    var not = document.getElementById("notification");
    var body = document.querySelector("body");
    var deskNav = document.getElementById("desk-navigation");

    if (search.style.display === "none" && not.style.display !== "none" && menuType === "absolute") {

      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
      search.classList.add("search-margin");

    } else if (search.style.display === "none" && not.style.display !== "none" && menuType !== "absolute") {

      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
      search.style.position = "relative";

    } else if (search.style.display === "none" && not.style.display === "none" && menuType === "absolute") {
      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
    } else if (search.style.display === "none" && not.style.display === "none" && menuType !== "absolute") {

      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
      search.style.position = "relative";

    }
    else {
      search.style.display = "none";
      deskNav.classList.add("d-lg-block");
    }
  }



  return (


    <header>
      <div className={[headerStyles.header, "d-lg-none"].join(" ")} id="mob-navigation">
        <div className={["container-fluid", headerStyles.navContainer].join(" ")}>
          <div className="row">
            <div className={headerStyles.topNav}>
              <div className="col-4 offset-0">
                <Link to="/" ><Img fixed={data.logo.childImageSharp.fixed} className={headerStyles.obagiLogo} /></Link>
              </div>

              <div className="col-6 offset-2">
                <div className={headerStyles.icons}>
                  <div className={headerStyles.firstIcons} id="first-icons">
                    <div id="search-button" onClick={() => { openSearch(); }}><Link to="#" className={headerStyles.navButton}><Img fluid={data.search.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
                    <CartContext.Consumer>
                      {value => {
                        return (
                          <div className={headerStyles.cartWrapper}>
                            <button to="#" className={'locker'} onClick={() => value.addNotification('Item added successfully')} className={headerStyles.navButton}>
                              <Img fluid={data.cart.childImageSharp.fluid} className={headerStyles.iconImg} />
                              {value &&
                                value.state.cart &&
                                value.state.cart.numberItems > 0 && (
                                  <p className={[headerStyles.cartCounter, "cahngepos"].join(" ")}>{value.state.cart.numberItems}</p>
                                )}
                            </button></div>
                        );
                      }}
                    </CartContext.Consumer>

                  </div>
                  <button className={[headerStyles.navButton, headerStyles.iconImg, headerStyles.menuButton, "navbar-toggler"].join(" ")} type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" onClick={() => { removeFirstIcons(); removeCategory(); }}></button>
                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col col-padding">
              <div className="collapse navbar-collapse nav-container" id="navbar">
                <Menu menuName={`main-nav-mobile`} menuClass={`navbar navbar-expand-lg nav-mobile`} isExpandable={true} />

                <div className={headerStyles.lowerSection}>
                  <span className={[headerStyles.spacebetween, "d-flex"].join(" ")}><img src={human} />{user? <Link to="/my-account/orders">Welcome, {user.first_name}</Link> : <Link to="/my-account/signin">SIGN IN</Link>}</span>
                  <span><Link to="#">PREMIER POINTS</Link></span>
                </div>
                <span id='extole_zone_mobile_menu' className={headerStyles.mobileReferralSpan}>Refer a friend</span>
              </div>
            </div>
          </div>



          <div className={headerStyles.categorySection} id="category-section" style={{ display: (nodeType ? (nodeType.includes('medical') || nodeType.includes('clinical') ? "none" : "block") : "block") }} >
            <div className="row">
              <div className="col-6 col-md-3 offset-md-3">
                <Link to="/medical"><div className={nodeType ? (nodeType.includes('medical') ? headerStyles.category + ' ' + headerStyles.activeSubmenu : headerStyles.category) : headerStyles.category}>MEDICAL</div></Link>
              </div>
              <div className="col-6 col-md-3">
                <Link to="/clinical"><div className={nodeType ? (nodeType.includes('clinical') ? headerStyles.category + ' ' + headerStyles.activeSubmenu : headerStyles.category) : headerStyles.category}>CLINICAL</div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={headerStyles.searchWrapper} id="search-wrapper" style={{ display: "none" }}>
        <div>
          <div className={["container-fluid", headerStyles.relativeSearch].join(" ")}>
            <div className="row">
              <div className="col-12 col-lg-10 offset-lg-1">
                <div className={headerStyles.searchSection}>
                  <Link to="/search-page" className={[headerStyles.searchIcon,"searchIcon"].join(" ")} ><Img fixed={data.searchIcon.childImageSharp.fixed} /></Link>
                  <input  type="search" onKeyUp={inputval} className={[headerStyles.searchInput,"searchInputm"].join(" ")}></input>
                  <button className={[headerStyles.closeIcon, "d-lg-none"].join(" ")} onClick={() => { openSearch(); }}><Img fixed={data.close.childImageSharp.fixed} /></button>
                  <button type="button" className={[headerStyles.closeIcon, "d-none d-lg-block "].join(" ")} onClick={() => { deskOpenSearch(); }}><Img fixed={data.close.childImageSharp.fixed} /></button>
                </div>
              </div>
            </div>


              <div className={["row", headerStyles.searchResultWrapper].join(" ")}>
                <div className="col-12 col-lg-10 offset-lg-1">
                  <div className={[headerStyles.results,"pb-48"].join(" ")}>
                    <Search />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>


      <div className={["d-none d-lg-block col-padding ", headerStyles.navigationBarDesk, (menuType === 'absolute' ? 'absolute-extended ' + headerStyles.topStyles : ' relative-general-nav ' + headerStyles.generalNav)].join(" ")} id="desk-navigation">
        <div className={headerStyles.upperNav}>
          <div className="row mr-0 ml-0">
            <div className="container-fluid">
              <div className="row mr-0 ml-0">



                <div className="col col-padding">
                  <div className={headerStyles.mainLinks}>
                    <Link to="/medical" className={nodeType ? (nodeType.includes('medical') ? headerStyles.navSubmenu + ' ' + headerStyles.activeSubmenu : headerStyles.navSubmenu) : headerStyles.navSubmenu}>MEDICAL</Link>
                    <Link to="/clinical" className={nodeType ? (nodeType.includes('clinical') ? headerStyles.navSubmenu + ' ' + headerStyles.activeSubmenu : headerStyles.navSubmenu) : headerStyles.navSubmenu}>CLINICAL</Link>
                  </div>
                </div>

                <div className={["col", headerStyles.logoSection].join(" ")}>
                  <Link to="/" ><Img fixed={data.logoDesk.childImageSharp.fixed} className={headerStyles.obagiLogo} /></Link>
                </div>

                <div className="col col-padding">
                  <div className={headerStyles.navLastSection}>
                    <p>
                      {
                        user?
                          <>
                            <button type="button" data-toggle="modal" data-target="#show-account">
                              person icon
                            </button>
                            {/* <button type="button" onClick={handleLogout}>Logout</button> */}
                          </>
                          :
                          <Link to="/my-account/signin">SIGN IN</Link>
                      }
                    </p>
                    <div className={headerStyles.navButton} onClick={() => { deskOpenSearch(); }}><button type="button" ><Img fluid={data.search.childImageSharp.fluid} className={headerStyles.iconImg} /></button></div>
                    <CartContext.Consumer>
                      {value => {
                        return (
                          <div className={headerStyles.navButton}>
                            <div className={headerStyles.cartWrapper}>
                              <button to="#" className={'locker'} onClick={() => value.addNotification('Item added successfully')}><Img fluid={data.cart.childImageSharp.fluid} className={headerStyles.iconImg} />
                                {value &&
                                  value.state.cart &&
                                  value.state.cart.numberItems > 0 && (
                                    <p className={[headerStyles.cartCounter, "cahngepos"].join(" ")}>{value.state.cart.numberItems}</p>
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


        <div className={headerStyles.lowerNav}>
          <div className="row mr-0 ml-0">
            <div className="container-fluid">
              <div className="row mr-0 ml-0">
                <div className="col-12 col-padding">

                  {nodeType ? (nodeType.includes('clinical') ? <Menu menuName={`clinical-navigation`} menuClass={`navbar extended-nav`} />
                    : nodeType.includes('medical') ? <Menu menuName={`medical-navigation`} menuClass={`navbar extended-nav`} /> 
                    : (menuType === 'absolute'? <MegaMenu menuClass={`navbar nav-desk`} isExpandable={true} /> : <MegaMenu menuClass={`navbar nav-desk relative-nav-desk`} isExpandable={true} />))
                    : (menuType === 'absolute'? <MegaMenu menuClass={`navbar nav-desk`} isExpandable={true} /> : <MegaMenu menuClass={`navbar nav-desk relative-nav-desk`} isExpandable={true} />)}


                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
     

      {isLoggedIn()? <ShowAccount />: ''}







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
