import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"

import vitmaineStyle from "../assets/scss/components/vitamine-power.module.scss"

const ThePower = ({ node }) => {
  const data = node.relationships;
  return (

    <div id="letyourskin" className={["container-fluid ", vitmaineStyle.vitaminePower].join(" ")}>
      <div className="row">
        <div className="container">
          <div className={["row "]}>
            <div className={}>
              <div className="col-12 ">
                <div className={vitmaineStyle.titleCon}>
                  <div dangerouslySetInnerHTML={{ __html: node.field_sub_title_part_one.processed }} className={vitmaineStyle.title}></div>
                  <div dangerouslySetInnerHTML={{ __html: node.field_vitaminc_sub_title.processed }} className={vitmaineStyle.title}></div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: node.field_vitaminc_title.processed }} className={vitmaineStyle.header}></div>
              </div>
              <div className={vitmaineStyle.vitaminContent}>
                <div className={["col-12 offset-lg-1 col-lg-4", vitmaineStyle.leftCol].join(" ")}>
                  <div dangerouslySetInnerHTML={{ __html: node.field_left_col_title.processed }} className={vitmaineStyle.coltitle}>

                  </div>
                  <div dangerouslySetInnerHTML={{ __html: node.field_left.processed }} className={vitmaineStyle.colcontent}>

                  </div>
                </div>
                <div className="col-12 offset-lg-1 col-lg-5">
                  <div className={vitmaineStyle.titleCon}>
                    <div dangerouslySetInnerHTML={{ __html: node.field_right_col_title.processed }} className={vitmaineStyle.rightColTitle}>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: node.field_right_section_title_part_t.processed }} className={vitmaineStyle.rightColTitle}>
                    </div>
                  </div>
                  <div className={vitmaineStyle.threeimages}>
                    <div className={vitmaineStyle.boxcon}>
                      <img src={node.relationships.field_first_image.localFile.childImageSharp.original.src} />
                      <div dangerouslySetInnerHTML={{ __html: node.field_first_image_caption.processed }} className={vitmaineStyle.text}></div>
                    </div>
                    <div className={vitmaineStyle.boxcon}>
                      <img src={node.relationships.field_second_image.localFile.childImageSharp.original.src} />
                      <div dangerouslySetInnerHTML={{ __html: node.field_second_image_caption.processed }} className={vitmaineStyle.text}></div>
                    </div>
                    <div className={vitmaineStyle.boxcon}>
                      <img src={node.relationships.field_third_image.localFile.childImageSharp.original.src} />
                      <div dangerouslySetInnerHTML={{ __html: node.field_third_image_caption.processed }} className={vitmaineStyle.text}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ThePower;
export const fragment = graphql`
  fragment paragraphThePowerOfVitamineC on paragraph__the_power_of_vitamine_c{
    field_sub_title_part_one {
        processed
      }
      field_vitaminc_sub_title {
        processed
      }
      field_vitaminc_title {
        processed
      }
      field_left_col_title {
        processed
      }
      field_right_col_title {
        processed
      }
      field_right_section_title_part_t {
        processed
      }
      relationships {
        field_first_image {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
              original{
                src
            }
            }
          }
        }
        field_second_image {
            localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                  original{
                    src
                }
                }
              }
        }
        field_third_image {
            localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }

                  original{
                    src
                }

                }
              }
        }
      }
      field_left {
        processed
      }
      field_first_image_caption {
        processed
      }
      field_second_image_caption {
        processed
      }
      field_third_image_caption {
        processed
      }
  } 
`;