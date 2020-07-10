/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React ,{ useEffect }  from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import Helmet from 'react-helmet'
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
  // Similar to componentDidMount and componentDidUpdate: 
   useEffect(() => {    
    
    let script = document.createElement('script');
    script.src="https://code.jquery.com/jquery-3.5.1.min.js";
    document.getElementById("scripts").appendChild(script);
    let scriptbootstrap = document.createElement('script');
    scriptbootstrap.src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
    document.getElementById("scripts").appendChild(scriptbootstrap);
      });
 
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
    <div id="scripts"></div>
    

        <Footer />
          <script src={withPrefix('../node-modules/jquery/dist/jquery.js')} type="text/javascript" />
          <script src={withPrefix('../node-modules/bootstrap/dist/js/bootstrap.js')} type="text/javascript" />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
