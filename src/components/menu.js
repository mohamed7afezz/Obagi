import React, { useContext, useState, useEffect } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import PropTypes, { func } from "prop-types";
import footerStyles from '../assets/scss/components/footer.module.scss'
import UserContext from '../providers/user-provider'

// const $ = require(jQuery);
//  onClick={_onHeaderClick}

// function parentHasClass(element, classname) {
//   if (element.className.split(' ').indexOf(classname)>=0) return true;
//   return element.parentNode && parentHasClass(element.parentNode, classname);

// }

function addStyles(e) {
  if (e.target.closest(".extended-nav > ul > li > .submenu > li > a")) {

    document.querySelectorAll(".extended-nav .submenu a").forEach(Elem => Elem.classList.add("not-selected"));

    let selected = e.target.closest(".extended-nav > ul > li > .submenu > li > a");

    selected.classList.remove("not-selected");
    selected.classList.add("selected");
  }


}

function removeStyles() {
  document.querySelectorAll(".extended-nav .submenu a").forEach(Elem => Elem.classList.remove("selected"));
  document.querySelectorAll(".extended-nav .submenu a").forEach(Elem => Elem.classList.remove("not-selected"));
}

function addMainStyles(e) {


  if (e.target.closest(".extended-nav > ul > li > a")) {
    document.querySelectorAll(".extended-nav ul li a").forEach(Elem => Elem.classList.add("not-selected"));
    document.querySelector(".extended-nav ul > span").classList.add("not-selected");


    document.querySelectorAll(".extended-nav ul li .submenu li a").forEach(Elem => Elem.classList.remove("not-selected"));

    let selected = e.target.closest(".extended-nav > ul > li > a");
    selected.classList.remove("not-selected");
    selected.classList.add("hovered");

  }

  if (e.target.closest(".extended-nav > ul > span")) {

    document.querySelectorAll(".extended-nav ul li a").forEach(Elem => Elem.classList.add("not-selected"));
    document.querySelector(".extended-nav ul > span").classList.add("not-selected");

    let selectedSpan = e.target.closest(".extended-nav > ul > span");
    selectedSpan.classList.remove("not-selected");
    selectedSpan.classList.add("hovered");
  }

}

function removeMainStyles() {
  document.querySelectorAll(".extended-nav ul li a").forEach(Elem => Elem.classList.remove("hovered"));
  document.querySelectorAll(".extended-nav ul li a").forEach(Elem => Elem.classList.remove("not-selected"));

  document.querySelectorAll(".extended-nav ul > span").forEach(Elem => Elem.classList.remove("hovered"));
  document.querySelectorAll(".extended-nav ul > span").forEach(Elem => Elem.classList.remove("not-selected"));
}

function addOverview(e) {
  var medicalLink = document.querySelector("a#medicalLink");
  var clinicalLink = document.querySelector("a#clinicalLink");

  var medicalOV = document.getElementById("overview-medicalLink");
  var clinicalOV = document.getElementById("overview-clinicalLink")

  document.querySelector(".mob-menu-lower-section").classList.toggle("d-none");

  if (e.currentTarget === medicalLink) {
    if (medicalOV.style.display === "none") {
      medicalOV.style.display = "inline-block";
    } else {
      medicalOV.style.display = "none";
    }
    medicalLink.parentElement.classList.toggle("medical-menu-link");
  } else if (e.currentTarget === clinicalLink) {
    if (clinicalOV.style.display === "none") {
      clinicalOV.style.display = "inline-block";
    } else {
      clinicalOV.style.display = "none";
    }
    clinicalLink.parentElement.classList.toggle("clinical-menu-link");
    clinicalLink.parentElement.previousSibling.classList.toggle("d-none");


  }

}


function createMenuHierarchy(menuData, menuName) {
  let tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0, len = menuData.length; i < len; i++) {
    arrElem = menuData[i].node
    if (arrElem.menu_name === menuName && arrElem.enabled === true) {
      mappedArr[arrElem.drupal_id] = arrElem
      if (arrElem.drupal_parent_menu_item != null && arrElem.drupal_parent_menu_item.includes(arrElem.bundle)) {
        let stripped_drupal_id = arrElem.drupal_parent_menu_item.replace(arrElem.bundle + ':', '')
        mappedArr[arrElem.drupal_id].drupal_parent_menu_item = stripped_drupal_id
      }
      mappedArr[arrElem.drupal_id]['children'] = []
    }
  }

  for (let id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id]
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.drupal_parent_menu_item) {
        if (mappedArr[mappedElem.drupal_parent_menu_item] == undefined) {
   
        }
        mappedArr[mappedElem.drupal_parent_menu_item]['children'].push(mappedElem)
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem)
      }
    }
  }
  return tree
}



function buildLink(link, itemId, collapseTarget, isExpandable) {

  if (isExpandable == false) {
    return (<Link to={link.link.uri.replace('internal:', '')}>
      <span dangerouslySetInnerHTML={{ __html: link.title }}></span>
    </Link>)
  } else if (!collapseTarget && itemId) {
    if(link.link.uri=="internal:#"){
      return (
      <a className="single-tab" href="#" id={itemId} onMouseEnter={(e) => { addStyles(e); addMainStyles(e); }} onMouseLeave={() => { removeStyles(); removeMainStyles(); }}>
        <span dangerouslySetInnerHTML={{ __html: link.title }}></span>
      </a>)
    }else{
      return (
      <Link className="single-tab" to={link.link.uri.replace('internal:', '')} id={itemId} onMouseEnter={(e) => { addStyles(e); addMainStyles(e); }} onMouseLeave={() => { removeStyles(); removeMainStyles(); }}>
        <span dangerouslySetInnerHTML={{ __html: link.title }}></span>
      </Link>)
    }
  }
  else if (itemId && collapseTarget && isExpandable) {

    if (link.link.uri.replace('internal:', '') === '/medical' || link.link.uri.replace('internal:', '') === '/clinical') {
      let linkName = link.link.uri.replace('internal:', '').slice(1) + "Link";
      return (
        <>
          <a className="collapsed" data-toggle="collapse" href={collapseTarget} role="button" aria-expanded="false" aria-controls={collapseTarget} id={linkName} onClick={(e) => { addOverview(e); }}>
            <span dangerouslySetInnerHTML={{ __html: link.title }}></span>
          </a>
          {link.expanded == true ? <Link to={link.link.uri.replace('internal:', '')} className="overview" id={"overview-" + linkName} style={{ display: "none" }}>Overview</Link> : ''}
        </>
      )
    } else {
      return (
        <>
          <a data-toggle="collapse" href={collapseTarget} role="button" aria-expanded="false" aria-controls={collapseTarget}>
            <span dangerouslySetInnerHTML={{ __html: link.title }}></span>

          </a>
          {/* <span className=""> */}
          <a className="collapsed link-arrow" data-toggle="collapse" href={collapseTarget} role="button" aria-expanded="false" aria-controls={collapseTarget}></a>
          {/* </span> */}
        </>
      )
    }
  } else {
    return (
      <>
        <a className="collapsed" data-toggle="collapse" href={collapseTarget} role="button" aria-expanded="false" aria-controls={collapseTarget}>
          <span dangerouslySetInnerHTML={{ __html: link.title }}></span>
        </a>
      </>
    )
  }

  // if (!link.external && link.link.uri) {
  //   return (<Link activeClassName="active" to={link.link.uri}>
  //     {link.title}
  //   </Link>)
  // } else if (!link.external && link.link.uri.includes('internal:')) {
  //   return (<Link activeClassName="active" to={link.link.uri.replace('internal:', '')}>
  //     {link.title}
  //   </Link>)
  // } else {
  //   return (<a href={link.link.uri} className={'external'}>
  //     {link.title}
  //   </a>)
  // }

}



// function _onHeaderClick(event) {
//   event.preventDefault();
//   $(event.currentTarget).siblings().toggle();
// }

function buildMenu(menuArray, isExpandable, menuName) {


  if (!menuArray) {
    return
  }
  let menu = []
  for (let item in menuArray) {
    if (menuArray[item].children.length !== 0) {
      // className={isExpandable == true? "collapsed" : ''} data-toggle={isExpandable == true? "collapse" : ''} href={isExpandable == true? collapseTarget : ''} role={isExpandable == true? "button" : ''} aria-expanded={isExpandable == true? "false" : ''} aria-controls={isExpandable == true?  collapseTarget : ''}
      menu.push(
        <li key={menuArray[item].drupal_id}>
          {

            menuName == 'main-nav-mobile' ?
              buildLink(menuArray[item], "itemLink" + menuArray[item].drupal_id, "#menuItem" + menuArray[item].drupal_id, isExpandable)
              :
              ((menuName == 'first-footer' && isExpandable === true) || (menuName == 'second-footer' && isExpandable === true) || (menuName == 'third-footer' && isExpandable === true) || (menuName == 'fourth-footer' && isExpandable === true)) ?
                buildLink(menuArray[item], "itemLink" + menuArray[item].drupal_id, "#menuItem" + menuArray[item].drupal_id)
                :
                ((menuName == 'first-footer' && isExpandable === false) || (menuName == 'second-footer' && isExpandable === false) || (menuName == 'third-footer' && isExpandable === false) || (menuName == 'fourth-footer' && isExpandable === false)) ?
                  <span className="single-tab">{menuArray[item].title}</span>
                  :
                  buildLink(menuArray[item], "itemLink" + menuArray[item].drupal_id)
          }
          <ul className={"submenu " + (isExpandable === true ? 'collapse ' : ' ')} id={(isExpandable === true ? "menuItem" + menuArray[item].drupal_id : menuArray[item].drupal_id)}>
            {buildMenu(menuArray[item].children, true, menuName)}
            {typeof window !== "undefined" && menuName === "third-footer" && isExpandable === true ? <span id="extole_zone_mobile_footer" className="footer-referral-span"></span>
              : typeof window !== "undefined" && menuName === "third-footer" && isExpandable === false ? <span id="extole_zone_global_footer" className="footer-referral-span"></span>
                : ""}
            {menuName === "fourth-footer" ? <>
            <li><Link className="single-tab" to="/my-account/orders">
              My Account
            </Link></li>
            <li><span data-acsb-custom-trigger="true" className="AccessiBe">Accessibility </ span></li>
            </> : ""}
          </ul>
        </li>)
    } else {
      menu.push(<li key={menuArray[item].drupal_id}>{buildLink(menuArray[item], "itemLink" + menuArray[item].drupal_id)}</li>)
    }
  }

  return menu

};

function generateMenu(menuLinks, menuName, isExpandable) {
  let menu

  menu = createMenuHierarchy(menuLinks.allMenuLinkContentMenuLinkContent.edges, menuName)
  menu = buildMenu(menu, isExpandable, menuName)
  return menu
}

const Menu = ({ menuName, menuClass, isExpandable }) => {

  const { user } = useContext(UserContext);


  useEffect(() => {
    if (typeof window !== "undefined") {
      (function (c, e, k, l, a) {
        c[e] = c[e] || {}; for (c[e].q = c[e].q || []; a < l.length;)k(l[a++], c[e])
      })(window, "extole", function (c, e) { e[c] = e[c] || function () { e.q.push([c, arguments]) } }, ["createZone"], 0);
      window.extole.createZone({
        name: 'global_header',
        element_id: 'extole_zone_global_header',
        data: {
          "partner_user_id": user ? user.id : "", // RECOMMENDED IF AVAILABLE
          "email": user ? user.email : "", // RECOMMENDED IF AVAILABLE
          "first_name": user ? user.first_name : "", // RECOMMENDED IF AVAILABLE
          "last_name": user ? user.last_name : "" // RECOMMENDED IF AVAILABLE
        }
      });

      (function (c, b, f, k, a) { c[b] = c[b] || {}; for (c[b].q = c[b].q || []; a < k.length;)f(k[a++], c[b]) })(window, "extole", function (c, b) { b[c] = b[c] || function () { b.q.push([c, arguments]) } }, ["createZone"], 0);
      window.extole.createZone({
        name: "global_footer",
        element_id: 'extole_zone_global_footer',
        data: {
          "partner_user_id": user ? user.id : "", // RECOMMENDED IF AVAILABLE
          "email": user ? user.email : "", // RECOMMENDED IF AVAILABLE
          "first_name": user ? user.first_name : "", // RECOMMENDED IF AVAILABLE
          "last_name": user ? user.last_name : "" // RECOMMENDED IF AVAILABLE
        }
      });

      (function (c, b, f, k, a) { c[b] = c[b] || {}; for (c[b].q = c[b].q || []; a < k.length;)f(k[a++], c[b]) })(window, "extole", function (c, b) { b[c] = b[c] || function () { b.q.push([c, arguments]) } }, ["createZone"], 0);
      window.extole.createZone({
        name: "mobile_footer",
        element_id: 'extole_zone_mobile_footer',
        data: {
          "partner_user_id": user ? user.id : "", // RECOMMENDED IF AVAILABLE
          "email": user ? user.email : "", // RECOMMENDED IF AVAILABLE
          "first_name": user ? user.first_name : "", // RECOMMENDED IF AVAILABLE
          "last_name": user ? user.last_name : "" // RECOMMENDED IF AVAILABLE
        }
      });

      (function (c, b, f, k, a) { c[b] = c[b] || {}; for (c[b].q = c[b].q || []; a < k.length;)f(k[a++], c[b]) })(window, "extole", function (c, b) { b[c] = b[c] || function () { b.q.push([c, arguments]) } }, ["createZone"], 0);
      window.extole.createZone({
        name: "mobile_menu",
        element_id: 'extole_zone_mobile_menu',
        data: {
          "partner_user_id": user ? user.id : "", // RECOMMENDED IF AVAILABLE
          "email": user ? user.email : "", // RECOMMENDED IF AVAILABLE
          "first_name": user ? user.first_name : "", // RECOMMENDED IF AVAILABLE
          "last_name": user ? user.last_name : "" // RECOMMENDED IF AVAILABLE
        }
      });

    }

  }, []);

  return (

    <StaticQuery
      query={
        graphql`
        query MenuQuery {
          allMenuLinkContentMenuLinkContent(sort: {order: ASC, fields: weight}) {
            edges {
              node {
                enabled
                title
                expanded
                external
                langcode
                weight
                link {
                  uri
                }
                drupal_parent_menu_item
                bundle
                drupal_id
                menu_name
              }
            }
          }
        }
      `
      }

      render={data => (
        <nav className={menuName, menuClass}>
          <ul >
            {generateMenu(data, menuName, isExpandable)}
            {typeof window !== "undefined" && (menuName === 'clinical-navigation' || menuName === 'medical-navigation') ? <span id="extole_zone_global_header" className="header-referral-span" onMouseEnter={(e) => { addMainStyles(e); }} onMouseLeave={() => { removeMainStyles(); }}></span> : ""}

          </ul>
        </nav>

      )}
    />
  )
}



Menu.propTypes = {
  menuName: PropTypes.string,
  menuClass: PropTypes.string,
  isExpandable: PropTypes.bool,
}

Menu.defaultProps = {
  menuName: `main`,
}

export default Menu
