import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import reviewStyles from '../assets/scss/components/reviews.module.scss'
import Stars from './stars'
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
  return (


    <div className={"container-fluid"}>
      <div className={"row"}>
        <div className={["col-12", "col-lg-10", "offset-lg-1"].join(" ")}>
          <div className={reviewStyles.wrapper}>
            <div className={reviewStyles.title}>Product Reviews</div>
            <div className={reviewStyles.stars}><Stars rate="0" /></div>
            <div><button type="button" className={[reviewStyles.reviewButton, "button-link"].join(" ")}>Write a Review</button></div>
            <div className={reviewStyles.bottomSection}>
              <div className={reviewStyles.reviewsNumber}>65 Reviews</div>
              <div className={reviewStyles.hide}>Hide Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reviews;