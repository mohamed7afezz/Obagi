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
            <div className={["col-12",Productcard.cardContainer].join(" ")}>
                {/* <div className={["d-flex",Productcard.cardname].join(" ")}>
                    <p>new</p>
                    <img className={Productcard.bulp} src={smlamb}/>
                </div> */}
                {
                  productimage? <Img className={Productcard.cardimg} fluid={productimage}/> : ''
                }
                
                <div className={Productcard.starspd}>
                  
                <Stars  value={rate}/>
                </div>
                {producttitle?
                <p className={Productcard.productcarddesc}>{producttitle}</p>:''
                }
                {productdescription?
                  <div className={Productcard.productcardcon} dangerouslySetInnerHTML={productdescription}></div>
                  :
                  ''
                }
                {price?
                <p className={Productcard.price}>$ <span className="prod-price">{price}</span></p>:''
              }
                </div>
                </div>
                </div>

    )
}
export default ProductCard;
    