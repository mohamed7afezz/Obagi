import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes, { func } from "prop-types"
import React from "react"
import headerStyles from '../assets/scss/components/header.module.scss'
import Menu from './menu'
import MegaMenu from './mega-menu'
import { useLocation } from "@reach/router"
import CartContext from '../providers/cart-provider';
import human from '../assets/images/Human.png'
import Search from './search'

const Header = ({ siteTitle, nodeType, menuType }) => {

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
          fluid {
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
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      menu: file(relativePath: { eq: "menu.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }


      medical: file(relativePath: { eq: "11-29-201841057.png" }) {
        childImageSharp {
            fluid {
                ...GatsbyImageSharpFluid
            }
        }
    }
    clinical: file(relativePath: { eq: "2022-ob-02-0076-group-shot.png" }) {
      childImageSharp {
          fluid {
              ...GatsbyImageSharpFluid
          }
      }
  }
  ourstory: file(relativePath: { eq: "01-0576-copy.png" }) {
    childImageSharp {
        fluid {
            ...GatsbyImageSharpFluid
        }
    }
}
innovation: file(relativePath: { eq: "2019-ob-14-petri-dish-0242-copy.png" }) {
  childImageSharp {
      fluid {
          ...GatsbyImageSharpFluid
      }
  }
}
skincare: file(relativePath: { eq: "04-0868-copy.png" }) {
  childImageSharp {
      fluid {
          ...GatsbyImageSharpFluid
      }
  }
}
istocksmall: file(relativePath: { eq: "i-stock-985783976.png" }) {
  childImageSharp {
      fluid {
          ...GatsbyImageSharpFluid
      }
  }
}

blog: file(relativePath: { eq: "blog-clenziderm-model.png" }) {
  childImageSharp {
      fluid {
          ...GatsbyImageSharpFluid
      }
  }
}

press: file(relativePath: { eq: "11-29-201841195.png" }) {
  childImageSharp {
      fluid {
          ...GatsbyImageSharpFluid
      }
  }
}

    istock: file(relativePath: { eq: "2-i-stock-985783976.png" }) {
      childImageSharp {
          fluid {
              ...GatsbyImageSharpFluid
          }
      }
  }
    testarrow: file(relativePath: { eq: "small-right.png" }) {
        childImageSharp {
            fluid {
                ...GatsbyImageSharpFluid
            }
        }
    }
    skinclusion: file(relativePath: { eq: "skinclusion-logo-2019-tag-outlined-sm-tm.png" }) {
        childImageSharp {
            fluid {
                ...GatsbyImageSharpFluid
            }
        }
    }


    }
  `)

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

    if (search.style.display === "none" && not.style.display !== "none") {

      search.style.display = "block";
      nav.style.display = "none";
      body.classList.remove("body-small-margin");
      body.classList.add("body-search-notif");

    } else if (search.style.display === "none" && not.style.display === "none") {
      search.style.display = "block";
      nav.style.display = "none";
      body.classList.remove("body-small-margin");
      body.classList.add("body-search-margin");
      // body.classList.remove("body-search-notif");
    } else if (search.style.display !== "none" && not.style.display !== "none") {
      search.style.display = "none";
      nav.style.display = "block";
      body.classList.remove("body-search-margin");
      body.classList.remove("body-search-notif");
      body.classList.remove("body-small-margin");
    }
    else {
      search.style.display = "none";
      nav.style.display = "block";
      body.classList.remove("body-search-margin");
      body.classList.remove("body-search-notif");
      body.classList.add("body-small-margin");
      
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

    } else if (search.style.display === "none" && not.style.display !== "none" && menuType === "relative") {

      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
      search.style.position = "relative";

    } else if (search.style.display === "none" && not.style.display === "none" && menuType === "absolute") {
      search.style.display = "block";
      deskNav.classList.remove("d-lg-block");
    } else if (search.style.display === "none" && not.style.display === "none" && menuType === "relative") {

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
                  <span className={[headerStyles.spacebetween, "d-flex"].join(" ")}><img src={human} /><Link to="#">Welcome, Celia</Link></span>
                  <span><Link to="#">PREMIER POINTS</Link></span>
                </div>
              </div>
            </div>
          </div>

          <div className={headerStyles.categorySection} id="category-section" style={{ display: "block" }}>
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
        <div className={headerStyles.relativeSearch}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-10 offset-lg-1">
                <div className={headerStyles.searchSection}>
                  <div className={headerStyles.searchIcon}><Img fixed={data.searchIcon.childImageSharp.fixed} /></div>
                  <input type="search" className={headerStyles.searchInput}></input>
                  <button className={[headerStyles.closeIcon, "d-lg-none"].join(" ")} onClick={() => { openSearch(); }}><Img fixed={data.close.childImageSharp.fixed} /></button>
                  <button className={[headerStyles.closeIcon, "d-none d-lg-block "].join(" ")} onClick={() => { deskOpenSearch(); }}><Img fixed={data.close.childImageSharp.fixed} /></button>
                </div>
              </div>
            </div>


              <div className={["row", headerStyles.searchResultWrapper].join(" ")}>
                <div className="col-12 col-lg-10 offset-lg-1">
                  <div className={headerStyles.results}>
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
                    <p><Link to="#">SIGN IN</Link></p>
                    <div className={headerStyles.navButton} onClick={() => { deskOpenSearch(); }}><Link to="#" ><Img fluid={data.search.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
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
                  {/* <div className="dropdown"> */}

                  {/* <MegaMenu menuClass={`navbar nav-desk`} isExpandable={true} />
                    <Menu menuName={`clinical-navigation`} menuClass={`navbar clinical-nav`}/>
                    <Menu menuName={`medical-navigation`} menuClass={`navbar clinical-nav`}/> */}

                  {nodeType ? (nodeType.includes('clinical') ? <Menu menuName={`clinical-navigation`} menuClass={`navbar extended-nav`} />
                    : <Menu menuName={`medical-navigation`} menuClass={`navbar extended-nav`} />)
                    : (menuType === 'absolute'? <MegaMenu menuClass={`navbar nav-desk`} isExpandable={true} /> : <MegaMenu menuClass={`navbar nav-desk relative-nav-desk`} isExpandable={true} />)}

                  {/* 
                    <div className="main-nav-containers dropdown-menu our-products" aria-labelledby="9a2deb7f-423d-433b-a7d8-3da710e0ad86">
                      <div className="d-flex">
                        <div class="container-fluid d-lg-block nav-container-desk">
                          <div class="row">
                            <div class="col-12">
                              <p class="nav-title-desk">Obagi Medical</p>

                              <p class="nav-subtitle-desk">Learn from our medical legacy applied to everyday skincare</p>

                              <div class="nav-img-desk"><Img fluid={data.medical.childImageSharp.fluid} /></div>

                              <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                            </div>
                          </div>
                        </div>

                        <div class="container-fluid nav-container-desk">
                          <div class="row">
                            <div class="col-12">
                              <p class="nav-title-desk">Obagi Clinical</p>

                              <p class="nav-subtitle-desk">Learn from our medical legacy applied to everyday skincare</p>

                              <div class="nav-img-desk"><Img fluid={data.clinical.childImageSharp.fluid} /></div>

                              <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>





                    <div className="main-nav-containers dropdown-menu our-science" aria-labelledby="">
                      <div className="d-flex">
                        <div class="container-fluid d-lg-block nav-container-desk">
                          <div class="row">
                            <div class="col-12">
                              <p class="nav-title-desk">Our Story</p>

                              <p class="nav-subtitle-desk">Learn from our medical legacy applied to everyday skincare</p>

                              <div class="nav-img-desk"><Img fluid={data.ourstory.childImageSharp.fluid} /></div>

                              <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                            </div>
                          </div>
                        </div>

                        <div class="container-fluid nav-container-desk">
                          <div class="row">
                            <div class="col-12">
                              <p class="nav-title-desk">Innovation</p>

                              <p class="nav-subtitle-desk">With on-going research and development Obagi continues to push the future of skincare.</p>

                              <div class="nav-img-desk"><Img fluid={data.innovation.childImageSharp.fluid} /></div>

                              <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                            </div>
                          </div>
                        </div>

                        <div class="container-fluid d-lg-block nav-container-desk">
                          <div class="row">
                            <div class="col-12">
                              <p class="nav-title-desk">Skincare 101</p>

                              <p class="nav-subtitle-desk">Get the basics down of how to take care of your skin with the best scientifically proven products.</p>

                              <div class="nav-img-desk"><Img fluid={data.skincare.childImageSharp.fluid} /></div>

                              <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                            </div>
                          </div>
                        </div>

                        <div class="container-fluid d-lg-block nav-container-desk">
                          <div class="row">
                            <div class="col-12">
                              <p class="nav-title-desk">Skinclusion</p>

                              <p class="nav-subtitle-desk">be conscious, be fearless, be beautiful. Skincare for all!</p>

                              <div class="nav-img-desk"><Img fluid={data.istocksmall.childImageSharp.fluid} /></div>

                              <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="main-nav-containers dropdown-menu community" aria-labelledby="">
                      <div className="d-flex">
                        <div class="container-fluid d-lg-block nav-container-desk">
                          <div class="row">
                            <div class="col-12">
                              <p class="nav-title-desk">Obagi Blog</p>

                              <p class="nav-subtitle-desk">Lorem ipsum dolor sit amet, consectetur adipiscing elit proin iaculis purus eu enim consectetur sit.</p>

                              <div class="nav-img-desk"><Img fluid={data.blog.childImageSharp.fluid} /></div>

                              <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                            </div>
                          </div>
                        </div>

                        <div class="container-fluid nav-container-desk">
                          <div class="row">
                            <div class="col-12">
                              <p class="nav-title-desk">Press Releases</p>

                              <p class="nav-subtitle-desk">Lorem ipsum dolor sit amet, consectetur adipiscing elit proin iaculis purus eu enim consectetur sit.</p>

                              <div class="nav-img-desk"><Img fluid={data.press.childImageSharp.fluid} /></div>

                              <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>




                    <div className="main-nav-containers dropdown-menu skin-analyzer nav-single-container">
                      <div class="container-fluid nav-container-desk ">
                        <div class="row">
                          <div class="col-12">
                            
                            <p class="nav-title-desk">Skinanalyzer</p>

                            <p class="nav-subtitle-desk">Find the best Obagi solution for you.</p>

                            <div class="nav-img-desk"><Img fluid={data.istock.childImageSharp.fluid} /></div>

                            <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                          </div>
                        </div>
                      </div>
                    </div>





                    <div class="container-fluid nav-container-desk nav-single-container dropdown-menu skinclusion">
                      <div class="row">
                        <div class="col-12">

                          <div class="nav-title-img"><Img fluid={data.skinclusion.childImageSharp.fluid} /></div>

                          <div class="nav-img-desk"><Img fluid={data.istock.childImageSharp.fluid} /></div>

                          <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                        </div>
                      </div>
                    </div>


                  </div> */}

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>








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
