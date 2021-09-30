import React from 'react'
import { graphql, Link } from 'gatsby'
import * as articleStyles from '../assets/scss/components/article-video.module.scss'
import { GatsbyImage } from "gatsby-plugin-image";
import playbtnimg from "../assets/images/product-images/PlayVideo.svg"
import Player from '@vimeo/player';

const ArticleVideo = ({ node }) => {

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


  let videoPoster = node.relationships
    && node.relationships.field_article_video
    && node.relationships.field_article_video.relationships
    && node.relationships.field_article_video.relationships.field_video_poster
    && node.relationships.field_article_video.relationships.field_video_poster.localFile
    && node.relationships.field_article_video.relationships.field_video_poster.localFile.childImageSharp ? true : false;

  let videoLink = node.relationships
    && node.relationships.field_article_video
    && node.relationships.field_article_video.field_video_link ? true : false;


  return (
    <div className={`container-fluid ${articleStyles.container}`}>
      <div className={`row`}>
        <div className={`col-12 col-lg-10 offset-lg-1 ${articleStyles.videoCol} ${articleStyles.colPadding}`}>
          <div className="video-link article-video-link">
            {videoPoster ?
              <GatsbyImage
                image={node.relationships.field_article_video.relationships.field_video_poster.localFile.childImageSharp.gatsbyImageData}
                alt="img"
                className="video-img-mob" />
              : ""}
            {videoLink ?
              <div className="video-wrapper">
                {
                  <div className="img-wrap">
                    <a data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href="#" data-link={node.relationships.field_article_video.field_video_link} class=" popupvideo playbtn">
                      <img class="playbtnimg mob-change" src={playbtnimg} alt="videomsg" />
                    </a>
                    {node.field_video_txt ? <p className="text-wrap">{node.field_video_txt}</p> : ""}
                  </div>

                }
              </div>
              : ""}
          </div>

        </div>
      </div>

      <div className={`row`}>
        <div className={`col-12 col-lg-9 offset-lg-2 ${articleStyles.textCol} `}>
          <div className={`${articleStyles.deskText}`}>
            {node.field_article_subtitle ? <div className={`subtitle ${articleStyles.subtitle}`} dangerouslySetInnerHTML={{ __html: node.field_article_subtitle.processed }}></div> : ""}
            {node.field_article_title ? <div className={`${articleStyles.title}`} dangerouslySetInnerHTML={{ __html: node.field_article_title.processed }}></div> : ""}
            {node.field_article_description ? <div className={`${articleStyles.description}`} dangerouslySetInnerHTML={{ __html: node.field_article_description.processed }}></div> : ""}
            {node.field_article_link?node.field_article_link.title ? <Link className={`button-link ${articleStyles.link}`} to={node.field_article_link.uri.replace('internal:', '')}>{node.field_article_link.title}</Link> : "":""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleVideo

export const fragment = graphql`fragment paragraphArticleVideo on paragraph__article_video {
  id
  field_article_subtitle {
    processed
  }
  field_article_title {
    processed
  }
  field_article_description {
    processed
  }
  field_article_link {
    title
    uri
  }
  relationships {
    field_article_video {
      field_video_link
      relationships {
        field_video_poster {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
}
`