import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { getParagraph } from '../components/paragraphs-helper';

const BasicPageTemp = (node) => {
    const data = node.data
    const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);
    let menutype = data.nodePage.field_menu_type === 'absolute' ? "absolute" : "relative";
    let pageType = data.nodePage.field_page_type ? (data.nodePage.field_page_type === 'clinical' ? 'clinical' : 'medical') : '';
    let hideBar = data.nodePage.field_hide_mob_bar && data.nodePage.field_hide_mob_bar == true? true : false
    return (
        <Layout menuType = {menutype} nodeType={pageType} hideMobBar={hideBar}>
            <SEO canonical={node.location.href.split('.com')[1]} title={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.title? data.nodePage.field_meta_tags.title : ""} ogDescription={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.description? data.nodePage.field_meta_tags.description : ""} ogTitle={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.title? data.nodePage.field_meta_tags.title : ""} description={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.description? data.nodePage.field_meta_tags.description : ""} metaImage={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.og_image? data.nodePage.field_meta_tags.og_image : ""}/>
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
              
              
                ...paragraphInternational
                ...paragraphCustomList
                ...paragraphStoryFinal
                ...paragraphLeftSubImgRightText
                ...paragraphOrderStatus
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
        field_hide_mob_bar
    }
}
`;
