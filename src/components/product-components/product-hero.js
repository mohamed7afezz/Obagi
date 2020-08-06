import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import ProductStyles from "../../assets/scss/components/product-hero.module.scss"
import Img from "gatsby-image"
import Stars from "../../components/stars"
import modal from "../../assets/images/product-images/modal.svg"
import share from "../../assets/images/product-images/share.svg"
import Slider from "react-slick"
import { useLocation } from "@reach/router"
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css"
import InnerImageZoom from "react-inner-image-zoom"
import Zoom from "react-img-zoom"

const ProductHero = ({ data, nodeType }) => {
  const isClincal = nodeType == "clinical"

  let node = isClincal ? data.nodeClinicalProduct : data.nodeMedicalProduct
  let field_image = isClincal
    ? node.relationships.field_clinical_image
    : node.relationships.field_medical_image
  let field_description = isClincal
    ? node.field_clinical_description.processed
    : node.field_medical_description.processed
  let field_medical_type = isClincal
    ? node.field_clinical_medical_type
    : node.field_medical_form_list
  let field_weight = isClincal
    ? node.field_clinical_weight
    : node.field_medical_weight
  let field_price = isClincal
    ? node.field_clinical_price
    : node.field_medical_price
  let field_skin_type = isClincal
    ? node.relationships.field_clinical_skin_type
    : node.relationships.field_medical_skin_type
  let field_skin_concern = isClincal
    ? node.relationships.field_clinical_skin_concern
    : node.relationships.field_medical_skin_concern

  const location1 = useLocation()
  const path = location1.pathname
  const path1 = path.split("/")
  const [state, setState] = useState({
    nav1: null,
    nav2: null,
  })
  const slider1 = useRef()
  const slider2 = useRef()
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    })
  }, [])

  const { nav1, nav2 } = state
  const SliderSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    beforeChange: (current, next) => {
      document.querySelector(".myslickactive").classList.remove("myslickactive")
      document
        .querySelectorAll("#product-hero-slick .imageContainer")
        [next].classList.add("myslickactive")
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
        },
      },
    ],
  }

  function slickGoToslide(int) {
    slider1.current.slickGoTo(int)
  }

  return (
    <div
      className={[
        "container-fluid",
        ProductStyles.productHero,
        "productHero",
      ].join(" ")}
    >
      <div className={["row", ProductStyles.ordering].join(" ")}>
        <div className={["pathname", "col-12"].join(" ")}>
          <p className="pathtitle">
            <Link to="/homepage"> Home </Link>/{" "}
            <Link to={`/${nodeType}`}> {nodeType} </Link>/ {node.title}
          </p>
        </div>
        <div
          className={[
            "col-12",
            "col-lg-5",
            "offset-lg-1",
            "productimage",
            ProductStyles.productimage,
          ].join(" ")}
        >
          <Slider ref={slider => (slider1.current = slider)} {...SliderSetting}>
            {field_image.map((item, index) => {
              return (
                <React.Fragment>
                  <div class="zoom-mobile" data-arrange={index}>
                    {item.localFile ? (
                      <InnerImageZoom
                        src={item.localFile.childImageSharp.original.src}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="zoom-desk" data-arrange={index}>
                    {item.localFile ? (
                      <Zoom
                        img={item.localFile.childImageSharp.original.src}
                        zoomScale={1.5}
                        width={590}
                        height={500}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </React.Fragment>
              )
            })}
          </Slider>
        </div>
        <div
          className={[
            "col-12",
            "col-lg-4",
            "offset-lg-1",
            ProductStyles.productdetail,
          ].join(" ")}
        >
          <p className={[ProductStyles.productcat, "productcat"].join(" ")}>
            {nodeType}
          </p>
          <h1 className={ProductStyles.productname}>{node.title}</h1>
          <div
            className={ProductStyles.productdesc}
            dangerouslySetInnerHTML={{ __html: field_description }}
          ></div>
          <div className={["d-flex", ProductStyles.type].join(" ")}>
            <p className={ProductStyles.producttype}>{field_medical_type}</p>
            <ul>
              {" "}
              <li> Size {field_weight} oz </li>
            </ul>
          </div>
          <div className={["d-flex", ProductStyles.review].join(" ")}>
            <Stars value="0.0" />
            <p>0 Review</p>
          </div>
          <p className={ProductStyles.price}>
            {" "}
            <span>${field_price}</span>
          </p>
          <p className={ProductStyles.canuse}>
            Skin Type:{" "}
            {field_skin_type.map((item, index) => {
              return (
                <span className={ProductStyles.canusedata}>
                  <Link to={item.path.alias}> {item.name}</Link>
                  {index === field_skin_type.length - 1 ? "" : ", "}
                </span>
              )
            })}
          </p>
          <p className={ProductStyles.Indications}>
            Skin Concerns:{" "}
            {field_skin_concern.map((item, index) => {
              return (
                <span className={ProductStyles.Indicationsdata}>
                  <Link to={item.path.alias}> {item.name}</Link>
                  {index === field_skin_concern.length - 1 ? "" : ", "}
                </span>
              )
            })}
          </p>
          <p className={ProductStyles.quantityhead}>Quantity:</p>
          <div className={[ProductStyles.quantity, "d-flex"].join(" ")}>
            <div className={[ProductStyles.selectdiv, "col-3"].join(" ")}>
              <select>
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
            <div
              className={["col-12", "col-lg-6", ProductStyles.codeoff].join(
                " "
              )}
            >
              {" "}
              <p>
                Apply 20% off with code <span>Covid </span>
              </p>{" "}
              <img src={modal} />{" "}
            </div>
            <p
              className={["col-12", "col-lg-2", ProductStyles.share].join(" ")}
            >
              {" "}
              <img src={share} /> Share{" "}
            </p>
          </div>
          <button className={["btn", ProductStyles.btnCart].join(" ")}>
            Add to Bag
          </button>
        </div>
        <div
          id="product-hero-slick"
          className={["col-12", ProductStyles.images].join(" ")}
        >
          {field_image.map((item, index) => {
            return (
              <div
                data-arrange={index}
                className={[
                  index == 0 ? "myslickactive" : " ",
                  "imageContainer",
                  ProductStyles.imageContainer,
                ].join(" ")}
                onClick={() => {
                  slickGoToslide(index)
                }}
              >
                {item.localFile ? (
                  <img
                    className={["col-3", "pr-0", "pl-0"].join(" ")}
                    src={item.localFile.childImageSharp.original.src}
                  />
                ) : (
                  ""
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductHero
