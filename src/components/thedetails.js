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
                    <p className = {detailsStyles.safe}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a felis nec elit congue blandit consequat a nisl. Sed lorem justo, laoreet in nibh eu lobortis suscipit lacus. Morbi turpis ex lobortis eget nulla molestie tincidunt urna. Fusce maximus fringilla nisi vel dignissim nisl. Vivamus ultrices laoreet enim ac fermentum…</p>
                    <a className={detailsStyles.expand} data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"><img src={plus}/> Read More</a>
                    <div class="collapse multi-collapse" id="multiCollapseExample1">
                    <p  className = {detailsStyles.safe}>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </p>
                    </div>
              </div>
                </div>
                <div className={["col-12", "col-lg-4", "offset-lg-1"].join(" ")}>
                <h1>Safe</h1>
                    <p className={detailsStyles.safe}>
                    Free of Sulfates SLS and SLES, parabens, formaldehydes, formaldehyde-releasing agents, phthalates, mineral oil, retinyl palmitate, oxybenzone, coal tar, hydroquinone, triclosan, triclocarban, and contains less than one percent of synthetic fragrances…
                     </p>
                     <a className={detailsStyles.expand} data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2"><img src={plus}/> Full List</a>
                     <div class="collapse multi-collapse"  id="multiCollapseExample2">
                        <p  className = {detailsStyles.safe}>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </p>
                    </div>
             
                </div>
                </div>
                </div>
    )
}

export default Details;