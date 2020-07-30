import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
// import SEO from '../components/seo';

import { getParagraph } from '../components/paragraphs-helper';

const BasicPageTemp = ({ data }) => {
    const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);
    let menutype = data.nodePage.field_menu_type === 'absolute' ? "absolute" : "relative";
    
    console.log('menu', data)
    return (
        <Layout menuType = {menutype}>
            {/* <SEO title={data.nodePage.field_meta_tags.title} description={data.nodePage.field_meta_tags.description}/> */}
            {paragraphs}
        </Layout>
    )
};

export default BasicPageTemp;

export const pageQuery = graphql`
query($slug: String!) {
    nodePage(fields: { slug: { eq: $slug } }) {
        id
        title
        relationships {
            paragraphs: field_paragraphs {
                type: __typename
                ...paragraphHomeHero
                ...paragraphFullHtmlContent
                ...paragraphSectionWithColoredBoxes
                ...paragraphSectionWithImageAndText
                ...paragraphImageLeftTextRight
                ...paragraphBigParagraph
                ...paragraphImagesBoxes
                ...paragraphFeaturedSection
                ...paragraphHeroSlider
                ...paragraphInstagramFeed
                ...paragraphBlog
            }
        }
        field_meta_tags {
            description
            keywords
            title
        }
        field_menu_type
    }
}
`;
