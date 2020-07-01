import React from 'react';
import { graphql } from 'gatsby';

import { getParagraph } from './paragraphs-helper';
import '../assets/scss/components/home-hero.module.scss'

const HomeHero = ({node}) => (
    <div style={{backgroundImage: `url(${node.relationships.field_default_bg.localFile.childImageSharp.original.src})`}}>
        <h2 dangerouslySetInnerHTML={{__html: node.field_main_header.processed}}></h2>
        {/* {node.relationships.field_box.map(({ drupal_id }) => (<HeroBox id='asda'/>))} */}
        {node.relationships.field_box.map(getParagraph)}
    </div>
);

export default HomeHero;

export const fragment = graphql`
    fragment paragraphHomeHero on paragraph__home_hero {
        id
        field_main_header {
          processed
        }
        relationships {
          field_box {
            type: __typename
            ...paragraphHeroBox
          }
          field_default_bg {
            localFile {
              childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
                original {
                    src
                }
              }
            }
          }
        }
    }
`;