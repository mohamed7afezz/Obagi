import React from "react"
import { useStaticQuery, graphql } from "gatsby"


const SimpleFooter = ({ node }) => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 offset-2">
           
        </div>
      </div>
    </div>
  )
}

export default SimpleFooter

export const fragment = graphql`
  fragment paragraphSimpleFooter on paragraph__simple_footer {
    id
    field_premier_footer_desc {
      processed
    }
    field_premier_footer_link {
      title
      uri
    }
    field_premier_footer_title {
      processed
    }
  }
  `
