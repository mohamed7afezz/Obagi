import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"

import profcStyle from "../assets/scss/components/prof-serum.module.scss"

const ProffC = ({ node }) => {
  console.log('hassan', node)
  return (
    <div className={profcStyle.ProfessionalSerums}>
      <div className={["container-fluid profc-serum"].join(" ")}>
        <div className={["row "]}>
          <div className="col-12 offset-lg-1 col-lg-11">
            <div dangerouslySetInnerHTML={{ __html: node.field_profc_title.processed }} className={profcStyle.title}>

            </div>
          </div>
          <div className="col-12 col-lg-6 offset-lg-1 mob-p-0">
            <img className={"img-fluid profc-img"} src={node.relationships.field_profc_left_image.localFile.childImageSharp.original.src} />
          </div>
          <div className="col-12 col-lg-4 offset-lg-1">
            <div dangerouslySetInnerHTML={{ __html: node.field_right_section_describtion.processed }} className={profcStyle.sectionDesc}>
            </div>
            <div dangerouslySetInnerHTML={{ __html: node.field_right_section_small_title.processed }} className={profcStyle.secSectionTitle}>

            </div>
            <div dangerouslySetInnerHTML={{ __html: node.field_right_col_describtion.processed }} className={profcStyle.secSectionDesc}>

            </div>
            {node.relationships.field_small_title_and_describtio.map((item, index) => (
              <>
                <div dangerouslySetInnerHTML={{ __html: item.field_small_title.processed }} className={profcStyle.subtitle}></div>
                <div dangerouslySetInnerHTML={{ __html: item.field_small_describtion.processed }} className={profcStyle.subdesc}></div>
              </>
            ))
            }
       

        </div>


          <div dangerouslySetInnerHTML={{ __html: node.field_profc_second_title.processed }} className={[profcStyle.title, profcStyle.givemargin, "offset-lg-1 col-lg-8"].join(" ")}>
           
                    </div>
          <div className={["d-flex", profcStyle.mobColRev].join(" ")}>
          <div className={["col-lg-4 offset-lg-1", profcStyle.leftsec].join(" ")}>
            <div dangerouslySetInnerHTML={{ __html: node.field_second_subtitle?node.field_second_subtitle.processed:" " }}  className={profcStyle.seccoltitle}></div>
       
            <div dangerouslySetInnerHTML={{ __html: node.field_second_describtion?node.field_second_describtion.processed :" "}} className={profcStyle.customp}>
                </div>

            
            {node.relationships.field_percentage_?node.relationships.field_percentage_.map((item, index) => (
              <>
              <div className={profcStyle.percentage}>
              <div dangerouslySetInnerHTML={{ __html: item.field_percentage_title?item.field_percentage_title.processed:" " }}  className={profcStyle.leftsecsubtitle}></div>
              <div className={profcStyle.percentagecon}>
                <div dangerouslySetInnerHTML={{ __html: item.field_percentage_value?item.field_percentage_value.processed :" "}} className={profcStyle.per}></div>
                <div dangerouslySetInnerHTML={{ __html: item.field_percentage_describtion?item.field_percentage_describtion.processed :" "}} className={profcStyle.perdesc}></div>

              </div>
              </div>
              </>
            ))
            :" "}
              
              
           
            <div dangerouslySetInnerHTML={{ __html: node.field_section_footnote?node.field_section_footnote.processed :"" }} className={profcStyle.footnote}></div>

          </div>
          <div className={["col-lg-5 mob-p-0", profcStyle.rightsec].join(" ")}>
            <img className={"img-fluid"} src={node.relationships.field_profc_right_image?node.relationships.field_profc_right_image.localFile.childImageSharp.original.src:""} />

          </div>
          
        </div>

          <div className={["col-12 col-lg-8 offset-lg-2"].join(" ")}>
              <div className={profcStyle.bord}></div>
</div>
        </div>
      </div>
    </div>

  )
}

export default ProffC;
export const fragment = graphql`
  fragment paragraphProfessionalCSection on paragraph__professional_c_section{
        
          field_profc_title {
            processed
          }
          field_right_section_describtion {
            processed
          }
          field_right_section_small_title {
            processed
          }
          field_right_col_describtion {
            processed
          }
          relationships {
            field_small_title_and_describtio {
              field_small_title {
                processed
              }
              field_small_describtion {
                processed
              }
            }
            field_percentage_ {
              field_percentage_title {
                processed
              }
              field_percentage_describtion {
                processed
              }
              field_percentage_value {
                processed
              }
            }
            field_profc_left_image {
              id
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
            field_profc_right_image {
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
          field_profc_second_title {
            processed
          }
          field_second_subtitle {
            processed
          }
          field_second_describtion {
            processed
          }
          field_section_footnote {
            processed
          }
        }
      
`;