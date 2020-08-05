import React from "react"
import Productcard from "../assets/scss/components/productcard.module.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import smlamb from "../assets/images/product-images/smallLamb.png"
import Stars from "../components/stars"
const ProductCard = ({
  node,
  producttitle,
  productdescription,
  productimage,
  price,
  rate,
  productLink
}) => {
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
    }
  `)
  return (
    <div className={["container-fluid", Productcard.productCardHero].join(" ")}>
      <div className={Productcard.cardContainer}>
        {/* <div className={["d-flex",Productcard.cardname].join(" ")}>
                    <p>new</p>
                    <img className={Productcard.bulp} src={smlamb}/>
                </div> */}
        {productimage ? (
          <Img className={Productcard.cardimg} fluid={productimage} />
        ) : (
          ""
        )}

        <div className={Productcard.starspd}>
          <Stars value={rate} />
        </div>
        {producttitle ? (
          <p className={Productcard.productcarddesc}><Link to={productLink}>{producttitle}</Link></p>
        ) : (
          ""
        )}
        {productdescription ? (
          <div
            className={Productcard.productcardcon}
            dangerouslySetInnerHTML={productdescription}
          ></div>
        ) : (
          ""
        )}
        {price ? (
          <div className={Productcard.priceCon}>
            <p className={Productcard.price}>
              $ <span className="prod-price">{price}</span>
            </p>

            <Link to="#" className={Productcard.addtocart}>
              Add to Bag
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
export default ProductCard
