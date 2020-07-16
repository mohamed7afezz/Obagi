import React, { useEffect, useRef, useState } from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import ProductStyles from '../../assets/scss/components/product-hero.module.scss'
import Img from 'gatsby-image'
import Stars from '../../components/stars'
import modal from '../../assets/images/product-images/modal.svg'
import share from '../../assets/images/product-images/share.svg'
import Slider from "react-slick";
import AsNavFor from "../../components/slick-slider"
import group from '../../assets/images/product-images/Clinical-VitaminCEyeBrightener-HeroProduct_PPD2-001.png'
import vitamins from '../../assets/images/product-images/Clinical-VitaminCEyeBrightener-Lifestyle-003.jpg'
import f4 from '../../assets/images/product-images/Clinical-VitaminCEyeBrightener-Lifestyle-002.jpg'
import ob from '../../assets/images/product-images/2019-ob-08-retinol-0110-3.png'
import $ from 'jquery';


const ProductHero = ({ node, props }) => {
  
 console.log(node)
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
   slider1.current.slickGoTo(int)
  }
  const data = useStaticQuery(graphql`
    query {

      
      retinol: file(relativePath: { eq: "product-images/Clinical-VitaminCEyeBrightener-Lifestyle-003.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      vitamins: file(relativePath: { eq: "product-images/Clinical-VitaminCEyeBrightener-Lifestyle-002.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ob: file(relativePath: { eq: "product-images/2019-ob-08-retinol-0110-3.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      f4: file(relativePath: { eq: "product-images/f4.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }`

  )
    
  return (
    <div className={["container-fluid", ProductStyles.productHero].join(" ")}>
      <div className={["row", ProductStyles.ordering].join(" ")}>
        <div className={["col-12", "col-lg-5", "offset-lg-1","productimage", ProductStyles.productimage].join(" ")}>
          <Slider ref={slider => (slider1.current = slider)}  {...SliderSetting}>
              {
                  node.relationships.field_clinical_image.map(item => {
                      return <Img fluid={item.localFile.childImageSharp.fluid} />
                  })
              }
          </Slider>
        </div>
        <div className={["col-12", "col-lg-4", "offset-lg-1", ProductStyles.productdetail].join(" ")}>
          <p className={ProductStyles.productcat}>CLINICAL</p>
          <h1 className={ProductStyles.productname}>{node.title}</h1>
          <p className={ProductStyles.productdesc} dangerouslySetInnerHTML={{__html: node.field_clinical_description.processed}}></p>
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
              </select>
            </div>
            <div className={["col-12", "col-lg-6", ProductStyles.codeoff].join(" ")}> <p >Apply 20% off with code <span>Covid </span></p>   <img src={modal} /> </div>
            <p className={["col-12", "col-lg-2", ProductStyles.share].join(" ")}> <img src={share} /> Share </p>

          </div>
          <button className={["btn", ProductStyles.btnCart].join(" ")}>Add to Bag</button>
        </div>
        <div className={["col-12", ProductStyles.images].join(" ")} ref={slider => (slider2.current = slider)} {...HeroSettings}>
            
            {
                node.relationships.field_clinical_image.map((item, index) => {
                    return <div className={["imageContainer",ProductStyles.imageContainer].join(" ")} onClick={() => slickGoToslide(index) }>
                        <Img fluid={item.localFile.childImageSharp.fluid} />
                    </div>
                })
            }

            
        </div>
      </div>

    </div>

  )
};

export default ProductHero;