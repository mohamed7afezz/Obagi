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
   
   
    const removeNotification =  value.removeNotification;
    function  navigateto(link,e){
        e.preventDefault();
     removeNotification([]);
      navigate(link)
    }
    return (

        <div className={ShowBagStyle.productWrapper}>
            <div className={ShowBagStyle.productImage}>
                <a href={recLink} onClick={(e) => {navigateto(recLink,e)}} className={ShowBagStyle.pointer}  >
                <Img alt="img"  fluid={recImage? recImage: ''} /></a></div>

            <div className={ShowBagStyle.smallWrapper}>
                <a href={recLink} className={[ShowBagStyle.productName,ShowBagStyle.pointer].join(" ")}  onClick={(e) => {navigateto(recLink,e)}}><div dangerouslySetInnerHTML={{__html: recTitle}}></div></a>

                <div className={ShowBagStyle.miniWrapper}>
                    <div className={ShowBagStyle.upbp}>${recPrice}</div>
                    <button className={`cartButton ${Sku?'add-btn-ready':""}`}
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