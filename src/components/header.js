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
          fluid {
            ...GatsbyImageSharpFluid
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
      <div className={headerStyles.header}>
        <div className={["container-fluid", headerStyles.navContainer].join(" ")}>
          <div className="row">
            <div className={headerStyles.topNav}>
              <div className="col-4 offset-0">
                <Link to="/" ><Img fluid={data.logo.childImageSharp.fluid} className={headerStyles.obagiLogo} /></Link>
              </div>

              <div className="col-6 offset-2">
                <div className={headerStyles.icons}>
                  <div ><Link className={headerStyles.navButton}><Img fluid={data.search.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
                  <div><Link className={headerStyles.navButton}><Img fluid={data.cart.childImageSharp.fluid} className={headerStyles.iconImg} /></Link></div>
                  <div><a class={[headerStyles.navButton].join(" ")} data-toggle="collapse" href="#navbar" role="button" ><Img fluid={data.menu.childImageSharp.fluid} className={headerStyles.iconImg} /></a></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col col-padding">
              <div class="collapse navbar-collapse" id="navbar">
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
