import React, { useEffect, useState } from "react"
import UserAccount from '../../components/user-account'
import OrderNoHistory from '../../components/order-no-history'
import OrderHistory from '../../components/order-history'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
const spinner = css`
  display: block;
  margin: 0 auto;
 
`;
const baseUrl = process.env.Base_URL;


export default function Orders() {


    const [orders, setOrders] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    async function getOrders() {
        setIsLoading(true);

        const ordersDataRequest = await fetch(`${baseUrl}bigcommerce/v1/customer_orders`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        }).catch(error => {
            console.log("bahiii error", error)
            setIsLoading(false);
        })
        console.log("bahiiii req", ordersDataRequest.status, (ordersDataRequest.status === 204 || ordersDataRequest.status === 404))
        if (ordersDataRequest.status === 204 || ordersDataRequest.status === 404) {
   
        } else {
            const ordersData = await ordersDataRequest.json();
            if (ordersData !== "User not login.") {
                setOrders(ordersData);
            }
        }
        setIsLoading(false);

        
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <UserAccount activeTab="orders">
            <div className="tab-pane active orders-comp" id="orders" role="tabpanel">

                <div className={[myAccountStyles.secondTitleWrapper, "d-none d-lg-flex"].join(" ")}>
                    <div className={myAccountStyles.secondTitle}>Order History</div>

                    {orders !== "undefined" || Object.keys(orders).length != 0 || orders.length == 0?
                        <div className={myAccountStyles.ordersCount}>{orders.length} {orders.length > 1? "Orders" : "Order"}</div>
                        : ""
                    }


                </div>
                {/* <OrderNoHistory /> */}
                {isLoading? 
                    <div>
                        <ClipLoader css={spinner} size={150} color={"#123abc"}/>           
                    </div> 
                    : 
                    <OrderHistory ordersList={orders} />
                }
            </div>
        </UserAccount>
    )
}
