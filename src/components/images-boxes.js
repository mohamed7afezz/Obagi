import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import imagesBoxesStyles from '../assets/scss/components/images-boxes.module.scss'

const ImagesBoxes = ({ node }) => {
  return (
    <div className={[imagesBoxesStyles.imageBoxes, "container-fluid"].join(" ")}>
      <div className={["row", imagesBoxesStyles.rowMargin].join(" ")}>
        <div className={[imagesBoxesStyles.boxes, "col-12", "col-md-5", "col-lg-4", "offset-lg-2", "offset-md-1"].join(" ")}>
          <p dangerouslySetInnerHTML={{ __html: node.field_box_subtitle.processed }} className={imagesBoxesStyles.subtitle}></p>
          <p dangerouslySetInnerHTML={{ __html: node.field_first_box_title.processed }} className="logo"></p>
          {/* <div><Img fluid={node.relationships.field_first_box_title_logo.localFile.childImageSharp.fluid} className={imagesBoxesStyles.medicalLogo} /></div> */}
          <div><Img fluid={node.relationships.field_box_image.localFile.childImageSharp.fluid} className={imagesBoxesStyles.boxImage} /></div>
        </div>

        <div className={[imagesBoxesStyles.boxes, "col-12", "col-md-5", "col-lg-4"].join(" ")}>
          <p dangerouslySetInnerHTML={{ __html: node.field_second_box_subtitle.processed }} className={imagesBoxesStyles.subtitle}></p>
          <p dangerouslySetInnerHTML={{ __html: node.field_second_box_title.processed }} className="logo"></p>
          {/* <div><Img fluid={node.relationships.field_second_box_title_logo.localFile.childImageSharp.fluid} className={imagesBoxesStyles.clinicalLogo} /></div> */}
          <div><Img fluid={node.relationships.field_second_b.localFile.childImageSharp.fluid} className={imagesBoxesStyles.boxImage} /></div>
        </div>
      </div>


    </div>
  )
}

export default ImagesBoxes;


export const fragment = graphql`
  fragment paragraphImagesBoxes on paragraph__images_boxes {
    id
    field_box_subtitle {
      processed
    }
    field_second_b {
      alt
    }
    field_second_box_subtitle {
      processed
    }
    field_first_box_title {
      processed
    }
    field_second_box_title {
      processed
    }
    relationships {
      field_box_image {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      field_second_b {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      field_first_box_title_logo {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      field_second_box_title_logo {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`