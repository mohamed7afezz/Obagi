import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import * as fullWidthStyles from '../assets/scss/components/full-width-with-image.module.scss'

const FullWidthWithImage = ({ node }) => {
    return (
        <div className={["container-fluid", fullWidthStyles.containerWrapper].join(" ")}>
            <div className="row">
                <div className={["col-10 pr-0 offset-2 col-lg-5", fullWidthStyles.imageColWrapper].join(" ")}>
                    {node.relationships && node.relationships.field_full_width_image && node.relationships.field_full_width_image.localFile && node.relationships.field_full_width_image.localFile.childImageSharp ?
                        <div className={fullWidthStyles.image}>
                            <Img alt="img"  fluid={node.relationships.field_full_width_image.localFile.childImageSharp.fluid} />
                        </div>
                        : ""}
                </div>
                <div className={["col-12 col-lg-4 offset-lg-1", fullWidthStyles.textColWrapper].join(" ")}>
                    {node.field_full_width_title ? <div className={fullWidthStyles.title} dangerouslySetInnerHTML={{ __html: node.field_full_width_title.processed }}></div> : ""}
                    {node.field_full_width_description ? <div className={fullWidthStyles.description} dangerouslySetInnerHTML={{ __html: node.field_full_width_description.processed }}></div> : ""}
                    {node.field_full_width_link ? <div className={fullWidthStyles.link}><Link className="button-link" to={node.field_full_width_link.uri.replace('internal:', '')}>{node.field_full_width_link.title}</Link></div> : ""}
                </div>

            </div>
        </div>

    )
}

export default FullWidthWithImage;


export const fragment = graphql`
  fragment paragraphFullWidthWithImage on paragraph__full_width_with_image {
    id
    field_full_width_title {
        processed
      }
      field_full_width_link {
        title
        uri
      }
      field_full_width_description {
        processed
      }
      relationships {
        field_full_width_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
  }
`