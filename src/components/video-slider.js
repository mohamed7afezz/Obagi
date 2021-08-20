import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import Slider from "react-slick"
import Img from 'gatsby-image'
import styles from '../assets/scss/components/video-slider.module.scss'
import playbtnimg from "../assets/images/product-images/PlayVideo.svg"


const VideoSlider = ({ node }) => {
    const [nav1, setNav1] = React.useState(null)
    const [nav2, setNav2] = React.useState(null)
    const [slidesCurr, setSlidesCurr] = useState([]);

    let slider1 = []
    let slider2 = []

    React.useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [slider1, slider2])


    const SingleSliderSettings = {
        //lg-screen
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        dots: false,
        responsive: [
            {
                //mob-screen
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    dots: false,
                    slidesToShow: 1,
                }
            },
        ]
    }

    const MultiSliderSettings = {
        //lg-screen
        infinite: false,
        speed: 500,
        slidesToShow: 3.25,
        arrows: true,
        dots: false,
        vertical: true,
        verticalSwiping: true,
        responsive: [
            {
                //mob-screen
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    dots: true,
                    slidesToShow: 2,
                    vertical: false,
                    verticalSwiping: false,
                }
            },
        ]
    }

    function slickGoToslide(int) {
        slider1.slickGoTo(int)
    }

    return (
        <>

            <div className={`container-fluid ${styles.wrapper}`}>
                <div className={`row`}>
                    <div className={`col-12 col-lg-10 offset-lg-1`}>
                        {node.field_main_video_header ? <div className={`${styles.header}`} dangerouslySetInnerHTML={{ __html: node.field_main_video_header.processed }}></div> : ""}
                    </div>
                </div>

                <div className={`row ${styles.slidersRow}`}>
                    <div className={`col-12 col-lg-6 offset-lg-1 mainVideoSlider`}>
                        <div className={`row`}>
                            <div style={{ width: "100%" }}>
                                <Slider
                                    asNavFor={nav2}
                                    ref={slider => (slider1 = slider)}
                                    {...SingleSliderSettings}
                                >

                                    {node.relationships && node.relationships.field_video_section ?
                                        node.relationships.field_video_section.map((item, index) => {
                                            return (
                                                <div className={`col-12`}>
                                                    <div className={`${styles.mainVidWrapper}`}>

                                                        {item.relationships
                                                            && item.relationships.field_video_sec_thumb
                                                            && item.relationships.field_video_sec_thumb.localFile
                                                            && item.relationships.field_video_sec_thumb.localFile.childImageSharp ?
                                                            <div className={`${styles.vidPoster}`}>
                                                                <Img fluid={item.relationships.field_video_sec_thumb.localFile.childImageSharp.fluid} />
                                                                <img class={`${styles.playBtn}`} src={playbtnimg} alt="videomsg" />
                                                            </div>
                                                            : ""}

                                                        {item.field_video_sec_title ? <div className={`${styles.mainTitle}`} dangerouslySetInnerHTML={{ __html: item.field_video_sec_title.processed }}></div> : ""}

                                                    </div>
                                                </div>
                                            )
                                        })

                                        : ""}
                                </Slider>
                            </div>

                        </div>
                    </div>
                    <div className={`col-12 col-lg-4 secVidSlider`}>


                        <div className={`row`}>
                            <div style={{ width: "100%" }}>
                                <Slider
                                    {...MultiSliderSettings}
                                    asNavFor={nav1}
                                    ref={slider => (slider2 = slider)}
                                >
                                    {node.relationships && node.relationships.field_video_section ?
                                        node.relationships.field_video_section.map((item, index) => {
                                            return (
                                                <div className={`col-12`} onClick={(e) => slickGoToslide(index)}>
                                                    <div className={`row ${styles.secVidWrapper}`}>

                                                        <div className={`col-12 col-lg-6`}>
                                                            {item.relationships
                                                                && item.relationships.field_video_sec_thumb
                                                                && item.relationships.field_video_sec_thumb.localFile
                                                                && item.relationships.field_video_sec_thumb.localFile.childImageSharp ?
                                                                <div className={`${styles.vidPoster}`}>
                                                                    <Img fluid={item.relationships.field_video_sec_thumb.localFile.childImageSharp.fluid} />
                                                                    <img class={`${styles.playBtn}`} src={playbtnimg} alt="videomsg" />
                                                                </div>
                                                                : ""}
                                                        </div>

                                                        <div className={`col-12 col-lg-6`}>
                                                            <div className={`${styles.secVidData}`}>
                                                                {item.field_video_sec_title ? <div className={`${styles.secTitle}`} dangerouslySetInnerHTML={{ __html: item.field_video_sec_title.processed }}></div> : ""}


                                                            </div>
                                                        </div>
                                                        {/* <div className={`col-12 col-lg-6 ${styles.bottomBorder}`}>
                                                            <div></div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            )
                                        })

                                        : ""}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default VideoSlider

export const fragment = graphql`
    fragment paragraphVideoSlider on paragraph__video_slider {
        id
        field_main_video_header {
            processed
          }
          relationships {
            field_video_section {
              field_video_sec_link
              field_video_sec_title {
                processed
              }
              relationships {
                field_video_sec_thumb {
                  localFile {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
    }`