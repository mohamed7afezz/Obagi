import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import basichero from '../assets/scss/components/basic-hero.module.scss'
const Sepratorimg = ({ node }) => {
  console.log('hassan',node)
    return (
      <div className={basichero.Sepratorimg}>
      <div className={["container-fluid "].join(" ")}>
      <div className={"row "}>
     <div className="col-12 col-lg-10 offset-lg-1">
       {
         node.relationships?node.relationships.field_divieder_image?
         <Img className={basichero.Sepimg} fluid={node.relationships.field_divieder_image.localFile.childImageSharp.fluid}/>:"":""
       }
     </div>
          
        </div>
        </div>
        </div>       
        )
}

export default Sepratorimg

export const fragment = graphql`
fragment paragrapghSepratorimg on paragraph__separator_image {
    id
    relationships {
      field_divieder_image {
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