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
              <div class='hide-desk col-4'>
              
                  <Img
                    className={BagStyle.prodThumb}
                    fluid={data.prouduct.childImageSharp.fluid}
                  />
                
              </div>
              <div  className={["row", "alignFlex",'col-lg-12'].join(" ")}>
                <div className={["col-md-2",'hide-tabmob'].join(' ')}>
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
                <div className={"col-md-2"}>
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
                <div className={"col-md-1"}>
                  <p
                    className={[
                      BagStyle.bagProudctPrice,
                      "bagProudctPrice",
                    ].join(" ")}
                  >
                    $24.00
                  </p>
                </div>
                <div className={"col-md-1"}>
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
          <div className={["bagDataContent", BagStyle.content].join(" ")}>
            <p className={[BagStyle.Subtotal, "d-flex"].join(" ")}>
              <span className={BagStyle.bagtitles}>
                <strong>Subtotal</strong>
              </span>{" "}
              <span>$24.00</span>
            </p>
            <p className={[BagStyle.Shipping, "d-flex"].join(" ")}>
              <span className={BagStyle.bagtitles}>
                <strong>Est. Shipping</strong>
              </span>
              <span span>
                <button className={["btn", BagStyle.Shippingbtn].join(" ")}>
                  Add Info
                </button>
              </span>
            </p>
            <p className={[BagStyle.Coupon, "d-flex"].join(" ")}>
              <span className={BagStyle.bagtitles}>
                <strong>Coupon Code</strong>
              </span>
              <span span>
                <button className={["btn", BagStyle.Couponbtn].join(" ")}>
                  Add Coupon
                </button>
              </span>
            </p>
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
            <a className={BagStyle.Checkout} href="#">
              Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default YourBag
