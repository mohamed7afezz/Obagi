import React  from 'react'
import { useStaticQuery,graphql, Link } from "gatsby"
import Collectionfooterstyle from "../../assets/scss/components/collectionfooterstyle.module.scss"
import Img from 'gatsby-image'
const CollectionFooter = ({ node, nodetype,checktaxonomyType })=> {

  const FooterBlockList = useStaticQuery(graphql`
    query{
      allBlockContentTaxonomyFooterBlock {
          edges {
            node {
              drupal_id
              info
              field_taxonomy_footer_type
              field_taxonomy_footer_title
              field_taxonomy_footer_subtitle
              field_taxonomy_footer_button
              field_button_url
              relationships {
                field_taxonomy_footer_image {
                  localFile {
                    childImageSharp {
                      fluid (quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
              body {
                processed
              }
            }
          }
        }
    }
  `);

  let checkfooter = "";
  let pageNodeType = nodetype ? nodetype : ""
 
  if (pageNodeType == "medicalConcern") {
    
    checkfooter =
    node.taxonomyTermMedicalSkinConcern.field_medical_sk_col_footer_mod?
    node.taxonomyTermMedicalSkinConcern.field_medical_sk_col_footer_mod.processed:""
  } else if (pageNodeType == "medicalCategories") {
    checkfooter =
      node.taxonomyTermMedicalCategories.field_medical_cat_col_footer_mod?
      node.taxonomyTermMedicalCategories.field_medical_cat_col_footer_mod.processed:""
  }else if(pageNodeType == 'medicalLine'){
    checkfooter =
      node.taxonomyTermMedicalProductLines.field_medical_pro_col_footer_mod?
      node.taxonomyTermMedicalProductLines.field_medical_pro_col_footer_mod.processed:""
  }else if(pageNodeType == 'skinMedicalType'){
    checkfooter =
    node.taxonomyTermMedicalSkinType.field_medical_skt_col_footer_mod?
    node.taxonomyTermMedicalSkinType.field_medical_skt_col_footer_mod.processed:"" 
  } else if(pageNodeType == 'MedicalIngredients'){
    checkfooter =
    node.taxonomyTermMedicalIngredients.field_medical_ing_col_footer_mod?
    node.taxonomyTermMedicalIngredients.field_medical_ing_col_footer_mod.processed:""   
  }
  else{
    checkfooter = "clinical"
  }




  let getdata;

  for (let i = 0; i < FooterBlockList.allBlockContentTaxonomyFooterBlock.edges.length; i++) {
    let checkdata = FooterBlockList.allBlockContentTaxonomyFooterBlock.edges[i].node;
    if (checkdata.info=='Skin Analyzer Footer Block') {
      getdata = checkdata;
      break;
    }
  }

  if (typeof window !== `undefined`) {
    
    const $ = require('jquery');
 
 
  }
 
return (
    <>
    <div 
     className={checktaxonomyType === "clinical"? 
      "container-fluid collectionhero collectionfooter " + Collectionfooterstyle.collectionfooter
      :"container-fluid collectionhero collectionfooter  "+Collectionfooterstyle.footerMedicalBg + " " + Collectionfooterstyle.collectionfooter}
    >
    
        <div className={"row"}>
          <div className={["col-12","col-lg-10",'row',"offset-lg-1", "collection-footer-container",Collectionfooterstyle.CollectionFooterContainer].join(' ')}>

            <div className={['col-12','col-lg-6',Collectionfooterstyle.collectionFooterleftcol,"collectionFooterleftcol"].join(' ')}>
            <p className={Collectionfooterstyle.typeimg}>{getdata.field_taxonomy_footer_type}</p>
            {getdata.relationships.field_taxonomy_footer_image.localFile?
            getdata.relationships.field_taxonomy_footer_image.localFile.childImageSharp?
             <Img className={Collectionfooterstyle.fullheightimg} fluid={getdata.relationships.field_taxonomy_footer_image.localFile.childImageSharp.fluid}/>
            :"":""
            }
            </div>
            <div className={['col-10 offset-1','col-lg-4','offset-lg-1',Collectionfooterstyle.collectionFooterRightcol,"collectionFooterRightcol"].join(' ')}>
                      <p className={[Collectionfooterstyle.typecon, "collection-footer-typecon"].join(" ")}>{getdata.field_taxonomy_footer_type}</p>
                      <h1 className={[Collectionfooterstyle.collectionFooterTitle, "collection-footer-title"].join(" ")}>{getdata.field_taxonomy_footer_title}</h1>
                      <p className={Collectionfooterstyle.subtitle}>{getdata.field_taxonomy_footer_subtitle}</p>
                      <div className={[Collectionfooterstyle.description, "collection-footer-desc"].join(" ")} dangerouslySetInnerHTML={{__html: getdata.body.processed}}></div>
                      <div className={[Collectionfooterstyle.linkcontainer,"CollectionFooterContainer"].join(' ')}>
                      <a className={[Collectionfooterstyle.link, "collection-footer-link"].join(" ")} href={getdata.field_button_url}>{getdata.field_taxonomy_footer_button}</a>
                      </div>
                  </div>
               </div>
           
             </div>
            
          </div>

          {checkfooter === 'medical'? 
             
               <div className={Collectionfooterstyle.footerModCon}>
                 <div className={["container-fluid"]}>
                 <div className="row">
               <div className="col-12 col-lg-8 offset-lg-1">
               <div className={Collectionfooterstyle.footerMod} 
               dangerouslySetInnerHTML={{ __html: checkfooter }}

               >
                </div>
               </div>
               </div>
               </div>
               </div>
               :""
               }

          </>
    )
}




export default CollectionFooter;