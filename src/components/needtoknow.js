import React from 'react'

import needtoknow from '../assets/scss/components/needtoknow.module.scss'

import lightblub from '../assets/images/product-images/light-bulb-icon.svg'

const Needtoknow = ({ node }) => {
    return (
        <div className={["container-fluid", needtoknow.needtoknowcontent].join(" ")}>

            <div className={"row"}>
                <div className={["col-12", "col-lg-1", "offset-lg-1", needtoknow.imgcol].join(" ")}>
                    <img src={lightblub} alt="lightblub" />
                </div>
                <div className={["col-12", "col-lg-7", needtoknow.rightcontent].join(" ")}>
                    <p className={needtoknow.needtoknowtitle}>
                        Need to Know
                    </p>
                    <p >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a felis nec elit congue blandit consequat a nisl. Sed lorem justo, laoreet in nibh eu lobortis suscipit lacus. Morbi turpis ex lobortis eget nulla molestie tincidunt urna. Fusce maximus fringilla nisi vel dignissim nisl.
                        </p>
                </div>
            </div>
        </div>
    )
}

export default Needtoknow;