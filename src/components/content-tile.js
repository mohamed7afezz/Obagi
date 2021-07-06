import React, { useContext } from "react"
import styles from "../assets/scss/components/content-tile.module.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const ContentTile = ({

    image,
    title,
    text,
    link

}) => {


    return (
        <div className={styles.wrapper}>
            <Img className={styles.image} fluid={image}/>
            <div className={styles.textWrapper}>
                <div className={styles.title} dangerouslySetInnerHTML={title}></div>
                <div className={styles.text} dangerouslySetInnerHTML={text}></div>
                <Link className={styles.link} to={link.uri? link.uri : "#"}>{link.title? link.title : "Read More"}</Link>
            </div>
        </div>
    )
}
export default ContentTile

