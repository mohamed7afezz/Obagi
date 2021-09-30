import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import * as basichero from '../assets/scss/components/basic-hero.module.scss'
import * as coloredBoxesStyle from '../assets/scss/components/section-with-colored-boxes.module.scss'
import { Link } from "gatsby"

const FinalStory = ({ node }) => {

  return (
    <div className={[coloredBoxesStyle.ourStory, coloredBoxesStyle.finalStory].join(" ")}>
    <div className={(node.field_not_homepage && node.field_image_is_right)?`${node.field_colored_custom_class? node.field_colored_custom_class : ""}` + " " + coloredBoxesStyle.notHome + " container-fluid " + coloredBoxesStyle.imageRight : (!node.field_image_is_right && node.field_not_homepage)? `${node.field_colored_custom_class? node.field_colored_custom_class : ""}` + " container-fluid " + coloredBoxesStyle.notHome : "container-fluid " + `${node.field_colored_custom_class? node.field_colored_custom_class : ""}`} id="colored-boxes">
      <div className={["row colored-big-section", coloredBoxesStyle.bigSection].join(" ")}>
      <div className={!node.field_not_homepage && node.field_colored_custom_class? "col-12 col-lg-7 colored-col-right " + coloredBoxesStyle.colRightPadding : !node.field_not_homepage? "col-12 col-lg-7 offset-lg-0 " + coloredBoxesStyle.colRightPadding : (node.field_image_is_right && node.field_not_homepage)?  "col-12 col-lg-6 offset-lg-1" : "col-12 col-lg-6 offset-lg-0"}>
          <div className={[coloredBoxesStyle.smallSection, "colored-small-section"].join(" ")}>
            {node.field_story_topic? <div dangerouslySetInnerHTML={{ __html: node.field_story_topic.processed }} className={[coloredBoxesStyle.subtitle, "colored-subtitle"].join(" ")}></div> : ""}
            {node.field_story_final_title? <h1 dangerouslySetInnerHTML={{ __html: node.field_story_final_title.processed }} className={[coloredBoxesStyle.title, "title colored-title"].join(" ")}></h1> : ""}
            {node.field_story_final_describtion? <div dangerouslySetInnerHTML={{ __html: node.field_story_final_describtion.processed }} className={[coloredBoxesStyle.description, "description colored-description"].join(" ")}></div> : ""}
            {node.field_button_name_ctaa?
        <div className={coloredBoxesStyle.ctabtn}>
          <a href={node.field_button_url}>{node.field_button_name_ctaa.processed}</a>
        </div>
        :""}
          </div>
          
        </div>
  
        <div className={!node.field_not_homepage && node.field_colored_custom_class? "col-10 offset-2 col-lg-5 offset-lg-0 colored-first-section "+ coloredBoxesStyle.colLeftPadding + " " + coloredBoxesStyle.firstSection : !node.field_not_homepage ? "col-10 col-lg-5 "+ coloredBoxesStyle.colLeftPadding + " " + coloredBoxesStyle.firstSection : "col-12  col-lg-5 "+ coloredBoxesStyle.colLeftPadding + " " + coloredBoxesStyle.colRightPadding + " " + coloredBoxesStyle.firstSection}>
          {node.relationships && node.relationships.field_story_image && node.relationships.field_story_image.localFile && node.relationships.field_story_image.localFile.childImageSharp? <div className={[coloredBoxesStyle.image, "colored-image"].join(" ")}><GatsbyImage
            image={node.relationships.field_story_image.localFile.childImageSharp.gatsbyImageData}
            alt="img" /></div> : ''}
    
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default FinalStory

export const fragment = graphql`fragment paragraphStoryFinal on paragraph__story_final {
  field_story_final_describtion {
    processed
  }
  field_story_final_title {
    processed
  }
  field_button_name_ctaa {
    processed
  }
  field_button_url
  field_story_topic {
    processed
  }
  relationships {
    field_story_image {
      localFile {
        childImageSharp {
          original {
            src
          }
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
      }
    }
  }
}
`