import React from 'react'
import { graphql } from 'gatsby'
import * as faqStyles from '../assets/scss/components/faq-wrapper.module.scss'
import Paginator from './paginator'
import FaqRow from './faq-row'
import Customer from '../components/customer-care'
import * as myAccountStyles from '../assets/scss/components/my-account.module.scss'
const ProductFaqs = ({ node }) => {

    let isMedicalProduct = node.relationships && node.relationships.node__medical_product? true : false;
    return (
        <>

            <div className={`${faqStyles.wrapper} container-fluid faq-wrapper`}>

                <div className="row">
                    <div className="col-12 col-lg-10 offset-lg-1">
                        <div id="list">
                            {node.relationships && node.relationships.field_product_faq_section ?
                                node.relationships.field_product_faq_section.map(item => (
                                    <FaqRow data={item} productPage={isMedicalProduct}/>
                                )) : ''}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default ProductFaqs

export const fragment = graphql`
    fragment paragraphProductFaqs on paragraph__product_faqs {
        id
        relationships {
          node__medical_product {
            field_medical_id
          }
          field_product_faq_section {
            field_faq_title {
              processed
            }
            relationships {
              field_question_and_answer {
                field_question_title {
                  processed
                }
                field_answer {
                  processed
                }
              }
            }
          }
        }
    }`