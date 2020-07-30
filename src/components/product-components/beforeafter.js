import React, { useEffect } from 'react'
import beforeafter from '../../assets/scss/components/before-after.module.scss'
import beforeimg from "../../assets/images/product-images/Clinical-VitaminCEyeBrightener-BeforeAfter1_BEFORE.jpg"
import afterimg from "../../assets/images/product-images/Clinical-VitaminCEyeBrightener-BeforeAfter1_After.jpg"
import Beforeafterimages from "./beforeafterimages"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'

const Beforeafter = ({ node }) => {
    function bcollapse(e) {
        let $beforecollapse = document.querySelectorAll('.beforecollapse');
        var $collapsebtn1 = document.querySelectorAll('.collapsebtn1')
        let $beforeimgs = document.querySelectorAll('.beforeimgs')
        for (let i = 0; i < $beforeimgs.length; i++) {
            let elementid = $beforeimgs[i].id;
            let element = $beforeimgs[i];
            if (!element.classList.contains("showimg")) {
                element.classList.add("showimg");
            }
            if (e.target.getAttribute('data-target') == elementid) {
                element.classList.remove("showimg")
            }

        }
        for (let i = 0; i < $collapsebtn1.length; i++) {

            let colorbtn = $collapsebtn1[i]
            if (!colorbtn.classList.contains("collapsed")) {
                colorbtn.classList.add('collapsed')

            }
            e.target.parentNode.classList.remove('collapsed')
        }
        for (let i = 0; i < $beforecollapse.length; i++) {
            let elementid = $beforecollapse[i].id;
            let element = $beforecollapse[i];
            if (element.classList.contains("show")) {
                element.classList.remove("show")

            }
            if (e.target.getAttribute('data-target') == elementid) {
                console.log('test')
                element.classList.add("show");


            }

        }
    }



    return (
        <div className={["container-fluid", "beforeaftercontainer", beforeafter.beforeaftercontainer].join(" ")}>
            <div className={"row"}>

                <div className={["col-12", "col-lg-5", "offset-lg-1", beforeafter.beforeafterimages].join(" ")}>
                    <h1 className={beforeafter.beforeafterheadmob} dangerouslySetInnerHTML={{ __html: node.field_before_meet_after.processed }}></h1>
                    {
                        node.relationships.field_before_meet_after_example.map((item, index) => (
                            <div id={"Example" + index} class={index == 0 ? 'beforeimgs ' : ' beforeimgs showimg'}>
                                <Beforeafterimages
                                    beforeimage={item.relationships.field_before_image?(item.relationships.field_before_image.localFile? item.relationships.field_before_image.localFile.childImageSharp.original.src : ''):(item.relationships.field_after_im.localFile? item.relationships.field_after_im.localFile.childImageSharp.original.src : '')}
                                    afterimage={item.relationships.field_after_im?(item.relationships.field_after_im.localFile? item.relationships.field_after_im.localFile.childImageSharp.original.src : ''):(item.relationships.field_before_image.localFile? item.relationships.field_before_image.localFile.childImageSharp.original.src : '')}
                                />

                            </div>
                        ))
                    }

                </div>

                <div className={["col-12", "col-lg-4", "offset-lg-1", beforeafter.beforeaftercontent].join(" ")}>
                    <h1 className={beforeafter.beforeafterhead} dangerouslySetInnerHTML={{ __html: node.field_before_meet_after.processed }}></h1>
                    <div className={beforeafter.beforeaftersubtitle} dangerouslySetInnerHTML={{ __html: node.field_before_meet_after_subtitle.processed }}></div>

                    <div className={["row", beforeafter.tabs].join(" ")}>
                        {
                            node.relationships.field_before_meet_after_example.map((item, index) => (
                                <div className={[beforeafter.tab, "card ", "col-lg-4", "col-6"].join(" ")}>
                                    <div className={[beforeafter.cardhead, "card-header"].join(" ")}  >
                                        <h5 class="mb-16">
                                            <button className={[beforeafter.btnLink1, "btn-link", "collapsebtn1", "btn ", index == 0 ? '' : 'collapsed'].join(" ")}  >
                                                <span onClick={(e) => { bcollapse(e); }} data-target={'Example' + index} dangerouslySetInnerHTML={{ __html: item.field_example_title.processed }}></span>
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
                            <div id={"Example" + index} class={index == 0 ? 'collapse beforecollapse show' : 'collapse beforecollapse'} >
                                <div class="card-body">
                                    <div className={beforeafter.tabTitle} dangerouslySetInnerHTML={{ __html: item.field_study_type.processed }}></div>
                                    <div className={["row", beforeafter.boxes].join(" ")}>
                                        {/* Boxes */}
                                        {
                                            item.relationships.field_boxes.map(item => (
                                                <div className={[beforeafter.box, "box", "col-5"].join(" ")}>
                                                    <h1 dangerouslySetInnerHTML={{ __html: item.field_percentage?item.field_percentage.processed:'' }}></h1>
                                                    <div dangerouslySetInnerHTML={{ __html: item.field_box_des?item.field_box_des.processed:'' }}></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        item.field_before_after_footnote.map((footNote, index) => (
                                            footNote?<div className={beforeafter.beforeafterfooter} dangerouslySetInnerHTML={{ __html: footNote.processed }}></div>
                                                :
                                                ""
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