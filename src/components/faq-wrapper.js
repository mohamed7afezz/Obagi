import React from 'react'
import { graphql } from 'gatsby'
import faqStyles from '../assets/scss/components/faq-wrapper.module.scss'

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
                node.relationships.field_faq_section.map((item, index, array) => {
                  return (
                    <div className={index == node.relationships.field_faq_section.length - 1 ? faqStyles.lastSection : ''}>
                      {item.field_faq_title ? <div dangerouslySetInnerHTML={{ __html: item.field_faq_title.processed }} className={faqStyles.title}></div> : ''}

                      {item.relationships.field_question_and_answer ? item.relationships.field_question_and_answer.map((item, index, array) => {
                        return (
                          <div id={"accordion" + index} className={index == array.length - 1 ? faqStyles.qaWrapper + ' ' + faqStyles.lastQaWrapper : faqStyles.qaWrapper}>
                            <div className="row">
                              <div className="col-11">
                                <div className={index == array.length - 1 ? faqStyles.quesWrapper + ' ' + faqStyles.lastQWrapper : faqStyles.quesWrapper}>
                                  {item.field_question_title ? <a data-toggle="collapse" href={"#collapse" + index} role="button" aria-expanded={index == 0 ? "true" : "false"} aria-controls={"collapse" + index} className={index ==0? faqStyles.question : faqStyles.question + ' collapsed'}><div dangerouslySetInnerHTML={{ __html: item.field_question_title.processed }}></div></a> : ''}
                                </div>

                                {item.field_answer ? <div dangerouslySetInnerHTML={{ __html: item.field_answer.processed }} className={index == 0 ? faqStyles.answer + " collapse show" : faqStyles.answer + " collapse"} id={"collapse" + index}></div> : ''}
                              </div>
                            </div>
                            <a className={index== 0? faqStyles.sign + " faq-sign" : faqStyles.sign + " faq-sign collapsed"} data-toggle="collapse" href={"#collapse" + index} role="button" aria-expanded={index == 0 ? "true" : "false"} aria-controls={"collapse" + index}></a>
                          </div>
                        )
                      }) : ''}


                    </div>
                  )
                })
                : ''}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
                {/* 
                <input type="button" id="first" onclick={() => firstPage()} value="first" />
                <input type="button" id="next" onclick={() => nextPage()} value="next" />
                <input type="button" id="previous" onclick={() => previousPage()} value="previous" />
                <input type="button" id="last" onclick={() => lastPage()} value="last" /> */}
              </ul>
            </nav>
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