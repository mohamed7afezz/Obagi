import React from 'react'
import $ from 'jquery'
import { graphql } from 'gatsby'


const Basics = ({ node }) => {


    
    return (
        <div>asdasda</div>
    )
}

export default Basics

export const fragment = graphql`
    fragment paragraphBasics on paragraph__basics {
        id
    }
`;