import React from 'react'
import productsuggestion from '../assets/scss/components/productsuggestion.module.scss'
import cardimg from "../assets/images/product-images/main-image.png"
import smlamb from '../assets/images/product-images/smallLamb.png'
import Stars from '../components/stars'
const ProductSuggestion = ({ node }) => {
    return (
        <div className={["container-fluid", productsuggestion.productsuggestioncon].join(" ")} >
            <div className={["row", productsuggestion.ordering].join(" ")}>
                <div className={["col-12", "col-lg-4", productsuggestion.allcon].join(" ")}>
                </div>
                <div className={["col-12", "col-lg-4", productsuggestion.allcon].join(" ")}>
                </div>
                <div className={["col-12", "col-lg-4", productsuggestion.allcon].join(" ")}>
                </div>
            </div>
        </div>
    )
}
export default ProductSuggestion