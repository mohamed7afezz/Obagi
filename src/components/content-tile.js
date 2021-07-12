import React, { useContext } from "react"
import styles from "../assets/scss/components/content-tile.module.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const ContentTile = ({

    image,
    title,
    text,
    link,
    type

}) => {


    return (
        <div className={styles.wrapper}>
            <Link to={link.uri? link.uri : "#"} className={styles.imgLink}><Img className={styles.image} fluid={image}/></Link>
            <div className={`${styles.textWrapper} ${type == 'medical'? styles.medical : styles.clinical}`}>
                <Link to={link.uri? link.uri : "#"} className={styles.titleLink}><div className={styles.title} dangerouslySetInnerHTML={title}></div></Link>
                <div className={styles.text} dangerouslySetInnerHTML={text}></div>
                <Link className={styles.link} to={link.uri? link.uri : "#"}>{link.title? link.title : "Read More"}</Link>
            </div>
        </div>
    )
}
export default ContentTile

