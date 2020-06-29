import React from 'react'
import { graphql, Link } from 'gatsby'

const ImagesBoxes = ({ node }) => {
    return (
        <div>
            {/* <Img {...node.field_box_image.alt}></Img>
            <p dangerouslySetInnerHTML={{ __html: node.field_box_subtitle.processed }}></p>
            <h1 dangerouslySetInnerHTML={{ __html: node.field_box_title.processed }}></h1>
            <Img {...node.field_second_b.alt}></Img>
            <p dangerouslySetInnerHTML={{ __html: node.field_second_box_subtitle.processed }}></p>
            <h1 dangerouslySetInnerHTML={{ __html: node.field_second_box_title.processed }}></h1> */}
            {node}
        </div>
    )
}

export default ImagesBoxes


export const fragment = graphql`
    fragment paragraphImagesBoxes on paragraph__images_boxes {
        field_box_image {
            alt
          }
          field_box_subtitle {
            processed
          }
          field_box_title {
            processed
          }
          field_second_b {
            alt
          }
          field_second_box_subtitle {
            processed
          }
          field_second_box_title {
            processed
          }

    }
`