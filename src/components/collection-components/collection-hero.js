import React from 'react'
import { graphql } from "gatsby"
import Collectionherostyle from '../../assets/scss/components/collection-hero.module.scss'
import Img from 'gatsby-image'
const CollectionHero = ({node,nodetype}) => {
  if (node.pageContext.nodetype == 'clinicalConcern') {
    var checkTaxonomy =node.data.taxonomyTermClinicalSkinConcern;
  }
  else if(node.pageContext.nodetype == 'clinicalCategories') {
    var checkTaxonomy =node.data.taxonomyTermClinicalCategories;
  }
  else if (node.pageContext.nodetype == 'medicalConcern'){
    var checkTaxonomy =node.data.taxonomyTermMedicalSkinConcern;
  }
  else{
    var checkTaxonomy =node.data.taxonomyTermMedicalCategories;
  }
  return (

    <div className={["container-fluid", Collectionherostyle.collectionhero,"collectionhero","medical-bg"].join(" ")}>
      {node.pageContext.nodetype == 'clinicalConcern'?
      <div className={"row"}>
        <div className={["col-12","col-lg-3","offset-lg-1",Collectionherostyle.Collectionheroleftcol,"Collectionheroleftcol"].join(' ')}>
          {
          checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy?
          <p className= {[Collectionherostyle.type, node.pageContext.nodetype.includes('medical')? 'medical': ''].join(' ')} > {checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy.field_taxonomy_hero_paraprapgh_t}</p>
          :
          ""
          }
           
          {   
           checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy?
           <h1 className={Collectionherostyle.collectiontitle}>{checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy.field_taxonomy_hero_para_title}</h1>
           :
           ""
          }
             {  checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy?
          <p className={Collectionherostyle.collectiondescription}>{checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy.field_taxonomy_hero_para_desc}</p>
          :
          ""
           }
          </div>
          {  checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy?
        <div className={["col-lg-7","offset-lg-1",'col-12',Collectionherostyle.Collectionherorightcol,'Collectionherorightcol'].join(' ')}>
         {checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i?
         checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile?
          <Img className={Collectionherostyle.allheight} fluid={checkTaxonomy.relationships.field_hero_paraprapgh_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.childImageSharp.fluid}/>
       :""
          : 
        "" 
        }
    </div>
           :
          ""
          }
      </div>
        :
        node.pageContext.nodetype == 'clinicalCategories'?
        <div className={"row"}>
        <div className={["col-12","col-lg-3","offset-lg-1",Collectionherostyle.Collectionheroleftcol,"Collectionheroleftcol"].join(' ')}>
          {
          checkTaxonomy.relationships.field_hero_categories_taxonomy?
          <p className= {Collectionherostyle.type} > {checkTaxonomy.relationships.field_hero_categories_taxonomy.field_taxonomy_hero_paraprapgh_t}</p>
          :
          ""
          }
           
          {   
           checkTaxonomy.relationships.field_hero_categories_taxonomy?
           <h1 className={Collectionherostyle.collectiontitle}>{checkTaxonomy.relationships.field_hero_categories_taxonomy.field_taxonomy_hero_para_title}</h1>
           :
           ""
          }
             {  checkTaxonomy.relationships.field_hero_categories_taxonomy?
          <p className={Collectionherostyle.collectiondescription}>{checkTaxonomy.relationships.field_hero_categories_taxonomy.field_taxonomy_hero_para_desc}</p>
          :
          ""
           }
          </div>
          {  checkTaxonomy.relationships.field_hero_categories_taxonomy?
        <div className={["col-lg-7","offset-lg-1",'col-12',Collectionherostyle.Collectionherorightcol,'Collectionherorightcol'].join(' ')}>
         {checkTaxonomy.relationships.field_hero_categories_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i?
         checkTaxonomy.relationships.field_hero_categories_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile?
          <Img className={Collectionherostyle.allheight} fluid={checkTaxonomy.relationships.field_hero_categories_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.childImageSharp.fluid}/>
       :""
          : 
        "" 
        }
    </div>
           :
          ""
          }
      </div>
        :
        node.pageContext.nodetype == 'medicalConcern'?      <div className={"row"}>
     <div className={["col-12","col-lg-3","offset-lg-1",Collectionherostyle.Collectionheroleftcol,"Collectionheroleftcol"].join(' ')}>
       {
       checkTaxonomy.relationships.field_hero_taxonomy?
       <p className= {Collectionherostyle.type} > {checkTaxonomy.relationships.field_hero_taxonomy.field_taxonomy_hero_paraprapgh_t}</p>
       :
       ""
       }
        
       {   
        checkTaxonomy.relationships.field_hero_taxonomy?
        <h1 className={Collectionherostyle.collectiontitle}>{checkTaxonomy.relationships.field_hero_taxonomy.field_taxonomy_hero_para_title}</h1>
        :
        ""
       }
          {  checkTaxonomy.relationships.field_hero_taxonomy?
       <p className={Collectionherostyle.collectiondescription}>{checkTaxonomy.relationships.field_hero_taxonomy.field_taxonomy_hero_para_desc}</p>
       :
       ""
        }
       </div>
       {  checkTaxonomy.relationships.field_hero_taxonomy?
     <div className={["col-lg-7","offset-lg-1",'col-12',Collectionherostyle.Collectionherorightcol,'Collectionherorightcol'].join(' ')}>
      {checkTaxonomy.relationships.field_hero_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i?
      checkTaxonomy.relationships.field_hero_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile?
       <Img className={Collectionherostyle.allheight} fluid={checkTaxonomy.relationships.field_hero_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.childImageSharp.fluid}/>
    :""
       : 
     "" 
     }
 </div>
        :
       ""
       }
   </div>
        :     
        <div className={"row"}>
    <div className={["col-12","col-lg-3","offset-lg-1",Collectionherostyle.Collectionheroleftcol,"Collectionheroleftcol"].join(' ')}>
      {
      checkTaxonomy.relationships.field_hero_category_taxonomy?
      <p className= {Collectionherostyle.type} > {checkTaxonomy.relationships.field_hero_category_taxonomy.field_taxonomy_hero_paraprapgh_t}</p>
      :
      ""
      }
       
      {   
       checkTaxonomy.relationships.field_hero_category_taxonomy?
       <h1 className={Collectionherostyle.collectiontitle}>{checkTaxonomy.relationships.field_hero_category_taxonomy.field_taxonomy_hero_para_title}</h1>
       :
       ""
      }
         {  checkTaxonomy.relationships.field_hero_category_taxonomy?
      <p className={Collectionherostyle.collectiondescription}>{checkTaxonomy.relationships.field_hero_category_taxonomy.field_taxonomy_hero_para_desc}</p>
      :
      ""
       }
      </div>
      {  checkTaxonomy.relationships.field_hero_category_taxonomy?
    <div className={["col-lg-7","offset-lg-1",'col-12',Collectionherostyle.Collectionherorightcol,'Collectionherorightcol'].join(' ')}>
     {checkTaxonomy.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i?
     checkTaxonomy.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile?
      <Img className={Collectionherostyle.allheight} fluid={checkTaxonomy.relationships.field_hero_category_taxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.childImageSharp.fluid}/>
   :""
      : 
    "" 
    }
</div>
       :
      ""
      }
  </div>

      }
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