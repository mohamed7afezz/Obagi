import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import '../assets/scss/components/section-with-colored-boxes.module.scss'
import coloredBoxesStyle from '../assets/scss/components/section-with-colored-boxes.module.scss'


const SectionWithColoredBoxes = ({ node }) => {
  return (
    <div className="container-fluid">
      <div className={["row", coloredBoxesStyle.bigSection].join(" ")}>
        <div className={["col-10", "col-lg-5", coloredBoxesStyle.colPadding, coloredBoxesStyle.firstSection].join(" ")}>
          <div className={[coloredBoxesStyle.image].join("")}><Img fluid={node.relationships.field_colored_boxes_image.localFile.childImageSharp.fluid} /></div>
        </div>
        <div className={["col-9", "offset-2", "col-lg-7", "offset-lg-0", coloredBoxesStyle.secondSection].join(" ")}>
          <div className={[coloredBoxesStyle.smallSection].join(" ")}>
            <p dangerouslySetInnerHTML={{ __html: node.field_colored_boxes_subtitle.processed }} className={[coloredBoxesStyle.subtitle].join("")}></p>
            <h1 dangerouslySetInnerHTML={{ __html: node.field_colored_boxes_title.processed }} className={[coloredBoxesStyle.title].join("")}></h1>
            <p dangerouslySetInnerHTML={{ __html: node.field_colored_boxes_description.processed }} className={[coloredBoxesStyle.description].join("")}></p>
            <div className={[coloredBoxesStyle.linkSection].join("")}><Link to="#" className={[coloredBoxesStyle.link].join("")}>{node.field_colored_boxes_button.title}</Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionWithColoredBoxes;


export const fragment = graphql`
  fragment paragraphSectionWithColoredBoxes on paragraph__section_with_colored_boxes {
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
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
  }
`
