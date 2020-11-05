import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import trendingStyles from '../assets/scss/components/trending.module.scss'


const Trending = ({ node }) => {
  return (
      <div className={[trendingStyles.wrapper, "container-fluid"].join(" ")}>
        <div className="row">
          {node.relationships.field_trending_card.map((item, index) => {
            return (
              <>
                <div className="col-12 col-md-6 d-lg-none">
                  <div className={index == 0 || index == 1? trendingStyles.cardWrapper : trendingStyles.cardWrapper  +" " + trendingStyles.lastCardWrappers}>
                    <div className={trendingStyles.subtitle}>Trending</div>
                    {item.field_trending_card_title ? <div dangerouslySetInnerHTML={{ __html: item.field_trending_card_title.processed }} className={trendingStyles.title}></div> : ''}
                    {item.relationships.field_trending_card_image ? (item.relationships.field_trending_card_image.localFile? <div className={trendingStyles.image}><Img fluid={item.relationships.field_trending_card_image.localFile.childImageSharp.fluid} /></div> : '') : ''}
                    {item.field_trending_card_link ? <div className={trendingStyles.linkSection}><Link to={item.field_trending_card_link.uri.replace('internal:', '')} className={["button-link", trendingStyles.link].join(" ")}>Explore</Link></div> : ''}
                  </div>
                </div>

                <div className="col-lg-4 d-none d-lg-block">
                  <div className={trendingStyles.cardWrapper}>
                    <div className={trendingStyles.subtitle}>Trending</div>
                    {item.relationships.field_trending_card_image ? (item.relationships.field_trending_card_image.localFile? <div className={trendingStyles.image}><Img fluid={item.relationships.field_trending_card_image.localFile.childImageSharp.fluid} /></div>:'') : ''}
                    <div className={trendingStyles.lowerCard}>
                      {item.field_trending_card_link ?
                        <Link to={item.field_trending_card_link.uri.replace('internal:', '')} className={trendingStyles.link}>
                          <div className={trendingStyles.linkSection}>Explore</div>
                          {item.field_trending_card_title ? <div dangerouslySetInnerHTML={{ __html: item.field_trending_card_title.processed }} className={trendingStyles.title}></div> : ''}
                        </Link> : ''}
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
  )
}

export default Trending

export const fragment = graphql`
    fragment paragraphTrending on paragraph__trending {
        id
        relationships {
            field_trending_card {
              field_trending_card_link {
                uri
              }
              field_trending_card_title {
                processed
              }
              relationships {
                field_trending_card_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                          ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
    }`