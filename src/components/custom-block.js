import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import CollectionFooter from './collection-components/collection-footer'
// import * as servicesStyles from '../assets/scss/components/services.module.scss'

const CustomBlock = ({ node }) => {
    return (
        <CollectionFooter />
    )
}

export default CustomBlock
export const fragment = graphql`
    fragment paragraphCustomBlock on paragraph__custom_block {
        id
    }`