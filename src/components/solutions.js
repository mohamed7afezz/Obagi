import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import * as solutionsStyles from '../assets/scss/components/solutions.module.scss'

const Solutions = ({ node }) => {
    function fixlink(changelink) {

        
        return ( changelink.uri.replace('internal:', '') )
  }
    return (
        <div className={[solutionsStyles.wrapper, "container-fluid"].join(" ")}>
            <div className="row">
                <div className="col-12 d-lg-none">
                    <div className={solutionsStyles.containerWrapper}>
                        {node.field_solutions_paragraph_title ? <p dangerouslySetInnerHTML={{ __html: node.field_solutions_paragraph_title.processed }} className={solutionsStyles.title}></p> : ''}
                        {node.field_solutions_paragraph?<div dangerouslySetInnerHTML={{ __html: node.field_solutions_paragraph.processed }} className={solutionsStyles.describtion}></div>:""}
                        {node.relationships.field_solution_box ? node.relationships.field_solution_box.map((item, index) => {
                            return (
                                <div>
                                    <Link to={fixlink(item.field_solution_link)} className={solutionsStyles.solutionWrapper}>
                                        {item.relationships.field_problem_icon ? (item.relationships.field_problem_icon.localFile ? <div className={solutionsStyles.iconWrapper}><GatsbyImage
                                            image={item.relationships.field_problem_icon.localFile.childImageSharp.gatsbyImageData}
                                            alt="img" /></div> : '') : ''}
                                        {item.field_solution_name ? <div dangerouslySetInnerHTML={{ __html: item.field_solution_name.processed }} className={solutionsStyles.solution}></div> : ''}
                                    </Link>
                                </div>
                            );
                        }) : ''}
                        {node.field_solutions_paragraph_button ? <div className={solutionsStyles.linkSection}><Link to={fixlink(node.field_solutions_paragraph_button)} className={["button-link", solutionsStyles.link].join(" ")}>{node.field_solutions_paragraph_button.title}</Link></div> : ''}
                    </div>
                </div>

                {/*********** DESKTOP ***********/}

                <div className="col-lg-5 pl-0 offset-lg-1 d-none d-lg-block">
                        {node.field_solutions_paragraph_title ? <h2 dangerouslySetInnerHTML={{ __html: node.field_solutions_paragraph_title.processed }} className={solutionsStyles.title}></h2> : ''}
                        {node.field_solutions_paragraph?<div dangerouslySetInnerHTML={{ __html: node.field_solutions_paragraph.processed }} className={solutionsStyles.describtion}></div>:""}
                        {node.field_solutions_paragraph_button ? <div className={solutionsStyles.linkSection}><Link to={fixlink(node.field_solutions_paragraph_button)} className={["button-link", solutionsStyles.link].join(" ")}>{node.field_solutions_paragraph_button.title}</Link></div> : ''}
                </div>

                <div className="col-lg-4 offset-lg-1 d-none d-lg-block">
                    {node.relationships.field_solution_box ? node.relationships.field_solution_box.map((item, index) => {
                        return (
                            <div>
                                <Link to={fixlink(item.field_solution_link)} className={solutionsStyles.solutionWrapper}>
                                    {item.relationships.field_problem_icon ? (item.relationships.field_problem_icon.localFile ? <div className={solutionsStyles.iconWrapper}><GatsbyImage
                                        image={item.relationships.field_problem_icon.localFile.childImageSharp.gatsbyImageData}
                                        alt="img" /></div> : '') : ''}
                                    <div className={solutionsStyles.arrow}></div>
                                    {item.field_solution_name ? <div dangerouslySetInnerHTML={{ __html: item.field_solution_name.processed }} className={solutionsStyles.solution}></div> : ''}
                                </Link>
                            </div>
                        );
                    }) : ''}
                </div>

            </div>
        </div>
    );
}

export default Solutions

export const fragment = graphql`fragment paragraphSolutions on paragraph__solutions {
  id
  field_solutions_paragraph_title {
    processed
  }
  field_solutions_paragraph_button {
    title
    uri
  }
  field_solutions_paragraph {
    processed
  }
  relationships {
    field_solution_box {
      field_solution_name {
        processed
      }
      field_solution_link {
        uri
      }
      relationships {
        field_problem_icon {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FIXED)
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
`