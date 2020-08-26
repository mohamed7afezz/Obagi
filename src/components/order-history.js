import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import orderHistoryStyles from '../assets/scss/components/order-history.module.scss'
import OrderHistoryRow from "./order-history-row"
import Paginator from './paginator'

const OrderHistory = ({ node }) => {

    return (
        <div>
            <div className={[orderHistoryStyles.ordersCount, "d-lg-none"].join(" ")}>45 Orders</div>
            <OrderHistoryRow />
        </div>
    )
}

export default OrderHistory