import React from "react"
import { useStaticQuery, graphql } from "gatsby"


const ImageLeftDescRight = ({ node }) => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 offset-2">
           
        </div>
      </div>
    </div>
  )
}

export default ImageLeftDescRight

export const fragment = graphql`
  fragment paragraphImageLeftDescriptionRight on paragraph__image_left_description_right_ {
    id
    field_premier_title {
      processed
    }
    relationships {
      field_premier_cards_section {
        field_premier_card_title {
          processed
        }
        field_premier_cards_desc {
          processed
        }
        relationships {
          field_premier_cards_images {
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
      field_images_left {
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
