import React from 'react'
import Productcard from '../assets/scss/components/productcard.module.scss'
import  cardimg from "../assets/images/product-images/main-image.png"
import smlamb from '../assets/images/product-images/smallLamb.png'
import Stars from '../components/stars'
const ProductCard = ({ node }) => {
    return ( 
        <div className={["container-fluid", Productcard.productCardHero].join(" ")}>
        <div className={["row", Productcard.Cardordering].join(" ")}>
            <div className={"col-12"}>
                <div className={["d-flex",Productcard.cardname].join(" ")}>
                    <p>new</p>
                    <img src={smlamb}/>
                </div>
                <img className={Productcard.cardimg}  src={cardimg}/>
                <div className={Productcard.starspd}>
                <Stars  value="5.0"/>
                </div>
                <p className={Productcard.productcarddesc}>Lorem ipsum dolor sit amet consectetur adipiscing elit duis at pretium dolor</p>
                <p className={Productcard.productcardcon}>Lorem ipsum dolor sit amet consectetur adipiscing elit duis at pretium dolor</p>
                <p className={Productcard.price}>From <span> $100</span></p>
                </div>
                </div>
                </div>

    )
}
export default ProductCard;
    