import React from 'react'
import Img from 'gatsby-image'
import { Link, useStaticQuery, graphql } from 'gatsby'

const Intro = (props) => {
    function sendBackData() {
        props.passChildData(1);
        topFunction();
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

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      } 
    return (
        <>
        {<div className={["white-color Analyzer-padding breadcramp-con", "col-12"].join(" ")}>
              <p className="breadcramp">
                <Link to="/">Home</Link>{" "}
               / <span>Skin Analyzer</span>
                    </p>
            
              </div>}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 d-lg-none">
                        <div><Img alt="img"  fluid={data.header.childImageSharp.fluid} /></div>
                    </div>
                    <div className="col-12 col-lg-4 offset-lg-4 intro-text-wrapper">
                        <div className="text-padding">
                            <h1 className="intro-title">Find your<br /> skin care solution</h1>
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