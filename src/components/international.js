import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import internationalStyles from '../assets/scss/components/international.module.scss'
import $ from 'jquery'

const International = ({ node }) => {

    // function removeCollapse () {
    //     if (document.readyState === 'complete') {     
    //         $(".international h3 a").off();     
    //     } else {
    //         setTimeout(function() {
    //             removeCollapse();
    //         }, 50);
    //     }
    // }

    $(window).on('resize', function () {
        if ($(window).width() < 992) {
            $(".international h3").next( ".international div div div div div" ).slideUp();
            $(".international h3" ).on('click', function() {
                $(this).next( ".international div div div div div" ).slideToggle( "slow" );
              });
              console.log("ashhh", $( ".international h3" ), $(".international h3" ).next( ".international div div div div div" ));
        } else {
            
                $(".international h3").next( ".international div div div div div" ).slideDown();
                setTimeout(function () {
                    $(".international h3").off();
                }, 1000 )
            
        }
    });
 
    return (
        <div className={["container-fluid international", internationalStyles.wrapper].join(" ")}>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-auto">
                    {node.field_first_column ? <div className={internationalStyles.columnWrapper} dangerouslySetInnerHTML={{ __html: node.field_first_column.processed }}></div> : ""}
                </div>
                <div className="col-12 col-lg-auto">
                    {node.field_second_column ? <div className={internationalStyles.columnWrapper} dangerouslySetInnerHTML={{ __html: node.field_second_column.processed }}></div> : ""}
                </div>
                <div className="col-12 col-lg-auto">
                    {node.field_third_column ? <div className={internationalStyles.columnWrapper} dangerouslySetInnerHTML={{ __html: node.field_third_column.processed }}></div> : ""}
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