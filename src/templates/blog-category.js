import React, { useContext, useRef, useEffect, useState } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { getParagraph } from "../components/paragraphs-helper"
import Img from 'gatsby-image'
import BlogCard from '../components/blog-card'
import Slider from "react-slick"


const baseUrl = process.env.Base_URL;

const BlogCategory = props => {
  const size = useWindowSize();
  let screenWidth = size.width;
  let largeScreen = 992;

  console.log('ash blog props', props)
  const nodeType = props.pageContext.nodetype;
  const data = props.data.taxonomyTermBlogs;
  const allData = props.data.allTaxonomyTermBlogs;
  const [chosenFilter, setChosenFilter] = useState(false);
  const slider1 = useRef()
  const [state, setState] = useState({
    nav1: null,
  })
  const SliderSetting = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 1.5,
        }
      },
    ]
  }

  const allPosts = data.relationships.node__blog_post ? data.relationships.node__blog_post
    : data.relationships.taxonomy_term__blogs
      && data.relationships.taxonomy_term__blogs[0]
      && data.relationships.taxonomy_term__blogs[0].relationships
      && data.relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs
      && data.relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs[0].relationships
      && data.relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs[0].relationships.node__blog_post
      && data.relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs[0].relationships.node__blog_post[0] ?
      data.relationships.taxonomy_term__blogs.map((parent, index) => {
        return (
          parent.relationships.taxonomy_term__blogs.map((blog, index) => {
            return (
              blog.relationships.node__blog_post.filter((item, index) => {
                return (item)
              })
            )
          })
        )
      })[0].flat() : ""


  const [list, setList] = useState([...allPosts.slice(0, 2)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(allPosts.length > 2)
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  console.log('ash all posts', allPosts)
  let currentBlogPath = data.path.alias ? data.path.alias.split('/')[1] : ""

  let parentCategory = allData.edges.filter((item, index) => {

    let categoryPath = item.node.path.alias ? item.node.path.alias.split('/')[1] : ""
    let isParentCategory = item.node.path.alias && item.node.path.alias.split('/').length < 3 ? true : false
    console.log('ash cat item', item, categoryPath, currentBlogPath)
    if (currentBlogPath && categoryPath && (currentBlogPath == categoryPath) && isParentCategory) {
      console.log('ash cat true')
      return item.node.name
    }
  })

  useEffect(() => {

    setState({
      nav1: slider1.current,
    })

  }, [])

  useEffect(() => {
    console.log('load more', loadMore, hasMore);
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allPosts.length
      const nextResults = isMore
        ? allPosts.slice(currentLength, currentLength + 2)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const isMore = list.length < allPosts.length
    setHasMore(isMore)
  }, [list])


  function slickGoToslide(int) {
    slider1.current.slickGoTo(int);
  }
  console.log('ash category title', parentCategory)
  console.log('ash chosen', chosenFilter)
  return (
    <Layout>
      <div className={`container-fluid blog-category-page`}>
        <div className={`row d-none d-lg-block`}>
          <div className={`col-12`}>
            <div className={`blog-breadcrumb`}>
              <Link to="/">Home</Link>/
              <Link to="/blog-0">Blogs</Link>
              {parentCategory[0] ? <>/<Link to={parentCategory[0].node.path.alias ? parentCategory[0].node.path.alias : "#"} className={parentCategory[0].node.path.alias && (parentCategory[0].node.path.alias == props.path)? `active-breadcrumb` : ""}>{parentCategory[0].node.name}</Link></> : ""}
              {data.path.alias
               && parentCategory[0]
                && parentCategory[0].node.path.alias
                 && (parentCategory[0].node.path.alias != data.path.alias) ?
                  <>/<Link to={data.path.alias ? data.path.alias : "#"} className={data.path.alias && (data.path.alias == props.path)? `active-breadcrumb` : ""}>{data.name}</Link></> : ""}
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-10 offset-1`}>
            <h1 className={`blog-cat-title`}>{parentCategory[0] ? parentCategory[0].node.name : ""}</h1>
            {parentCategory[0] && parentCategory[0].node.description ? <div className={`blog-cat-desc`} dangerouslySetInnerHTML={{ __html: parentCategory[0].node.description.processed }}></div> : ""}
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-12 blog-cat-slider`}>
            <div style={{ width: "100%" }}>
              <Slider ref={slider => (slider1.current = slider)} {...SliderSetting}>
                {allData.edges.map((item, index) => {
                  {
                    console.log('ash props props', item)
                    if (item.node.relationships.taxonomy_term__blogs
                      && item.node.relationships.taxonomy_term__blogs[0]
                      && item.node.relationships.taxonomy_term__blogs[0].relationships
                      && item.node.relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs) {
                      console.log('ash props props true')
                      return (
                        <div><Link className={parentCategory[0] && parentCategory[0].node.path && (parentCategory[0].node.path.alias === item.node.path.alias) ? `active-blog` : ""} to={item.node.path.alias ? item.node.path.alias : "#"}>{item.node.name}</Link></div>
                      )
                    }
                  }
                })}
              </Slider>
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-12 col-lg-3 offset-lg-1 d-lg-none`} id="filterGroup">
            {parentCategory[0]
              && parentCategory[0].node.relationships
              && parentCategory[0].node.relationships.taxonomy_term__blogs
              && parentCategory[0].node.relationships.taxonomy_term__blogs[0] ?
              parentCategory[0].node.relationships.taxonomy_term__blogs.map((item, index) => {
                return (
                  <div className={`blog-filter`}>
                    {screenWidth < largeScreen ?
                      <button className="blog-filter-header collapsed" data-toggle="collapse" data-target={`#blogFilter${index}`} aria-expanded="false" aria-controls={`blogFilter${index}`}>
                        {item.name}
                      </button>
                      :
                      <div className="blog-filter-header">{item.name}</div>
                    }
                    <div id={screenWidth < largeScreen ? `blogFilter${index}` : ""} className={screenWidth < largeScreen ? "collapse blog-filter-body" : "blog-filter-body"} aria-labelledby={screenWidth < largeScreen ? `blogFilter${index}` : ""} data-parent="#filterGroup">
                      {item.relationships
                        && item.relationships.taxonomy_term__blogs
                        && item.relationships.taxonomy_term__blogs[0] ?
                        item.relationships.taxonomy_term__blogs.map((link, index) => {
                          // if(link.path.alias && (props.path == link.path.alias)) {setChosenFilter(link)}
                          return (
                            <Link className={link.path.alias && (props.path == link.path.alias) ? `active-filter` : ""} to={link.path.alias ? link.path.alias : "#"}>
                              <span dangerouslySetInnerHTML={{ __html: link.name }}></span>
                            </Link>
                          )
                        })
                        : ""}
                    </div>
                  </div>
                )
              })
              : ""}


          </div>

          <div className={`col-12 col-lg-6 offset-lg-1`}>
            <div className={`row`}>
              {data.relationships.node__blog_post ?
                <>{
                  list.map((item, index) => {
                    return (
                      <div className={`col-12 col-md-6`}>
                        <BlogCard
                          thumbnail={item.relationships
                            && item.relationships.field_blog_thumbnail
                            && item.relationships.field_blog_thumbnail.localFile
                            && item.relationships.field_blog_thumbnail.localFile.childImageSharp ?
                            item.relationships.field_blog_thumbnail.localFile.childImageSharp.fluid : ""}

                          type={item.field_blog_type ? item.field_blog_type : ""}
                          title={item.title ? item.title : ""}
                          url={item.path.alias ? item.path.alias : "#"}
                        />
                      </div>
                    )
                  })
                }
                  {hasMore ? (
                    <div className={`col-12`}>
                      <button className={`blog-load-more`} onClick={handleLoadMore}>Load More Posts</button>
                    </div>
                  ) : ""}
                </>
                :
                data.relationships.taxonomy_term__blogs
                  && data.relationships.taxonomy_term__blogs[0]
                  && data.relationships.taxonomy_term__blogs[0].relationships
                  && data.relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs
                  && data.relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs[0].relationships
                  && data.relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs[0].relationships.node__blog_post
                  && data.relationships.taxonomy_term__blogs[0].relationships.taxonomy_term__blogs[0].relationships.node__blog_post[0] ?
                  <>{list.map((item, index) => {
                    // return (
                    //   parent.relationships.taxonomy_term__blogs.map((blog, index) => {
                    //     return (
                    //       blog.relationships.node__blog_post.map((item, index) => {
                    return (
                      <div className={`col-12 col-md-6`}>
                        <BlogCard
                          thumbnail={item.relationships
                            && item.relationships.field_blog_thumbnail
                            && item.relationships.field_blog_thumbnail.localFile
                            && item.relationships.field_blog_thumbnail.localFile.childImageSharp ?
                            item.relationships.field_blog_thumbnail.localFile.childImageSharp.fluid : ""}

                          type={item.field_blog_type ? item.field_blog_type : ""}
                          title={item.title ? item.title : ""}
                          url={item.path.alias ? item.path.alias : "#"}
                        />
                      </div>
                    )
                    // })
                    //   )
                    // })
                    // )
                  })}
                    {hasMore ? (
                      <div className={`col-12`}>
                        <button className={`blog-load-more`} onClick={handleLoadMore}>Load More Posts</button>
                      </div>
                    ) : ""}
                  </>
                  : ""}
            </div>
          </div>
          <div className={`col-12 col-lg-3 offset-lg-1`}>
            <div className={`row`}>
              <div className={`col-12 d-none d-lg-block`}>
                {parentCategory[0]
                  && parentCategory[0].node.relationships
                  && parentCategory[0].node.relationships.taxonomy_term__blogs
                  && parentCategory[0].node.relationships.taxonomy_term__blogs[0] ?
                  parentCategory[0].node.relationships.taxonomy_term__blogs.map((item, index) => {
                    return (
                      <div className={`blog-filter`}>
                        {screenWidth < largeScreen ?
                          <button className="blog-filter-header collapsed" data-toggle="collapse" data-target="#blogFilter" aria-expanded="false" aria-controls="blogFilter">
                            {item.name}
                          </button>
                          :
                          <div className="blog-filter-header">{item.name}</div>
                        }
                        <div id={screenWidth < largeScreen ? "blogFilter" : ""} className={screenWidth < largeScreen ? "collapse blog-filter-body" : "blog-filter-body"} aria-labelledby={screenWidth < largeScreen ? "blogFilter" : ""}>
                          {item.relationships
                            && item.relationships.taxonomy_term__blogs
                            && item.relationships.taxonomy_term__blogs[0] ?
                            item.relationships.taxonomy_term__blogs.map((link, index) => {
                              return (
                                <Link className={link.path.alias && (props.path == link.path.alias) ? `active-filter` : ""} to={link.path.alias ? link.path.alias : "#"}>
                                  <span dangerouslySetInnerHTML={{ __html: link.name }}></span>
                                </Link>
                              )
                            })
                            : ""}
                        </div>
                      </div>
                    )
                  })
                  : ""}


              </div>

              <div className={`col-12`}>
                {parentCategory[0]
                  && parentCategory[0].node.relationships
                  && parentCategory[0].node.relationships.field_sidebar_image
                  && parentCategory[0].node.relationships.field_sidebar_image.localFile
                  && parentCategory[0].node.relationships.field_sidebar_image.localFile.childImageSharp ?
                  <div><Img fluid={parentCategory[0].node.relationships.field_sidebar_image.localFile.childImageSharp.fluid} /></div> : ""}

                {parentCategory[0] && parentCategory[0].node.field_sidebar_text ?
                  <div className={`sidebar-text`} dangerouslySetInnerHTML={{ __html: parentCategory[0].node.field_sidebar_text.processed }}></div> : ""}

                {parentCategory[0]
                  && parentCategory[0].node.field_sidebar_link
                  && parentCategory[0].node.field_sidebar_link.title ?
                  <div className={`sidebar-link`}><Link to={parentCategory[0].node.field_sidebar_link.uri ? parentCategory[0].node.field_sidebar_link.uri : "#"}>{parentCategory[0].node.field_sidebar_link.title}</Link></div>
                  : ""}

              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function useWindowSize() {

  // Initialize state with undefined width/height so server and client renders match

  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

  const [windowSize, setWindowSize] = useState({

    width: undefined

  });



  useEffect(() => {


    // Handler to call on window resize

    function handleResize() {

      // Set window width/height to state

      setWindowSize({

        width: window.innerWidth

      });

    }



    // Add event listener

    window.addEventListener("resize", handleResize);



    // Call handler right away so state gets updated with initial window size

    handleResize();



    // Remove event listener on cleanup

    return () => window.removeEventListener("resize", handleResize);

  }, []); // Empty array ensures that effect is only run on mount



  return windowSize;

}

export default BlogCategory;
export const pageQuery = graphql`
query($slug: String!) {
    allTaxonomyTermBlogs {
        edges {
          node {
            name
            description {
              processed
            }
            path {
              alias
            }
            field_sidebar_text {
              processed
            }
            field_sidebar_link {
              title
              uri
            }
            relationships {
              field_sidebar_image {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              taxonomy_term__blogs {
                name
                relationships {
                  taxonomy_term__blogs {
                    name
                    path {
                      alias
                    }
                  }
                }
              }
            }
          }
        }
        
      },
    taxonomyTermBlogs (fields: { slug: { eq: $slug } }){
      name
      path {
        alias
      }
      fields {
        slug
      }
      relationships {
        node__blog_post {
          title
        
          path {
            alias
          }
          field_blog_type
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
        taxonomy_term__blogs {
          name
          path {
            alias
          }
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
`;
