import React from 'react';
import { graphql, Link } from 'gatsby';

import { getParagraph } from './paragraphs-helper';
import homeHero from '../assets/scss/components/home-hero.module.scss'
import HeroBox from './hero-box'
import Img from 'gatsby-image'

const HomeHero = ({ node }) => {

  function changeBackground(bg) {
    document.getElementById("hero").style.backgroundImage = `url(${bg})`;
  }

  return (
    <div style={{ backgroundImage: `url(${node.relationships.field_default_bg.localFile.childImageSharp.original.src})` }} className={[homeHero.heroStyle].join(" ")} id="hero">
      <div className="container-fluid">
      <div className={["row"].join(" ")}>
        <div className={["col col-lg-4 offset-lg-4"].join(" ")}>
          {node.field_main_header? <h2 dangerouslySetInnerHTML={{ __html: node.field_main_header.processed }} className={[homeHero.header].join(" ")}></h2> : ""}
          {node.field_main_subtitle? <p dangerouslySetInnerHTML={{ __html: node.field_main_subtitle.processed }} className={[homeHero.subtitle].join(" ")}></p> : ""}
          {/* {node.relationships.field_box.map(({ drupal_id }) => (<HeroBox id='asda'/>))} */}
        </div>
      </div>
      <div className="row">
        {node.relationships.field_box.map((box, i) => {
          return (
            <div className={i < 1 ? ["col-12", "col-md-6", "col-lg-5", "offset-lg-1", homeHero.boxMargin].join(" ") : "col-12 col-md-6 col-lg-5"} key={box.id} onMouseEnter={() => { changeBackground(box.relationships.field_background.localFile.childImageSharp.original.src); }} onMouseLeave={() => { changeBackground(node.relationships.field_default_bg.localFile.childImageSharp.original.src); }}>
              <HeroBox node={box} />
            </div>
          )
        })}
        <div className="d-none d-lg-block"><Link to="#colored-boxes" className={homeHero.scrollButton}><Img fluid={node.relationships.field_scroll_down.localFile.childImageSharp.fluid} /></Link></div>
      </div>
      </div>
    </div>
  );
}




export default HomeHero;

export const fragment = graphql`
    fragment paragraphHomeHero on paragraph__home_hero {
        id
        field_main_header {
          processed
        }
        field_main_subtitle {
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
                fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                }
                original {
                    src
                }
              }
            }
          }
          field_scroll_down {
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
`;