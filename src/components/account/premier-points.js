import React, { useEffect, useState } from "react"
import UserAccount from "../../components/user-account"

import myAccountStyles from "../../assets/scss/components/premier-points.module.scss"

export default function Premier() {
  return (
    <UserAccount activeTab="premier-points">
      <div className="tab-pane active" id="premier" role="tabpanel">
      <div
          className={[
            myAccountStyles.secondTitleWrapper,
            "d-none d-lg-flex",
          ].join(" ")}
        >
          <div className={myAccountStyles.secondTitle}>Premier Points</div>
       
        </div>
        <div className="row mob-m-0">
            <div className="col-12 col-lg-6">
            <div className={[myAccountStyles.PremierRight,"show-mob"].join(" ")}>
                        <h1 className={myAccountStyles.Premiertitle}>
                        Join Obagi Medical Premier Points Today
                        </h1>
                        <p className={myAccountStyles.Premiersubtitle}>Earn reward points with every purchase of Obagi Medical and receive free products*</p>
                     </div>
                <img className="mobileImg" src="https://via.placeholder.com/650x500"/>
                <div className={["d-flex",myAccountStyles.centerimages].join(" ")}>
                <img className="mobileImg" src="https://via.placeholder.com/150x50"/>
                <img className="mobileImg" src="https://via.placeholder.com/170x50"/>
                </div>
            </div>
            <div className="col-12 col-lg-6 ">
                    <div className={myAccountStyles.PremierRight}>
                        <h1 className={[myAccountStyles.Premiertitle,"hide-mob"].join(" ")}>
                        Join Obagi Medical Premier Points Today
                        </h1>
                        <p className={[myAccountStyles.Premiersubtitle,"hide-mob"].join(" ")}>Earn reward points with every purchase of Obagi Medical and receive free products*</p>
                        <p className={myAccountStyles.PremierDesc}>Obagi Premier Points is an exclusive opportunity to earn points every time you purchase Obagi Medical products from your physician. Join today, and every dollar you spend in a physicians office goes towards free products in the future. Once you've saved enough points, you can redeem them for free Obagi products. Follow these 3 easy steps:</p>
                      <div className={myAccountStyles.PremierLinks}>
                    <div className={myAccountStyles.PremierLink}>
                        <p className={myAccountStyles.PremierLinkTitke}>Download</p>
                        <p className={myAccountStyles.PremierLinkDesc}>Download the free mobile Obagi Premier Points app from your iOS or Android device</p>
                    </div>
                    <div className={myAccountStyles.PremierLink}>
                        <p className={myAccountStyles.PremierLinkTitke}>Purchase</p>
                        <p className={myAccountStyles.PremierLinkDesc}>
                        Purchase qualifying Obagi Medical products at your physician's office and use the app at checkout</p>
                    </div>
                    <div className={myAccountStyles.PremierLink}>
                        <p className={myAccountStyles.PremierLinkTitke}>Earn Points</p>
                        <p className={myAccountStyles.PremierLinkDesc}>
                        Earn points and redeem them for qualifying products</p>
                    </div>
                    </div>
                    </div>
                </div>
          
        </div>
      </div>
    </UserAccount>
  )
}
