import React from "react"
import { useStaticQuery, graphql } from "gatsby"


const PremierVideo = ({ node }) => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 offset-2">
           
        </div>
      </div>
    </div>
  )
}

export default PremierVideo

export const fragment = graphql`
  fragment paragraphPremierVideo on paragraph__video {
    id
    field_video_link
    relationships {
      field_video_poster {
        localFile {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
  `
