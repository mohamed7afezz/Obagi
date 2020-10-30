import React from 'react';

// Import all components named on behalf of paragraphs on drupal
import HomeHero from './home-hero';
import HeroBox from './hero-box';
import FullHTMLContent from './full-html-content';
import SectionWithColoredBoxes from './section-with-colored-boxes'
import SectionWithImageAndText from './section-with-image-and-text'
import ImageLeftTextRight from './image-left-text-right'
import BigParagraph from './big-paragraph'
import ImagesBoxes from './images-boxes'
import Details from './product-components/thedetails'
import Needtoknow from './product-components/needtoknow'
import Ingredient from './product-components/ingredient';
import Howtouse from './product-components/howtouse';
import Beforeafter from './product-components/beforeafter';
import RecommendedParing from './product-components/recommendedparing'
import YouMightAlsoLike from './product-components/productsuggestion'
import  YouMayLike  from "./product-components/youmightlike";
import Featured from './featured'
import HeroSlider from './hero-slider'
import InstagramFeed from './instagram-feed'
import Blog from './blog'
import Services from './services'
import Trending from './trending'
import CollectionHero from './collection-components/collection-hero';
import Collectionproducts from './collection-components/collectoin-products-list' ;
import Solutions from './solutions';
import ProductLine from './product-line';
import CareersHero from './careers-hero';
import Article from './article';
import HeadingAndButton from './heading-and-button';
import FaqHero from './faq-hero';
import FaqWrapper from './faq-wrapper';
import Reviews from './reviews';
import CustomBlock from './custom-block';
import NotFound from './not-found';
import Image from './image'
import Basics from './basics';
import Vitamins from './vitamins';
import SysRelatedProducts from './product-components/sys-related-products';
import Finder from './hcpfinder';
import PhysicianFinder from './physician-finder'
import SkinAnalyzer from './skin-analyzer';
import Registration from './registration';
import ImageLeftDescRight from './ImageLeftDescriptionRight';
import SimpleFooter from './SimpleFooter';
import PremierVideo from './Premier-Video';
import Basichero from './basic-hero';
import Contact from './contact-us';
import Customer from './customer-care';
import SkinClusionLeftImgLeft from './skinclusion-left-img-left';
import SkinClusionTextLeft from './skin-culsion-text-left';
import SkinClusionTable from './skinclusion-table';
import BigText from './Big-Text';
import CulsionImage from './culsion-img';
import CulsionFlexTwoSections from './culsion-two-section';
import CulsionFinalSection from './CulsionFinalSection';
import Sepratorimg from './seprator';
import TwoCol from './scientific-two-col';
import SintificFooter from './scientific-big-desc';


const componentsMap = {
    paragraph__home_hero: HomeHero,
    paragraph__full_html_content: FullHTMLContent,
    paragraph__hero_box: HeroBox,
    paragraph__section_with_image_and_text: SectionWithImageAndText,
    paragraph__image_left_text_right: ImageLeftTextRight,
    paragraph__big_paragraph: BigParagraph,
    paragraph__images_boxes: ImagesBoxes,
    paragraph__section_with_colored_boxes: SectionWithColoredBoxes,
    paragraph__featured_section: Featured,
    paragraph__hero_slider: HeroSlider,
    paragraph__instagram_feed: InstagramFeed,
    paragraph__how_to_use: Howtouse,
    paragraph__services_paragraph: Services,
    paragraph__trending: Trending,
    paragraph__taxonomy_hero_paraprapgh: CollectionHero,
    paragraph__vocabularies: Collectionproducts,
    paragraph__solutions: Solutions,
    paragraph__product_line: ProductLine,
    paragraph__careers_hero: CareersHero,
    paragraph__article : Article,
    paragraph__heading_and_button: HeadingAndButton,
    paragraph__the_details_safe_section: Details,
    paragraph__blog: Blog,
    paragraph__ingredient: Ingredient,
    paragraph__need_to_know: Needtoknow,
    paragraph__how_to_use: Howtouse,
    paragraph__before_after: Beforeafter,
    paragraph__recomended_paring : RecommendedParing,
    paragraph__you_might_also_like : YouMayLike,
    paragraph__faq_hero: FaqHero,
    paragraph__faq_wrapper: FaqWrapper,
    paragraph__reviews: Reviews,
    paragraph__custom_block: CustomBlock,
    paragraph__not_found: NotFound,
    paragraph__image: Image,
    paragraph__blog: Blog,
    paragraph__basics: Basics,
    paragraph__vitamins: Vitamins,
    paragraph__sys_related_products: SysRelatedProducts,
    paragraph__physician_finder: PhysicianFinder,
    paragraph__skin_analyzer: SkinAnalyzer,
    paragraph__registration: Registration,
    paragraph__image_left_description_right_: ImageLeftDescRight,
    paragraph__simple_footer : SimpleFooter,
    paragraph__video :PremierVideo ,
    paragraph__basic_hero_paragrapgh : Basichero,
    paragraph__contact_us: Contact,
    paragraph__customer_care: Customer,
    paragraph__skin_clusion_img_text:SkinClusionLeftImgLeft,
    paragraph__skin_clusion_text_left_image:SkinClusionTextLeft,
    paragraph__skin_culsion_tabel:SkinClusionTable,
    paragraph__big_text:BigText,
    paragraph__culsion_image:CulsionImage,
    paragraph__flex_2_sections:CulsionFlexTwoSections,
    paragraph__skin_culsion_final_section:CulsionFinalSection,
    paragraph__separator_image:Sepratorimg,
    paragraph__scientific_innovation_two_col:TwoCol,
    paragraph__scientific_describtion_big_link:SintificFooter,
}

export const getParagraph = node => {
    if (componentsMap.hasOwnProperty(node.type)) {
        const ParagraphComponent = componentsMap[node.type];
        return <ParagraphComponent key={node.id} node={node} />;
    }
    return <p key={node.id}>Unknown type {node.__typename}</p>;
}

// const clinical

export const getProductParagraph = node => {
    if (componentsMap.hasOwnProperty(node.type)) {
        const ParagraphComponent = componentsMap[node.type];
        return <ParagraphComponent key={node.id} node={node} />;
    }
    return <p key={node.id}>Unknown type {node.__typename}</p>;
}


export function checkDataCondition(condition, data) {
    if (condition) {
        return data
    } else {
        return ""
    }
}