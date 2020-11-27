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
            <SEO title={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.title? data.nodePage.field_meta_tags.title : ""} ogDescription= {data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.og_description? data.nodePage.field_meta_tags.og_description : ""} ogTitle= {data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.og_title? data.nodePage.field_meta_tags.og_title : ""} description={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.description? data.nodePage.field_meta_tags.description : ""} metaImage={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.og_image? data.nodePage.field_meta_tags.og_image : ""}/>
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
                ...paragraphPhysicianFinder
                ...paragraphSkinAnalyzer
                ...paragraphRegistration
                ...paragraphImageLeftDescriptionRight
                ...paragraphSimpleFooter
                ...paragraphPremierVideo
                ...paragrapghBasicHero
                ...paragraphSkinClusionLeftImgLeft
                ...paragraphSkinClusionTextLeft
                ...paragraphSkinClusionTable
                ...paragrapghBigText
                ...paragrapghCulsionImage
                ...paragrapghCulsionFlexTwoSections
                ...paragrapghCulsionFinalSection
                ...paragrapghSepratorimg
                ...paragraphTaxonomyHeroParaprapgh
                ...paragraphScientificTowCols
                ...paragraphScientificFooter
                ...paragraphInternational
                ...paragraphFullWidthWithImage
                ...paragraphCustomList
            }
        }
        field_meta_tags {
            description
            keywords
            title
            og_description
            og_image
            og_title
        }
        field_menu_type
        field_page_type
    }
}
`;
