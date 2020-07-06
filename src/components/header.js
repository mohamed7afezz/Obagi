import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import '../assets/scss/components/header.module.scss'
import Menu from './menu'

const Header = ({ siteTitle }) => (
  <header>
   <Menu />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
