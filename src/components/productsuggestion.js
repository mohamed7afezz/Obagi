import React from 'react'
import * as productsuggestion from '../assets/scss/components/productsuggestion.module.scss'
import ProductCard from "../components/productcard"
import Slider from "react-slick";

const ProductSuggestion = ({ node }) => {
    var settings = {
    
      
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
      
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
              }
            },
        ]
      };
      
    return (
        <div className={["container-fluid", productsuggestion.productsuggestioncon,"productsuggestioncon"].join(" ")} >
             <h1 className={productsuggestion.productsuggestionhead}>You Might Also Like</h1>
            <div className={["row", productsuggestion.ordering].join(" ")}>
                    <div className={ productsuggestion.slickcon}>
                     <Slider {...settings}>
                <div className={["col-12",  productsuggestion.allcon].join(" ")}>
                <ProductCard/>
                </div>
                <div className={["col-12",  productsuggestion.allcon].join(" ")}>
                <ProductCard/>
                </div>
                <div className={["col-12",  productsuggestion.allcon].join(" ")}>
                <ProductCard/>
                </div>
                </Slider>
            </div>
        </div>
        </div>
    )
}
export default ProductSuggestion