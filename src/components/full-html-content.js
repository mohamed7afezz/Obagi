import React from 'react';
import { graphql } from 'gatsby';

const FullHTMLContent = ({node}) => (
    <div>
        {node.field_full_html?
        <div dangerouslySetInnerHTML={{__html: node.field_full_html.processed}}></div>
    :""}
        </div>
);

export default FullHTMLContent;

export const fragment = graphql`
    fragment paragraphFullHtmlContent on paragraph__full_html_content {
        id
        field_full_html {
            processed
        }
    }
`;