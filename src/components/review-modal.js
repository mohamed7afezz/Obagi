import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import * as reviewStyles from '../assets/scss/components/reviews.module.scss'
import { CustomSelect } from '../assets/js/custom-select'

const ReviewModal = ({ node }) => {


    useEffect(() => {
        if (document.querySelectorAll('.custom-select .select-selected').length < 1) {
            CustomSelect();
        }
    })

    const data = useStaticQuery(graphql`{
  productImage: file(relativePath: {eq: "image-3-4.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
}
`)


    return <>
        <div className="modal fade review-modal" id="review-modal" tabindex="-1" role="dialog" aria-labelledby="reviewModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">


                    <div className="modal-header">
                        <div className="modal-title" id="reviewModalLabel">Write a Review</div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                    </div>


                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">

                                {/* Error message if the customer hasn't purchased the item before  */}
                                <div className="col-12 col-lg-10 offset-lg-1 d-none">
                                    <div className="error-wrapper">
                                        <div className="error-message">Only customers who have purchased this item can review it.</div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-5 offset-lg-1">
                                    <div className="review-product-name d-lg-none">Vitamin C + Arbutin Brightening Serum</div>

                                    <div className="thankyou-note d-lg-none">Thank you for reviewing your recent purchase!</div>
                                    <div className="thankyou-footnote d-lg-none">We will send you an email when your review is live.</div>

                                    <div className="review-product-image"><GatsbyImage image={data.productImage.childImageSharp.gatsbyImageData} alt="img" /></div>
                                </div>


                                <div className="col-12 col-lg-4">
                                    <div className="review-product-name d-none d-lg-block">Vitamin C + Arbutin Brightening Serum</div>


                                    <form>
                                        <div className="review-footnote">*Required fields</div>
                                        <div class="form-group select-group">
                                            <label for="reviewFormSelect" className="form-label">*Rating</label>
                                            <div className="select-wrapper custom-select">
                                                <select class="form-control" id="reviewFormSelect">
                                                    <option>Select Rating</option>
                                                    <option>Select Rating</option>
                                                    <option>5 Star</option>
                                                    <option>4 Stars</option>
                                                    <option>3 Star</option>
                                                    <option>2 Star</option>
                                                    <option>1 Star</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleInputEmail1" className="form-label">Your Name</label>
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />

                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1" className="form-label">*Email</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />

                                        </div>

                                        <div class="form-group">
                                            <label for="exampleInputEmail1" className="form-label">*Review Title</label>
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />

                                        </div>
                                        <div class="form-group textarea-group">
                                            <label for="exampleInputEmail1" className="form-label">*Description</label>
                                            <textarea type="text" class="form-control textarea-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Type here…" />

                                        </div>

                                        <button type="button" className="captcha">CAPTCHA FPO</button>
                                        <input className="button-link" type="submit" value="Submit Review" />
                                    </form>




                                    {/* After the customer reviews the item  */}
                                    {/* <div>
                                        <div className="thankyou-note d-none d-lg-block">Thank you for reviewing your recent purchase!</div>
                                        <div className="thankyou-footnote d-none d-lg-block">We will send you an email when your review is live.</div>
                                        <button type="button" className="button-link login-button">Continue Shopping</button>
                                        <button type="button" className="button-link">Explore More Serums</button>
                                    </div> */}


                                    {/* If the customer hasn't bought the item:  */}
                                    {/* <div className="d-none">
                                        <button type="button" className="button-link login-button">Log In to Review this product</button>
                                        <button type="button" className="button-link">Continue Shopping</button>
                                    </div> */}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
export default ReviewModal;