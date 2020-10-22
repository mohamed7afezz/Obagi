import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import servicesStyles from '../assets/scss/components/services.module.scss'

const Services = ({ node }) => {
    return (
        <div>
            <div className={[servicesStyles.wrapper, "services-wrapper"].join(" ")}>
                <div className="container-fluid">
                    <div className="row">
                        {node.relationships.field_service_card.map((item, index) => {
                            return (
                                <div className={index == 0 || index % 2 == 0? "col-12 col-md-6 col-lg-5 offset-lg-1 " +  servicesStyles.columnWrapper: "col-12 col-md-6 col-lg-5 " +  servicesStyles.columnWrapper}>
                                    <div className={servicesStyles.cardWrapper}>
                                        {item.field_service_name ? <div dangerouslySetInnerHTML={{ __html: item.field_service_name.processed }} className={item.field_card_type === "clinical"? servicesStyles.clinicalSub + " subtitle services-subtitle " + servicesStyles.subtitle : servicesStyles.medicalSub + " subtitle services-subtitle " + servicesStyles.subtitle}></div> : ''}
                                        {item.relationships.field_service_image?item.relationships.field_service_image.localFile ? <div className={index == 2 || index == 3 ? servicesStyles.image + ' services-image ' + servicesStyles.specialImage : servicesStyles.image + " services-image"}><Img fluid={item.relationships.field_service_image?item.relationships.field_service_image.localFile?item.relationships.field_service_image.localFile.childImageSharp.fluid:"":""} /></div> : '':""}
                                        {item.field_service_title ? <div dangerouslySetInnerHTML={{ __html: item.field_service_title.processed }} className={servicesStyles.title}></div> : ''}
                                        {item.field_service_description ? <div dangerouslySetInnerHTML={{ __html: item.field_service_description.processed }} className={servicesStyles.description}></div> : ''}
                                        {item.field_se ? <div className={servicesStyles.butttonWrapper}><Link to={item.field_se.uri.replace('internal:', '')} className={["button-link", servicesStyles.link].join(" ")}><div dangerouslySetInnerHTML={{__html: item.field_se.title}}></div></Link></div> : ''}
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
            field_card_type
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
                    fluid (quality: 100) {
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