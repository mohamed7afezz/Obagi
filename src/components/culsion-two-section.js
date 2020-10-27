import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import twoSection from '../assets/scss/components/two-sections.module.scss'
const CulsionFlexTwoSections = ({ node }) => {
  console.log('hassan',node)
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
     
      <div className="clusion-fimg mob-mt-50">  <Img className={[twoSection.culsionImages,"col-8"].join(" ")} fluid={item.relationships.field_clusion_image.localFile.childImageSharp.fluid}/> </div>
      : <div className="clusion-simg mob-mt-50"> <Img className={twoSection.culsionImages,twoSection.m80} fluid={item.relationships.field_clusion_image.localFile.childImageSharp.fluid}/> </div>
      :"":""}
   
    
      </div>
           )}
     
        </div>
        
        </div>
        </div>       
        )
}

export default CulsionFlexTwoSections

export const fragment = graphql`
fragment paragrapghCulsionFlexTwoSections on paragraph__flex_2_sections {
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
                fluid (quality: 100){
                    ...GatsbyImageSharpFluid
                }
                original{
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