import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import imageAndText from '../assets/scss/components/section-with-image-and-text.module.scss'

const SectionWithImageAndText = ({ node }) => {
  return (
    <div className={["container-fluid SectionWithImageAndText", `${node.field_custom_class? node.field_custom_class : ""}` ].join(" ")}>
      <div className={["row align-items-center image-text-row", imageAndText.section, imageAndText.rowPadding].join(" ")}>
        <div className={[`${node.field_custom_class? "col-12 col-lg-4 offset-lg-1" : "col-9 offset-2 col-lg-4 offset-lg-1"}`].join(" ")}>
          <div className={[imageAndText.textSection].join(" ")}>
            <div dangerouslySetInnerHTML={{ __html: node.field_sub_title.processed }} className={["subtitle", imageAndText.subtitle].join(" ")}></div>
            <h3 dangerouslySetInnerHTML={{ __html: node.field_text_title.processed }} className={[imageAndText.title, "title"].join(" ")}></h3>
            <div dangerouslySetInnerHTML={{ __html: node.field_text_paragraph.processed }} className={[imageAndText.description, "description"].join(" ")}></div>
            {node.field_text_button? <div className={[imageAndText.linkDesk].join(" ")}><Link to={node.field_text_button.uri?node.field_text_button.uri.replace('internal:', '') : '#'} className={["button-link"].join(" ")}>{node.field_text_button.title}</Link></div> : ""}
          </div>
        </div>

        <div className={[`${node.field_custom_class? "col-12 col-lg-7 imageTextColPadding " + imageAndText.colPadding : "col-12 col-lg-6 imageTextColPadding " + imageAndText.colPadding}`].join(" ")}>
          {node.relationships && node.relationships.field_image && node.relationships.field_image.localFile && node.relationships.field_image.localFile.childImageSharp? <div className={imageAndText.image}><Img alt="img"  fluid={node.relationships.field_image.localFile.childImageSharp.fluid} /></div> : ""}
        </div>

        {/* <div className="col-8 offset-2 col-md-4 col-lg-2 offset-lg-1 d-lg-none">
          {node.field_text_button? <div className={[imageAndText.linkSection].join(" ")}><Link to={node.field_text_button.uri?node.field_text_button.uri.replace('internal:', '') : '#'} className={["button-link", imageAndText.link].join(" ")}>{node.field_text_button.title}</Link></div> : ""}
        </div> */}

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
    field_custom_class
    relationships {
      field_image {
        localFile {
          childImageSharp {
            fluid (quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`