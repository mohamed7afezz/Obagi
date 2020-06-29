import React from 'react';

// Import all components named on behalf of paragraphs on drupal
import HomeHero from './home-hero';
import HeroBox from './hero-box';
import FullHTMLContent from './full-html-content';
    
const componentsMap = {
    paragraph__home_hero: HomeHero,
    paragraph__full_html_content: FullHTMLContent,
    paragraph__hero_box: HeroBox
}

export const getParagraph = node => {
    if (componentsMap.hasOwnProperty(node.type)) {
        const ParagraphComponent = componentsMap[node.type];
        return <ParagraphComponent key={node.id} node={node} />;
    }
    return <p key={node.id}>Unknown type {node.__typename}</p>;
}
