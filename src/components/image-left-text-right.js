import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import imageLeft from '../assets/scss/components/image-left-text-right.module.scss'

const ImageLeftTextRight = ({ node }) => {
  return (
    <div className={["container-fluid", imageLeft.imageContainer, `${node.field_text_custom_class? node.field_text_custom_class : ""}`].join(" ")}>
      <div className="row">
        <div className={[`${node.field_text_custom_class? "col-10 col-lg-5 text-first-section" : "col-12 col-lg-5 text-first-section " + imageLeft.colPadding}`, imageLeft.firstSection ].join(" ")}>
          
          <div className={[imageLeft.image, "text-image"].join(" ")}><Img fluid={node.relationships.field_image_left.localFile? node.relationships.field_image_left.localFile.childImageSharp.fluid : ''} /></div>
        </div>

          <div className={["col-12 col-lg-6 offset-lg-1", `${node.field_text_custom_class? "text-second-section" : imageLeft.colFullPadding}`].join(" ")}>
            <div className={[imageLeft.smallSection, "text-small-section"].join(" ")}>
              <div dangerouslySetInnerHTML={{ __html: node.field_image_left_subtitle.processed }} className={["subtitle", imageLeft.subtitle].join(" ")}></div>
              <h3 dangerouslySetInnerHTML={{ __html: node.field_image_left_title.processed }} className={[imageLeft.title, "title"].join(" ")}></h3>
              <div dangerouslySetInnerHTML={{ __html: node.field_image_left_paragraph.processed }} className={[imageLeft.description, "description"].join(" ")}></div>
              {node.field_image_left_button? <div className={imageLeft.linkSection}><Link to={node.field_image_left_button.uri.replace('internal:', '')} className={["button-link", imageLeft.link].join(" ")}>{node.field_image_left_button.title}</Link></div> : ""}
            </div>
          </div>

      </div>
    </div>

  )
}

export default ImageLeftTextRight;


export const fragment = graphql`
  fragment paragraphImageLeftTextRight on paragraph__image_left_text_right {
    id
    field_image_left_button {
      title
      uri
    }
    field_image_left_paragraph {
      processed
    }
    field_image_left_subtitle {
      processed
    }
    field_image_left_title {
      processed
    }
    field_image_left {
      alt
    }
    field_text_custom_class
    relationships {
      field_image_left {
        localFile {
          childImageSharp {
            fluid (quality: 100){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`