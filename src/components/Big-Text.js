import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import basichero from '../assets/scss/components/basic-hero.module.scss'
const BigText = ({ node }) => {
  console.log('hassan',node)
    return (
      <div className={basichero.BigTextcon}>
      <div className={["container-fluid "].join(" ")}>
      <div className={["row "]}>
     <div className="col-12 col-lg-10 offset-lg-1">
       <div className={basichero.BigText}  dangerouslySetInnerHTML={{ __html: node.field_big_text.processed }}></div>
     </div>
          
        </div>
        </div>
        </div>       
        )
}

export default BigText

export const fragment = graphql`
fragment paragrapghBigText on paragraph__big_text {
    id
    field_big_text {
      processed
    }
  }
  `