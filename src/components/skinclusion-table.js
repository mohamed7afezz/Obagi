import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import * as tableStyle from '../assets/scss/components/table.module.scss'



const SkinClusionTable = ({ node }) => {

  return (
    <div className={tableStyle.tableContainer}>
      <div className='container-fluid'>
        <div dangerouslySetInnerHTML={{ __html: node.field_table_title.processed }} className={["offset-lg-3", tableStyle.tabletitle].join(" ")}></div>
        <div className="row">
          <div className="col-12">

            <div className={["d-flex", tableStyle.tabelContainer].join(" ")}>
              {node.relationships.field_skin_culsion_tabel_cells.map((item, index) =>
                <div className={[tableStyle.coldeskRowMob, `cell-${index}`].join(" ")}>

                  <div className={[tableStyle.tabelImage, "tabelImage"].join(" ")}>
                    {item.relationships && item.relationships.field_cell_image && item.relationships.field_cell_image.localFile && item.relationships.field_cell_image.localFile.childImageSharp?
                      <GatsbyImage
                        image={item.relationships.field_cell_image.localFile.childImageSharp.gatsbyImageData}
                        alt="img"
                        className={[tableStyle.tableimg, "tableimg"].join(" ")} /> : ""}
                    <div className={tableStyle.skinType}>
                      {item.field_tabel_type_cell_desc ?
                        <div className={[tableStyle.tableCell, tableStyle.skincolor, `type-${index}`].join(" ")} dangerouslySetInnerHTML={{ __html: item.field_tabel_type_cell_desc.processed }}></div> : ""
                      }</div>
                  </div>

                  <div className={[tableStyle.firstcell, "firstcell"].join(" ")}>
                    {item.field_first_cell_text ?
                      <div className={tableStyle.tableCell} dangerouslySetInnerHTML={{ __html: item.field_first_cell_text.processed }}></div> : ""
                    }</div>
                  <div className={tableStyle.secondcell}>
                    {item.field_second_cell ?
                      <div className={[tableStyle.tableCell, tableStyle.lastCell, "lastCell"].join(" ")} dangerouslySetInnerHTML={{ __html: item.field_second_cell.processed }}></div> : ""
                    }</div>
                </div>
              )
              }
            </div>

          </div>
        </div>
      </div>
      {/* <table>
            
            <tr>
                {node.relationships.field_skin_culsion_tabel_cells.map(item=>
                item.relationships?  item.relationships.field_cell_image?
                 <td className={tableStyle.imgcell}><Img alt="img"  fluid={item.relationships.field_cell_image.localFile.childImageSharp.fluid}/> </td>:""
                 :"" ) }
            </tr>
            <tr>
                {node.relationships.field_skin_culsion_tabel_cells.map(item=>
                item.field_second_cell?
                 <td className={tableStyle.imgcell}><div dangerouslySetInnerHTML={{ __html: item.field_second_cell.processed }}></div> </td>:""
                ) }
            </tr>
            <tr>
                {node.relationships.field_skin_culsion_tabel_cells.map(item=>
                item.field_first_cell_text?
                 <td className={tableStyle.imgcell}><div dangerouslySetInnerHTML={{ __html: item.field_first_cell_text.processed }}></div> </td>:""
                ) }
            </tr>
           
            <tr>
            {node.relationships.field_skin_culsion_tabel_cells.map(item=>
                item.field_tabel_type_cell_desc?
                 <td className={tableStyle.imgcell}><div dangerouslySetInnerHTML={{ __html: item.field_tabel_type_cell_desc.processed }}></div> </td>:""
                ) }
            </tr>
        </table> */}
    </div>
  );
}
export default SkinClusionTable


export const fragment = graphql`fragment paragraphSkinClusionTable on paragraph__skin_culsion_tabel {
  id
  field_table_title {
    processed
  }
  relationships {
    field_skin_culsion_tabel_cells {
      field_first_cell_text {
        processed
      }
      field_second_cell {
        processed
      }
      field_tabel_type_cell_desc {
        processed
      }
      relationships {
        field_cell_image {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              original {
                src
              }
            }
          }
        }
      }
    }
  }
}
`
