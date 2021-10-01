import React from 'react';
import { graphql, Link } from 'gatsby';

import * as boxStyle from '../assets/scss/components/hero-box.module.scss';
const $ = require('jquery');
const HeroBox = ({ node, id, desktopTag }) => {
    let link;
    if (node.field_link) {
        link = <Link to={fixlink(node.field_link)}>{node.field_link.title}</Link>
    }
    function fixlink(changelink) {


        return (changelink.uri.replace('internal:', ''))
    }

    return (
        <div className={boxStyle.heroBox} id={id}>
            <p dangerouslySetInnerHTML={{ __html: node.field_name.processed }} className={["logo", boxStyle.logo].join(" ")}></p>
            <p dangerouslySetInnerHTML={{ __html: node.field_title.processed }} className={[boxStyle.title, "show-mob"].join(" ")}></p>
            {desktopTag == true ? <h2 dangerouslySetInnerHTML={{ __html: node.field_title.processed }} className={[boxStyle.title, "hide-mob"].join(" ")}></h2>
                : <p dangerouslySetInnerHTML={{ __html: node.field_title.processed }} className={[boxStyle.title, "hide-mob"].join(" ")}></p>}
            <p dangerouslySetInnerHTML={{ __html: node.field_subtitle.processed }} className={[boxStyle.subtitle].join(" ")}></p>
            <div className={boxStyle.linkSection}><Link to={fixlink(node.field_link)} className={["button-link", boxStyle.link].join(" ")}>{node.field_link.title}</Link></div>

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
                  original {
                    src
                  }
                }
              }
            }
          }
    }
`;