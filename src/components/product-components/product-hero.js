import React, { useEffect, useRef, useState, useContext } from "react"
import { Link } from "gatsby"
import ProductStyles from "../../assets/scss/components/product-hero.module.scss"
import Img from "gatsby-image"
import Stars from "../../components/stars"
import modal from "../../assets/images/diamond.png"
import share from "../../assets/images/product-images/share.svg"
import Slider from "react-slick"
import { useLocation } from "@reach/router"
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css"
import InnerImageZoom from "react-inner-image-zoom"
import Zoom from "react-img-zoom"
import CartContext from "../../providers/cart-provider"
import info from "../../assets/images/info.svg"
import infoselected from "../../assets/images/info-selected.svg"
import freeimg from "../../assets/images/rsz_thumbnail.png"
import { func } from "prop-types"
import { checkStock } from '../../assets/js/stock';
import fb from "../../assets/images/product-images/facebook.svg"
import tw from "../../assets/images/product-images/twitter.svg"
const baseUrl = process.env.Base_URL;

const ProductHero = ({ data, nodeType }) => {
  useEffect(() => {
    if (typeof window != undefined) {
      checkStock(baseUrl);
    }
  }, [])
  const isClincal = nodeType == "clinical";
  let node = isClincal ? data.nodeClinicalProduct : data.nodeMedicalProduct

  let productId = isClincal ? node.field_clinical_id : node.field_medical_id
  let productpath = node.path.alias
  let field_image = isClincal
    ? node.relationships.field_clinical_image
    : node.relationships.field_medical_image
  let reviewimg = isClincal
    ? node.relationships.field_clinical_image[0] ? (node.relationships.field_clinical_image[0].localFile ? node.relationships.field_clinical_image[0].localFile.childImageSharp.original.src : "") : ""
    : node.relationships.field_medical_image[0] ? (node.relationships.field_medical_image[0].localFile ? node.relationships.field_medical_image[0].localFile.childImageSharp.original.src : "") : ""
  let field_medical_rx = isClincal
    ? ""
    : node.relationships.field_medical_rx.name

  let field_description = isClincal
    ? node.field_clinical_description.processed
    : node.field_medical_description ? node.field_medical_description.processed : ''
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
  let field_info = node.field_medical_info
  let feild_preimer = node.field_medical_premier_points ?
    node.field_medical_premier_points : "";
  let premierid = node.field_medical_premier_points_id ?
    node.field_medical_premier_points_id : ""
  let field_weight_unit = isClincal
    ? node.field_clinical_weight_unit
    : node.field_medical_weight_unit
  let Sku = isClincal ? node.field_clinical_sku
    : node.field_medical_sku
  let key_benefit = isClincal
    ? node.field_clinical_key_benefit
    : node.field_medical_key_benefits
  let productSubTitle = isClincal
    ? "" //node.field_clinical_description_sub
    : node.field_medical_description_sub
  let key_benfitList = isClincal
    ? node.relationships.field_key_benefits_list ? node.relationships.field_key_benefits_list.relationships.field_key_benefits_lists : ""
    : node.relationships.field_medical_benefits_lists ? node.relationships.field_medical_benefits_lists.relationships.field_key_benefits_lists : ""
  const location1 = useLocation()
  const path = location1.pathname
  const path1 = path.split("/")
  const [state, setState] = useState({
    nav1: null,
    nav2: null,
  })
  const slider1 = useRef()
  const slider2 = useRef()
  // document.querySelector('body').addEventListener('click',function(){
  //   if (document.querySelector('.popoverContainer').classList.contains('show')) {
  //     document.querySelector('.popoverContainer').classList.remove('show')
  //   }
  // })
  function showpopover(e) {


    document.querySelector('.popoverContainer').classList.toggle('show')

  }
  //////////////////////

  if (typeof window !== "undefined") {
    window.bvDCC = {

      catalogData: {

        locale: "en_US",

        catalogProducts: [{

          "productId": `${productId}`,

          "productName": `${node.title}`,



          "productImageURL": `https://dev-obagi.azurewebsites.net${reviewimg}`,

          //ex. https:\\site.com\pub\media\mh02-black_main.jpg

          "productPageURL": `https://dev-obagi.azurewebsites.net${productpath}`,


          //ex: https:\\mywebsite.com\teton-pullover-hoodie.html

          "brandName": "Obagi",

          "upcs": ["724742001735", "724742006907"],

          "inactive": false, //default

          "family": ""

        }]

      }

    };

    window.bvCallback = function (BV) {

      BV.pixel.trackEvent("CatalogUpdate", {

        type: 'Product',

        locale: window.bvDCC.catalogData.locale,

        catalogProducts: window.bvDCC.catalogData.catalogProducts

      });

    };
  }
  /////////////////////////
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
    arrows: true,
    dots: true,
    beforeChange: (current, next) => {
      if (document.querySelector(".myslickactive") != null) {
        document
          .querySelector(".myslickactive")
          .classList.remove("myslickactive")
        document
          .querySelectorAll("#product-hero-slick .imageContainer")
        [next].classList.add("myslickactive")
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.05,
          dots: true,
        },
      },
    ],
  }

  function slickGoToslide(int) {
    slider1.current.slickGoTo(int)
  }

  const value = useContext(CartContext)
  const addToCart = value && value.addToCart
  const addingToCart = value && value.state.addingToCart

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
          <p className="pathtitle pb-24 pt-16">
            <Link to="/homepage"> Home</Link> /{" "}
            <Link to={`/${nodeType}`}> {nodeType}</Link> / <span dangerouslySetInnerHTML={{ __html: node.title }}></span>
          </p>
        </div>
        <div className={["col-12", ""].join(" ")}>
          <p className={[ProductStyles.productcat,  "productcat", "show-mob"].join(" ")}>
            {nodeType}
          </p>
          <div>
            <h1 className={[ProductStyles.productname, "show-mob"].join(" ")}><span dangerouslySetInnerHTML={{ __html: node.title }}></span></h1>
            <div className={["d-flex", ProductStyles.review, "show-mob"].join(" ")}>


              <div data-bv-show="rating_summary" data-bv-product-id={productId}></div>
            </div>


          </div></div>
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
                      <img
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
                        width={745}
                        height={615}
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
          <p className={[ProductStyles.productcat, "productcat", "hide-mob"].join(" ")}>
            {nodeType}
          </p>
          <div>
            <h1 className={[ProductStyles.productname, "hide-mob"].join(" ")} itemprop="name"><span dangerouslySetInnerHTML={{ __html: node.title }}></span></h1>
            <div className={["d-flex", ProductStyles.review, "hide-mob"].join(" ")}>

              {field_medical_rx == "RX" ?
                ""
                :
                <div data-bv-show="rating_summary" data-bv-product-id={productId}></div>
              }

            </div>
          </div>
          {productSubTitle?<div
            className={ProductStyles.productSubDesc}

          >{productSubTitle}</div>:""}
          <div
            className={ProductStyles.productdesc}
            dangerouslySetInnerHTML={{ __html: field_description }}
          ></div>
          
          {key_benefit || key_benfitList?  <div className={ProductStyles.keyBenefitcon}>
         {key_benefit?     <p className={ProductStyles.key_benefittitle}>{key_benefit}</p>
          :""}
          {key_benfitList ?   <ul className={ProductStyles.keyBenefitul}>
              {key_benfitList ? key_benfitList.map((item, index) => {
                return (

                  <li className={ProductStyles.keyBenefitli}>
                    <span dangerouslySetInnerHTML={{ __html: item.field_list_item }}></span>
                  </li>

                )
              }) : ""}
            </ul>:""}
          </div>:""} 
          <div className={ProductStyles.skintypes}>
            {field_skin_type.length > 0 ? <p className={ProductStyles.canuse}>
              Skin Type:{" "}
              {field_skin_type.map((item, index) => {
                return (
                  <span className={ProductStyles.canusedata}>
                    <Link to={item.path.alias}> {item.name}</Link>
                    {index === field_skin_type.length - 1 ? "" : ", "}
                  </span>
                )
              })}
            </p> : ""}
            {field_skin_concern.length > 0 ? <p className={ProductStyles.Indications}>
              Skin Concerns:{" "}
              {field_skin_concern.map((item, index) => {
                return (
                  <span className={ProductStyles.Indicationsdata}>
                    <Link to={item.path.alias}> {item.name}</Link>
                    {index === field_skin_concern.length - 1 ? "" : ", "}
                  </span>
                )
              })}
            </p> : ""}

          </div>
          <div className={["d-flex", ProductStyles.type].join(" ")}>
            <p className={ProductStyles.price}>
              <span>${field_price}</span>
            </p>

            <p className={ProductStyles.producttype}>{field_medical_type}</p>
            {field_weight !== "0" ? <ul>
              {" "}
              <li> Size {field_weight}  {field_weight_unit} </li>
            </ul> : ""}
          </div>
          {feild_preimer && field_medical_rx !== "RX" ?
            <div
              className={[ ProductStyles.codeoff].join(
                " "
              )}
            >
              <img src={modal} />
              <p>
                Earn {feild_preimer} Premier Points
              </p>

            </div> : ""
          }
          {field_medical_rx == "RX" ?
            <div className={[ProductStyles.quantity, "d-flex"].join(" ")}>



              <div className={["d-flex", ProductStyles.centeralign, "centeralign", "col-12", "col-lg-10", "md-pl0"].join(" ")}>
                {field_medical_rx == "RX" ?
                  <Link
                    className={["btn", ProductStyles.btnCart, "btnCart", "locate-physician"].join(" ")}
                    to="/medical/hcpfinder">
                    Locate a Physician
         </Link>
                  : <button
                    className={["btn", ProductStyles.btnCart, "btnCart"].join(" ")}
                    data-Sku={Sku}
                    onClick={() => {
                      let quantity = document.querySelector("#quantityBox").value;
                      premierid && feild_preimer ?
                        addToCart(productId, false, quantity, field_price, premierid, feild_preimer) : addToCart(productId, false, quantity, field_price)
                    }}
                    disabled={addingToCart === productId}
                  >
                    {addingToCart === productId ? "Adding to Bag" : "Add to Bag"}
                  </button>
                }
                {field_info ?
                  <div className={[ProductStyles.popoverContainer, "popoverContainer"].join(" ")}>
                    <div dangerouslySetInnerHTML={{ __html: field_info }} className={[ProductStyles.popcontent, 'popcontent'].join(" ")}>
                    </div>

                    <button onClick={(e) => { showpopover(e) }} className={[ProductStyles.popover, "popover"].join(" ")}>
                      <img src={info} className={[ProductStyles.info, "info"].join(" ")} />
                      <img
                        src={infoselected}
                        className={[ProductStyles.infoselected, "infoselected"].join(" ")}
                      />
                    </button>
                  </div>
                  : ""}

              </div>

              <button
              data-toggle="modal" data-target="#sharing"   className={["col-12", "col-lg-2", ProductStyles.share].join(" ")}
              >

                <img src={share} /> Share
          </button>
            </div>
            : <div className={[ProductStyles.quantity, "d-flex"].join(" ")}>



              <div className={[ProductStyles.selectdiv, "col-3"].join(" ")}>
                <select id="quantityBox">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>

              <div className={["d-flex", ProductStyles.centeralign, "centeralign", "col-12 col-md-6", "col-lg-6"].join(" ")}>
                {field_medical_rx == "RX" ?
                  <Link
                    className={["btn", ProductStyles.btnCart, "btnCart"].join(" ")}
                    to="/medical/hcpfinder">
                    Find a Physician
      </Link>
                  : <button
                    className={["btn", ProductStyles.btnCart, "btnCart"].join(" ")}
                    data-Sku={Sku}
                    onClick={() => {
                      let quantity = document.querySelector("#quantityBox").value;
                      premierid && feild_preimer ?
                        addToCart(productId, false, quantity, field_price, premierid, feild_preimer) : addToCart(productId, false, quantity, field_price)
                    }}
                    disabled={addingToCart === productId}
                  >
                    {addingToCart === productId ? "Adding to Bag" : "Add to Bag"}
                  </button>
                }
                {field_info ?
                  <div className={[ProductStyles.popoverContainer, "popoverContainer"].join(" ")}>
                    <div className={[ProductStyles.popcontent, 'popcontent'].join(" ")}>
                      
                    </div>

                    <button onClick={(e) => { showpopover(e) }} className={[ProductStyles.popover, "popover"].join(" ")}>
                      <img src={info} className={[ProductStyles.info, "info"].join(" ")} />
                      <img
                        src={infoselected}
                        className={[ProductStyles.infoselected, "infoselected"].join(" ")}
                      />
                    </button>
                  </div>
                  : ""}

              </div>

              <button
            data-toggle="modal" data-target="#sharing"   className={["col-12 col-md-2", "col-lg-2", ProductStyles.share].join(" ")}
              >

                <img src={share} /> Share
       </button>
            </div>
          }
          {field_medical_rx == "RX" ? "" :
            <div className={ProductStyles.offer}>
              <div className={["col-3", ProductStyles.offerimg].join(" ")}>
                <img src={freeimg} />
              </div>
              <div className={["col-9", ProductStyles.offercontent,"offercontent"].join(" ")}>
                <p className={ProductStyles.offertitle}>
                  COMPLIMENTARY SHIPPING
            </p>
                <p className={ProductStyles.offerdesc}>Sign up for a free Obagi account and receive free ground shipping on orders $125 or more.</p>
                <p className={ProductStyles.offersignin}><Link className={ProductStyles.linkText} to="/my-account/signin/"> Sign In</Link> or <Link className={ProductStyles.linkText} to="/registration">Register</Link> to receive offer at checkout
            </p>

                {/* <p className={ProductStyles.offerfooter}>Adds at checkout. While supplies last.</p> */}
              </div>
            </div>
          }
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

      <div
        class="modal fade"
        id="sharing"
        tabindex="-1"
        role="dialog"
        aria-labelledby="checkModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
            <div class="share-wrap  mt-35 mb-50">
                <h1 className={[ProductStyles.productname,"text-center"].join(" ")}><span>Share the</span></h1>
                <h1 className={[ProductStyles.productname,"text-center"].join(" ")}><span dangerouslySetInnerHTML={{ __html: node.title }}></span></h1>
                <div><a class="social-link face-share" href={`https://www.facebook.com/sharer/sharer.php?u=https://dev-obagi.azurewebsites.net`} target="_blank"><span><img src={fb} /></span><span class="d-block text-center">SHARE ON FACEBOOK</span></a></div>
                <div><a class="social-link twitter-share" href={`https://twitter.com/intent/tweet?text=https://dev-obagi.azurewebsites.net/`} target="_blank"><span><img src={tw} /></span><span class="d-block text-center">SHARE ON TWITTER</span></a></div>
              </div>
            </div>
        </div>
        </div>
      </div>
 

    </div>
  )
}

export default ProductHero
