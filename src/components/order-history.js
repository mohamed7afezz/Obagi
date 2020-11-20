import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import orderHistoryStyles from '../assets/scss/components/order-history.module.scss'
import OrderHistoryRow from "./order-history-row"
import Paginator from './paginator'
import OrderNoHistory from "./order-no-history"

const baseUrl = process.env.Base_URL;

const OrderHistory = ({ ordersList }) => {


    let orders = ordersList;


    if (orders === "undefined" || Object.keys(orders).length == 0 || orders.length == 0) {

        return (<OrderNoHistory />)

    } else {

        return (
            <div>
                <div className="d-lg-none">
                    {orders === "undefined" || Object.keys(orders).length == 0 ? "" : <div className={orderHistoryStyles.ordersCount}>{orders.length} Orders</div>}

                    <Paginator pagerData={orders} rowComponent={OrderHistoryRow} rowsPerPage={4} />

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
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colSpan="7">
                                    <Paginator pagerData={orders} rowComponent={OrderHistoryRow} rowsPerPage={8} />
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default OrderHistory