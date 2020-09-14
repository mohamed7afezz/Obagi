import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import orderDetailsStyles from '../assets/scss/components/order-details.module.scss'

const OrderDetails = ({ node }) => {

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
                        <div className={orderDetailsStyles.orderNumber}>#OB1097263894</div>
                    </div>
                </div>
                <div className="row">

                    <div className="col-12  d-lg-none">
                        <div className={orderDetailsStyles.accordion}>
                            <div className={orderDetailsStyles.accordionHeader}>
                                <div className={orderDetailsStyles.itemsCount}>2 Items</div>
                                <button className={orderDetailsStyles.accordionButton} type="button" data-toggle="collapse" data-target="#detailsAccordion" aria-expanded="false" aria-controls="detailsAccordion">
                                    View Details
                                </button>
                            </div>

                            <div className="collapse" id="detailsAccordion">

                                <div className={orderDetailsStyles.productWrapper}>
                                    <Img fixed={data.product.childImageSharp.fixed}/>
                                    <div className={orderDetailsStyles.productInfoWrapper}>
                                        <div className={orderDetailsStyles.productName}>Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum Dolor Sit Amet Consectetur</div>
                                        <div className={orderDetailsStyles.priceAndQuantity}>
                                            <div className={orderDetailsStyles.productQuantity}>Qty. 1</div>
                                            <div className={orderDetailsStyles.productPrice}>$24.00</div>
                                        </div>
                                    </div>
                                </div>

                                <div className={orderDetailsStyles.productWrapper}>
                                    <Img fixed={data.product.childImageSharp.fixed}/>
                                    <div className={orderDetailsStyles.productInfoWrapper}>
                                        <div className={orderDetailsStyles.productName}>Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum Dolor Sit Amet Consectetur</div>
                                        <div className={orderDetailsStyles.priceAndQuantity}>
                                            <div className={orderDetailsStyles.productQuantity}>Qty. 1</div>
                                            <div className={orderDetailsStyles.productPrice}>$24.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-lg-7 offset-lg-1 d-none d-lg-block">
                        <div className={orderDetailsStyles.productWrapper}>
                            <div className={orderDetailsStyles.productInfoWrapper}>
                                <div className={orderDetailsStyles.productName}>
                                    <div className={orderDetailsStyles.productImage}>
                                        <Img fixed={data.product.childImageSharp.fixed} />
                                    </div>
                                    Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum Dolor Sit Amet Consectetur
                            </div>
                                <div className={orderDetailsStyles.productQuantity}>
                                    Qty. 1
                            </div>
                                <div className={orderDetailsStyles.productPrice}>
                                    $24.00
                            </div>
                            </div>
                        </div>


                        <div className={orderDetailsStyles.productWrapper}>
                            <div className={orderDetailsStyles.productInfoWrapper}>
                                <div className={orderDetailsStyles.productName}>
                                    <div className={orderDetailsStyles.productImage}>
                                        <Img fixed={data.product.childImageSharp.fixed} />
                                    </div>
                                    Obagi-C Rx System for Normal to Dry Skin Lorem Ipsum Dolor Sit Amet Consectetur
                            </div>
                                <div className={orderDetailsStyles.productQuantity}>
                                    Qty. 1
                            </div>
                                <div className={orderDetailsStyles.productPrice}>
                                    $24.00
                            </div>
                            </div>
                        </div>


                    </div>

                    <div className="col-12 col-lg-3">
                        <div className={orderDetailsStyles.orderWrapper}>
                            <div className={orderDetailsStyles.detailsHeader}>
                                <div className={orderDetailsStyles.detailsTitle}>Order Details</div>
                                <a href="#" className={orderDetailsStyles.print}>Print Invoice</a>
                            </div>

                            <div className={orderDetailsStyles.detailPart}>
                                <p>Status</p>
                                <p>In-progress</p>
                            </div>

                            <div className={orderDetailsStyles.detailPart}>
                                <p>Order Placed</p>
                                <p>Jul 27, 2020</p>
                            </div>

                            <div className={orderDetailsStyles.detailPart}>
                                <p>Shipping Address</p>
                                <p>JohnSmith</p>
                                <p>123 Doretta St</p>
                                <p>Hillsdale NJ, 07657</p>
                                <p>US</p>
                            </div>

                            <div className={orderDetailsStyles.detailPart}>
                                <p>Billing Address</p>
                                <p>JohnSmith</p>
                                <p>123 Doretta St</p>
                                <p>Hillsdale NJ, 07657</p>
                                <p>US</p>
                            </div>

                            <div className={orderDetailsStyles.detailPart}>
                                <p>Payment</p>
                                <p>Visa: ending in 7320</p>
                            </div>

                            <div className={orderDetailsStyles.detailPart}>
                                <p>Actions</p>
                                <p className={orderDetailsStyles.warning}>Payment method has failed. Please call (800) 345-6789 to complete your order.</p>
                            </div>


                            <div className={orderDetailsStyles.totalWrapper}>
                                <div>Order Total</div>
                                <div className={orderDetailsStyles.totalPrice}>$69.00</div>
                            </div>

                            <div className={orderDetailsStyles.orderButtonSection}>
                                <button type="button" className={orderDetailsStyles.orderButton}>Re-order</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default OrderDetails