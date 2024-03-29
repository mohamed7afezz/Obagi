import React from 'react'

import * as faqStyles from '../assets/scss/components/faq-wrapper.module.scss'

export default function FaqRow({ data, productPage }) {

    return (
        <>

            <div>
                {data.field_faq_title ? <div dangerouslySetInnerHTML={{ __html: data.field_faq_title.processed }} className={productPage? faqStyles.productPageTitle : faqStyles.title}></div> : ''}

                <div className={faqStyles.largeWrapper}>
                    {data.relationships.field_question_and_answer ? data.relationships.field_question_and_answer.map((item, index, array) => {
                        return (
                            <div id={"accordion" + item.field_question_title.processed.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, "") + index} className={index == array.length - 1 ? faqStyles.qaWrapper + ' ' + faqStyles.lastQaWrapper : faqStyles.qaWrapper}>
                                {/* <div className="row"> */}
                                {/* <div className="col-11"> */}
                                <div className={index == array.length - 1 ? faqStyles.quesWrapper + ' ' + faqStyles.lastQWrapper : faqStyles.quesWrapper}>
                                    {item.field_question_title ? <a data-toggle="collapse" href={"#collapse" + item.field_question_title.processed.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, "") + index} role="button" aria-expanded={index == 0 ? "true" : "false"} aria-controls={"collapse" + item.field_question_title.processed.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, "") + index} className={index == 0 ? faqStyles.question : faqStyles.question + ' collapsed'}><div dangerouslySetInnerHTML={{ __html: item.field_question_title.processed }}></div></a> : ''}
                                </div>

                                {item.field_answer ? <div dangerouslySetInnerHTML={{ __html: item.field_answer.processed }} className={index == 0 ? faqStyles.answer + " collapse show" : faqStyles.answer + " collapse"} id={"collapse" + item.field_question_title.processed.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, "") + index}></div> : ''}
                                {/* </div> */}
                                {/* </div> */}
                                <a className={index == 0 ? faqStyles.sign + " faq-sign" : faqStyles.sign + " faq-sign collapsed"} data-toggle="collapse" href={"#collapse" + item.field_question_title.processed.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, "") + index} role="button" aria-expanded={index == 0 ? "true" : "false"} aria-controls={"collapse" + item.field_question_title.processed.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, "") + index}></a>
                            </div>
                        )
                    }) : ''}
                </div>
            </div>

        </>
    )
}
