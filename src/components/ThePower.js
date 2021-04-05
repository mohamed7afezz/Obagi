import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"

import vitmaineStyle from "../assets/scss/components/vitamine-power.module.scss"

const ThePower = ({ node }) => {
 
  const data = node.relationships;
  return (
    <div className={vitmaineStyle.vitaminePower}>
    <div className={["container-fluid "].join(" ")}>
        <div className={["row "]}>
            <div className="col-12 ">
                <div className={vitmaineStyle.titleCon}>
                    <p className={vitmaineStyle.title}>THE POWER OF&nbsp;</p><p className={vitmaineStyle.title}>VITAMIN C</p>
                </div>
                <h2 className={vitmaineStyle.header}>Let your skin drink it in</h2>
            </div>
            <div className={vitmaineStyle.vitaminContent}>
                <div className={["col-12 offset-md-1 col-md-4", vitmaineStyle.leftCol].join(" ")}>
                    <h3 className={vitmaineStyle.coltitle}>
                        Professional-C® Collection
        </h3>
                    <p className={vitmaineStyle.colcontent}>
                        The Professional-C portfolio serves as your second line of defense from environmental assailants that sunscreens often miss. Daily use helps to fortify skin and safeguard a more youthful looking appearance. Formulated with L-Ascorbic Acid, the most powerful form of Vitamin C to optimize efficacy and permeability.

        </p>
                </div>
                <div className="col-12 offset-md-1 col-md-5">
                    <div className={vitmaineStyle.titleCon}>
                        <p className={vitmaineStyle.rightColTitle}>
                            Professional-C&nbsp;
                    </p>
                        <p className={vitmaineStyle.rightColTitle}>
                            is ideal for:
                    </p>
                    </div>
                    <div className={vitmaineStyle.threeimages}>
                        <div className={vitmaineStyle.boxcon}>
                            <img src={fimg} />
                            <p className={vitmaineStyle.text}>Daily antioxidant defense</p>
                        </div>
                        <div className={vitmaineStyle.boxcon}>
                            <img src={simg} />
                            <p className={vitmaineStyle.text}>Fine lines and wrinkles</p>
                        </div>
                        <div className={vitmaineStyle.boxcon}>
                            <img src={timg} />
                            <p className={vitmaineStyle.text}>Dull, uneven skin tone
and texture</p>
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
            }
          }
        }
        field_second_image {
            localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
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