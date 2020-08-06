import React from 'react'

import detailsStyles from '../../assets/scss/components/thedetails.module.scss'
import plus from '../../assets/images/product-images/plus.svg'
import { graphql } from 'gatsby'
const Details = ({ node }) => {
    const data = node.relationships;
    return (
        <div className={["container-fluid", "detailHero" ,detailsStyles.detailHero].join(" ")}>
            <div className={"row"}>
               {
                   data.field_detail_safe.map(item => (
                    <div className={["col-12", "col-lg-4", "offset-lg-1"].join(" ")}>
                        <div className={detailsStyles.detail}>
                            {
                            item.field_sec?
                                <h1 dangerouslySetInnerHTML={{__html: item.field_sec.processed}}></h1>
                            :
                                ''
                            }
                            <div className={detailsStyles.safe} dangerouslySetInnerHTML={{__html: item.field_sectiondescription.processed}}></div>
                        </div>
                    </div>
                   ))
               }
            </div>
        </div>
    )
}

export default Details;

export const fragment = graphql`
    fragment detailsSafeParagraph on paragraph__the_details_safe_section {
        id
        relationships {
            field_detail_safe {
              field_sec {
                processed
              }
              field_sectiondescription {
                processed
              }
            }
        }
    }
`;