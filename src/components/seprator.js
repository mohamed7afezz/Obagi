import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import * as basichero from '../assets/scss/components/basic-hero.module.scss'
const Sepratorimg = ({ node }) => {

    return (
      <div className={basichero.Sepratorimg}>
      <div className={["container-fluid "].join(" ")}>
      <div className={"row "}>
     <div className="col-12 col-lg-10 offset-lg-1">
       {
         node.relationships?node.relationships.field_divieder_image?
         <GatsbyImage
           image={node.relationships.field_divieder_image.localFile.childImageSharp.gatsbyImageData}
           alt="img"
           className={basichero.Sepimg} />:"":""
       }
     </div>
          
        </div>
        </div>
        </div>
    );
}

export default Sepratorimg

export const fragment = graphql`fragment paragrapghSepratorimg on paragraph__separator_image {
  id
  relationships {
    field_divieder_image {
      localFile {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          original {
            src
          }
        }
      }
    }
  }
}
`