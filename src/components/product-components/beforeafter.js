import React , {useEffect} from 'react'
import beforeafter from '../../assets/scss/components/before-after.module.scss'
import beforeimg from "../../assets/images/product-images/Clinical-VitaminCEyeBrightener-BeforeAfter1_BEFORE.jpg"
import afterimg from "../../assets/images/product-images/Clinical-VitaminCEyeBrightener-BeforeAfter1_After.jpg"
import Beforeafterimages from "./beforeafterimages"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'

const Beforeafter = ({ node }) => {
    console.log('bahi', node);
    const data = useStaticQuery(graphql`
    query {
        afterimg: file(relativePath: { eq: "product-images/smallLamb.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
          fixed(width: 744) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cardimg: file(relativePath: { eq: "product-images/main-image.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
          fixed(width: 744) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }`
    )
    return (
        <div className={["container-fluid","beforeaftercontainer", beforeafter.beforeaftercontainer].join(" ")}>
            <div id="accordion1" className={"row"}>
           
                <div className={["col-12", "col-lg-5", "offset-lg-1", beforeafter.beforeafterimages].join(" ")}>
                    <h1 className={beforeafter.beforeafterheadmob} dangerouslySetInnerHTML={{__html: node.field_before_meet_after.processed}}></h1>
                    {
                        node.relationships.field_before_meet_after_example.map((item, index)=> (
                            <div id={"Example"+index} class={index==0?'collapse  show':'collapse '} aria-labelledby={"heading1" + index} data-parent="#accordion1">
                                  <div  class="card-body ">
                            <Beforeafterimages 
                                beforeimage={item.relationships.field_before_image.localFile.childImageSharp.original.src} 
                                afterimage={item.relationships.field_after_im.localFile.childImageSharp.original.src}
                            />
                            </div>
                            </div>
                        ))
                    }
                    
                </div>
           
                <div className={["col-12", "col-lg-4", "offset-lg-1", beforeafter.beforeaftercontent].join(" ")}>
                    <h1 className={beforeafter.beforeafterhead} dangerouslySetInnerHTML={{__html: node.field_before_meet_after.processed}}></h1>
                    <div className={beforeafter.beforeaftersubtitle} dangerouslySetInnerHTML={{__html: node.field_before_meet_after_subtitle.processed}}></div>
              
                        <div className={["row", beforeafter.tabs].join(" ")}>
                            {
                                node.relationships.field_before_meet_after_example.map((item, index) => (
                                    <div className={[beforeafter.tab, "card ", "col-lg-4", "col-6"].join(" ")}>
                                        <div className={[beforeafter.cardhead, "card-header"].join(" ")}  id={'heading1'+index}>
                                            <h5 class="mb-16">
                                            <button className={[beforeafter.btnLink1, "btn-link", "btn ",index==0?'':'collapsed'].join(" ")} data-toggle="collapse" data-target={'#Example'+index} aria-expanded={index==0?'true':'false'} aria-controls={'Example'+index}>
                                                    <span dangerouslySetInnerHTML={{__html: item.field_example_title.processed}}></span>
                                                </button>
                                            </h5>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {/* Example content - Boxes */}
                        {
                            node.relationships.field_before_meet_after_example.map((item, index) => (
                                <div id={"Example"+index} class={index==0?'collapse  show':'collapse '} aria-labelledby={"heading1" +index} data-parent="#accordion1">
                                    <div class="card-body">
                                        <div className={beforeafter.tabTitle} dangerouslySetInnerHTML={{__html: item.field_study_type.processed}}></div>
                                        <div className={["row", beforeafter.boxes].join(" ")}>
                                            {/* Boxes */}
                                            {
                                                item.relationships.field_boxes.map(item => (
                                                    <div className={[beforeafter.box, "col-5"].join(" ")}>
                                                        <h1 dangerouslySetInnerHTML={{__html: item.field_percentage.processed}}></h1>
                                                        <div dangerouslySetInnerHTML={{__html: item.field_box_des.processed}}></div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {
                                            item.field_before_after_footnote.map(footNote => (
                                                <div className={beforeafter.beforeafterfooter} dangerouslySetInnerHTML={{__html: footNote.processed}}></div>
                                            ))
                                        }
                                        
                                    </div>
                                </div>
                            ))
                        }
                     
                    </div>

                </div>
            </div>

    )
}
export default Beforeafter;

export const fragment = graphql`
    fragment beforeAfterParagraph on paragraph__before_after {
        id
        field_before_meet_after {
            processed
        }
        field_before_meet_after_subtitle {
            processed
        }
        relationships {
            field_before_meet_after_example {
                field_example_title {
                    processed
                }
                field_study_type {
                    processed
                }
                field_before_after_footnote {
                    processed
                }
                relationships {
                    field_boxes {
                        field_box_des {
                            processed
                        }
                        field_percentage {
                            processed
                        }
                    }
                    field_before_image {
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
                    field_after_im {
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