import React from 'react'
import { graphql } from 'gatsby'
import Slider from "react-slick"
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

const ImagesSlider = ({ node }) => {

    const SliderSetting2 = {
        infinite: false,
        speed: 500,
        slidesToShow: 3.8,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 1,
                }
            },
        ]
    }

    console.log('ash node', node)
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
                            <Slider {...SliderSetting2}>
                                {node.relationships
                                    && node.relationships.field_slider_image ?
                                    node.relationships.field_slider_image.map((item, index) => {

                                        return (
                                            (item.localFile && item.localFile.childImageSharp ?
                                                <div className={`imgWrapper`}>
                                                    <Img fluid={item.localFile.childImageSharp.fluid} />
                                                    <div className={`igIcon`}><FontAwesomeIcon icon={faInstagram} /></div>
                                                </div>
                                                : "")
                                        )

                                    }) : ""}
                            </Slider>
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
          relationships {
            field_slider_image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
    }`