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
import Featured from './featured'
import HeroSlider from './hero-slider'
import InstagramFeed from './instagram-feed'
import Blog from './blog'
import Services from './services'
import Trending from './trending'


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
}

export const getParagraph = node => {
    if (componentsMap.hasOwnProperty(node.type)) {
        const ParagraphComponent = componentsMap[node.type];
        return <ParagraphComponent key={node.id} node={node} />;
    }
    return <p key={node.id}>Unknown type {node.__typename}</p>;
}

const productComponentsMap = {
    paragraph__the_details_safe_section: Details,
    paragraph__ingredient: Ingredient,
    paragraph__need_to_know: Needtoknow,
    paragraph__how_to_use: Howtouse,
    paragraph__before_after: Beforeafter,
    paragraph__recomended_paring : RecommendedParing,
    paragraph__you_might_also_like : YouMightAlsoLike,
}

// const clinical

export const getProductParagraph = node => {
    if (productComponentsMap.hasOwnProperty(node.type)) {
        const ParagraphComponent = productComponentsMap[node.type];
        return <ParagraphComponent key={node.id} node={node} />;
    }
    return <p key={node.id}>Unknown type {node.__typename}</p>;
}
