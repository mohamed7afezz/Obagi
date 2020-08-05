import React from 'react'

import needtoknow from '../../assets/scss/components/needtoknow.module.scss'

import lightblub from '../../assets/images/product-images/light-bulb-icon.svg'
import blueblub from '../../assets/images/product-images/bluelamb.svg'

const Needtoknow = ({ node }) => {
    return (
        <div className={["container-fluid", needtoknow.needtoknowcontent].join(" ")}>

            <div className={"row"}>
                <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol,"imgcolclinical"].join(" ")}>
                    <img src={lightblub} alt="lightblub" />
                </div>
                <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol,"medicalclinical"].join(" ")}>
                    <img src={blueblub} alt="lightblub" />
                </div>
                <div className={["col-12", "col-lg-7", needtoknow.rightcontent].join(" ")}>
                    <p className={needtoknow.needtoknowtitle} > 
                       {node.field_need_to_know_title?node.field_need_to_know_title.processed :''}
                    </p>
                    <div  dangerouslySetInnerHTML={{__html:node.field_need_to_know_description?node.field_need_to_know_description.processed:''}}></div>
          </div>
        </div>
        </div>
    )
}

export default Needtoknow;

export const fragment = graphql`
    fragment needToKnowParagrapgh on paragraph__need_to_know {
        id
        field_need_to_know_description {
          processed
        }
        field_need_to_know_title {
          processed
        }
    }
`;