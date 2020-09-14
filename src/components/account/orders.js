import React, { useEffect, useState } from "react"
import UserAccount from '../../components/user-account'
import OrderNoHistory from '../../components/order-no-history'
import OrderHistory from '../../components/order-history'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'

const baseUrl = process.env.Base_URL;


export default function Orders() {


    const [orders, setOrders] = useState({});

    async function getOrders() {

        const ordersData = await (await fetch(`${baseUrl}bigcommerce/v1/customer_orders`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })).json();

        if (ordersData !== "User not login.") {
            setOrders(ordersData);
        }
        console.log("hafobagi", ordersData);
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <UserAccount activeTab="orders">
            <div className="tab-pane active" id="orders" role="tabpanel">

                <div className={[myAccountStyles.secondTitleWrapper, "d-none d-lg-flex"].join(" ")}>
                    <div className={myAccountStyles.secondTitle}>Order History</div>

                    {orders !== "undefined" || Object.keys(orders).length != 0 ?
                        <div className={myAccountStyles.ordersCount}>{orders.length} Orders</div>
                        : ""
                    }


                </div>
                {/* <OrderNoHistory /> */}
                <OrderHistory />
            </div>
        </UserAccount>
    )
}
