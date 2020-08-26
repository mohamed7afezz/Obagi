import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import orderHistoryRowStyles from '../assets/scss/components/order-history-row.module.scss'

const OrderHistoryRow = ({ node }) => {

    return (
        <div>
            <div className={["d-lg-none", orderHistoryRowStyles.orderWrapper].join(" ")}>
                <div className={orderHistoryRowStyles.tableHeader}>
                    <div>Order#</div>
                    <div>OB1097263894</div>
                </div>


                <div className={orderHistoryRowStyles.rowsWrapper}>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Placed on:</div>
                        <div>Jul 29, 2020</div>
                    </div>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Last updates:</div>
                        <div>Jul 29, 2020</div>
                    </div>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Items:</div>
                        <div>1</div>
                    </div>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Total:</div>
                        <div>$24.00</div>
                    </div>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Status:</div>
                        <div className={orderHistoryRowStyles.status}>In-Progress</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryRow