import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import '../assets/scss/components/header.module.scss'
import Menu from './menu'

const Header = ({ siteTitle }) => (
  <header>
    <div className="container-fluid">
      <div className="row">
      <div className="col-2 offset-sm-0">
          <h1>OBAGI</h1>
        </div>
        <div className="col">
          <div className="d-none d-lg-block">
            <div><Link>MEDICAL</Link></div>
            <div><Link>CLINICAL</Link></div>
          </div>
        </div>


        <div className="col">
          <p className="d-none d-lg-block">SIGN IN</p>
          <div className={Menu.search}></div>
          <div className={Menu.cart}></div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Menu />
        </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
