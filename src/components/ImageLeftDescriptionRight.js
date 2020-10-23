import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import primerstyle from '../assets/scss/components/preimer-img-left.module.scss'

const ImageLeftDescRight = ({ node }) => {
  
  return (
      <div className={primerstyle.sectionBg}>
    <div className={["container-fluid ",primerstyle.givepadding].join(" ")}>
      <div className={["row",primerstyle.mobDcol].join(" ")}>
          <div className="col-lg-5 col-12 offset-lg-1 desk-auto">
          <div dangerouslySetInnerHTML={{ __html: node.field_premier_title.processed }} className={[primerstyle.title,"show-mob"].join(' ')}></div>

            <Img className={primerstyle.leftimg} fluid={node.relationships.field_images_left.localFile.childImageSharp.fluid}/>
          </div>
          <div className="col-lg-4 colg-12 offset-lg-1">
          {node.relationships.field_premier_cards_section.map(item=>{
         return        <div className={[primerstyle.primerimg,"show-mob d-mob-flex"].join(" ")}>
                {item.relationships.field_premier_cards_images.map(imgs =>(
                        <img src ={imgs.localFile.childImageSharp.original.src} alt="img"/>

                    ))}
                </div>
             
               })
                }
          <div dangerouslySetInnerHTML={{ __html: node.field_premier_title.processed }} className={primerstyle.title}></div>
           <ul className={primerstyle.primerul}>
             {node.relationships.field_premier_cards_section.map(item=>{
         return      <li className={primerstyle.primerli}>
                <div dangerouslySetInnerHTML={{ __html: item.field_premier_card_title.processed }} className={primerstyle.primercradtitle}></div>
                <div dangerouslySetInnerHTML={{ __html: item.field_premier_cards_desc.processed }} className={primerstyle.primercradDesc}></div>
                <div className={primerstyle.primerimg}>
                {item.relationships.field_premier_cards_images.map(imgs =>(
                        <img src ={imgs.localFile.childImageSharp.original.src} alt="img"/>

                    ))}
                </div>
               </li>
               })
                }
          </ul>
          </div>
      </div>
    </div>
    </div>
  )
}

export default ImageLeftDescRight

export const fragment = graphql`
  fragment paragraphImageLeftDescriptionRight on paragraph__image_left_description_right_ {
    id
    field_premier_title {
      processed
    }
    relationships {
      field_premier_cards_section {
        field_premier_card_title {
          processed
        }
        field_premier_cards_desc {
          processed
        }
        relationships {
          field_premier_cards_images {
            localFile {
              childImageSharp {
                fluid (quality: 100){
                    ...GatsbyImageSharpFluid
                }
                original{
                    src
                }
              }
            }
          }
        }
      }
      field_images_left {
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
  `
