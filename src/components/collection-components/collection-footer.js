import React  from 'react'
import { useStaticQuery,graphql } from "gatsby"
import Collectionfooterstyle from "../../assets/scss/components/collectionfooterstyle.module.scss"
import Img from 'gatsby-image'
const CollectionFooter = ({ info, blockName })=> {
  
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
                      fluid {
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
    
    <div className={["container-fluid", Collectionfooterstyle.collectionfooter,"collectionhero","collectionfooter"].join(" ")}>
        <div className={"row"}>
          <div className={["col-12","col-lg-10",'row',"offset-lg-1", "collection-footer-container",Collectionfooterstyle.CollectionFooterContainer].join(' ')}>

            <div className={['col-12','col-lg-6',Collectionfooterstyle.collectionFooterleftcol,"collectionFooterleftcol"].join(' ')}>
            <p className={Collectionfooterstyle.typeimg}>{getdata.field_taxonomy_footer_type}</p>
            <Img className={Collectionfooterstyle.fullheightimg} fluid={getdata.relationships.field_taxonomy_footer_image.localFile.childImageSharp.fluid}/>
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
    )
}




export default CollectionFooter;