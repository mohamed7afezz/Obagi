import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import * as NudermStyles from '../../assets/scss/components/nud-derm.module.scss'

import { graphql } from 'gatsby'
const Nuderm = ({ node }) => {
    
    return <> 

      <div className={["container-fluid", "NudermCon" ,NudermStyles.NudermCon].join(" ")}>
      <div className={"row align-items-center"}>
        <div className={["col-12","col-lg-3","offset-lg-1",NudermStyles.LeftNudermCon].join(" ")}>
          {node.field_nu_derm_title?
            <div dangerouslySetInnerHTML={{__html:node.field_nu_derm_title.processed}} className={[NudermStyles.title,"show-mob"].join(" ")}></div>
          :""}
            <div className="w-100">
            {node.relationships && node.relationships.field_nuderm_image && node.relationships.field_nuderm_image.localFile && node.relationships.field_nuderm_image.localFile.childImageSharp ?<GatsbyImage
              image={node.relationships.field_nuderm_image.localFile.childImageSharp.gatsbyImageData}
              alt="img"
              className={NudermStyles.imgResponsive} /> : ""}
        </div>
        </div>
        <div className={["col-12","col-lg-4","offset-lg-2",NudermStyles.LeftNudermCon].join(" ")}>
          {node.field_nu_derm_title?
            <div dangerouslySetInnerHTML={{__html:node.field_nu_derm_title.processed}} className={[NudermStyles.title,"hide-mob"].join(" ")}></div>
            :""}
            {node.field_nu_derm_describtion?
            <div dangerouslySetInnerHTML={{__html:node.field_nu_derm_describtion.processed}} className={[NudermStyles.describtion].join(" ")}></div>
            :""}
            {node.field_button_name?
            <a className={NudermStyles.Link} href={node.field_button_link}>{node.field_button_name}</a>
          :""}
            </div>
      </div>
      </div>  
    </>;
}

export default Nuderm;

export const fragment = graphql`fragment nuDermParagraph on paragraph__nu_derm {
  id
  field_nu_derm_title {
    processed
  }
  field_nu_derm_describtion {
    processed
  }
  field_button_name
  field_button_link
  relationships {
    field_nuderm_image {
      localFile {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
      }
    }
  }
}
`