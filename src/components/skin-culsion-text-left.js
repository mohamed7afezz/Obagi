import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import skinClusionStyle from '../assets/scss/components/skin-clusion-img-left.module.scss'



const SkinClusionTextLeft = ({ node }) => {
  return(
   

    <div className={["container-fluid",skinClusionStyle.makepadding].join(" ")}>
  <div className={["row",skinClusionStyle.aligncenter].join(" ")}>
  
   <div className={["col-lg-5 offset-lg-1"].join(" ")}>
   <div className={skinClusionStyle.title} dangerouslySetInnerHTML={{ __html: node.field_skin_clusion_left_title.processed }}>
</div>
<div className={skinClusionStyle.desc} dangerouslySetInnerHTML={{ __html: node.field_skinclusion_left_describti.processed }}>
</div>
      </div>

     
      <div className="col-lg-4 offset-lg-1 mob-mt-40">
      {node.relationships?node.relationships.field_skin_clusion_left_image?
        node.relationships.field_skin_clusion_left_image.localFile?
        <img alt="img" className="img-responsive" src={node.relationships.field_skin_clusion_left_image.localFile.publicURL}/>:"":"":""}
     
       
      </div>
     
    </div>

</div>


  )
             }
export default SkinClusionTextLeft
export const fragment = graphql`
    fragment paragraphSkinClusionTextLeft on   paragraph__skin_clusion_text_left_image {
        id
        field_skin_clusion_left_title {
          processed
        }
        field_skinclusion_left_describti {
          processed
        }
        relationships {
          field_skin_clusion_left_image {
            localFile {
              publicURL
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
      }`
        