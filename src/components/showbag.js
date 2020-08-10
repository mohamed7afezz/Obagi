import React from "react"
import ShowBagStyle from "../assets/scss/components/show-bag.module.scss"
import BagStyle from "../assets/scss/components/yourbag.module.scss"

import { useStaticQuery, graphql, Link } from "gatsby"
import plusicon from "../assets/images/product-images/plus1.svg"
import minusicon from "../assets/images/product-images/minus.svg"
import Img from "gatsby-image"
const Showbag = ({ node, value }) => {
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
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#Showbag"
      >
        Launch demo modal
      </button>
      <div
        class="modal fade isempty"
        id="Showbag"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ShowbagTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-data mr-0 " role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div className={["d-flex",ShowBagStyle.left,"w100"].join(" ")}>
              <div className={[ShowBagStyle.productCounter,"d-flex",ShowBagStyle.left].join(" ")}>
             <p className={ShowBagStyle.shoppingBag}> Shopping Bag (2)</p>
             <button class={ShowBagStyle.viewcart}>View Full Cart</button>
          
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
     
            </div>
            <div class="modal-body ">
            <div className={["row", ShowBagStyle.selectedproductsCard].join(" ")}>
                <div className={"col-4"}>
                  <Img
                    className={ShowBagStyle.prodThumb}
                    fluid={data.prouduct.childImageSharp.fluid}
                  />
                </div>
                <div className={["col-8", Showbag.removepadding].join(" ")}>
                  <div className={["col-12","row"].join(" ")}>
                    <p className={ShowBagStyle.BagProductDesc}>
                      Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum Dolor
                      Sit Amet Consectetur
                    </p>
                  </div>
                 
                  <div
                    className={["col-12","row", "d-flex", ShowBagStyle.left].join(
                      " "
                    )}
                  >
                     <div className={["d-flex",ShowBagStyle.left,"col-10","pl-0"].join(" ")}>
                      <div className={[BagStyle.bagCount, "d-flex","col-8"].join(" ")}>
                    <button className={["btn", BagStyle.minus].join(" ")}>
                      <img className={BagStyle.plusicon} src={minusicon} />
                    </button>{" "}
                    <p className={BagStyle.productcount}>1</p>
                    <button className={["btn", BagStyle.add].join(" ")}>
                      {" "}
                      <img className={BagStyle.plusicon} src={plusicon} />{" "}
                    </button>
                  </div>
                    <a href="#" className={[ShowBagStyle.removebtn,"col-4"].join(" ")}>Remove</a>
                    </div>
                    <p className={[ShowBagStyle.Price,"col-2"].join(" ")}>$8.00</p>
                  </div>
                </div>
            
              </div>
          <div className={ShowBagStyle.final}>
              <div className={[ShowBagStyle.total,"d-flex",ShowBagStyle.left].join(" ")}>
              <p className={ShowBagStyle.Subtotal}>Subtotal:</p>
              <p className={ShowBagStyle.Subtotal}>$24.00</p>

            </div>
            <a className={BagStyle.Checkout} href="#">
              Checkout
            </a>
            <p className={ShowBagStyle.footnote}>Shipping and taxes calculated at checkout.</p>
            </div>
          
              <div
                className={[ShowBagStyle.empatyState, "empatyState"].join(" ")}
              >
                <p
                  className={[ShowBagStyle.empatyTitle, "empatyTitle"].join(
                    " "
                  )}
                >
                  Looks like your bag is empty!
                </p>
                <Link
                  className={[ShowBagStyle.empatyLink, "empatyLink"].join(" ")}
                  href="#"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
            <div class="modal-footer">
              <div className={["row", ShowBagStyle.prouductCard].join(" ")}>
                <div className={"col-4"}>
                  <Img
                    className={ShowBagStyle.prodThumb}
                    fluid={data.prouduct.childImageSharp.fluid}
                  />
                </div>
                <div className={["col-8", Showbag.removepadding].join(" ")}>
                  <div className={"col-12"}>
                    <p className={ShowBagStyle.BagProductDesc}>
                      Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum Dolor
                      Sit Amet Consectetur
                    </p>
                  </div>
                  <div
                    className={["col-12", "d-flex", ShowBagStyle.left].join(
                      " "
                    )}
                  >
                    <p className={ShowBagStyle.Price}>$8.00</p>
                    <a className={ShowBagStyle.BagProductLink}>Add to Bag</a>
                  </div>
                </div>
              </div>
           
            <div className={["row", ShowBagStyle.prouductCard].join(" ")}>
              <div className={"col-4"}>
                <Img
                  className={ShowBagStyle.prodThumb}
                  fluid={data.prouduct.childImageSharp.fluid}
                />
              </div>
              <div className={["col-8", Showbag.removepadding].join(" ")}>
                <div className={"col-12"}>
                  <p className={ShowBagStyle.BagProductDesc}>
                    Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum Dolor
                    Sit Amet Consectetur
                  </p>
                </div>
                <div
                  className={["col-12", "d-flex", ShowBagStyle.left].join(" ")}
                >
                  <p className={ShowBagStyle.Price}>$8.00</p>
                  <a className={ShowBagStyle.BagProductLink}>Add to Bag</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
export default Showbag
