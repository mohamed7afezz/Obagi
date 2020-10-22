import React, { useEffect, useState, useContext } from "react"
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import orderDetailsStyles from "../assets/scss/components/order-details.module.scss"
import UserContext from "../providers/user-provider"
import { useLocation } from "@reach/router"
import CartContext from "../providers/cart-provider"
import orderHistoryStyles from "../assets/scss/components/order-history.module.scss"
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import $ from "jquery"
// const $ = require('jQuery');

const baseUrl = process.env.Base_URL
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
 var saveprodarr = [];
const OrderDetails = (props, { node }) => {
  var productsOid = []; 
 
  const value = useContext(CartContext)
  const addToCart = value && value.addToCart
  const addMultiToCart = value && value.addMultiToCart;
  const addingToCart = value && value.state.addingToCart;
 
  const [details, setDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [getshiping, setShipment] = useState(false)
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
  async function getDetails() {
    // setIsLoading(true);
    const detailsData = await (
      await fetch(`https://dev-obagi.azurewebsites.net/api/bigcommerce/v1/customer_orders/${props.id}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      })
    ).json()

    if (detailsData !== "User not login.") {
      setDetails(detailsData)
      // console.log("detail", detailsData)
    }

    // setIsLoading(false);
  }

  const [products, setProducts] = useState([])

  async function getshipment() {
    const getshipping = await (
      await fetch(
        `https://dev-obagi.azurewebsites.net/api/bigcommerce/v1/customer_orders/${props.id}/shipments`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
        }
      )
    ).json()

    if (getshipping !== "User not login.") {
      setShipment(getshipping)
      // console.log("ship", getshipping)
    }
  }

  async function getProducts() {
    setIsLoading(true)
    const productsData = await (
      await fetch(
        `https://dev-obagi.azurewebsites.net/api/bigcommerce/v1/customer_orders/${props.id}/products`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
        }
      )
    ).json()

    if (productsData !== "User not login.") {
      setProducts(productsData)
    }

    setIsLoading(false)
  }

  const [shippingAddresses, setShippingAddresses] = useState([])

  async function getShippingAddresses() {
    // setIsLoading(true);
    const shippingAddressesData = await (
      await fetch(
        `https://dev-obagi.azurewebsites.net/api/bigcommerce/v1/customer_orders/${props.id}/shipping_addresses`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
        }
      )
    ).json()

    if (shippingAddressesData !== "User not login.") {
      setShippingAddresses(shippingAddressesData)
    }

    // setIsLoading(false);
  }

  useEffect(() => {
    getDetails()
    getProducts()
    getshipment()
    getShippingAddresses()
  }, [])

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
let getallcheck =()=>{
  document
          .querySelectorAll(".desk-details-check")
          .forEach(el => {
            if (el.checked && !saveprodarr.includes(el.value)) {
              // 3 - send cart request
              console.log(productsOid)
              saveprodarr.push(el.value)
              // console.log("value", el.value)
              
            }
          })
          // console.log(document.querySelectorAll(".details-check"))
}
  if (!user && location.pathname.includes(`/my-account/orders/order-details`)) {
    if (typeof window !== "undefined") {
      navigate("/my-account/signin")
    }

    return null
  }

  const placedOnDate = new Date(
    details.date_created ? details.date_created : ""
  )
    .toLocaleDateString(
      {},
      { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
    )
    .split(" ")

  let productId = products.map(item => {
    return item.product_id
  })

  let elementId

  return (
    <>
      {/* {console.log("bahiiii", getshiping)} */}
      <div
        className={[
          "container-fluid",
          orderDetailsStyles.orderDetailsWrapper,
        ].join(" ")}
      >
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-1">
            <div className={orderDetailsStyles.headerWrapper}>
              <div className={orderDetailsStyles.heading}>Order</div>
              <Link to="/my-account/orders" className={orderDetailsStyles.accountLink}>
                My Account
              </Link>
              <Link
                to="/my-account/orders"
                className={[
                  "d-none d-lg-block",
                  orderDetailsStyles.orderArrow,
                ].join(" ")}
              ></Link>
            </div>
            <div className={orderDetailsStyles.orderNumber}>
              {details.id ? "#" + details.id : ""}
            </div>
          </div>
        </div>

        <div className="row">
            {getshiping ?   <>
          <div class="col-lg-7 offset-lg-1">
            <div className={orderDetailsStyles.shipmentsplit}>
              <p>
                Your order has been split into {getshiping.length} shipments. The details and
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
                    
                    getshiping? getshiping.map((getshipm, index1) => {
                   return(   products? products.map((item,index)=>{

                    return(  getshipm.items.map((getProdId,index2) =>{
                        
                       return(
                        getProdId.product_id === item.product_id?
                            <div className={orderDetailsStyles.shipmentstate}>
                              {index2 < 1?  
                              <>
                                 <div className={orderDetailsStyles.shipment}>
                              <p>Shipment #{index+1} : {getshipm.tracking_number}</p>
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
                                :""
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
                                return <img class="img-mob" src={item.url_tiny} />
                              })[0]
                            }
                            <div
                              className={orderDetailsStyles.productInfoWrapper}
                            >
                              <div className={orderDetailsStyles.productName}>
                                {item.name ? <span dangerouslySetInnerHTML={{__html: item.name}}></span> : ""}
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
                                  {/* <input class="form-check-input desk-details-check" type="checkbox" value={productId[index]} id={"productCheck" + productId[index]} />
                                   */}
                                </div>
                              </form>
                              <div className={orderDetailsStyles.productImage}>
                                {
                                  item.images.data.map((item, index) => {
                                    return <img src={item.url_tiny} />
                                  })[0]
                                }
                              </div>
                              {item.name ? <span dangerouslySetInnerHTML={{__html: item.name}}></span>: ""}
                            </div>
                            <div className={orderDetailsStyles.productQuantity}>
                              {item.quantity ? "Qty. " + item.quantity : ""}
                            </div>
                            <div className={orderDetailsStyles.productPrice}>
                              {item.total_inc_tax ? "$" + parseFloat(item.total_inc_tax).toFixed(2) : ""}
                            </div>
                            <div className={orderDetailsStyles.productstatus}>
                              {item.order_status}
                            </div>
                          </div>
                        </div>
                    
                    
             
                </div>
          
                      </div>
                         :""  )    
                        })
                        )
                     

                      }):"")
                    
                    })
                 :"" )}
             

           
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
                  <a
                    href={
                      "https://gtotest.mybigcommerce.com/account.php?action=print_invoice&order_id=" +
                      props.id
                    }
                    target="_blank"
                    className={orderDetailsStyles.print}
                  >
                    Print Invoice
                  </a>
                </div>

                <div className={orderDetailsStyles.detailPart}>
                  <p className={orderDetailsStyles.informdetail}>Status</p>
                  <p>{details.status ? details.status : ""}</p>
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

                {shippingAddresses.map((item, index) => {
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
                    {details.billing_address
                      ? details.billing_address.first_name
                      : ""}{" "}
                    {details.billing_address
                      ? details.billing_address.last_name
                      : ""}
                  </p>
                  <p>
                    {details.billing_address
                      ? details.billing_address.street_1
                      : ""}
                  </p>
                  <p>
                    {details.billing_address
                      ? details.billing_address.city
                      : ""},{" "}
                    {details.billing_address
                      ? details.billing_address.state
                      : ""}
                    {" "}
                    {details.billing_address ? details.billing_address.zip : ""}
                  </p>
                  <p>
                    {details.billing_address
                      ? details.billing_address.country_iso2
                      : ""}
                  </p>
                </div>

                <div className={orderDetailsStyles.detailPart}>
                  <p className={orderDetailsStyles.informdetail}>Payment</p>
                  <p>
                    {details.payment_method ? details.payment_method : ""}:
                    ending in 7320
                  </p>
                </div>

                <div className={orderDetailsStyles.totalWrapper}>
                  <div>Order Total</div>
                  <div className={orderDetailsStyles.totalPrice}>
                    {details.total_inc_tax ? "$" + parseFloat(details.total_inc_tax).toFixed(2) : ""}
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
                      productsOid= saveprodarr;let quantity = 1;
                      console.log(saveprodarr,"hassan")
                      addMultiToCart(productsOid, false, quantity);
                  }}
                  disabled={arraysEqual(addingToCart,productsOid)}
                    // disabled={addingToCart === productId}
                  >
                    {arraysEqual(addingToCart,productsOid) ? "Re-ordering" : "Re-order"}
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
                      productsOid= saveprodarr;let quantity = 1;
                      console.log(saveprodarr,"hassan")
                      addMultiToCart(productsOid, false, quantity);
                  }}
                  disabled={arraysEqual(addingToCart,productsOid)}
                    // disabled={addingToCart === elementId}
                  >
                    {arraysEqual(addingToCart,productsOid) ? "Re-ordering" : "Re-order"}
                  </button>
                </div>
              </div>
            )}
          </div>
       
       
       </>:
       <>
       <div className="col-12  d-lg-none">
    <div className={orderDetailsStyles.accordion}>
        <div className={orderDetailsStyles.accordionHeader}>
            <div className={orderDetailsStyles.itemsCount}>{products ? (products.length > 1 ? products.length + " Items" : products.length + " Item") : ""}</div>
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
                (products.map((item, index) => {


                    return (
                        <div className={orderDetailsStyles.productWrapper}>
                            <form>
                                <div class="form-check">
                                    <input class="form-check-input details-check" type="checkbox" onChange={getallcheck} value={productId[index]} id={"productCheck" + productId[index] + index} />
                                </div>
                            </form>
                            {item.images.data.map((item, index) => {
                                return (
                                    <img src={item.url_tiny} />
                                )
                            })}
                            <div className={orderDetailsStyles.productInfoWrapper}>
                                <div className={orderDetailsStyles.productName}>{item.name ? <span dangerouslySetInnerHTML={{__html: item.name}}></span> : ""}</div>
                                <div className={orderDetailsStyles.priceAndQuantity}>
                                    <div className={orderDetailsStyles.productQuantity}>Qty. {item.quantity ? item.quantity : ""}</div>
                                    <div className={orderDetailsStyles.productPrice}>{item.total_inc_tax ? "$" + parseFloat(item.total_inc_tax).toFixed(2) : ""}</div>
                                </div>
                            </div>
                        </div>
                    )
                }))
            }

        </div>
    </div>
</div>



<div className="col-lg-7 offset-lg-1 d-none d-lg-block">

    {isLoading ?
      
            <ClipLoader
        css={spinner}
          size={150}
          color={"#123abc"}
        
            />
        :
        (products.map((item, index) => {
            return (
                <div className={orderDetailsStyles.productWrapper}>
                    <div className={orderDetailsStyles.productInfoWrapper}>
                        <div className={orderDetailsStyles.productName}>
                            <form>
                                <div class="form-check">
                                    <input class="form-check-input desk-details-check" type="checkbox" onChange={getallcheck} value={productId[index]} id={"productCheck" + productId[index]} />
                                </div>
                            </form>
                            <div className={orderDetailsStyles.productImage}>
                                {item.images.data.map((item, index) => {
                                    return (
                                        <img src={item.url_tiny} />
                                    )
                                })[0]}
                            </div>
                            {item.name ? <span dangerouslySetInnerHTML={{__html: item.name}}></span> : ""}
                        </div>
                        <div className={orderDetailsStyles.productQuantity}>
                            {item.quantity ? "Qty. " + item.quantity : ""}
                        </div>
                        <div className={orderDetailsStyles.productPrice}>
                            {item.total_inc_tax ? "$" + parseFloat(item.total_inc_tax).toFixed(2) : ""}
                        </div>
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
                <a href={"https://gtotest.mybigcommerce.com/account.php?action=print_invoice&order_id=" + props.id} target="_blank" className={orderDetailsStyles.print}>Print Invoice</a>
            </div>

            <div className={orderDetailsStyles.detailPart}>
                <p>Status</p>
                <p>{details.status ? details.status : ""}</p>
            </div>

            <div className={orderDetailsStyles.detailPart}>
                <p>Order Placed</p>
                <p>{placedOnDate ? `${placedOnDate[0]} ${placedOnDate[1]} ${placedOnDate[2]}` : ""}</p>
            </div>

            {shippingAddresses.map((item, index) => {
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
                <p>{details.billing_address ? details.billing_address.first_name : ""} {details.billing_address ? details.billing_address.last_name : ""}</p>
                <p>{details.billing_address ? details.billing_address.street_1 : ""}</p>
                <p>{details.billing_address ? details.billing_address.city : ""} {details.billing_address ? details.billing_address.state : ""}, {details.billing_address ? details.billing_address.zip : ""}</p>
                <p>{details.billing_address ? details.billing_address.country_iso2 : ""}</p>
            </div>

            <div className={orderDetailsStyles.detailPart}>
                <p>Payment</p>
                <p>{details.payment_method ? details.payment_method : ""}: ending in 7320</p>
            </div>

            <div className={orderDetailsStyles.detailPart}>
                <p>Actions</p>
                <p className={orderDetailsStyles.warning}>Payment method has failed. Please call (800) 345-6789 to complete your order.</p>
            </div>


            <div className={orderDetailsStyles.totalWrapper}>
                <div>Order Total</div>
                <div className={orderDetailsStyles.totalPrice}>{details.total_inc_tax ? "$" +  parseFloat(details.total_inc_tax).toFixed(2) : ""}</div>
            </div>

            <div className={[orderDetailsStyles.orderButtonSection, "d-lg-none"].join(" ")}>
                <button type="button" id="mob-reorder-button" className={orderDetailsStyles.orderButton}
                onClick={() => {
                  productsOid= saveprodarr;let quantity = 1;
                  console.log(saveprodarr,"hassan")
                  addMultiToCart(productsOid, false, quantity);
              }}
              disabled={arraysEqual(addingToCart,productsOid)}
                // disabled={addingToCart === productId}
                >{arraysEqual(addingToCart,productsOid) ? "Re-ordering" : "Re-order"}</button>
            </div>

            <div className={[orderDetailsStyles.orderButtonSection, "d-none d-lg-block"].join(" ")}>
                <button type="button" id="reorder-button" className={orderDetailsStyles.orderButton}
               onClick={() => {
                productsOid= saveprodarr;let quantity = 1;
                console.log(saveprodarr,"hassan")
                addMultiToCart(productsOid, false, quantity);
            }}
            disabled={arraysEqual(addingToCart,productsOid)}
                // disabled={addingToCart === elementId}
                >{arraysEqual(addingToCart,productsOid) ? "Re-ordering" : "Re-order"}</button>
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
    </>
  )
}

export default OrderDetails
