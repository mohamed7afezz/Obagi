import React, { useEffect } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import * as featuredStyles from '../assets/scss/components/featured.module.scss'
import { GatsbyImage } from "gatsby-plugin-image";
import Player from '@vimeo/player'
import playbtnimg from "../assets/images/product-images/PlayVideo.svg"

function playvideo(event) {
  let iframeContainer, player, playerOpts = {
    url: ''
  }

  let url = event.target.parentNode.getAttribute("href");
  playerOpts.url = url;

  if (!playerOpts.url.indexOf('youtube') > -1) {
    document.querySelector('.video-popup-wrap').innerHTML = '<iframe class="embed-responsive-item" src="' + url + '?rel=0&autoplay=true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

    return;
  }

  player = new Player.Vimeo(document.querySelector('#VideoPopUp iframe'), playerOpts);

  player.play();


}

const Featured = ({ node }) => {

  const data = useStaticQuery(graphql`
      query MyQuery {
        allTaxonomyTermClinicalGroups {
          edges {
            node {
              name
              path {
                alias
              }
              relationships {
                node__clinical_product {
                  path {
                    alias
                  }
                }
              }
            }
          }
        }
      }


`)


  let currentName = node.field_featured_title ? node.field_featured_title.processed : null;
  let productCount = 0;
  let taxonomy = data.allTaxonomyTermClinicalGroups.edges.filter(item => {
    if (currentName) {
      return currentName.includes(item.node.name.split(' ')[0])

    }
  })[0];
  let paragraphId = node.field_featured_paragraph_id ? node.field_featured_paragraph_id.processed : null;


  productCount = taxonomy ? taxonomy.node.relationships.node__clinical_product.length : 0;

  let isMedicalProduct = node.relationships && node.relationships.node__medical_product? true : false
 

  return <>
    <div name={paragraphId ? paragraphId : ""} id={paragraphId ? paragraphId : ""} className={`container-fluid d-lg-none ${featuredStyles.wrapper} ${isMedicalProduct? featuredStyles.medicalWrapper : featuredStyles.clinicalWrapper}`}>
      <div className="row">
        <div className="col-12">

          <div className="video-wrapper">

            <div className={["img-wrap", featuredStyles.imageWrap].join(" ")}>
              {node.relationships && node.relationships.field_featured_video ?
                <>
                  <a className="popupvideo" data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href={node.relationships && node.relationships.field_featured_video ? node.relationships.field_featured_video.field_video_link : ''} className="playbtn">
                    <img className={["playbtnimg", featuredStyles.play].join(" ")} src={playbtnimg} alt="videomsg" />
                  </a>
                  {node.relationships.field_featured_video.relationships.field_video_poster ?
                    <GatsbyImage
                      image={node.relationships.field_featured_video.relationships.field_video_poster.localFile.childImageSharp.gatsbyImageData}
                      alt="img"
                      className={featuredStyles.videoimg} /> : ""}
                </>
                :
                node.relationships && node.relationships.field_featured_image && node.relationships.field_featured_image.localFile ? <GatsbyImage
                  image={node.relationships.field_featured_image.localFile.childImageSharp.gatsbyImageData}
                  alt="img"
                  className={featuredStyles.videoimg} /> : ""
              }
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className={featuredStyles.textWrapper}>
            {node.field_featured_subtitle ? <div className={["subtitle", featuredStyles.subtitle].join(" ")} dangerouslySetInnerHTML={{ __html: node.field_featured_subtitle.processed }}></div> : ""}
            {node.field_featured_title ? <h3 dangerouslySetInnerHTML={{ __html: node.field_featured_title.processed }} className={featuredStyles.title}></h3> : ""}
            {node.field_featured_products_title ? <div className={featuredStyles.products}><Link to={node.field_featured_button.uri.replace('internal:', '')} ><div dangerouslySetInnerHTML={{ __html: node.field_featured_products_title.processed }}></div> (<span className={featuredStyles.productsNo}>{" " + productCount}</span>)</Link></div> : ""}
            {node.field_featured_description ? <div dangerouslySetInnerHTML={{ __html: node.field_featured_description.processed }} className={featuredStyles.description}></div> : ""}
            {node.field_featured_perfect_title && node.relationships.field_issues_categories ? <div className={featuredStyles.perfect}><div dangerouslySetInnerHTML={{ __html: node.field_featured_perfect_title.processed }}></div>{node.relationships.field_issues_categories.map((item, index) => {
              return <span className={featuredStyles.category}><Link to={item.path.alias}> {item.name}</Link>{index === node.relationships.field_issues_categories.length - 1 ? '' : ', '}</span>
            })} </div> : " "}
            {node.field_featured_button ? <div className={featuredStyles.linkSection}><Link to={node.field_featured_button.uri.replace('internal:', '')} className="button-link">{node.field_featured_button.title}</Link></div> : ""}
          </div>
        </div>
      </div>
    </div>


    {node.field_image_right == true ?
      <div className={`container-fluid d-none d-lg-block ${featuredStyles.containerWrapper} ${isMedicalProduct? featuredStyles.medicalWrapper : featuredStyles.clinicalWrapper}`} name={paragraphId ? paragraphId : ""} id={paragraphId ? paragraphId : ""} >
        <div className="row">

          <div className={["col-lg-5", "offset-lg-1", featuredStyles.columnsWrapper].join(" ")}>
            <div className={`col-lg-7 offset-lg-2 ${featuredStyles.textCol}`}>
              {node.field_featured_subtitle ? <div className={["subtitle", featuredStyles.subtitle].join(" ")} dangerouslySetInnerHTML={{ __html: node.field_featured_subtitle.processed }}></div> : ""}
              {node.field_featured_title ? <h3 dangerouslySetInnerHTML={{ __html: node.field_featured_title.processed }} className={featuredStyles.title}></h3> : ""}
              {node.field_featured_products_title ? <div className={featuredStyles.products}><div dangerouslySetInnerHTML={{ __html: node.field_featured_products_title.processed }}></div>(<span className={featuredStyles.productsNo}>{" " + productCount}</span>) {node.field_featured_button ? <span className={featuredStyles.view}><Link to={node.field_featured_button.uri.replace('internal:', '')}>VIEW ALL</Link></span> : ""}</div> : ""}
              {node.field_featured_description ? <div dangerouslySetInnerHTML={{ __html: node.field_featured_description.processed }} className={featuredStyles.description}></div> : ""}
              {node.field_featured_perfect_title && node.relationships.field_issues_categories ? <div className={featuredStyles.perfect}><div dangerouslySetInnerHTML={{ __html: node.field_featured_perfect_title.processed }}></div>{node.relationships.field_issues_categories.map((item, index) => {
                return <span className={featuredStyles.category}><Link to={item.path.alias}> {" " + item.name}</Link>{index === node.relationships.field_issues_categories.length - 1 ? '' : ', '}</span>
              })} </div> : ""}
              {node.field_featured_button ? <div className={featuredStyles.linkSection}><Link to={node.field_featured_button.uri.replace('internal:', '')} className={["button-link", featuredStyles.link].join(" ")}>{node.field_featured_button.title}</Link></div> : ""}
            </div>
          </div>

          <div className={["col-lg-5", "col-right-padding", "pl-0", featuredStyles.columnsWrapper].join(" ")}>
            <div className="video-wrapper">
              <div className={["img-wrap", featuredStyles.imageWrap].join(" ")}>
                {node.relationships && node.relationships.field_featured_video ?
                  <>
                    <a className="popupvideo" data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href={node.relationships && node.relationships.field_featured_video ? node.relationships.field_featured_video.field_video_link : ''} className="playbtn">
                      <img className={["playbtnimg", featuredStyles.play].join(" ")} src={playbtnimg} alt="videomsg" />
                    </a>
                    {node.relationships.field_featured_video.relationships.field_video_poster &&node.relationships.field_featured_video.relationships.field_video_poster.localFile ?
                      <GatsbyImage
                        image={node.relationships.field_featured_video.relationships.field_video_poster.localFile.childImageSharp.gatsbyImageData}
                        alt="img"
                        className={featuredStyles.videoimg} />
                      : ""}
                  </>
                  : node.relationships.field_featured_image && node.relationships.field_featured_image.localFile ? <GatsbyImage
                  image={node.relationships.field_featured_image.localFile.childImageSharp.gatsbyImageData}
                  alt="img"
                  className={featuredStyles.videoimg} />
                    : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      :

      <div className={`container-fluid d-none d-lg-block ${featuredStyles.containerWrapper} ${isMedicalProduct? featuredStyles.medicalWrapper : featuredStyles.clinicalWrapper}`}  name={paragraphId ? paragraphId : ""} id={paragraphId ? paragraphId : ""}>
        <div className={["row", featuredStyles.imageLeft].join(" ")}>

          <div className={["col-lg-5", "offset-lg-1", "col-left-padding", "pr-0", featuredStyles.columnsWrapper].join(" ")}>
            <div className="video-wrapper">
              <div className={["img-wrap", featuredStyles.imageWrap].join(" ")}>
                {node.relationships && node.relationships.field_featured_video ?
                  <>
                    <a className="popupvideo" data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href={node.relationships && node.relationships.field_featured_video ? node.relationships.field_featured_video.field_video_link : ''} className="playbtn">
                      <img className={["playbtnimg", featuredStyles.play].join(" ")} src={playbtnimg} alt="videomsg" />
                    </a>

                    {node.relationships && node.relationships.field_featured_video.relationships.field_video_poster && node.relationships.field_featured_video.relationships.field_video_poster.localFile ?
                      <GatsbyImage
                        image={node.relationships.field_featured_video.relationships.field_video_poster.localFile.childImageSharp.gatsbyImageData}
                        alt="img"
                        className={featuredStyles.videoimg} />
                      : ""}</>
                  :
                  node.relationships && node.relationships.field_featured_image && node.relationships.field_featured_image.localFile ? <GatsbyImage
                    image={node.relationships.field_featured_image.localFile.childImageSharp.gatsbyImageData}
                    alt="img"
                    className={featuredStyles.videoimg} />
                    : ""}
              </div>
            </div>
          </div>

          <div className={["col-lg-5", featuredStyles.columnsWrapper, featuredStyles.imageLeft].join(" ")}>
            <div className={`col-lg-7 offset-lg-2 ${featuredStyles.textCol}`}>
              {node.field_featured_subtitle ? <div className={["subtitle", featuredStyles.subtitle].join(" ")} dangerouslySetInnerHTML={{ __html: node.field_featured_subtitle.processed }}></div> : ""}
              {node.field_featured_title ? <h3 dangerouslySetInnerHTML={{ __html: node.field_featured_title.processed }} className={featuredStyles.title}></h3> : ""}
              {node.field_featured_products_title ? <div className={featuredStyles.products}><div dangerouslySetInnerHTML={{ __html: node.field_featured_products_title.processed }}></div> (<span className={featuredStyles.productsNo}>{" " + productCount}</span>) {node.field_featured_button ? <span className={featuredStyles.view}><Link to={node.field_featured_button.uri.replace('internal:', '')}>VIEW ALL</Link></span> : ""}</div> : ""}
              {node.field_featured_description ? <div dangerouslySetInnerHTML={{ __html: node.field_featured_description.processed }} className={featuredStyles.description}></div> : ""}
              {node.field_featured_perfect_title && node.relationships.field_issues_categories ? <div className={featuredStyles.perfect}><div dangerouslySetInnerHTML={{ __html: node.field_featured_perfect_title.processed }}></div> {node.relationships.field_issues_categories.map((item, index) => {
                return <span className={featuredStyles.category}><Link to={item.path.alias}> {item.name}</Link>{index === node.relationships.field_issues_categories.length - 1 ? '' : ', '}</span>
              })} </div> : ""}
              {node.field_featured_button ? <div className={featuredStyles.linkSection}><Link to={node.field_featured_button.uri.replace('internal:', '')} className={["button-link", featuredStyles.link].join(" ")}>{node.field_featured_button.title}</Link></div> : ""}
            </div>
          </div>


        </div>
      </div>
    }
  </>;
}

export default Featured

export const fragment = graphql`fragment paragraphFeaturedSection on paragraph__featured_section {
  id
  field_featured_paragraph_id {
    processed
  }
  field_featured_button {
    title
    uri
  }
  field_featured_description {
    processed
  }
  field_featured_title {
    processed
  }
  field_featured_perfect_title {
    processed
  }
  field_featured_products_title {
    processed
  }
  field_featured_subtitle {
    processed
  }
  field_image_right
  relationships {
    node__medical_product {
      field_medical_id
    }
    field_featured_image {
      localFile {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          original {
            src
          }
        }
      }
    }
    field_featured_video {
      field_video_link
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
  }
}
`;



