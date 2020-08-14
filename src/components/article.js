import React from 'react'
import { graphql } from 'gatsby'
import articleStyles from '../assets/scss/components/article.module.scss'

const Article = ({ node }) => {
    return (
        <div>
            <div className={["container-fluid", articleStyles.wrapper].join(" ")}>
                <div className="row">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        {node.field_article_headline ? <div dangerouslySetInnerHTML={{ __html: node.field_article_headline.processed }} className={articleStyles.headline}></div> : ''}
                        {node.field_article_text ? <div dangerouslySetInnerHTML={{ __html: node.field_article_text.processed }} className={articleStyles.text}></div> : ''}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 offset-lg-4">
                        <div className={articleStyles.horizontalDivider} ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article

export const fragment = graphql`
    fragment paragraphArticle on paragraph__article {
        id
        field_article_headline {
            processed
        }
        field_article_text {
            processed
        }
    }`