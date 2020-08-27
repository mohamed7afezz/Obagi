import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import orderHistoryStyles from '../assets/scss/components/order-history.module.scss'
import OrderHistoryRow from "./order-history-row"
import Paginator from './paginator'

const OrderHistory = ({ node }) => {

    return (
        <div>
            <div className="d-lg-none">
                <div className={orderHistoryStyles.ordersCount}>45 Orders</div>
                <OrderHistoryRow />
            </div>

            <div className={["d-none d-lg-block"].join(" ")}>
                <table className={orderHistoryStyles.table}>
                    <thead className={orderHistoryStyles.tHead}>
                        <tr>
                            <th scope="col">Order#</th>
                            <th scope="col">Placed on</th>
                            <th scope="col">Last updated</th>
                            <th scope="col">Items</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <OrderHistoryRow />
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default OrderHistory