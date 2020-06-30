import React from 'react'
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image'


const SectionWithColoredBoxes = ({ node }) => {
    return (
        <div>
            {/* <Img>{node.field_colored_boxes_image.alt}</Img> */}
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
              original {
                src
              }
            }
          }
        }
      }
  }
`
