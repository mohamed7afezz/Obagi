import React from 'react';
import { graphql, Link } from 'gatsby';

import boxStyle from '../assets/scss/components/hero-box.module.scss';

const HeroBox = ({ node }) => {
    let link;
    if (node.field_link) {
        link = <Link to={node.field_link.uri}>{node.field_link.title}</Link>
    }
        

    // console.log(node)
    // 
    return (
        <div className={boxStyle.heroBox} >
            <p dangerouslySetInnerHTML={{ __html: node.field_name.processed }} className={["logo", boxStyle.logo].join(" ")}></p>
            <h1 dangerouslySetInnerHTML={{ __html: node.field_title.processed }} className={[boxStyle.title].join(" ")}></h1>
            <p dangerouslySetInnerHTML={{ __html: node.field_subtitle.processed }} className={[boxStyle.subtitle].join(" ")}></p>
            <div className={boxStyle.linkSection}><Link to={node.field_link.uri} className={["button-link", boxStyle.link].join(" ")}>{node.field_link.title}</Link></div>
            
        </div>
    );
};

export default HeroBox;


export const fragment = graphql`
    fragment paragraphHeroBox on paragraph__hero_box {
        id
        field_link {
            uri
            title
        }
        field_name {
            processed
        }
        field_subtitle {
            processed
        }
        field_title {
            processed
        }
        relationships {
            field_background {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
          }
    }
`;