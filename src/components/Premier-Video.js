import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import playbtnimg from "../assets/images/product-images/PlayVideo.svg"
import Player from '@vimeo/player';

const PremierVideo = ({ node }) => {
  function playvideo(event) {
    event.preventDefault()
    let iframeContainer, player, playerOpts = {
      url: ''
    }

    let url = event.target.parentNode.getAttribute("data-link");

    playerOpts.url = url;

    if (!playerOpts.url.indexOf('youtube') > -1 || !playerOpts.url.indexOf('youtu') > -1) {
      document.querySelector('.video-popup-wrap').innerHTML = '<iframe class="embed-responsive-item" src="' + url + '?rel=0&autoplay=true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

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
  return (
    <div className="permier-video-link video-link">
      {node.relationships && node.relationships.field_video_poster && node.relationships.field_video_poster.localFile && node.relationships.field_video_poster.localFile.childImageSharp ?
        <GatsbyImage
          image={node.relationships.field_video_poster.localFile.childImageSharp.gatsbyImageData}
          alt="img"
          className="video-img-mob" />
        : ""}
      <div className="video-wrapper">
        {
          <div className="img-wrap">
            <a data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href="#" data-link={node.field_video_link} class=" popupvideo playbtn">
              <img class="playbtnimg mob-change" src={playbtnimg} alt="videomsg" />
            </a>
            {node.field_video_txt ? <p className="text-wrap">{node.field_video_txt}</p> : ""}
          </div>

        }
      </div>
    </div>
  );
}

export default PremierVideo

export const fragment = graphql`fragment paragraphPremierVideo on paragraph__video {
  id
  field_video_link
  field_video_txt
  relationships {
    field_video_poster {
      localFile {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          original {
            src
          }
        }
      }
    }
  }
}
`
