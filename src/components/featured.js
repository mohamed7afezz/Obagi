import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import featuredStyles from '../assets/scss/components/featured.module.scss'
import Img from 'gatsby-image'
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


let currentName = node.field_featured_title.processed;
let productCount = 0;
let taxonomy = data.allTaxonomyTermClinicalGroups.edges.filter(item => {
  return currentName.includes(item.node.name.split(' ')[0])
})[0];

//console.log('current', currentName)

productCount = taxonomy.node.relationships.node__clinical_product? taxonomy.node.relationships.node__clinical_product.length : 0;
  return (

    <div>
      <div className={["container-fluid", "d-lg-none", featuredStyles.wrapper].join(" ")}>
        <div className="row">
          <div className="col-12">

            <div className="video-wrapper">

              <div className={["img-wrap", featuredStyles.imageWrap].join(" ")}>
                <a className="popupvideo" data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href={node.relationships.field_featured_video ? node.relationships.field_featured_video.field_video_link : ''} className="playbtn">
                  <img className={["playbtnimg", featuredStyles.play].join(" ")} src={playbtnimg} alt="videomsg" />
                </a>
                {node.relationships.field_featured_video ? <Img fluid={node.relationships.field_featured_video.relationships.field_video_poster?node.relationships.field_featured_video.relationships.field_video_poster.localFile.childImageSharp.fluid:""} /> : ''}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className={featuredStyles.textWrapper}>
              <div className={["subtitle", featuredStyles.subtitle].join(" ")}>Featured</div>
              <div dangerouslySetInnerHTML={{ __html: node.field_featured_title.processed }} className={featuredStyles.title}></div>
              <div className={featuredStyles.products}><Link to={node.field_featured_button.uri.replace('internal:', '')} >PRODUCTS (<span className={featuredStyles.productsNo}>{productCount}</span>)</Link></div>
              <div dangerouslySetInnerHTML={{ __html: node.field_featured_description.processed }} className={featuredStyles.description}></div>
              <div className={featuredStyles.perfect}>PERFECT FOR: {node.relationships.field_issues_categories.map((item, index) => {
                  return <span className={featuredStyles.category}><Link to={item.path.alias}> {item.name}</Link>{index === node.relationships.field_issues_categories.length - 1? '' : ', '}</span>
              })} </div>
              <div className={featuredStyles.linkSection}><Link to={node.field_featured_button.uri.replace('internal:', '')} className="button-link">{node.field_featured_button.title}</Link></div>
            </div>
          </div>
        </div>
      </div>


      {node.field_image_right == true ? <div className={[featuredStyles.containerWrapper, "d-none d-lg-block"].join(" ")}>
        <div className="container-fluid d-none d-lg-block">
          <div className="row">

            <div className={["col-lg-5", "offset-lg-1", featuredStyles.columnsWrapper].join(" ")}>
              <div className="col-lg-7 offset-lg-2">
                <div className={["subtitle", featuredStyles.subtitle].join(" ")}>Featured</div>
                <div dangerouslySetInnerHTML={{ __html: node.field_featured_title.processed }} className={featuredStyles.title}></div>
                <div className={featuredStyles.products}>PRODUCTS (<span className={featuredStyles.productsNo}>{productCount}</span>) <span className={featuredStyles.view}><Link to={node.field_featured_button.uri.replace('internal:', '')}>VIEW ALL</Link></span></div>
                <div dangerouslySetInnerHTML={{ __html: node.field_featured_description.processed }} className={featuredStyles.description}></div>
                <div className={featuredStyles.perfect}>PERFECT FOR: {node.relationships.field_issues_categories.map((item, index) => {
                  return <span className={featuredStyles.category}><Link to={item.path.alias}> {item.name}</Link>{index === node.relationships.field_issues_categories.length - 1? '' : ', '}</span>
              })} </div>
                <div className={featuredStyles.linkSection}><Link to={node.field_featured_button.uri.replace('internal:', '')} className={["button-link", featuredStyles.link].join(" ")}>{node.field_featured_button.title}</Link></div>
              </div>
            </div>

            <div className={["col-lg-5", "col-right-padding", "pl-0", featuredStyles.columnsWrapper].join(" ")}>
              <div className="video-wrapper">
                <div className={["img-wrap", featuredStyles.imageWrap].join(" ")}>
                  <a className="popupvideo" data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href={node.relationships.field_featured_video ? node.relationships.field_featured_video.field_video_link : ''} className="playbtn">
                    <img className={["playbtnimg", featuredStyles.play].join(" ")} src={playbtnimg} alt="videomsg" />
                  </a>
                  {node.relationships.field_featured_video ? <Img fluid={node.relationships.field_featured_video.relationships.field_video_poster?node.relationships.field_featured_video.relationships.field_video_poster.localFile.childImageSharp.fluid:""} /> : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        :
        <div className={[featuredStyles.containerWrapper, "d-none d-lg-block"].join(" ")}>
          <div className="container-fluid d-none d-lg-block">
            <div className={["row", featuredStyles.imageLeft].join(" ")}>

              <div className={["col-lg-5", "offset-lg-1", "col-left-padding", "pr-0", featuredStyles.columnsWrapper].join(" ")}>
                <div className="video-wrapper">
                  <div className={["img-wrap", featuredStyles.imageWrap].join(" ")}>
                    <a className="popupvideo" data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href={node.relationships.field_featured_video ? node.relationships.field_featured_video.field_video_link : ''} className="playbtn">
                      <img className={["playbtnimg", featuredStyles.play].join(" ")} src={playbtnimg} alt="videomsg" />
                    </a>
                    {node.relationships.field_featured_video ? <Img fluid={node.relationships.field_featured_video.relationships.field_video_poster?node.relationships.field_featured_video.relationships.field_video_poster.localFile.childImageSharp.fluid:''} /> : ''}
                  </div>
                </div>
              </div>

              <div className={["col-lg-5", featuredStyles.columnsWrapper, featuredStyles.imageLeft].join(" ")}>
                <div className="col-lg-7 offset-lg-2">
                  <div className={["subtitle", featuredStyles.subtitle].join(" ")}>Featured</div>
                  <div dangerouslySetInnerHTML={{ __html: node.field_featured_title.processed }} className={featuredStyles.title}></div>
                  <div className={featuredStyles.products}>PRODUCTS (<span className={featuredStyles.productsNo}>{productCount}</span>) <span className={featuredStyles.view}><Link to={node.field_featured_button.uri.replace('internal:', '')}>VIEW ALL</Link></span></div>
                  <div dangerouslySetInnerHTML={{ __html: node.field_featured_description.processed }} className={featuredStyles.description}></div>
                  <div className={featuredStyles.perfect}>PERFECT FOR: {node.relationships.field_issues_categories.map((item, index) => {
                  return <span className={featuredStyles.category}><Link to={item.path.alias}> {item.name}</Link>{index === node.relationships.field_issues_categories.length - 1? '' : ', '}</span>
              })} </div>
                  <div className={featuredStyles.linkSection}><Link to={node.field_featured_button.uri.replace('internal:', '')} className={["button-link", featuredStyles.link].join(" ")}>{node.field_featured_button.title}</Link></div>
                </div>
              </div>


            </div>
          </div>
        </div>}
    </div>
  )
}

export default Featured

export const fragment = graphql`
    fragment paragraphFeaturedSection on paragraph__featured_section {
          id
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
          field_image_right
          
          relationships {
            field_issues_categories {
              path {
                alias
              }
              ... on taxonomy_term__clinical_skin_concern {
                id
                name
              }
            }
            field_featured_video {
              field_video_link
              relationships {
                field_video_poster {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100){
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



