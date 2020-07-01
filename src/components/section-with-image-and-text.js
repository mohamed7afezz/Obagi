import React from 'react'
import { graphql, Link } from 'gatsby'
import '../assets/scss/components/section-with-image-and-text.module.scss'

const SectionWithImageAndText = ({ node }) => {
    return (
        <div>
            {/* <Img {...node.field_image.alt}></Img> */}
            <p dangerouslySetInnerHTML={{ __html: node.field_sub_title.processed }}></p>
            <h1 dangerouslySetInnerHTML={{ __html: node.field_text_title.processed }}></h1>
            <p dangerouslySetInnerHTML={{__html: node.field_text_paragraph.processed}}></p>
            <Link to="#">{node.field_text_button.title}</Link>
            
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
  }
`