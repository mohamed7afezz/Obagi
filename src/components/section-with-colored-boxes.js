import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import '../assets/scss/components/section-with-colored-boxes.module.scss'
import coloredBoxesStyle from '../assets/scss/components/section-with-colored-boxes.module.scss'


const SectionWithColoredBoxes = ({ node }) => {
    return (
        <div>
            <div><Img fluid={node.relationships.field_colored_boxes_image.localFile.childImageSharp.fluid} /></div>
            <p>{node.field_colored_boxes_subtitle.processed}</p>
            <h1>{node.field_colored_boxes_title.processed}</h1>
            <p>{node.field_colored_boxes_description.processed}</p>
            <Link to="#">{node.field_colored_boxes_button.title}</Link>
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
