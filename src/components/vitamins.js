import React from 'react'
import $ from 'jquery'
import { graphql } from 'gatsby'
import vitaminsStyles from '../assets/scss/components/vitamins.module.scss'

const Vitamins = ({ node }) => {

  console.log("vit", node.relationships)
    return (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {node.field_paragraph_title? <div dangerouslySetInnerHTML={{__html: node.field_paragraph_title.processed}}></div> : ""}
                {node.field_vitamins_subtitle? <div dangerouslySetInnerHTML={{__html: node.field_vitamins_subtitle.processed}}></div> : ""}
              </div>
              <div className="col-12">
                {/* { node.relationships?
                    node.relationships.field_vitamins?
                      (node.relationships.field_vitamins.map((item, index) => {
                        return (
                          (item.field_vitamin_name? <div dangerouslySetInnerHTML={{__html: item.field_vitamin_name.processed}}></div> : "")
                          (item.field_vitamin_description? <div dangerouslySetInnerHTML={{__html: item.field_vitamin_description.processed}}></div> : "")
                        )
                      }))

                : "" : ""} */}
              </div>
            </div>
          </div>
        </>
    )
}

export default Vitamins;

export const fragment = graphql`
    fragment paragraphVitamins on paragraph__vitamins {
        id
        field_paragraph_title {
            processed
          }
          field_paragraph_link {
            uri
            title
          }
          field_vitamins_subtitle {
            processed
          }
          relationships {
            field_paragraph_image {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            field_vitamins {
              field_vitamin_name {
                processed
              }
              field_vitamin_description {
                processed
              }
            }
          }
    }
`;