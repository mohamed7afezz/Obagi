import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import bigParagraphStyles from '../assets/scss/components/big-paragraph.module.scss'

const BigParagraph = ({ node }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className={["col-8", "offset-2","col-md-12", "offset-md-0", "col-lg-8", "offset-lg-2", bigParagraphStyles.colPadding].join(" ")}>
          <p dangerouslySetInnerHTML={{ __html: node.field_paragraph_subtitle.processed }} className={["subtitle", bigParagraphStyles.subtitle].join(" ")}></p>
          <p dangerouslySetInnerHTML={{ __html: node.field_paragraph_text.processed }} className={bigParagraphStyles.paragraph}></p>
          <div className={bigParagraphStyles.link}><Link to={node.field_paragraph_button.uri} className="button-link">{node.field_paragraph_button.title}</Link></div>
        </div>
      </div>
      <div className="row">
        <div className={["col-8", "offset-2","col-md-12", "offset-md-0", "col-lg-8", "offset-lg-2", bigParagraphStyles.colPadding].join(" ")}>
          <div className={bigParagraphStyles.horizontalDivider} ></div>
        </div>
      </div>
    </div>

  )
}

export default BigParagraph;


// export const fragment = graphql`
//   fragment paragraphBigParagraph on paragraph__big_paragraph {
//     id
//     field_paragraph_button {
//       title
//       uri
//     }
//     field_paragraph_subtitle {
//       processed
//     }
//     field_paragraph_text {
//       processed
//     }
//     relationships {
//       field_paragraph_divider {
//         localFile {
//           childImageSharp {
//             fluid (quality: 100){
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `