import React from 'react'
import { graphql, Link } from 'gatsby'

const ImageLeftTextRight = ({ node }) => {
    return (
        <div>
            {/* <Img {...node.field_image_left.alt}></Img> */}
            <p dangerouslySetInnerHTML={{ __html: node.field_image_left_subtitle.processed }}></p>
            <h1 dangerouslySetInnerHTML={{ __html: node.field_image_left_title.processed }}></h1>
            <p dangerouslySetInnerHTML={{__html: node.field_image_left_paragraph.processed}}></p>
            <Link to="#">{node.field_image_left_button.title}</Link>
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
  }
`