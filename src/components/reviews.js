import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import reviewStyles from '../assets/scss/components/reviews.module.scss'
import Stars from './stars'
import ReviewBox from './review-box'
import ReviewModal from '../components/review-modal'
import WelcomeModal from '../components/welcome-modal'
const Reviews = ({ node , nodeType}) => {
  const isClincal = nodeType == "clinical";
  console.log('hassan22',node)
  let productId = isClincal ? node.field_clinical_id : node.field_medical_id

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

            <div className="d-none">
              <div className={reviewStyles.noReviews}>Be the first to review this product!</div>
            </div>
            
            <div data-bv-show="reviews" data-bv-product-id={productId}></div>

            {/* <ReviewBox />
            <ReviewModal />
            <WelcomeModal /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reviews;