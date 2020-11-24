import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import sientificStyle from '../assets/scss/components/scientific-two-col.module.scss'
import Img from 'gatsby-image'
const TwoCol = ({ node }) => {

  return (

    <div className={["container-fluid"].join(" ")}>
      <div className={sientificStyle.paddingTop}>
        <div className="row">
          <div className={["col-12 offset-lg-1 col-lg-5", sientificStyle.leftcol].join(" ")}>
            <div dangerouslySetInnerHTML={{ __html: node.field_scientific_title.processed }} className={[sientificStyle.title].join(' ')}>

            </div>
            <div dangerouslySetInnerHTML={{ __html: node.field_scientific_describtion.processed }} className={[sientificStyle.desc].join(' ')}>

            </div>
            {node.relationships.field_scientific_image ? <Img className="show-mob img-responsive" fluid={node.relationships.field_scientific_image.localFile.childImageSharp.fluid} /> : ""}

            <div dangerouslySetInnerHTML={{ __html: node.field_scientific_list_title.processed }} className={[sientificStyle.listTitle].join(' ')}>

            </div>
            <ul className={[sientificStyle.list].join(' ')}>
              {node.field_scientific_list_item ? node.field_scientific_list_item.map(item => (
                <li dangerouslySetInnerHTML={{ __html: item.processed }}></li>
              )) : ""}
            </ul>
          </div>
          <div className="col-12 offset-lg-1 col-lg-5">
            {node.relationships.field_scientific_image ? <Img className="hide-mob" fluid={node.relationships.field_scientific_image.localFile.childImageSharp.fluid} /> : ""}
          </div>

        </div>
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-1">
                <div className={sientificStyle.paddingBottom}></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TwoCol

export const fragment = graphql`
  fragment paragraphScientificTowCols on paragraph__scientific_innovation_two_col {
    id
    field_scientific_describtion {
      processed
    }
    field_scientific_list_title {
      processed
    }
    field_scientific_list_item {
      processed
    }
    field_scientific_title {
      processed
    }
    relationships {
      field_scientific_image {
        localFile {
          childImageSharp {
            fluid (quality: 100) {
                ...GatsbyImageSharpFluid
              }
              original{
                src
            }
          }
        }
      }
    }
  }
  `
