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

const ProductHero = ({ data, nodeType }) => {
  
  const isClincal = nodeType == "clinical";
  let node = isClincal ? data.nodeClinicalProduct : data.nodeMedicalProduct

  let productId = isClincal ? node.field_clinical_id : node.field_medical_id
  let productpath = node.path.alias
  let field_image = isClincal
    ? node.relationships.field_clinical_image
    : node.relationships.field_medical_image
    let reviewimg = isClincal
    ? node.relationships.field_clinical_image[0]?(node.relationships.field_clinical_image[0].localFile? node.relationships.field_clinical_image[0].localFile.childImageSharp.original.src : ""):""
    : node.relationships.field_medical_image[0]?(node.relationships.field_medical_image[0].localFile? node.relationships.field_medical_image[0].localFile.childImageSharp.original.src : ""):""
    let field_medical_rx = isClincal
    ? ""
    : node.relationships.field_medical_rx.name
  let field_description = isClincal
    ? node.field_clinical_description.processed
    : node.field_medical_description?node.field_medical_description.processed:''
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
    let field_info =  node.field_medical_info
  let feild_preimer = node.field_medical_premier_points
  let key_benefit  = isClincal
    ? node.field_clinical_key_benefit
    : node.field_medical_key_benefits
    let productSubTitle =isClincal
    ? "" //node.field_clinical_description_sub
    : node.field_medical_description_sub
    let key_benfitList = isClincal
    ? node.relationships.field_key_benefits_list?node.relationships.field_key_benefits_list.relationships.field_key_benefits_lists:""
    : node.relationships.field_medical_benefits_lists?node.relationships.field_medical_benefits_lists.relationships.field_key_benefits_lists:""
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
  function showpopover(e){
     
      
    document.querySelector('.popoverContainer').classList.toggle('show')
    
  }
//////////////////////

if ( typeof window !== "undefined"){
  window.bvDCC = {
  
    catalogData: {
    
    locale: "en_US",
    
    catalogProducts: [{
    
    "productId" : `${productId}`,
    
    "productName" : `${node.title}`,
    
    

    "productImageURL": `https://dev-obagi.azurewebsites.net${reviewimg}`,
    
    //ex. https:\\site.com\pub\media\mh02-black_main.jpg
    
    "productPageURL":`https://dev-obagi.azurewebsites.net${productpath}`,
    
      
    //ex: https:\\mywebsite.com\teton-pullover-hoodie.html
    
    "brandName" : "Obagi",
    
    "upcs" : ["724742001735","724742006907"],
    
    "inactive": false, //default
    
    "family": "Product Lines"
    
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
          dots: false,
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
    <div itemtype="https://schema.org/Product"
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
            <Link to={`/${nodeType}`}> {nodeType}</Link> / {node.title}
          </p>
        </div>
        <div className={["col-12",""].join(" ")}>
        <p className={[ProductStyles.productcat,"mt-24", "productcat","show-mob"].join(" ")}>
            {nodeType}
          </p>
          <div>
            <h1 className={[ProductStyles.productname,"show-mob"].join(" ")}>{node.title}</h1>
            <div className={["d-flex", ProductStyles.review,"show-mob"].join(" ")}>


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
          <p className={[ProductStyles.productcat, "productcat","hide-mob"].join(" ")}>
            {nodeType}
          </p>
          <div>
          <h1 className={[ProductStyles.productname,"hide-mob"].join(" ")} itemprop="name">{node.title}</h1>
          <div className={["d-flex", ProductStyles.review,"hide-mob"].join(" ")}>
 
          {field_medical_rx == "RX"? 
          ""
          :
          <div data-bv-show="rating_summary" data-bv-product-id={productId}></div>
        }

          </div>
          </div>
          <div
            className={ProductStyles.productSubDesc}
        
          >{productSubTitle}</div>
          <div
            className={ProductStyles.productdesc}
            dangerouslySetInnerHTML={{ __html: field_description }}
          ></div>
          <div className={ProductStyles.keyBenefitcon}>
            <p className={ProductStyles.key_benefittitle}>{key_benefit}</p>
            
            <ul className={ProductStyles.keyBenefitul}>
            {key_benfitList?key_benfitList.map((item, index) => {
              return (
                
                  <li className={ProductStyles.keyBenefitli}>
                    {item.field_list_item}
                  </li>
            
              )
            }):""}
            </ul>
          </div>
          <div className={ProductStyles.skintypes}>
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
        
          </div>
          <div className={["d-flex", ProductStyles.type].join(" ")}>
          <p className={ProductStyles.price}>
            <span>${field_price}</span>
          </p>
      
            <p className={ProductStyles.producttype}>{field_medical_type}</p>
            <ul>
              {" "}
              <li> Size {field_weight} oz </li>
            </ul>
          </div>
          {feild_preimer?
          <div
              className={["col-12", "col-lg-6", ProductStyles.codeoff].join(
                " "
              )}
            >
           <img src={modal} />  
              <p>
               Earn {feild_preimer} Premier Points 
              </p>
              
            </div>:""
          }
           {field_medical_rx == "RX"? 
          <div className={[ProductStyles.quantity, "d-flex"].join(" ")}>
         
            
      
        <div className={["d-flex",ProductStyles.centeralign,"centeralign","col-12","col-lg-10","md-pl0"].join(" ")}>
          {field_medical_rx == "RX"?
          <Link
            className={["btn", ProductStyles.btnCart,"btnCart"].join(" ")}
            to="/medical/hcpfinder">      
            Locate a Physician
         </Link>
          :<button
            className={["btn", ProductStyles.btnCart,"btnCart"].join(" ")}
            onClick={() => {
              let quantity = document.querySelector("#quantityBox").value;
              addToCart(productId,false,quantity);
            }}
            disabled={addingToCart === productId}
          >
            {addingToCart === productId ? "Adding to Bag" : "Add to Bag"}
          </button>
          }
         {field_info?
          <div className={[ProductStyles.popoverContainer,"popoverContainer"].join(" ")}>
            <p className={[ProductStyles.popcontent,'popcontent'].join(" ")}>
            {field_info}
            </p>

            <button  onClick={(e) => { showpopover(e) }} className={[ProductStyles.popover,"popover"].join(" ")}>
              <img src={info} className={[ProductStyles.info,"info"].join(" ")} />
              <img
                src={infoselected}
                className={[ProductStyles.infoselected,"infoselected"].join(" ")}
              />
            </button>
          </div>
          :""}
          
        </div>
    
          <p
            className={["col-12", "col-lg-2", ProductStyles.share].join(" ")}
          >
          
            <img src={share} /> Share
          </p>
        </div>
       : <div className={[ProductStyles.quantity, "d-flex"].join(" ")}>
         
            
            
       <div className={[ProductStyles.selectdiv, "col-3"].join(" ")}>
         <select id="quantityBox">
           <option>1</option>
           <option>2</option>
           <option>3</option>
         </select>
       </div>

     <div className={["d-flex",ProductStyles.centeralign,"centeralign","col-12","col-lg-8"].join(" ")}>
       {field_medical_rx == "RX"?
       <Link
         className={["btn", ProductStyles.btnCart,"btnCart"].join(" ")}
         to="/medical/hcpfinder">      
         Find a Physician
      </Link>
       :<button
         className={["btn", ProductStyles.btnCart,"btnCart"].join(" ")}
         onClick={() => {
           let quantity = document.querySelector("#quantityBox").value;
           addToCart(productId,false,quantity);
         }}
         disabled={addingToCart === productId}
       >
         {addingToCart === productId ? "Adding to Bag" : "Add to Bag"}
       </button>
       }
      {field_info?
       <div className={[ProductStyles.popoverContainer,"popoverContainer"].join(" ")}>
         <p className={[ProductStyles.popcontent,'popcontent'].join(" ")}>
         {field_info}
         </p>

         <button  onClick={(e) => { showpopover(e) }} className={[ProductStyles.popover,"popover"].join(" ")}>
           <img src={info} className={[ProductStyles.info,"info"].join(" ")} />
           <img
             src={infoselected}
             className={[ProductStyles.infoselected,"infoselected"].join(" ")}
           />
         </button>
       </div>
       :""}
       
     </div>
 
       <p
         className={["col-12", "col-lg-2", ProductStyles.share].join(" ")}
       >
       
         <img src={share} /> Share
       </p>
     </div>
      }
      {field_medical_rx == "RX"? "":
             <div className={ProductStyles.offer}> 
            <div className={["col-3",ProductStyles.offerimg].join(" ")}>
            <img src={freeimg}/>
            </div>
            <div className={["col-9",ProductStyles.offercontent].join(" ")}>
            <p className={ProductStyles.offertitle}>
            COMPLIMENTARY SHIPPING
            </p>
            <p className={ProductStyles.offerdesc}>Sign Up for a free Obagi Account and receive free ground shipping on orders $125 or more.</p>
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
    </div>
  )
}

export default ProductHero
