import React from 'react'
import { Link, graphql } from 'gatsby'
import headingStyles from '../assets/scss/components/heading-and-button.module.scss'

const HeadingAndButton = ({ node }) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8 offset-2">
                        {node.field_heading ? <div dangerouslySetInnerHTML={{ __html: node.field_heading.processed }} className={headingStyles.heading}></div> : ''}
                    </div>
                    <div className="col-12 col-lg-2 offset-lg-5">
                        {node.field_heading_link ? <div><a href={node.field_heading_link.uri} className={["button-link", headingStyles.link].join(" ")} target="_blank">{node.field_heading_link.title}</a></div> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeadingAndButton

export const fragment = graphql`
    fragment paragraphHeadingAndButton on paragraph__heading_and_button{
        id
        field_heading {
            processed
        }
        field_heading_link {
            title
            uri
        }
    }`