import React from 'react'
import Productcard from '../assets/scss/components/productcard.module.scss'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import smlamb from '../assets/images/product-images/smallLamb.png'
import Stars from '../components/stars'
const ProductCard = ({ node,producttitle ,productdescription,productimage, price,rate}) => {
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
                   
                    <img className={Productcard.bulp} src={smlamb}/>
                </div>
                <Img className={Productcard.cardimg} fluid={productimage}/>
                <div className={Productcard.starspd}>
                <Stars  value={rate}/>
                </div>
                <p className={Productcard.productcarddesc}>{producttitle}</p>
                  <div className={Productcard.productcardcon} dangerouslySetInnerHTML={productdescription}></div>
                <p className={Productcard.price}>$ {price}</p>
                </div>
                </div>
                </div>

    )
}
export default ProductCard;
    