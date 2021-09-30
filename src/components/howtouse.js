import React from 'react'

import * as howto from '../assets/scss/components/howtouse.module.scss'
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby"
const Howtouse = ({ node }) => {
    const data = useStaticQuery(graphql`{
  videoimg: file(relativePath: {eq: "product-images/how-to-use.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
}
`
    )
    return (
        <div className={["container-fluid", howto.howtousecon].join(" ")} >
            <div className={["row", howto.ordering].join(" ")}>
                <div className={["col-12", "col-lg-10", "offset-lg-1", howto.allcon].join(" ")}>
                    <div class="row">
                        <div className={["col-12", "col-lg-4", "offset-lg-1", howto.howLeftcol].join(" ")}>
                            <h1 className={howto.howtousehead}>How to Use</h1>
                            <div id="accordion">
                                <div className={["d-flex", howto.tabs].join(" ")}>
                                    <div className={[howto.tab, "card ", "col-lg-4", "col-6"].join(" ")}>
                                        <div className={[howto.cardhead, "card-header"].join(" ")} id="headingOne">
                                            <h5 class="mb-16">
                                                <button className={[howto.btnLink1, "btn-link", "btn "].join(" ")}  data-target="#stepOne" aria-expanded="true" aria-controls="stepOne">
                                                    STEP 1
        </button>
                                            </h5>
                                        </div>

                                    </div>
             
                                </div>
                                <div id="stepOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                        <p className={howto.tabTitle}>With just one pump, use your ring finger to gently massage the cream around the eye area during your morning and/or nightly routine.</p>  </div>
                            </div>
                       </div>
                        </div>
                        <div className={["col-12", "col-lg-6", "offset-lg-1", howto.howrightcol].join(" ")}>
                            <h1 className={howto.howtouseheadimage}>How to Use</h1>
                            <GatsbyImage
                                image={data.videoimg.childImageSharp.gatsbyImageData}
                                alt="img"
                                className={["col-12", "pr-0", "pl-0"].join(" ")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Howtouse