import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import careersHeroStyles from '../assets/scss/components/careers-hero.module.scss'

const CareersHero = ({ node }) => {
    if (typeof window !== "undefined") {
        var pathname = window.location.href;

        var geturi = pathname.split('/')
        var first_url = geturi[3];
        var sec_url = geturi[4];

    }
    return (
        <div className="careers-hero">
            <div className="container-fluid d-lg-none">
                <div className="row">
                    <div className="col-12 p-0">
                        {node.relationships.field_careers_image ? <div><Img fluid={node.relationships.field_careers_image.localFile.childImageSharp.fluid} /></div> : ''}
                    </div>

                    <div className="breadcramp-con d-block col-12">
                        <p className="breadcramp">
                            <Link to="/">Home</Link>{" "} /{first_url ?
                                <span > {first_url}</span> : ""}
                        </p>
                    </div>

                    <div className="col-12">
                        {node.field_headline ? <div dangerouslySetInnerHTML={{ __html: node.field_headline.processed }} className={careersHeroStyles.headline}></div> : ''}
                        {node.field_description ? <div dangerouslySetInnerHTML={{ __html: node.field_description.processed }} className={careersHeroStyles.description}></div> : ''}
                    </div>
                </div>
            </div>



            <div className="container-fluid d-none d-lg-block" style={{ backgroundImage: `url(${node.relationships.field_background_image.localFile.childImageSharp.original.src})` }}>
                <div className={[careersHeroStyles.bgWrapper, careersHeroStyles.heroWrapper].join(" ")}>

                    <div className={["row", careersHeroStyles.rowWrapper].join(" ")}>
                        <div className="col-lg-6 ">
                            <div className="row">
                                <div className="breadcramp-con d-block col-12">
                                    <p className="breadcramp">
                                        <Link to="/">Home</Link>{" "} /{first_url ?
                                            <span > {first_url}</span> : ""}
                                    </p>
                                </div>
                            </div>
                            <div className="row collectionherorow">

                                <div className="col-lg-11 offset-lg-1">

                                    {node.field_headline ? <div dangerouslySetInnerHTML={{ __html: node.field_headline.processed }} className={careersHeroStyles.headline}></div> : ''}
                                    {node.field_description ? <div dangerouslySetInnerHTML={{ __html: node.field_description.processed }} className={careersHeroStyles.description}></div> : ''}
                                    {node.field_button ? <div><Link to={node.field_button.uri} className={["button-link", careersHeroStyles.link].join(" ")}>{node.field_button.title}</Link></div> : ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1 p-0">
                            {node.relationships && node.relationships.field_careers_image && node.relationships.field_careers_image.localFile && node.relationships.field_careers_image.localFile.childImageSharp ? <div className={careersHeroStyles.imageWrapper}><Img fluid={node.relationships.field_careers_image.localFile.childImageSharp.fluid} className={careersHeroStyles.image} /></div> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CareersHero

export const fragment = graphql`
    fragment paragraphCareersHero on paragraph__careers_hero {
        id
        field_headline {
            processed
          }
          field_description {
            processed
          }
          field_button {
            title
            uri
          }
          relationships {
            field_background_image {
              localFile {
                childImageSharp {
                    original {
                        src
                    }
                }
              }
            }
            field_careers_image {
              localFile {
                childImageSharp {
                    fluid (quality: 100){
                        ...GatsbyImageSharpFluid
                      }
                }
              }
            }
          }
    }`