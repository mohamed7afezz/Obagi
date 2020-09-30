import React, { useEffect, useState, useContext } from "react"
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import Img from 'gatsby-image'
import orderDetailsStyles from '../assets/scss/components/order-details.module.scss'
import UserContext from "../providers/user-provider"
import { useLocation } from "@reach/router"
import CartContext from "../providers/cart-provider"
import $ from 'jquery'
// const $ = require('jQuery');



const baseUrl = process.env.Base_URL;

const OrderDetails = (props, { node }) => {

    const value = useContext(CartContext)
    const addToCart = value && value.addToCart
    const addingToCart = value && value.state.addingToCart



    const [details, setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function getDetails() {

        // setIsLoading(true);
        const detailsData = await (await fetch(`${baseUrl}bigcommerce/v1/customer_orders/${props.id}`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })).json();

        if (detailsData !== "User not login.") {
            setDetails(detailsData);
        }

        // setIsLoading(false);
        
    }

    const [products, setProducts] = useState([]);




    async function getProducts() {


        setIsLoading(true);
        const productsData = await (await fetch(`${baseUrl}bigcommerce/v1/customer_orders/${props.id}/products`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })).json();

        if (productsData !== "User not login.") {
            setProducts(productsData);
        }

        setIsLoading(false);
        
    }



    const [shippingAddresses, setShippingAddresses] = useState([]);

    async function getShippingAddresses() {


        // setIsLoading(true);
        const shippingAddressesData = await (await fetch(`${baseUrl}bigcommerce/v1/customer_orders/${props.id}/shipping_addresses`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })).json();

        if (shippingAddressesData !== "User not login.") {
            setShippingAddresses(shippingAddressesData);
        }

        // setIsLoading(false);
        
    }





    useEffect(() => {
        getDetails();
        getProducts();
        getShippingAddresses();
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

    const location = useLocation();
    const { user } = useContext(UserContext);

    if (!user && location.pathname.includes(`/my-account/orders/order-details`)) {
        if (typeof window !== 'undefined') {
            navigate("/my-account/signin")
        }

        return null
    }
    


    const placedOnDate = new Date(details.date_created ? details.date_created : "")
        .toLocaleDateString({},
            { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
        ).split(' ')



    let productId = products.map((item) => {
        return (
            item.product_id
        )
    })

    let elementId;

    
    return (
        <>

            <div className={["container-fluid", orderDetailsStyles.orderDetailsWrapper].join(" ")}>
                <div className="row">
                    <div className="col-12 col-lg-10 offset-lg-1">
                        <div className={orderDetailsStyles.headerWrapper}>
                            <div className={orderDetailsStyles.heading}>Order</div>
                            <Link to="/my-account" className={orderDetailsStyles.accountLink}>My Account</Link>
                            <Link to="/my-account/orders" className={["d-none d-lg-block", orderDetailsStyles.orderArrow].join(" ")}></Link>
                        </div>
                        <div className={orderDetailsStyles.orderNumber}>{details.id ? "#" + details.id : ""}</div>
                    </div>
                </div>
                <div className="row">

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
                                    <div>Loading...</div>
                                    :
                                    (products.map((item, index) => {


                                        return (
                                            <div className={orderDetailsStyles.productWrapper}>
                                                <form>
                                                    <div class="form-check">
                                                        <input class="form-check-input details-check" type="checkbox" value={productId[index]} id={"productCheck" + productId[index] + index} />
                                                    </div>
                                                </form>
                                                {item.images.data.map((item, index) => {
                                                    return (
                                                        <img src={item.url_tiny} />
                                                    )
                                                })}
                                                <div className={orderDetailsStyles.productInfoWrapper}>
                                                    <div className={orderDetailsStyles.productName}>{item.name ? item.name : ""}</div>
                                                    <div className={orderDetailsStyles.priceAndQuantity}>
                                                        <div className={orderDetailsStyles.productQuantity}>Qty. {item.quantity ? item.quantity : ""}</div>
                                                        <div className={orderDetailsStyles.productPrice}>{item.total_inc_tax ? "$" + item.total_inc_tax : ""}</div>
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
                            <div>Loading...</div>
                            :
                            (products.map((item, index) => {
                                return (
                                    <div className={orderDetailsStyles.productWrapper}>
                                        <div className={orderDetailsStyles.productInfoWrapper}>
                                            <div className={orderDetailsStyles.productName}>
                                                <form>
                                                    <div class="form-check">
                                                        <input class="form-check-input desk-details-check" type="checkbox" value={productId[index]} id={"productCheck" + productId[index]} />
                                                    </div>
                                                </form>
                                                <div className={orderDetailsStyles.productImage}>
                                                    {item.images.data.map((item, index) => {
                                                        return (
                                                            <img src={item.url_tiny} />
                                                        )
                                                    })[0]}
                                                </div>
                                                {item.name ? item.name : ""}
                                            </div>
                                            <div className={orderDetailsStyles.productQuantity}>
                                                {item.quantity ? "Qty. " + item.quantity : ""}
                                            </div>
                                            <div className={orderDetailsStyles.productPrice}>
                                                {item.total_inc_tax ? "$" + item.total_inc_tax : ""}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))
                        }


                    </div>

                    <div className="col-12 col-lg-3">
                        {isLoading ?
                            ""
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
                                    <p>{placedOnDate ? `${placedOnDate[1]} ${placedOnDate[0]}, ${placedOnDate[2]}` : ""}</p>
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
                                    <div className={orderDetailsStyles.totalPrice}>{details.total_inc_tax ? "$" + details.total_inc_tax : ""}</div>
                                </div>

                                <div className={[orderDetailsStyles.orderButtonSection, "d-lg-none"].join(" ")}>
                                    <button type="button" id="mob-reorder-button" className={orderDetailsStyles.orderButton}
                                        onClick={() => {
                                            let flag = true;

                                            // 1 - loop on all checked boxes
                                            document.querySelectorAll('.details-check').forEach((el) => {
                                                // 2 - check if it's select then => get product id

                                                if (el.checked) {
                                                    // 3 - send cart request
                                                    
                                                    addToCart(el.value, false, 1);
                                                    
                                                    // console.log("value", el.value)
                                                    flag = false;

                                                }
                                                


                                            })
                                            

                                            if (flag && typeof $ !== "undefined") {
                                                $("#checkModal").modal("show");
                                            
                                            }
                                        }}
                                    // disabled={addingToCart === productId}
                                    >Re-order</button>
                                </div>

                                <div className={[orderDetailsStyles.orderButtonSection, "d-none d-lg-block"].join(" ")}>
                                    <button type="button" id="reorder-button" className={orderDetailsStyles.orderButton}
                                        onClick={() => {
                                            let flag = true;
                                            // 1 - loop on all checked boxes
                                            document.querySelectorAll('.desk-details-check').forEach((el) => {
                                                // 2 - check if it's select then => get product id

                                                if (el.checked) {
                                                    // 3 - send cart request
                                                    
                                                    addToCart(el.value, false, 1);
                                                    
                                                    // console.log("value", el.value)
                                                    flag = false;
                                                    elementId = el.value;
                                                }
                                                


                                            })
                                            

                                            if (flag && typeof $ !== "undefined") {
                                                $("#checkModal").modal("show");
                                            }
                                        }}
                                    // disabled={addingToCart === elementId}
                                    >Re-order</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>


            </div>

            <div class="modal fade" id="checkModal" tabindex="-1" role="dialog" aria-labelledby="checkModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                        Please select one or more items to reorder
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetails