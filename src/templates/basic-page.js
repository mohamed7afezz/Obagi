import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { getParagraph } from '../components/paragraphs-helper';

const BasicPageTemp = ({ data }) => {
    const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);
    let menutype = data.nodePage.field_menu_type === 'absolute' ? "absolute" : "relative";
    let pageType = data.nodePage.field_page_type ? (data.nodePage.field_page_type === 'clinical' ? 'clinical' : 'medical') : '';
    
    return (
        <Layout menuType = {menutype} nodeType={pageType}>
            <SEO title={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.title? data.nodePage.field_meta_tags.title : ""} description={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.description? data.nodePage.field_meta_tags.description : ""}/>
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
                ...paragraphImagesBoxes
                ...paragraphFeaturedSection
                ...paragraphHeroSlider
                ...paragraphInstagramFeed
                ...paragraphServicesParagraph
                ...paragraphTrending
                ...vocabularySkinConcerHero
                ...vocabulariesList
                ...paragraphSolutions
                ...paragraphBlog
                ...paragraphProductLine
                ...paragraphCareersHero
                ...paragraphArticle
                ...paragraphHeadingAndButton
                ...paragraphBasics
                ...paragraphFaqWrapper
                ...paragraphNotFound
                ...paragraphCustomBlock
                ...paragraphImage
                ...paragraphVitamins
                ...paragraphTaxonomyHeroParaprapgh

            }
        }
        field_meta_tags {
            description
            keywords
            title
        }
        field_menu_type
        field_page_type
    }
}
`;
