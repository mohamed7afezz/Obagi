import React from 'react'
import UserAccount from '../../components/my-account'
import OrderNoHistory from '../../components/order-no-history'
import OrderHistory from '../../components/order-history'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'

export default function Orders() {
    return (
        <UserAccount activeTab="orders">
            <div className="tab-pane active" id="orders" role="tabpanel">

            <div className={[myAccountStyles.secondTitleWrapper, "d-none d-lg-flex"].join(" ")}>
                <div className={myAccountStyles.secondTitle}>Order History</div>
                <div className={myAccountStyles.ordersCount}>45 Orders</div>
            </div>
            {/* <OrderNoHistory /> */}
            <OrderHistory />
            </div>
        </UserAccount>
    )
}
