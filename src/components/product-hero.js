import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import ProductStyles from '../assets/scss/components/product-hero.module.scss'
import Img from 'gatsby-image'
import Stars from '../components/stars'
import modal from '../assets/images/product-images/modal.svg'
import share from '../assets/images/product-images/share.svg'
import Slider from "react-slick";
const ProductHero = ({ node }) => {

  var settings = {
    
    slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
  };
    const data = useStaticQuery(graphql`
    query {
        group: file(relativePath: { eq: "product-images/Clinical-VitaminCEyeBrightener-HeroProduct_PPD2-001.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      
      retinol: file(relativePath: { eq: "product-images/Clinical-VitaminCEyeBrightener-Lifestyle-003.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      vitamins: file(relativePath: { eq: "product-images/Clinical-VitaminCEyeBrightener-Lifestyle-002.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ob: file(relativePath: { eq: "product-images/2019-ob-08-retinol-0110-3.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      f4: file(relativePath: { eq: "product-images/f4.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }`

    )
    return (
        <div className={["container-fluid", ProductStyles.productHero].join(" ")}>
            <div className={["row", ProductStyles.ordering].join(" ")}>
                <div className={["col-12", "col-lg-5", "offset-lg-1",ProductStyles.productimage].join(" ")}>
                <Img fluid={data.group.childImageSharp.fluid} />
                </div>
                <div className={["col-12", "col-lg-4", "offset-lg-1",ProductStyles.productdetail].join(" ")}>
                    <p className={ProductStyles.productcat}>CLINICAL</p>
                    <h1 className={ProductStyles.productname}>Vitamin C Eye Brightener </h1>
                    <p className={ProductStyles.productdesc}>An eye brightener that is designed to energize tired-looking eyes and help minimize signs of aging.</p>
                    <div className={["d-flex",ProductStyles.type].join(" ")}><p>Cream</p>
                     <ul> <li>  Size 0.5 oz </li></ul></div>
                     <div className={["d-flex",ProductStyles.review].join(" ")}><Stars value="0.0"/> 
                     <p>0 Review</p></div>
                     <p className={ProductStyles.price}>From  <span>$60</span></p>
                     <p className={ProductStyles.canuse}>Skin Type: <a href="#"> Normal</a>, <a href="#">Dry</a>, <a href="#">Combination</a> and <a href="#">Oily</a></p>
                     <p className={ProductStyles.Indications}> Skin Concerns:  <a href="#">Dark Circles</a>, <a href="#"> Fine Lines and Wrinkles</a>and <a href="#">Loss of Firmness and Elasticity</a></p>
                     <p className={ProductStyles.quantityhead}>Quantity:</p> 
                     <div className={[ProductStyles.quantity,"d-flex"].join(" ")}>
                        <div className={[ProductStyles.selectdiv,"col-3"].join(" ")}>
                         <select >
                             <option>1</option>
                             <option>2</option>
                             <option>3</option>
                             <option>4</option>
                             <option>5</option>
                             <option>6</option>
                         </select>
                         </div>
                       <div className={["col-12", "col-lg-6", ProductStyles.codeoff].join(" ")}> <p >Apply 20% off with code <span>Covid </span></p>   <img src={modal} /> </div>
                         <p className={["col-12", "col-lg-2", ProductStyles.share].join(" ")}> <img src={share} /> Share </p>
                         
                     </div>
                     <button className={["btn", ProductStyles.btnCart].join(" ")}>Add to Bag</button>
                </div>
                <div className={["col-12" ,ProductStyles.images ].join(" ")}>
                <Img fluid={data.group.childImageSharp.fluid}  className={["col-3","pr-0","pl-0"].join(" ")}  />
                <Img fluid={data.vitamins.childImageSharp.fluid} className={["col-3", "pr-0","pl-0"].join(" ")}  />
                <Img fluid={data.ob.childImageSharp.fluid} className={["col-3", "pr-0","pl-0"].join(" ")}  />
                <Img fluid={data.retinol.childImageSharp.fluid} className={["col-3", "pr-0","pl-0"].join(" ")}  />

                </div>
            </div>

        </div>

    )
}

export default ProductHero;