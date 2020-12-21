import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import Style from '../assets/scss/components/leftimgsub.module.scss'
const LeftSubimg = ({ node }) => {

  return (
    <div class="container-fluid ">
      <div className={["row", Style.rowCon].join(" ")}>
        <div className={["col-12 col-lg-9 offset-lg-3", Style.prublebg].join("  ")}>

          <div className={[Style.rightContainer, "col-lg-5"].join(" ")}>
            <div dangerouslySetInnerHTML={{ __html: node.field_topic.processed }} className={Style.topic}></div>
            <div dangerouslySetInnerHTML={{ __html: node.field_title_title.processed }} className={Style.title}></div>
            <div dangerouslySetInnerHTML={{ __html: node.field_describtion.processed }} className={Style.describtion}></div>
            {node.field_left_link? <Link to={node.field_left_link.uri} className={[Style.link, "button-link"].join(" ")}>{node.field_left_link.title}</Link> : ""}
          </div>

        </div>
        <div className={[Style.imgContainer, "offset-2 offset-lg-1 col-lg-5 col-10"].join(" ")}>
          <Img fluid={node.relationships.field_left_image.localFile.childImageSharp.fluid} />
        </div>
      </div>
    </div>
  )
}

export default LeftSubimg

export const fragment = graphql`
fragment paragraphLeftSubImgRightText on  paragraph__left_sub_img_right_text {
  field_left_link {
    title
    uri
  }
    field_describtion {
      processed
    }
    field_title_title {
      processed
    }
    field_topic {
      processed
    }
    relationships {
      field_left_image {
        localFile {
          childImageSharp {
            fluid (quality: 100){
              ...GatsbyImageSharpFluid
            }
            original {
              src
            }
          }
        }
      }
    }
  }`