import React from 'react'
import productsuggestion from '../../assets/scss/components/productsuggestion.module.scss'
import ProductCard from "../../components/productcard"
import Slider from "react-slick";
import { useStaticQuery, graphql } from "gatsby"
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
      const data = useStaticQuery(graphql`
      query {
       
        cardimg: file(relativePath: { eq: "product-images/main-image.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }`
      )
      
    return (
      <div className={["container-fluid", productsuggestion.productsuggestioncon,"productsuggestioncon"].join(" ")} >
      <h1 className={productsuggestion.productsuggestionhead}>{node.field_you_might_title}</h1>
     <div className={["row", productsuggestion.ordering].join(" ")}>
             <div className={ productsuggestion.slickcon}>
              <Slider {...settings}>
              <div className={["col-12",  productsuggestion.allcon].join(" ")}>
         <ProductCard producttitle="Lorem ipsum dolor sit amet consectetur adipiscing elit duis at pretium dolor "
          productdescription={{__html:"Aliquam eleifend feugiat nulla. In tristique elementum nisi, eget bibendum urna congue viverra"}} productimage={data.cardimg.childImageSharp.fluid} price="60" rate="5.0" />
         </div>
         <div className={["col-12",  productsuggestion.allcon].join(" ")}>
         <ProductCard producttitle="Lorem ipsum dolor sit amet consectetur adipiscing elit duis at pretium dolor "
          productdescription={{__html:"Aliquam eleifend feugiat nulla. In tristique elementum nisi, eget bibendum urna congue viverra"}} productimage={data.cardimg.childImageSharp.fluid} price="60" rate="5.0" />
         </div>
         <div className={["col-12",  productsuggestion.allcon].join(" ")}>
         <ProductCard producttitle="Lorem ipsum dolor sit amet consectetur adipiscing elit duis at pretium dolor "
          productdescription={{__html:"Aliquam eleifend feugiat nulla. In tristique elementum nisi, eget bibendum urna congue viverra"}} productimage={data.cardimg.childImageSharp.fluid} price="60" rate="5.0" />
         </div>
         </Slider>
     </div>
 </div>
 </div>
    )
}
export default ProductSuggestion
export const fragment = graphql`
    fragment youMightAlsoLikeParagrapgh on paragraph__you_might_also_like {
        id
        field_you_might_title
    }
        `