import React from 'react'
import Productcard from '../assets/scss/components/productcard.module.scss'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import Stars from '../components/stars'
const ProductCard = ({ node }) => {
    const data = useStaticQuery(graphql`
    query {
        smlamb: file(relativePath: { eq: "product-images/smallLamb.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      cardimg: file(relativePath: { eq: "product-images/main-image.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }`
    )
    return ( 
        <div className={["container-fluid", Productcard.productCardHero].join(" ")}>
        <div className={["row", Productcard.Cardordering].join(" ")}>
            <div className={"col-12"}>
                <div className={["d-flex",Productcard.cardname].join(" ")}>
                    <p>new</p>
                    <Img className={Productcard.bulp} fluid={data.smlamb.childImageSharp.fluid}/>
                </div>
                <Img className={Productcard.cardimg} fluid={data.cardimg.childImageSharp.fluid}/>
                <div className={Productcard.starspd}>
                <Stars  value="5.0"/>
                </div>
                <p className={Productcard.productcarddesc}>Lorem ipsum dolor sit amet consectetur adipiscing elit duis at pretium dolor</p>
                <p className={Productcard.productcardcon}>Lorem ipsum dolor sit amet consectetur adipiscing elit duis at pretium dolor</p>
                <p className={Productcard.price}>From <span> $100</span></p>
                </div>
                </div>
                </div>

    )
}
export default ProductCard;
    