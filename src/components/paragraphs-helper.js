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
    
const componentsMap = {
    paragraph__home_hero: HomeHero,
    paragraph__full_html_content: FullHTMLContent,
    paragraph__hero_box: HeroBox,
    paragraph__section_with_image_and_text: SectionWithImageAndText,
    paragraph__image_left_text_right: ImageLeftTextRight,
    paragraph__big_paragraph: BigParagraph,
    paragraph__images_boxes: ImagesBoxes,
    paragraph__section_with_colored_boxes: SectionWithColoredBoxes,
}

export const getParagraph = node => {
    console.log(typeof(node.type), node.type)
    if (componentsMap.hasOwnProperty(node.type)) {
        const ParagraphComponent = componentsMap[node.type];
        return <ParagraphComponent key={node.id} node={node} />;
    }
    return <p key={node.id}>Unknown type {node.__typename}</p>;
}
