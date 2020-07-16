import React from 'react'

import detailsStyles from '../assets/scss/components/thedetails.module.scss'
import plus from '../assets/images/product-images/plus.svg'
const Details = ({ node }) => {
    return (
        <div className={["container-fluid", detailsStyles.detailHero].join(" ")}>
            <div className={"row"}>
                <div className={["col-12", "col-lg-4", "offset-lg-1"].join(" ")}>
                    <div className={detailsStyles.detail}>
                        <h1>The Details</h1>
                        <p className={detailsStyles.safe}>
                        With the help of ingredients similar to those found in nature, Vitamin C and Kinetin+ Complex, this hypoallergenic, scientifically advanced formula improves crow’s feet and that “crepey” texture around the eye. Soft Focus Technology instantly blurs fine lines and shadows to help keep eyes youthful and bright.                        </p>
                    </div>
                </div>
                <div className={["col-12", "col-lg-4", "offset-lg-1"].join(" ")}>
                    <h1>Safe</h1>
                    <p className={detailsStyles.safe}>
                    This hypoallergenic, cruelty-free Vitamin C Eye Brightener is free of sulfates SLS and SLES, parabens, formaldehydes, formaldehyde-releasing agents, phthalates, mineral oil, retinyl palmitate, oxybenzone, coal tar, hydroquinone, triclosan, and triclocarban. It also has less than 1% of synthetic fragrances.                   </p>

                </div>
            </div>
        </div>
    )
}

export default Details;