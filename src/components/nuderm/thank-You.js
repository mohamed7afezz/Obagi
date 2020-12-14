import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import nudermStyle from "../../assets/scss/components/NuDerm-sign.module.scss"

const ThankYou = props => {
 
 
  return (
    <>
    <div className={"offset-lg-2 col-12 col-lg-8 text-center"}>
        <h1 className={nudermStyle.thanks}>Thank You for Signing Up!</h1>
        <p className={nudermStyle.thanksDescs}>We look forward to partnering with you on your journey to radiant,
         healthy-looking skin. Be sure to look for us in your inbox for all the info, tips,
          and inspiration to help make your transformation a glowing success! In the meantime,
           get inspired by testimonials of real people who have used—and loved—Obagi Nu-Derm<sup>&reg;</sup>.</p>
 
    </div>
    <div className=" col-12 text-center">
    <Link to="/our-story" className={[nudermStyle.seeBtn," col-lg-2 col-12"].join(" ")}>See Obagi Success Stories</Link>
    </div>
</>
  )
}

export default ThankYou
