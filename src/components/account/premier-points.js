import React, { useEffect, useState } from "react"
import UserAccount from "../../components/user-account"
import { Link } from 'gatsby'
import premierStyles from "../../assets/scss/components/premier-points.module.scss"

export default function Premier() {
  return (
    <UserAccount activeTab="premier-points">
      <div className="tab-pane active" id="premier" role="tabpanel">
      <div
          className={[
            premierStyles.secondTitleWrapper,
            "d-none d-lg-flex",
          ].join(" ")}
        >
          <div className={premierStyles.secondTitle}>Premier Points</div>
       
        </div>
        <div className="row mob-m-0">
            <div className="col-12 col-lg-6 mob-p-0">
            <div className={[premierStyles.PremierRight,"show-mob"].join(" ")}>
                        <h1 className={premierStyles.Premiertitle}>
                        Join Obagi Medical Premier Points Today
                        </h1>
                        <p className={premierStyles.Premiersubtitle}>Earn reward points with every purchase of Obagi Medical and receive free products*</p>
                     </div>
                <img className="mobileImg" src="https://via.placeholder.com/650x500"/>
                <div className={[premierStyles.centerimages].join(" ")}>
                <img className="mobileImg" src="https://via.placeholder.com/150x50"/>
                <img className="mobileImg" src="https://via.placeholder.com/170x50"/>
                </div>
            </div>
            <div className="col-12 col-lg-6 mob-p-0">
                    <div className={premierStyles.PremierRight}>
                        <h1 className={[premierStyles.Premiertitle,"hide-mob"].join(" ")}>
                        Join Obagi Medical Premier Points Today
                        </h1>
                        <p className={[premierStyles.Premiersubtitle,"hide-mob"].join(" ")}>Earn reward points with every purchase of Obagi Medical and receive free products*</p>
                        <p className={premierStyles.PremierDesc}>Obagi Premier Points is an exclusive opportunity to earn points every time you purchase Obagi Medical products from your physician. Join today, and every dollar you spend in a physicians office goes towards free products in the future. Once you've saved enough points, you can redeem them for free Obagi products. Follow these 3 easy steps:</p>
                      <div className={premierStyles.PremierLinks}>
                    <div className={premierStyles.PremierLink}>
                        <p className={premierStyles.PremierLinkTitke}>Download</p>
                        <p className={premierStyles.PremierLinkDesc}>Download the free mobile Obagi Premier Points app from your iOS or Android device</p>
                    </div>
                    <div className={premierStyles.PremierLink}>
                        <p className={premierStyles.PremierLinkTitke}>Purchase</p>
                        <p className={premierStyles.PremierLinkDesc}>
                        Purchase qualifying Obagi Medical products at your physician's office and use the app at checkout</p>
                    </div>
                    <div className={premierStyles.PremierLink}>
                        <p className={premierStyles.PremierLinkTitke}>Earn Points</p>
                        <p className={premierStyles.PremierLinkDesc}>
                        Earn points and redeem them for qualifying products</p>
                    </div>
                    </div>
                    </div>
                </div>
          
        </div>

        <div className="row d-lg-none">
          <div className="col-12">
            <div className={premierStyles.csTitle}>Customer Service</div>
            <div className={premierStyles.csText}>Our Customer Service Specialists are available to assist you Monday through Friday from 9am to 5pm EST. Feel free to give us a call at  1-800-636-7546 or <Link to="mailto:@email.com">Email Us</Link></div>
          </div>
        </div>
      </div>
    </UserAccount>
  )
}
