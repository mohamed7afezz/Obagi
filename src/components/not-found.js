import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
// import * as servicesStyles from '../assets/scss/components/services.module.scss'

const NotFound = ({ node }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-lg-10 offset-lg-1">
                    <div className="nf-wrapper">
                        <div dangerouslySetInnerHTML={{__html: node.field_not_found_title.processed}} className="nf-title"></div>
                        <div dangerouslySetInnerHTML={{__html: node.field_not_found_text.processed}} className="nf-text"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound

export const fragment = graphql`
    fragment paragraphNotFound on paragraph__not_found {
        id
        field_not_found_title {
            processed
          }
          field_not_found_text {
            processed
          }
    }`