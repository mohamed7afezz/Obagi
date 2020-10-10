import React  from 'react'
import { useStaticQuery,graphql, Link } from "gatsby"
import Collectionfooterstyle from "../../assets/scss/components/collectionfooterstyle.module.scss"
import servicesStyles from '../../assets/scss/components/services.module.scss'
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
  let getTwoSection="";
  if (pageNodeType == "medicalConcern") {
    
    getTwoSection=node.taxonomyTermMedicalSkinConcern.relationships.field_footer_two_section_med_ski?node.taxonomyTermMedicalSkinConcern.relationships.field_footer_two_section_med_ski[0]?
    node.taxonomyTermMedicalSkinConcern.relationships.field_footer_two_section_med_ski[0].relationships?
    node.taxonomyTermMedicalSkinConcern.relationships.field_footer_two_section_med_ski[0].relationships.field_service_card:"":"":"";
    // checkfooter =
    // node.taxonomyTermMedicalSkinConcern.field_medical_sk_col_footer_mod?
    // node.taxonomyTermMedicalSkinConcern.field_medical_sk_col_footer_mod.processed:""
  } else if (pageNodeType == "medicalCategories") {
    
    getTwoSection=node.taxonomyTermMedicalCategories.relationships.field_footer_two_section_med_cat?node.taxonomyTermMedicalCategories.relationships.field_footer_two_section_med_cat[0]?
    node.taxonomyTermMedicalCategories.relationships.field_footer_two_section_med_cat[0].relationships?
    node.taxonomyTermMedicalCategories.relationships.field_footer_two_section_med_cat[0].relationships.field_service_card:"":"":"";
    // checkfooter =
    //   node.taxonomyTermMedicalCategories.field_medical_cat_col_footer_mod?
    //   node.taxonomyTermMedicalCategories.field_medical_cat_col_footer_mod.processed:""
  }else if(pageNodeType == 'medicalLine'){
    
    getTwoSection=node.taxonomyTermMedicalProductLines.relationships.field_footer_two_section_title?node.taxonomyTermMedicalProductLines.relationships.field_footer_two_section_title[0]?
    node.taxonomyTermMedicalProductLines.relationships.field_footer_two_section_title[0].relationships?
    node.taxonomyTermMedicalProductLines.relationships.field_footer_two_section_title[0].relationships.field_service_card:"":"":"";
    checkfooter =
      node.taxonomyTermMedicalProductLines.field_medical_pro_col_footer_mod?
      node.taxonomyTermMedicalProductLines.field_medical_pro_col_footer_mod.processed:""
  }else if(pageNodeType == 'skinMedicalType'){
    
    getTwoSection=node.taxonomyTermMedicalSkinType.relationships.field_taxonomy_footer_two?node.taxonomyTermMedicalSkinType.relationships.field_taxonomy_footer_two[0]?
    node.taxonomyTermMedicalSkinType.relationships.field_taxonomy_footer_two[0].relationships?
    node.taxonomyTermMedicalSkinType.relationships.field_taxonomy_footer_two[0].relationships.field_service_card:"":"":"";
    // checkfooter =
    // node.taxonomyTermMedicalSkinType.field_medical_skt_col_footer_mod?
    // node.taxonomyTermMedicalSkinType.field_medical_skt_col_footer_mod.processed:"" 
  } else if(pageNodeType == 'MedicalIngredients'){
 
    getTwoSection=node.taxonomyTermMedicalIngredients.relationships.field_footer_two_section_med_ing?node.taxonomyTermMedicalIngredients.relationships.field_footer_two_section_med_ing[0]?
    node.taxonomyTermMedicalIngredients.relationships.field_footer_two_section_med_ing[0].relationships?
    node.taxonomyTermMedicalIngredients.relationships.field_footer_two_section_med_ing[0].relationships.field_service_card:"":"":"";
    checkfooter =
    node.taxonomyTermMedicalIngredients.field_medical_ing_col_footer_mod?
    node.taxonomyTermMedicalIngredients.field_medical_ing_col_footer_mod.processed:"";
  }
  else if(pageNodeType == 'clinicalCategories'){
    getTwoSection=node.taxonomyTermClinicalCategories.relationships.field_footer_two_section_cat?node.taxonomyTermClinicalCategories.relationships.field_footer_two_section_cat[0]?
    node.taxonomyTermClinicalCategories.relationships.field_footer_two_section_cat[0].relationships?
    node.taxonomyTermClinicalCategories.relationships.field_footer_two_section_cat[0].relationships.field_service_card:"":"":""
  }
  else if(pageNodeType == 'ClinicalIngredients'){
    getTwoSection=node.taxonomyTermClinicalIngredients.relationships.field_footer_two_section_cli_ing?node.taxonomyTermClinicalIngredients.relationships.field_footer_two_section_cli_ing[0]?
    node.taxonomyTermClinicalIngredients.relationships.field_footer_two_section_cli_ing[0].relationships?
    node.taxonomyTermClinicalIngredients.relationships.field_footer_two_section_cli_ing[0].relationships.field_service_card:"":"":""
  }
  else if(pageNodeType == 'clinicalConcern'){
    getTwoSection=node.taxonomyTermClinicalSkinConcern.relationships.field_footer_two_section?node.taxonomyTermClinicalSkinConcern.relationships.field_footer_two_section[0]?
    node.taxonomyTermClinicalSkinConcern.relationships.field_footer_two_section[0].relationships?
    node.taxonomyTermClinicalSkinConcern.relationships.field_footer_two_section[0].relationships.field_service_card:"":"":""
  }
  else if(pageNodeType == 'clinicalGroups'){
    getTwoSection=node.taxonomyTermClinicalGroups.relationships.field_footer_two_sections?node.taxonomyTermClinicalGroups.relationships.field_footer_two_sections[0]?
    node.taxonomyTermClinicalGroups.relationships.field_footer_two_sections[0].relationships?
    node.taxonomyTermClinicalGroups.relationships.field_footer_two_sections[0].relationships.field_service_card:"":"":""
  }
  else if(pageNodeType == 'skinClinicalType'){
    getTwoSection=node.taxonomyTermClinicalSkinType.relationships.field_footer_two_section_sk_type?node.taxonomyTermClinicalSkinType.relationships.field_footer_two_section_sk_type[0]?
    node.taxonomyTermClinicalSkinType.relationships.field_footer_two_section_sk_type[0].relationships?
    node.taxonomyTermClinicalSkinType.relationships.field_footer_two_section_sk_type[0].relationships.field_service_card:"":"":""

  }
  
  else{
    checkfooter = ""
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
        <div className={["row",servicesStyles.twoCards].join(" ")} >
          {/* <div className={["col-12","col-lg-10",'row',"offset-lg-1", "collection-footer-container",Collectionfooterstyle.CollectionFooterContainer].join(' ')}>

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
               </div> */}
           
               {getTwoSection?getTwoSection.map((item, index) => {
                            return (
                                <div className={index == 0 || index % 2 == 0? "col-12 col-md-6 col-lg-5 offset-lg-1 " +  servicesStyles.columnWrapper: "col-12 col-md-6 col-lg-5 " +  servicesStyles.columnWrapper}>
                                    <div className={servicesStyles.cardWrapper}>
                                        {item.field_service_name ? <div dangerouslySetInnerHTML={{ __html: item.field_service_name?item.field_service_name.processed:"" }} className={item.field_card_type === "clinical"? servicesStyles.clinicalSub + " subtitle services-subtitle " + servicesStyles.subtitle : servicesStyles.medicalSub + " subtitle services-subtitle " + servicesStyles.subtitle}></div> : ''}
                                        {item.relationships?item.relationships.field_service_image?item.relationships.field_service_image.localFile ? <div className={index == 2 || index == 3 ? servicesStyles.image + ' services-image ' + servicesStyles.specialImage : servicesStyles.image + " services-image"}><Img fluid={item.relationships?item.relationships.field_service_image?item.relationships.field_service_image.localFile?item.relationships.field_service_image.localFile.childImageSharp.fluid:"":"":""} /></div>:"" : "":''}
                                        {item.field_service_title ? <div dangerouslySetInnerHTML={{ __html: item.field_service_title?item.field_service_title.processed:"" }} className={servicesStyles.title}></div> : ''}
                                        {item.field_service_description ? <div dangerouslySetInnerHTML={{ __html: item.field_service_description.processed }} className={servicesStyles.description}></div> : ''}
                                        {item.field_se ? <div className={servicesStyles.butttonWrapper}><Link to={item.field_se.uri} className={["button-link", servicesStyles.link].join(" ")}>{item.field_se.title}</Link></div> : ''}
                                    </div>
                                </div>
                            )
                        }):""}
             </div>
            
          </div>

          {checktaxonomyType === 'clinical'? ""
               :checkfooter?
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
               </div>:""
               }

          </>
    )
}




export default CollectionFooter;