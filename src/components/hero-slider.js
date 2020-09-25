import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Slider from "react-slick"
import heroSlider from '../assets/scss/components/hero-slider.module.scss'
import Logo from '../assets/images/200x200.png'

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

    let pageType = node.field_page_type

    function fixlink(changelink) {

        
          return ( <Link className={["button-link", heroSlider.link].join(" ")} to={changelink.field_slide_button.uri.replace('internal:', '')}>
            {changelink.field_slide_button.title}
          </Link>)
    }
    return (

        <div className={pageType === 'medical' ? "hero-slider medical-slider" : 'hero-slider clinical-slider'}>
            <div className={pageType ? (pageType === 'clinical' ? heroSlider.textWrapperClinical : pageType === 'medical' ? heroSlider.textWrapperMedical : '') : ''}>


                <div className="container-fluid pl-0 pr-0">
                    <div className={["row mr-0 ml-0", heroSlider.rowWrapper].join(" ")}>
                        <div style={{ width: "100%" }}>
                            <Slider {...SliderSetting}>
                                {node.relationships.field_slide.map((item, index) => {
                                    return (
                                        <div>
                                            <div className="d-lg-none">
                                                <div className="col-12 col-lg-7 col-padding">
                                                    {item.relationships.field_slide_image.localFile? <div><Img fluid={item.relationships.field_slide_image.localFile.childImageSharp.fluid} /></div> : ''}
                                                </div>
                                                <div className={pageType ? (pageType === 'clinical' ? heroSlider.textWrapperClinical : pageType === 'medical' ? heroSlider.textWrapperMedical : '') : ''}>
                                                    <div className="col-12 col-lg-4">
                                                        {item.field_slide_type? <div dangerouslySetInnerHTML={{ __html: item.field_slide_type.processed }} className={["subtitle", heroSlider.subtitle, pageType.includes('medical')? heroSlider.medical : ''].join(" ")}></div> : ''}
                                                        {item.field_slide_title? <div dangerouslySetInnerHTML={{ __html: item.field_slide_title.processed }} className={[heroSlider.title].join(" ")}></div> : '' }
                                                        {item.field_sli? <div dangerouslySetInnerHTML={{ __html: item.field_sli.processed }} className={[heroSlider.description].join(" ")}></div> : ''}
                                                        {item.field_slide_button? <div className={heroSlider.linkSection}><Link to={item.field_slide_button.uri} className="button-link">{item.field_slide_button.title}</Link></div> : ''}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-none d-lg-block">
                                                <div className="row mr-0 ml-0">

                                                    <div className={["col-lg-5"].join(" ")}>
                                                        <div className="col-8 offset-2 col-right-padding">
                                                            {item.field_slide_type? <div dangerouslySetInnerHTML={{ __html: item.field_slide_type.processed }} className={["subtitle", heroSlider.subtitle, pageType.includes('medical')? heroSlider.medical : ''].join(" ")}></div> : '' }
                                                            {item.field_slide_title? <div dangerouslySetInnerHTML={{ __html: item.field_slide_title.processed }} className={[heroSlider.title].join(" ")}></div> : '' }
                                                            {item.field_sli? <div dangerouslySetInnerHTML={{ __html: item.field_sli.processed }} className={[heroSlider.description].join(" ")}></div> : '' }
                                                            {item.field_slide_button? <div className={heroSlider.linkSection}>{fixlink(item)}</div> : '' }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7 col-padding">
                                                        <div className={heroSlider.sliderImg}>
                                                            {item.relationships.field_slide_image.localFile? <Img fluid={item.relationships.field_slide_image.localFile.childImageSharp.fluid} /> : '' }
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    )
                                })}

                            </Slider>
                        </div>

                        <div className={["d-none d-lg-block col-lg-5", heroSlider.blueSection].join(" ")}>
                            {node.relationships.field_slider_scroll_down? (node.relationships.field_slider_scroll_down.localFile? <Link to="#" className={heroSlider.slideDown}><Img fixed={node.relationships.field_slider_scroll_down.localFile.childImageSharp.fixed} /></Link> : '') : ''}
                            {node.relationships.field_obagi_logo? (node.relationships.field_obagi_logo.localFile? <div className={heroSlider.sliderLogo}><Img fixed={node.relationships.field_obagi_logo.localFile.childImageSharp.fixed} /></div> : '') : ''}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSlider

export const fragment = graphql`
    fragment paragraphHeroSlider on paragraph__hero_slider {
            field_page_type
            id
                  relationships {
                        field_obagi_logo {
                            localFile {
                                childImageSharp {
                                    fixed {
                                        ...GatsbyImageSharpFixed
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
                            field_slide_button {
                                title
                                uri
                            }
                            relationships {
                                field_slide_image {
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
                    }

          }
      
      
`;
