import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import basichero from '../assets/scss/components/basic-hero.module.scss'
const CulsionImage = ({ node }) => {

    return (
      <div className={basichero.BigImg}>
      <div className={["container-fluid "].join(" ")}>
      <div className={"row "}>
      <div className="w-100">
     <img className="img-responsive" src={node.relationships.field_culsion_image.localFile.childImageSharp.original.src}/>
     </div>
        </div>
        </div>
        </div>       
        )
}

export default CulsionImage

export const fragment = graphql`
fragment paragrapghCulsionImage on paragraph__culsion_image {
    id
    relationships {
      field_culsion_image {
        localFile {
          childImageSharp {
            fluid (quality: 100){
                ...GatsbyImageSharpFluid
            }
            original{
                src
            }
          }
        }
      }
    }
  }
  `