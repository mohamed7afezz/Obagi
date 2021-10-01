import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from '../assets/scss/components/blog-product.module.scss'

const BlogCard = ({ thumbnail, type, title, url }) => {

   
    return <>
        <div className={`blog-card`}>
            {thumbnail? <div className={`blog-card-img`}><GatsbyImage image={thumbnail} /></div> : ""}
            {type? <div className={`subtitle blog-card-type ${type == 'medical'? `medical-blog` : `clinical-blog`}`}>{type}</div> : ""}
            {title? <Link to={url}  className={`blog-card-title`}>{title}</Link> : ""}
            {url? <Link to={url} className={`blog-card-link`}>Read More</Link> : ""}
        </div>
    </>;
}

export default BlogCard
