import React, { useEffect } from "react"
import BagStyle from "../assets/scss/components/yourbag.module.scss"
import { useStaticQuery, graphql } from "gatsby"
import plusicon from "../assets/images/product-images/plus1.svg"
import minusicon from "../assets/images/product-images/minus.svg"
import Img from "gatsby-image"
const YourBag = ({ node }) => {
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
      function togglebag(e){
        document.querySelector('.bagDataConten').classList.toggle("Showshipping");
      }
      function coupon(e){
        document.querySelector('.bagDataConten').classList.toggle("showCoupon");
      }
      function apply(e){
        document.querySelector('.bagDataConten').classList.toggle("applied");
        e.preventDefault();
      }
  return (
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
          <div className={"productInBag"}>
            <div className={["row", "alignFlex"].join(" ")}>
              <div class="hide-desk col-4">
                <Img
                  className={BagStyle.prodThumb}
                  fluid={data.prouduct.childImageSharp.fluid}
                />
              </div>
              <div
                className={["row", "alignFlex", "col-8", "col-lg-12"].join(" ")}
              >
                <div className={["col-md-2", "hide-tabmob"].join(" ")}>
                  <Img
                    className={BagStyle.prodThumb}
                    fluid={data.prouduct.childImageSharp.fluid}
                  />
                </div>
                <div className={"col-md-4"}>
                  <p className={BagStyle.prouductBagDesc}>
                    Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum Dolor
                    Sit Amet Consectetur
                  </p>
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
                    $24.00
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
        </div>
        <div
          className={[
            "col-md-3",
            "bagDataContainer",
            BagStyle.bagDataContainer,
          ].join(" ")}
        >
          <div class='bagDataConten'>
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
                <span >
                  <button onClick={(e) => togglebag(e)} className={["btn", BagStyle.Shippingbtn,"Shippingbtn","ShowBag"].join(" ")}>
                    Add Info
                  </button>
                  <button onClick={(e) => togglebag(e)} className={["btn", BagStyle.Shippingbtn,"RemoveBag"].join(" ")}>
                    Remove
                  </button>
                </span>
              </div>
              <div className={"showinfp"}>
                <div className={BagStyle.bagSelectContainer}>
                  <label>Country</label>
                  <select className={BagStyle.bagSelect} name="Country">
                    <option vlaue="All">Select</option>
                    <option value="Hyaluronic Acid">Hyaluronic Acid</option>
                  </select>
                </div>
                <div className={BagStyle.bagSelectContainer}>
                  <label>State/Province</label>
                  <select className={BagStyle.bagSelect} name="Country">
                    <option vlaue="All">Select</option>
                    <option value="Hyaluronic Acid">Hyaluronic Acid</option>
                  </select>
                </div>
                <div className={BagStyle.baginputtext}>
                <label>Suburb/City</label>
                <input type="text" name="Suburb/City"/>
                </div>
                <div className={BagStyle.baginputtext}>
                <label>Zip Code</label>
                <input type="text" name="Zip Code"/>
                </div>
                <button className={["btn", BagStyle.shippingbtn].join(" ")}>Estimate Shipping</button>
              </div>
            </div>
            <div className={'couponContainer'}>
            <div className={[BagStyle.Coupon,"Coupon", "d-flex"].join(" ")}>
              <span className={BagStyle.bagtitles}>
                <strong>Coupon Code</strong>
              </span>
              <span >
                <button onClick={(e) => coupon(e)} className={["btn",'addCoupon', BagStyle.Couponbtn].join(" ")}>
                  Add Coupon
                </button>
                <button onClick={(e) => coupon(e)} className={["btn","removeCoupon", BagStyle.Couponbtn].join(" ")}>
                 Cancel
                </button>
               
              </span>
              <span className={'aplliedDiscound'}>15% OFF APPLIED</span>
            </div>
            <div className={["CouponCode",BagStyle.CouponCode].join(" ")}>
              <div className={BagStyle.couponBorder}>
               <label>Enter Coupon Code</label>
                <input type="text" name="Enter Coupon Code"/>
                </div>
                <button className={["btn", BagStyle.shippingbtn].join(" ")}>Apply Code</button>
            </div>
            <div className={[BagStyle.discoundapplied, "d-flex","discoundapplied"].join(" ")}>
                <span className={BagStyle.discoundtitle}>
                  <strong>Discount</strong>
                </span>
                <span >
                  - $15.00
                </span>
              </div>
          </div>
          </div>
          <div className={[BagStyle.subtotaldata, "subtotaldata"].join(" ")}>
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
            <a className={BagStyle.Checkout} onClick={(e) => apply(e)} href="#">
              Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default YourBag
