import React, { useContext } from "react"
import * as styles from "../assets/scss/components/content-tile.module.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

const ContentTile = ({

    image,
    title,
    text,
    link,
    type

}) => {


    return (
        <div className={`${styles.wrapper} ${type == 'medical'? styles.medical : styles.clinical}`}>
            {image? <Link to={link.uri? link.uri.replace('internal:', '') : "#"} className={styles.imgLink}><GatsbyImage image={image} className={styles.image} /></Link> : ""}
            <div className={`${styles.textWrapper}`}>
                <Link to={link.uri? link.uri.replace('internal:', '') : "#"} className={styles.titleLink}><div className={styles.title} dangerouslySetInnerHTML={title}></div></Link>
                <div className={styles.text} dangerouslySetInnerHTML={text}></div>
                <Link className={styles.link} to={link.uri? link.uri.replace('internal:', '') : "#"}>{link.title? link.title : "Read More"}</Link>
            </div>
        </div>
    );
}
export default ContentTile

