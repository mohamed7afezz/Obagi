import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import finalSection from '../assets/scss/components/final-section.module.scss'
const CulsionFinalSection = ({ node }) => {
  console.log('hassan',node)
    return (
      <div className={finalSection.final}>
      <div className={["container-fluid "].join(" ")}>
      <div className={"row "}>
     <div className="col-12 col-lg-8 offset-lg-2">
     <div className={finalSection.title} dangerouslySetInnerHTML={{ __html: node.field_final_section_title.processed }}></div>
    {node.field_culsion_final_section_desc.map(item=>{
    return  <div className={finalSection.describtion} dangerouslySetInnerHTML={{ __html: item.processed }}></div>

    })}
    <Link className={[finalSection.link,"col-12","col-lg-4"].join(" ")} to={node.field_final_section_link.uri}>{node.field_final_section_link.title}</Link>
     </div>
          
        </div>
        </div>
        </div>       
        )
}

export default CulsionFinalSection

export const fragment = graphql`
fragment paragrapghCulsionFinalSection on paragraph__skin_culsion_final_section {
    id
    field_final_section_title {
      processed
    }
    field_culsion_final_section_desc {
      processed
    }
    field_final_section_link {
      title
      uri
    }
  }
  `