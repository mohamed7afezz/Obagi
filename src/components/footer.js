import { Link, useStaticQuery, graphql } from 'gatsby'
import PropTypes from "prop-types"
import React from "react"
import Menu from './menu'
import footerStyles from '../assets/scss/components/footer.module.scss'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons'

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
                    <div className="col-12 col-lg-2">
                        <div className={footerStyles.obagiLogo}><Img fluid={data.placeholderImage.childImageSharp.fluid} /></div>
                    </div>
                    <div className="col-6 col-lg-2 offset-lg-1">
                        <div className="col col-padding">
                            <Menu menuName={`first-footer`} menuClass={`footer-menu`} isExpandable={false} />
                        </div>
                        <div className="col col-padding">
                            <Menu menuName={`second-footer`} menuClass={`footer-menu`} isExpandable={false}  />
                        </div>
                    </div>
                    <div className="col-6 col-lg-2">
                        <Menu menuName={`third-footer`} menuClass={`footer-menu`} isExpandable={false} />
                    </div>
                    <div className="col-12 col-lg-3 offset-lg-1">
                        <form className={footerStyles.form}>
                            <div class="form-group">
                                <label for="inputEmail" className={footerStyles.formTitle}>Let’s Connect!</label>
                                <label for="inputEmail" className={footerStyles.formSubtitle}>Receive the latest news from Obagi</label>
                                <div className={footerStyles.signup}>
                                    <div className={footerStyles.inputSection}>
                                        <label for="inputEmail" className={footerStyles.formEmail}>EMAIL ADDRESS</label>
                                        <input type="email" class={footerStyles.formBox} id="inputEmail" aria-describedby="emailHelp"></input>
                                    </div>
                                    <div className={footerStyles.buttonSection}><button type="submit" class={["button-link", footerStyles.formButton].join(" ")}>SIGN UP</button></div>
                                </div>
                            </div>
                        </form>

                        <div className={[footerStyles.socialMedia, "d-none d-md-flex"].join(" ")}>
                            <div className={footerStyles.socialIcon}><Link href="#"><FontAwesomeIcon icon={faInstagram} className={footerStyles.icon}/></Link></div>
                            <div className={footerStyles.socialIcon}><Link href="#"><FontAwesomeIcon icon={faFacebookF} className={footerStyles.icon}/></Link></div>
                            <div className={footerStyles.socialIcon}><Link href="#"><FontAwesomeIcon icon={faYoutube} className={footerStyles.icon}/></Link></div>
                            <div className={footerStyles.socialIcon}><Link href="#"><FontAwesomeIcon icon={faTwitter} className={footerStyles.icon}/></Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </footer>
)

}

export default Footer

