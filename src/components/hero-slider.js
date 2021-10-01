import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import Slider from "react-slick"
import * as heroSlider from '../assets/scss/components/hero-slider.module.scss'
import Logo from '../assets/images/200x200.png'

const $ = require("jquery");

if (typeof window !== "undefined") {
    var pathname = window.location.href;
    var geturi = pathname.split('/')
    var first_url = geturi[3];
  }


const HeroSlider = ({ node }) => {
    function scrollToSection(e, section) {
        e.preventDefault();
        let sectionId = section.split('#')[1];

        window.scroll({ top: $(`#${sectionId}`).offset().top - $('#mob-navigation').height(), behavior: 'smooth' });

    }


    // useEffect(() => {

    //         if ($(".scrollto").length) {
    //                // Add smooth scrolling to all links
    //             $(".scrollto").on('click', function(event) {
    //                 // console.log('site on fire!')
    //             // Make sure this.hash has a value before overriding default behavior
    //             if (this.hash !== "") {
    //               // Prevent default anchor click behavior
    //               event.preventDefault();

    //               // Store hash
    //               var hash = this.hash;

    //               // Using jQuery's animate() method to add smooth page scroll
    //               // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    //               $('html, body').animate({
    //                 scrollTop: $(hash).offset().top
    //               }, 500, function(){

    //                 // Add hash (#) to URL when done scrolling (default click behavior)
    //                 window.location.hash = hash;
    //               });
    //             } // End if
    //           });
    //         }
    // })

    // useEffect(() => {

    //     let scrollSection = document.querySelector("#here");
    //     let scrollButton = document.querySelector("#slideDownButton");
    //     if (typeof window !== "undefined" ) {
    //         window.addEventListener("scroll", function () {
    //             if (window.scrollY > (scrollSection.offsetTop - 550)) {
    //                 scrollButton.classList.remove("d-none");
    //                 scrollButton.classList.add("upsideButton");


    //             } else {
    //                 scrollButton.classList.add("d-none");
    //                 scrollButton.classList.remove("upsideButton");
    //             }

    //         })
    //     }

    // }, [])
    let pageType = node.field_page_type ? node.field_page_type : null
    let basicPageType = node.relationships && node.relationships.node__page && node.relationships.node__page[0]? node.relationships.node__page[0] : null
    let heroClass = node.field_slider_class ? node.field_slider_class : null
    let blogPage = (heroClass && (heroClass == "blog-lp-hero"))? true : false;

    const SliderSetting = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        // beforeChange: (current, next) => {
        //     document.querySelector('.myslickactive').classList.remove('myslickactive');
        //     document.querySelectorAll("#product-hero-slick .imageContainer")[next].classList.add('myslickactive')
        // },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: blogPage,
                }
            },
        ]
    }

    
    function fixlink(changelink) {


        return (<Link className={["button-link", heroSlider.link].join(" ")} to={changelink.field_slide_button.uri.replace('internal:', '')}>
            {changelink.field_slide_button.title}
        </Link>)
    }

    // function scrollUp(e, id) {
    //     e.preventDefault();
    //     // document.body.scrollTop = 0; // For Safari
    //     // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //     // window.scroll({ top: 0, behavior: 'smooth' });


    //     if (typeof window != undefined) {
    //         $('html,body').animate({scrollTop: 0});
    //     }
    // }
    return (
        <div className={pageType && pageType === 'medical' ? "container-fluid pl-0 pr-0 hero-slider medical-slider " : pageType && pageType === 'clinical' ? 'container-fluid pl-0 pr-0 hero-slider clinical-slider ' : 'container-fluid pl-0 pr-0 hero-slider ' + `${heroClass ? heroClass : ""}`}>
              {/* <div className={[" breadcramp-con  col-12 pb-0",`${node.field_brea?node.field_brea:""}`].join(" ")}>
                <p className="breadcramp">
                   <Link to="/">Home</Link>{" "}
                    / <span>{first_url}</span>
                </p>
              </div> */}
            <div className={pageType ? (pageType === 'clinical' ? "row mr-0 ml-0 " + heroSlider.rowWrapper + " " + heroSlider.textWrapperClinical : pageType === 'medical' ? "row mr-0 ml-0 " + heroSlider.rowWrapper + " " + heroSlider.textWrapperMedical : '') : "row mr-0 ml-0 " + heroSlider.rowWrapper}>
                <div style={{ width: "100%" }}>
                    <Slider {...SliderSetting}>
                        {node.relationships.field_slide.map((item, index) => {
                            return (
                                <div>                               
                                    <div className="d-lg-none">
                                        <div className="col-12 col-lg-7 col-padding">
                                            {item.relationships.field_slide_image ? item.relationships.field_slide_image.localFile ? <div><img alt="img" className={heroSlider.mobImage} src={item.relationships.field_slide_image.localFile.childImageSharp.original.src} /></div> : '' : ""}
                                        </div>
                                        <div className={pageType ? (pageType === 'clinical' ? heroSlider.textWrapperClinical : pageType === 'medical' ? heroSlider.textWrapperMedical : '') : 'textWrapperSlider'}>
                                            <div className="col-12 col-lg-4">
                                                {item.field_slide_type ? <div dangerouslySetInnerHTML={{ __html: item.field_slide_type.processed }} className={["subtitle", heroSlider.subtitle, pageType && pageType.includes('medical') ? heroSlider.medical : ''].join(" ")}></div> : ''}
                                                {item.field_slide_title ? <div dangerouslySetInnerHTML={{ __html: item.field_slide_title.processed }} className={[heroSlider.title, "heroTitle"].join(" ")}></div> : ''}
                                                {item.field_sli ? <div dangerouslySetInnerHTML={{ __html: item.field_sli.processed }} className={[heroSlider.description, "heroDesc"].join(" ")}></div> : ''}
                                                {item.field_slide_title_sample ? <div dangerouslySetInnerHTML={{ __html: item.field_slide_title_sample.processed }} className={[heroSlider.description, "heroDesc"].join(" ")}></div> : ''}
                                                {item.field_slide_button ? <div className={`heroLink ${heroSlider.linkSection}`}>
                                                    {item.field_slide_button.uri.replace('internal:', '').includes('#') ? <a onClick={(e) => { scrollToSection(e, item.field_slide_button.uri.replace('internal:', '')) }} className={["button-link", `${heroClass === 'vitaminc' ? 'scrollto' : ''}`].join(" ")} href={'#entertowin'}><span dangerouslySetInnerHTML={{ __html: item.field_slide_button.title }}></span></a> :
                                                        <Link to={item.field_slide_button.uri.replace('internal:', '')} className={["button-link", `${heroClass === 'vitaminc' ? 'scrollto' : ''}`].join(" ")}><span dangerouslySetInnerHTML={{ __html: item.field_slide_button.title }}></span></Link>
                                                    }

                                                </div> : ''}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-none d-lg-block heroRowWrapper">
                                        <div className="row mr-0 ml-0 heroSlideRow">

                                            <div className={["col-lg-5 first-hero-col"].join(" ")}>
                                                <div className="col-9 offset-2 col-right-padding">
                                                    {item.field_slide_type ? <div dangerouslySetInnerHTML={{ __html: item.field_slide_type.processed }} className={["subtitle", heroSlider.subtitle, pageType && pageType.includes('medical') ? heroSlider.medical : ''].join(" ")}></div> : ''}
                                                    {item.field_slide_title ? <div dangerouslySetInnerHTML={{ __html: item.field_slide_title.processed }} className={[heroSlider.title, "heroTitle"].join(" ")}></div> : ''}
                                                    {item.field_sli ? <div dangerouslySetInnerHTML={{ __html: item.field_sli.processed }} className={[heroSlider.description, "heroDesc"].join(" ")}></div> : ''}
                                                    {item.field_slide_title_sample ? <div dangerouslySetInnerHTML={{ __html: item.field_slide_title_sample.processed }} className={[heroSlider.description, "heroDesc"].join(" ")}></div> : ''}
                                                    {item.field_slide_button ? <div className={[heroSlider.linkSection, "heroLink"].join(" ")}>

                                                        {item.field_slide_button.uri.replace('internal:', '').includes('#') ? <a onClick={(e) => { scrollToSection(e, item.field_slide_button.uri.replace('internal:', '')) }} className={["button-link", heroSlider.link, `${heroClass === 'vitaminc' ? 'scrollto' : ''}`].join(" ")} href={'#entertowin'}><span dangerouslySetInnerHTML={{ __html: item.field_slide_button.title }}></span></a> :
                                                            <Link to={item.field_slide_button.uri.replace('internal:', '')} className={["button-link", heroSlider.link, `${heroClass === 'vitaminc' ? 'scrollto' : ''}`].join(" ")}><span dangerouslySetInnerHTML={{ __html: item.field_slide_button.title }}></span></Link>
                                                        }
                                                    </div> : ''}
                                                </div>
                                            </div>
                                            <div className="col-lg-7 col-padding">
                                                <div className={[heroSlider.sliderImg, "hero-slider-img"].join(" ")}>
                                                    {item.relationships.field_slide_image ? item.relationships.field_slide_image.localFile ? <img alt="img" src={item.relationships.field_slide_image.localFile.childImageSharp.original.src} /> : '' : ""}
                                                </div>

                                            </div>

                                        </div>
                                    </div>


                                </div>
                            )
                        })}

                    </Slider>
                </div>


                <div className={["d-none d-lg-block col-lg-5 heroSliderBlue", heroSlider.blueSection].join(" ")}>
                    {/* {node.relationships.field_slider_scroll_down ? (node.relationships.field_slider_scroll_down.localFile ? <button id="slideDownButton" className="scroll-button d-none" onClick={(e) => {scrollUp(e);}}><Img alt="img"  fixed={node.relationships.field_slider_scroll_down.localFile.childImageSharp.fixed} /></button> : '') : ''} */}
                    {node.relationships.field_obagi_logo && node.relationships.field_obagi_logo.localFile ?
                        <div className={heroSlider.sliderLogo}><GatsbyImage
                            image={node.relationships.field_obagi_logo.localFile.childImageSharp.gatsbyImageData}
                            alt="img" /></div>
                        : ''}
                </div>
            <div className={[" breadcramp-con  col-12 pb-0",`${node.field_brea?node.field_brea:""}`].join(" ")}>
                <p className="breadcramp">
                   <Link to="/">Home</Link>{" "}
                   {pageType? 
                   <span>{`/ ${pageType}`}</span>
                    : basicPageType? <span>{`/ ${basicPageType.title}`}</span>
                         : ""}
                </p>
            </div>
                {/* <div id="here" className={heroSlider.here}></div> */}

            </div>
        </div>
    );
}

export default HeroSlider

export const fragment = graphql`fragment paragraphHeroSlider on paragraph__hero_slider {
  field_page_type
  id
  field_slider_class
  relationships {
    node__page {
      title
      path {
        alias
      }
    }
    field_obagi_logo {
      localFile {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
          original {
            src
          }
        }
      }
    }
    field_slider_scroll_down {
      localFile {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FIXED)
          original {
            src
          }
        }
      }
    }
    field_slide {
      field_slide_type {
        processed
      }
      field_slide_title {
        processed
      }
      field_sli {
        processed
      }
      field_slide_title_sample {
        processed
      }
      field_slide_button {
        title
        uri
      }
      relationships {
        field_slide_image {
          localFile {
            url
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              original {
                src
              }
            }
          }
        }
      }
    }
  }
}
`;
