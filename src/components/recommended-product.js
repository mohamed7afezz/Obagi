import React, { useContext } from "react"
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link } from "gatsby"
import ShowBagStyle from "../assets/scss/components/show-bag.module.scss"
import CartContext from "../providers/cart-provider"


const RecommendedProduct = ({ node,
recImage,
recLink,
recPrice,
recId,
recTitle }) => {

const value = useContext(CartContext)
const addToCart = value && value.addToCart
const addingToCart = value && value.state.addingToCart
    return (

        <div className={ShowBagStyle.productWrapper}>
            <div className={ShowBagStyle.productImage}><Img fluid={recImage? recImage: ''} /></div>

            <div className={ShowBagStyle.smallWrapper}>
                <Link to={recLink} className={ShowBagStyle.productName}><div><span dangerouslySetInnerHTML={{__html: recTitle}}></span></div></Link>

                <div className={ShowBagStyle.miniWrapper}>
                    <div>${recPrice}</div>
                    <button className={ShowBagStyle.cartButton}
                        onClick={() => {
                            let quantity = 1;
                            addToCart(recId, false, quantity,recPrice);
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