import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import imagesBoxesStyles from '../assets/scss/components/images-boxes.module.scss'

const ImagesBoxes = ({ node }) => {
  return (
    <div className={[imagesBoxesStyles.imageBoxes, "container-fluid"].join(" ")}>
      <div className={["row", imagesBoxesStyles.rowMargin].join(" ")}>
        <div className={["col-12", "col-md-6", "col-lg-4", "offset-lg-2", imagesBoxesStyles.colPadding, imagesBoxesStyles.colMargin].join(" ")}>
          <div className={imagesBoxesStyles.boxes}>
            <p dangerouslySetInnerHTML={{ __html: node.field_box_subtitle.processed }} className={imagesBoxesStyles.subtitle}></p>
            <p dangerouslySetInnerHTML={{ __html: node.field_first_box_title.processed }} className="logo"></p>
            {/* <div><Img fluid={node.relationships.field_first_box_title_logo.localFile.childImageSharp.fluid} className={imagesBoxesStyles.medicalLogo} /></div> */}
            <div>
              {console.log("hafezz",node.relationships)}
              {(node.relationships.field_box_image && node.relationships.field_box_image.localFile && node.relationships.field_box_image.localFile.childImageSharp)? 
              <Img fluid={node.relationships.field_box_image.localFile.childImageSharp.fluid} className={imagesBoxesStyles.boxImage} />:''}
            </div>
          </div>

        </div>

        <div className={["col-12", "col-md-6", "col-lg-4", imagesBoxesStyles.colPadding, imagesBoxesStyles.colMargin].join(" ")}>
          <div className={imagesBoxesStyles.boxes}>
            <p dangerouslySetInnerHTML={{ __html: node.field_second_box_subtitle.processed }} className={imagesBoxesStyles.subtitle}></p>
            <p dangerouslySetInnerHTML={{ __html: node.field_second_box_title.processed }} className="logo"></p>
            {/* <div><Img fluid={node.relationships.field_second_box_title_logo.localFile.childImageSharp.fluid} className={imagesBoxesStyles.clinicalLogo} /></div> */}
            <div>
              {(node.relationships.field_second_b && node.relationships.field_second_b.localFile && node.relationships.field_second_b.localFile.childImageSharp)?
              <Img fluid={node.relationships.field_second_b.localFile.childImageSharp.fluid} className={imagesBoxesStyles.boxImage} />:''}
            </div>
          </div>

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
            fluid (quality: 100){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      field_second_b {
        localFile {
          childImageSharp {
            fluid (quality: 100){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
   
    
    }
  }
`