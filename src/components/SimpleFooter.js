import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import primerfooter from '../assets/scss/components/simple-footer.module.scss'

const SimpleFooter = ({ node }) => {

  return (
      <div className={primerfooter.givebg}>
    <div className={["container-fluid",primerfooter.givepadding].join(" ")}>
      <div className="row">
        <div className="col-12">
           <div dangerouslySetInnerHTML={{ __html: node.field_premier_footer_title.processed }} className={[primerfooter.title].join(' ')}>

           </div>
           <div dangerouslySetInnerHTML={{ __html: node.field_premier_footer_desc.processed }} className={[primerfooter.subtitle].join(' ')}>

            </div>
            <Link className={[primerfooter.Flink].join(' ')} to ={node.field_premier_footer_link.uri}>{node.field_premier_footer_link.title}</Link>
        </div>
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
