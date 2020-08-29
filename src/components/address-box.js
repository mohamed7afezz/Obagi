import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import addressBoxStyles from '../assets/scss/components/address-box.module.scss'

const AddressBox = ({ node }) => {

    return (
        <div className="row">
            <div className="col-12 col-lg-6">
            <div className={addressBoxStyles.boxWrapper}>
                <div className={addressBoxStyles.boxHeader}>
                    <div>Address 1</div>
                    <div className={addressBoxStyles.buttonsWrapper}>
                        <button type="button" className={addressBoxStyles.headerButton}>Edit</button>
                        <button type="button" className={addressBoxStyles.headerButton}>Delete</button>
                    </div>
                </div>
                <div className={addressBoxStyles.infoWrapper}>
                    <p>David Moreno</p>
                    <p>123 Doretta St</p>
                    <p>4a</p>
                    <p>Rivervale, New Jersey, 07542</p>
                    <p>(551) 234-5678</p>
                </div>
            </div>

            <div className={addressBoxStyles.boxWrapper}>
                <div className={addressBoxStyles.boxHeader}>
                    <div>Address 1</div>
                    <div className={addressBoxStyles.buttonsWrapper}>
                        <button type="button" className={addressBoxStyles.headerButton}>Edit</button>
                        <button type="button" className={addressBoxStyles.headerButton}>Delete</button>
                    </div>
                </div>
                <div className={addressBoxStyles.infoWrapper}>
                    <p>David Moreno</p>
                    <p>123 Doretta St</p>
                    <p>4a</p>
                    <p>Rivervale, New Jersey, 07542</p>
                    <p>(551) 234-5678</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AddressBox