import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
import Collectionherostyle from "../../assets/scss/components/collection-hero.module.scss"
import Img from "gatsby-image"
const CollectionHero = ({ node, nodetype, collectionName, collectionUrl, checktaxonomyType }) => {
  let checkTaxonomy;
  let getname;
  if (nodetype == "clinicalConcern") {
    getname = node.data.taxonomyTermClinicalSkinConcern.name;
    checkTaxonomy = node.data.taxonomyTermClinicalSkinConcern.relationships;
  } else if (nodetype == "clinicalCategories") {
    getname = node.data.taxonomyTermClinicalCategories.name;
    checkTaxonomy = node.data.taxonomyTermClinicalCategories.relationships
  } else if (nodetype == "medicalConcern") {
    getname = node.data.taxonomyTermMedicalSkinConcern.name;
    checkTaxonomy = node.data.taxonomyTermMedicalSkinConcern.relationships
  } else if (nodetype == "medicalCategories") {
    getname = node.data.taxonomyTermMedicalCategories.name;
    checkTaxonomy = node.data.taxonomyTermMedicalCategories.relationships
  } else if (nodetype == "clinicalGroups") {
    getname = node.data.taxonomyTermClinicalGroups.name;
    checkTaxonomy =
      node.data.taxonomyTermClinicalGroups.relationships

  } else if (nodetype == 'medicalLine') {
    getname = node.data.taxonomyTermMedicalProductLines.name;
    checkTaxonomy =
      node.data.taxonomyTermMedicalProductLines.relationships
  } else if (nodetype == 'skinClinicalType') {
    getname = node.data.taxonomyTermClinicalSkinType.name;
    checkTaxonomy =
      node.data.taxonomyTermClinicalSkinType.relationships

  } else if (nodetype == 'skinMedicalType') {
    getname = node.data.taxonomyTermMedicalSkinType.name;
    checkTaxonomy =
      node.data.taxonomyTermMedicalSkinType.relationships;
  } else if (nodetype == 'MedicalIngredients') {
    getname = node.data.taxonomyTermMedicalIngredients.name;
    checkTaxonomy =
      node.data.taxonomyTermMedicalIngredients.relationships

  } else if (nodetype == "ClinicalIngredients") {
    getname = node.data.taxonomyTermClinicalIngredients.name;
    checkTaxonomy =
      node.data.taxonomyTermClinicalIngredients.relationships

  } else {
    // listing pages
    checkTaxonomy = node;
  }

  if (typeof window !== "undefined") {
    var pathname = window.location.href;

    var geturi = pathname.split('/')
    var first_url = geturi[3];
    var sec_url = geturi[4];

  }
  useEffect(() => {

    saveuri()
  }, [])
  function saveuri() {
    if (first_url != "medical") {
      if (first_url != "clinical") {

        if (document.querySelector('.collectionhero')) {

          document.querySelector('.collectionhero').classList.remove('clinicalcollectionhero')
          document.querySelector('.collectionhero').classList.remove('medicalcollectionhero')
          document.querySelector('.collectionhero').classList.remove('medical-bg')
        }
      } else {
        if (document.querySelector('.collectionhero')) {
          document.querySelector('.collectionhero').classList.remove('medicalcollectionhero')
          document.querySelector('.collectionhero').classList.remove('generalcollectionhero')
          document.querySelector('.collectionhero').classList.remove('medical-bg')
          document.querySelector('.breadcramp-con').classList.remove('hide')
        }
      }
    } else {
      if (document.querySelector('.collectionhero')) {
        document.querySelector('.collectionhero').classList.remove('generalcollectionhero')
        document.querySelector('.collectionhero').classList.remove('clinicalcollectionhero')
        document.querySelector('.breadcramp-con').classList.remove('hide')
      }
    }
  }
  return (
    <div
      className={checktaxonomyType === "clinical" || nodetype === "clinical" || first_url === "clinical" ?
        "container-fluid collectionhero " + Collectionherostyle.clinicalcollectionhero
        : (first_url === "medical" || nodetype === "medical" || checktaxonomyType === "medical") ? "container-fluid collectionhero medical-bg " + Collectionherostyle.medicalcollectionhero + " " + Collectionherostyle.medicalBg
          : "container-fluid collectionhero  generalcollectionhero clinicalcollectionhero medical-bg"}

    >

      {nodetype == "clinicalConcern" ? (

        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-5",
              "offset-lg-1",
              "ClinicalIngredientsclass",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
              {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_taxonomy_page_url ? <Link to={checkTaxonomy.field_hero_paraprapgh_taxonomy.field_taxonomy_page_url}>{checkTaxonomy.field_hero_paraprapgh_taxonomy.field_taxonomy_page_title ? checkTaxonomy.field_hero_paraprapgh_taxonomy.field_taxonomy_page_title : getname}</Link> : ""}
                </p>
              </div>}
              <div className="offset-lg-1">
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
                      <div dangerouslySetInnerHTML={{
                        __html: checkTaxonomy.field_hero_paraprapgh_taxonomy
                          .field_taxonomy_hero_para_title
                      }}></div>
                    }
                  </h1>
                ) : (
                    ""
                  )}
                {checkTaxonomy.field_hero_paraprapgh_taxonomy ? (
                  <div className={Collectionherostyle.collectiondescription}
                    dangerouslySetInnerHTML={{
                      __html: checkTaxonomy.field_hero_paraprapgh_taxonomy
                        .field_taxonomy_hero_para_descrip ?
                        checkTaxonomy.field_hero_paraprapgh_taxonomy
                          .field_taxonomy_hero_para_descrip.processed : ""
                    }}
                  >

                  </div>
                ) : (
                    ""
                  )}
              </div>

            </div>

          </div>
          {checkTaxonomy.field_hero_paraprapgh_taxonomy ? (
            <div
              style={{
                background: `url(${checkTaxonomy.field_hero_paraprapgh_taxonomy
                  .relationships.field_taxonomy_hero_paraprapgh_i ? (
                    checkTaxonomy.field_hero_paraprapgh_taxonomy
                      .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (

                        checkTaxonomy.field_hero_paraprapgh_taxonomy
                          .relationships.field_taxonomy_hero_paraprapgh_i
                          .localFile.childImageSharp.original.src

                      ) : (
                        ""
                      )
                  ) : (
                    ""
                  )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
              }}

              className={[
                "col-lg-5 offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol collectionheroimage",
              ].join(" ")}
            >
            </div>
          ) : (
              ""
            )}
        </div>
      ) : nodetype == "clinicalCategories" ? (
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-5",
              "offset-lg-1",
              "ClinicalIngredientsclass",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
              {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_hero_categories_taxonomy.field_taxonomy_page_url ? <Link to={checkTaxonomy.field_hero_categories_taxonomy.field_taxonomy_page_url}>{checkTaxonomy.field_hero_categories_taxonomy.field_taxonomy_page_title ? checkTaxonomy.field_hero_categories_taxonomy.field_taxonomy_page_title : getname}</Link> : ""}
                </p>
              </div>}
              <div className=" offset-lg-1">
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
                      <div dangerouslySetInnerHTML={{
                        __html: checkTaxonomy.field_hero_categories_taxonomy
                          .field_taxonomy_hero_para_title
                      }}></div>
                    }
                  </h1>
                ) : (
                    ""
                  )}
                {checkTaxonomy.field_hero_categories_taxonomy ? (
                  <div className={Collectionherostyle.collectiondescription}

                    dangerouslySetInnerHTML={{
                      __html: checkTaxonomy.field_hero_categories_taxonomy
                        .field_taxonomy_hero_para_descrip ?
                        checkTaxonomy.field_hero_categories_taxonomy
                          .field_taxonomy_hero_para_descrip.processed : ""
                    }}
                  >

                  </div>
                ) : (
                    ""
                  )}
              </div>

            </div>

          </div>
          {checkTaxonomy.field_hero_categories_taxonomy ? (
            <div
              style={{
                background: `url(${checkTaxonomy.field_hero_categories_taxonomy
                  .relationships.field_taxonomy_hero_paraprapgh_i ? (
                    checkTaxonomy.field_hero_categories_taxonomy
                      .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (


                        checkTaxonomy.field_hero_categories_taxonomy
                          .relationships.field_taxonomy_hero_paraprapgh_i
                          .localFile.childImageSharp.original.src


                      ) : (
                        ""
                      )
                  ) : (
                    ""
                  )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
              }}
              className={[
                "col-lg-5 offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol collectionheroimage",
              ].join(" ")}
            >

            </div>
          ) : (
              ""
            )}
        </div>
      ) : nodetype == "medicalLine" ? (
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-5",
              "offset-lg-1",
              "ClinicalIngredientsclass",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
              {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_taxonomy_page_url ?
                    <Link to={checkTaxonomy.field_taxonomy_page_url}>{checkTaxonomy.field_taxonomy_page_title ?
                      checkTaxonomy.field_taxonomy_page_title : getname}</Link> :
                    checkTaxonomy.field_hero_productline_taxonomy.field_taxonomy_page_url ?
                      <Link dangerouslySetInnerHTML={{
                        __html: checkTaxonomy.field_hero_productline_taxonomy.field_taxonomy_page_title ?
                          checkTaxonomy.field_hero_productline_taxonomy.field_taxonomy_page_title : getname
                      }} to={checkTaxonomy.field_hero_productline_taxonomy.field_taxonomy_page_url}>
                      </Link>
                      : ""
                  }
                </p>
              </div>}

            </div>
            <div className="row collectionherorow">
              <div className="col-12">
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
                      <div dangerouslySetInnerHTML={{
                        __html: checkTaxonomy.field_hero_productline_taxonomy
                          .field_taxonomy_hero_para_title
                      }}></div>
                    }
                  </h1>
                ) : (
                    ""
                  )}
                {checkTaxonomy.field_hero_productline_taxonomy ? (
                  <div className={Collectionherostyle.collectiondescription}
                    dangerouslySetInnerHTML={{
                      __html: checkTaxonomy.field_hero_productline_taxonomy
                        .field_taxonomy_hero_para_descrip ?
                        checkTaxonomy.field_hero_productline_taxonomy
                          .field_taxonomy_hero_para_descrip.processed : ""
                    }}
                  >

                  </div>
                ) : (
                    ""
                  )}
              </div>
            </div>

          </div>
          {checkTaxonomy.field_hero_productline_taxonomy ? (
            <div
              style={{
                background: `url(${checkTaxonomy.field_hero_productline_taxonomy
                  .relationships.field_taxonomy_hero_paraprapgh_i ? (
                    checkTaxonomy.field_hero_productline_taxonomy
                      .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (

                        checkTaxonomy.field_hero_productline_taxonomy
                          .relationships.field_taxonomy_hero_paraprapgh_i
                          .localFile.childImageSharp.original.src

                      ) : (
                        ""
                      )
                  ) : (
                    ""
                  )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
              }}
              className={[
                "col-lg-5 offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol collectionheroimage",
              ].join(" ")}
            >


            </div>

          ) : (
              ""
            )}
        </div>
      ) : nodetype == 'ClinicalIngredients' ? (
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "ClinicalIngredientsclass",
              "col-lg-5",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
              {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>
                <p className="breadcramp ">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_hero_ingredients_taxonomy.field_taxonomy_page_url ?
                    <Link to={checkTaxonomy.field_hero_ingredients_taxonomy.field_taxonomy_page_url}>{checkTaxonomy.field_hero_ingredients_taxonomy.field_taxonomy_page_title ?
                      checkTaxonomy.field_hero_ingredients_taxonomy.field_taxonomy_page_title : getname}</Link> : ""}
                </p>
              </div>}
              </div>
              <div className="row collectionherorow">
              <div className="col-12    ">
                {checkTaxonomy.field_hero_ingredients_taxonomy ? (
                  <p className={[Collectionherostyle.type, Collectionherostyle.medical].join(' ')}>

                    {
                      checkTaxonomy.field_hero_ingredients_taxonomy
                        .field_taxonomy_hero_paraprapgh_t
                    }
                  </p>
                ) : (
                    ""
                  )}

                {checkTaxonomy.field_hero_ingredients_taxonomy ? (
                  <h1 className={Collectionherostyle.collectiontitle}>
                    {
                      <div dangerouslySetInnerHTML={{
                        __html: checkTaxonomy.field_hero_ingredients_taxonomy
                          .field_taxonomy_hero_para_title
                      }}></div>
                    }
                  </h1>
                ) : (
                    ""
                  )}
                {checkTaxonomy.field_hero_ingredients_taxonomy ? (
                  <div className={Collectionherostyle.collectiondescription}
                    dangerouslySetInnerHTML={{
                      __html: checkTaxonomy.field_hero_ingredients_taxonomy
                        .field_taxonomy_hero_para_descrip ?
                        checkTaxonomy.field_hero_ingredients_taxonomy
                          .field_taxonomy_hero_para_descrip.processed : ""
                    }}
                  >

                  </div>
                ) : (
                    ""
                  )}
              </div>

            </div>
          </div>
          {checkTaxonomy.field_hero_ingredients_taxonomy ? (
            <div
              style={{
                background: `url(${checkTaxonomy.field_hero_ingredients_taxonomy.relationships
                  .field_taxonomy_hero_paraprapgh_i ? (
                    checkTaxonomy.field_hero_ingredients_taxonomy.relationships
                      .field_taxonomy_hero_paraprapgh_i.localFile ? (

                        checkTaxonomy.field_hero_ingredients_taxonomy
                          .relationships.field_taxonomy_hero_paraprapgh_i
                          .localFile.childImageSharp.original.src

                      ) : (
                        ""
                      )
                  ) : (
                    ""
                  )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
              }}
              className={[
                "col-lg-5 offset-lg-1",
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol collectionheroimage",
              ].join(" ")}
            >


            </div>

          ) : (
              ""
            )}
        </div>

      ) : nodetype == 'clinicalGroups' ? (<div className={"row hero-row-wrapper"}>
        <div
          className={[
            "col-12",
            "col-lg-5",
            "offset-lg-1",
            "ClinicalIngredientsclass",
            Collectionherostyle.Collectionheroleftcol,
            "Collectionheroleftcol",
          ].join(" ")}
        >
          <div className="row">
            {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>
              <p className="breadcramp">
                <Link to="/">Home</Link> /{" "}
                <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_taxonomy_hero.field_taxonomy_page_url ? <Link to={checkTaxonomy.field_taxonomy_hero.field_taxonomy_page_url}>{checkTaxonomy.field_taxonomy_hero.field_taxonomy_page_title ? checkTaxonomy.field_taxonomy_hero.field_taxonomy_page_title : getname}</Link> : ""}
              </p>
            </div>}

          </div>
          <div class="row collectionherorow">
            <div className="col-12">
              {checkTaxonomy.field_taxonomy_hero ? (
                <p className={[Collectionherostyle.type, Collectionherostyle.clinical].join(' ')}>
                  {
                    checkTaxonomy.field_taxonomy_hero
                      .field_taxonomy_hero_paraprapgh_t
                  }
                </p>
              ) : (
                  ""
                )}

              {checkTaxonomy.field_taxonomy_hero ? (
                <h1 className={Collectionherostyle.collectiontitle}>
                  {
                    <div dangerouslySetInnerHTML={{
                      __html: checkTaxonomy.field_taxonomy_hero
                        .field_taxonomy_hero_para_title
                    }}></div>
                  }
                </h1>
              ) : (
                  ""
                )}
              {checkTaxonomy.field_taxonomy_hero ? (
                <div className={Collectionherostyle.collectiondescription}
                  dangerouslySetInnerHTML={{
                    __html: checkTaxonomy.field_taxonomy_hero
                      .field_taxonomy_hero_para_descrip ?
                      checkTaxonomy.field_taxonomy_hero
                        .field_taxonomy_hero_para_descrip.processed : ""
                  }}
                >

                </div>
              ) : (
                  ""
                )}
            </div>
          </div>
        </div>
        {checkTaxonomy.field_taxonomy_hero ? (
          <div
            style={{
              background: `url(${checkTaxonomy.field_taxonomy_hero.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_taxonomy_hero.relationships
                    .field_taxonomy_hero_paraprapgh_i.localFile ? (

                      checkTaxonomy.field_taxonomy_hero
                        .relationships.field_taxonomy_hero_paraprapgh_i
                        .localFile.childImageSharp.original.src

                    ) : (
                      ""
                    )
                ) : (
                  ""
                )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
            }}
            className={[
              "col-lg-5 offset-lg-1",
              "col-12",
              Collectionherostyle.Collectionherorightcol,
              "Collectionherorightcol collectionheroimage",
            ].join(" ")}
          >


          </div>

        ) : (
            ""
          )}
      </div>
      ) :
                nodetype == 'skinClinicalType' ? (
                  <div className={"row hero-row-wrapper"}>
                    <div
                      className={[
                        "col-12",
                        "col-lg-5",
                        "offset-lg-1",
                        "ClinicalIngredientsclass",
                        Collectionherostyle.Collectionheroleftcol,
                        "Collectionheroleftcol",
                      ].join(" ")}
                    >
                      <div className="row">
                        {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>
                          <p className="breadcramp">
                            <Link to="/">Home</Link> /{" "}
                            <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_hero_taxonomy_skintype.field_taxonomy_page_url ? <Link to={checkTaxonomy.field_hero_taxonomy_skintype.field_taxonomy_page_url}>{checkTaxonomy.field_hero_taxonomy_skintype.field_taxonomy_page_title ? checkTaxonomy.field_hero_taxonomy_skintype.field_taxonomy_page_title : getname}</Link> : ""}
                          </p>
                        </div>}

                      </div>
                      <div className="row collectionherorow">
                        <div className="col-12">
                          {checkTaxonomy.field_hero_taxonomy_skintype ? (
                            <p className={[Collectionherostyle.type, Collectionherostyle.medical].join(' ')}>
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
                                <div dangerouslySetInnerHTML={{
                                  __html: checkTaxonomy.field_hero_taxonomy_skintype
                                    .field_taxonomy_hero_para_title
                                }}></div>
                              }
                            </h1>
                          ) : (
                              ""
                            )}
                          {checkTaxonomy.field_hero_taxonomy_skintype ? (
                            <div className={Collectionherostyle.collectiondescription}
                              dangerouslySetInnerHTML={{
                                __html: checkTaxonomy.field_hero_taxonomy_skintype
                                  .field_taxonomy_hero_para_descrip ?
                                  checkTaxonomy.field_hero_taxonomy_skintype
                                    .field_taxonomy_hero_para_descrip.processed : ""
                              }}
                            >

                            </div>
                          ) : (
                              ""
                            )}
                        </div>
                      </div>

                    </div>
                    {checkTaxonomy.field_hero_taxonomy_skintype ? (
                      <div
                        style={{
                          background: `url(${checkTaxonomy.field_hero_taxonomy_skintype.relationships
                            .field_taxonomy_hero_paraprapgh_i ? (
                              checkTaxonomy.field_hero_taxonomy_skintype.relationships
                                .field_taxonomy_hero_paraprapgh_i.localFile ? (
                                  <img
                                    className={[Collectionherostyle.allheight, "img-fluid-height"].join(" ")}
                                    src={
                                      checkTaxonomy.field_hero_taxonomy_skintype
                                        .relationships.field_taxonomy_hero_paraprapgh_i
                                        .localFile.childImageSharp.original.src
                                    }
                                  />
                                ) : (
                                  ""
                                )
                            ) : (
                              ""
                            )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                        }}
                        className={[
                          "col-lg-5 offset-lg-1",
                          "col-12",
                          Collectionherostyle.Collectionherorightcol,
                          "Collectionherorightcol collectionheroimage",
                        ].join(" ")}
                      >
                      </div>
                    ) : (
                        ""
                      )}
                  </div>
                ) : nodetype == 'MedicalIngredients' ? (

                  <div className={"row hero-row-wrapper"}>

                    <div
                      className={[
                        "col-12",
                        "col-lg-5",
                        "ClinicalIngredientsclass",
                        "offset-lg-1",
                        Collectionherostyle.Collectionheroleftcol,
                        "Collectionheroleftcol",
                      ].join(" ")}
                    >
                      <div className="row">
                        {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>
                          <p className="breadcramp">
                            <Link to="/">Home</Link> /{" "}
                            <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_hero_clinical_ing_taxonomy.field_taxonomy_page_url ? <Link to={checkTaxonomy.field_hero_clinical_ing_taxonomy.field_taxonomy_page_url}>{checkTaxonomy.field_hero_clinical_ing_taxonomy.field_taxonomy_page_title ? checkTaxonomy.field_hero_clinical_ing_taxonomy.field_taxonomy_page_title : getname}</Link> : ""}
                          </p>
                        </div>}

                      </div>
                      <div class="row collectionherorow">
                        <div className="col-12">
                          {checkTaxonomy.field_hero_clinical_ing_taxonomy ? (
                            <p className={[Collectionherostyle.type, Collectionherostyle.medical].join(' ')}>

                              {
                                checkTaxonomy.field_hero_clinical_ing_taxonomy
                                  .field_taxonomy_hero_paraprapgh_t
                              }
                            </p>
                          ) : (
                              ""
                            )}

                          {checkTaxonomy.field_hero_clinical_ing_taxonomy ? (
                            <h1 className={Collectionherostyle.collectiontitle}>
                              {
                                <div dangerouslySetInnerHTML={{
                                  __html: checkTaxonomy.field_hero_clinical_ing_taxonomy
                                    .field_taxonomy_hero_para_title
                                }}></div>
                              }
                            </h1>
                          ) : (
                              ""
                            )}
                          {checkTaxonomy.field_hero_clinical_ing_taxonomy ? (
                            <div className={Collectionherostyle.collectiondescription}
                              dangerouslySetInnerHTML={{
                                __html: checkTaxonomy.field_hero_clinical_ing_taxonomy
                                  .field_taxonomy_hero_para_descrip ?
                                  checkTaxonomy.field_hero_clinical_ing_taxonomy
                                    .field_taxonomy_hero_para_descrip.processed : ""
                              }}
                            >

                            </div>
                          ) : (
                              ""
                            )}
                        </div>

                      </div>
                    </div>
                    {checkTaxonomy.field_hero_clinical_ing_taxonomy ? (
                      <div
                        style={{
                          background: `url(${checkTaxonomy.field_hero_clinical_ing_taxonomy.relationships
                            .field_taxonomy_hero_paraprapgh_i ? (
                              checkTaxonomy.field_hero_clinical_ing_taxonomy.relationships
                                .field_taxonomy_hero_paraprapgh_i.localFile ? (
                                  checkTaxonomy.field_hero_clinical_ing_taxonomy
                                    .relationships.field_taxonomy_hero_paraprapgh_i
                                    .localFile.childImageSharp.original.src

                                ) : (
                                  ""
                                )
                            ) : (
                              ""
                            )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                        }}
                        className={[
                          "col-lg-5 offset-lg-1",
                          "col-12",
                          Collectionherostyle.Collectionherorightcol,
                          "Collectionherorightcol collectionheroimage",
                        ].join(" ")}
                      >

                      </div>

                    ) : (
                        ""
                      )}
                  </div>
                ) : nodetype == 'skinMedicalType' ? (
                  <div className={"row hero-row-wrapper"}>
                    <div
                      className={[
                        "col-12",
                        "col-lg-5",
                        "offset-lg-1",
                        "ClinicalIngredientsclass",
                        Collectionherostyle.Collectionheroleftcol,
                        "Collectionheroleftcol",
                      ].join(" ")}
                    >
                      <div className="row">
                        {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>
                          <p className="breadcramp">
                            <Link to="/">Home</Link> /{" "}
                            <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_hero_parag_taxonomy.field_taxonomy_page_url ? <Link to={checkTaxonomy.field_hero_parag_taxonomy.field_taxonomy_page_url}>{checkTaxonomy.field_hero_parag_taxonomy.field_taxonomy_page_title ? checkTaxonomy.field_hero_parag_taxonomy.field_taxonomy_page_title : getname}</Link> : ""}
                          </p>
                        </div>}
                      </div>
                      <div className="row collectionherorow">
                        <div className="col-12">
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
                                <div dangerouslySetInnerHTML={{
                                  __html: checkTaxonomy.field_hero_parag_taxonomy
                                    .field_taxonomy_hero_para_title
                                }}></div>
                              }
                            </h1>
                          ) : (
                              ""
                            )}
                          {checkTaxonomy.field_hero_parag_taxonomy ? (
                            <div className={Collectionherostyle.collectiondescription}
                              dangerouslySetInnerHTML={{
                                __html: checkTaxonomy.field_hero_parag_taxonomy
                                  .field_taxonomy_hero_para_descrip ?
                                  checkTaxonomy.field_hero_parag_taxonomy
                                    .field_taxonomy_hero_para_descrip.processed : ""
                              }}
                            >

                            </div>
                          ) : (
                              ""
                            )}
                        </div>
                      </div>
                    </div>
                    {checkTaxonomy.field_hero_parag_taxonomy ? (
                      <div
                        style={{
                          background: `url(${checkTaxonomy.field_hero_parag_taxonomy.relationships
                            .field_taxonomy_hero_paraprapgh_i ? (
                              checkTaxonomy.field_hero_parag_taxonomy.relationships
                                .field_taxonomy_hero_paraprapgh_i.localFile ? (

                                  checkTaxonomy.field_hero_parag_taxonomy
                                    .relationships.field_taxonomy_hero_paraprapgh_i
                                    .localFile.childImageSharp.original.src
                                ) : (
                                  ""
                                )
                            ) : (
                              ""
                            )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                        }}
                        className={[
                          "col-lg-5 offset-lg-1",
                          "col-12",
                          Collectionherostyle.Collectionherorightcol,
                          "Collectionherorightcol collectionheroimage",
                        ].join(" ")}
                      >

                      </div>

                    ) : (
                        ""
                      )}
                  </div>
                ) : nodetype == "medicalConcern" ? (
                  <div className={"row hero-row-wrapper"}>
                    <div
                      className={[
                        "col-12",
                        "col-lg-5",
                        "offset-lg-1",
                        "ClinicalIngredientsclass",
                        Collectionherostyle.Collectionheroleftcol,
                        "Collectionheroleftcol",
                      ].join(" ")}
                    >
                      <div className="row">
                        {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>

                          <p className="breadcramp">
                            <Link to="/">Home</Link> /{" "}
                            <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_hero_taxonomy.field_taxonomy_page_url ? <Link to={checkTaxonomy.field_hero_taxonomy.field_taxonomy_page_url}>{checkTaxonomy.field_hero_taxonomy.field_taxonomy_page_title ? checkTaxonomy.field_hero_taxonomy.field_taxonomy_page_title : getname}</Link> : ""}
                          </p>
                        </div>}
                      </div>
                      <div className="row collectionherorow">
                      <div className="col-12">
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
                              <div dangerouslySetInnerHTML={{
                                __html: checkTaxonomy.field_hero_taxonomy
                                  .field_taxonomy_hero_para_title
                              }}></div>
                            }
                          </h1>
                        ) : (
                            ""
                          )}
                        {checkTaxonomy.field_hero_taxonomy ? (
                          <div className={Collectionherostyle.collectiondescription}
                            dangerouslySetInnerHTML={{
                              __html: checkTaxonomy.field_hero_taxonomy
                                .field_taxonomy_hero_para_descrip ?
                                checkTaxonomy.field_hero_taxonomy
                                  .field_taxonomy_hero_para_descrip.processed : ""
                            }}
                          >

                          </div>
                        ) : (
                            ""
                          )}
                      </div>
                      </div>
                    </div>
                    {checkTaxonomy.field_hero_taxonomy ? (
                      <div
                        style={{
                          background: `url(${checkTaxonomy.field_hero_taxonomy.relationships
                            .field_taxonomy_hero_paraprapgh_i ? (
                              checkTaxonomy.field_hero_taxonomy.relationships
                                .field_taxonomy_hero_paraprapgh_i.localFile ? (

                                  checkTaxonomy.field_hero_taxonomy
                                    .relationships.field_taxonomy_hero_paraprapgh_i
                                    .localFile.childImageSharp.original.src

                                ) : (
                                  ""
                                )
                            ) : (
                              ""
                            )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                        }}
                        className={[
                          "col-lg-5 offset-lg-1",
                          "col-12",
                          Collectionherostyle.Collectionherorightcol,
                          "Collectionherorightcol collectionheroimage",
                        ].join(" ")}
                      >


                      </div>

                    ) : (
                        ""
                      )}
                  </div>
                ) : nodetype == "medicalCategories" ? (
                  <div className={"row hero-row-wrapper"}>
                    <div
                      className={[
                        "col-12",
                        "col-lg-5",
                        "offset-lg-1",
                        "ClinicalIngredientsclass",
                        Collectionherostyle.Collectionheroleftcol,
                        "Collectionheroleftcol",
                      ].join(" ")}
                    >
                      <div className="row">
                        {<div className={[" breadcramp-con hide", "col-12"].join(" ")}>
                          <p className="breadcramp">

                            <Link to="/">Home</Link> /{" "}
                            <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_hero_category_taxonomy.field_taxonomy_page_url ? <Link to={checkTaxonomy.field_hero_category_taxonomy.field_taxonomy_page_url}>{checkTaxonomy.field_hero_category_taxonomy.field_taxonomy_page_title ? checkTaxonomy.field_hero_category_taxonomy.field_taxonomy_page_title : getname}</Link> : ""}
                          </p>
                        </div>}
                      </div>
                      <div className="row collectionherorow">
                      <div className="col-12">
                        {checkTaxonomy.field_hero_category_taxonomy ? (
                          <p className={[Collectionherostyle.type, nodetype.includes('medical') ? Collectionherostyle.medical : ""].join(' ')}>
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
                              <div dangerouslySetInnerHTML={{
                                __html: checkTaxonomy.field_hero_category_taxonomy
                                  .field_taxonomy_hero_para_title
                              }}></div>
                            }
                          </h1>
                        ) : (
                            ""
                          )}
                        {checkTaxonomy.field_hero_category_taxonomy ? (
                          <div className={Collectionherostyle.collectiondescription}
                            dangerouslySetInnerHTML={{
                              __html: checkTaxonomy.field_hero_category_taxonomy
                                .field_taxonomy_hero_para_descrip ?
                                checkTaxonomy.field_hero_category_taxonomy
                                  .field_taxonomy_hero_para_descrip.processed : ""
                            }}
                          >

                          </div>
                        ) : (
                            ""
                          )}
                      </div>
                      </div>
                    </div>
                    {checkTaxonomy.field_hero_category_taxonomy ? (
                      <div
                        style={{
                          background: `url(${checkTaxonomy.field_hero_category_taxonomy
                            .relationships.field_taxonomy_hero_paraprapgh_i ? (
                              checkTaxonomy.field_hero_category_taxonomy
                                .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (

                                  checkTaxonomy.field_hero_category_taxonomy
                                    .relationships.field_taxonomy_hero_paraprapgh_i
                                    .localFile.childImageSharp.original.src

                                ) : (
                                  ""
                                )
                            ) : (
                              ""
                            )})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                        }}
                        className={[
                          "col-lg-5 offset-lg-1",
                          "col-12",
                          Collectionherostyle.Collectionherorightcol,
                          "Collectionherorightcol collectionheroimage",
                        ].join(" ")}
                      >

                      </div>

                    ) : (
                        ""
                      )}
                  </div>
                ) : (
                            <div className={"row hero-row-wrapper"}>
                              <div
                                className={[
                                  "col-12",
                                  "col-lg-5",
                                  "offset-lg-1",
                                  "ClinicalIngredientsclass",
                                  Collectionherostyle.Collectionheroleftcol,
                                  "Collectionheroleftcol",
                                ].join(" ")}
                              >
                                <div className="row m-0">

                                  <div className=" breadcramp-con hide col-12">
                                    <p className="breadcramp">
                                      <Link to="/">Home</Link> /{" "}
                                      <Link to={'/' + first_url}> {first_url}</Link> / {checkTaxonomy.field_taxonomy_page_url ? <Link to={checkTaxonomy.field_taxonomy_page_url}>{checkTaxonomy.field_taxonomy_page_title ? checkTaxonomy.field_taxonomy_page_title : getname}</Link> : ""}
                                    </p>
                                  </div>


                                </div>
                                <div className="row generalcollectionherorow">
                                <div className="col-12">
                                  {checkTaxonomy.field_taxonomy_hero_paraprapgh_t ? (
                                    <p className={[Collectionherostyle.type, checkTaxonomy.field_taxonomy_hero_paraprapgh_t.includes('medical')
                                      || checkTaxonomy.field_taxonomy_hero_paraprapgh_t.includes('clinical') ? Collectionherostyle.medical : Collectionherostyle.general, "general"].join(' ')}>

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
                                        <div dangerouslySetInnerHTML={{ __html: checkTaxonomy.field_taxonomy_hero_para_title }}></div>
                                      }
                                    </h1>
                                  ) : (
                                      ""
                                    )}
                                  {checkTaxonomy.field_taxonomy_hero_para_descrip ? (
                                    <div className={Collectionherostyle.collectiondescription}
                                      dangerouslySetInnerHTML={{
                                        __html: checkTaxonomy
                                          .field_taxonomy_hero_para_descrip ?
                                          checkTaxonomy.field_taxonomy_hero_para_descrip
                                            .processed : ""
                                      }}
                                    >

                                    </div>
                                  ) : (
                                      ""
                                    )}
                                  {checkTaxonomy.field_taxonomy_hero_link ? (
                                    <Link to={checkTaxonomy.field_taxonomy_hero_link.uri.replace('internal:', '')} className={[Collectionherostyle.heroLink].join(" ")}>{checkTaxonomy.field_taxonomy_hero_link.title}</Link>
                                  ) : ""}
                                </div>
                                </div>

                              </div>
                              {checkTaxonomy.relationships ? (
                                <div
                                  style={{
                                    background: `url(${checkTaxonomy.relationships.field_taxonomy_hero_paraprapgh_i ?
                                      checkTaxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile ?
                                        checkTaxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.childImageSharp.original.src : "" : ""})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                                  }}

                                  className={[
                                    "col-lg-5",
                                    "col-12",
                                    "offset-lg-1",
                                    "Collectionherorightcol collectionheroimage",
                                  ].join(" ")}
                                >



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
  fragment paragraphTaxonomyHeroParaprapgh on paragraph__taxonomy_hero_paraprapgh {
    id
    field_taxonomy_hero_link {
      title
      uri
    }
    field_taxonomy_page_url
    field_taxonomy_page_title
  }

  fragment collectionhero on taxonomy_term__clinical_skin_concern {
    id
    relationships {
      field_hero_paraprapgh_taxonomy {
        field_taxonomy_page_url
        field_taxonomy_page_title
        field_taxonomy_hero_para_title
        field_taxonomy_hero_para_descrip{
            processed
        }
        field_taxonomy_hero_paraprapgh_t
        relationships {
          field_taxonomy_hero_paraprapgh_i {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
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
    field_taxonomy_hero_para_descrip{
        processed
    }
    field_taxonomy_hero_para_title
    field_taxonomy_hero_paraprapgh_t
    field_taxonomy_page_url
    field_taxonomy_page_title
    relationships {
      field_taxonomy_hero_paraprapgh_i {
        localFile {
          childImageSharp {
            original {
              src
            }
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;