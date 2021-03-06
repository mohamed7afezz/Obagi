import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import '../assets/scss/components/section-with-colored-boxes.module.scss'
import coloredBoxesStyle from '../assets/scss/components/section-with-colored-boxes.module.scss'


const SectionWithColoredBoxes = ({ node }) => {


  console.log("colored", node.field_image_is_right, node.field_not_homepage)
  return (
    <div className={(node.field_not_homepage && node.field_image_is_right)? coloredBoxesStyle.notHome + " container-fluid " + coloredBoxesStyle.imageRight : (!node.field_image_is_right && node.field_not_homepage)? "container-fluid " + coloredBoxesStyle.notHome : "container-fluid"} id="colored-boxes">
      <div className={["row", coloredBoxesStyle.bigSection].join(" ")}>
        <div className={!node.field_not_homepage? "col-10 col-lg-5 "+ coloredBoxesStyle.colLeftPadding + " " + coloredBoxesStyle.firstSection : "col-12 col-lg-5 "+ coloredBoxesStyle.colLeftPadding + " " + coloredBoxesStyle.colRightPadding + " " + coloredBoxesStyle.firstSection}>
          {node.relationships && node.relationships.field_colored_boxes_image && node.relationships.field_colored_boxes_image.localFile && node.relationships.field_colored_boxes_image.localFile.childImageSharp? <div className={coloredBoxesStyle.image}><Img fluid={node.relationships.field_colored_boxes_image.localFile.childImageSharp.fluid} /></div> : ''}
        </div>
        <div className={!node.field_not_homepage? "col-9 offset-2 col-lg-7 offset-lg-0 " + coloredBoxesStyle.colRightPadding : (node.field_image_is_right && node.field_not_homepage)?  "col-12 col-lg-6 offset-lg-1" : "col-12 col-lg-6 offset-lg-0"}>
          <div className={[coloredBoxesStyle.smallSection].join(" ")}>
            {node.field_colored_boxes_subtitle? <div dangerouslySetInnerHTML={{ __html: node.field_colored_boxes_subtitle.processed }} className={[coloredBoxesStyle.subtitle].join(" ")}></div> : ""}
            {node.field_colored_boxes_title? <h1 dangerouslySetInnerHTML={{ __html: node.field_colored_boxes_title.processed }} className={[coloredBoxesStyle.title, "title"].join(" ")}></h1> : ""}
            {node.field_colored_boxes_description? <div dangerouslySetInnerHTML={{ __html: node.field_colored_boxes_description.processed }} className={[coloredBoxesStyle.description, "description"].join(" ")}></div> : ""}
            {node.field_colored_boxes_button? <div className={[coloredBoxesStyle.linkSection].join(" ")}><Link to={node.field_colored_boxes_button.uri.replace('internal:', '')} className={[coloredBoxesStyle.link].join(" ")}>{node.field_colored_boxes_button.title}</Link></div> : ""}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionWithColoredBoxes;


export const fragment = graphql`
  fragment paragraphSectionWithColoredBoxes on paragraph__section_with_colored_boxes {
    id
    field_image_is_right
    field_not_homepage
    field_colored_boxes_button {
        title
        uri
      }
      field_colored_boxes_description {
        processed
      }
      field_colored_boxes_subtitle {
        processed
      }
      field_colored_boxes_title {
        processed
      }
      relationships {
        field_colored_boxes_image {
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
