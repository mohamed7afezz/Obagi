import React, { useContext,useEffect } from "react"
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
import paycred from '../../assets/images/ppcredit-logo-large.png'
import freeimg from "../../assets/images/tag.png"
import ProductSuggestion from "../product-components/productsuggestion"
import SearchContext from "../../providers/search-provider"
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {checkStock} from '../../assets/js/stock';
const baseUrl = process.env.Base_URL;
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
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

  const { searchInIndexById } = useContext(SearchContext)
  let itemsContent = items.map(item => {
    let findedProduct = searchInIndexById([item.product_id], 1);
    item.premier_points = '';
    if (findedProduct.length > 0) {
      item.premier_points = findedProduct[0].field_medical_premier_points;
    }
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
                <p className={[ShowBagStyle.BagProductDesc, BagStyle.cartpre].join(" ")}><Link className={ShowBagStyle.cartProductTitle} to={`${producturl[1]}`}><span dangerouslySetInnerHTML={{ __html: item.name }}></span></Link> </p>
                {item.premier_points != '' ? <span className={[BagStyle.premire, BagStyle.premirecart].join(" ")}>Earn {item.premier_points} Premier Points ea.</span> : ''}
              </div>

              <div className={["col-12", "row", "d-flex", ShowBagStyle.left, "mobsetpadding"].join(" ")}>
                <div className={["d-flex", ShowBagStyle.left, "col-9", "pl-0"].join(" ")}>
                  <div className={[BagStyle.bagCount, "d-flex", "col-lg-7", "col-lg-6"].join(" ")}>
                    <AdjustItem {...props} item={item} cartType={cartType} />
                  </div>
                  <button href="#" onClick={() => props.removeItemFromCart(item.id)}
                    className={[ShowBagStyle.removebtn, "col-5"].join(" ")}
                  >
                    Remove
                    </button>
                </div>
                <p className={[ShowBagStyle.Price, "col-3", "mob-pr-0", "mob-text-center", `${item.list_price === "0"? "price-opacity" : ""}`].join(" ")}>${parseFloat(item.list_price).toFixed(2)}</p>
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
                <div className={"col-md-5 mob-p-0"}>
                  <p className={BagStyle.prouductBagDesc}><Link className={ShowBagStyle.cartProductTitle} to={`${producturl[1]}`}><span dangerouslySetInnerHTML={{ __html: item.name }}></span></Link> </p>
                  {item.premier_points != '' ? <span className={BagStyle.premire}>Earn {item.premier_points} Premier Points ea.</span> : ''}
                </div>
                {/* <div className={"col-md-2"}>
                <p className={BagStyle.prouductPoints}> Premier Points: 20</p>
              </div> */}
                <div class="col-md-2 col-4 mob-p-0">
                  <div className={[BagStyle.bagCount, "d-flex"].join(" ")}>
                    <AdjustItem {...props} item={item} cartType={cartType} />
                  </div>
                </div>
                <div class="col-md-2 col-4">
                  <p
                    className={[
                      BagStyle.bagProudctPrice,
                      "bagProudctPrice",
                    ].join(" ")}
                  >
                    ${parseFloat(item.list_price).toFixed(2)}
                  </p>
                </div>
                <div class="col-md-1 col-4">
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

const YourBag = (props, { notificationId }) => {
  useEffect(() => {
    if(typeof window != undefined ){
      checkStock(baseUrl);
    }
  })
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
      field_medical_premier_points_id
      field_medical_sku
      field_medical_premier_points
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
      field_medical_premier_points_id
      field_medical_sku
      field_medical_premier_points
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
      field_medical_sku
      field_medical_premier_points_id
      field_medical_premier_points
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
      field_medical_premier_points_id
      field_medical_sku
      field_medical_premier_points
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
      field_medical_premier_points_id
      field_medical_sku
      field_medical_premier_points
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
      field_clinical_sku
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
      field_clinical_sku
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
      field_clinical_sku
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
      field_clinical_sku
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
      field_clinical_sku
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


  const { state, removeItemFromCart, updateCartItemQuantity, fetchShippingMethods, changeShippingMethods, showShippingMethods } = useContext(
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
    if (state.shippingLoading) {
      fetchShippingMethods();
    }
    showShippingMethods(!state.showShippingMethods);
  }
  function coupon(e) {
    document.querySelector(".bagDataConten").classList.toggle("showCoupon")
  }
  function apply(e) {
    document.querySelector(".bagDataConten").classList.toggle("applied")
    e.preventDefault()
  }

  // console.log("line", lineItems);
  var checkProduct = lineItems.physical_items ? lineItems.physical_items.filter(product => (product.product_id === profProductId)) : "";
  // console.log("line", checkProduct)

  let isClinical = true;
  function getRecommendedProducts(bag) {
    if (bag.length > 3) {
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

    for (let i = 0; i < bag.length; i++) {
      if (!bag[i].url.includes('clinical')) {
        isClinical = false;
        break;
      }
    }

    if (isClinical) {
      tempList = clinicalList.filter(item => bag.filter(product => product.product_id === parseInt(item.field_clinical_id)).length < 1);
    } else {
      tempList = medicalList.filter(item => bag.filter(product => product.product_id === parseInt(item.field_medical_id)).length < 1);
    }

    recommendedList = [tempList[0], tempList[1]];

    return recommendedList;
  }
  let shipmenttext = (id) => {
    if (id === 2) {
      return <p className="shipmenttext">Up to 3  Business Days*</p>
    } else if (id === 4) {
      return <p className="shipmenttext">2 Business Days*</p>
    } else if (id === 5) {
      return <p className="shipmenttext">1 Business Day*</p>
    }
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
          {125 - parseFloat(cartAmount).toFixed(2) > 0 ?
                        <div className={BagStyle.FfreeShipping}>
                        Spend <span>${(125 - parseFloat(cartAmount).toFixed(2)).toFixed(2)}</span> more for FREE shipping!
                                          </div>:""}
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
                <p className={ShowBagStyle.Subtotal}>${parseFloat(cartAmount).toFixed(2)}</p>
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
              {/* : ""} */}
              {
                <div className={[ShowBagStyle.recommendedWrapper, "recommendedWrapper"].join(' ')}>
                  {(lineItems.physical_items).length <= 3 ? <div className={[ShowBagStyle.recommendedTitle, "recommendedTitle"].join(" ")}>Recommended</div> : ""}
                  <div className="prodrecom">
                  {getRecommendedProducts(lineItems.physical_items).length > 0?getRecommendedProducts(lineItems.physical_items).map(product => {
                    return (
                      <RecommendedProduct
                        recId={isClinical? product.field_clinical_id : product.field_medical_id}
                        recTitle={product.title ? product.title : ""}
                        recLink={product.path.alias ? product.path.alias : ""}
                        recImage={isClinical ? ((product.relationships.field_clinical_image && product.relationships.field_clinical_image[0].localFile) ? product.relationships.field_clinical_image[0].localFile.childImageSharp.fluid : '' ) : ((product.relationships.field_medical_image && product.relationships.field_medical_image[0].localFile) ? product.relationships.field_medical_image[0].localFile.childImageSharp.fluid : '')}
                        recPrice={isClinical ? (product.field_clinical_price? product.field_clinical_price : "") : (product.field_medical_price? product.field_medical_price : "")}
                        premierid={isClinical ?"": product.field_medical_premier_points_id?product.field_medical_premier_points_id:""}
                        feild_preimer={isClinical ?"": product.field_medical_premier_points?product.field_medical_premier_points:""}
                        Sku={isClinical ? product.field_clinical_sku ? product.field_clinical_sku : "": product.field_medical_sku}
                        />
                    )
                  })  : ''
                }
                  </div>

                </div>
              }

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
                        <img alt="" src={freeimg} /></div>
                    </div>
                    <div class="row alignFlex col-11 col-lg-12">
                      <div class="col-md-2 hide-tabmob">
                        <img alt="" src={freeimg} />
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
              >
                <p className={BagStyle.ordersummary}>Order Summary</p>
                <div className={BagStyle.giveBorder}>
                  <div class="bagDataConten Showshipping">
                    <p className={[BagStyle.Subtotal, "d-flex"].join(" ")}>
                      <span className={BagStyle.bagtitles}>
                        <strong>Subtotal</strong>
                      </span>
                      <span>${parseFloat(cartAmount).toFixed(2)}</span>
                    </p>
                    <div>
                      <div className={[BagStyle.Shipping, "d-flex"].join(" ")}>
                        <span className={BagStyle.bagtitles}>
                          <strong>Shipping</strong>
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
                            {state.showShippingMethods == 0 ? 'Select' : 'Cancel'}
                          </button>
                          {/* <button
                            onClick={e => togglebag(e)}
                            className={[
                              "btn",
                              BagStyle.Shippingbtn,
                              "RemoveBag",
                            ].join(" ")}
                          >
                            Cancel
                        </button> */}
                        </span>
                      </div>
                      {state.showShippingMethods ?
                        <div className={"showinfp"}>
                          {/* <div className={BagStyle.bagSelectContainer}>
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
                          </button> */}
                          {!state.shippingLoading ?
                            <>
                              {state.shippingMethods.length > 0 ? state.shippingMethods
                                .map(method => (
                                  <>
                                    {(method.settings
                                      && method.settings.carrier_options
                                      && method.settings.carrier_options.minimum_sub_total
                                      && cartAmount < parseFloat(method.settings.carrier_options.minimum_sub_total)) ?
                                      ''
                                      :
                                      <>
                                        <div class="d-flex shipping-flex">
                                          <label class="radioLabel">
                                            <input type="radio" id={method.id}
                                              name="me" value={method.settings.rate ? method.settings.rate : 0}
                                              checked={state.selectedShippingMethodsId == method.id}
                                              onClick={changeShippingMethods}
                                            />
                                            {method.name}
                                            <span class="radiomark"></span>
                                          </label>
                                          <label >{method.settings.rate ? '$' + method.settings.rate : 'FREE'}</label>
                                        </div>
                                        <p className="shipmenttxt">{shipmenttext(method.id)}</p>
                                      </>
                                    }
                                  </>

                                )) : ''}
                              <p class="shipping-footnote">*Please allow for up to 1 business day for order processing.</p>

                            </>

                            : <div>
                              <ClipLoader
                                css={spinner}
                                size={100}
                                color={"#123abc"}
                              />
                            </div>}
                        </div>
                        : ''}
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
                        <strong>${cartAmount + parseFloat(state.estShipping)}</strong>
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
                        <img type="submit" src={paypal} />
                      </button>

                      <button
                        className={BagStyle.buttonImg}
                        type="submit">
                        <img type="submit" src={paycred} />
                      </button>
                      <button
                        className={BagStyle.buttonImg}
                        type="submit">
                        <img type="submit" src={visa} />
                      </button>
                    </form>

                  </div>
                </div>
                <p className={BagStyle.paytitle}>Customer Service</p>
                <p className={BagStyle.paytext}>Our Customer Service Representatives are available to assist you Monday through Friday, from 7am – 4pm PST at <span className={BagStyle.csNumber}>1-800-636-7546</span>.</p>
              </div>
            </div>

          </div>

          {
            ((getRecommendedProducts(lineItems.physical_items).length > 0) && (lineItems.physical_items)) ? <ProductSuggestion /> : ''
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
            {cartType === "overlay"? <button type="button" onClick={() => { removeNotification(notificationId); }}
              className={ShowBagStyle.empatyLink}
            >
              Continue Shopping
            </button>
            :
            <Link to="/" className={ShowBagStyle.empatyLink}>Continue Shopping</Link>}
          </div>

          <div className="d-lg-none">
            <div className={ShowBagStyle.bottomHalf}>
              <div className={ShowBagStyle.bottomTitle}>Try our Skin Analyzer</div>
              <div className={ShowBagStyle.bottomText}>Find the best Obagi solution for you</div>
              <div className={ShowBagStyle.bottomLink}><Link to="/skin-analyzer"> TAKE THE QUIZ <span className={ShowBagStyle.bottomArrow} >→</span></Link></div>
              <div className={ShowBagStyle.image}>{data.skinanalyzerMob ? data.skinanalyzerMob.childImageSharp ? <Img fluid={data.skinanalyzerMob.childImageSharp.fluid} /> : "" : ""}</div>
            </div>
          </div>

          <div className="d-none d-lg-block">
            <div className={[ShowBagStyle.bottomWrapper].join(" ")}>
              {/* <div className="col-4 pr-0"> */}
              <div className={ShowBagStyle.image}>{data.skinanalyzerDesk ? data.skinanalyzerDesk.childImageSharp ? <Img fixed={data.skinanalyzerDesk.childImageSharp.fixed} /> : "" : ""}</div>
              {/* </div> */}
              {/* <div className="col-8 pl-0"> */}
              {/* <div className="d-flex align-items-center h-100"> */}
              <div className={ShowBagStyle.bottomHalf}>
                <div className={ShowBagStyle.bottomTitle}>Try our Skin Analyzer</div>
                <div className={ShowBagStyle.bottomText}>Find the best Obagi solution for you</div>
                <Link to="/skin-analyzer" className={ShowBagStyle.bottomLink}>TAKE THE QUIZ <span className={ShowBagStyle.bottomArrow} >→</span></Link>
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>


          <div className={[ShowBagStyle.recommendedWrapper, "recommendedWrapper"].join(' ')}>
            <div className={[ShowBagStyle.recommendedTitle, "recommendedTitle"].join(" ")}>Recommended</div>
            <div className="prodrecom">
              <RecommendedProduct
                recId={profProductId}
                recTitle={data.professionalC.title ? data.professionalC.title : ""}
                recLink={data.professionalC.path.alias ? data.professionalC.path.alias : ""}
                recImage={data.professionalC.relationships ? data.professionalC.relationships.field_medical_image[0] ? data.professionalC.relationships.field_medical_image[0].localFile ? data.professionalC.relationships.field_medical_image[0].localFile.childImageSharp.fluid : "" : "" : ""}
                recPrice={data.professionalC.field_medical_price ? data.professionalC.field_medical_price : ""}
                premierid={data.professionalC.field_medical_premier_points_id?data.professionalC.field_medical_premier_points_id:""}
                Sku={data.professionalC.field_medical_sku?data.professionalC.field_medical_sku:""}
                feild_preimer={data.professionalC.field_medical_premier_points?data.professionalC.field_medical_premier_points:""}
              />

              <RecommendedProduct
                recId={elastiProductId}
                recTitle={data.elastiderm.title ? data.elastiderm.title : ""}
                recLink={data.elastiderm.path.alias ? data.elastiderm.path.alias : ""}
                recImage={data.elastiderm.relationships ? data.elastiderm.relationships.field_medical_image[0] ? data.elastiderm.relationships.field_medical_image[0].localFile ? data.elastiderm.relationships.field_medical_image[0].localFile.childImageSharp.fluid : "" : "" : ""}
                recPrice={data.elastiderm.field_medical_price ? data.elastiderm.field_medical_price : ""}
                premierid={data.elastiderm.field_medical_premier_points_id?data.elastiderm.field_medical_premier_points_id:""}
                Sku={data.elastiderm.field_medical_sku?data.elastiderm.field_medical_sku:""}
                feild_preimer={data.elastiderm.field_medical_premier_points?data.elastiderm.field_medical_premier_points:""}
              />
            </div>
            <div className="prodsuggest">
              <ProductSuggestion />
            </div>
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
          <ClipLoader
            css={spinner}
            size={150}
            color={"#123abc"}
          />
        </div>
      </div>
    )
  }
  return <>{bagContent}</>
}
export default YourBag
