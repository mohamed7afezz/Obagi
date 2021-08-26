import React from 'react'
import { graphql } from 'gatsby'
import Slider from "react-slick"
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useEffect } from 'react'

const ImagesSlider = ({ node }) => {


    useEffect(() => {
        if (typeof window !== undefined) {
            const scriptTag = document.createElement('script');
            scriptTag.src = "https://commerce.taggbox.com/embed.min.js";

            document.body.appendChild(scriptTag);
        }
    })
    return (
        <>

            <div className={`container-fluid`}>
                <div className={`row related-articles images-slider`}>
                    <div className="col-12 col-lg-10 offset-lg-1">
                        {node.field_slider_title ? <div dangerouslySetInnerHTML={{ __html: node.field_slider_title.processed }} className={`images-slider-header`}></div> : ""}
                        {node.field_slider_subtitle ? <div dangerouslySetInnerHTML={{ __html: node.field_slider_subtitle.processed }} className={`images-slider-subtitle`}></div> : ""}
                    </div>
                    <div className={`col-12 col-lg-11 offset-lg-1 related-col`}>

                        <div style={{ width: "100%" }}>
                            <div class="taggbox-container" style={{ width: "100%", height: "100%", overflow: "auto" }}>
                                <div className="taggbox-socialwall" data-wall-id="68607" view-url="https://commerce.taggbox.com/68607"></div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}


export default ImagesSlider

export const fragment = graphql`
    fragment paragraphImagesSlider on paragraph__images_slider {
        id
        field_slider_title {
            processed
          }
          field_slider_subtitle {
            processed
          }
    }`