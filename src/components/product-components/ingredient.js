import React from 'react'
import Img from 'gatsby-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from "gatsby"

import * as ingredient from '../../assets/scss/components/ingredient.module.scss'
import pluswhite from '../../assets/images/product-images/plus-white.svg'

const Ingredient = ({ node }) => {
 
  const data = node.relationships;
  return (

    <div className={["container-fluid", ingredient.ingredientcontent,"ingredientcontent"].join(" ")}>
      <div className={["row","mobdcol"].join(" ")}>
        <div id="ing" className={["col-12", "col-lg-4", "offset-lg-1","collapse", "multi-collapse", ingredient.leftcol].join(" ")}>
          <div className={ingredient.ingredienthead}>{node.field_ingredienthead?node.field_ingredienthead.processed:''}</div>
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
          <div className="show-mob-d-flex mob-colap">
          <div className={ingredient.ingredientimagehead}>{node.field_ingredienthead?node.field_ingredienthead.processed:''}</div>
          <a className={[ingredient.ingredienttitle,ingredient.expand, ingredient.ftitle, "expand readmorefix collapsed mt-0"].join(" ")}  data-toggle="collapse" href="#ing" role="button" aria-expanded="false" aria-controls="ing"></a> 
         </div>
          {
            data.field_ingredient_image?
            (data.field_ingredient_image.relationships.field_section_image?
              <div id="ing" className={"collapse multi-collapse show-block-desk mob-mt-24"}>
                  {/* <Img fluid={(data.field_ingredient_image.relationships.field_section_image && data.field_ingredient_image.relationships.field_section_image.localFile)?
                 data.field_ingredient_image.relationships.field_section_image.localFile.childImageSharp.fluid : ''} alt="ingredientimg" /> */}
                 <GatsbyImage alt="ingredientimg" image={(data.field_ingredient_image.relationships.field_section_image && data.field_ingredient_image.relationships.field_section_image.localFile)?
                 data.field_ingredient_image.relationships.field_section_image.localFile.childImageSharp.gatsbyImageData : ''} />
                 </div> : '')
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
                gatsbyImageData(layout: FULL_WIDTH)
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