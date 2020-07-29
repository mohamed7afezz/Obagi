import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import PropTypes, { func } from "prop-types";
import Img from 'gatsby-image'
// import { info } from "node-sass";

let megaMenuBlocks = [];
function fillMegaMenuBlocksArr(data){
    megaMenuBlocks = data.allBlockContentMegaMenuItems.edges.map(({ node }) => node);
    // console.log(megaMenuBlocks); 
}

function getBlock(item) {
    let block;

    // console.log(item);


    let blockIndex = megaMenuBlocks.findIndex(data => data.info.toLowerCase() === item.title.toLowerCase());
    console.log(megaMenuBlocks[blockIndex]);
    console.log(blockIndex);
    let numberOfitems = megaMenuBlocks[blockIndex].relationships.field_mega_block.length > 4? 4 : megaMenuBlocks[blockIndex].relationships.field_mega_block.length;
    let maxwidthVar = numberOfitems==1? 654:(numberOfitems*383);
    // let widthVar = ((maxwidthVar/1920)*100);

    return <div className="d-flex main-nav-containers" style={{maxWidth:maxwidthVar+'px'}}>
      {
        megaMenuBlocks[blockIndex].relationships.field_mega_block.map(item => (
          <div className="nav-container-desk">
            {item.field_mega_block_title? <div dangerouslySetInnerHTML={{__html: item.field_mega_block_title.processed}}></div> : ''}
            {item.field_mega_block_subtitle? <div dangerouslySetInnerHTML={{__html: item.field_mega_block_subtitle.processed}}></div> : ''}
            {item.relationships.field_mega_block_image?<div style={{width: '100%'}} className="nav-img-desk"><Img fluid={item.relationships.field_mega_block_image.localFile.childImageSharp.fluid}/></div> : ''}
            <div className="nav-arrow-desk"><Link to={item.relationships.field_mega_block_link? item.relationships.field_mega_block_link.uri : ''}>{item.relationships.field_mega_block_arrow_image? <Img fixed={item.relationships.field_mega_block_arrow_image.localFile.childImageSharp.fixed}/> : ''}</Link></div>
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
    return ( <Link to={link.link.uri}>
      {link.title}
    </Link>)
  } else {
    if (!collapseTarget && itemId) {
      return (<Link className="single-tab" to={link.link.uri} id={itemId}>
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


function buildMenu(menuArray, isExpandable){
  if(!menuArray)  {
    return
  }
  let menu = []
  for(let item in menuArray) {
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

const MegaMenu = ({menuName, menuClass, isExpandable}) => (

   <StaticQuery
        query={ graphql`
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
                                                fluid {
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
          </ul>
        </nav>

      )}
   />
)

MegaMenu.propTypes = {
  menuName: PropTypes.string,
  menuClass: PropTypes.string,
  isExpandable: PropTypes.bool,
}

MegaMenu.defaultProps = {
  menuName: `main`,
 }

export default MegaMenu
