import React from 'react'

import howto from '../../assets/scss/components/howtouse.module.scss'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from "gatsby"
const Howtouse = ({ node }) => {
    
    return (
        <div className={["container-fluid", howto.howtousecon].join(" ")} >
            <div className={["row", howto.ordering].join(" ")}>
                <div className={["col-12", "col-lg-10", "offset-lg-1", howto.allcon].join(" ")}>
                    <div class="row">

                            <div id="accordion" className={['col-12','d-flex'].join(" ")}>
                            <div className={["col-12", "col-lg-4", "offset-lg-1", howto.howLeftcol].join(" ")}>
                            <h1 className={howto.howtousehead}>{node.field_how_to_use_title.processed}</h1>
                                {/* steps btns */}
                                <div className={["d-flex", howto.tabs].join(" ")}>
                                    {
                                        node.relationships.field_step_paragragh.map((item,index)=> (
                                            <div className={[howto.tab, "card ", "col-lg-4", "col-6"].join(" ")}>
                                                <div className={[howto.cardhead, "card-header"].join(" ")} id={'heading'+index}>
                                                    <h5 class="mb-16">
                                                        <button className={[howto.btnLink1, "btn-link", "btn ",index==0?'':'collapsed'].join(" ")} data-toggle="collapse" data-target={'#step'+index} aria-expanded={index==0?'true':'false'} aria-controls={'step'+index}>{item.field_step_title.processed}</button>
                                                    </h5>
                                                </div>
                                            </div>
                                        ))
                                    }     
                                </div>

                                {/* steps card */}
                                {
                                    node.relationships.field_step_paragragh.map((item,index)=> ( 
                                         <div id={'step'+index} class={index==0?'collapse show':'collapse'} aria-labelledby={'heading'+index} data-parent="#accordion">
                                            <div class="card-body">
                                                <p className={howto.tabdesc} dangerouslySetInnerHTML={{__html:item.field_step_all_content.processed}}></p>
                                            </div>
                                        </div>
                                    ))
                                }
                               
                            </div>

                     

                        <div className={["col-12", "col-lg-6", "offset-lg-1", howto.howrightcol].join(" ")}>
                            <h1 className={howto.howtouseheadimage}>{node.field_how_to_use_title.processed}</h1>
                            
                            {/* steps image */}
                            {
                                node.relationships.field_step_paragragh.map((item,index)=> (  
                                    <div style={{width:'100%'}}  id={'step'+index} class={index==0?'collapse  show':'collapse '} aria-labelledby={'heading'+index} data-parent="#accordion">

                                         <div  class="card-body ">
                                        <Img fluid={item.relationships.field_step_image.localFile.childImageSharp.fluid} className={["col-12", "pr-0","pl-0"].join(" ")}  />
                                        </div>  
                                    </div>  
                                 ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Howtouse

export const fragment = graphql`
    fragment howToUseParagraph on paragraph__how_to_use {
        id
        field_how_to_use_title {
            processed
        }
        relationships {
            field_step_paragragh {
                field_step_all_content {
                    processed
                }
                field_step_title {
                    processed
                }
                relationships {
                    field_step_image {
                        localFile {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;