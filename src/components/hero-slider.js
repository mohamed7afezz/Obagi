import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Slider from "react-slick"
import heroSlider from '../assets/scss/components/hero-slider.module.scss'

const HeroSlider = ({ node }) => {

    const SliderSetting = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        dots: true,
        // beforeChange: (current, next) => {
        //     document.querySelector('.myslickactive').classList.remove('myslickactive');
        //     document.querySelectorAll("#product-hero-slick .imageContainer")[next].classList.add('myslickactive')
        // },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                }
            },
        ]
    }


    return (
        <div className="hero-slider">
            <div className="container-fluid">
                <div className="row">
                    <div style={{ width: "100%" }}>
                        <Slider {...SliderSetting}>
                            <div>
                                <div className="d-lg-none">
                                    <div className="col-12 col-lg-7 col-padding">
                                        <div><Img fluid={node.relationships.field_slider_image.localFile.childImageSharp.fluid} /></div>
                                    </div>
                                    <div className={heroSlider.textWrapper}>
                                        <div className="col-12 col-lg-4">
                                            <div dangerouslySetInnerHTML={{ __html: node.field_type.processed }} className={["subtitle", heroSlider.subtitle].join(" ")}></div>
                                            <div dangerouslySetInnerHTML={{ __html: node.field_slider_title.processed }} className={[heroSlider.title].join(" ")}></div>
                                            <div dangerouslySetInnerHTML={{ __html: node.field_slider_subtitle.processed }} className={[heroSlider.description].join(" ")}></div>
                                            <div className={heroSlider.linkSection}><Link to={node.field_slider_button.uri} className="button-link">{node.field_slider_button.title}</Link></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-none d-lg-block">
                                    <div className="row">

                                            <div className={["col-lg-5", heroSlider.textWrapper].join(" ")}>
                                                <div className="col-8 offset-2 col-right-padding">
                                                    <div dangerouslySetInnerHTML={{ __html: node.field_type.processed }} className={["subtitle", heroSlider.subtitle].join(" ")}></div>
                                                    <div dangerouslySetInnerHTML={{ __html: node.field_slider_title.processed }} className={[heroSlider.title].join(" ")}></div>
                                                    <div dangerouslySetInnerHTML={{ __html: node.field_slider_subtitle.processed }} className={[heroSlider.description].join(" ")}></div>
                                                    <div className={heroSlider.linkSection}><Link to={node.field_slider_button.uri} className={["button-link", heroSlider.link].join(" ")}>{node.field_slider_button.title}</Link></div>
                                                </div>
                                                <div className={["d-none d-lg-block", heroSlider.blueSection].join(" ")}>
                                                    <Link to="#" className={heroSlider.slideDown}><Img fixed={node.relationships.field_slider_scroll_down.localFile.childImageSharp.fixed} /></Link>
                                                </div>
                                            </div>
                                        <div className="col-lg-7 col-padding">
                                            <div className={heroSlider.sliderImg}>
                                                <Img fluid={node.relationships.field_slider_image.localFile.childImageSharp.fluid} />
                                                <div className={heroSlider.sliderLogo}></div>
                                            </div>
                                            
                                        </div>

                                    </div>
                                </div>


                            </div>



                            <div>
                                <div className="row">
                                    <div className="col col-padding">
                                        <div><img src={node.relationships.field_slider_image.localFile.childImageSharp.original.src} /></div>
                                    </div>
                                    <div className="col">
                                        <div dangerouslySetInnerHTML={{ __html: node.field_type.processed }}></div>
                                        <div dangerouslySetInnerHTML={{ __html: node.field_slider_title.processed }}></div>
                                        <div dangerouslySetInnerHTML={{ __html: node.field_slider_subtitle.processed }}></div>
                                        <div><Link to={node.field_slider_button.uri}>{node.field_slider_button.title}</Link></div>
                                        <div className="d-none d-lg-block"><Link to="#"><Img fixed={node.relationships.field_slider_scroll_down.localFile.childImageSharp.fixed} /></Link></div>
                                    </div>
                                </div>
                            </div>


                        </Slider>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default HeroSlider

export const fragment = graphql`
    fragment paragraphHeroSlider on paragraph__hero_slider {
            field_type {
                processed
            }
            field_slider_title {
                processed
            }
            field_slider_subtitle {
                processed
            }
            field_slider_button {
                title
                uri
            }
            relationships {
                field_slider_image {
                    localFile {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                            original {
                                src
                            }
                        }
                    }
                }
                field_slider_scroll_down {
                    localFile {
                        childImageSharp {
                            fixed {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
            }
          
        }
      
      
`;
