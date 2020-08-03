import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import PropTypes from "prop-types";
import footerStyles from '../assets/scss/components/footer.module.scss'
// const $ = require(jQuery);
//  onClick={_onHeaderClick}

// function parentHasClass(element, classname) {
//   if (element.className.split(' ').indexOf(classname)>=0) return true;
//   return element.parentNode && parentHasClass(element.parentNode, classname);

// }

function addStyles(e) {
  document.querySelectorAll(".extended-nav .submenu a").forEach(Elem => Elem.classList.add("not-selected"));
  
  if(e.target.closest(".extended-nav > ul > li > .submenu > li > a")) {
    let selected = e.target.closest(".submenu > li > a");
    selected.classList.remove("not-selected");
    selected.classList.add("selected");
  }


}

function removeStyles() {
  document.querySelectorAll(".extended-nav .submenu a").forEach(Elem => Elem.classList.remove("selected"));
  document.querySelectorAll(".extended-nav .submenu a").forEach(Elem => Elem.classList.remove("not-selected"));
}

function createMenuHierarchy(menuData, menuName) {
  let tree = [],
     mappedArr = {},
     arrElem,
     mappedElem

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
    return ( <Link to={link.link.uri.replace('internal:', '')}>
      {link.title}
    </Link>)
  } else {
    if (!collapseTarget && itemId) {
      return (<Link className="single-tab" to={link.link.uri.replace('internal:', '')} id={itemId} onMouseEnter={(e) => {addStyles(e);}} onMouseLeave={() => {removeStyles();}}>
        {link.title}
      </Link>)
    }
    else if (itemId && collapseTarget) {
      return (<a className="collapsed" data-toggle="collapse" href={collapseTarget} role="button" aria-expanded="false" aria-controls={collapseTarget}>
        {link.title}
      </a>)
    }
  }

  if(!link.external && link.link.uri) {
    return ( <Link activeClassName="active" to={link.link.uri}>
      {link.title}
    </Link>)
  } else if(!link.external && link.link.uri.includes('internal:')) {
    return ( <Link activeClassName="active" to={link.link.uri.replace('internal:', '')}>
      {link.title}
    </Link>)
  } else {
    return ( <a href={link.link.uri} className={'external'}>
      {link.title}
    </a>)
  }
}

// function _onHeaderClick(event) {
//   event.preventDefault();
//   $(event.currentTarget).siblings().toggle();
// }

function buildMenu(menuArray, isExpandable){
  if(!menuArray)  {
    return
  }
  let menu = []
  for(let item in menuArray) {
    if(menuArray[item].children.length !== 0) {
      menu.push(
      <li key={menuArray[item].drupal_id}>
        {buildLink(menuArray[item], "itemLink" + menuArray[item].drupal_id, "#menuItem" + menuArray[item].drupal_id, isExpandable)}
        <ul className={"submenu " + (isExpandable === true ? 'collapse ' : ' ')} id={(isExpandable === true ? "menuItem" + menuArray[item].drupal_id : 'menuItem')}>
          {buildMenu(menuArray[item].children, true)}
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
  menu = buildMenu(menu, isExpandable)
  return menu
}

const Menu = ({menuName, menuClass, isExpandable}) => (

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

Menu.propTypes = {
  menuName: PropTypes.string,
  menuClass: PropTypes.string,
  isExpandable: PropTypes.bool,
}

Menu.defaultProps = {
  menuName: `main`,
 }

export default Menu
