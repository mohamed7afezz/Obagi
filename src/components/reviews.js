import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import reviewStyles from '../assets/scss/components/reviews.module.scss'
import Stars from './stars'
import ReviewBox from './review-box'
import ReviewModal from '../components/review-modal'
import WelcomeModal from '../components/welcome-modal'
const Reviews = ({ node }) => {

  const data = useStaticQuery(graphql`
  query {
    pen: file(relativePath: { eq: "pen.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
  `)


  return (


    <div className={"container-fluid"}>
      <div className={"row"}>
        <div className={["col-12", "col-lg-10", "offset-lg-1"].join(" ")}>
          <div className={reviewStyles.wrapper}>
            <div className={reviewStyles.title}>Product Reviews</div>
            <div className={reviewStyles.stars}><Stars rate="0" /></div>
            <button type="button" data-toggle="modal" data-target="#review-modal" className={[reviewStyles.reviewButton, "button-link d-lg-none"].join(" ")}>Write a Review <Img fixed={data.pen.childImageSharp.fixed} /></button>
            <div className={reviewStyles.bottomSection}>
              <div className={reviewStyles.reviewsNumber}>65 Reviews</div>
              <button type="button" data-toggle="modal" data-target="#review-modal" className={[reviewStyles.reviewButton, "button-link d-none d-lg-flex"].join(" ")}>Write a Review <Img fixed={data.pen.childImageSharp.fixed} /></button>
              <div className={reviewStyles.hide}>Hide Reviews</div>
            </div>

            <div className="d-none">
              <div className={reviewStyles.noReviews}>Be the first to review this product!</div>
            </div>
            <ReviewBox />
            <ReviewModal />
            <WelcomeModal />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reviews;