import React, { useEffect, useRef, useState } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import * as ProductStyles from '../assets/scss/components/product-hero.module.scss'
import { GatsbyImage } from "gatsby-plugin-image";
import Stars from '../components/stars'
import modal from '../assets/images/product-images/modal.svg'
import share from '../assets/images/product-images/share.svg'
import Slider from "react-slick";
import AsNavFor from "../components/slick-slider"
import group from '../assets/images/product-images/Clinical-VitaminCEyeBrightener-HeroProduct_PPD2-001.png'
import vitamins from '../assets/images/product-images/Clinical-VitaminCEyeBrightener-Lifestyle-003.jpg'
import f4 from '../assets/images/product-images/Clinical-VitaminCEyeBrightener-Lifestyle-002.jpg'
import ob from '../assets/images/product-images/2019-ob-08-retinol-0110-3.png'
import $ from 'jquery';

const ProductHero = ({ node, props }) => {
  
 
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

  const HeroSettings = {
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    afterChange: () =>
      this.setState(state => ({ updateCount: state.updateCount + 1 })),
    beforeChange: (current, next) => this.setState({ slideIndex: next })
  };



  const SliderSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    dots : true,
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
   slider1.current.slickGoTo(int);
  
  }
  const data = useStaticQuery(graphql`{
  retinol: file(
    relativePath: {eq: "product-images/Clinical-VitaminCEyeBrightener-HeroProduct_PPD2-001.png"}
  ) {
    childImageSharp {
      gatsbyImageData(width: 480, height: 270, layout: FIXED)
    }
  }
  vitamins: file(
    relativePath: {eq: "product-images/Clinical-VitaminCEyeBrightener-Lifestyle-003.jpg"}
  ) {
    childImageSharp {
      gatsbyImageData(width: 480, height: 270, layout: FIXED)
    }
  }
  ob: file(relativePath: {eq: "product-images/2019-ob-08-retinol-0110-3.png"}) {
    childImageSharp {
      gatsbyImageData(width: 480, height: 270, layout: FIXED)
    }
  }
  f4: file(
    relativePath: {eq: "product-images/Clinical-VitaminCEyeBrightener-Lifestyle-002.jpg"}
  ) {
    childImageSharp {
      gatsbyImageData(width: 480, height: 270, layout: FIXED)
    }
  }
  retinol1: file(
    relativePath: {eq: "product-images/Clinical-VitaminCEyeBrightener-HeroProduct_PPD2-001.png"}
  ) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  vitamins1: file(
    relativePath: {eq: "product-images/Clinical-VitaminCEyeBrightener-Lifestyle-003.jpg"}
  ) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  ob1: file(relativePath: {eq: "product-images/2019-ob-08-retinol-0110-3.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  f41: file(
    relativePath: {eq: "product-images/Clinical-VitaminCEyeBrightener-Lifestyle-002.jpg"}
  ) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
}
`
    
  )
    
  return (
    <div className={["container-fluid", ProductStyles.productHero].join(" ")}>
      <div className={["row", ProductStyles.ordering].join(" ")}>
        <div className={["col-12", "col-lg-5", "offset-lg-1","productimage", ProductStyles.productimage].join(" ")}>
          <Slider ref={slider => (slider1.current = slider)}  {...SliderSetting}>
   
          <GatsbyImage image={data.retinol1.childImageSharp.gatsbyImageData} alt="img" />

     
          <GatsbyImage image={data.vitamins1.childImageSharp.gatsbyImageData} alt="img" />

 
          <GatsbyImage image={data.ob1.childImageSharp.gatsbyImageData} alt="img" />

          <GatsbyImage image={data.f41.childImageSharp.gatsbyImageData} alt="img" />

     
          </Slider>
        </div>
        <div className={["col-12", "col-lg-4", "offset-lg-1", ProductStyles.productdetail].join(" ")}>
          <p className={ProductStyles.productcat}>CLINICAL</p>
          <h1 className={ProductStyles.productname}>Vitamin C Eye Brightener </h1>
          <p className={ProductStyles.productdesc}>An eye brightener created to reduce fine lines and other signs of early skin aging, while energizing and recharging tired, overused eyes.
          </p>
          <div className={["d-flex", ProductStyles.type].join(" ")}><p>Brightening Cream</p>
            <ul> <li>  Size 0.5 oz </li></ul></div>
          <div className={["d-flex", ProductStyles.review].join(" ")}><Stars value="0.0" />
            <p>0 Review</p></div>
          <p className={ProductStyles.price}> <span>$60</span></p>
          <p className={ProductStyles.canuse}>Skin Type <a href="#"> Normal</a>, <a href="#">Dry</a>, <a href="#">Combination</a>, <a href="#">Oily</a></p>
          <p className={ProductStyles.Indications}> Skin Concerns:  <a href="#">Tired & Puffy Eyes</a>, <a href="#"> Fine Lines And Wrinkles</a>, <a href="#">Elasticity & Sagging Skin</a></p>
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
              </select>
            </div>
            <div className={["col-12", "col-lg-6", ProductStyles.codeOff].join(" ")}> <p >Apply 20% off with code <span>Covid </span></p>   <img src={modal} alt="img"/> </div>
            <p className={["col-12", "col-lg-2", ProductStyles.share].join(" ")}> <img src={share} alt="img"/> Share </p>

          </div>
          <button className={["btn", ProductStyles.btnCart].join(" ")}>Add to Bag</button>
        </div>
        <div className={["col-12", ProductStyles.images].join(" ")} ref={slider => (slider2.current = slider)} {...HeroSettings}>

            <div onClick={() => slickGoToslide(0)} className={["imageContainer",ProductStyles.imageContainer,"Active"].join(" ")}>
          
            <GatsbyImage image={data.retinol.childImageSharp.gatsbyImageData} alt="img" />

            </div>
            <div onClick={() => slickGoToslide(1) } className={["imageContainer",ProductStyles.imageContainer,].join(" ")}>

            <GatsbyImage image={data.vitamins.childImageSharp.gatsbyImageData} alt="img" />

            </div>
            <div onClick={() => slickGoToslide(2)} className={["imageContainer",ProductStyles.imageContainer].join(" ")}>

            <GatsbyImage image={data.ob.childImageSharp.gatsbyImageData} alt="img" />

            </div>
            <div onClick={() => slickGoToslide(3)} className={["imageContainer",ProductStyles.imageContainer].join(" ")}>

            <GatsbyImage image={data.f4.childImageSharp.gatsbyImageData} alt="img" />

        </div>
        </div>
      </div>

    </div>
  );
};

export default ProductHero;