import React from "react"
import { graphql, Link } from "gatsby"
import Collectionherostyle from "../../assets/scss/components/collection-hero.module.scss"
import Img from "gatsby-image"
const CollectionHero = ({ node, nodetype, collectionName, collectionUrl, checktaxonomyType }) => {
  let checkTaxonomy;
  if (nodetype == "clinicalConcern") {
    checkTaxonomy = node.data.taxonomyTermClinicalSkinConcern.relationships;
  } else if (nodetype == "clinicalCategories") {
    checkTaxonomy = node.data.taxonomyTermClinicalCategories.relationships
  } else if (nodetype == "medicalConcern") {
    checkTaxonomy = node.data.taxonomyTermMedicalSkinConcern.relationships
  } else if (nodetype == "medicalCategories") {
    checkTaxonomy = node.data.taxonomyTermMedicalCategories.relationships
  } else if (nodetype == "clinicalGroups") {
    checkTaxonomy =
      node.data.taxonomyTermClinicalGroups.relationships
        
  } else if (nodetype == 'medicalLine') {
    checkTaxonomy =
      node.data.taxonomyTermMedicalProductLines.relationships
  } else if (nodetype == 'skinClinicalType') {
    checkTaxonomy =
      node.data.taxonomyTermClinicalSkinType.relationships

  } else if (nodetype == 'skinMedicalType') {

    checkTaxonomy =
      node.data.taxonomyTermMedicalSkinType.relationships;
  } else if (nodetype == 'MedicalIngredients') {

    checkTaxonomy =
      node.data.taxonomyTermMedicalIngredients.relationships

  } else if (nodetype == "ClinicalIngredients") {
    checkTaxonomy =
      node.data.taxonomyTermClinicalIngredients.relationships

  } else {
    // listing pages
    checkTaxonomy = node;
  }
  if (typeof window !== "undefined") {
    var pathname = new URL(window.location.href).pathname;
    var geturi = pathname.split('/')
    var first_url = geturi[1];
    var sec_url = geturi[2];
  //  if (first_url !="medical") {
  //    if (!first_url !="clinical") {
  //      if ( document.querySelector('.collectionhero')) {
  //           document.querySelector('.collectionhero').classList.add('generalcollectionhero')
  //      }

      
  //    }
  //  }
  }

  return (
    <div
      className={checktaxonomyType === "clinical" || nodetype === "clinical" || first_url === "clinical" ?
        "container-fluid collectionhero " + Collectionherostyle.clinicalcollectionhero
        : ( first_url === "medical" || checktaxonomyType === "medical"|| nodetype === "medical") ? "container-fluid collectionhero medical-bg " + Collectionherostyle.medicalcollectionhero+" "+Collectionherostyle.medicalBg
          : "container-fluid collectionhero  generalcollectionhero"}
    >

      {nodetype == "clinicalConcern" ? (

        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
              {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
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
                      <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_hero_paraprapgh_taxonomy
                        .field_taxonomy_hero_para_title}}></div>
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
              className={[
                "col-lg-7",                
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >

              {checkTaxonomy.field_hero_paraprapgh_taxonomy
                .relationships.field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_hero_paraprapgh_taxonomy
                    .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                        src={
                          checkTaxonomy.field_hero_paraprapgh_taxonomy
                            .relationships.field_taxonomy_hero_paraprapgh_i
                            .localFile.childImageSharp.original.src
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
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
            {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
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
                      <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_hero_categories_taxonomy
                        .field_taxonomy_hero_para_title}}></div>
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
              className={[
                "col-lg-7",               
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >

              {checkTaxonomy.field_hero_categories_taxonomy
                .relationships.field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_hero_categories_taxonomy
                    .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                        src={
                          checkTaxonomy.field_hero_categories_taxonomy
                            .relationships.field_taxonomy_hero_paraprapgh_i
                            .localFile.childImageSharp.original.src
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
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
            {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
              <div className="col-12 col-lg-11 offset-lg-1 ">
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
                      <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_hero_productline_taxonomy
                        .field_taxonomy_hero_para_title}}></div>
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
              className={[
                "col-lg-7",                
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >

              {checkTaxonomy.field_hero_productline_taxonomy
                .relationships.field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_hero_productline_taxonomy
                    .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                        src={
                          checkTaxonomy.field_hero_productline_taxonomy
                            .relationships.field_taxonomy_hero_paraprapgh_i
                            .localFile.childImageSharp.original.src
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
      ) : nodetype == 'ClinicalIngredients' ? (
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
            {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
              <div className="col-12  col-lg-11 offset-lg-1 ">
                {checkTaxonomy.field_hero_ingredients_taxonomy ? (
                  <p className={[Collectionherostyle.type, Collectionherostyle.medical].join(' ')}>
                    {" "}
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
                      <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_hero_ingredients_taxonomy
                        .field_taxonomy_hero_para_title}}></div>
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
              className={[
                "col-lg-7",                
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >

              {checkTaxonomy.field_hero_ingredients_taxonomy.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_hero_ingredients_taxonomy.relationships
                    .field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                        src={
                          checkTaxonomy.field_hero_ingredients_taxonomy
                            .relationships.field_taxonomy_hero_paraprapgh_i
                            .localFile.childImageSharp.original.src
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

      ) : nodetype == 'clinicalGroups' ?(  <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
            {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
              <div className="col-12 col-lg-11 offset-lg-1">
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
                      <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_taxonomy_hero
                        .field_taxonomy_hero_para_title}}></div>
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
              className={[
                "col-lg-7",                
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >

              {checkTaxonomy.field_taxonomy_hero.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_taxonomy_hero.relationships
                    .field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                        src={
                          checkTaxonomy.field_taxonomy_hero
                            .relationships.field_taxonomy_hero_paraprapgh_i
                            .localFile.childImageSharp.original.src
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
):
       nodetype == 'skinClinicalType' ? (
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
            {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
              <div className="col-12 col-lg-11 offset-lg-1 ">
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
                      <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_hero_taxonomy_skintype
                        .field_taxonomy_hero_para_title}}></div>
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
              className={[
                "col-lg-7",               
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >

              {checkTaxonomy.field_hero_taxonomy_skintype.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_hero_taxonomy_skintype.relationships
                    .field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
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
                )}

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
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
            {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
              <div className="col-12 col-lg-11 offset-lg-1 ">
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
                      <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_hero_clinical_ing_taxonomy
                        .field_taxonomy_hero_para_title}}></div>
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
              className={[
                "col-lg-7",                
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >

              {checkTaxonomy.field_hero_clinical_ing_taxonomy.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_hero_clinical_ing_taxonomy.relationships
                    .field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                        src={
                          checkTaxonomy.field_hero_clinical_ing_taxonomy
                            .relationships.field_taxonomy_hero_paraprapgh_i
                            .localFile.childImageSharp.original.src
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
      ) : nodetype == 'skinMedicalType' ? (
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
            {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
            </div>
            <div className="col-12 col-lg-11 offset-lg-1 ">
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
                    <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_hero_parag_taxonomy
                      .field_taxonomy_hero_para_title}}></div>
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
          {checkTaxonomy.field_hero_parag_taxonomy ? (
            <div
              className={[
                "col-lg-7",             
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.field_hero_parag_taxonomy.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_hero_parag_taxonomy.relationships
                    .field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                        src={
                          checkTaxonomy.field_hero_parag_taxonomy
                            .relationships.field_taxonomy_hero_paraprapgh_i
                            .localFile.childImageSharp.original.src
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
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
            {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
            </div>
            <div className="col-12 col-lg-11 offset-lg-1 ">
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
                    <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_hero_taxonomy
                      .field_taxonomy_hero_para_title}}></div>
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
          {checkTaxonomy.field_hero_taxonomy ? (
            <div
              className={[
                "col-lg-7",               
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >

              {checkTaxonomy.field_hero_taxonomy.relationships
                .field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_hero_taxonomy.relationships
                    .field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                        src={
                          checkTaxonomy.field_hero_taxonomy
                            .relationships.field_taxonomy_hero_paraprapgh_i
                            .localFile.childImageSharp.original.src
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
        <div className={"row hero-row-wrapper"}>
          <div
            className={[
              "col-12",
              "col-lg-4",
              "offset-lg-1",
              Collectionherostyle.Collectionheroleftcol,
              "Collectionheroleftcol",
            ].join(" ")}
          >
            <div className="row">
            {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                <p className="breadcramp">
                  <Link to="/">Home</Link> /{" "}
                  <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                </p>
              </div> : ""}
            </div>
            <div className="col-12 col-lg-11 offset-lg-1 ">
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
                    <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_hero_category_taxonomy
                      .field_taxonomy_hero_para_title}}></div>
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
          {checkTaxonomy.field_hero_category_taxonomy ? (
            <div
              className={[
                "col-lg-7",            
                "col-12",
                Collectionherostyle.Collectionherorightcol,
                "Collectionherorightcol",
              ].join(" ")}
            >
              {checkTaxonomy.field_hero_category_taxonomy
                .relationships.field_taxonomy_hero_paraprapgh_i ? (
                  checkTaxonomy.field_hero_category_taxonomy
                    .relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                      <img
                        className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                        src={
                          checkTaxonomy.field_hero_category_taxonomy
                            .relationships.field_taxonomy_hero_paraprapgh_i
                            .localFile.childImageSharp.original.src
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
                          <div className={"row hero-row-wrapper"}>
                            <div
                              className={[
                                "col-12",
                                "col-lg-5",
                                "offset-lg-1",
                                Collectionherostyle.Collectionheroleftcol,
                                "Collectionheroleftcol",
                              ].join(" ")}
                            >
                              <div className="row m-0">
                              {checktaxonomyType === "clinical" || checktaxonomyType === "medical" || first_url ==="medical" || first_url === ""  ? <div className={["breadcramp-con", "col-12"].join(" ")}>
                                      <p className="breadcramp">
                                        <Link to="/">Home</Link> /{" "}
                                        <Link to={'/' + first_url}> {first_url}</Link> / <Link to={collectionUrl ? collectionUrl : '/' + first_url + '/' + sec_url}>{sec_url}</Link>
                                      </p>
                                    </div> : ""}
                                <div className="col-12 col-lg-11 offset-lg-1 ">
                                  {checkTaxonomy.field_taxonomy_hero_paraprapgh_t ? (
                                    <p className={[Collectionherostyle.type, checkTaxonomy.field_taxonomy_hero_paraprapgh_t.includes('medical') || checkTaxonomy.field_taxonomy_hero_paraprapgh_t.includes('clinical') ? Collectionherostyle.medical : Collectionherostyle.general,"general"].join(' ')}>
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
                                        <div dangerouslySetInnerHTML={{__html: checkTaxonomy.field_taxonomy_hero_para_title}}></div>
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
                                    {checkTaxonomy.field_taxonomy_hero_link? (
                                      <Link to={checkTaxonomy.field_taxonomy_hero_link.uri} className={[Collectionherostyle.heroLink].join(" ")}>{checkTaxonomy.field_taxonomy_hero_link.title}</Link>
                                    ) : ""}
                                </div>

                              </div>
                            </div>
                            {checkTaxonomy.relationships ? (
                              <div
                                className={[
                                  "col-lg-5",                                
                                  "col-12",
                                  "offset-lg-1",
                                  "Collectionherorightcol",
                                ].join(" ")}
                              >


                                {checkTaxonomy.relationships.field_taxonomy_hero_paraprapgh_i ? (
                                  checkTaxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile ? (
                                    <img
                                      className={[Collectionherostyle.allheight,"img-fluid-height"].join(" ")}
                                      src={
                                        checkTaxonomy.relationships.field_taxonomy_hero_paraprapgh_i.localFile.childImageSharp.original.src
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
                        {console.log('bahiiii', node)}
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
  }

  fragment collectionhero on taxonomy_term__clinical_skin_concern {
    id
    relationships {
      field_hero_paraprapgh_taxonomy {
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