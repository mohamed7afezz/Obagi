import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import * as twoSection from '../assets/scss/components/two-sections.module.scss'
const CulsionFlexTwoSections = ({ node }) => {
    return (
      <div className={twoSection.twoSectionCon}>
      <div className={["container-fluid "].join(" ")}>
      <div className={["row",twoSection.con].join(" ")}>
      {node.relationships.field_culsion_one_section.map((item,index)=>
      <div className="col-lg-4 col-12 offset-lg-1 d-flex-col twosec-sep">
    
      <div className={twoSection.title} dangerouslySetInnerHTML={{ __html: item.field_skin_culsion_section_title.processed }}></div>
      <div className={twoSection.describtion} dangerouslySetInnerHTML={{ __html: item.field_clusion.processed }}></div>
      {item.relationships?item.relationships.field_clusion_image?
      index===1?
     
      <div className="clusion-fimg mob-mt-50">  <GatsbyImage
        image={item.relationships.field_clusion_image.localFile.childImageSharp.gatsbyImageData}
        alt="img"
        className={[twoSection.culsionImages,"col-8"].join(" ")} /> </div>
      : <div className="clusion-simg mob-mt-50"> <GatsbyImage
        image={item.relationships.field_clusion_image.localFile.childImageSharp.gatsbyImageData}
        alt="img"
        className={(twoSection.culsionImages, twoSection.m80)} /> </div>
      :"":""}
   
    
      </div>
           )}
     
        </div>
        
        </div>
        </div>
    );
}

export default CulsionFlexTwoSections

export const fragment = graphql`fragment paragrapghCulsionFlexTwoSections on paragraph__flex_2_sections {
  id
  relationships {
    field_culsion_one_section {
      field_skin_culsion_section_title {
        processed
      }
      field_clusion {
        processed
      }
      relationships {
        field_clusion_image {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              original {
                src
              }
            }
          }
        }
      }
    }
  }
}
`