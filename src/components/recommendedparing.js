import React from 'react'
import ProductCard from "../components/productcard"
import recommendedparing from '../assets/scss/components/recommendedparing.module.scss'
import ProductStyles from '../assets/scss/components/product-hero.module.scss'
import Slider from "react-slick";

const Recommendedparing = ({ node }) => {
    var settings = {
    
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {          
              breakpoint: 1024,
              settings: {
                arrows: false,
              }
            },
        ]
      };
    return (
        <div className={["container-fluid", recommendedparing.recommendedcon].join(" ")} >
            <div className={["row", recommendedparing.ordering].join(" ")}>
                <div className={["col-12", "col-lg-12",  recommendedparing.allcon].join(" ")}>
                    <div class="row">
                        <div className={["col-12", "col-lg-3", "offset-lg-1", recommendedparing.recommendedparingLeftcol].join(" ")}>
                        <p className={ProductStyles.productcat}>Recomended Pairing</p>
                        <h1 className={recommendedparing.recommendedparingtitle}>Sunscreen</h1>
                        <p className={recommendedparing.recommendedparingdesc}>Recomended pairing with Nu-Derm Clear FX is a sunscreen lorem ipsum dolor sit amet, consectetur adipiscing elit curabitur ultricies ipsum quis.</p>
                        <p className={recommendedparing.recommendedparingsec}><span>Why</span>: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies ipsum quis ipsum rutrum, id lobortis massa laoreet. Praesent at arcu mauris. Duis aliquet euismod erat et tincidunt. In quis odio non dui facilisis bibendum eget vitae…</p>
                        </div>
                        <div className={["col-12", "col-lg-7", "offset-lg-1", recommendedparing.recommendedparingrightcol].join(" ")}>
                            <div className={[recommendedparing.parseing, "col-lg-6","offset-lg-3"].join(" ")}>
                                
                        <Slider {...settings}>
                <div className={["col-12",  recommendedparing.allcon].join(" ")}>
                <ProductCard/>
                </div>
                <div className={["col-12",  recommendedparing.allcon].join(" ")}>
                <ProductCard/>
                </div>
                <div className={["col-12",  recommendedparing.allcon].join(" ")}>
                <ProductCard/>
                </div>
                </Slider> 
                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Recommendedparing