import React, { useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import lineStyles from "../assets/scss/components/product-line.module.scss"
import productsuggestion from '../assets/scss/components/productsuggestion.module.scss'
import ProductCard from "../components/productcard"
const ProductLine = ({ node }) => {
  const [nav1, setNav1] = React.useState(null)
  const [nav2, setNav2] = React.useState(null)
    let slider1 = []
    let slider2 = []

    React.useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [slider1, slider2])
  const SliderSetting = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
    beforeChange: (current, next) => {
      let progressbar =  document.querySelectorAll('.tab-slider .slick-dots li');
      
      progressbar.forEach((activeLi,index) =>{
       
        if (index <= next) {
          activeLi.classList.add('slick-data-active')
          
        }else if (index > next){
          progressbar[index].classList.remove('slick-data-active')
          
        }
    
         
        
       
      })
      
   let tabsstate=   document
      .querySelectorAll(".line-tab ");
      let i = current;
      tabsstate.forEach((activetab,index) =>{
      
        if (index == next) {
          activetab.classList.add('active')
        }
        else{
          activetab.classList.remove('active')
        }
     
      })
    },
  }
  
  const SliderSetting2 = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
    
  }
  const TabSliderSetting = {
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    arrows: false,
    dots: true,
    
    responsive: [
      {
        
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          dots: true,
          arrows: false,
        },
      },
    ],
   
  }
  
  function slickGoToslide(e,int) {
    slider1.current.slickGoTo(int)
    
    addActiveClass(e)
    
    let progressbar =  document.querySelectorAll('.tab-slider .slick-dots li');

    progressbar.forEach((activeLi,index) =>{
      activeLi.classList.remove("slick-data-active") } )
    
    progressbar.forEach((activeLi,index) =>{
     
      if (index <= int) {
        activeLi.classList.add('slick-data-active')
      }
     
    })
  }
  function slickGoToslide(e,int) {
    slider1.slickGoTo(int)
    
    addActiveClass(e)
    
    let progressbar =  document.querySelectorAll('.tab-slider .slick-dots li');

    progressbar.forEach((activeLi,index) =>{
      activeLi.classList.remove("slick-data-active") } )
    
    progressbar.forEach((activeLi,index) =>{
     
      if (index <= int) {
        activeLi.classList.add('slick-data-active')
      }
     
    })
  }
  useEffect(() => {
  
    let progressbarContainer =  document.querySelector('.tab-slider .slick-dots');
    progressbarContainer.innerHTML= "";
    document
    .querySelectorAll(".line-tab ")
    .forEach((Elem) =>{
      progressbarContainer.innerHTML  += '<li></li>'; })
    document.querySelector('.tab-slider .slick-dots li:first-child').classList.add('slick-data-active')
  }, [])



  function addActiveClass(e) {

    document
      .querySelectorAll(".line-tab ")
      .forEach((Elem) =>{
        Elem.classList.remove("active")})
      
    let active = e.target
    active.classList.add("active")
  }

  const data = useStaticQuery(graphql`
    query My {
      allTaxonomyTermMedicalProductLines {
        edges {
          node {
            name
            path {
              alias
            }
            relationships {
              node__medical_product {
                path {
                  alias
                }
              }
            }
          }
        }
      }
    }
  `)

  let systemName = data.allTaxonomyTermMedicalProductLines.edges.map((item, index) => {
    return (item.node.name)
  })

  let productCount = 0
  let taxonomy = data.allTaxonomyTermMedicalProductLines.edges.filter((item) => {
    return systemName.includes(item.node.name.split(" ")[0])
  })[0]

  productCount = taxonomy
    ? taxonomy.node.relationships.node__medical_product
      ? taxonomy.node.relationships.node__medical_product.length
      : 0
    : 0;


    //console.log('count', productCount, taxonomy, systemName)


  return (
    <div className={[lineStyles.wrapper, "product-line"].join(" ")}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {node.field_product_line_title ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: node.field_product_line_title.processed,
                }}
                className={lineStyles.wrapperTitle}
              ></div>
            ) : (
              ""
            )}
          </div>
         
           <div className={["col-lg-10","offset-lg-1","col-12"].join(" ")}>
          <div style={{ width: "100%" }}>
            <Slider
              asNavFor={nav2}
              ref={slider => (slider1 = slider)}
              {...TabSliderSetting}
              className="tab-slider"
            >
              {node.relationships.field_line_card
                ? node.relationships.field_line_card.map((item, index) => {
 
                  return (
                      <div>
                        <div className="col-12 p-0">
                          <div className={lineStyles.tabWrapper}>
                            {item.field_tab_title ? (
                              <div
                                onClick={(e) => slickGoToslide(e,index)}
                                className={[lineStyles.tab, "line-tab", index == 0 ?'active' : ""].join(
                                  " "
                                )}
                                >{systemName[index]}</div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                : ""}
            </Slider>
          </div>
          </div>
         
          <div className={["col-lg-10","col-12","offset-lg-1","pr-0","pl-0"].join(" ")}>
         <div className={["col-12","desk-pr-0","desk-pl-0","bigSliderContainer"].join(" ")}>
          <div  style={{ width: "100%" }}>
            <Slider
               {...SliderSetting}
              asNavFor={nav1}
              ref={slider => (slider2 = slider)}
            >
              {node.relationships.field_line_card
                ? node.relationships.field_line_card.map((item, index) => {
                    return (
                      <div className={["row",lineStyles.sliderFlex].join(" ")}>
                        <div
                          className={["col-12","col-lg-6", lineStyles.cardWrapper,"cardWrapper"].join(
                            " "
                          )}
                        >
                          {item.field_card_subtitle ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.field_card_subtitle.processed,
                              }}
                              className={["subtitle",lineStyles.subtitle].join(" ")}
                            ></div>
                          ) : (
                            ""
                          )}
                          <div className={["offset-lg-2","col-lg-8","pr-0","pl-0",lineStyles.leftSliderwapper].join(" ")}>
                          {item.field_line_title ? (
                            <div
                              className={lineStyles.cardTitle}
                            >{systemName[index]}</div>
                          ) : (
                            ""
                          )}
                          <div className={lineStyles.products}>
                            PRODUCTS (
                            <span className={lineStyles.productsNo}>
                              {productCount}
                            </span>
                            )
                          </div>
                          {item.field_line_description ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.field_line_description.processed,
                              }}
                              className={lineStyles.description}
                            ></div>
                          ) : (
                            ""
                          )}
                          <div className={lineStyles.perfect}>
                            PERFECT FOR:{" "}
                            {item.relationships.field_line_category.map(
                              (item, index, array) => {
                                return (
                                  <span className={lineStyles.category}>
                                    <Link to="#"> {item.name}</Link>
                                    {index === array.length - 1 ? "" : ", "}
                                  </span>
                                )
                              }
                            )}
                          </div>
                          {item.relationships.field_line_image.localFile ? (
                            <div className={lineStyles.imageWrapper}>
                              <Img
                                fluid={
                                  item.relationships.field_line_image.localFile
                                    .childImageSharp.fluid
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          {item.field_line_link ? (
                            <div>
                              <Link
                                to={item.field_line_link.uri}
                                className={[
                                  "button-link",
                                  lineStyles.link,
                                ].join(" ")}
                              >
                                {item.field_line_link.title}
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        </div>
                        <div
                          className={["col-lg-4", "col-12", "offset-lg-1", lineStyles.productInlineSlider,"productInlineSlider"].join(" ")}
                        >
                          <div className={[productsuggestion.slickcon,"pt-45"].join(" ")}>
                            <Slider   {...SliderSetting2}>
                              {node.relationships.field_line_card
                                ? node.relationships.field_line_card.map(
                                    (item, index) => {
                                      return (
                                        <div
                                          className={[
                                            "col-12",
                                            productsuggestion.allcon,
                                          ].join(" ")}
                                        >
                                          <ProductCard
                                            producttitle= {node.field_product_line_title
                                              .processed}
                                            productdescription={{
                                             
                                                __html: item.field_line_description.processed,
                                              }}
                                            productimage={
                                              item.relationships
                                                .field_line_image.localFile
                                                .childImageSharp.fluid
                                            }
                                            price="65"
                                            rate="0"
                                          />
                                        </div>
                                      )
                                    }
                                  )
                                : ""}
                            </Slider>
                          </div>
                        </div>
                      </div>
                    )
                  })
                : ""}
            </Slider>
          </div>
        </div>
        </div>
        </div>
        
        {/* <div className={[lineStyles.wrapper].join(" ")}>
                            <div onClick={() => slickGoToslide(0)} className="active">Nu-Derm®</div>
                            <div onClick={() => slickGoToslide(1)}>ELASTIderm®</div>
                            <div onClick={() => slickGoToslide(2)}>Hydrate®</div>
                            <div onClick={() => slickGoToslide(3)}>KeraPhine®</div>
                            <div onClick={() => slickGoToslide(4)}>Nu-Derm®</div>
                            <div onClick={() => slickGoToslide(5)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(6)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(7)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(8)}>Daily Hydro-Drops™</div>
                            <div onClick={() => slickGoToslide(9)}>Daily Hydro-Drops™</div>
                        </div>

                        <div className={lineStyles.progressBar}><div className={lineStyles.progress}></div></div> */}
      </div>
      {/* <div className="row">
                <div className="col-12">
                    <Slider ref={slider => (slider1.current = slider)} {...SliderSetting}>
                        <div className={lineStyles.blue}>Nu-Derm®</div>
                        <div className={lineStyles.green}>ELASTIderm®</div>
                        <div className={lineStyles.red}>Hydrate®</div>
                        <div className={lineStyles.black}>KeraPhine®</div>
                        <div className={lineStyles.purple}>Nu-Derm®</div>
                        <div className={lineStyles.pink}>Daily Hydro-Drops™</div>
                        <div className={lineStyles.grey}>Daily Hydro-Drops™</div>
                        <div className={lineStyles.beige}>Daily Hydro-Drops™</div>
                        <div className={lineStyles.maroon}>Daily Hydro-Drops™</div>
                        <div className={lineStyles.yellow}>Daily Hydro-Drops™</div>
                    </Slider>
                </div>
            </div> */}
    </div>
  )
}

export default ProductLine

export const fragment = graphql`
  fragment paragraphProductLine on paragraph__product_line {
    field_product_line_title {
      processed
    }
    relationships {
      field_line_card {
        field_tab_title {
          processed
        }
        field_card_subtitle {
          processed
        }
        field_line_title {
          processed
        }
        field_line_description {
          processed
        }
        field_line_link {
          title
          uri
        }
        relationships {
          field_line_image {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }

          field_line_category {
            ... on taxonomy_term__clinical_categories {
              id
              name
            }
            ... on taxonomy_term__clinical_skin_concern {
              id
              name
            }
            ... on taxonomy_term__medical_categories {
              id
              name
            }
            ... on taxonomy_term__medical_skin_concern {
              id
              name
            }
          }
        }
      }
    }
  }
`
