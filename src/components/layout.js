/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import Helmet from 'react-helmet'
import Header from "./header"
import Footer from './footer'



import NavBlocks from "../assets/scss/components/nav-blocks"

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
  // Similar to componentDidMount and componentDidUpdate: 


  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      {/* <NavBlocks /> */}
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
