import React from 'react'
import UserAccount from '../../components/my-account'
import myAccountStyles from '../../assets/scss/components/my-account.module.scss'

export default function Orders() {
    return (
        <UserAccount activeTab="orders">
            <div className="tab-pane active" id="home" role="tabpanel">

            <div className={myAccountStyles.secondTitleWrapper}>
                <div className={myAccountStyles.secondTitle}>Order History</div>
                <div className={myAccountStyles.ordersCount}>45 Orders</div>
            </div>
            {/* <OrderNoHistory /> */}
            {/* <OrderHistory /> */}
            </div>

            <div className="tab-pane" id="profile" role="tabpanel">KSJD;SKDLJS;LDKAS;DLSKAD</div>
            <div className="tab-pane" id="messages" role="tabpanel">KJSDLKSJDLKASJDLAKSDJ</div>
            <div className="tab-pane" id="settings" role="tabpanel">LKJSDLKSJDLASKJDASLKD</div>
        </UserAccount>
    )
}
