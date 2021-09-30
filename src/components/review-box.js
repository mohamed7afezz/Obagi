import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import * as reviewStyles from '../assets/scss/components/reviews.module.scss'
import Stars from './stars'
const ReviewBox = ({ node }) => {

    return (
        <>
            <div className={reviewStyles.boxWrapper}>
                <div className={reviewStyles.boxStars}><Stars rate="0" /></div>
                <div className={reviewStyles.commentTitle}>Love it!</div>
                <div className={reviewStyles.commentDetails}>Posted by Mamta Goyal on 26th Jun 2020</div>
                <div className={reviewStyles.comment}>This is one of the brast products I have ever usedin my life!</div>
            </div>
        </>
    )
}
export default ReviewBox;