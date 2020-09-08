import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import reviewStyles from '../assets/scss/components/reviews.module.scss'
import Stars from './stars'
import ReviewBox from './review-box'
const ReviewModal = ({ node }) => {



    return (
        <>
            <div className="modal fade review-modal" id="review-modal" tabindex="-1" role="dialog" aria-labelledby="reviewModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="reviewModalLabel">Write a Review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <div className="review-product-name">Vitamin C + Arbutin Brightening Serum</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ReviewModal;