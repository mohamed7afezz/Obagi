import React from 'react'
import { graphql } from 'gatsby'

const Featured = () => {

    return(
        <div className="container-fluid">
            {/* <div>{data.allParagraphFeaturedSection.edges.node.field_featured_title.processed}</div> */}
        </div>
    )
}

export default Featured

export const data = graphql`
    query {
        allParagraphFeaturedSection {
            edges {
              node {
                field_featured_button {
                  title
                  uri
                }
                field_featured_description {
                  processed
                }
                field_featured_title {
                  processed
                }
                field_image_right
                id
              }
            }
          
        }
    }

`;

