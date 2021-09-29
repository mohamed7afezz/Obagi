import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import Slider from "react-slick"
import Img from 'gatsby-image'
import * as styles from '../assets/scss/components/video-slider.module.scss'
import playbtnimg from "../assets/images/product-images/PlayVideo.svg"

var player;
var YT;

const VideoSlider = ({ node }) => {
    const [nav1, setNav1] = React.useState(null)
    const [nav2, setNav2] = React.useState(null)
    const [slidesCurr, setSlidesCurr] = useState([]);
    let videoId;
    let slider1 = []
    let slider2 = []

    React.useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [slider1, slider2])

    useEffect(() => {
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.

        if (typeof window !== 'undefined' && document.querySelector('ytplayer') !== undefined) {
            // window.onYouTubeIframeAPIReady = function() { 
            // }
            console.log('bahiii',  document.querySelector('#ytplayer'))
            onYouTubeIframeAPIReady();
        }
    }, [])

    
    function onYouTubeIframeAPIReady() {
        YT = window.YT;

        let videoIdArr = node.relationships && node.relationships.field_video_section[0] && node.relationships.field_video_section[0].field_video_sec_link? node.relationships.field_video_section[0].field_video_sec_link.split('/') : ''
        videoId = videoIdArr[videoIdArr.length-1]
        player = new YT.Player('ytplayer', {
            // height: '390',
            // width: '640',
            videoId: videoId,
            playerVars: {
                'playsinline': 1
            },
            // events: {
                // 'onReady': onPlayerReady,
                // 'onStateChange': onPlayerStateChange
            // }
        });
    
    }

    // 4. The API will call this function when the video player is ready.
    // function onPlayerReady(event) {
    //     event.target.playVideo();
    // }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    // var done = false;
    // function onPlayerStateChange(event) {
    //     if (event.data == YT.PlayerState.PLAYING && !done) {
    //         setTimeout(stopVideo, 6000);
    //         done = true;
    //     }
    // }
    // function stopVideo() {
    //     player.stopVideo();
    // }

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
                breakpoint: 992,
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
        slidesToShow: 3,
        arrows: true,
        dots: false,
        vertical: true,
        verticalSwiping: true,
        responsive: [
            {
                //mob-screen
                breakpoint: 992,
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

    function getVideoId(str) {
        let strArr = str.split('/');
        let vidId = strArr[strArr.length-1];
        console.log('ash vid', `${vidId}`)
        
        YT = window.YT;
        

        console.log('bahiii', player, YT);
        player.loadVideoById(vidId)
        return vidId
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
                            <div className={`col-12`}>


                                <div className={`${styles.videoWrapper}`}>
                                    <div id="ytplayer"></div>
                                </div>
                            </div>
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
                                                <>
                                                    <div className={`col-12 ${styles.secVidWrapper}`} onClick={(e) => {slickGoToslide(index); getVideoId(item.field_video_sec_link? item.field_video_sec_link : '')}}>
                                                       
                                                        {item.relationships
                                                            && item.relationships.field_video_sec_thumb
                                                            && item.relationships.field_video_sec_thumb.localFile
                                                            && item.relationships.field_video_sec_thumb.localFile.childImageSharp ?
                                                            <div className={`${styles.vidPoster}`}>
                                                                <Img fluid={item.relationships.field_video_sec_thumb.localFile.childImageSharp.fluid} />
                                                                <img class={`${styles.playBtn}`} src={playbtnimg} alt="videomsg" />
                                                            </div>
                                                            : ""}
                                                  
                                                        <div className={`${styles.secVidData}`}>
                                                            {item.field_video_sec_title ? <div className={`${styles.secTitle}`} dangerouslySetInnerHTML={{ __html: item.field_video_sec_title.processed }}></div> : ""}

                                                        </div>

                                            
                                                    </div>
                                                    <div className={`${styles.bottomBorder} d-none d-lg-block col-lg-6 offset-lg-6`}>
                                                        <div></div>
                                                    </div>

                                                </>

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