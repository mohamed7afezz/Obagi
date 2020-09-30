import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = ({ node }) => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 offset-2">
          <div>{node.relationships? <Img fluid={node.relationships.field_section_image.localFile.childImageSharp.fluid} className="img-divider"/> : ""}</div>  
        </div>
      </div>
    </div>
  )
}

export default Image

export const fragment = graphql`
  fragment paragraphImage on paragraph__image {
    id
    relationships {
      field_section_image {
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
