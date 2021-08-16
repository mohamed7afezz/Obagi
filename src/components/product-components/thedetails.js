import React from 'react'

import detailsStyles from '../../assets/scss/components/thedetails.module.scss'
import plus from '../../assets/images/product-images/plus.svg'
import { graphql } from 'gatsby'
const Details = ({ node }) => {
    const data = node.relationships;
    return (
        <div className={["container-fluid", "detailHero" ,detailsStyles.detailHero].join(" ")}>
            <div className={"row"}>
               {
                   data.field_detail_safe.map((item,index )=> (
                    <div className={["col-12", `${index===0?"col-lg-4":"col-lg-5"}`, "offset-lg-1"].join(" ")}>
                        <div className={detailsStyles.detail}>
                            {
                            item.field_sec?<div className={[detailsStyles.showFlex,"mob-colap", `${index > 0? "detHrLine" : ""}`].join(' ')}>
                                <div  dangerouslySetInnerHTML={{__html: item.field_sec.processed}}></div>
                                {index===1?      <a className={[detailsStyles.expand1,"show-mob", " mt-0"].join(" ")}  data-toggle="collapse" href="#ingm" role="button" aria-expanded="false" aria-controls="ingm"></a> 
                            :""}
                            </div>:
                        ""
                            }
                            {index===1?  <div id="ingm" class="collapse ">
                            <div  className={detailsStyles.safe} dangerouslySetInnerHTML={{__html: item.field_sectiondescription?item.field_sectiondescription.processed:""}}></div>
                            {item.field_read_more_extra?
                                   <> {index ===0?  
                                    <a className={[detailsStyles.expand, detailsStyles.theDetail, "collapsed","mt-0 ","mob-mb-40"].join(" ")}   data-toggle="collapse" href="#read" role="button" aria-expanded="false" aria-controls="read">Read More </a> 
                                    :  
                                    <a className={[detailsStyles.expand, detailsStyles.theSafe, "collapsed","mt-0"].join(" ")} data-toggle="collapse" href="#read" role="button" aria-expanded="false" aria-controls="read">Full List </a> 
                                }
                                <div id="read" className={"collapse multi-collapse"} dangerouslySetInnerHTML={{__html: item.field_read_more_extra?item.field_read_more_extra.processed:""}}></div>
                                  
                                </>
                                 
                            :""}
                            </div>:
                            <div >
                            <div   className={detailsStyles.safe} dangerouslySetInnerHTML={{__html: item.field_sectiondescription?item.field_sectiondescription.processed:""}}></div>
                            {item.field_read_more_extra?
                                   <> {index ===0?  
                                    <a className={[detailsStyles.expand, detailsStyles.theDetail, "collapsed","mt-0 ","mob-mb-40"].join(" ")}   data-toggle="collapse" href="#List" role="button" aria-expanded="false" aria-controls="List">Read More </a> 
                                    :  
                                    <a className={[detailsStyles.expand, detailsStyles.theSafe, "collapsed","mt-0"].join(" ")} data-toggle="collapse" href="#List" role="button" aria-expanded="false" aria-controls="List">Full List </a> 
                                }
                                <div id="List" className={"collapse multi-collapse"} dangerouslySetInnerHTML={{__html: item.field_read_more_extra?item.field_read_more_extra.processed:""}}></div>
                                  
                                </>
                                 
                            :""}
                            </div>
                            }
                        </div>
                    </div>
                   ))
               }
            </div>
        </div>
    )
}

export default Details;

export const fragment = graphql`
    fragment detailsSafeParagraph on paragraph__the_details_safe_section {
        id
        relationships {
            field_detail_safe {
              field_sec {
                processed
              }
              field_sectiondescription {
                processed
              }
              field_read_more_extra {
                processed
              }
            
            }
        }
    }
`;

// THIS FIELD IS REMOVED FROM QUERY UNTIL THEY ADD DATA IN IT

