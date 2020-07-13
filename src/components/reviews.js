import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import review from '../assets/scss/components/review.module.scss'
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
      reviewmob: file(relativePath: { eq: "product-images/review-mob.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }`
    )
    return (<div className={"container-fluid"}>
        <div className={"row"}>
            <div className={["col-12", "col-lg-10", "offset-lg-1"].join(" ")}>
                <Img className={review.deskreview} fluid={data.review.childImageSharp.fluid} />
                <Img className={review.mobreview} fluid={data.reviewmob.childImageSharp.fluid} />
            </div>
        </div>
    </div>
    )
}
export default Reviews;