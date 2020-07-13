import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from "prop-types"
import React from "react"
import headerStyles from '../assets/scss/components/header.module.scss'
import Menu from './menu'

const Header = ({ siteTitle }) => {


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
    }
  `)

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
                    <div ><Link className={headerStyles.navButton}><Img fluid={data.search.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
                    <div><Link className={headerStyles.navButton}><Img fluid={data.cart.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
                  </div>
                  <button className={[headerStyles.navButton, headerStyles.iconImg, headerStyles.menuButton, "navbar-toggler"].join(" ")} type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false"  ></button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col col-padding">
              <div class="collapse navbar-collapse nav-container" id="navbar">
                <Menu menuName={`main-nav-mobile`} menuClass={`navbar navbar-expand-lg nav-mobile`} />

                <div className={headerStyles.lowerSection}>
                  <span><Link to="#">SIGN IN</Link></span>
                  <span><Link to="#">ACCESS PREMIER POINTS</Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className={["container-fluid d-none d-lg-block col-padding", headerStyles.navigationBarDesk].join(" ")}>
        <div className={headerStyles.upperNav}>
          <div className="row mr-0 ml-0">
            <div className="col-3 col-padding">
              <div className={headerStyles.mainLinks}>
                <div className={headerStyles.navSubmenu}><Link to="#">MEDICAL</Link></div>
                <div className={headerStyles.navSubmenu}><Link to="#">CLINICAL</Link></div>
              </div>
            </div>

            <div className={["col-2 offset-2", headerStyles.logoSection].join(" ")}>
              <Link to="/" ><Img fluid={data.logoDesk.childImageSharp.fixed} className={headerStyles.obagiLogo} /></Link>
            </div>

            <div className="col-2 offset-3 col-padding">
              <div className={headerStyles.navLastSection}>
                <p><Link to="#">SIGN IN</Link></p>
                <div className={headerStyles.navButton}><Link to="#" ><Img fluid={data.search.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
                <div className={headerStyles.navButton}><Link to="#" ><Img fluid={data.cart.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
              </div>
            </div>
          </div>
        </div>


        <div className={headerStyles.lowerNav}>
          <div className="row mr-0 ml-0">
            <div className="col-12">
              <Menu menuClass={`navbar nav-desk`} isExpandable={true} />
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
