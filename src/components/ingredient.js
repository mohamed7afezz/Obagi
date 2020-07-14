import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"

import ingredient from '../assets/scss/components/ingredient.module.scss'
import pluswhite from '../assets/images/product-images/plus-white.svg'

const Ingredient = ({ node }) => {
  const data = useStaticQuery(graphql`
    query {
        ingredientimg: file(relativePath: { eq: "product-images/key-ingredients.png" }) {
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
        <div className={["col-12", "col-lg-4", "offset-lg-1", ingredient.leftcol].join(" ")}>
          <h1 className={ingredient.ingredienthead}>Key Ingredients</h1>
          <p className={[ingredient.ingredienttitle, ingredient.ftitle].join(" ")}>Kinetin+
</p>
          <p>
            This nature-identical ingredient mirrors cell building-blocks found in plants; it’s there to combat early signs of aging and restore skin’s firm, fresh appearance. By combining nature and science to rejuvenate skin, studies show growth factors like Kinetin can be a total game-changer.

                </p>
          <p className={[ingredient.ingredienttitle, ingredient.ftitle].join(" ")}>L-ascorbic Acid (Vitamin C)
</p>

          <p>Welcome to Vitamin C in its purest form—an ingredient crucial to keeping skin healthy. It defends against free radicals and photoaging (aging that comes solely from UV light, aka the sun). These properties help reduce the appearance of fine lines and wrinkles, while helping skin maintain a youthful glow.
</p>

          <p className={ingredient.ingredienttitle}>All Ingredients</p>
          <p>Water, Propylene Glycol, PEG-12 Glyceryl Dimyristate, Glycerin, PEG-7 Glyceryl Cocoate, Silica, Lactobacillus Ferment, Butylene Glycol, Carbomer, Phenoxyethanol, Triethanolamine, Betaine, Ethoxydiglycol, Pentylene Glycol, Saccharomyces Cerevisiae Extract, Panthenol, Ethylhexylglycerin, Disodium EDTA, Kinetin, Zeatin, Polyurethane-40, Ruscus Aculeatus Root Extract, Ammonium Glycyrrhizate, Rhodiola Rosea Root Extract, Tetrahexyldecyl Ascorbate, Centella Asiatica Extract, Acetyl Octapeptide-3, Camellia Cinesis Leaf (Green Tea) Extract, Hydrochloric Acid.</p>
        </div>
        <div className={["col-12", "col-lg-5", "offset-lg-1", ingredient.ingredientorder].join(" ")}>
          <h1 className={ingredient.ingredientimagehead}>Key Ingredients</h1>
          <Img fluid={data.ingredientimg.childImageSharp.fluid} alt="ingredientimg" />
        </div>
      </div>
    </div>
  )
}

export default Ingredient;