import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import '../assets/scss/components/images-boxes.module.scss'
import imagesBoxesStyles from '../assets/scss/components/images-boxes.module.scss'

const ImagesBoxes = ({ node }) => {
    return (
        <div className={[imagesBoxesStyles.imageBoxes, "container"].join(" ")}>
          <div className={imagesBoxesStyles.boxes}>
            <p dangerouslySetInnerHTML={{ __html: node.field_box_subtitle.processed }} className={imagesBoxesStyles.subtitle}></p>
            <div><Img fluid={node.relationships.field_first_box_title_logo.localFile.childImageSharp.fluid} className={imagesBoxesStyles.medicalLogo}/></div>
            <div><Img fluid={node.relationships.field_box_image.localFile.childImageSharp.fluid} className={imagesBoxesStyles.boxImage}/></div>
          </div>
            
          <div className={imagesBoxesStyles.boxes}>
            <p dangerouslySetInnerHTML={{ __html: node.field_second_box_subtitle.processed }} className={imagesBoxesStyles.subtitle}></p>
            <div><Img fluid={node.relationships.field_second_box_title_logo.localFile.childImageSharp.fluid} className={imagesBoxesStyles.clinicalLogo}/></div>
            <div><Img fluid={node.relationships.field_second_b.localFile.childImageSharp.fluid} className={imagesBoxesStyles.boxImage}/></div>
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