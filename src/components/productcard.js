import React, {useContext} from "react"
import Productcard from "../assets/scss/components/productcard.module.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import smlamb from "../assets/images/product-images/smallLamb.png"
import Stars from "../components/stars"
import CartContext from "../providers/cart-provider"
const ProductCard = ({
  node,
  producttitle,
  productdescription,
  productimage,
  price,
  rate,
  productLink,
  productId,
  premierid,
  feild_preimer,
  isrx,
  Type,
  Sku
}) => {
  const value = useContext(CartContext)
  const addToCart = value && value.addToCart
  const addingToCart = value && value.state.addingToCart

  const data = useStaticQuery(graphql`
    query {
      smlamb: file(relativePath: { eq: "product-images/smallLamb.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
      cardimg: file(relativePath: { eq: "product-images/main-image.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div className={["container-fluid the-product-card", Productcard.productCardHero].join(" ")}>
      
      <div className={[Productcard.cardContainer,"cardContainerflex"].join(" ")}>
        {/* <div className={["d-flex",Productcard.cardname].join(" ")}>
                    <p>new</p>
                    <img className={Productcard.bulp} src={smlamb}/>
                </div> */}
                <h1  className="d-none Productcardtype show-mob-result">{Type}</h1>
                {productdescription ? (
          <div
            className={[Productcard.productcardcon,"productcardcon","analyzr"].join(" ")}
            dangerouslySetInnerHTML={productdescription}
          ></div>
        ) : (
          ""
        )}
      <div className={"product-card-img"}>
        {productimage ? (
          <Link to={productLink}><Img className={[Productcard.cardimg,'custom-img'].join(" ")} fluid={productimage} /></Link>
        ) : (
          ""
        )}
</div>
<div className={"product-card-con"}>
        {isrx !== "RX"? <div className={[Productcard.starspd,"starspd"].join(" ")}>
        <div className="analyzer-rate">
        <p className={[Productcard.price,"cardProdprice"].join(" ")}>
              $ <span className="prod-price">{price}</span>
            </p> 
           
               <div

              data-bv-show="inline_rating"

              data-bv-product-id={productId}

              data-bv-redirect-url = {productLink}
              
               data-bv-seo="false" >

              </div>
              </div>
              <button data-Sku={Sku} className={["the-new-product-button","mob-analyzer-btn"].join(" ")} 
        onClick={() => {
          let quantity = 1;
          addToCart(productId,false,quantity,price,premierid,feild_preimer);
        }}
        disabled={addingToCart === productId}
      >
        {addingToCart === productId ? "Adding to Bag" : "Add to Bag"}
        </button>
        </div> :<div className="analyzer-rate h-27"></div>}
        {Type ? <h1  className="d-none Productcardtype">{Type}</h1>:''}
          
          
        {producttitle ? (
          <p className={[Productcard.productcarddesc,"productcarddesc"].join(" ")}><Link to={productLink}><span dangerouslySetInnerHTML={{__html: producttitle}}></span></Link></p>
        ) : (
          ""
        )}
        
        {productdescription ? (
          <div
            className={[Productcard.productcardcon,"productcardcon"].join(" ")}
            dangerouslySetInnerHTML={productdescription}
          ></div>
        ) : (
          ""
        )}
        {price ? (
          <div className={[Productcard.priceCon,"priceCon"].join(" ")}>
            <p className={[Productcard.price,"prod-price-con"].join(" ")}>
              $<span className="prod-price">{price}</span>
            </p>
            {isrx == 'RX'?
            <Link className={Productcard.addtocart} to="/medical/hcpfinder">
              
             Locate a Physician
          </Link>
            :<button data-Sku={Sku}  className={[Productcard.addtocart, "the-product-button"].join(" ")} 
            onClick={() => {
              let quantity = 1;
              addToCart(productId,false,quantity,price,premierid,feild_preimer);
            }}
            disabled={addingToCart === productId}
          >
            {addingToCart === productId ? "Adding to Bag" : "Add to Bag"}
            </button>
            }
          </div>
        ) : (
          ""
        )}<button data-Sku={Sku}  className={["the-new-product-button"].join(" ")} 
        onClick={() => {
          let quantity = 1;
          addToCart(productId,false,quantity,price,premierid,feild_preimer);
        }}
        disabled={addingToCart === productId}
      >
        {addingToCart === productId ? "Adding to Bag" : "Add to Bag"}
        </button>
      </div>
      </div> </div>
  )
}
export default ProductCard

