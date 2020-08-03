import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import servicesStyles from '../assets/scss/components/services.module.scss'

const Services = ({ node }) => {
    console.log("service", node)
    return (
        <div>
            <div className={servicesStyles.wrapper}>
                <div className="container-fluid">
                    <div className="row">
                        {node.relationships.field_service_card.map((item, index) => {
                            return (
                                <div className={index == 0 || index % 2 == 0? "col-12 col-md-6 col-lg-5 offset-lg-1" : "col-12 col-md-6 col-lg-5"}>
                                    <div className={servicesStyles.cardWrapper}>
                                        {item.field_service_name ? <div dangerouslySetInnerHTML={{ __html: item.field_service_name.processed }} className={["subtitle", servicesStyles.subtitle].join(" ")}></div> : ''}
                                        {item.relationships.field_service_image ? <div className={index == 2 || index == 3 ? servicesStyles.image + ' ' + servicesStyles.specialImage : servicesStyles.image}><Img fluid={item.relationships.field_service_image.localFile.childImageSharp.fluid} /></div> : ''}
                                        {item.field_service_title ? <div dangerouslySetInnerHTML={{ __html: item.field_service_title.processed }} className={servicesStyles.title}></div> : ''}
                                        {item.field_service_description ? <div dangerouslySetInnerHTML={{ __html: item.field_service_description.processed }} className={servicesStyles.description}></div> : ''}
                                        {item.field_se ? <div><Link to={item.field_se.uri} className={["button-link", servicesStyles.link].join(" ")}>{item.field_se.title}</Link></div> : ''}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services

export const fragment = graphql`
    fragment paragraphServicesParagraph on paragraph__services_paragraph {
        id
        relationships {
          field_service_card {
            field_service_name {
              processed
            }
            field_service_title {
              processed
            }
            field_service_description {
              processed
            }
            relationships {
              field_service_image {
                localFile {
                  childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            field_se {
              title
              uri
            }
          }
        }
    }`