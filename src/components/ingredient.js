import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"

import ingredient from '../assets/scss/components/ingredient.module.scss'
import pluswhite from '../assets/images/product-images/plus-white.svg'

const Ingredient = ({ node }) => {
    const data = useStaticQuery(graphql`
    query {
        ingredientimg: file(relativePath: { eq: "product-images/ingredient.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pluswhite: file(relativePath: { eq: "product-images/iplus-white.svg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
      `)
    return (
        
        <div className={["container-fluid", ingredient.ingredientcontent].join(" ")}>
        <div className={"row"}>
            <div className={["col-12", "col-lg-4", "offset-lg-1",ingredient.leftcol].join(" ")}>
                <h1 className={ ingredient.ingredienthead}>Key Ingredients</h1>
                <p className={[ ingredient.ingredienttitle,ingredient.ftitle].join(" ")}>Ingredient Name</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a felis nec elit congue blandit consequat a nisl. Sed lorem justo, laoreet in nibh eu lobortis suscipit lacus. Morbi turpis ex lobortis eget nulla molestie tincidunt urna. Fusce maximus fringilla nisi vel dignissim nisl. Vivamus ultrices laoreet enim ac fermentum…</p>
                <p className={ ingredient.ingredienttitle}>Ingredient Name</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a felis nec elit congue blandit consequat a nisl. Sed lorem justo, laoreet in nibh eu lobortis </p>
                <a className={ingredient.expand} data-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3"><img src={pluswhite}/> All Ingredients</a>
                     <div class="collapse multi-collapse"  id="multiCollapseExample3">
                        <p >
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </p>
                    </div>
             
                </div>
                <div className={["col-12", "col-lg-5", "offset-lg-1",ingredient.ingredientorder].join(" ")}>
                <h1 className={ ingredient.ingredientimagehead}>Key Ingredients</h1>
                    <Img fluid={data.ingredientimg.childImageSharp.fluid} alt="ingredientimg"/>
                </div>
                </div>
                </div>
   )
}

export default Ingredient;