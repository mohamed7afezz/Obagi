import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'

const Reviews = ({ node }) => {
    const data = useStaticQuery(graphql`
    query {
        review: file(relativePath: { eq: "product-images/review.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
  
    }`
    )
    return (<div> <Img fluid={data.review.childImageSharp.fluid} /></div>)
}
    export default Reviews;