/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, withPrefix } from "gatsby"

import Header from "./header"
import Footer from './footer'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import "../assets/scss/typography/typography.scss"
import '../assets/scss/components/layout.scss'


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
        <Footer />
        
          <script src={withPrefix('../../node-modules/jquery/dist/jquery.js')} type="text/javascript" />
          <script src={withPrefix('../../node-modules/bootstrap/dist/js/bootstrap.js')} type="text/javascript" />
        
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
