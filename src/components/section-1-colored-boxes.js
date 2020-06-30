import React from 'react'
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image'
import { getParagraph } from './paragraphs-helper';


const SectionColoredBoxes = ({ node }) => {
    return (
        <div>
            {/* <Img {...node.field_section_1_image.alt}></Img> */}
            <p dangerouslySetInnerHTML={{ __html: node.field_subtitle_text.processed }}></p>
            <h1 dangerouslySetInnerHTML={{ __html: node.field_title_text.processed }}></h1>
            <p dangerouslySetInnerHTML={{__html: node.field_description_text.processed}}></p>
            <Link to="#">{node.field_button.title}</Link>
        </div>
    )
}

export default SectionColoredBoxes;


export const fragment = graphql`
  fragment paragraphSection1ColoredBoxes on paragraph__section_1_colored_boxes {
    id
    field_description_text {
      processed
    }
    field_subtitle_text {
      processed
    }
    field_title_text {
      processed
    }
    field_button {
      title
      uri
    }
    field_section_1_image {
      alt
    }
  }
`
