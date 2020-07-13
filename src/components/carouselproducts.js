import React from 'react'
import carouselproducts from '../assets/scss/components/carouselproducts.module.scss'
import ProductCard from "../components/productcard"
import Slider from "react-slick";

const Carouselproducts = ({ node }) => {
    var settings = {
    
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,

        responsive: [
            {
                
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
               
              }
            },
        ]
      };
      
    return (
        <div className={["container-fluid", carouselproducts.carouselproductscon].join(" ")} >
             <h1 className={carouselproducts.carouselproductsead}>Lorem Ipsum Consectetur Elit</h1>
            <div className={["row", carouselproducts.ordering].join(" ")}>
                    <div className={["col-lg-8","col-12","offset-lg-2", carouselproducts.slickcon].join(" ")}>
                     <Slider {...settings}>
                <div className={["col-12",  carouselproducts.allcon].join(" ")}>
                <ProductCard/>
                </div>
                <div className={["col-12",  carouselproducts.allcon].join(" ")}>
                <ProductCard/>
                </div>
                <div className={["col-12",  carouselproducts.allcon].join(" ")}>
                <ProductCard/>
                </div>
            
                </Slider>
            </div>
        </div>
        </div>
    )
}
export default Carouselproducts