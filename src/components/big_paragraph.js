import React from 'react'
import { graphql, Link } from 'gatsby'

const BigParagraph = ({ node }) => {
    return (
        <div>
            {/* <p dangerouslySetInnerHTML={{ __html: node.field_paragraph_subtitle.processed }}></p>
            <p dangerouslySetInnerHTML={{__html: node.field_paragraph_text.processed}}></p>
            <Link to="#">{node.field_paragraph_button.title}</Link> */}
            {node}
        </div>
    )
}

export default BigParagraph


export const fragment = graphql`
    fragment paragraphBigParagraph on paragraph__big_paragraph {
        field_paragraph_button {
            title
            uri
          }
          field_paragraph_subtitle {
            processed
          }
          field_paragraph_text {
            processed
          }
    }
`