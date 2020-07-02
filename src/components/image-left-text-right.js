import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import imageLeft from '../assets/scss/components/image-left-text-right.module.scss'

const ImageLeftTextRight = ({ node }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className={["col-12", "col-lg-5", imageLeft.colPadding, imageLeft.firstSection].join(" ")}>
          <div className={imageLeft.image}><Img fluid={node.relationships.field_image_left.localFile.childImageSharp.fluid} /></div>
        </div>

          <div className={["col-12", "col-lg-6", "offset-lg-1", imageLeft.colFullPadding].join(" ")}>
            <div className={imageLeft.smallSection}>
              <p dangerouslySetInnerHTML={{ __html: node.field_image_left_subtitle.processed }} className={["subtitle", imageLeft.subtitle].join(" ")}></p>
              <h1 dangerouslySetInnerHTML={{ __html: node.field_image_left_title.processed }} className={[imageLeft.title, "title"].join(" ")}></h1>
              <p dangerouslySetInnerHTML={{ __html: node.field_image_left_paragraph.processed }} className={[imageLeft.description, "description"].join(" ")}></p>
              <div className={imageLeft.linkSection}><Link to={node.field_image_left_button.uri} className="button-link">{node.field_image_left_button.title}</Link></div>
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
    relationships {
      field_image_left {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`