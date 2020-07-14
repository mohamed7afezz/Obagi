import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from "prop-types"
import React from "react"
import headerStyles from '../assets/scss/components/header.module.scss'
import Menu from './menu'
import { useLocation } from "@reach/router"

const Header = ({ siteTitle }) => {

  const location = useLocation();
  // console.log(location.pathname);

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

  // const isHome = typeof window !== 'undefined' ? window.location.href.split('/')[3].toLowerCase() === 'homepage' : '';
  // const isHome = window.location.href.split('/')[3].toLowerCase() === 'homepage';
  return (


    <header>
      <div className={[headerStyles.header, "d-lg-none"].join(" ")}>
        <div className={["container-fluid", headerStyles.navContainer].join(" ")}>
          <div className="row">
            <div className={headerStyles.topNav}>
              <div className="col-4 offset-0">
                <Link to="/" ><Img fluid={data.logo.childImageSharp.fixed} className={headerStyles.obagiLogo} /></Link>
              </div>

              <div className="col-6 offset-2">
                <div className={headerStyles.icons}>
                  <div className={headerStyles.firstIcons}>
                    <div ><Link to="#"className={headerStyles.navButton}><Img fluid={data.search.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
                    <div><Link to="#" className={headerStyles.navButton}><Img fluid={data.cart.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
                  </div>
                  <button className={[headerStyles.navButton, headerStyles.iconImg, headerStyles.menuButton, "navbar-toggler"].join(" ")} type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" ></button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col col-padding">
              <div class="collapse navbar-collapse nav-container" id="navbar">
                <Menu menuName={`main-nav-mobile`} menuClass={`navbar navbar-expand-lg nav-mobile`} isExpandable={true} />

                <div className={headerStyles.lowerSection}>
                  <span><Link to="#">SIGN IN</Link></span>
                  <span><Link to="#">ACCESS PREMIER POINTS</Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className={["d-none d-lg-block col-padding ", headerStyles.navigationBarDesk , (location.pathname==='/homepage/' ? ' ' : ' ' + headerStyles.generalNav)].join(" ")}>
        <div className={headerStyles.upperNav}>
          <div className="row mr-0 ml-0">
            <div className="container-fluid">
              <div className="row mr-0 ml-0">



                <div className="col col-padding">
                  <div className={headerStyles.mainLinks}>
                    <Link to="#" className={headerStyles.navSubmenu}>MEDICAL</Link>
                    <Link to="#" className={headerStyles.navSubmenu}>CLINICAL</Link>
                  </div>
                </div>

                <div className={["col", headerStyles.logoSection].join(" ")}>
                  <Link to="/" ><Img fluid={data.logoDesk.childImageSharp.fixed} className={headerStyles.obagiLogo} /></Link>
                </div>

                <div className="col col-padding">
                  <div className={headerStyles.navLastSection}>
                    <p><Link to="#">SIGN IN</Link></p>
                    <div className={headerStyles.navButton}><Link to="#" ><Img fluid={data.search.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
                    <div className={headerStyles.navButton}><Link to="#" ><Img fluid={data.cart.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
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

                    <Menu menuClass={`navbar nav-desk`} isExpandable={true} />



                    {/* <div className="main-nav-containers dropdown-menu our-products" aria-labelledby="9a2deb7f-423d-433b-a7d8-3da710e0ad86">
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




                    <div className="main-nav-containers dropdown-menu skin-analyzer">
                      <div class="container-fluid nav-container-desk  nav-single-container">
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
                    </div> */}


                  {/* </div> */}

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* navBlocks */}






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
