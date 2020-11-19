import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import orderHistoryRowStyles from '../assets/scss/components/order-history-row.module.scss'

const OrderHistoryRow = ({ node,
    orderNum,
    placedOn,
    lastUpdated,
    itemsNum,
    total,
    status }) => {
 

    const placedOnDate = new Date(placedOn)
        .toLocaleDateString({},
            { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
        ).split(' ')

    const lastUpdatedDate = new Date(placedOn)
        .toLocaleDateString({},
            { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
        ).split(' ')

// console.log("date", placedOn, lastUpdated)


 
    return (
        <>
            <div className={["d-lg-none", orderHistoryRowStyles.orderWrapper].join(" ")}>
                <div className={orderHistoryRowStyles.tableHeader}>
                    <div>Order#</div>
                    <div>{orderNum}</div>
                </div>


                <div className={orderHistoryRowStyles.rowsWrapper}>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Placed on:</div>
                        <div>{`${placedOnDate[0]} ${placedOnDate[1]} ${placedOnDate[2]}`}</div>
                    </div>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Last updated:</div>
                        <div>{`${lastUpdatedDate[0]} ${lastUpdatedDate[1]} ${lastUpdatedDate[2]}`}</div>
                    </div>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Items:</div>
                        <div>{itemsNum ? itemsNum : ""}</div>
                    </div>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Total:</div>
                        <div>${total ? total : ""}</div>
                    </div>
                    <div className={orderHistoryRowStyles.tableRow}>
                        <div>Status:</div>
                        <div className={orderHistoryRowStyles.status}>{status ? status : ""}</div>
                    </div>
                </div>
            </div>

            <tr className={["d-none d-lg-table-row"].join(" ")}>
                <td scope="row">{orderNum}</td>
                <td>{`${placedOnDate[0]} ${placedOnDate[1]} ${placedOnDate[2]}`}</td>
                <td>{`${lastUpdatedDate[0]} ${lastUpdatedDate[1]} ${lastUpdatedDate[2]}`}</td>
                <td>{itemsNum}</td>
                <td>${total}</td>
                <td>{status}</td>
                <td><Link to={"/my-account/orders/order-details/" + orderNum}></Link></td>
            </tr>
        </>
    )
}

export default OrderHistoryRow