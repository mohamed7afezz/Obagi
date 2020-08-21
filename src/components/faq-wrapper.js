import React from 'react'
import { graphql } from 'gatsby'
import faqStyles from '../assets/scss/components/faq-wrapper.module.scss'
import Paginator from './paginator'
import FaqRow from './faq-row'

const FaqWrapper = ({ node }) => {

  // console.log('node', node.relationships.field_faq_section)


  // let list = node.relationships.field_faq_section;
  // let pageList = new Array();
  // let currentPage = 1;
  // let numberPerPage = 2;
  // let numberOfPages = 3;

  // function load() {
  //   getNumberOfPages();
  //   loadList();
  // }
  // function getNumberOfPages() {
  //   return Math.ceil(list.length / numberPerPage);
  // }
  // function nextPage() {
  //   currentPage += 1;
  //   loadList();
  // }
  // function previousPage() {
  //   currentPage -= 1;
  //   loadList();
  // }
  // function firstPage() {
  //   currentPage = 1;
  //   loadList();
  // }
  // function lastPage() {
  //   currentPage = numberOfPages;
  //   loadList();
  // }
  // function loadList() {
  //   var begin = ((currentPage - 1) * numberPerPage);
  //   var end = begin + numberPerPage;

  //   pageList = list.slice(begin, end);
  //   drawList();    // draws out our data
  //   check();         // determines the states of the pagination buttons
  // }
  // function drawList() {
  //   document.getElementById("list").innerHTML = "";

  //   for (let r = 0; r < pageList.length; r++) {
  //     document.getElementById("list").innerHTML += pageList[r] + "";
  //   }
  // }
  // function check() {
  //   document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
  //   document.getElementById("previous").disabled = currentPage == 1 ? true : false;
  //   document.getElementById("first").disabled = currentPage == 1 ? true : false;
  //   document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
  // }

  // window.addEventListener('load', load);

  // console.log("list", list);

  return (
    <div className={faqStyles.wrapper}>
      <div className="container-fluid faq-wrapper">
        <div className="row">
          <div className="col-12 col-lg-9 offset-lg-2">
            <div id="list">
              {node.relationships.field_faq_section ?
                <Paginator pagerData={node.relationships.field_faq_section} rowComponent={FaqRow} rowsPerPage={2} />
                : ''}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


export default FaqWrapper

export const fragment = graphql`
    fragment paragraphFaqWrapper on paragraph__faq_wrapper {
        id
        relationships {
            field_faq_section {
              field_faq_title {
                processed
              }
              relationships {
                field_question_and_answer {
                  field_question_title {
                    processed
                  }
                  field_answer {
                    processed
                  }
                }
              }
            }
          }
    }`