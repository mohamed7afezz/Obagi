import React from 'react'

import howto from '../../assets/scss/components/howtouse.module.scss'
import Img from 'gatsby-image'
import playbtnimg from "../../assets/images/product-images/PlayVideo.svg"
import Player from '@vimeo/player';
import { useStaticQuery, graphql } from "gatsby"




function playvideo(event) {
    let iframeContainer, player, playerOpts = {
        url: ''
    }
    console.log("hassan",)
    let url = event.target.parentNode.getAttribute("href")
    console.log(url)
    playerOpts.url = url
    console.log(playerOpts.url)
    if (!playerOpts.url.indexOf('youtube') > -1) {
        document.querySelector('.video-popup-wrap').innerHTML = '<iframe class="embed-responsive-item" src="' + url + '?rel=0&autoplay=true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        console.log(document.querySelector('.video-popup-wrap'))
        return;
    }

    player = new Player.Vimeo(document.querySelector('#VideoPopUp iframe'), playerOpts);

    player.play();

}
function SetVideoTime(time, video, endTime) {
    video.setCurrentTime(time);
    if (endTime) {
        video.on('timeupdate', function (data) {
            if (data.seconds > endTime) {
                video.pause();
                video.off('timeupdate');
            }
        })
    }
}

const Howtouse = ({ node }) => {


    function hcollapse(e) {
        var $collapsedata = document.querySelectorAll('.allstep')
        var $collapsebtn = document.querySelectorAll('.collapsebtn')
        for (let i = 0; i < $collapsebtn.length; i++) {

            let colorbtn = $collapsebtn[i]
            if (!colorbtn.classList.contains("collapsed")) {
                colorbtn.classList.add('collapsed')

            }
            e.target.classList.remove('collapsed')
        }
        for (let i = 0; i < $collapsedata.length; i++) {


            let elementid = $collapsedata[i].id;
            let element = $collapsedata[i];
            if (element.classList.contains("show")) {
                element.classList.remove('show')

            }
            if (e.target.getAttribute('data-target') == elementid) {
                element.classList.add("show");

            }
        }
    }

    return (
        <div className={["container-fluid", howto.howtousecon, "howtousecon"].join(" ")} >
            <div className={["row", howto.ordering].join(" ")}>
                <div className={["col-12", "col-lg-10", "offset-lg-1", "allcon", howto.allcon].join(" ")}>
                    <div class="row">

                        <div id="accordion" className={['col-12', 'd-flex', "mobflexwrap"].join(" ")}>
                            <div className={["col-12", "col-lg-4", "offset-lg-1", howto.howLeftcol].join(" ")}>
                                <h1 className={howto.howtousehead}>{node.field_how_to_use_title.processed}</h1>
                                {/* steps btns */}
                                <div className={["d-flex", howto.tabs].join(" ")}>
                                    {
                                        node.relationships.field_step_paragragh.length > 1 ? node.relationships.field_step_paragragh.map((item, index) => (

                                            <div className={[howto.tab, "card ", "col-lg-4", "col-6"].join(" ")}>
                                                <div className={[howto.cardhead, "card-header"].join(" ")} >
                                                    <h5 class="mb-16">
                                                        <button onClick={(e) => { hcollapse(e); }} className={[howto.btnLink1, "collapsebtn", "btn-link", "btn ", index == 0 ? '' : 'collapsed'].join(" ")} data-target={'step' + index}>{item.field_step_title.processed}</button>
                                                    </h5>
                                                </div>
                                            </div>
                                        )) : ''

                                    }
                                </div>

                                {/* steps card */}
                                {
                                    node.relationships.field_step_paragragh.map((item, index) => (
                                        <div id={'step' + index} class={index == 0 ? 'collapse show allstep' : 'collapse allstep'} >
                                            <div class="card-body">
                                                <div className={howto.tabdesc} dangerouslySetInnerHTML={{ __html: item.field_step_all_content.processed }}></div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>



                            <div className={["col-12", "col-lg-6", "offset-lg-1", "howrightcol", howto.howrightcol].join(" ")}>
                                <h1 className={howto.howtouseheadimage}>{node.field_how_to_use_title.processed}</h1>

                                {/* steps image */}
                                {
                                    node.relationships.field_step_paragragh.map((item, index) => (
                                        <div style={{ width: '100%' }} id={'step' + index} class={index == 0 ? 'collapse show allstep' : 'collapse allstep'}>

                                            <div class="card-body ">
                                                {item.relationships.field_step_image ?
                                                    <Img fluid={item.relationships.field_step_image.localFile.childImageSharp.fluid} className={["col-12", "pr-0", "pl-0"].join(" ")} />
                                                    :
                                                    <div className="video-wrapper">

                                                        <div className="img-wrap">
                                                            <a class="popupvideo" data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href={item.relationships.field_video.field_video_link} class="playbtn">
                                                                <img class="playbtnimg" src={playbtnimg} alt="videomsg" />
                                                            </a>
                                                            {
                                                                item.relationships.field_video.relationships.field_video_poster?
                                                                    <Img fluid={item.relationships.field_video.relationships.field_video_poster.localFile.childImageSharp.fluid} className={["col-12", "pr-0", "pl-0"].join(" ")} />
                                                                    : 
                                                                    ''
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Howtouse

export const fragment = graphql`
    fragment howToUseParagraph on paragraph__how_to_use {
        id
        field_how_to_use_title {
            processed
        }
        relationships {
            field_step_paragragh {
                field_step_all_content {
                    processed
                }
                field_step_title {
                    processed
                }
                relationships {
                    field_video {
                        relationships {
                          field_video_poster {
                            localFile {
                              childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                              }
                            }
                          }
                        }
                        field_video_link
                      }
                    field_step_image {
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
    }
`;