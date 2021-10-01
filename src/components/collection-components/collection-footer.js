import React  from 'react'
import { useStaticQuery,graphql, Link } from "gatsby"
import * as Collectionfooterstyle from "../../assets/scss/components/collectionfooterstyle.module.scss"
import * as servicesStyles from '../../assets/scss/components/services.module.scss'
import * as featuredStyles from '../../assets/scss/components/featured.module.scss'
import { GatsbyImage } from "gatsby-plugin-image";
import Player from '@vimeo/player'
import playbtnimg from "../../assets/images/product-images/PlayVideo.svg"
function playvideo(event) {
  let iframeContainer, player, playerOpts = {
    url: ''
  }
  
  let url = event.target.parentNode.getAttribute("href");  
  playerOpts.url = url;

  if (!playerOpts.url.indexOf('youtube') > -1) {
    document.querySelector('.video-popup-wrap').innerHTML = '<iframe class="embed-responsive-item" src="' + url + '?rel=0&autoplay=true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    
    return;
  }

  player = new Player.Vimeo(document.querySelector('#VideoPopUp iframe'), playerOpts);

  player.play();
 

}
const CollectionFooter = ({ node, nodetype,checktaxonomyType })=> {

  const FooterBlockList = useStaticQuery(graphql`{
  allBlockContentTaxonomyFooterBlock {
    edges {
      node {
        drupal_id
        info
        field_taxonomy_footer_type
        field_taxonomy_footer_title
        field_taxonomy_footer_button
        field_button_url
        relationships {
          field_taxonomy_footer_image {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: FULL_WIDTH)
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
  let getfeature="";
  let paragraphId = "";
  if (pageNodeType == "medicalConcern") {
    
    getTwoSection=node.taxonomyTermMedicalSkinConcern.relationships.field_footer_two_section_med_ski?node.taxonomyTermMedicalSkinConcern.relationships.field_footer_two_section_med_ski[0]?
    node.taxonomyTermMedicalSkinConcern.relationships.field_footer_two_section_med_ski[0].relationships?
    node.taxonomyTermMedicalSkinConcern.relationships.field_footer_two_section_med_ski[0].relationships.field_service_card:"":"":"";
    checkfooter =
    node.taxonomyTermMedicalSkinConcern.field_medical_sk_col_footer_mod?
    node.taxonomyTermMedicalSkinConcern.field_medical_sk_col_footer_mod.processed:""
  } else if (pageNodeType == "medicalCategories") {
    
    getTwoSection=node.taxonomyTermMedicalCategories.relationships.field_footer_two_section_med_cat?node.taxonomyTermMedicalCategories.relationships.field_footer_two_section_med_cat[0]?
    node.taxonomyTermMedicalCategories.relationships.field_footer_two_section_med_cat[0].relationships?
    node.taxonomyTermMedicalCategories.relationships.field_footer_two_section_med_cat[0].relationships.field_service_card:"":"":"";
    checkfooter =
      node.taxonomyTermMedicalCategories.field_medical_cat_col_footer_mod?
      node.taxonomyTermMedicalCategories.field_medical_cat_col_footer_mod.processed:""
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
    checkfooter =
    node.taxonomyTermMedicalSkinType.field_medical_skt_col_footer_mod?
    node.taxonomyTermMedicalSkinType.field_medical_skt_col_footer_mod.processed:"" 
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
    paragraphId = node.taxonomyTermClinicalIngredients.field_featured_paragraph_id? node.taxonomyTermClinicalIngredients.field_featured_paragraph_id.processed : null;
  getfeature=node.taxonomyTermClinicalIngredients.relationships.field_footer_two_section_cli_ing?
    node.taxonomyTermClinicalIngredients.relationships.field_footer_two_section_cli_ing:null;
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
    paragraphId = node.taxonomyTermClinicalGroups.field_featured_paragraph_id? node.taxonomyTermClinicalGroups.field_featured_paragraph_id.processed : null;
   getfeature=node.taxonomyTermClinicalGroups.relationships.field_footer_two_sections?
    node.taxonomyTermClinicalGroups.relationships.field_footer_two_sections:null;
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
 
return <>
  {getfeature[0] ?   
   <div className={["container-fluid d-lg-block colectionBrand", featuredStyles.containerWrapper].join(" ")} name={paragraphId? paragraphId : ""} id={paragraphId? paragraphId : ""}>
          <div className={["row", featuredStyles.imageLeft].join(" ")}>

            <div className={["col-lg-5", "offset-lg-1", "col-left-padding", "pr-0", featuredStyles.columnsWrapper].join(" ")}>
              <div className="video-wrapper">
                <div className={["img-wrap", featuredStyles.imageWrap].join(" ")}>
                  <a className="popupvideo" data-toggle="modal" data-target="#VideoPopUp" onClick={(e) => { playvideo(e) }} href={getfeature[0].relationships.field_featured_video ? getfeature[0].relationships.field_featured_video.field_video_link : ''} className="playbtn">
                    <img className={["playbtnimg", featuredStyles.play].join(" ")} src={playbtnimg} alt="videomsg" />
                  </a>
                  {getfeature[0].relationships.field_featured_video ? (getfeature[0].relationships.field_featured_video.relationships.field_video_poster.localFile?
                     <GatsbyImage
                       image={getfeature[0].relationships.field_featured_video.relationships.field_video_poster.localFile.childImageSharp.gatsbyImageData}
                       alt="img"
                       className={featuredStyles.videoimg} /> : "") : ''}
                </div>
              </div>
            </div>

            <div className={["col-lg-5", featuredStyles.columnsWrapper, featuredStyles.imageLeft].join(" ")}>
              <div className="col-lg-7 offset-lg-2">
                {getfeature[0].field_featured_subtitle? <div className={["subtitle", featuredStyles.subtitle].join(" ")} dangerouslySetInnerHTML={{__html: getfeature[0].field_featured_subtitle.processed}}></div> : ""}
                {getfeature[0].field_featured_title?
                <div dangerouslySetInnerHTML={{ __html: getfeature[0].field_featured_title.processed }} className={featuredStyles.title}></div>
                  :""}
                {getfeature[0].field_featured_products_title? <div className={featuredStyles.products}>
                  <div dangerouslySetInnerHTML={{__html: getfeature[0].field_featured_products_title.processed}}></div> (<span className={featuredStyles.productsNo}></span>) 
                  {getfeature[0].field_featured_button? <span className={featuredStyles.view}><Link to={getfeature[0].field_featured_button.uri.replace('internal:', '')}>VIEW ALL</Link></span> : ""}</div> : ""}
                <div dangerouslySetInnerHTML={{ __html: getfeature[0].field_featured_description.processed }} className={featuredStyles.description}></div>
                {getfeature[0].field_featured_perfect_title && getfeature[0].relationships.field_issues_categories? <div className={featuredStyles.perfect}><div dangerouslySetInnerHTML={{__html: getfeature[0].field_featured_perfect_title.processed}}></div>
                {getfeature[0].relationships.field_issues_categories.map((item, index) => {
                return <span className={featuredStyles.category}><Link to={item.path.alias}> {item.name}</Link>{index === getfeature[0].relationships.field_issues_categories.length - 1? '' : ', '}</span>
            })} </div> : ""}
                {getfeature[0].field_featured_button? <div className={featuredStyles.linkSection}><Link to={getfeature[0].field_featured_button.uri.replace('internal:', '')} className={["button-link", featuredStyles.link].join(" ")}>{getfeature[0].field_featured_button.title}</Link></div> : ""}
              </div>
            </div>


          </div>
        </div>
     
  
  :getTwoSection?
  <div 
  className={
  "container-fluid   " + Collectionfooterstyle.TwoSection 
  }
 >
  <div className={["row",servicesStyles.twoCards,].join(" ")} >
     
         
  {getTwoSection?getTwoSection.map((item, index) => {
               return (
                 <div className={index == 0 || index % 2 == 0? "col-12 col-md-6 col-lg-5 offset-lg-1 " +  servicesStyles.columnWrapper + servicesStyles.giveservicePadding: "col-12 col-md-6 col-lg-5 " +  servicesStyles.columnWrapper + servicesStyles.giveservicePadding}>
                     <div className={servicesStyles.cardWrapper}>
                         {item.field_service_name ? <div dangerouslySetInnerHTML={{ __html: item.field_service_name?item.field_service_name.processed:"" }} className={item.field_card_type === "clinical"? servicesStyles.clinicalSub + " subtitle services-subtitle " + servicesStyles.subtitle : servicesStyles.medicalSub + " subtitle services-subtitle " + servicesStyles.subtitle}></div> : ''}
                         {item.relationships?item.relationships.field_service_image?item.relationships.field_service_image.localFile ? <div className={index == 2 || index == 3 ? servicesStyles.image + ' services-image ' + servicesStyles.specialImage : servicesStyles.image + " services-image"}><GatsbyImage
                           image={item.relationships?item.relationships.field_service_image?item.relationships.field_service_image.localFile?item.relationships.field_service_image.localFile.childImageSharp.gatsbyImageData:"":"":""}
                           alt="img" /></div>:"" : "":''}
                         {item.field_service_title ? <div dangerouslySetInnerHTML={{ __html: item.field_service_title?item.field_service_title.processed:"" }} className={servicesStyles.title}></div> : ''}
                         {item.field_service_description ? <div dangerouslySetInnerHTML={{ __html: item.field_service_description.processed }} className={servicesStyles.description}></div> : ''}
                         {item.field_se ? <div className={servicesStyles.buttonWrapper}><Link to={item.field_se.uri.replace('internal:', '')} className={["button-link", servicesStyles.link].join(" ")}>{item.field_se.title}</Link></div> : ''}
                     </div>
                 </div>
               );
           }):""}
</div>
</div>:
  
  <div>   
 <div 
 className={checktaxonomyType === "clinical"? 
  "container-fluid collectionhero collectionfooter " + Collectionfooterstyle.collectionfooter
  : checktaxonomyType === "medical"? "container-fluid collectionhero collectionfooter  " + Collectionfooterstyle.footerMedicalBg + " " + Collectionfooterstyle.collectionfooter
  : "container-fluid collectionhero collectionfooter  " + Collectionfooterstyle.footerGeneralBg + " " + Collectionfooterstyle.collectionfooter}
>
      <div className={["row",servicesStyles.twoCards].join(" ")} >
        <div className={checktaxonomyType === "clinical" || checktaxonomyType === "medical"? "col-12 col-lg-10 row offset-lg-1 collection-footer-container " + Collectionfooterstyle.CollectionFooterContainer : "col-12 col-lg-10 row offset-lg-1 general-collection-footer-container " + Collectionfooterstyle.CollectionFooterContainer}>

          <div className={['col-12','col-lg-6',Collectionfooterstyle.collectionFooterleftcol,"collectionFooterleftcol"].join(' ')}>
          <p className={Collectionfooterstyle.typeimg}>{getdata.field_taxonomy_footer_type}</p>
          {getdata.relationships.field_taxonomy_footer_image.localFile?
          getdata.relationships.field_taxonomy_footer_image.localFile.childImageSharp?
           <GatsbyImage
             image={getdata.relationships.field_taxonomy_footer_image.localFile.childImageSharp.gatsbyImageData}
             alt="img"
             className={Collectionfooterstyle.fullheightimg} />
          :"":""
          }
          </div>
          <div className={['col-12 offset-lg-1','col-lg-4',Collectionfooterstyle.collectionFooterRightcol,"collectionFooterRightcol"].join(' ')}>
                    <p className={[Collectionfooterstyle.typecon, "collection-footer-typecon"].join(" ")}>{getdata.field_taxonomy_footer_type}</p>
                    <h1 className={[Collectionfooterstyle.collectionFooterTitle, "collection-footer-title"].join(" ")}>{getdata.field_taxonomy_footer_title}</h1>
                    {getdata.field_taxonomy_footer_subtitle?<p className={Collectionfooterstyle.subtitle}>{getdata.field_taxonomy_footer_subtitle}</p>:""}
                    <div className={[Collectionfooterstyle.description, "collection-footer-desc"].join(" ")} dangerouslySetInnerHTML={{__html: getdata.body.processed}}></div>
                    <div className={[Collectionfooterstyle.linkcontainer,"CollectionFooterContainer"].join(' ')}>
                    <a className={[Collectionfooterstyle.link, "collection-footer-link"].join(" ")} href={getdata.field_button_url}>{getdata.field_taxonomy_footer_button}</a>
                    </div>
                </div>
             </div>
         
             {getTwoSection?getTwoSection.map((item, index) => {
                          return (
                            <div className={index == 0 || index % 2 == 0? "col-12 col-md-6 col-lg-5 offset-lg-1 " +  servicesStyles.columnWrapper: "col-12 col-md-6 col-lg-5 " +  servicesStyles.columnWrapper}>
                                <div className={servicesStyles.cardWrapper}>
                                    {item.field_service_name ? <div dangerouslySetInnerHTML={{ __html: item.field_service_name?item.field_service_name.processed:"" }} className={item.field_card_type === "clinical"? servicesStyles.clinicalSub + " subtitle services-subtitle " + servicesStyles.subtitle : servicesStyles.medicalSub + " subtitle services-subtitle " + servicesStyles.subtitle}></div> : ''}
                                    {item.relationships?item.relationships.field_service_image?item.relationships.field_service_image.localFile ? <div className={index == 2 || index == 3 ? servicesStyles.image + ' services-image ' + servicesStyles.specialImage : servicesStyles.image + " services-image"}><GatsbyImage
                                      image={item.relationships?item.relationships.field_service_image?item.relationships.field_service_image.localFile?item.relationships.field_service_image.localFile.childImageSharp.gatsbyImageData:"":"":""}
                                      alt="img" /></div>:"" : "":''}
                                    {item.field_service_title ? <div dangerouslySetInnerHTML={{ __html: item.field_service_title?item.field_service_title.processed:"" }} className={servicesStyles.title}></div> : ''}
                                    {item.field_service_description ? <div dangerouslySetInnerHTML={{ __html: item.field_service_description.processed }} className={servicesStyles.description}></div> : ''}
                                    {item.field_se ? <div className={servicesStyles.buttonWrapper}><Link to={item.field_se.uri} className={["button-link", servicesStyles.link].join(" ")}>{item.field_se.title}</Link></div> : ''}
                                </div>
                            </div>
                          );
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
        </div>
 } </>;
}




export default CollectionFooter;