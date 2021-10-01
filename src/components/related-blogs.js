import React from 'react'
import { graphql } from 'gatsby'
import Slider from "react-slick"
import BlogCard from '../components/blog-card';


const RelatedBlogs = ({ node }) => {

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
    return <>

        <div className={`container-fluid`}>
            <div className={`row related-articles related-blogs`}>
                <div className="col-12 col-lg-10 offset-lg-1">
                    {node.field_related_blogs_header ? <div dangerouslySetInnerHTML={{ __html: node.field_related_blogs_header.processed }} className={`related-blogs-header`}></div> : ""}
                </div>
                <div className={`col-12 col-lg-11 offset-lg-1 related-col`}>

                    <div style={{ width: "100%" }}>
                        <Slider {...SliderSetting2}>
                            {node.relationships && node.relationships.field_article ?
                                node.relationships.field_article.map((item, index) => {

                                    return (
                                        <BlogCard
                                            title={item.title}
                                            url={item.path.alias ? item.path.alias : "#"}
                                            type={item.field_blog_type ? item.field_blog_type : ""}
                                            thumbnail={item.relationships
                                                && item.relationships.field_blog_thumbnail
                                                && item.relationships.field_blog_thumbnail.localFile
                                                && item.relationships.field_blog_thumbnail.localFile.childImageSharp ?
                                                item.relationships.field_blog_thumbnail.localFile.childImageSharp.gatsbyImageData : ""}
                                        />
                                    );

                                }) : ""}
                        </Slider>
                    </div>
                </div>
            </div>

        </div>
    </>;
}


export default RelatedBlogs

export const fragment = graphql`fragment paragraphRelatedBlogs on paragraph__related_blogs {
  id
  field_related_blogs_header {
    processed
  }
  relationships {
    field_article {
      title
      field_blog_type
      path {
        alias
      }
      relationships {
        field_blog_thumbnail {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
}
`