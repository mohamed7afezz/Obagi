import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import basichero from '../assets/scss/components/basic-hero.module.scss'
const Basichero = ({ node }) => {
  console.log('hassan',node)
    return (
      <div className={basichero.sectionBg}>
      <div className={["container-fluid ","basicbg",basichero.givepadding].join(" ")}>
      <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              basichero.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row remove-mob-padding">
              <div className="offset-lg-1">
             
    {
                  <h1 className={basichero.collectiontitle}>
                    {
                      <div dangerouslySetInnerHTML={{__html: node.field_basic_hero_title_paragrapg
                        .processed}}></div>
                    }
                  </h1>
               }
                { 
                  <div className={basichero.collectiondescription}
                    dangerouslySetInnerHTML={{
                      __html: node.field_basic_hero_desc_paragrapgh.processed
                    }}
                  >

                  </div>
               
                  }
              </div>

            </div>
          </div>
        
            <div
              className={[
                "col-lg-7",                
                "col-12",
                basichero.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >

              { 
                  
                      <img
                        className={[basichero.allheight,"img-fluid-height"].join(" ")}
                        src={
                          node.relationships.field_basic_img_hero_paragrapgh
                           
                            .localFile.childImageSharp.original.src
                        }
                      />
                  
                
                }
            </div>

          
        </div>
        </div>
        </div>       
        )
}

export default Basichero

export const fragment = graphql`
fragment paragrapghBasicHero on paragraph__basic_hero_paragrapgh {
    id
    field_basic_hero_title_paragrapg {
      processed
    }
    field_basic_hero_desc_paragrapgh {
      processed
    }
    relationships {
      field_basic_img_hero_paragrapgh {
        localFile {
          childImageSharp {
            fluid {
              src
            }
            original{
                src
            }
          }
        }
      }
    }
  }`