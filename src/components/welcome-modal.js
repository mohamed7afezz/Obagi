import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import * as reviewStyles from '../assets/scss/components/reviews.module.scss'
import { CustomSelect } from '../assets/js/custom-select'

const WelcomeModal = ({ node }) => {


    useEffect(() => {
        if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
            CustomSelect();
        }
    })

    const data = useStaticQuery(graphql`
    query {
      productImage: file(relativePath: { eq: "image-3-4.png" }) {
        childImageSharp {
          fluid (quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    `)


    return (
        <>
            <div className="modal fade welcome-modal" id="welcome-modal" tabindex="-1" role="dialog" aria-labelledby="welcomeModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">


                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                        </div>


                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 col-lg-10 offset-lg-1">
                                        <div className="welcome-footnote">Welcome back, Andrew!</div>
                                        <div className="welcome-note">You recently purchased</div>
                                        <div className="welcome-product-name">
                                            <div>Vitamin C + Arbutin Brightening Serum</div>
                                        </div>

                                        <div className="welcome-product-image"><Img alt="img"  fluid={data.productImage.childImageSharp.fluid} /></div>
                                        <div className="button-section">
                                            <button type="button" className="button-link">Explore More Serums</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WelcomeModal;