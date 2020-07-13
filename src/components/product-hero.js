import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import ProductStyles from '../assets/scss/components/product-hero.module.scss'
import Img from 'gatsby-image'
import Stars from '../components/stars'
import modal from '../assets/images/product-images/modal.svg'
import share from '../assets/images/product-images/share.svg'
const ProductHero = ({ node }) => {
    const data = useStaticQuery(graphql`
    query {
        group: file(relativePath: { eq: "product-images/group.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      
      retinol: file(relativePath: { eq: "product-images/2022-ob-07-0264-retinol-cream-leave-vitamins.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      vitamins: file(relativePath: { eq: "product-images/retinol-cream-leave-vitamins-2.png" }) {
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
                    <h1 className={ProductStyles.productname}>Retinol 0.5 Retexturizing Cream
                    Clear FX</h1>
                    <p className={ProductStyles.productdesc}>An elegant retinol formula that helps improve skin tone, texture, and minimize imperfections.</p>
                    <div className={["d-flex",ProductStyles.type].join(" ")}><p>Cream</p>
                     <ul> <li>  Size 2.0 fl oz </li></ul></div>
                     <div className={["d-flex",ProductStyles.review].join(" ")}><Stars value="5.0"/> 
                     <p>2k Reviews</p></div>
                     <p className={ProductStyles.price}>From  <span>$100</span></p>
                     <p className={ProductStyles.canuse}>Skin Type: <a href="#"> Normal</a>, <a href="#">Dry</a>, <a href="#">Combination</a>, <a href="#">Oily</a></p>
                     <p className={ProductStyles.Indications}> Skin Concerns:  <a href="#">Fine Lines & Wrinkles</a>, <a href="#">Dryness</a>, <a href="#">Dullness</a>, <a href="#">Uneven Texture</a></p>
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
                <Img fluid={data.retinol.childImageSharp.fluid}  className={["col-3","pr-0","pl-0"].join(" ")}  />
                <Img fluid={data.vitamins.childImageSharp.fluid} className={["col-3", "pr-0","pl-0"].join(" ")}  />
                <Img fluid={data.ob.childImageSharp.fluid} className={["col-3", "pr-0","pl-0"].join(" ")}  />
                <Img fluid={data.f4.childImageSharp.fluid} className={["col-3", "pr-0","pl-0"].join(" ")}  />

                </div>
            </div>

        </div>

    )
}

export default ProductHero;