import React from "react"
import { graphql } from 'gatsby';
import Layout from "./layout"
import SkinAnalyzerMain from "./skin-analyzer/main"
import SEO from './seo';


const SkinAnalyzer = () => (
    <> 
        <SkinAnalyzerMain/>
    </>  
)

export default SkinAnalyzer
export const fragment = graphql`
    fragment paragraphSkinAnalyzer on paragraph__skin_analyzer {
        id
    }`
        