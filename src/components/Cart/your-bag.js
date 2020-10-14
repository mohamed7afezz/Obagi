import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import BagStyle from "../../assets/scss/components/yourbag.module.scss"
import ShowBagStyle from "../../assets/scss/components/show-bag.module.scss"
import Img from 'gatsby-image'
import plusicon from "../../assets/images/product-images/plus1.svg"
import minusicon from "../../assets/images/product-images/minus.svg"
import ProductCard from '../productcard'
import RecommendedProduct from '../recommended-product'
import Loader from "./Loader"
import $ from 'jquery'
import CartContext from "../../providers/cart-provider"
import Showbag from "./bag-preview"
import { parse } from "@fortawesome/fontawesome-svg-core"
import paypal from "../../assets/images/product-images/paypal.png"
import appelpay from "../../assets/images/product-images/appelPay.png"
import visa from "../../assets/images/product-images/visa.png"
import paycred from'../../assets/images/ppcredit-logo-large.png'
import freeimg from "../../assets/images/tag.png"
import ProductSuggestion from "../product-components/productsuggestion"
const AdjustItem = props => {
  const { item, updatingItem, cartType } = props;
  let minusBtn, plusBtn;
  // console.log("item", item);

  minusBtn = (
    <button onClick={() => props.updateCartItemQuantity(item, 'minus')} className={["btn", BagStyle.minus].join(" ")}>
      <img alt="img" className={BagStyle.plusicon} src={minusicon} />
    </button>
  )

  plusBtn = (
    <button onClick={() => props.updateCartItemQuantity(item, 'plus')} className={["btn", BagStyle.add].join(" ")} disabled={item.quantity >= 3 ? 'disabled' : false}>
      <img alt="img" className={BagStyle.plusicon} src={plusicon} />
    </button>
  )


  return (
    <>
      {minusBtn}
      {updatingItem === item.id ? <Loader /> : <p className={BagStyle.productcount}>{item.quantity}</p>}
      {plusBtn}

    </>
  );
};
const StandardItem = props => {
  const { items, cartType } = props


  let itemsContent = items.map(item => {
    var producturl = item.url.split(".com")
    if (cartType === "overlay") {
      return (
        <>
          <div className={["row", ShowBagStyle.selectedproductsCard, "selectedproductsCard"].join(" ")}>
            <div className={["col-4", "mob-pl-0"].join(" ")}>
              <Link href={`${producturl[1]}`}>
                <img alt="img" src={item.image_url} alt={`${item.name}`} />
              </Link>
            </div>
            <div className={["col-8", "mob-pr-0"].join(" ")}>
              <div className={"w-100"}>
                <p className={ShowBagStyle.BagProductDesc}><Link className={ShowBagStyle.cartProductTitle} to={`${producturl[1]}`}>{item.name}</Link> </p>
              </div>

              <div className={["col-12", "row", "d-flex", ShowBagStyle.left, "mobsetpadding"].join(" ")}>
                <div className={["d-flex", ShowBagStyle.left, "col-9", "pl-0"].join(" ")}>
                  <div className={[BagStyle.bagCount, "d-flex", "col-lg-8", "col-lg-6"].join(" ")}>
                    <AdjustItem {...props} item={item} cartType={cartType} />
                  </div>
                  <button href="#" onClick={() => props.removeItemFromCart(item.id)}
                    className={[ShowBagStyle.removebtn, "col-4"].join(" ")}
                  >
                    Remove
                    </button>
                </div>
                <p className={[ShowBagStyle.Price, "col-3", "mob-pr-0", "mob-text-center"].join(" ")}>${item.list_price}</p>
              </div>
            </div>
          </div>

        </>
      )
    } else {
      return (
        <>
        <div className={"productInBag"}>
          <div className={["row", "alignFlex"].join(" ")}>
            <div class="hide-desk col-4">
              <Link to={`${producturl[1]}`}>
                <img alt="img" src={item.image_url} alt={`${item.name}`} />
              </Link>
            </div>
            <div
              className={["row", "alignFlex", "col-8", "col-lg-12"].join(" ")}
            >
              <div className={["col-md-2", "hide-tabmob"].join(" ")}>
                <Link to={`${producturl[1]}`}>
                  <img alt="img" src={item.image_url} alt={`${item.name}`} />
                </Link>
              </div>
              <div className={"col-md-4"}>
                <p className={BagStyle.prouductBagDesc}><Link className={ShowBagStyle.cartProductTitle} to={`${producturl[1]}`}>{item.name}</Link> </p>
              </div>
              {/* <div className={"col-md-2"}>
                <p className={BagStyle.prouductPoints}> Premier Points: 20</p>
              </div> */}
              <div class="col-md-2 col-6">
                <div className={[BagStyle.bagCount, "d-flex"].join(" ")}>
                  <AdjustItem {...props} item={item} cartType={cartType} />
                </div>
              </div>
              <div class="col-md-1 col-3">
                <p
                  className={[
                    BagStyle.bagProudctPrice,
                    "bagProudctPrice",
                  ].join(" ")}
                >
                  ${item.list_price}
                </p>
              </div>
              <div class="col-md-1 col-3">
                <button onClick={() => props.removeItemFromCart(item.id)} className={["btn", BagStyle.action].join(" ")}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      )
    }

  })

  return (
    <>
      {itemsContent}
    </>

  )
}

const Base_URL = process.env.Base_URL;

const YourBag = (props, {notificationId}) => {
  const value = useContext(CartContext)
  const addToCart = value && value.addToCart
  const addingToCart = value && value.state.addingToCart

  const removeNotification = value && value.removeNotification;

  const data = useStaticQuery(graphql`
  query {
    skinanalyzerMob: file(relativePath: { eq: "Skin_Analyzer295.jpg" }) {
      childImageSharp {
          fluid (quality: 100){
              ...GatsbyImageSharpFluid
            }
      }
    }

    skinanalyzerDesk: file(relativePath: { eq: "Skin_Analyzer166.jpg" }) {
      childImageSharp {
          fixed{
              ...GatsbyImageSharpFixed
            }
      }
    }

    professionalC: nodeMedicalProduct(field_medical_id: {eq: "349"}) {
      id
      field_medical_price
      field_medical_id
      title
      path {
        alias
      }
      relationships {
        field_medical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    elastiderm: nodeMedicalProduct(field_medical_id: {eq: "373"}) {
      id
      field_medical_price
      field_medical_id
      title
      path {
        alias
      }
      relationships {
        field_medical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    hydrate: nodeMedicalProduct(field_medical_id: {eq: "352"}) {
      id
      field_medical_price
      field_medical_id
      title
      path {
        alias
      }
      relationships {
        field_medical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    cMicro: nodeMedicalProduct(field_medical_id: {eq: "356"}) {
      id
      field_medical_price
      field_medical_id
      title
      path {
        alias
      }
      relationships {
        field_medical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    spf: nodeMedicalProduct(field_medical_id: {eq: "383"}) {
      id
      field_medical_price
      field_medical_id
      title
      path {
        alias
      }
      relationships {
        field_medical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    product1: nodeClinicalProduct(field_clinical_id: {eq: "339"}) {
      id
      field_clinical_price
      field_clinical_id
      title
      path {
        alias
      }
      relationships {
        field_clinical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                }
            }
          }
        }
      }
    }

    product2: nodeClinicalProduct(field_clinical_id: {eq: "346"}) {
      id
      field_clinical_price
      field_clinical_id
      title
      path {
        alias
      }
      relationships {
        field_clinical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                }
            }
          }
        }
      }
    }

    product3: nodeClinicalProduct(field_clinical_id: {eq: "343"}) {
      id
      field_clinical_price
      field_clinical_id
      title
      path {
        alias
      }
      relationships {
        field_clinical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                }
            }
          }
        }
      }
    }

    product4: nodeClinicalProduct(field_clinical_id: {eq: "345"}) {
      id
      field_clinical_price
      field_clinical_id
      title
      path {
        alias
      }
      relationships {
        field_clinical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                }
            }
          }
        }
      }
    }

    product5: nodeClinicalProduct(field_clinical_id: {eq: "347"}) {
      id
      field_clinical_price
      field_clinical_id
      title
      path {
        alias
      }
      relationships {
        field_clinical_image {
          localFile {
            childImageSharp {
              fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                }
            }
          }
        }
      }
    }

  }

  `);


  let profProductId = data.professionalC.field_medical_id ? data.professionalC.field_medical_id : "";
  let elastiProductId = data.elastiderm.field_medical_id ? data.elastiderm.field_medical_id : "";
  let hydrateId = data.hydrate.field_medical_id ? data.hydrate.field_medical_id : "";


  const { state, removeItemFromCart, updateCartItemQuantity } = useContext(
    CartContext
  )
  const {
    currency,
    cartAmount,
    lineItems,
    numberItems,
    redirectUrls,
  } = state.cart
  const { updatingItem } = state;
  const { cartType } = props



  function togglebag(e) {
    document.querySelector(".bagDataConten").classList.toggle("Showshipping")
  }
  function coupon(e) {
    document.querySelector(".bagDataConten").classList.toggle("showCoupon")
  }
  function apply(e) {
    document.querySelector(".bagDataConten").classList.toggle("applied")
    e.preventDefault()
  }

  // console.log("line", lineItems);
  var checkProduct = lineItems.physical_items? lineItems.physical_items.filter(product => (product.product_id === profProductId)) : "";
  // console.log("line", checkProduct)

  let isClinical = true;
  function getRecommendedProducts(bag) {
    if(bag.length > 3) {
      return [];
    }

    let medicalList = [
      data.professionalC,
      data.elastiderm,
      data.hydrate,
      data.cMicro,
      data.spf
    ]
    let clinicalList = [
      data.product1,
      data.product2,
      data.product3,
      data.product4,
      data.product5
    ]

    let recommendedList = [];
    let tempList = [];
    
    // check if bag products are all clinical => recommended from clinical List 
    // if not recommended from medical List
    // choose top 2 from list which not in the bag

    for(let i = 0; i < bag.length; i++) {
      if(!bag[i].url.includes('clinical')) {
        isClinical = false;
        break;
      }
    }

    if(isClinical) {
      tempList = clinicalList.filter(item => bag.filter(product => product.product_id === parseInt(item.field_clinical_id)).length < 1);
    } else {
      tempList = medicalList.filter(item => bag.filter(product => product.product_id === parseInt(item.field_medical_id)).length < 1);
    }

    recommendedList = [tempList[0], tempList[1]];

    return recommendedList;
  }

  
  let bagContent
  //check if cart is  sill loading
  if (!state.cartLoading) {
    //if cart finish is loading >> check if cart have items
    if (numberItems > 0) {
      //if cart finish is loading >> if cart have items >> check type of cart
      if (cartType === "overlay") {
        //showpage content
        bagContent = (
          <>
            <StandardItem
              currency={currency}
              updatingItem={updatingItem}
              updateCartItemQuantity={updateCartItemQuantity}
              removeItemFromCart={removeItemFromCart}
              items={lineItems.physical_items}
              cartType={cartType}
            />
            <div className={ShowBagStyle.final}>
              <div
                className={[ShowBagStyle.total, "d-flex", ShowBagStyle.left].join(
                  " "
                )}
              >
                <p className={ShowBagStyle.Subtotal}>Subtotal:</p>
                <p className={ShowBagStyle.Subtotal}>${cartAmount}</p>
              </div>
              <form
                action={redirectUrls.checkout_url}
                method="post"
                
                encType="multipart/form-data">
                <button
                  className={BagStyle.Checkout}
                  type="submit">
                  Checkout
                  </button>
              </form>

              <div className={BagStyle.freeShipping}>
                Obagi Members Receive Complimentary Free Shipping on Orders $125 or more
                  </div>
              {/* {lineItems.physical_items.filter(product => (product.product_id === profProductId)) ? */}
                {/* recommended products section */}
                {/* {console.log('bahiiii', lineItems.physical_items)} */}
                <div className={`${ShowBagStyle.recommendedWrapper} ${lineItems.physical_items.length > 3 ? 'hide' : ''}`}>
                  <div className={ShowBagStyle.recommendedTitle}>Recommended</div>
                  {getRecommendedProducts(lineItems.physical_items).length > 0?getRecommendedProducts(lineItems.physical_items).map(product => {
                    return (
                      <RecommendedProduct
                        recId={isClinical? product.field_clinical_id : product.field_medical_id}
                        recTitle={product.title ? product.title : ""}
                        recLink={product.path.alias ? product.path.alias : ""}
                        recImage={isClinical ? ((product.relationships.field_clinical_image && product.relationships.field_clinical_image[0].localFile) ? product.relationships.field_clinical_image[0].localFile.childImageSharp.fluid : '' ) : ((product.relationships.field_medical_image && product.relationships.field_medical_image[0].localFile) ? product.relationships.field_medical_image[0].localFile.childImageSharp.fluid : '')}
                        recPrice={isClinical ? (product.field_clinical_price? product.field_clinical_price : "") : (product.field_medical_price? product.field_medical_price : "")}
                      />
                    )
                  })  : ''
                }
                  
                </div> 
                {/* : ""} */}


              {/* <p className={ShowBagStyle.footnote}>
                Shipping and taxes calculated at checkout.
                </p> */}
            </div>
          </>
        )
      } else {
        //ful cart page
        bagContent = (<>
          <div
            className={[
              "container-fluid",
              "BagContainer",
              BagStyle.BagContainer,
            ].join(" ")}
          >
            <h2 className={BagStyle.bagHead}>Your Bag</h2>
            <div className={"row"}>
             <div className={["offset-lg-1", "col-lg-7"].join(" ")}>
              <div className="upsection ">
          <div className="productInBag">
            <div class="row alignFlex">
          <div class="hide-desk col-12 col-lg-4">
            <img alt="" src={freeimg}/></div>
          </div>
          <div class="row alignFlex col-11 col-lg-12">
            <div class="col-md-2 hide-tabmob">
            <img alt="" src={freeimg}/>
            </div>
            <div class="col-12 col-lg-10">
              <p className={BagStyle.exclusiveOffertitle}>
              COMPLIMENTARY SHIPPING 
                            </p>
              <p className={BagStyle.exclusiveOfferdesc}>
              Obagi Members Receive Complimentary Free Shipping on Orders $125 or more</p>
             
            </div>
          </div>
          </div>
        </div>
           
                <StandardItem
                  currency={currency}
                  updatingItem={updatingItem}
                  updateCartItemQuantity={updateCartItemQuantity}
                  removeItemFromCart={removeItemFromCart}
                  items={lineItems.physical_items}
                  cartType={cartType}
                />
              </div>
              <div
                className={[
                  "col-lg-3",
                  "bagDataContainer",
                  BagStyle.bagDataContainer,
                ].join(" ")}
              ><div className={BagStyle.giveBorder}>
                  <div class="bagDataConten">
                    <p className={[BagStyle.Subtotal, "d-flex"].join(" ")}>
                      <span className={BagStyle.bagtitles}>
                        <strong>Subtotal</strong>
                      </span>
                      <span>${cartAmount}</span>
                    </p>
                    <div>
                      <div className={[BagStyle.Shipping, "d-flex"].join(" ")}>
                        <span className={BagStyle.bagtitles}>
                          <strong>Est. Shipping</strong>
                        </span>
                        <span>
                          <button
                            onClick={e => togglebag(e)}
                            className={[
                              "btn",
                              BagStyle.Shippingbtn,
                              "Shippingbtn",
                              "ShowBag",
                            ].join(" ")}
                          >
                            Add Info
                        </button>
                          <button
                            onClick={e => togglebag(e)}
                            className={[
                              "btn",
                              BagStyle.Shippingbtn,
                              "RemoveBag",
                            ].join(" ")}
                          >
                            Remove
                        </button>
                        </span>
                      </div>
                      <div className={"showinfp"}>
                        <div className={BagStyle.bagSelectContainer}>
                          <label>Country</label>
                          <select className={BagStyle.bagSelect} name="Country">
                            <option value="All">Select</option>
                            <option value="Hyaluronic Acid">
                              Hyaluronic Acid
                          </option>
                          </select>
                        </div>
                        <div className={BagStyle.bagSelectContainer}>
                          <label>State/Province</label>
                          <select className={BagStyle.bagSelect} name="Country">
                            <option value="All">Select</option>
                            <option value="Hyaluronic Acid">
                              Hyaluronic Acid
                          </option>
                          </select>
                        </div>
                        <div className={BagStyle.baginputtext}>
                          <label>Suburb/City</label>
                          <input type="text" name="Suburb/City" />
                        </div>
                        <div className={BagStyle.baginputtext}>
                          <label>Zip Code</label>
                          <input type="text" name="Zip Code" />
                        </div>
                        <button
                          className={["btn", BagStyle.shippingbtn].join(" ")}
                        >
                          Estimate Shipping
                      </button>
                      </div>
                    </div>
                    <div className={"couponContainer"}>
                      <div
                        className={[BagStyle.Coupon, "Coupon", "d-flex"].join(
                          " "
                        )}
                      >
                        <span className={BagStyle.bagtitles}>
                          <strong>Coupon Code</strong>
                        </span>
                        <span>
                          <button
                            onClick={e => coupon(e)}
                            className={[
                              "btn",
                              "addCoupon",
                              BagStyle.Couponbtn,
                            ].join(" ")}
                          >
                            Add Coupon
                        </button>
                          <button
                            onClick={e => coupon(e)}
                            className={[
                              "btn",
                              "removeCoupon",
                              BagStyle.Couponbtn,
                            ].join(" ")}
                          >
                            Cancel
                        </button>
                        </span>
                        <span className={"aplliedDiscound"}>15% OFF APPLIED</span>
                      </div>
                      <div
                        className={["CouponCode", BagStyle.CouponCode].join(" ")}
                      >
                        <div className={BagStyle.couponBorder}>
                          <label>Enter Coupon Code</label>
                          <input type="text" name="Enter Coupon Code" />
                        </div>
                        <button
                          className={["btn", BagStyle.shippingbtn].join(" ")}
                        >
                          Apply Code
                      </button>
                      </div>
                      <div
                        className={[
                          BagStyle.discoundapplied,
                          "d-flex",
                          "discoundapplied",
                        ].join(" ")}
                      >
                        <span className={BagStyle.discoundtitle}>
                          <strong>Discount</strong>
                        </span>
                        <span>- $15.00</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={[BagStyle.subtotaldata, "subtotaldata"].join(" ")}
                  >
                    <p
                      className={[
                        BagStyle.Subtotal,
                        BagStyle.SubtotalFinal,
                        "d-flex",
                      ].join(" ")}
                    >
                      <span className={BagStyle.subtotalfinal}>
                        <strong>Subtotal</strong>
                      </span>{" "}
                      <span>
                        <strong>${cartAmount}</strong>
                      </span>
                    </p>
                    <form
                      action={redirectUrls.checkout_url}
                      method="post"
                      className={BagStyle.formcont}
                      encType="multipart/form-data">
                      <button
                        className={BagStyle.Checkout}
                        type="submit">
                        Checkout
                      </button>
                      <button
                        className={BagStyle.buttonImg}
                        type="submit">
                       <img type="submit" src={paypal}/>
                         </button>
                         <button
                        className={BagStyle.buttonImg}
                        type="submit">
                       <img type="submit" src={paycred}/>
                         </button>
                    </form>
                      
                  </div>
                </div>
                      <p className={BagStyle.paytitle}>Customer Service</p>
                      <p className={BagStyle.paytext}>Our Customer Service Representatives are available to assist you Monday through Friday, from 7am – 4pm PST at 1-800-636-7546.</p>
              </div>
            </div>
          
          </div>
          
          {
            ((getRecommendedProducts(lineItems.physical_items).length > 0) && (lineItems.physical_items))? <ProductSuggestion/> : ''
          }
          
          </>
        )
      }
    } else {
      //if cart have no items show empty cart
      bagContent = (
        <div
          className={[
            "container-fluid",
            "BagContainer",
            BagStyle.BagContainer,
          ].join(" ")}
        >
          <div>
            <p
              className={ShowBagStyle.empatyTitle}
            >
              Your Obagi shopping bag is empty.
            </p>
            <button type="button" onClick={() => {removeNotification(notificationId);}}
              className={ShowBagStyle.empatyLink}
            >
              Continue Shopping
            </button>
          </div>

          <div className="d-lg-none">
            <div className={ShowBagStyle.bottomHalf}>
              <div className={ShowBagStyle.bottomTitle}>Try our Skin Analyzer</div>
              <div className={ShowBagStyle.bottomText}>Find the best Obagi solution for you</div>
              <div className={ShowBagStyle.bottomLink}>TAKE THE QUIZ</div>
              <div className={ShowBagStyle.image}>{data.skinanalyzerMob? data.skinanalyzerMob.childImageSharp?<Img fluid={data.skinanalyzerMob.childImageSharp.fluid} /> : "" : ""}</div>
            </div>
          </div>

          <div className="d-none d-lg-block">
            <div className={[ ShowBagStyle.bottomWrapper].join(" ")}>
              {/* <div className="col-4 pr-0"> */}
              <div className={ShowBagStyle.image}>{data.skinanalyzerDesk? data.skinanalyzerDesk.childImageSharp? <Img fixed={data.skinanalyzerDesk.childImageSharp.fixed} /> : "" : ""}</div>
              {/* </div> */}
              {/* <div className="col-8 pl-0"> */}
                {/* <div className="d-flex align-items-center h-100"> */}
                  <div className={ShowBagStyle.bottomHalf}>
                    <div className={ShowBagStyle.bottomTitle}>Try our Skin Analyzer</div>
                    <div className={ShowBagStyle.bottomText}>Find the best Obagi solution for you</div>
                    <Link to="#" className={ShowBagStyle.bottomLink}>TAKE THE QUIZ</Link>
                  {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>

          <div className={ShowBagStyle.recommendedWrapper}>
            <div className={ShowBagStyle.recommendedTitle}>Recommended</div>

            <RecommendedProduct
              recId={profProductId}
              recTitle={data.professionalC.title ? data.professionalC.title : ""}
              recLink={data.professionalC.path.alias ? data.professionalC.path.alias : ""}
              recImage={data.professionalC.relationships ? data.professionalC.relationships.field_medical_image[0] ? data.professionalC.relationships.field_medical_image[0].localFile ? data.professionalC.relationships.field_medical_image[0].localFile.childImageSharp.fluid : "" : "" : ""}
              recPrice={data.professionalC.field_medical_price ? data.professionalC.field_medical_price : ""}
            />

            <RecommendedProduct
              recId={elastiProductId}
              recTitle={data.elastiderm.title ? data.elastiderm.title : ""}
              recLink={data.elastiderm.path.alias ? data.elastiderm.path.alias : ""}
              recImage={data.elastiderm.relationships ? data.elastiderm.relationships.field_medical_image[0] ? data.elastiderm.relationships.field_medical_image[0].localFile ? data.elastiderm.relationships.field_medical_image[0].localFile.childImageSharp.fluid : "" : "" : ""}
              recPrice={data.elastiderm.field_medical_price ? data.elastiderm.field_medical_price : ""}
            />
          </div>
        </div>
      )
    }
  } else {
    //message to show if cart is loading..
    bagContent = (
      <div
        className={[
          "container-fluid",
          "BagContainer",
          BagStyle.BagContainer,
        ].join(" ")}
      >
        <h2 className={BagStyle.bagHead}>Your Bag</h2>
        <div>
          <p className={ShowBagStyle.empatyTitle}>
            Loading Bag..
          </p>
        </div>
      </div>
    )
  }
  return <>{bagContent}</>
}
export default YourBag
