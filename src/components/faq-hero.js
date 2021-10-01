import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import * as faqHeroStyles from '../assets/scss/components/faq-hero.module.scss'

const FaqHero = ({ node }) => {
    return (
        <div style={{ backgroundImage: `url(${node.relationships.field_bg_image.localFile.childImageSharp.original.src})` }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8 offset-2 col-lg-10 offset-lg-1">
                        {node.field_hero_title? <div dangerouslySetInnerHTML={{__html: node.field_hero_title.processed}} className={faqHeroStyles.title}></div> : ''}
                        {node.field_hero_description? <div dangerouslySetInnerHTML={{__html: node.field_hero_description.processed}} className={faqHeroStyles.description}></div> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FaqHero

export const fragment = graphql`
    fragment paragraphFaqHero on paragraph__faq_hero {
        id
        field_hero_title {
            processed
          }
          field_hero_description {
            processed
          }
          relationships {
            field_bg_image {
              localFile {
                childImageSharp {
                  original {
                      src
                  }
                }
              }
            }
          }
    }`