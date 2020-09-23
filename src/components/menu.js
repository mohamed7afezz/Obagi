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
    document.querySelectorAll(".extended-nav ul li .submenu li a").forEach(Elem => Elem.classList.remove("not-selected"));
    let selected = e.target.closest(".extended-nav > ul > li > a");
    selected.classList.remove("not-selected");
    selected.classList.add("hovered");
  }

}

function removeMainStyles() {
  document.querySelectorAll(".extended-nav ul li a").forEach(Elem => Elem.classList.remove("hovered"));
  document.querySelectorAll(".extended-nav ul li a").forEach(Elem => Elem.classList.remove("not-selected"));
}

function addOverview(e) {
  var medicalLink = document.getElementById("medicalLink");
  var clinicalLink = document.getElementById("clinicalLink");

  var medicalOV = document.getElementById("overview-medicalLink");
  var clinicalOV = document.getElementById("overview-clinicalLink")

  if (e.target === medicalLink) {
    if (medicalOV.style.display === "none") {
      medicalOV.style.display = "inline-block";
    } else {
      medicalOV.style.display = "none";
    }
  } else if (e.target === clinicalLink) {
    if (clinicalOV.style.display === "none") {
      clinicalOV.style.display = "inline-block";
    } else {
      clinicalOV.style.display = "none";
    }
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
      {link.title}
    </Link>)
  } else {
    if (!collapseTarget && itemId) {
      return (<Link className="single-tab" to={link.link.uri.replace('internal:', '')} id={itemId} onMouseEnter={(e) => { addStyles(e); addMainStyles(e); }} onMouseLeave={() => { removeStyles(); removeMainStyles(); }}>
        {link.title}
      </Link>)
    }
    else if (itemId && collapseTarget && isExpandable) {

      if (link.link.uri.replace('internal:', '') === '/medical' || link.link.uri.replace('internal:', '') === '/clinical') {
        let linkName = link.link.uri.replace('internal:', '').slice(1) + "Link";
        return (
          <>
            <a className="collapsed" data-toggle="collapse" href={collapseTarget} role="button" aria-expanded="false" aria-controls={collapseTarget} id={linkName} onClick={(e) => { addOverview(e); }}>
              {link.title}
            </a>
            {link.expanded == true ? <Link to={link.link.uri.replace('internal:', '')} className="overview" id={"overview-" + linkName} style={{ display: "none" }}>Overview</Link> : ''}
          </>
        )
      } else {
        return (
          <>
            <Link to={link.link.uri.replace('internal:', '')}>
              {link.title}

            </Link>
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
            {link.title}
          </a>
        </>
      )
    }
  }

  if (!link.external && link.link.uri) {
    return (<Link activeClassName="active" to={link.link.uri}>
      {link.title}
    </Link>)
  } else if (!link.external && link.link.uri.includes('internal:')) {
    return (<Link activeClassName="active" to={link.link.uri.replace('internal:', '')}>
      {link.title}
    </Link>)
  } else {
    return (<a href={link.link.uri} className={'external'}>
      {link.title}
    </a>)
  }

}

// function _onHeaderClick(event) {
//   event.preventDefault();
//   $(event.currentTarget).siblings().toggle();
// }

function buildMenu(menuArray, isExpandable, menuName) {

  console.log("exp", menuName, isExpandable);
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
                buildLink(menuArray[item], "itemLink" + menuArray[item].drupal_id)
          }
          <ul className={"submenu " + (isExpandable === true ? 'collapse ' : ' ')} id={(isExpandable === true ? "menuItem" + menuArray[item].drupal_id : menuArray[item].drupal_id)}>
            {buildMenu(menuArray[item].children, true, menuName)}
            { typeof window !== "undefined" && menuName === "third-footer" && isExpandable === true? <span id="extole_zone_mobile_footer" className="footer-referral-span">Refer a friend</span>
            : typeof window !== "undefined" && menuName === "third-footer" && isExpandable === false? <span id="extole_zone_global_footer" className="footer-referral-span">Refer a friend</span>
            : "" }
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

      (function(c,b,f,k,a){c[b]=c[b]||{};for(c[b].q=c[b].q||[];a<k.length;)f(k[a++],c[b])})(window,"extole",function (c,b){b[c]=b[c]||function (){b.q.push([c,arguments])}},["createZone"],0);
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

      (function(c,b,f,k,a){c[b]=c[b]||{};for(c[b].q=c[b].q||[];a<k.length;)f(k[a++],c[b])})(window,"extole",function (c,b){b[c]=b[c]||function (){b.q.push([c,arguments])}},["createZone"],0);
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
