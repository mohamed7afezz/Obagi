import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Slider from "react-slick"

const HeroSlider = ({ node }) => {

    const SliderSetting = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        dots : true,
        beforeChange: (current, next) => {
          document.querySelector('.myslickactive').classList.remove('myslickactive'); 
          document.querySelectorAll("#product-hero-slick .imageContainer")[next].classList.add('myslickactive')
        },
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
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div><Img fluid={node.relationships.field_slider_image.localFile.childImageSharp.fluid}/></div>
                    </div>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: node.field_type.processed}}></div>
            <div dangerouslySetInnerHTML={{__html: node.field_slider_title.processed}}></div>
            <div dangerouslySetInnerHTML={{__html: node.field_slider_subtitle.processed}}></div>
            <div><Link to={node.field_slider_button.uri}>{node.field_slider_button.title}</Link></div>

            <div><Link to="#"><Img fixed={node.relationships.field_slider_scroll_down.localFile.childImageSharp.fixed}/></Link></div>
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
