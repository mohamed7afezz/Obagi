import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import orderHistoryStyles from '../assets/scss/components/order-history.module.scss'
import OrderHistoryRow from "./order-history-row"
import Paginator from './paginator'
import OrderNoHistory from "./order-no-history"

const baseUrl = process.env.Base_URL;

const OrderHistory = ({ node }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [orders, setOrders] = useState({});

    async function getOrders() {

        setIsLoading(true);
        const ordersData =  await fetch(`${baseUrl}bigcommerce/v1/customer_orders`, {
            method: 'GET',
            credentials: 'include',
        })

        if(ordersData.status == 200) {
            let ordersResponse = await ordersData.json();

            if (ordersResponse !== "User not login.") {
                setOrders(ordersResponse);
            }
        }

      
        setIsLoading(false);
        
    }

    useEffect(() => {
        getOrders();
    }, [])

    // console.log("orders", orders)
    

    if(isLoading) {
        return <div> Loading... </div>
    }

    else if(orders === "undefined" || Object.keys(orders).length == 0 || orders.length == 0) {

        return (<OrderNoHistory />)

    } else {

        return (
            <div>
                <div className="d-lg-none">
                {orders === "undefined" || Object.keys(orders).length == 0? "": <div className={orderHistoryStyles.ordersCount}>{orders.length} Orders</div>}
                    {orders.map((item, index) => {
                        return (
                            <OrderHistoryRow 
                            orderNum = {item.id}
                            placedOn = {item.date_created}
                            lastUpdated = {item.date_modified}
                            itemsNum = {item.items_total}
                            total = {parseFloat(item.total_inc_tax).toFixed(2)}
                            status = {item.status}
                        
                        />
                        )
                    })}
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
                            {orders.map((item, index) => {
                                
                                return (
                                    <OrderHistoryRow 
                                        orderNum = {item.id}
                                        placedOn = {item.date_created}
                                        lastUpdated = {item.date_modified}
                                        itemsNum = {item.items_total}
                                        total = {parseFloat(item.total_inc_tax).toFixed(2)}
                                        status = {item.status}
                                    
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default OrderHistory