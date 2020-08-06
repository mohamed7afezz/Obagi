import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import solutionsStyles from '../assets/scss/components/solutions.module.scss'

const Solutions = ({ node }) => {

    return (
        <div className={solutionsStyles.wrapper}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-lg-none">
                        <div className={solutionsStyles.containerWrapper}>
                            {node.field_solutions_paragraph_title ? <div dangerouslySetInnerHTML={{ __html: node.field_solutions_paragraph_title.processed }} className={solutionsStyles.title}></div> : ''}
                            {node.relationships.field_solution_box ? node.relationships.field_solution_box.map((item, index) => {
                                return (
                                    <div>
                                        <Link to={item.field_solution_link.uri} className={solutionsStyles.solutionWrapper}>
                                            {item.relationships.field_problem_icon ? (item.relationships.field_problem_icon.localFile ? <div className={solutionsStyles.iconWrapper}><Img fixed={item.relationships.field_problem_icon.localFile.childImageSharp.fixed} /></div> : '') : ''}
                                            {item.field_solution_name ? <div dangerouslySetInnerHTML={{ __html: item.field_solution_name.processed }} className={solutionsStyles.solution}></div> : ''}
                                        </Link>
                                    </div>
                                )
                            }) : ''}
                            {node.field_solutions_paragraph_button ? <div className={solutionsStyles.linkSection}><Link to={node.field_solutions_paragraph_button.uri} className={["button-link", solutionsStyles.link].join(" ")}>{node.field_solutions_paragraph_button.title}</Link></div> : ''}
                        </div>
                    </div>

                    {/*********** DESKTOP ***********/}

                    <div className="col-lg-5 pl-0 offset-lg-1 d-none d-lg-block">
                            {node.field_solutions_paragraph_title ? <div dangerouslySetInnerHTML={{ __html: node.field_solutions_paragraph_title.processed }} className={solutionsStyles.title}></div> : ''}
                            {node.field_solutions_paragraph_button ? <div className={solutionsStyles.linkSection}><Link to={node.field_solutions_paragraph_button.uri} className={["button-link", solutionsStyles.link].join(" ")}>{node.field_solutions_paragraph_button.title}</Link></div> : ''}
                    </div>

                    <div className="col-lg-4 offset-lg-1 d-none d-lg-block">
                        {node.relationships.field_solution_box ? node.relationships.field_solution_box.map((item, index) => {
                            return (
                                <div>
                                    <Link to={item.field_solution_link.uri} className={solutionsStyles.solutionWrapper}>
                                        {item.relationships.field_problem_icon ? (item.relationships.field_problem_icon.localFile ? <div className={solutionsStyles.iconWrapper}><Img fixed={item.relationships.field_problem_icon.localFile.childImageSharp.fixed} /></div> : '') : ''}
                                        <div className={solutionsStyles.arrow}></div>
                                        {item.field_solution_name ? <div dangerouslySetInnerHTML={{ __html: item.field_solution_name.processed }} className={solutionsStyles.solution}></div> : ''}
                                    </Link>
                                </div>
                            )
                        }) : ''}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Solutions

export const fragment = graphql`
    fragment paragraphSolutions on paragraph__solutions {
        id
        field_solutions_paragraph_title {
            processed
          }
          field_solutions_paragraph_button {
            title
            uri
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
                                fixed {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
                }
          }
    }`