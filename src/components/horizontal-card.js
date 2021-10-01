import React, {useContext} from "react"
import * as Productcard from "../assets/scss/components/productcard.module.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import smlamb from "../assets/images/product-images/smallLamb.png"
import Stars from "./stars"
import CartContext from "../providers/cart-provider"
const HorizontalCard = ({
  node,
  producttitle,
  productdescription,
  productimage,
  price,
  rate,
  productLink,
  productId,
  isrx
}) => {
  const value = useContext(CartContext)
  const addToCart = value && value.addToCart
  const addingToCart = value && value.state.addingToCart

  const data = useStaticQuery(graphql`{
  smlamb: file(relativePath: {eq: "product-images/smallLamb.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  cardimg: file(relativePath: {eq: "product-images/main-image.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
}
`)
  return (
    <div className={["container-fluid the-product-card", Productcard.productCardHero].join(" ")}>
      <div className={Productcard.cardContainer}>
        {/* <div className={["d-flex",Productcard.cardname].join(" ")}>
                    <p>new</p>
                    <img className={Productcard.bulp} src={smlamb}/>
                </div> */}
                <div className="row">
                    <div className="col-lg-6">
        {productimage ? (
          <GatsbyImage image={productimage} alt="img" className={Productcard.cardimg} />
        ) : (
          ""
        )}
</div>
        
        {isrx !== "RX"? <div className={Productcard.starspd}>
                      <div

              data-bv-show="inline_rating"

              data-bv-product-id={productId}

              data-bv-redirect-url = {productLink}
              
               data-bv-seo="false" >

              </div>

        </div> : ""}
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
            <p className={[Productcard.price, `${price === "0"? "price-opacity" : ""}`].join(" ")}>
              $ <span className="prod-price">{price}</span>
            </p>
            {isrx == 'RX'?
            <Link className={Productcard.addtocart} to="/medical/hcpfinder">
              
             Locate a Physician
          </Link>
            :<button className={[Productcard.addtocart, `the-product-button`].join(" ")} 
            onClick={() => {
              let quantity = 1;
              addToCart(productId,false,quantity);
            }}
            disabled={addingToCart === productId}
          >
            {addingToCart === productId ? "Adding to Bag" : "Add to Bag"}
            </button>
            }
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
    </div>
  );
}
export default HorizontalCard

