import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import * as skinClusionStyle from '../assets/scss/components/skin-clusion-img-left.module.scss'



const SkinClusionLeftImgLeft = ({ node }) => {
  return(
    <div className={skinClusionStyle.sectionContainer}> 
        <div className={skinClusionStyle.leftColerdBox}>
        <div className={skinClusionStyle.bigbox}></div>
        <div className={skinClusionStyle.smallbox}></div>
      </div>
      <div className={skinClusionStyle.coloredRightbox}>

</div>
     
<div className={["container-fluid"].join(" ")}>
  <div className={["row",skinClusionStyle.aligncenter].join(" ")}>
  
   <div className={["col-lg-5 offset-lg-1",skinClusionStyle.boxCon].join(" ")}>
        {node.relationships?node.relationships.field_skinclusion_left_img?
        node.relationships.field_skinclusion_left_img.localFile?
        <Img alt="img"  fluid={node.relationships.field_skinclusion_left_img.localFile.childImageSharp.fluid}/>:"":"":""}
      <div className="bottomBox">
      </div>
      </div>

     
      <div className={["col-lg-4 offset-lg-1"].join(" ")}>
          <div className={skinClusionStyle.title} dangerouslySetInnerHTML={{ __html: node.field_skin_clusion_title.processed }}>

          </div>
          <div className={skinClusionStyle.desc} dangerouslySetInnerHTML={{ __html: node.field_skin_clusion_describtion.processed }}>

          </div>
          <ul className={skinClusionStyle.list}>
          {node.field_skin_clusion_list.map(item=>(
            <div className={skinClusionStyle.listItem} dangerouslySetInnerHTML={{ __html:item.processed }}></div>
            ))}
            </ul>
      </div>
     
    </div>

</div>
</div>  

  )
             }
export default SkinClusionLeftImgLeft
export const fragment = graphql`
    fragment paragraphSkinClusionLeftImgLeft on  paragraph__skin_clusion_img_text {
        id
        field_skin_clusion_describtion {
          processed
        }
        field_skin_clusion_title {
          processed
        }
        field_skin_clusion_list {
          processed
        }
        relationships {
          field_skinclusion_left_img {
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
      }`
        