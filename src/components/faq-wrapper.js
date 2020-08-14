import React from 'react'
import { graphql } from 'gatsby'
import faqStyles from '../assets/scss/components/faq-wrapper.module.scss'

const FaqWrapper = ({ node }) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {node.relationships.field_faq_section? 
                               node.relationships.field_faq_section.map((item, index) => {
                                   return (
                                    <div>
                                                                             {/* (item.field_faq_title? <div dangerouslySetInnerHTML={{__html: item.field_faq_title.processed}}></div> : '')
                                       (item.relationships.field_question_and_answer?
                                        item.relationships.field_question_and_answer.map((item, index) => {
                                            // return (
                                            //     <div dangerouslySetInnerHTML={{__html: item.field_question_title.processed}}></div>
                                            //     <div dangerouslySetInnerHTML={{__html: item.field_answer.processed}}></div>
                                            // )
                                        })
                                         : '') */}
                                       
                                    </div>
                                   )
                               })
                        :''}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FaqWrapper

export const fragment = graphql`
    fragment paragraphFaqWrapper on paragraph__faq_wrapper {
        id
        relationships {
            field_faq_section {
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