import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import obagiLogo from '../assets/images/obagi_logo-og-image.png'
import { getParagraph } from '../components/paragraphs-helper';

const baseUrl = process.env.Drupal_URL;

const BasicPageTemp = (node) => {

    const data = node.data
    let ishomepage = node.path === "/"?"homepage":"";

    const paragraphs = data.nodePage.relationships.paragraphs.map(getParagraph);
    let menutype = data.nodePage.field_menu_type === 'absolute' ? "absolute" : "relative";
    let pageType = data.nodePage.field_page_type ? (data.nodePage.field_page_type === 'clinical' ? 'clinical' : 'medical') : '';
    let hideBar = data.nodePage.field_hide_mob_bar && data.nodePage.field_hide_mob_bar == true? true : false
    let seo = data.path? data.path.alias : node.location.pathname?node.location.pathname:"";
    // let seo1 = seo?seo.split('.com'):""
    let firstImage = paragraphs && paragraphs[0] && paragraphs[0].props && paragraphs[0].props.node && paragraphs[0].props.node.relationships && paragraphs[0].props.node.relationships.field_basic_img_hero_paragrapgh && paragraphs[0].props.node.relationships.field_basic_img_hero_paragrapgh.localFile && paragraphs[0].props.node.relationships.field_basic_img_hero_paragrapgh.localFile.url? paragraphs[0].props.node.relationships.field_basic_img_hero_paragrapgh.localFile.url
                    : paragraphs && paragraphs[0] && paragraphs[0].props && paragraphs[0].props.node && paragraphs[0].props.node.relationships && paragraphs[0].props.node.relationships.field_slide && paragraphs[0].props.node.relationships.field_slide[0] && paragraphs[0].props.node.relationships.field_slide[0].relationships && paragraphs[0].props.node.relationships.field_slide[0].relationships.field_slide_image && paragraphs[0].props.node.relationships.field_slide[0].relationships.field_slide_image.localFile? paragraphs[0].props.node.relationships.field_slide[0].relationships.field_slide_image.localFile.url
                    : paragraphs && paragraphs[0] && paragraphs[0].props && paragraphs[0].props.node && paragraphs[0].props.node.relationships && paragraphs[0].props.node.relationships.field_careers_image && paragraphs[0].props.node.relationships.field_careers_image.localFile ? paragraphs[0].props.node.relationships.field_careers_image.localFile.url
                    : paragraphs && paragraphs[0] && paragraphs[0].props && paragraphs[0].props.node && paragraphs[0].props.node.relationships && paragraphs[0].props.node.relationships.field_taxonomy_hero_paraprapgh_i && paragraphs[0].props.node.relationships.field_taxonomy_hero_paraprapgh_i.localFile ? paragraphs[0].props.node.relationships.field_taxonomy_hero_paraprapgh_i.localFile.url
                    : null
    let metaImgField = data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.og_image? baseUrl.split('/api/')[0] + data.nodePage.field_meta_tags.og_image : null
    let defaultLogo =  baseUrl.split('/api/')[0] + obagiLogo;

    return (
        <Layout menuType = {menutype} nodeType={pageType} hideMobBar={hideBar} homepage = {ishomepage}>
            <SEO canonical={seo} title={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.title? data.nodePage.field_meta_tags.title : ""} ogDescription={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.description? data.nodePage.field_meta_tags.description : ""} ogTitle={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.title? data.nodePage.field_meta_tags.title : ""} description={data.nodePage.field_meta_tags && data.nodePage.field_meta_tags.description? data.nodePage.field_meta_tags.description : ""} metaImage={metaImgField? metaImgField : firstImage? firstImage : defaultLogo? defaultLogo : null}/>
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
        path {
            alias
          }
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
