/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes, { node } from "prop-types"
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import Helmet from 'react-helmet'
import Header from "./header"
import Footer from './footer'
import AboveHeader from './above-header'


import '../assets/scss/components/layout.scss'

import NavBlocks from "../assets/scss/components/nav-blocks"
import Popup from "./videopopup"
import Showbag from "./bag-preview"

const Layout = ({ children,nodeType,menuType}) => {
  if(!nodeType){
    nodeType='home';
  }
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
    <div className={`node-${nodeType}`}>
      <AboveHeader />
      <Header siteTitle={data.site.siteMetadata.title} nodeType={nodeType} menuType={menuType}/>
      {/* <NavBlocks /> */}
      <div>
        <main>{children}</main>
        <Showbag />
        <Footer />
        <Popup/>
      </div>

    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
