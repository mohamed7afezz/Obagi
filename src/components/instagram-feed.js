import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import instagramStyles from '../assets/scss/components/instagram-feed.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faFacebook, faPinterest } from '@fortawesome/free-brands-svg-icons'



const InstagramFeed = ({ node }) => {

    // if (typeof window !== `undefined`) {
    //     const $ = require('jquery');

    //     $(window).on('load', function(){
    //         $.instagramFeed({
    //           'username': 'obagiclinical',
    //           'container': "#instagram-feed-demo"
    //         });
    //       });
    //   }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {node.field_feed_title ? <div dangerouslySetInnerHTML={{ __html: node.field_feed_title.processed }} className={instagramStyles.title}></div> : ''}
                        {node.field_feed_subtitle ? <div dangerouslySetInnerHTML={{ __html: node.field_feed_subtitle.processed }} className={instagramStyles.subtitle}></div> : ''}
                        {node.field_feed_username ? <div dangerouslySetInnerHTML={{ __html: node.field_feed_username.processed }} className={["d-none d-md-block", instagramStyles.username].join(" ")}></div> : ''}
                    </div>
                </div>

                <div className="row">
                    {node.relationships.field_feed_image.map((item) => {
                        return (
                            <div className={["col-12 col-lg-4", instagramStyles.image].join(" ")}>
                                <div className={instagramStyles.imageWrapper}>
                                    {item.localFile ? <div><Img fluid={item.localFile.childImageSharp.fluid} /></div> : ''}
                                    <div className={instagramStyles.instagramIcon}><FontAwesomeIcon icon={faInstagram} className={instagramStyles.imageIcon} /></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="row">
                    <div className="col-12">
                        {/* {node.field_feed_footnote ? <div dangerouslySetInnerHTML={{ __html: node.field_feed_footnote.processed }} className={instagramStyles.footnote}></div> : ''} */}
                        <div className={instagramStyles.socialMedia}>
                        <div className={instagramStyles.socialIcon}><Link to="#"><FontAwesomeIcon icon={faPinterest} className={instagramStyles.icon} /></Link></div>
                            <div className={instagramStyles.socialIcon}><Link to="#"><FontAwesomeIcon icon={faInstagram} className={instagramStyles.icon} /></Link></div>
                            <div className={instagramStyles.socialIcon}><Link to="#"><FontAwesomeIcon icon={faFacebook} className={instagramStyles.icon} /></Link></div>
                            <div className={instagramStyles.socialIcon}><Link to="#"><FontAwesomeIcon icon={faTwitter} className={instagramStyles.icon} /></Link></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstagramFeed

export const fragment = graphql`
    fragment paragraphInstagramFeed on paragraph__instagram_feed {
        id
      
   
        field_feed_title {
            processed
        }
   
        relationships {
            field_feed_image {
                localFile {
                    childImageSharp {
                        fluid (quality: 100){
                            ...GatsbyImageSharpFluid
                          }
                    }
                }
            }
          }
    }`