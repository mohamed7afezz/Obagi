import React from 'react'

import howto from '../assets/scss/components/howtouse.module.scss'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"
const Howtouse = ({ node }) => {
    const data = useStaticQuery(graphql`
    query {
        videoimg: file(relativePath: { eq: "product-images/howtouse.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
     
    }`
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
                                                <button className={[howto.btnLink1, "btn-link", "btn "].join(" ")} data-toggle="collapse" data-target="#stepOne" aria-expanded="true" aria-controls="stepOne">
                                                    STEP 1
        </button>
                                            </h5>
                                        </div>

                                    </div>
                                    <div className={[howto.tab, "card ", "col-lg-4", "col-6",].join(" ")}>
                                        <div className={[howto.cardhead, "card-header"].join(" ")} id="headingTwo">
                                            <h5 class="mb-0">
                                                <button className={[howto.btnLink1, "btn-link", "collapsed", "btn "].join(" ")} data-toggle="collapse" data-target="#stepTwo" aria-expanded="false" aria-controls="stepTwo">
                                                    STEP 2
        </button>
                                            </h5>
                                        </div>

                                    </div>
                                    <div className={[howto.tab, "card ", "col-lg-4", "col-6"].join(" ")}>
                                        <div className={[howto.cardhead, "card-header"].join(" ")} id="headingThree">
                                            <h5 class=" mb-sm-16">
                                                <button className={[howto.btnLink1, "btn-link", "collapsed", "btn "].join(" ")} data-toggle="collapse" data-target="#stepThree" aria-expanded="false" aria-controls="stepThree">
                                                    STEP 3
        </button>
                                            </h5>
                                        </div>

                                    </div>
                                    <div className={[howto.tab, "card ", "col-lg-4", "col-6"].join(" ")}>
                                        <div className={[howto.cardhead, "card-header"].join(" ")} id="headingFour">
                                            <h5 class="mb-0">
                                                <button className={[howto.btnLink1, "btn-link", "collapsed", "btn "].join(" ")} data-toggle="collapse" data-target="#stepFour" aria-expanded="false" aria-controls="stepFour">
                                                    STEP 4
        </button>
                                            </h5>
                                        </div>

                                    </div>
                                    <div className={[howto.tab, "card ", "col-lg-4", "col-6"].join(" ")}>

                                        <div className={[howto.cardhead, "card-header"].join(" ")} id="headingFive">
                                            <h5 class="mb-0">
                                                <button className={[howto.btnLink1, "btn-link", "collapsed", "btn "].join(" ")} data-toggle="collapse" data-target="#stepFive" aria-expanded="false" aria-controls="stepFive">
                                                    STEP 5
        </button>
                                            </h5>
                                        </div>

                                    </div>
                                    <div className={[howto.tab, "card ", "col-lg-4", "col-6"].join(" ")}>
                                        <div className={[howto.cardhead, "card-header"].join(" ")} id="headingSix">
                                            <h5 class="mb-0">
                                                <button className={[howto.btnLink1, "btn-link", "collapsed", "btn "].join(" ")} data-toggle="collapse" data-target="#stepSix" aria-expanded="true" aria-controls="stepSix">
                                                    STEP 6
        </button>
                                            </h5>
                                        </div>

                                    </div>

                                </div>
                                <div id="stepOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                        <p className={howto.tabTitle}>Lorem ipsum dolor sit amet</p>
                                   <p className={howto.tabdesc}>     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies ipsum quis ipsum rutrum, id lobortis massa laoreet. Praesent at arcu mauris. Duis aliquet euismod erat et tincidunt. In quis odio non dui facilisis bibendum eget vitae.    </p>  </div>
                                </div>

                                <div id="stepTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body">
                                    <p className={howto.tabTitle}>Lorem ipsum dolor sit amet</p>

                                    <p className={howto.tabdesc}>     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies ipsum quis ipsum rutrum, id lobortis massa laoreet. Praesent at arcu mauris. Duis aliquet euismod erat et tincidunt. In quis odio non dui facilisis bibendum eget vitae.    </p>  </div>
      
                                </div>
                                <div id="stepThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body">
                                    <p className={howto.tabTitle}>Lorem ipsum dolor sit amet</p>

                                    <p className={howto.tabdesc}>     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies ipsum quis ipsum rutrum, id lobortis massa laoreet. Praesent at arcu mauris. Duis aliquet euismod erat et tincidunt. In quis odio non dui facilisis bibendum eget vitae.    </p>  </div>

                                </div>
                                <div id="stepFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                    <div class="card-body">
                                    <p className={howto.tabTitle}>Lorem ipsum dolor sit amet</p>

                                    <p className={howto.tabdesc}>     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies ipsum quis ipsum rutrum, id lobortis massa laoreet. Praesent at arcu mauris. Duis aliquet euismod erat et tincidunt. In quis odio non dui facilisis bibendum eget vitae.    </p>  </div>

                                </div>
                                <div id="stepFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                                    <div class="card-body">
                                    <p className={howto.tabTitle}>Lorem ipsum dolor sit amet</p>

                                    <p className={howto.tabdesc}>     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies ipsum quis ipsum rutrum, id lobortis massa laoreet. Praesent at arcu mauris. Duis aliquet euismod erat et tincidunt. In quis odio non dui facilisis bibendum eget vitae.    </p>  </div>

                                </div>
                                <div id="stepSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
                                    <div class="card-body">
                                    <p className={howto.tabTitle}>Lorem ipsum dolor sit amet</p>

                                    <p className={howto.tabdesc}>     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies ipsum quis ipsum rutrum, id lobortis massa laoreet. Praesent at arcu mauris. Duis aliquet euismod erat et tincidunt. In quis odio non dui facilisis bibendum eget vitae.    </p>  </div>

                                </div>
                            </div>

                        </div>
                        <div className={["col-12", "col-lg-6", "offset-lg-1", howto.howrightcol].join(" ")}>
                            <h1 className={howto.howtouseheadimage}>How to Use</h1>
                            <Img fluid={data.videoimg.childImageSharp.fluid} className={["col-12", "pr-0","pl-0"].join(" ")}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Howtouse