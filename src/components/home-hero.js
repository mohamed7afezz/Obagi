import React, { useEffect } from 'react';
import { graphql, Link } from 'gatsby';

import { getParagraph } from './paragraphs-helper';
import homeHero from '../assets/scss/components/home-hero.module.scss'
import HeroBox from './hero-box'
import Slider from "react-slick"
import Img from 'gatsby-image'
const $ = require("jquery");

const HomeHero = ({ node }) => {

  // useEffect(() => {


  //   if (typeof window !== "undefined" && ($(window).width() < 768)) {
  //     window.addEventListener("scroll", function () {
  //       if(!document.getElementById('hero')) {
  //         return;
  //       }
  //       var scrollAmount = window.scrollY;
  //       var isNotiBox = (document.querySelector("#notificationMob").display == "none");
  //       var medicalSelector = document.querySelector("#box0");
  //       var clincialSelector = document.querySelector("#box1");
  //       var menuheight = document.querySelector("#mob-navigation").offsetHeight;
  //       var notibox = document.querySelector("#notificationMob").offsetHeight;


  //       if (inView(clincialSelector, scrollAmount, isNotiBox ? window.innerHeight - (menuheight + notibox) : window.innerHeight - (menuheight))) {
  //         document.querySelector("#hero #hero-bg img").src = `${node.relationships.field_box[1].relationships.field_background.localFile.childImageSharp.original.src}`;
  //         document.querySelector("#hero #box0").classList.remove('active');
  //         document.querySelector("#hero #box1").classList.add('active');
  //       } else if (inView(medicalSelector, scrollAmount, isNotiBox ? window.innerHeight - (menuheight + notibox) : window.innerHeight - (menuheight))) {
  //         document.querySelector("#hero #hero-bg img").src = `${node.relationships.field_box[0].relationships.field_background.localFile.childImageSharp.original.src}`;
  //         document.querySelector("#hero #box0").classList.add('active');
  //         document.querySelector("#hero #box1").classList.remove('active');
  //       } else {
  //         document.querySelector("#hero #hero-bg img").src = `${node.relationships.field_default_bg.localFile.childImageSharp.original.src}`;
  //         document.querySelector("#hero #box0").classList.remove('active');
  //         document.querySelector("#hero #box1").classList.remove('active');
  //       }
  //     })


  //     function inView(elSelector, scrolled, offset) {
  //       var viewed = window.innerHeight + scrolled;
  //       if (offset) {
  //         var bottomOffset = elSelector.offsetParent.offsetTop + offset;
  //       } else {
  //         var bottomOffset = elSelector.offsetParent.offsetTop;
  //       }
  //       if (bottomOffset < viewed) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   }


  // }, [])

  function changeBackground(bg) {
    document.getElementById("hero").style.backgroundImage = `url(${bg})`;
  }

  const SliderSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    accessibility: false,
    // beforeChange: (current, next) => {
    //     document.querySelector('.myslickactive').classList.remove('myslickactive');
    //     document.querySelectorAll("#product-hero-slick .imageContainer")[next].classList.add('myslickactive')
    // },
  }



  return (
    <div>
      <div style={{ backgroundImage: `url(${node.relationships.field_default_bg.localFile.childImageSharp.fluid.srcWebp})` }} className={[homeHero.heroStyle, "d-none d-md-block"].join(" ")} id="hero">
        <div className={[homeHero.containerWrapper, "container-fluid"].join(" ")}>
          <div id="hero-bg">
            <img src={node.relationships.field_default_bg.localFile.childImageSharp.fluid.srcWebp} alt="img" />
          </div>
          <div className={["row"].join(" ")}>
            <div className={["col-12 col-lg-4 offset-lg-4"].join(" ")}>
              {node.field_main_header ? <h1 className={[homeHero.header].join(" ")}>{node.field_main_header}</h1> : ""}
              {/* {node.relationships.field_box.map(({ drupal_id }) => (<HeroBox id='asda'/>))} */}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              {node.field_main_subtitle ? <div dangerouslySetInnerHTML={{ __html: node.field_main_subtitle.processed }} className={[homeHero.subtitle].join(" ")}></div> : ""}

            </div>
          </div>
          <div className="row">
            {node.relationships.field_box.map((box, i) => {
              return (
                <div className={i < 1 ? ["col-12", "col-md-6", "col-lg-5", "offset-lg-1", homeHero.boxMargin].join(" ") : "col-12 col-md-6 col-lg-5"} key={box.id} onMouseEnter={() => { changeBackground(box.relationships.field_background.localFile.childImageSharp.fluid.srcWebp); }} onMouseLeave={() => { changeBackground(node.relationships.field_default_bg.localFile.childImageSharp.fluid.srcWebp); }}>
                  <HeroBox node={box} id={"box" + i} desktopTag={true}/>
                </div>
              )
            })}
            {/* <div className="d-none d-lg-block"><Link to="#colored-boxes" className={homeHero.scrollButton}><Img alt="img"  fluid={node.relationships.field_scroll_down.localFile.childImageSharp.fluid} /></Link></div> */}
          </div>
        </div>
      </div>



      <div className={["d-md-none home-hero-mob"].join(" ")}>
        <div className={[homeHero.containerWrapper, "container-fluid"].join(" ")}>
          <div style={{ width: "100%" }}>
            <Slider {...SliderSetting}>
              <>
                <div className={["row", homeHero.heroStyle].join(" ")} style={{ backgroundImage: `url(${node.relationships.field_default_bg.localFile.childImageSharp.fluid.srcWebp})` }}>
                  <div className={["col-12 col-lg-4 offset-lg-4"].join(" ")}>
                    {node.field_main_header ? <p className={[homeHero.header].join(" ")}>{node.field_main_header}</p> : ""}
                    {/* {node.relationships.field_box.map(({ drupal_id }) => (<HeroBox id='asda'/>))} */}
                  </div>

                  <div className="col-12 col-lg-8 offset-lg-2">
                    {node.field_main_subtitle ? <div dangerouslySetInnerHTML={{ __html: node.field_main_subtitle.processed }} className={[homeHero.subtitle].join(" ")}></div> : ""}

                  </div>
                </div>
              </>

              {node.relationships.field_box.map((box, i) => {
                return (
                  <div>
                    <div className={[homeHero.heroStyle, "row"].join(" ")} style={{ backgroundImage: `url(${box.relationships.field_background.localFile.childImageSharp.fluid.srcWebp})` }}>
                      <div className={i < 1 ? ["col-12", "col-md-6", "col-lg-5", "offset-lg-1", homeHero.boxMargin].join(" ") : "col-12 col-md-6 col-lg-5"} key={box.id} >
                        <HeroBox node={box} />
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* <div className="d-none d-lg-block"><Link to="#colored-boxes" className={homeHero.scrollButton}><Img alt="img"  fluid={node.relationships.field_scroll_down.localFile.childImageSharp.fluid} /></Link></div> */}



            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}




export default HomeHero;

export const fragment = graphql`
    fragment paragraphHomeHero on paragraph__home_hero {
        id
        field_main_header
        field_main_subtitle {
          processed
        }
        
      
        relationships {
          field_box {
            type: __typename
            ...paragraphHeroBox
          }
          field_default_bg {
            localFile {
              childImageSharp {
                fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                }
                original {
                    src
                }
                fluid (quality: 100){
                  srcWebp
                }
              }
            }
          }
          field_scroll_down {
            localFile {
              childImageSharp {
                fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
    }
`;