import React from 'react'

import detailsStyles from '../assets/scss/components/thedetails.module.scss'
import plus from '../assets/images/product-images/plus.svg'
const Details = ({ node }) => {
    return (
        <div className={["container-fluid", detailsStyles.detailHero].join(" ")}>
        <div className={"row"}>
            <div className={["col-12", "col-lg-4", "offset-lg-1"].join(" ")}>
                <div className={ detailsStyles.detail}>
                    <h1>The Details</h1>
                    <p className = {detailsStyles.safe}>This advanced formula contains Vitamin C and Kinetin+ Complex, nature-identical synthesized plant growth factors, to improve the appearance of crepiness and crow’s feet.  Soft Focus Technology creates optical diffusion, to instantly blur the appearance of fine lines and shadows. This formula is hypoallergenic.</p>
             </div>
                </div>
                <div className={["col-12", "col-lg-4", "offset-lg-1"].join(" ")}>
                <h1>Safe</h1>
                    <p className={detailsStyles.safe}>
                    Free of sulfates SLS and SLES, parabens, formaldehydes, formaldehyde-releasing agents, phthalates, mineral oil, retinyl palmitate, oxybenzone, coal tar, hydroquinone, triclosan, and triclocarban, and contains less than one percent of synthetic fragrances. This product is also hypoallergenic and cruelty-free.                     </p>
              
                </div>
                </div>
                </div>
    )
}

export default Details;