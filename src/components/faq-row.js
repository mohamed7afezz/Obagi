import React from 'react'

import faqStyles from '../assets/scss/components/faq-wrapper.module.scss'

export default function FaqRow ({data}) {
    
    return (
        <>
        
            <div>
                {data.field_faq_title ? <div dangerouslySetInnerHTML={{ __html: data.field_faq_title.processed }} className={faqStyles.title}></div> : ''}

                {data.relationships.field_question_and_answer ? data.relationships.field_question_and_answer.map((item, index, array) => {
                    return (
                    <div id={"accordion" + index} className={index == array.length - 1 ? faqStyles.qaWrapper + ' ' + faqStyles.lastQaWrapper : faqStyles.qaWrapper}>
                        <div className="row">
                        <div className="col-11">
                            <div className={index == array.length - 1 ? faqStyles.quesWrapper + ' ' + faqStyles.lastQWrapper : faqStyles.quesWrapper}>
                            {item.field_question_title ? <a data-toggle="collapse" href={"#collapse" + index} role="button" aria-expanded={index == 0 ? "true" : "false"} aria-controls={"collapse" + index} className={index ==0? faqStyles.question : faqStyles.question + ' collapsed'}><div dangerouslySetInnerHTML={{ __html: item.field_question_title.processed }}></div></a> : ''}
                            </div>

                            {item.field_answer ? <div dangerouslySetInnerHTML={{ __html: item.field_answer.processed }} className={index == 0 ? faqStyles.answer + " collapse show" : faqStyles.answer + " collapse"} id={"collapse" + index}></div> : ''}
                        </div>
                        </div>
                        <a className={index== 0? faqStyles.sign + " faq-sign" : faqStyles.sign + " faq-sign collapsed"} data-toggle="collapse" href={"#collapse" + index} role="button" aria-expanded={index == 0 ? "true" : "false"} aria-controls={"collapse" + index}></a>
                    </div>
                    )
                }) : ''}
            </div>
                    
        </>
    )
}
