import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import sientificStyle from '../assets/scss/components/scientific-two-col.module.scss'
import Img from 'gatsby-image'
const SintificFooter = ({ node }) => {

  return (
      <div className={[sientificStyle.paddingfooter].join(' ')}>
    <div className={["container-fluid"].join(" ")}>
      <div className="row">
        <div className={["col-12 offset-lg-1 col-lg-6",sientificStyle.leftsecfooter].join(" ")}>
      <div className dangerouslySetInnerHTML={{ __html: node.field__scientific_left_describti.processed }}></div>
       </div>
       <div className="col-12 offset-lg-1 col-lg-4">
                  <h1 className={[sientificStyle.link].join(' ')}><Link to={node.field_scientific_link_url}>{node.field_scientific_link_title_}</Link></h1>
            </div>
      
      </div>
    </div>
    </div>
  )
}

export default SintificFooter

export const fragment = graphql`
  fragment paragraphScientificFooter on paragraph__scientific_describtion_big_link {
    id
    field__scientific_left_describti {
      processed
    }
  
    field_scientific_link_title_
    field_scientific_link_url
  }
  `
