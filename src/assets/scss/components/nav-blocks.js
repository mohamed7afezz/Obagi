import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const NavBlocks = () => {


    const data = useStaticQuery(graphql`
    query {
        test: file(relativePath: { eq: "blog-clenziderm-model.png" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        testarrow: file(relativePath: { eq: "small-right.png" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        skinclusion: file(relativePath: { eq: "skinclusion-logo-2019-tag-outlined-sm-tm.png" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
  `)

    return (
        <div className=" mt-5">

            <div class="container-fluid d-lg-block nav-container-desk">
                <div class="row">
                    <div class="col-12">
                        <p class="nav-title-desk">Obagi Medical</p>
                        <p class="nav-subtitle-desk">Learn from our medical legacy applied to everyday skincare</p>
                        <div class="nav-img-desk"><Img fluid={data.test.childImageSharp.fluid} /></div>
                        <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                    </div>

                </div>
            </div>



            <div className="main-nav-containers">
                <div class="container-fluid d-lg-block nav-container-desk">
                    <div class="row">
                        <div class="col-12">
                            <p class="nav-title-desk">Obagi Medical</p>

                            <p class="nav-subtitle-desk">Learn from our medical legacy applied to everyday skincare</p>

                            <div class="nav-img-desk"><Img fluid={data.test.childImageSharp.fluid} /></div>

                            <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                        </div>
                    </div>
                </div>

                <div class="container-fluid d-lg-block nav-container-desk">
                    <div class="row">
                        <div class="col-12">
                            <p class="nav-title-desk">Obagi Clinical</p>

                            <p class="nav-subtitle-desk">Learn from our medical legacy applied to everyday skincare</p>

                            <div class="nav-img-desk"><Img fluid={data.test.childImageSharp.fluid} /></div>

                            <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                        </div>
                    </div>
                </div>
            </div>




            {/* <div class="container-fluid d-lg-block nav-container-desk nav-single-container">
                <div class="row">
                    <div class="col-12">
                        <p class="nav-title-desk">Obagi Medical</p>

                        <p class="nav-subtitle-desk">Learn from our medical legacy applied to everyday skincare</p>

                        <div class="nav-img-desk"><Img fluid={data.test.childImageSharp.fluid} /></div>

                        <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                    </div>
                </div>
            </div> */}




            <div class="container-fluid d-lg-block nav-container-desk nav-single-container">
                <div class="row">
                    <div class="col-12">

                        <div class="nav-title-img"><Img fluid={data.skinclusion.childImageSharp.fluid} /></div>

                        <div class="nav-img-desk"><Img fluid={data.test.childImageSharp.fluid} /></div>

                        <div class="nav-arrow-desk"><a href="#"><Img fluid={data.testarrow.childImageSharp.fluid} /></a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBlocks