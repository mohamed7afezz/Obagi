import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import bigParagraphStyles from '../assets/scss/components/big-paragraph.module.scss'

const BigParagraph = ({ node }) => {
    return (
        <div className="container">
            <p dangerouslySetInnerHTML={{ __html: node.field_paragraph_subtitle.processed }} className={["subtitle", bigParagraphStyles.subtitle].join(" ")}></p>
            <p dangerouslySetInnerHTML={{__html: node.field_paragraph_text.processed}} className={bigParagraphStyles.paragraph}></p>
            <div className={bigParagraphStyles.link}><Link to="#" className="button-link">{node.field_paragraph_button.title}</Link></div>
            <div><Img fluid={node.relationships.field_paragraph_divider.localFile.childImageSharp.fluid} className={bigParagraphStyles.horizontalDivider}/></div>
        </div>
    )
}

export default BigParagraph;


export const fragment = graphql`
  fragment paragraphBigParagraph on paragraph__big_paragraph {
    id
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
    relationships {
      field_paragraph_divider {
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