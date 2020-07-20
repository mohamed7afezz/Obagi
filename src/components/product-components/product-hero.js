import React, { useEffect, useRef, useState } from 'react'
import { Link } from "gatsby"
import ProductStyles from '../../assets/scss/components/product-hero.module.scss'
import Img from 'gatsby-image'
import Stars from '../../components/stars'
import modal from '../../assets/images/product-images/modal.svg'
import share from '../../assets/images/product-images/share.svg'
import Slider from "react-slick";
import { useLocation } from "@reach/router"
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'
const ProductHero = ({ node, props }) => {
  const location1 = useLocation();
  const path =location1.pathname
  const path1 = path.split('/')
  const [state, setState] = useState({
    nav1: null,
    nav2: null
  });
  const slider1 = useRef();
  const slider2 = useRef();
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current
    });
  }, []);

  const {
    nav1,
    nav2
  } = state;
  const SliderSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    dots : true,
    beforeChange: (current, next) => {
      document.querySelector('.myslickactive').classList.remove('myslickactive'); 
      document.querySelectorAll("#product-hero-slick .imageContainer")[next].classList.add('myslickactive')
    },
    responsive: [
      {          
        breakpoint: 1024,
        settings: {
          dots: false,
        }
      },
  ]
  }
  
  function slickGoToslide(int) {
   slider1.current.slickGoTo(int)
  }
    
  return (
    <div className={["container-fluid", ProductStyles.productHero].join(" ")}>
      <div className={["row", ProductStyles.ordering].join(" ")}>
        <div className={["pathname","col-12"].join(" ")}>
           <p className="pathtitle">Home/{path1[1]}/{node.title}</p>
        </div>
        <div  className={["col-12", "col-lg-5", "offset-lg-1","productimage", ProductStyles.productimage].join(" ")}>
        <Slider  ref={slider => (slider1.current = slider)}  {...SliderSetting}>
              {
                  node.relationships.field_clinical_image.map((item,index) => {
                      return <div data-arrange={index}   >
                        <InnerImageZoom src={item.localFile.childImageSharp.original.src} />
                        </div>
                  })
              }
          </Slider>
        </div>
        <div className={["col-12", "col-lg-4", "offset-lg-1", ProductStyles.productdetail].join(" ")}>
          <p className={[ProductStyles.productcat,"productcat"].join(" ")}>CLINICAL</p>
          <h1 className={ProductStyles.productname}>{node.title}</h1>
          <div className={ProductStyles.productdesc} dangerouslySetInnerHTML={{__html: node.field_clinical_description.processed}}></div>
          <div className={["d-flex", ProductStyles.type].join(" ")}><p>{node.field_clinical_medical_type}</p>
            <ul> <li>  Size {node.field_clinical_weight} oz </li></ul></div>
          <div className={["d-flex", ProductStyles.review].join(" ")}><Stars value="0.0" />
            <p>0 Review</p></div>
          <p className={ProductStyles.price}> <span>${node.field_clinical_price}</span></p>
          <p className={ProductStyles.canuse}>
              Skin Type: {node.relationships.field_clinical_skin_type.map((item, index) => {
                  return <span><Link to={item.path.alias}> {item.name}</Link>{index === node.relationships.field_clinical_skin_type.length - 1? '' : ', '}</span>
              })} 
          </p>
          <p className={ProductStyles.Indications}> 
            Skin Concerns: {node.relationships.field_clinical_skin_concern.map((item, index) => {
                  return <span><Link to={item.path.alias}> {item.name}</Link>{index === node.relationships.field_clinical_skin_concern.length - 1? '' : ', '}</span>
              })} 
          </p>
          <p className={ProductStyles.quantityhead}>Quantity:</p>
          <div className={[ProductStyles.quantity, "d-flex"].join(" ")}>
            <div className={[ProductStyles.selectdiv, "col-3"].join(" ")}>
              <select >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
            <div className={["col-12", "col-lg-6", ProductStyles.codeoff].join(" ")}> <p >Apply 20% off with code <span>Covid </span></p>   <img src={modal} /> </div>
            <p className={["col-12", "col-lg-2", ProductStyles.share].join(" ")}> <img src={share} /> Share </p>

          </div>
          <button className={["btn", ProductStyles.btnCart].join(" ")}>Add to Bag</button>
        </div>
        <div id="product-hero-slick" className={["col-12", ProductStyles.images].join(" ")}>
            
            {
                node.relationships.field_clinical_image.map((item, index) => {
                    return <div data-arrange={index} className={[index==0?'myslickactive':' ',"imageContainer",ProductStyles.imageContainer].join(" ")} onClick={() => {slickGoToslide(index);} }>
                       <img className={["col-3","pr-0","pl-0"].join(" ")} src={item.localFile.childImageSharp.original.src} />
                    </div>
                })
            }

            
        </div>
      </div>

    </div>

  )
};

export default ProductHero;