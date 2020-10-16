import React from "react"
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import SkinAnalyzerMain from "../components/skin-analyzer/main"
import SEO from '../components/seo';


const skinAnalyzer = ({ data }) => (
    <Layout> 
        <SEO title="Skin Analyzer" description="Skin Analyzer Description" />
        <SkinAnalyzerMain/>
    </Layout>  
)

export default skinAnalyzer

        