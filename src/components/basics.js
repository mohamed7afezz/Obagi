import React from 'react'
import $ from 'jquery'
import { graphql } from 'gatsby'
import basicsStyles from '../assets/scss/components/basics.module.scss'

const Basics = ({ node }) => {



    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {node.field_basics_header? <div className={basicsStyles.title} dangerouslySetInnerHTML={{__html: node.field_basics_header.processed}}></div> : ""}
                        {node.field_basics_subtitle? <div className={basicsStyles.subtitle} dangerouslySetInnerHTML={{__html: node.field_basics_subtitle.processed}}></div> : ""}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {node.relationships && node.relationships.field_basics_product_card?
                            node.relationships.field_basics_product_card.map((item, index) => {
                                return(
                                    <>
                                        {item.field_basics_card_title? <div className={basicsStyles.pTitle} dangerouslySetInnerHTML={{__html: item.field_basics_card_title.processed}}></div> : ""}
                                        {item.field_basics_products_field? <div className={basicsStyles.pField} dangerouslySetInnerHTML={{__html: item.field_basics_products_field.processed}}></div> : ""}
                                        {item.field_view_all_field? <div className={basicsStyles.vaField} dangerouslySetInnerHTML={{__html: item.field_view_all_field.processed}}></div> : ""}
                                        {item.field_basics_card_description? <div className={basicsStyles.pDesc} dangerouslySetInnerHTML={{__html: item.field_basics_card_description.processed}}></div> : ""}
                                        {item.field_has_colored_section && item.field_has_colored_section === 'true'? <div className={basicsStyles.yellowSection}></div> : ""}
                                    </>
                                )
                            })
                        : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Basics

export const fragment = graphql`
    fragment paragraphBasics on paragraph__basics {
        id
        field_basics_header {
            processed
          }
          field_basics_subtitle {
            processed
          }
          relationships {
            field_basics_product_card {
              field_basics_card_title {
                processed
              }
              field_basics_products_field {
                processed
              }
              field_view_all_field {
                processed
              }
              field_basics_card_description {
                processed
              }
              field_has_colored_section
            }
          }
    }
`;