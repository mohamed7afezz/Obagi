import React, { useEffect, useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import BagStyle from "../assets/scss/components/yourbag.module.scss"
import ShowBagStyle from "../assets/scss/components/show-bag.module.scss"

import plusicon from "../assets/images/product-images/plus1.svg"
import minusicon from "../assets/images/product-images/minus.svg"
import Img from "gatsby-image"

import CartContext from "../providers/cart-provider"

const StandardItem = props => {
  const { items } = props
  const cartType = props.cartType
  let itemImage
  
  return (
    <>
      {items.map(item => {
        return (
          <div className={"productInBag"}>
            <div className={["row", "alignFlex"].join(" ")}>
              <div class="hide-desk col-4">
                <img src={item.image_url} alt={`${item.name}`} />
              </div>
              <div
                className={["row", "alignFlex", "col-8", "col-lg-12"].join(" ")}
              >
                <div className={["col-md-2", "hide-tabmob"].join(" ")}>
                  <img src={item.image_url} alt={`${item.name}`} />
                </div>
                <div className={"col-md-4"}>
                  <p className={BagStyle.prouductBagDesc}>{item.name}</p>
                </div>
                <div className={"col-md-2"}>
                  <p className={BagStyle.prouductPoints}> Premier Points: 20</p>
                </div>
                <div class="col-md-2 col-6">
                  <div className={[BagStyle.bagCount, "d-flex"].join(" ")}>
                    <button className={["btn", BagStyle.minus].join(" ")}>
                      <img className={BagStyle.plusicon} src={minusicon} />
                    </button>{" "}
                    <p className={BagStyle.productcount}>1</p>
                    <button className={["btn", BagStyle.add].join(" ")}>
                      {" "}
                      <img className={BagStyle.plusicon} src={plusicon} />{" "}
                    </button>
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
                  <button className={["btn", BagStyle.action].join(" ")}>
                    {" "}
                    Remove{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
const YourBag = props => {
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

  const data = useStaticQuery(graphql`
    query {
      prouduct: file(
        relativePath: { eq: "product-images/prouduct-thumb.png" }
      ) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
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
  let bagContent
  if (cartType == "overlay") {
    bagContent = (
      <>
        <div className={["row", ShowBagStyle.selectedproductsCard].join(" ")}>
          <div className={"col-4"}>
            <Img
              className={ShowBagStyle.prodThumb}
              fluid={data.prouduct.childImageSharp.fluid}
            />
          </div>
          <div className={["col-8", ShowBagStyle.removepadding].join(" ")}>
            <div className={["col-12", "row"].join(" ")}>
              <p className={ShowBagStyle.BagProductDesc}>
                Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum Dolor Sit
                Amet Consectetur
              </p>
            </div>

            <div
              className={["col-12", "row", "d-flex", ShowBagStyle.left].join(
                " "
              )}
            >
              <div
                className={["d-flex", ShowBagStyle.left, "col-10", "pl-0"].join(
                  " "
                )}
              >
                <div
                  className={[BagStyle.bagCount, "d-flex", "col-8"].join(" ")}
                >
                  <button className={["btn", BagStyle.minus].join(" ")}>
                    <img className={BagStyle.plusicon} src={minusicon} />
                  </button>{" "}
                  <p className={BagStyle.productcount}>1</p>
                  <button className={["btn", BagStyle.add].join(" ")}>
                    {" "}
                    <img className={BagStyle.plusicon} src={plusicon} />{" "}
                  </button>
                </div>
                <a
                  href="#"
                  className={[ShowBagStyle.removebtn, "col-4"].join(" ")}
                >
                  Remove
                </a>
              </div>
              <p className={[ShowBagStyle.Price, "col-2"].join(" ")}>$8.00</p>
            </div>
          </div>
        </div>
        <div className={ShowBagStyle.final}>
          <div
            className={[ShowBagStyle.total, "d-flex", ShowBagStyle.left].join(
              " "
            )}
          >
            <p className={ShowBagStyle.Subtotal}>Subtotal:</p>
            <p className={ShowBagStyle.Subtotal}>$24.00</p>
          </div>
          <a className={BagStyle.Checkout} href="#">
            Checkout
          </a>
          <p className={ShowBagStyle.footnote}>
            Shipping and taxes calculated at checkout.
          </p>
        </div>
      </>
    )
  } else {
    if (!state.cartLoading) {
      if (numberItems > 0) {
        bagContent = (
          <div
            className={[
              "container-fluid",
              "BagContainer",
              BagStyle.BagContainer,
            ].join(" ")}
          >
            <h2 className={BagStyle.bagHead}>Your Bag</h2>
            <div className={"row"}>
              <div className={["offset-lg-1", "col-md-7"].join(" ")}>
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
                  "col-md-3",
                  "bagDataContainer",
                  BagStyle.bagDataContainer,
                ].join(" ")}
              >
                <div class="bagDataConten">
                  <p className={[BagStyle.Subtotal, "d-flex"].join(" ")}>
                    <span className={BagStyle.bagtitles}>
                      <strong>Subtotal</strong>
                    </span>{" "}
                    <span>$24.00</span>
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
                          <option vlaue="All">Select</option>
                          <option value="Hyaluronic Acid">
                            Hyaluronic Acid
                          </option>
                        </select>
                      </div>
                      <div className={BagStyle.bagSelectContainer}>
                        <label>State/Province</label>
                        <select className={BagStyle.bagSelect} name="Country">
                          <option vlaue="All">Select</option>
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
                      <strong>$24.00</strong>
                    </span>
                  </p>
                  <a
                    className={BagStyle.Checkout}
                    onClick={e => apply(e)}
                    href="#"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
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
              <p
                className={ShowBagStyle.empatyTitle}
              >
                Looks like your bag is empty!
              </p>
              <Link
                className={ShowBagStyle.empatyLink}
                href="#"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )
      }
    } else {
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
              Loading Bag!
            </p>
          </div>
        </div>
      )
    }
  }
  return <>{bagContent}</>
}
export default YourBag
