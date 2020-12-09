
import React ,{useContext,  useState } from 'react'
import { graphql, Link,navigate } from 'gatsby'
import { useLocation } from "@reach/router"
import StartOrderStatus from "./Level-1";
import UserContext from "../../providers/user-provider"
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'
import orderHistoryStyles from '../../assets/scss/components/order-history.module.scss'
import OrderNoHistory from '../order-no-history';
import OrderHistoryRow from '../order-history-row';
import Paginator from '../paginator';
import Customer from '../customer-care';
import OrdersatusRow from './Order-status-table';

const OrderStatusHistory = props => {

    let orders = [props.RequestData];
    console.log('Hassan',props.RequestData)
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    if (orders === "undefined" || Object.keys(orders).length == "0" || orders.length == 0 ) {
        return <OrderNoHistory />

    }else{return (
        <>
                       <Customer activeTab="order-status">
                           
               <div>
                

                <div className={[myAccountStyles.secondTitleWrapper, "d-none d-lg-flex"].join(" ")}>
                    <div className={myAccountStyles.secondTitle}>Order History</div>

                    {orders !== "undefined" || Object.keys(orders).length != 0 || orders.length == 0?
                        <div className={myAccountStyles.ordersCount}>{orders.length} {orders.length > 1? "Orders" : "Order"}</div>
                        : ""
                    }


                </div>
                <div className="d-lg-none">
                    {orders === "undefined" || Object.keys(orders).length == 0 ? "" : <div className={orderHistoryStyles.ordersCount}>{orders.length} Orders</div>}

                    <Paginator pagerData={orders} rowComponent={OrdersatusRow} rowsPerPage={4} />

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
                                    <Paginator pagerData={orders} rowComponent={OrdersatusRow} rowsPerPage={8} />
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
            </Customer>

        </>
    )
}
}
export default OrderStatusHistory
