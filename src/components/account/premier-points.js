import React, { useEffect, useState } from "react"
import UserAccount from "../../components/user-account"
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as premierStyles from "../../assets/scss/components/premier-points.module.scss"
import { GatsbyImage } from "gatsby-plugin-image";
import SEO from "../seo"


export default function Premier() {

  const data = useStaticQuery(graphql`{
  bitmap: file(relativePath: {eq: "bitmap.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  google: file(relativePath: {eq: "google-play-badge.png"}) {
    childImageSharp {
      gatsbyImageData(layout: FIXED)
    }
  }
  appstore: file(
    relativePath: {eq: "download-on-the-app-store-badge-us-uk-rgb-blk-092917.png"}
  ) {
    childImageSharp {
      gatsbyImageData(layout: FIXED)
    }
  }
}
`)

  return (
    <UserAccount activeTab="premier-points">
      <SEO title="Premier Points | Obagi" ogTitle="Premier Points | Obagi" />

      <div className="tab-pane active" id="premier" role="tabpanel">
      <div
          className={[
            premierStyles.secondTitleWrapper,
            "d-none d-lg-flex",
          ].join(" ")}
        >
          <h2 className={premierStyles.secondTitle}>Premier Points</h2>
       
        </div>
        <div className="row mob-m-0">
            <div className="col-12 col-lg-6 mob-p-0">
            <div className={[premierStyles.PremierRight,"show-mob"].join(" ")}>
                        <h1 className={premierStyles.Premiertitle}>
                        Join Obagi Medical Premier Points<sup>&reg;</sup> Today
                        </h1>
                        <p className={premierStyles.Premiersubtitle}>Earn reward points with every purchase of Obagi Medical<sup>&reg;</sup> and receive free products*</p>
                     </div>
                <GatsbyImage
                  image={data.bitmap.childImageSharp.gatsbyImageData}
                  alt="img"
                  className="mobileImg" />
                <div className={[premierStyles.centerimages].join(" ")}>
                <a href="https://apps.apple.com/us/app/obagi-premier-points/id1056761689" target="_blank"><div className="mobileImg"><GatsbyImage image={data.appstore.childImageSharp.gatsbyImageData} alt="img" /></div></a>
                <a href="https://play.google.com/store/apps/details?id=com.obagi.premierepoints&hl=en" target="_blank"><div className="mobileImg"><GatsbyImage image={data.google.childImageSharp.gatsbyImageData} alt="img" /></div></a>
                </div>
            </div>
            <div className="col-12 col-lg-6 mob-p-0">
                    <div className={premierStyles.PremierRight}>
                        <h1 className={[premierStyles.Premiertitle,"hide-mob"].join(" ")}>
                        Join Obagi Medical Premier Points<sup>&reg;</sup> Today
                        </h1>
                        <p className={[premierStyles.Premiersubtitle,"hide-mob"].join(" ")}>Earn reward points with every purchase of Obagi Medical<sup>&reg;</sup> products</p>
                        <p className={premierStyles.PremierDesc}>Obagi Premier Points is an exclusive opportunity to earn points when you purchase Obagi Medical products directly from your physician or online at <Link to="/">Obagi.com</Link>. Join today, and every dollar you spend on applicable products goes towards free products in the future.* Once you've saved enough points, you can redeem them for free Obagi Medical products.</p>
                      <div className={premierStyles.PremierLinks}>
                    <div className={premierStyles.PremierLink}>
                        <p className={premierStyles.PremierLinkTitke}>Download</p>
                        <p className={premierStyles.PremierLinkDesc}>Download the free mobile Obagi Premier Points app from your iOS or Android device</p>
                    </div>
                    <div className={premierStyles.PremierLink}>
                        <p className={premierStyles.PremierLinkTitke}>Purchase</p>
                        <p className={premierStyles.PremierLinkDesc}>
                       Purchase qualifying Obagi Medical products at your physician’s office or online at <Link to="/">Obagi.com</Link></p>
                    </div>
                    <div className={premierStyles.PremierLink}>
                        <p className={premierStyles.PremierLinkTitke}>Earn Points</p>
                        <p className={premierStyles.PremierLinkDesc}>
                        Earn points and redeem them for qualifying products</p>
                    </div>
                    </div>
                    <p className={premierStyles.PremierFootNote}>*Free Obagi products do not include any prescription products.<br/> Please see the Obagi Premier Points app for full program terms and conditions.</p>
                    </div>
                </div>
          
        </div>

        <div className="row d-lg-none">
          <div className="col-12">
            <div className={premierStyles.csTitle}>Customer Service</div>
            <div className={premierStyles.csText}>Our Customer Service Representatives are available to assist you Monday through Friday, from 7am – 4pm PST at <span className={premierStyles.csNumber}>1-800-636-7546</span>.</div>
          </div>
        </div>
      </div>
    </UserAccount>
  );
}
