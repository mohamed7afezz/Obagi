import React, { useContext, useState, useEffect } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import PropTypes, { func } from "prop-types"
import Img from 'gatsby-image'
import UserContext from '../providers/user-provider'

// import { info } from "node-sass";

function addMainStyles(e) {
  document.querySelectorAll(".absolute-extended .nav-desk a.collapsed").forEach(Elem => Elem.classList.add("not-selected"));
  document.querySelectorAll(".relative-general-nav .relative-nav-desk a.collapsed").forEach(Elem => Elem.classList.add("not-selected"));
  document.querySelectorAll(".absolute-extended .nav-desk span").forEach(Elem => Elem.classList.add("not-selected"));
  document.querySelectorAll(".relative-general-nav .relative-nav-desk span").forEach(Elem => Elem.classList.add("not-selected"));


  if (e.target.closest(".absolute-extended > div > div > div > div > div > nav > ul > li > a.collapsed") || (e.target.closest(".relative-general-nav > div > div > div > div > div > nav > ul > li > a.collapsed"))) {
    let selected = e.target.closest("nav > ul > li > a.collapsed");
    selected.classList.remove("not-selected");
    selected.classList.add("hovered");
  }

  if ((e.target.closest(".absolute-extended > div > div > div > div > div > nav > ul > span") || (e.target.closest(".relative-general-nav > div > div > div > div > div > nav > ul > span")))) {
    let selectedSpan = e.target.closest("nav > ul > span");
    selectedSpan.classList.remove("not-selected");
    selectedSpan.classList.add("hovered");
  }

}

function removeMainStyles() {
  document.querySelectorAll(".absolute-extended .nav-desk a").forEach(Elem => Elem.classList.remove("hovered"));
  document.querySelectorAll(".absolute-extended .nav-desk a").forEach(Elem => Elem.classList.remove("not-selected"));

  document.querySelectorAll(".relative-general-nav .relative-nav-desk a").forEach(Elem => Elem.classList.remove("hovered"));
  document.querySelectorAll(".relative-general-nav .relative-nav-desk a").forEach(Elem => Elem.classList.remove("not-selected"));

  document.querySelectorAll(".absolute-extended .nav-desk span").forEach(Elem => Elem.classList.remove("hovered"));
  document.querySelectorAll(".absolute-extended .nav-desk span").forEach(Elem => Elem.classList.remove("not-selected"));

  document.querySelectorAll(".relative-general-nav .relative-nav-desk span").forEach(Elem => Elem.classList.remove("hovered"));
  document.querySelectorAll(".relative-general-nav .relative-nav-desk span").forEach(Elem => Elem.classList.remove("not-selected"));
}

let megaMenuBlocks = [];
function fillMegaMenuBlocksArr(data) {
  megaMenuBlocks = data.allBlockContentMegaMenuItems.edges.map(({ node }) => node);

}
function fixlink(changelink) {


  return (changelink.uri.replace('internal:', ''))
}


function getBlock(item) {
  let block;

  let blockIndex = megaMenuBlocks.findIndex(data => data.info.toLowerCase() === item.title.toLowerCase());

  let numberOfitems = megaMenuBlocks[blockIndex].relationships.field_mega_block.length > 4 ? 4 : megaMenuBlocks[blockIndex].relationships.field_mega_block.length;
  let maxwidthVar = numberOfitems == 1 ? 654 : (numberOfitems * 383);
  // let widthVar = ((maxwidthVar/1920)*100);

  return <div className="d-flex main-nav-containers" style={{ maxWidth: maxwidthVar + 'px' }}>
    {
      megaMenuBlocks[blockIndex].relationships.field_mega_block.map(item => (
        <div className="nav-container-desk">
          {item.field_mega_block_title ? <Link className={'titleLink'} to={item.field_mega_block_link ? fixlink(item.field_mega_block_link) : ''}><div dangerouslySetInnerHTML={{ __html: item.field_mega_block_title.processed }}></div> </Link> : ''}
          {item.field_mega_block_subtitle ? <div dangerouslySetInnerHTML={{ __html: item.field_mega_block_subtitle.processed }}></div> : ''}
          {item.relationships.field_mega_block_image ? <div style={{ width: '100%' }} className="nav-img-desk">
            {item.relationships.field_mega_block_image.localFile ? <div to={item.field_mega_block_link ? fixlink(item.field_mega_block_link) : ''}><Link className={'d-block'} to={item.field_mega_block_link ? fixlink(item.field_mega_block_link) : ''}> <Img className={"img-mega"} fluid={item.relationships.field_mega_block_image.localFile.childImageSharp.fluid} /></Link> </div> : ''}</div> : ''}
          <div className="nav-arrow-desk"><Link to={item.field_mega_block_link ? fixlink(item.field_mega_block_link) : ''}>{item.relationships.field_mega_block_arrow_image.localFile ? <Img fixed={item.relationships.field_mega_block_arrow_image.localFile.childImageSharp.fixed} /> : ''}</Link></div>
        </div>
      ))
    }
  </div>
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
    return (<Link to={link.link.uri}>
      {link.title}
    </Link>)
  } else {
    if (!collapseTarget && itemId) {
      return (<Link className="single-tab" to={link.link.uri} id={itemId}>
        {link.title}
      </Link>)
    }
    else if (itemId && collapseTarget) {
      return (<a className="collapsed" data-toggle="collapse" href={collapseTarget} role="button" aria-expanded="false" aria-controls={collapseTarget} onMouseEnter={(e) => { addMainStyles(e); }} onMouseLeave={() => { removeMainStyles(); }}>
        {link.title}
      </a>)
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


function buildMenu(menuArray, isExpandable) {
  if (!menuArray) {
    return
  }
  let menu = []
  for (let item in menuArray) {
    menu.push(
      <li key={menuArray[item].drupal_id}>
        {buildLink(menuArray[item], "itemLink" + menuArray[item].drupal_id, "#menuItem" + menuArray[item].drupal_id, isExpandable)}
        {getBlock(menuArray[item])}
      </li>)
  }

  return menu

};

function generateMenu(menuLinks, menuName, isExpandable) {
  let menu

  menu = createMenuHierarchy(menuLinks.allMenuLinkContentMenuLinkContent.edges, menuName)
  menu = buildMenu(menu, isExpandable)
  return menu
}

const MegaMenu = ({ menuName, menuClass, isExpandable }) => 
{
  const { user } = useContext(UserContext);

  useEffect(()=> {
    if(typeof window !== "undefined") {
      (function(c,e,k,l,a){c[e]=c[e]||{};for(c[e].q=c[e].q||[];a<l.length;)k(l[a++],c[e])
    })(window,"extole",function(c,e){e[c]=e[c]||function(){e.q.push([c,arguments])}},["createZone"],0);
    window.extole.createZone({
    name: 'global_header',
    element_id: 'extole_zone_global_header',
    data: {
    "partner_user_id": user? user.id : "", // RECOMMENDED IF AVAILABLE
    "email": user? user.email : "", // RECOMMENDED IF AVAILABLE
    "first_name": user? user.first_name : "", // RECOMMENDED IF AVAILABLE
    "last_name": user? user.last_name : "" // RECOMMENDED IF AVAILABLE
    }
    });
    }

  }, []);

  
return (

  <StaticQuery
    query={graphql`
            query {
                allBlockContentMegaMenuItems {
                    edges {
                        node {
                            id
                            info
                            relationships {
                                field_mega_block {
                                    field_mega_block_title {
                                        processed
                                    }
                                    field_mega_block_subtitle {
                                        processed
                                    }
                                    field_mega_block_link {
                                      uri
                                    }
                                    relationships {
                                        field_mega_block_image {
                                        localFile {
                                            childImageSharp {
                                              fluid (quality: 100){
                                                ...GatsbyImageSharpFluid
                                              }
                                            }
                                        }
                                        }
                                        field_mega_block_arrow_image {
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
                        }
                    }
                }
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
        `}

    render={data => (
      <nav className={menuName, menuClass}>
        {fillMegaMenuBlocksArr(data)}
        <ul >
          {generateMenu(data, menuName, isExpandable)}
          { typeof window !== "undefined" ?<span id="extole_zone_global_header" className="header-referral-span" onMouseEnter={(e) => { addMainStyles(e); }} onMouseLeave={() => { removeMainStyles(); }}></span> : ""}
          
        </ul>
      </nav>

    )}
  />
)}

MegaMenu.propTypes = {
  menuName: PropTypes.string,
  menuClass: PropTypes.string,
  isExpandable: PropTypes.bool,
}

MegaMenu.defaultProps = {
  menuName: `main`,
}

export default MegaMenu
