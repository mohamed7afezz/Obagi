import React from 'react'
import { graphql } from "gatsby"
import Collectionherostyle from '../../assets/scss/components/collection-hero.module.scss'
import Img from 'gatsby-image'
const CollectionHero = ({node}) => {
  console.log("Hero" , node)
  return (

    <div className={["container-fluid", Collectionherostyle.collectionhero,"collectionhero"].join(" ")}>
      <div className={"row"}>
        <div className={["col-12","col-lg-3","offset-lg-1",Collectionherostyle.Collectionheroleftcol,"Collectionheroleftcol"].join(' ')}>
        <p className= {Collectionherostyle.type} > {node.taxonomyTermClinicalSkinConcern.relationships.field_hero_paraprapgh_taxonomy.field_taxonomy_hero_paraprapgh_t}</p>
         <h1 className={Collectionherostyle.collectiontitle}>{node.taxonomyTermClinicalSkinConcern.relationships.field_hero_paraprapgh_taxonomy.field_taxonomy_hero_para_title}</h1>
          <p className={Collectionherostyle.collectiondescription}>{node.taxonomyTermClinicalSkinConcern.relationships.field_hero_paraprapgh_taxonomy.field_taxonomy_hero_para_desc}</p>
        </div>
        <div className={["col-lg-7","offset-lg-1",'col-12',Collectionherostyle.Collectionherorightcol,'Collectionherorightcol'].join(' ')}>
         {node.taxonomyTermClinicalSkinConcern.relationships.field_hero_paraprapgh_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i?
         node.taxonomyTermClinicalSkinConcern.relationships.field_hero_paraprapgh_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile?
          <Img className={Collectionherostyle.allheight} fluid={node.taxonomyTermClinicalSkinConcern.relationships.field_hero_paraprapgh_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.childImageSharp.fluid}/>
       :""
          : 
        "" 
        }
    </div>
        </div>
        </div>

    )
}

export default CollectionHero;
export const fragment = graphql`
  fragment collectionhero on taxonomy_term__clinical_skin_concern{
    id
    relationships {
      field_hero_paraprapgh_taxonomy {
        field_taxonomy_hero_para_title
        field_taxonomy_hero_para_desc
        field_taxonomy_hero_paraprapgh_t
        relationships {
          field_taxonomy_hero_paraprapgh_i {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
              }
              original {
                  src
              }
              }
            }
          }
        }
      }
    }
  } 
`;