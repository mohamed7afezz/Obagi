import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
// import '../assets/scss/components/section-with-colored-boxes.module.scss'
import * as coloredBoxesStyle from '../assets/scss/components/section-with-colored-boxes.module.scss'


const SectionWithColoredBoxes = ({ node }) => {

  let blogPage = node.field_colored_custom_class && node.field_colored_custom_class == "blog-lp"? true : false;

  return (
    <div className={(node.field_not_homepage && node.field_image_is_right)?`${node.field_colored_custom_class? node.field_colored_custom_class : ""}` + " " + coloredBoxesStyle.notHome + " container-fluid " + coloredBoxesStyle.imageRight : (!node.field_image_is_right && node.field_not_homepage)? `${node.field_colored_custom_class? node.field_colored_custom_class : ""}` + " container-fluid " + coloredBoxesStyle.notHome : "container-fluid " + `${node.field_colored_custom_class? node.field_colored_custom_class : ""}`} id="colored-boxes">
      <div className={["row colored-big-section", coloredBoxesStyle.bigSection].join(" ")}>
        <div className={blogPage? `col-12 col-lg-5 colored-first-section ${coloredBoxesStyle.firstSection}`  : !node.field_not_homepage && node.field_colored_custom_class? "col-10 offset-2 col-lg-5 offset-lg-0 colored-first-section "+ coloredBoxesStyle.colLeftPadding + " " + coloredBoxesStyle.firstSection : !node.field_not_homepage ? "col-10 col-lg-5 "+ coloredBoxesStyle.colLeftPadding + " " + coloredBoxesStyle.firstSection : "col-12  col-lg-5 "+ coloredBoxesStyle.colLeftPadding + " " + coloredBoxesStyle.colRightPadding + " " + coloredBoxesStyle.firstSection}>
          {node.relationships && node.relationships.field_colored_boxes_image && node.relationships.field_colored_boxes_image.localFile && node.relationships.field_colored_boxes_image.localFile.childImageSharp? <div className={[coloredBoxesStyle.image, "colored-image"].join(" ")}><GatsbyImage
            image={node.relationships.field_colored_boxes_image.localFile.childImageSharp.gatsbyImageData}
            alt="img" /></div> : ''}
        </div>
        <div className={blogPage? `col-12 col-lg-6 colored-col-right` : !node.field_not_homepage && node.field_colored_custom_class? "col-12 col-lg-7 colored-col-right " + coloredBoxesStyle.colRightPadding : !node.field_not_homepage? "col-9 offset-2 col-lg-7 offset-lg-0 " + coloredBoxesStyle.colRightPadding : (node.field_image_is_right && node.field_not_homepage)?  "col-12 col-lg-6 offset-lg-1" : "col-12 col-lg-6 offset-lg-0"}>
          <div className={[coloredBoxesStyle.smallSection, "colored-small-section"].join(" ")}>
            {node.field_colored_boxes_subtitle? <div dangerouslySetInnerHTML={{ __html: node.field_colored_boxes_subtitle.processed }} className={[coloredBoxesStyle.subtitle, "colored-subtitle"].join(" ")}></div> : ""}
            {node.field_colored_boxes_title? <h3 dangerouslySetInnerHTML={{ __html: node.field_colored_boxes_title.processed }} className={[coloredBoxesStyle.title, "title colored-title"].join(" ")}></h3> : ""}
            {node.field_colored_boxes_description? <div dangerouslySetInnerHTML={{ __html: node.field_colored_boxes_description.processed }} className={[coloredBoxesStyle.description, "description colored-description"].join(" ")}></div> : ""}
            {node.field_colored_boxes_button? <div className={[coloredBoxesStyle.linkSection, "colored-link"].join(" ")}><Link to={node.field_colored_boxes_button.uri.replace('internal:', '')} className={[coloredBoxesStyle.link].join(" ")}>{node.field_colored_boxes_button.title}</Link></div> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionWithColoredBoxes;


export const fragment = graphql`fragment paragraphSectionWithColoredBoxes on paragraph__section_with_colored_boxes {
  id
  field_image_is_right
  field_not_homepage
  field_colored_custom_class
  field_colored_boxes_button {
    title
    uri
  }
  field_colored_boxes_description {
    processed
  }
  field_colored_boxes_subtitle {
    processed
  }
  field_colored_boxes_title {
    processed
  }
  relationships {
    field_colored_boxes_image {
      localFile {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
      }
    }
  }
}
`
