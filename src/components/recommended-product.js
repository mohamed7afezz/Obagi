import React, { useContext } from "react"
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import ShowBagStyle from "../assets/scss/components/show-bag.module.scss"
import CartContext from "../providers/cart-provider"

const $ = require("jquery");

const RecommendedProduct = ({ node,
recImage,
recLink,
recPrice,
recId,
Sku,
recTitle ,
premierid,
feild_preimer}) => {

    const value = useContext(CartContext)
    const addToCart = value && value.addToCart
    const addingToCart = value && value.state.addingToCart
    
    const removeNotification = value && value.removeNotification;
    function  navigateto(link){
    console.log('hassan')
    
     removeNotification(12);
      navigate(link)
    }
    return (

        <div className={ShowBagStyle.productWrapper}>
            <div className={ShowBagStyle.productImage}>
                <a  onClick={() => {navigateto(recLink)}} className={ShowBagStyle.pointer}  >
                <Img alt="img"  fluid={recImage? recImage: ''} /></a></div>

            <div className={ShowBagStyle.smallWrapper}>
                <a  className={[ShowBagStyle.productName,ShowBagStyle.pointer].join(" ")}  onClick={() => {navigateto(recLink)}}><div dangerouslySetInnerHTML={{__html: recTitle}}></div></a>

                <div className={ShowBagStyle.miniWrapper}>
                    <div className={ShowBagStyle.upbp}>${recPrice}</div>
                    <button className={'cartButton'}
                    data-Sku={Sku}
                        onClick={() => {
                            let quantity = 1;
                            addToCart(recId, false, quantity,recPrice,premierid,feild_preimer, recTitle);
                        }}
                        disabled={addingToCart === recId}
                    >
                        {addingToCart === recId ? "Adding to Bag" : "Add to Bag"}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default RecommendedProduct;