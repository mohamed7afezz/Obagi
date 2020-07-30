import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import blogStyles from '../assets/scss/components/blog.module.scss'


const Blog = ({ node }) => {

    console.log('node',node.relationships.field_card)
    function expand() {
        let moreText = document.getElementById("blog-more");
        let btnText = document.getElementById("readBtn");

        if (moreText.style.display === "none") {
            btnText.innerHTML = "Read less";
            moreText.style.display = "inline";
        } else {
            btnText.innerHTML = "Read more";
            moreText.style.display = "none";
        }
    }

    return (
        <div>
            <div className={blogStyles.wrapper}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {node.field_blog_title ? <div dangerouslySetInnerHTML={{ __html: node.field_blog_title.processed }} className={blogStyles.title}></div> : ''}
                            {node.field_blog_subtitle ? <div dangerouslySetInnerHTML={{ __html: node.field_blog_subtitle.processed }} className={blogStyles.subtitle}></div> : ''}
                        </div>
                    </div>
                    <div className="row">
                        {node.relationships.field_card.map((item) => {
                            return (
                                <div className="col-12 col-lg-3">
                                    {item.relationships.field_card_image.localFile ? <div className={blogStyles.cardImage}><Img fluid={item.relationships.field_card_image.localFile.childImageSharp.fluid} /></div> : ''}
                                    {item.field_card_title ? <div dangerouslySetInnerHTML={{ __html: item.field_card_title.processed }} className={blogStyles.cardTitle}></div> : ''}
                                    {item.field_card_description ?
                                        <div className={blogStyles.cardDesc}>
                                            <span dangerouslySetInnerHTML={{ __html: item.field_card_description.processed + ' ' }}></span>
                                            {item.field_card_complete_description ? <span dangerouslySetInnerHTML={{ __html: item.field_card_complete_description.processed }} id="blog-more"></span> : ''}
                                        </div>
                                        : ''}
                                    <button type="button" id="readBtn" className={blogStyles.readMore} onClick={(e) => { expand(e); }}>Read More</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog

export const fragment = graphql`
    fragment paragraphBlog on paragraph__blog {
        id
        field_blog_title {
          processed
        }
        field_blog_subtitle {
          processed
        }
        relationships {
            field_card {
                field_card_title {
                processed
                }
                field_card_description {
                processed
                }
                field_card_complete_description {
                processed
                }
                relationships {
                    field_card_image {
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
    }`