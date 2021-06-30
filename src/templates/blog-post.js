import React, { useContext, useEffect, useState } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { getParagraph } from "../components/paragraphs-helper"
import Img from 'gatsby-image'
import share from '../assets/images/product-images/share.svg'
import ProductCard from '../components/productcard'
import Slider from "react-slick"
import fb from "../assets/images/product-images/facebook.svg"
import tw from "../assets/images/product-images/twitter.svg"

import { checkStock } from '../assets/js/stock';
import BlogCard from '../components/blog-card';
const baseUrl = process.env.Base_URL;

const BlogPost = props => {

  useEffect(() => {
    if (typeof window != undefined) {
      checkStock(baseUrl);
    }
  }, []);

  const nodeType = props.pageContext.nodetype;
  const paragraphs = props.data.nodeBlogPost.relationships.paragraphs.map(getParagraph)
  const data = props.data


  const SliderSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 1,
        }
      },
    ]
  }

  const SliderSetting2 = {
    infinite: false,
    speed: 500,
    slidesToShow: 3.8,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
        }
      },
    ]
  }



  return (
    <Layout >
      <div className={`container-fluid blog-hero`}>
        <div className={`d-none d-lg-block`}>
          <div className={`col-12 pl-0`}>
            <div className={`blog-breadcrumb`}>
              <Link to="/">Home</Link>/
              <Link to="/blog">Blog</Link>
              {data.nodeBlogPost.relationships
                && data.nodeBlogPost.relationships.field_blog_tag
                && data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0]
                && data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0].relationships.parent[0] ?
                <>/<Link to={data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0].relationships.parent[0].path.alias ? data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0].relationships.parent[0].path.alias : "#"}>{data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0].relationships.parent[0].name}</Link></> : ""}

              {data.nodeBlogPost.relationships
                && data.nodeBlogPost.relationships.field_blog_tag ?
                <>/<Link to={data.nodeBlogPost.relationships.field_blog_tag.path.alias ? data.nodeBlogPost.relationships.field_blog_tag.path.alias : "#"}><span dangerouslySetInnerHTML={{ __html: data.nodeBlogPost.relationships.field_blog_tag.name }}></span></Link></> : ""}

              <>/<Link to={data.nodeBlogPost.path.alias} className={`active-breadcrumb`}>{data.nodeBlogPost.title}</Link></>
            </div>
          </div>
        </div>

        <div className={`row`}>
          <div className={`col-12 blog-img-col`}>
            {data.nodeBlogPost.relationships
              && data.nodeBlogPost.relationships.field_hero_image
              && data.nodeBlogPost.relationships.field_hero_image.localFile
              && data.nodeBlogPost.relationships.field_hero_image.localFile.childImageSharp ?
              <Img fluid={data.nodeBlogPost.relationships.field_hero_image.localFile.childImageSharp.fluid} /> : ""}
          </div>
          <div className={`col-12 col-lg-8 offset-lg-2`}>
            {data.nodeBlogPost.field_blog_type ? <div className={`subtitle ${data.nodeBlogPost.field_blog_type == "medical" ? `medical-blog` : 'clinical-blog'}`}>{data.nodeBlogPost.field_blog_type}</div> : ""}
            {data.nodeBlogPost.title ? <div className={`blog-header`}>{data.nodeBlogPost.title}</div> : ""}
            <div className={`author-share`}>
              <button data-toggle="modal" data-target="#sharing" className={`col-12 share-blog`}>
                <img alt="img" src={share} /> Share
              </button>
            </div>


            {paragraphs}

            {/* {data.nodeBlogPost.relationships && data.nodeBlogPost.relationships.field_blog_tag ?
              <div className={`blog-tags`}>
                <p>Tags</p>
                <Link to={data.nodeBlogPost.relationships.field_blog_tag.path.alias ? data.nodeBlogPost.relationships.field_blog_tag.path.alias : '#'}>{data.nodeBlogPost.relationships.field_blog_tag.name}</Link>
              </div>
              : ""} */}
          </div>
        </div>

        {data.nodeBlogPost.relationships.field_related_products ?
          <>
            <div className={`row`}>
              <div className={`col-12`}>
                {data.nodeBlogPost.relationships.field_related_products.field_related_products_title ?
                  <div className={`blog-related-title`} dangerouslySetInnerHTML={{ __html: data.nodeBlogPost.relationships.field_related_products.field_related_products_title.processed }}></div> : ""}
              </div>
            </div>
            {data.nodeBlogPost.relationships.field_related_products.relationships && data.nodeBlogPost.relationships.field_related_products.relationships.field_related_products ?
              <div className={`row blog-related-section`}>
                <div style={{ width: "100%" }}>
                  <Slider {...SliderSetting}>

                    {data.nodeBlogPost.relationships.field_related_products.relationships.field_related_products.map((item, index) => {
                      return (
                        <div className={`col-12`}>
                          <ProductCard
                            producttitle={item.title}
                            productId={item.field_medical_id ? item.field_medical_id : item.field_clinical_id}
                            price={item.field_clinical_price ? item.field_clinical_price : item.field_medical_price ? item.field_medical_price : ""}
                            Sku={item.field_medical_sku ? item.field_medical_sku : item.field_clinical_sku ? item.field_clinical_sku : ""}
                            minQuantity={(item.field_min_quantity == 0 || item.field_min_quantity > 0) ? item.field_min_quantity : ""}
                            premierid={item.field_medical_premier_points_id ? item.field_medical_premier_points_id : ""}
                            productCat={item.field_medical_id ? "medical" : "clinical"}
                            feild_preimer={item.field_medical_premier_points ? item.field_medical_premier_points : ""}
                            productdescription={item.field_medical_description ? { __html: item.field_medical_description.processed } : item.field_clinical_description ? { __html: item.field_clinical_description.processed } : ""}
                            productLink={item.path ? item.path.alias : ""}
                            productimage={item.relationships &&
                              item.relationships.field_medical_image &&
                              item.relationships.field_medical_image[0] &&
                              item.relationships.field_medical_image[0].localFile &&
                              item.relationships.field_medical_image[0].localFile.childImageSharp ? item.relationships.field_medical_image[0].localFile.childImageSharp.fluid
                              :
                              item.relationships &&
                                item.relationships.field_clinical_image &&
                                item.relationships.field_clinical_image[0] &&
                                item.relationships.field_clinical_image[0].localFile &&
                                item.relationships.field_clinical_image[0].localFile.childImageSharp ? item.relationships.field_clinical_image[0].localFile.childImageSharp.fluid
                                : ""}
                            rate="0"
                          />
                        </div>
                      )
                    })

                    }
                  </Slider>
                </div>
              </div>
              : ""}

          </>
          : ""}

        {data.nodeBlogPost.field_display_related_articles
          && data.nodeBlogPost.relationships.field_blog_tag
          && data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0]
          && data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0].relationships.parent[0]
          && data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0].relationships.parent[0].relationships.taxonomy_term__blogs
          // && data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0].relationships.parent[0].relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs[0]
          // && data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0].relationships.parent[0].relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs[0].relationships.node__blog_post 
          ?
          <div className={`row related-articles`}>
            <div className="col-12 col-lg-10 offset-lg-1">
              <div className={` related-articles-border`}></div>
              {data.nodeBlogPost.field_related_articles_title ? <div dangerouslySetInnerHTML={{ __html: data.nodeBlogPost.field_related_articles_title.processed }} className={`related-articles-header`}></div> : ""}
            </div>
            <div className={`col-12 col-lg-11 offset-lg-1 related-col`}>

              <div style={{ width: "100%" }}>
                <Slider {...SliderSetting2}>
                  {data.nodeBlogPost.relationships.field_blog_tag.relationships.parent[0].relationships.parent[0].relationships.taxonomy_term__blogs.map((parent, index) => {

                    if (parent.relationships.taxonomy_term__blogs) {
                      return (
                        parent.relationships.taxonomy_term__blogs.map((blog, ind) => {
                          if (blog.relationships.node__blog_post) {
                            return (
                              blog.relationships.node__blog_post.map((item, inde) => {
                                return (
                                  <BlogCard
                                    title={item.title}
                                    url={item.path.alias ? item.path.alias : "#"}
                                    type={item.field_blog_type ? item.field_blog_type : ""}
                                    thumbnail={item.relationships
                                      && item.relationships.field_blog_thumbnail
                                      && item.relationships.field_blog_thumbnail.localFile
                                      && item.relationships.field_blog_thumbnail.localFile.childImageSharp ?
                                      item.relationships.field_blog_thumbnail.localFile.childImageSharp.fluid : ""}
                                  />
                                )
                              })
                            )
                          }
                        })
                      )
                    }

                  })}
                </Slider>
              </div>
            </div>
          </div>
          : ""}
      </div>

      <div
        class="modal fade"
        id="sharing"
        tabindex="-1"
        role="dialog"
        aria-labelledby="checkModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="share-wrap  mt-35 mb-50">
                <p className={["text-center blog-share-title"].join(" ")}><span>Share</span></p>
                {data.nodeBlogPost.title ? <p className={["text-center blog-share-text"].join(" ")}><span>{data.nodeBlogPost.title}</span></p> : ""}
                <div><a class="social-link face-share" href={`https://www.facebook.com/sharer/sharer.php?u=https://www.obagi.com`} target="_blank"><span><img src={fb} alt="img" /></span><span class="d-block text-center">SHARE ON FACEBOOK</span></a></div>
                <div><a class="social-link twitter-share" href={`https://twitter.com/intent/tweet?text=https://www.obagi.com`} target="_blank"><span><img src={tw} alt="img" /></span><span class="d-block text-center">SHARE ON TWITTER</span></a></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default BlogPost;
export const pageQuery = graphql`
query($slug: String!) {
    nodeBlogPost (fields: { slug: { eq: $slug } }) {
      id
      title
      field_blog_type
      path {
        alias
      }
      field_display_related_articles
      field_related_articles_title {
        processed
      }
      relationships {
        paragraphs: field_blog_components {
          type: __typename
          ...allParagraphBlogProductParagraph
          ...paragraphFullHtmlContent
        }
        field_blog_tag {
          name
          path {
            alias
          }
          relationships {
            parent {
              name
              relationships {
                parent {
                  name
                  path {
                    alias
                  }
                  relationships {
                    taxonomy_term__blogs {
                      relationships {
                        taxonomy_term__blogs {
                          relationships {
                            node__blog_post {
                              title
                              field_blog_type
                              path {
                                alias
                              }
                              relationships {
                                field_blog_thumbnail {
                                  localFile {
                                    childImageSharp {
                                      fluid {
                                        ...GatsbyImageSharpFluid
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
         
        }
        field_blog_thumbnail {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        field_hero_image {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        field_related_products {
          field_related_products_title {
            processed
          }
          relationships {
            field_related_products {
              ... on node__clinical_product {
                id
                title
                path {
                  alias
                }
                field_clinical_description {
                  processed
                }
                field_clinical_price
                field_clinical_sku
                field_clinical_id
                field_min_quantity
                relationships {
                  field_clinical_image {
                    localFile {
                      childImageSharp {
                        fluid {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
              ... on node__medical_product {
                id
                field_medical_id
                field_medical_description {
                  processed
                }
                field_medical_premier_points
                field_medical_premier_points_id
                field_medical_price
                field_medical_sku
                field_min_quantity
                path {
                  alias
                }
                title
                relationships {
                  field_medical_image {
                    localFile {
                      childImageSharp {
                        fluid {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
   
    }
}
`;
/*
export const blogPostQuery = graphql`
query($slug: String!) {
    nodeBlogPost(fields: { slug: { eq: $slug } }) {

          id
          field_subtitle {
            processed
          }
          field_title {
            processed
          }
          relationships {
            field_blog_components {
              ... on paragraph__full_html_content {
                id
                field_full_html {
                  processed
                }
              }
              ... on paragraph__blog_product_paragraph {
                id
                field_full_html_content {
                  processed
                }
                relationships {
                  field_product {
                    ... on node__clinical_product {
                      id
                      field_clinical_id
                      field_clinical_description {
                        processed
                      }
                      field_clinical_price
                      field_clinical_sku
                      field_min_quantity
                      path {
                        alias
                        pid
                        langcode
                      }
                      title
                      relationships {
                        field_clinical_image {
                          localFile {
                            childImageSharp {
                              fluid {
                                src
                              }
                            }
                          }
                        }
                      }
                    }
                    ... on node__medical_product {
                      id
                      field_medical_id
                      field_medical_price
                      field_medical_premier_points_id
                      field_medical_premier_points
                      field_medical_description {
                        processed
                      }
                      field_medical_sku
                      field_min_quantity
                      title
                      path {
                        alias
                      }
                      relationships {
                        field_medical_image {
                          localFile {
                            childImageSharp {
                              fluid {
                                src
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            field_blog_tag {
              name
              path {
                alias
              }
            }
            field_hero_image {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            field_related_products {
              field_related_products_title {
                processed
              }
              relationships {
                field_related_products {
                  ... on node__clinical_product {
                    id
                    title
                    path {
                      alias
                    }
                    field_clinical_description {
                      processed
                    }
                    field_clinical_price
                    field_clinical_sku
                    field_clinical_id
                    field_min_quantity
                    relationships {
                      field_clinical_image {
                        localFile {
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                  ... on node__medical_product {
                    id
                    field_medical_id
                    field_medical_description {
                      processed
                    }
                    field_medical_premier_points
                    field_medical_premier_points_id
                    field_medical_price
                    field_medical_sku
                    field_min_quantity
                    path {
                      alias
                    }
                    title
                    relationships {
                      field_medical_image {
                        localFile {
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

        }

  }

`*/