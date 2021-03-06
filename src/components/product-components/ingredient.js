import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"

import ingredient from '../../assets/scss/components/ingredient.module.scss'
import pluswhite from '../../assets/images/product-images/plus-white.svg'

const Ingredient = ({ node }) => {
 
  const data = node.relationships;
  return (

    <div className={["container-fluid", ingredient.ingredientcontent,"ingredientcontent"].join(" ")}>
      <div className={["row","mobdcol"].join(" ")}>
        <div className={["col-12", "col-lg-4", "offset-lg-1", ingredient.leftcol].join(" ")}>
          <h1 className={ingredient.ingredienthead}>{node.field_ingredienthead?node.field_ingredienthead.processed:''}</h1>
          {
            data.field_ingredientdescription.map(item => (
              <div>
                <p className={[ingredient.ingredienttitle, ingredient.ftitle].join(" ")}>{item.field_subtitle_}</p>
                <div dangerouslySetInnerHTML={{__html:item.field_subtitledescrip?item.field_subtitledescrip.processed :''}}></div>
               

              </div>
            ))
          }
         { 
             data.field_read_more.map(item => (
                <div>
                   <a className={[ingredient.ingredienttitle,ingredient.expand, ingredient.ftitle, "expand readmorefix collapsed"].join(" ")}  data-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3"><div dangerouslySetInnerHTML={{__html:item.field_re.processed}}>
                </div></a>      
               <div className="collapse multi-collapse"  id="multiCollapseExample3">    
                 <div  dangerouslySetInnerHTML={{__html:item.field_read_more_content?item.field_read_more_content.processed:''}} ></div>   
                 </div>
               </div>
            ))
          }
        </div>
        <div className={["col-12", "col-lg-5", "offset-lg-1", ingredient.ingredientorder].join(" ")}>
          <h1 className={ingredient.ingredientimagehead}>{node.field_ingredienthead?node.field_ingredienthead.processed:''}</h1>
          {
            data.field_ingredient_image?
            (data.field_ingredient_image.relationships.field_section_image? <Img fluid={(data.field_ingredient_image.relationships.field_section_image && data.field_ingredient_image.relationships.field_section_image.localFile)? data.field_ingredient_image.relationships.field_section_image.localFile.childImageSharp.fluid : ''} alt="ingredientimg" /> : '')
            :
            ''
          }
          </div>
      </div>
    </div>
  )
}

export default Ingredient;
export const fragment = graphql`
  fragment ingredientParagraph on paragraph__ingredient{
    id
    relationships {
      field_ingredient_image {
        relationships {
          field_section_image {
            localFile {
              childImageSharp {
                fluid (quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      field_ingredientdescription {
        field_subtitledescrip {
          processed
        }
        field_subtitle_
      }
      field_read_more {
        field_re {
          processed
        }
        field_read_more_content {
          processed
        }
      }
    }
    field_ingredienthead {
      processed
    }
  } 
`;