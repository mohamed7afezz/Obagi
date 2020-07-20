import React from 'react'

import needtoknow from '../assets/scss/components/needtoknow.module.scss'

import lightblub from '../assets/images/product-images/light-bulb-icon.svg'
import blueblub from '../assets/images/product-images/bluelamb.svg'

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
                    <p className={needtoknow.needtoknowtitle}>
                        Need to Know
                    </p>
                    <p >
                    This advanced formula contains vitamin C and Kinetin+ Complex, nature-identical synthesized plant growth factors, to help improve the appearance of crepiness and crow’s feet. Soft focus technology creates optical diffusion to help blur the appearance of fine lines and shadows.                        </p>
                </div>
            </div>
        </div>
    )
}

export default Needtoknow;