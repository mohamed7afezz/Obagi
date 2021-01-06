import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import basichero from '../assets/scss/components/basic-hero.module.scss'
const Basichero = ({ node }) => {
  if (typeof window !== "undefined") {
    var pathname = window.location.href;

    var geturi = pathname.split('/')
    var first_url = geturi[3];
    var sec_url = geturi[4];

  }
  console.log("hassan",node)
  return (
    <div className={basichero.sectionBg}>
      <div className={["container-fluid ", "basicbg", basichero.givepadding, `${node.field_basic_hero_custom_class_ ? node.field_basic_hero_custom_class_ : ""}`].join(" ")}>
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-6",
              basichero.Collectionheroleftcol,
              "Collectionheroleftcol"

            ].join(" ")}
          >
            <div className="row">
              <div className={[" breadcramp-con  d-block col-12",`${node.field_brea?node.field_brea:""}`].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link>{" "}  {first_url && sec_url ?
                    <>
                   /   <Link to={`${'/' + first_url}`}> {first_url}</Link>
                      {node.field_bread_crumb?<span>{" / " + node.field_bread_crumb[0].title}</span>:<span>{" / " + sec_url}</span>}
                    </>
                     : node.field_bread_crumb?
                     <span>{" / " + node.field_bread_crumb[0].title}</span>:<span>{" / " + sec_url}</span>}
                </p>
              </div>
            </div>
            <div className="row remove-mob-padding collectionherorow">
              <div className="col col-lg-11 offset-lg-1 p-0 general-basic-column">
                {
                  node.relationships.field_basic_hero_left_img_paragr ?
                    <img
                    alt="img"
                      className={[basichero.heroLeft, "col-lg-10"].join(" ")}
                      src={
                        node.relationships.field_basic_hero_left_img_paragr

                          .localFile.childImageSharp.original.src
                      }
                    />
                    : ""

                }

                {
                  <h1 className={[basichero.collectiontitle, "general-basic-title"].join(" ")}>
                    {
                      node.field_basic_hero_title_paragrapg ?
                        <div dangerouslySetInnerHTML={{
                          __html: node.field_basic_hero_title_paragrapg
                            .processed
                        }}></div> : ""
                    }
                  </h1>
                }
                {
                  node.field_basic_hero_desc_paragrapgh ?
                    <div className={basichero.collectiondescription}
                      dangerouslySetInnerHTML={{
                        __html: node.field_basic_hero_desc_paragrapgh.processed
                      }}
                    >

                    </div>
                    : ""

                }
              </div>

            </div>
          </div>

          <div
            style={{
              background: `url(${node.relationships.field_basic_img_hero_paragrapgh ? node.relationships.field_basic_img_hero_paragrapgh

                .localFile.childImageSharp.original.src : ""})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
            }}
            className={[
              "col-lg-5",
              "offset-lg-1",
              "col-12",
              basichero.Collectionherorightcol,
              "Collectionherorightcol",
              "basic-bg-img"
            ].join(" ")}
          >


          </div>


        </div>
      </div>
    </div>
  )
}

export default Basichero

export const fragment = graphql`
fragment paragrapghBasicHero on paragraph__basic_hero_paragrapgh {
    id
    field_basic_hero_custom_class_
    field_basic_hero_title_paragrapg {
      processed
    }
    field_bread_crumb {
      title
    }
    field_brea
    field_basic_hero_desc_paragrapgh {
      processed
    }
    relationships {
      field_basic_hero_left_img_paragr {
        localFile {
          childImageSharp {
            fluid {
              src
            }
            original{
                src
            }
          }
        }
      }
      field_basic_img_hero_paragrapgh {
        localFile {
          childImageSharp {
            fluid {
              src
            }
            original{
                src
            }
          }
        }
      }
    }
  }`