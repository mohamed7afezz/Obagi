import React from "react"
import { graphql } from "gatsby"
import Collectionherostyle from "../../assets/scss/components/collection-hero.module.scss"
import Img from "gatsby-image"
const CollectionHero = ({ node, nodetype }) => {
  
  let checkTaxonomy;
  if (nodetype == "clinicalConcern") {
    checkTaxonomy = node.data.taxonomyTermClinicalSkinConcern.relationships;
  } else if (nodetype == "clinicalCategories") {
    checkTaxonomy = node.data.taxonomyTermClinicalCategories.relationships
  } else if (nodetype == "medicalConcern") {
    checkTaxonomy = node.data.taxonomyTermMedicalSkinConcern.relationships
  } else if (nodetype == "medicalCategories") {
    checkTaxonomy = node.data.taxonomyTermMedicalCategories.relationships
  }else if (nodetype == "clinicalGroups"){
    checkTaxonomy =
   node.data.taxonomyTermClinicalGroups.relationships
      .node__clinical_product 
  } else if(nodetype == 'medicalLine'){
    checkTaxonomy =
    node.data.taxonomyTermMedicalProductLines.relationships
  } else if (nodetype == 'skinClinicalType'){
    checkTaxonomy =
    node.data.taxonomyTermClinicalSkinType.relationships
       
  } else if (nodetype == 'skinMedicalType'){
   
    checkTaxonomy =
    node.data.taxonomyTermMedicalSkinType.relationships;
    console.log('hassan',checkTaxonomy)
  } else {
    // listing pages
    checkTaxonomy = node;
  }
  
  return (
    <div
      className={[
        "container-fluid",
        Collectionherostyle.collectionhero,
        "collectionhero",
        "medical-bg",
      ].join(" ")}
    >
      {nodetype == "clinicalConcern" ? (
        <div className={"row"}>
          <div
            className={[
              "col-12",
              "col-lg-3",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            {checkTaxonomy.field_hero_paraprapgh_taxonomy ? (
              <p className={Collectionherostyle.type}>
                {" "}
                {
                  checkTaxonomy.field_hero_paraprapgh_taxonomy
                    .field_taxonomy_hero_paraprapgh_t
                }
              </p>
            ) : (
              ""
            )}

            {checkTaxonomy.field_hero_paraprapgh_taxonomy ? (
              <h1 className={Collectionherostyle.collectiontitle}>
                {
                  checkTaxonomy.field_hero_paraprapgh_taxonomy
                    .field_taxonomy_hero_para_title
                }
              </h1>
            ) : (
              ""
            )}
            {checkTaxonomy.field_hero_paraprapgh_taxonomy ? (
              <p className={Collectionherostyle.collectiondescription}>
                {
                  checkTaxonomy.field_hero_paraprapgh_taxonomy
                    .field_taxonomy_hero_para_desc
                }
              </p>
            ) : (
              ""
            )}
          </div>
          {checkTaxonomy.field_hero_paraprapgh_taxonomy ? (
            <div
              className={[
                "col-lg-7",
                "offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.field_hero_paraprapgh_taxonomy
                .relationships.field_taxonomy_hero_paraprapgh_i ? (
                checkTaxonomy.field_hero_paraprapgh_taxonomy
                  .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                  <Img
                    className={Collectionherostyle.allheight}
                    fluid={
                      checkTaxonomy.field_hero_paraprapgh_taxonomy
                        .relationships.field_taxonomy_hero_paraprapgh_i
                        .localFile.childImageSharp.fluid
                    }
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : nodetype == "clinicalCategories" ? (
        <div className={"row"}>
          <div
            className={[
              "col-12",
              "col-lg-3",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            {checkTaxonomy.field_hero_categories_taxonomy ? (
              <p className={Collectionherostyle.type}>
                {" "}
                {
                  checkTaxonomy.field_hero_categories_taxonomy
                    .field_taxonomy_hero_paraprapgh_t
                }
              </p>
            ) : (
              ""
            )}

            {checkTaxonomy.field_hero_categories_taxonomy ? (
              <h1 className={Collectionherostyle.collectiontitle}>
                {
                  checkTaxonomy.field_hero_categories_taxonomy
                    .field_taxonomy_hero_para_title
                }
              </h1>
            ) : (
              ""
            )}
            {checkTaxonomy.field_hero_categories_taxonomy ? (
              <p className={Collectionherostyle.collectiondescription}>
                {
                  checkTaxonomy.field_hero_categories_taxonomy
                    .field_taxonomy_hero_para_desc
                }
              </p>
            ) : (
              ""
            )}
          </div>
          {checkTaxonomy.field_hero_categories_taxonomy ? (
            <div
              className={[
                "col-lg-7",
                "offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.field_hero_categories_taxonomy
                .relationships.field_taxonomy_hero_paraprapgh_i ? (
                checkTaxonomy.field_hero_categories_taxonomy
                  .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                  <Img
                    className={Collectionherostyle.allheight}
                    fluid={
                      checkTaxonomy.field_hero_categories_taxonomy
                        .relationships.field_taxonomy_hero_paraprapgh_i
                        .localFile.childImageSharp.fluid
                    }
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : nodetype == "medicalLine" ? (
        <div className={"row"}>
          <div
            className={[
              "col-12",
              "col-lg-3",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            {checkTaxonomy.field_hero_categories_taxonomy ? (
              <p className={Collectionherostyle.type}>
                {" "}
                {
                  checkTaxonomy.field_hero_productline_taxonomy
                    .field_taxonomy_hero_paraprapgh_t
                }
              </p>
            ) : (
              ""
            )}

            {checkTaxonomy.field_hero_productline_taxonomy ? (
              <h1 className={Collectionherostyle.collectiontitle}>
                {
                  checkTaxonomy.field_hero_productline_taxonomy
                    .field_taxonomy_hero_para_title
                }
              </h1>
            ) : (
              ""
            )}
            {checkTaxonomy.field_hero_productline_taxonomy ? (
              <p className={Collectionherostyle.collectiondescription}>
                {
                  checkTaxonomy.field_hero_productline_taxonomy
                    .field_taxonomy_hero_para_desc
                }
              </p>
            ) : (
              ""
            )}
          </div>
          {checkTaxonomy.field_hero_productline_taxonomy ? (
            <div
              className={[
                "col-lg-7",
                "offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.field_hero_productline_taxonomy
                .relationships.field_taxonomy_hero_paraprapgh_i ? (
                checkTaxonomy.field_hero_productline_taxonomy
                  .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                  <Img
                    className={Collectionherostyle.allheight}
                    fluid={
                      checkTaxonomy.field_hero_productline_taxonomy
                        .relationships.field_taxonomy_hero_paraprapgh_i
                        .localFile.childImageSharp.fluid
                    }
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) :  nodetype == 'skinClinicalType'? (
        <div className={"row"}>
          <div
            className={[
              "col-12",
              "col-lg-3",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            {checkTaxonomy.field_hero_taxonomy_skintype ? (
              <p className={[Collectionherostyle.type, Collectionherostyle.medical].join(' ')}>
                {" "}
                {
                  checkTaxonomy.field_hero_taxonomy_skintype
                    .field_taxonomy_hero_paraprapgh_t
                }
              </p>
            ) : (
              ""
            )}

            {checkTaxonomy.field_hero_taxonomy_skintype ? (
              <h1 className={Collectionherostyle.collectiontitle}>
                {
                  checkTaxonomy.field_hero_taxonomy_skintype
                    .field_taxonomy_hero_para_title
                }
              </h1>
            ) : (
              ""
            )}
            {checkTaxonomy.field_hero_taxonomy_skintype ? (
              <p className={Collectionherostyle.collectiondescription}>
                {
                  checkTaxonomy.field_hero_taxonomy_skintype
                    .field_taxonomy_hero_para_desc
                }
              </p>
            ) : (
              ""
            )}
          </div>
          {checkTaxonomy.field_hero_taxonomy_skintype ? (
            <div
              className={[
                "col-lg-7",
                "offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.field_hero_taxonomy_skintype.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                checkTaxonomy.field_hero_taxonomy_skintype.relationships
                  .field_taxonomy_hero_paraprapgh_i.localFile ? (
                  <Img
                    className={Collectionherostyle.allheight}
                    fluid={
                      checkTaxonomy.field_hero_taxonomy_skintype
                        .relationships.field_taxonomy_hero_paraprapgh_i
                        .localFile.childImageSharp.fluid
                    }
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) :  nodetype == 'skinMedicalType'? (
        <div className={"row"}>
          <div
            className={[
              "col-12",
              "col-lg-3",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            {checkTaxonomy.field_hero_parag_taxonomy ? (
              <p className={[Collectionherostyle.type, Collectionherostyle.medical].join(' ')}>
                {" "}
                {
                  checkTaxonomy.field_hero_parag_taxonomy
                    .field_taxonomy_hero_paraprapgh_t
                }
              </p>
            ) : (
              ""
            )}

            {checkTaxonomy.field_hero_parag_taxonomy ? (
              <h1 className={Collectionherostyle.collectiontitle}>
                {
                  checkTaxonomy.field_hero_parag_taxonomy
                    .field_taxonomy_hero_para_title
                }
              </h1>
            ) : (
              ""
            )}
            {checkTaxonomy.field_hero_parag_taxonomy ? (
              <p className={Collectionherostyle.collectiondescription}>
                {
                  checkTaxonomy.field_hero_parag_taxonomy
                    .field_taxonomy_hero_para_desc
                }
              </p>
            ) : (
              ""
            )}
          </div>
          {checkTaxonomy.field_hero_parag_taxonomy ? (
            <div
              className={[
                "col-lg-7",
                "offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.field_hero_parag_taxonomy.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                checkTaxonomy.field_hero_parag_taxonomy.relationships
                  .field_taxonomy_hero_paraprapgh_i.localFile ? (
                  <Img
                    className={Collectionherostyle.allheight}
                    fluid={
                      checkTaxonomy.field_hero_parag_taxonomy
                        .relationships.field_taxonomy_hero_paraprapgh_i
                        .localFile.childImageSharp.fluid
                    }
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : nodetype == "medicalConcern" ? (
        <div className={"row"}>
          <div
            className={[
              "col-12",
              "col-lg-3",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            {checkTaxonomy.field_hero_taxonomy ? (
              <p className={[Collectionherostyle.type, Collectionherostyle.medical].join(' ')}>
                {" "}
                {
                  checkTaxonomy.field_hero_taxonomy
                    .field_taxonomy_hero_paraprapgh_t
                }
              </p>
            ) : (
              ""
            )}

            {checkTaxonomy.field_hero_taxonomy ? (
              <h1 className={Collectionherostyle.collectiontitle}>
                {
                  checkTaxonomy.field_hero_taxonomy
                    .field_taxonomy_hero_para_title
                }
              </h1>
            ) : (
              ""
            )}
            {checkTaxonomy.field_hero_taxonomy ? (
              <p className={Collectionherostyle.collectiondescription}>
                {
                  checkTaxonomy.field_hero_taxonomy
                    .field_taxonomy_hero_para_desc
                }
              </p>
            ) : (
              ""
            )}
          </div>
          {checkTaxonomy.field_hero_taxonomy ? (
            <div
              className={[
                "col-lg-7",
                "offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.field_hero_taxonomy.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                checkTaxonomy.field_hero_taxonomy.relationships
                  .field_taxonomy_hero_paraprapgh_i.localFile ? (
                  <Img
                    className={Collectionherostyle.allheight}
                    fluid={
                      checkTaxonomy.field_hero_taxonomy
                        .relationships.field_taxonomy_hero_paraprapgh_i
                        .localFile.childImageSharp.fluid
                    }
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : nodetype == "medicalCategories" ? (
        <div className={"row"}>
          <div
            className={[
              "col-12",
              "col-lg-3",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            {checkTaxonomy.field_hero_category_taxonomy ? (
              <p className={[Collectionherostyle.type, nodetype.includes('medical')? Collectionherostyle.medical : ""].join(' ')}>
                {" "}
                {
                  checkTaxonomy.field_hero_category_taxonomy
                    .field_taxonomy_hero_paraprapgh_t
                }
              </p>
            ) : (
              ""
            )}

            {checkTaxonomy.field_hero_category_taxonomy ? (
              <h1 className={Collectionherostyle.collectiontitle}>
                {
                  checkTaxonomy.field_hero_category_taxonomy
                    .field_taxonomy_hero_para_title
                }
              </h1>
            ) : (
              ""
            )}
            {checkTaxonomy.field_hero_category_taxonomy ? (
              <p className={Collectionherostyle.collectiondescription}>
                {
                  checkTaxonomy.field_hero_category_taxonomy
                    .field_taxonomy_hero_para_desc
                }
              </p>
            ) : (
              ""
            )}
          </div>
          {checkTaxonomy.field_hero_category_taxonomy ? (
            <div
              className={[
                "col-lg-7",
                "offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.field_hero_category_taxonomy
                .relationships.field_taxonomy_hero_paraprapgh_i ? (
                checkTaxonomy.field_hero_category_taxonomy
                  .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                  <Img
                    className={Collectionherostyle.allheight}
                    fluid={
                      checkTaxonomy.field_hero_category_taxonomy
                        .relationships.field_taxonomy_hero_paraprapgh_i
                        .localFile.childImageSharp.fluid
                    }
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={"row"}>
          <div
            className={[
              "col-12",
              "col-lg-3",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            {checkTaxonomy.field_taxonomy_hero_paraprapgh_t ? (
              <p className={[Collectionherostyle.type, checkTaxonomy.field_taxonomy_hero_paraprapgh_t.includes('medical')? Collectionherostyle.medical : ""].join(' ')}>
                {" "}
                {
                  checkTaxonomy.field_taxonomy_hero_paraprapgh_t
                }
              </p>
            ) : (
              ""
            )}

            {checkTaxonomy.field_taxonomy_hero_para_title ? (
              <h1 className={Collectionherostyle.collectiontitle}>
                {
                  checkTaxonomy.field_taxonomy_hero_para_title
                }
              </h1>
            ) : (
              ""
            )}
            {checkTaxonomy.field_taxonomy_hero_para_desc ? (
              <p className={Collectionherostyle.collectiondescription}>
                {
                  checkTaxonomy.field_taxonomy_hero_para_desc
                }
              </p>
            ) : (
              ""
            )}
          </div>
          {checkTaxonomy.relationships ? (
            <div
              className={[
                "col-lg-7",
                "offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.relationships.field_taxonomy_hero_paraprapgh_i ? (
                checkTaxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                  <Img
                    className={Collectionherostyle.allheight}
                    fluid={
                      checkTaxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.childImageSharp.fluid
                    }
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  )
}

export default CollectionHero
export const fragment = graphql`
  fragment collectionhero on taxonomy_term__clinical_skin_concern {
    id
    relationships {
      field_hero_paraprapgh_taxonomy {
        field_taxonomy_hero_para_title
        field_taxonomy_hero_para_desc
        field_taxonomy_hero_paraprapgh_t
        relationships {
          field_taxonomy_hero_paraprapgh_i {
            localFile {
              childImageSharp {
                fluid (quality: 100) {
                  ...GatsbyImageSharpFluid
                }
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

  fragment vocabularySkinConcerHero on paragraph__taxonomy_hero_paraprapgh {
    id
    field_taxonomy_hero_para_desc
    field_taxonomy_hero_para_title
    field_taxonomy_hero_paraprapgh_t
    relationships {
      field_taxonomy_hero_paraprapgh_i {
        localFile {
          childImageSharp {
            original {
              src
            }
            fluid (quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;