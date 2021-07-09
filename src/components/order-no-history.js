import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import myAccountStyles from '../assets/scss/components/my-account.module.scss'
import Slider from "react-slick"
import Stars from './stars'
import quizarrow from '../assets/images/arrowquize.svg'
const OrderNoHistory = ({ node }) => {


    const data = useStaticQuery(graphql`
    query {
      skinanalyzer: file(relativePath: { eq: "Skin_Analyzer_6.jpg" }) {
        childImageSharp {
            fluid (quality: 100){
                ...GatsbyImageSharpFluid
              }
        }
      }
    }
    `)


    return (


        <div className="my-account">
            <div className=" d-lg-none">

                <div className={myAccountStyles.topHalf}>
                    <div className={myAccountStyles.topHalfText}>Looks like you haven't placed an order.</div>
                    <Link to="/" className={myAccountStyles.topHalfLink}>Continue Shopping</Link>
                </div>

                <div className={myAccountStyles.bottomHalf}>
                    <div className={myAccountStyles.bottomTitle}>Try our Skin Analyzer</div>
                    <div className={myAccountStyles.bottomText}>Find the best Obagi solution for you</div>
                    <div className={myAccountStyles.bottomLink}><Link  to="/skin-analyzer"> TAKE THE QUIZ <span className={myAccountStyles.bottomArrow} ><img src={quizarrow} class="iconsvg"/></span></Link></div>
                    <div className={myAccountStyles.image}><Img alt="img"  fluid={data.skinanalyzer.childImageSharp.fluid} /></div>
                </div>
            </div>

            <div className="d-none d-lg-block list-wrapper">

                <div className={myAccountStyles.topHalf}>
                    <div className={myAccountStyles.topHalfText}>Looks like you haven't placed an order.</div>
                    <Link to="/" className={myAccountStyles.topHalfLink}>Continue Shopping</Link>
                </div>
                <div className="row">
                    <div className="col-4 pr-0">
                        <div className={myAccountStyles.image}><Img alt="img"  fluid={data.skinanalyzer.childImageSharp.fluid} /></div>
                    </div>
                    <div className="col-8 pl-0">
                        <div className="d-flex align-items-center h-100">
                            <div className={myAccountStyles.bottomHalf}>
                                <div className={myAccountStyles.bottomTitle}>Try our Skin Analyzer</div>
                                <div className={myAccountStyles.bottomText}>Find the best Obagi solution for you</div>
                                <Link to="/skin-analyzer"  className={myAccountStyles.bottomLink}>TAKE THE QUIZ <span className={myAccountStyles.bottomArrow} ><img src={quizarrow} class="iconsvg"/></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default OrderNoHistory;