import React from 'react'
import $ from 'jquery'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import * as vitaminsStyles from '../assets/scss/components/vitamins.module.scss'

const Vitamins = ({ node }) => {

    return <>
      <div className={["container-fluid", vitaminsStyles.wrapper].join(" ")}>
        <div className="row">
          <div className="col-12 col-lg-5 offset-lg-1">
            {node.field_paragraph_title? <div className={vitaminsStyles.title} dangerouslySetInnerHTML={{__html: node.field_paragraph_title.processed}}></div> : ""}
            {node.field_vitamins_subtitle? <div className={vitaminsStyles.subtitle} dangerouslySetInnerHTML={{__html: node.field_vitamins_subtitle.processed}}></div> : ""}
            {node.relationships && node.relationships.field_paragraph_image && node.relationships.field_paragraph_image.localFile? <GatsbyImage
              image={node.relationships.field_paragraph_image.localFile.childImageSharp.gatsbyImageData}
              alt="img"
              className={[vitaminsStyles.image, "d-none d-lg-block"].join(" ")} /> : ""}
          </div>
          <div className="col-12 col-lg-4 offset-lg-1">
            { node.relationships?
                node.relationships.field_vitamins?
                  (node.relationships.field_vitamins.map((item, index) => {
                    return (
                      <>
                        {item.field_vitamin_name? <div className={vitaminsStyles.vName} dangerouslySetInnerHTML={{__html: item.field_vitamin_name.processed}}></div> : ""}
                        {item.field_vitamin_description? <div className={vitaminsStyles.vDesc} dangerouslySetInnerHTML={{__html: item.field_vitamin_description.processed}}></div> : ""}
                      </>
                    )
                  }))

            : "" : ""}

            {node.field_paragraph_link? <Link className={vitaminsStyles.link} to={node.field_paragraph_link.uri.replace('internal:', '')}>{node.field_paragraph_link.title}</Link> : ""}
          </div>
        </div>
      </div>
    </>;
}

export default Vitamins;

export const fragment = graphql`fragment paragraphVitamins on paragraph__vitamins {
  id
  field_paragraph_title {
    processed
  }
  field_paragraph_link {
    uri
    title
  }
  field_vitamins_subtitle {
    processed
  }
  relationships {
    field_paragraph_image {
      localFile {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
    field_vitamins {
      field_vitamin_name {
        processed
      }
      field_vitamin_description {
        processed
      }
    }
  }
}
`;