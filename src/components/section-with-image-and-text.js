import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import imageAndText from '../assets/scss/components/section-with-image-and-text.module.scss'

const SectionWithImageAndText = ({ node }) => {
  return (
    <div className={["container-fluid"].join(" ")}>
      <div className={["row", imageAndText.section, imageAndText.rowPadding].join(" ")}>
        <div className={["col-9", "offset-2", "col-lg-4", "offset-lg-1"].join(" ")}>
          <div className={[imageAndText.textSection].join(" ")}>
            <p dangerouslySetInnerHTML={{ __html: node.field_sub_title.processed }} className={["subtitle", imageAndText.subtitle].join(" ")}></p>
            <h1 dangerouslySetInnerHTML={{ __html: node.field_text_title.processed }} className={[imageAndText.title, "title"].join(" ")}></h1>
            <p dangerouslySetInnerHTML={{ __html: node.field_text_paragraph.processed }} className={[imageAndText.description, "description"].join(" ")}></p>
            <div className={[imageAndText.linkDesk,  "d-none", "d-lg-block"].join(" ")}><Link to={node.field_text_button.uri} className={["button-link"].join(" ")}>{node.field_text_button.title}</Link></div>
          </div>
        </div>

        <div className={["col-12", "col-lg-10", "offset-lg-2", imageAndText.colPadding].join(" ")}>
          {/* <div className={imageAndText.image}><Img fluid={node.relationships.field_image.localFile.childImageSharp.fluid} /></div> */}
        </div>

        <div className="col-8 offset-2 col-lg-2 offset-lg-1 d-lg-none">
          <div className={[imageAndText.linkSection].join(" ")}><Link to={node.field_text_button.uri} className={["button-link"].join(" ")}>{node.field_text_button.title}</Link></div>
        </div>

      </div>
    </div>
  )
}

export default SectionWithImageAndText;


export const fragment = graphql`
  fragment paragraphSectionWithImageAndText on paragraph__section_with_image_and_text {
    id
    field_image {
      alt
    }
    field_sub_title {
      processed
    }
    field_text_button {
      title
      uri
    }
    field_text_paragraph {
      processed
    }
    field_text_title {
      processed
    }
    relationships {
      field_image {
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