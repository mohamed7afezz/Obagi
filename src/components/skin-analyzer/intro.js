import React from 'react'
import Img from 'gatsby-image'
import { Link, useStaticQuery, graphql } from 'gatsby'

const Intro = (props) => {
    function sendBackData() {
        props.passChildData(1);
    }

    const data = useStaticQuery(graphql`
    query {
      header: file(relativePath: { eq: "imgSkinAnalyzer.png" }) {
        childImageSharp {
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
    }`)


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 d-lg-none">
                        <div><Img fluid={data.header.childImageSharp.fluid} /></div>
                    </div>
                    <div className="col-12 col-lg-4 offset-lg-4 intro-text-wrapper">
                        <div className="text-padding">
                            <div className="intro-title">Find your<br /> skincare solution</div>
                            <div className="intro-text">Discover what works for you and your skin! Answer the following questions, and we'll recommend product with your top concerns in mind.</div>
                        </div>
                        <div className="col-12 col-lg-6 offset-lg-3">
                            <button href="/skin-analyzer" className="button-link" onClick={sendBackData}>Take the Quiz</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Intro