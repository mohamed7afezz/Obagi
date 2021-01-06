import React, { useEffect, useState, useContext } from "react"
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import orderDetailsStyles from "../../assets/scss/components/order-details.module.scss"
import UserContext from "../../providers/user-provider"
import { useLocation } from "@reach/router"
import CartContext from "../../providers/cart-provider"
import orderHistoryStyles from "../../assets/scss/components/order-history.module.scss"
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { checkStock } from '../../assets/js/stock';
import $ from "jquery"
import Customer from "../customer-care"
// const $ = require('jQuery');

const baseUrl = process.env.Base_URL;
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
var savearr = [];
var saveprodarr = [];
var productsPremierPoints = [];
const OrderStatusDetails = (props) => {
    console.log("hassan4",props)
    useEffect(() => {
      checkStock(baseUrl);
    
})
  var productsOid = [];
  var total = 0;
    let detailorder =props.RequestData.main_order;
    let shipmedntorder = props.RequestData.shipments;
    let productorder = props.RequestData.products;
    let adressesorder =props.RequestData.shipping_addresses;
  const value = useContext(CartContext)
  const addToCart = value && value.addToCart
  const addMultiToCart = value && value.addMultiToCart;
  const addingToCart = value && value.state.addingToCart;

  const [isLoading, setIsLoading] = useState(false)
  const [saveprod, setprod] = useState({})
  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  const data = useStaticQuery(graphql`
    query {
      product: file(relativePath: { eq: "117x92.png" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const location = useLocation()
  const { user } = useContext(UserContext)
  let getallcheck = () => {
    saveprodarr = [];
    productsPremierPoints = [];
    document
      .querySelectorAll(".desk-details-check.order-check")
      .forEach((el, index) => {
        if (el.checked) {
          saveprodarr.push(el.value)
          productsPremierPoints.push(
            {
              productId: el.value,
              premierId: el.getAttribute('premid'),
              premierPoints: el.getAttribute('prempoints')
            });
        }
      })
  }
  if (!user && location.pathname.includes(`/my-account/orders/order-details`)) {
    if (typeof window !== "undefined") {
      navigate("/my-account/signin")
    }

    return null
  }
 
  
  const placedOnDate = new Date(
    detailorder.date_created ? detailorder.date_created : ""
  )
    .toLocaleDateString(
      {},
      { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
    )
    .split(" ")

  let productId = productorder.map(item => {
    return item.product_id
  })

  let elementId = productorder.map(item => {

    return item.product_options[0] ? item.product_options[0].product_option_id : ""
  })
  let elementPoints = productorder.map(item => {

    return item.product_options[0] ? item.product_options[0].value : ""
  })
  return (
    <>
    <Customer activeTab="order-status">
              <div
        className={[
          "container-fluid order-details",
          orderDetailsStyles.orderDetailsWrapper,
        ].join(" ")}
      >
        <div className="row">
          <div className="col-12">
            <div className={orderDetailsStyles.headerWrapper}>
              <div className={orderDetailsStyles.heading}>Order</div>
              <Link to="/my-account/orders" className={orderDetailsStyles.accountLink}>
                My Account
              </Link>
              
            </div>
            <div className={orderDetailsStyles.orderNumber}>
              {detailorder.id ? "#" + detailorder.id : ""}
            </div>
          </div>
        </div>

        <div className="row">
          {shipmedntorder ? <>
            <div class="col-lg-9 ">
              <div className={orderDetailsStyles.shipmentsplit}>
                <p>
                  Your order has been split into {shipmedntorder.length} shipments. The details and
                status are listed below.
              </p>
              </div>


              {isLoading ? (

                <ClipLoader
                  css={spinner}
                  size={150}
                  color={"#123abc"}

                />
              ) : (

                shipmedntorder ? shipmedntorder.map((getshipm, index1) => {
                    return (productorder ? productorder.map((item, index) => {

                      { total = parseFloat(total).toFixed(2) + parseFloat(item.total_inc_taxtotal).toFixed(2) }
                      return (getshipm.items.map((getProdId, index2) => {

                        return (
                           
                          getProdId.product_id === item.product_id ?
                            <div className={orderDetailsStyles.shipmentstate}>
                              {index2 < 1 ?
                                <>
                                
                                  <div className={orderDetailsStyles.shipment}>
                                    <p>Shipment #{index + 1} : {getshipm.tracking_number}</p>
                                  </div>
                                  <table className={orderHistoryStyles.tableCon}>
                                    <thead className={orderHistoryStyles.tHead}>
                                      <tr>
                                        <th scope="col">Last Updated</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Status</th>
                                      </tr>
                                    </thead>
                                  </table>

                                </>
                                : ""
                              }
                              <div className="col-12  d-lg-none">
                                <div>
                                  <div className={orderDetailsStyles.productWrapper}>
                                    {/* <form>
                                             <div class="form-check">
                                                 <input class="form-check-input details-check" type="checkbox" value={productId[index]} id={"productCheck" + productId[index] + index} />
                                             </div>
                                         </form> */}
                                    {
                                      item.images.data.map((item, index) => {
                                        return <img alt="img" class="img-mob" src={item.url_thumbnail} />
                                      })[0]
                                    }
                                    <div
                                      className={orderDetailsStyles.productInfoWrapper}
                                    >
                                      <div className={orderDetailsStyles.productName}>
                                        {item.name ? <span dangerouslySetInnerHTML={{ __html: item.name }}></span> : ""}
                                      </div>
                                      <div
                                        className={orderDetailsStyles.priceAndQuantity}
                                      >
                                        <div
                                          className={orderDetailsStyles.productQuantity}
                                        >
                                          Qty. {item.quantity ? item.quantity : ""}
                                        </div>
                                        
                                        <div className={orderDetailsStyles.productPrice}>
                                          {item.total_inc_tax
                                            ? "$" + parseFloat(item.total_inc_tax).toFixed(2)
                                            : ""}
                                        </div>
                                        
                                        <div className={orderDetailsStyles.productstatus}>
                                        {item.status}
                                      </div>
                                         
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                              <div className="d-none d-lg-block">

                                <div className={orderDetailsStyles.productWrapper}>
                                  <div className={orderDetailsStyles.productInfoWrapper}>
                                    <div className={orderDetailsStyles.productName}>
                                      <form>
                                        <div class="form-check">
                                          {/* <input class="form-check-input desk-details-check order-check" type="checkbox" value={productId[index]} id={"productCheck" + productId[index]} />
                                   */}
                                        </div>
                                      </form>
                                      <div className={orderDetailsStyles.productImage}>
                                        {
                                          item.images.data.map((item, index) => {
                                            return <img alt="img" src={item.url_thumbnail} />
                                          })[0]
                                        }
                                      </div>
                                      {item.name ? <span dangerouslySetInnerHTML={{ __html: item.name }}></span> : ""}
                                    </div>
                                    <div className={orderDetailsStyles.productQuantity}>
                                      {item.quantity ? "Qty. " + item.quantity : ""}
                                    </div>
                                    <div className={orderDetailsStyles.productPrice}>
                                      {item.total_inc_tax ? "$" + parseFloat(item.total_inc_tax).toFixed(2) : ""}
                                    </div>
                                  
                                   
                                        <div className={orderDetailsStyles.productstatus}>
                                        {detailorder.status}
                                      </div>
                                   
                                   
                                  </div>
                                </div>



                              </div>

                            </div>
                            : "")
                      })
                      )


                    }) : "")

                  })
                    : "")}



            </div>

            <div className="col-12 col-lg-3">
              {isLoading ? (

                <ClipLoader
                  css={spinner}
                  size={150}
                  color={"#123abc"}

                />
              ) : (
                  <div className={orderDetailsStyles.orderWrapper}>
                    <div className={orderDetailsStyles.detailsHeader}>
                      <div className={orderDetailsStyles.detailsTitle}>
                        Order Details
                  </div>
                    
                    </div>

                    <div className={orderDetailsStyles.detailPart}>
                      <p className={orderDetailsStyles.informdetail}>Status</p>
                      <p>{detailorder.status ? detailorder.status : ""}</p>
                    </div>

                    <div className={orderDetailsStyles.detailPart}>
                      <p className={orderDetailsStyles.informdetail}>
                        Order Placed
                  </p>
                      <p>
                        {placedOnDate
                          ? `${placedOnDate[0]} ${placedOnDate[1]} ${placedOnDate[2]}`
                          : ""}
                      </p>
                    </div>

                    {adressesorder.map((item, index) => {
                      return (
                        <div className={orderDetailsStyles.detailPart}>
                          <p className={orderDetailsStyles.informdetail}>
                            Shipping Address
                      </p>
                          <p>
                            {item.first_name ? item.first_name : ""}{" "}
                            {item.last_name ? item.last_name : ""}
                          </p>
                          <p>{item.street_1 ? item.street_1 : ""}</p>
                          <p>
                            {item.city ? item.city : ""},{" "}
                            {item.state ? item.state : ""}{" "}
                            {item.zip ? item.zip : ""}
                          </p>
                          <p>{item.country_iso2 ? item.country_iso2 : ""}</p>
                        </div>
                      )
                    })}

                    <div className={orderDetailsStyles.detailPart}>
                      <p className={orderDetailsStyles.informdetail}>
                        Billing Address
                  </p>
                      <p>
                        {detailorder.billing_address
                          ? detailorder.billing_address.first_name
                          : ""}{" "}
                        {detailorder.billing_address
                          ? detailorder.billing_address.last_name
                          : ""}
                      </p>
                      <p>
                        {detailorder.billing_address
                          ? detailorder.billing_address.street_1
                          : ""}
                      </p>
                      <p>
                        {detailorder.billing_address
                          ? detailorder.billing_address.city
                          : ""},{" "}
                        {detailorder.billing_address
                          ? detailorder.billing_address.state
                          : ""}
                        {" "}
                        {detailorder.billing_address ? detailorder.billing_address.zip : ""}
                      </p>
                      <p>
                        {detailorder.billing_address
                          ? detailorder.billing_address.country_iso2
                          : ""}
                      </p>
                    </div>

                    <div className={orderDetailsStyles.detailPart}>
                      <p className={orderDetailsStyles.informdetail}>Payment</p>
                      <p>
                        {detailorder.payment_method ? detailorder.payment_method : ""}:
                    ending in 7320
                  </p>
                    </div>

                    <div className={orderDetailsStyles.totalWrapper}>
                      <div>Order Total</div>
                      <div className={orderDetailsStyles.totalPrice}>
                        {detailorder.total_inc_tax ? "$" + parseFloat(detailorder.total_inc_tax).toFixed(2) : ""}
                      </div>
                    </div>

                    <div
                      className={[
                        orderDetailsStyles.orderButtonSection,
                        "d-lg-none",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        id="mob-reorder-button"
                        className={orderDetailsStyles.orderButton}
                        onClick={() => {
                          productsOid = saveprodarr; let quantity = 1;
                          savearr = productsPremierPoints
                          addMultiToCart(productsOid, false, quantity, detailorder.total_inc_tax, savearr);
                        }}
                        disabled={arraysEqual(addingToCart, productsOid)}
                      // disabled={addingToCart === productId}
                      >
                        {arraysEqual(addingToCart, productsOid) ? "Re-ordering" : "Re-order"}
                      </button>
                    </div>

                    <div
                      className={[
                        orderDetailsStyles.orderButtonSection,
                        "d-none d-lg-block",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        id="reorder-button"

                        className={orderDetailsStyles.orderButton}
                        onClick={() => {
                          productsOid = saveprodarr; let quantity = 1;
                          savearr = productsPremierPoints
                          addMultiToCart(productsOid, false, quantity, detailorder.total_inc_tax, savearr);
                        }}
                        disabled={arraysEqual(addingToCart, productsOid)}
                      // disabled={addingToCart === elementId}
                      >
                        {arraysEqual(addingToCart, productsOid) ? "Re-ordering" : "Re-order"}
                      </button>
                    </div>
                  </div>
                )}
            </div>


          </> :
            <>
              <div className="col-12  d-lg-none">
                <div className={orderDetailsStyles.accordion}>
                  <div className={orderDetailsStyles.accordionHeader}>
                    <div className={orderDetailsStyles.itemsCount}>{productorder ? (productorder.length > 1 ? productorder.length + " Items" : productorder.length + " Item") : ""}</div>
                    <button className={orderDetailsStyles.accordionButton} type="button" data-toggle="collapse" data-target="#detailsAccordion" aria-expanded="false" aria-controls="detailsAccordion">
                      View Details
            </button>
                  </div>

                  <div className="collapse" id="detailsAccordion">

                    {isLoading ?

                      <ClipLoader
                        css={spinner}
                        size={150}
                        color={"#123abc"}

                      />
                      :
                      (productorder.map((item, index) => {

                        { total = parseFloat(total).toFixed(2) + parseFloat(item.total_inc_taxtotal).toFixed(2) }
                        return (
                          <div className={orderDetailsStyles.productWrapper}>
                            <form>
                              <div class="form-check">
                                <label className="terms">
                                  {/* <input data-Sku={item.sku} class="form-check-input details-check" type="checkbox" onChange={getallcheck} value={productId[index]} id={"productCheck" + productId[index] + index} /> */}
                                  <input type="checkbox" data-Sku={item.sku} onChange={getallcheck} className="form-check-input details-check" value={productId[index]} id={"productCheck" + productId[index] + index} />
                                  <span className="checkmark"></span>

                                </label>
                              </div>
                            </form>
                            {/* {item.images.data.map((item, index) => {
                              return ( */}
                                <img alt="img" src={item.images.data[0].url_thumbnail} />
                              {/* )
                            })} */}
                            <div className={orderDetailsStyles.productInfoWrapper}>
                              <div className={orderDetailsStyles.productName}>{item.name ? <span dangerouslySetInnerHTML={{ __html: item.name }}></span> : ""}</div>
                              <div className={orderDetailsStyles.priceAndQuantity}>
                                <div className={orderDetailsStyles.productQuantity}>Qty. {item.quantity ? item.quantity : ""}</div>
                                <div className={orderDetailsStyles.productPrice}>{item.total_inc_tax ? "$" + parseFloat(item.total_inc_tax).toFixed(2) : ""}</div>
                               
                                        <div className={orderDetailsStyles.productstatus}>
                                        {item.status}
                                      </div>
                              </div>
                            </div>
                          </div>
                        )
                      }))
                    }

                  </div>
                </div>
              </div>



              <div className="col-lg-9 d-none d-lg-block">

                {isLoading ?

                  <ClipLoader
                    css={spinner}
                    size={150}
                    color={"#123abc"}

                  />
                  :
                  (productorder.map((item, index) => {
                    return (
                      <div className={orderDetailsStyles.productWrapper}>
                        <div className={orderDetailsStyles.productInfoWrapper}>
                          <div className={orderDetailsStyles.productName}>
                            <form>
                              <div class="form-check">
                                <label className="terms">
                                  {/* <input data-Sku={item.sku} class="form-check-input desk-details-check order-check" type="checkbox" premid={elementId[index]} prempoints={elementPoints[index]} onChange={getallcheck} value={productId[index]} id={"productCheck" + productId[index]} /> */}
                                  <input type="checkbox" data-Sku={item.sku} className="form-check-input desk-details-check remove-none order-check" premid={elementId[index]} prempoints={elementPoints[index]} onChange={getallcheck} value={productId[index]} id={"productCheck" + productId[index]} />
                                  <span className="checkmark"></span>

                                </label>
                              </div>
                            </form>
                            <div className={orderDetailsStyles.productImage}>
                              {item.images.data.map((item, index) => {
                                return (
                                  <img alt="img" src={item.url_thumbnail} />
                                )
                              })[0]}
                            </div>
                            {item.name ? <span dangerouslySetInnerHTML={{ __html: item.name }}></span> : ""}
                          </div>
                          <div className={orderDetailsStyles.productQuantity}>
                            {item.quantity ? "Qty. " + item.quantity : ""}
                          </div>
                          <div className={orderDetailsStyles.productPrice}>
                            {item.total_inc_tax ? "$" + parseFloat(item.total_inc_tax).toFixed(2) : ""}
                          </div>
                       
                          <div className={orderDetailsStyles.productstatus}>{detailorder.custom_status}</div> 
                                
                              
                        </div>
                      </div>
                    )
                  }))
                }


              </div>

              <div className="col-12 col-lg-3">
                {isLoading ?

                  <ClipLoader
                    css={spinner}
                    size={150}
                    color={"#123abc"}

                  />
                  :
                  <div className={orderDetailsStyles.orderWrapper}>
                    <div className={orderDetailsStyles.detailsHeader}>
                      <div className={orderDetailsStyles.detailsTitle}>Order Details</div>
                    </div>

                    <div className={orderDetailsStyles.detailPart}>
                      <p>Status</p>
                      <p>{detailorder.status ? detailorder.status : ""}</p>
                    </div>

                    <div className={orderDetailsStyles.detailPart}>
                      <p>Order Placed</p>
                      <p>{placedOnDate ? `${placedOnDate[0]} ${placedOnDate[1]} ${placedOnDate[2]}` : ""}</p>
                    </div>

                    {adressesorder.map((item, index) => {
                      return (
                        <div className={orderDetailsStyles.detailPart}>
                          <p>Shipping Address</p>
                          <p>{item.first_name ? item.first_name : ""} {item.last_name ? item.last_name : ""}</p>
                          <p>{item.street_1 ? item.street_1 : ""}</p>
                          <p>{item.city ? item.city : ""} {item.state ? item.state : ""}, {item.zip ? item.zip : ""}</p>
                          <p>{item.country_iso2 ? item.country_iso2 : ""}</p>
                        </div>
                      )
                    })}

                    <div className={orderDetailsStyles.detailPart}>
                      <p>Billing Address</p>
                      <p>{detailorder.billing_address ? detailorder.billing_address.first_name : ""} {detailorder.billing_address ? detailorder.billing_address.last_name : ""}</p>
                      <p>{detailorder.billing_address ? detailorder.billing_address.street_1 : ""}</p>
                      <p>{detailorder.billing_address ? detailorder.billing_address.city : ""} {detailorder.billing_address ? detailorder.billing_address.state : ""}, {detailorder.billing_address ? detailorder.billing_address.zip : ""}</p>
                      <p>{detailorder.billing_address ? detailorder.billing_address.country_iso2 : ""}</p>
                    </div>

                    <div className={orderDetailsStyles.detailPart}>
                      <p>Payment</p>
                      <p>{detailorder.payment_method ? detailorder.payment_method : ""}: ending in 7320</p>
                    </div>

                    {/* <div className={orderDetailsStyles.detailPart}>
                      <p>Actions</p>
                      <p className={orderDetailsStyles.warning}>Payment method has failed. Please call (800) 345-6789 to complete your order.</p>
                    </div> */}


                    <div className={orderDetailsStyles.totalWrapper}>
                      <div>Order Total</div>
                      <div className={orderDetailsStyles.totalPrice}>{detailorder.total_inc_tax ? "$" + parseFloat(detailorder.total_inc_tax).toFixed(2) : ""}</div>
                    </div>

                    <div className={[orderDetailsStyles.orderButtonSection, "d-lg-none"].join(" ")}>
                      <button type="button" id="mob-reorder-button" className={orderDetailsStyles.orderButton}
                        onClick={() => {
                          productsOid = saveprodarr; let quantity = 1;
                          savearr = productsPremierPoints
                          addMultiToCart(productsOid, false, quantity, total, savearr);
                        }}
                        disabled={arraysEqual(addingToCart, productsOid)}
                      // disabled={addingToCart === productId}
                      >{arraysEqual(addingToCart, productsOid) ? "Re-ordering" : "Re-order"}</button>
                    </div>

                    <div className={[orderDetailsStyles.orderButtonSection, "d-none d-lg-block"].join(" ")}>
                      <button type="button" id="reorder-button" className={orderDetailsStyles.orderButton}
                        onClick={() => {
                          productsOid = saveprodarr; let quantity = 1;
                          savearr = productsPremierPoints
                          // console.log(saveprodarr, "hassan33")
                          addMultiToCart(productsOid, false, quantity, detailorder.total_inc_tax, savearr);
                        }}
                        disabled={arraysEqual(addingToCart, productsOid)}
                      // disabled={addingToCart === elementId}
                      >{arraysEqual(addingToCart, productsOid) ? "Re-ordering" : "Re-order"}</button>
                    </div>
                  </div>
                }
              </div>

            </>
          }


        </div>
      </div>

      <div
        class="modal fade"
        id="checkModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="checkModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Please select one or more items to reorder
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      </Customer>

    </>
  )
}

export default OrderStatusDetails
