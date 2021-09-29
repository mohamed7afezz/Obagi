import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import * as internationalStyles from '../assets/scss/components/international.module.scss'
import $ from 'jquery'

const International = ({ node }) => {

    useEffect(() => {
        toggleCollapse();

    }, [])

    function toggleCollapse() {
        if ($(window).width() < 992) {
            $(".international h3").next(".international div div div div div").slideUp();
            $(".international h3").off();

            $(".international h3").on('click', function () {
   

                $(this).next(".international div div div div div").slideToggle("slow");
                $(this).toggleClass(internationalStyles.open);
            });
        } else {

            $(".international h3").next(".international div div div div div").slideDown();
            setTimeout(function () {
                $(".international h3").off();
            }, 500)

        }
    }
    if (typeof window !== "undefined") {
        $(window).on('resize', function () {
            toggleCollapse();
        });
    }


    return (
        <div className={["container-fluid international", internationalStyles.wrapper].join(" ")}>
            <div className="row">
                <div className="col-12 col-lg-10 offset-lg-1">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            {node.field_first_column ? <div className={internationalStyles.columnWrapper} dangerouslySetInnerHTML={{ __html: node.field_first_column.processed }}></div> : ""}
                        </div>
                        <div className="col-12 col-lg-4">
                            {node.field_second_column ? <div className={internationalStyles.columnWrapper} dangerouslySetInnerHTML={{ __html: node.field_second_column.processed }}></div> : ""}
                        </div>
                        <div className="col-12 col-lg-4">
                            {node.field_third_column ? <div className={internationalStyles.columnWrapper} dangerouslySetInnerHTML={{ __html: node.field_third_column.processed }}></div> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default International

export const fragment = graphql`
    fragment paragraphInternational on paragraph__international {
        id
        field_first_column {
            processed
        }
        field_second_column {
            processed
        }
        field_third_column {
            processed
        }
    }`