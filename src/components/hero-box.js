import React from 'react';
import { graphql, Link } from 'gatsby';

import BoxStyle from '../assets/css/hero-box.module.css';

const HeroBox = ({ node }) => {
    let link;
    if (node.field_link) {
        link = <Link to={node.field_link.uri}>{node.field_link.title}</Link>
    }
        
    return (
        <div className={BoxStyle.heroBox}>
            <div>{node.field_name.processed}</div>
            <div>{node.field_title.processed}</div>
            <div>{node.field_subtitle.processed}</div>
            {link}
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
    }
`;